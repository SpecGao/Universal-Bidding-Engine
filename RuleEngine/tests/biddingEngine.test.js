"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

global.window = {};
require(path.join(__dirname, "..", "engine", "biddingEngine.js"));

const api = global.window.BridgeBiddingEngine;
let passed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`ok ${passed} - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

function expansionStrings(expression, options) {
  return api.compileSequenceExpression(expression, options).expand().map((calls) => calls.join("-"));
}

test("bid arithmetic follows the 35-contract bridge ladder", () => {
  assert.equal(api.addToContractBid("1D", 5), "2D");
  assert.equal(api.evaluateBidRelation("1D+5=2D"), true);
  assert.equal(api.evaluateBidRelation("2D-5=1D"), true);
  assert.equal(api.compareContractBids("2C", "1NT"), 1);
  assert.equal(api.compareContractBids("1S", "1NT"), -1);
});

test("# expands only to levels that preserve a legal auction", () => {
  assert.deepEqual(expansionStrings("1D-#D-4D"), ["1D-2D-4D", "1D-3D-4D"]);
});

test("X learns a concrete suit while legality prunes impossible expansions", () => {
  assert.deepEqual(expansionStrings("1C-1X-3NT"), [
    "1C-1D-3NT",
    "1C-1H-3NT",
    "1C-1S-3NT",
  ]);
  const match = api.compileSequenceExpression("1C-1X-3NT").matchExact(["1C", "1H", "3NT"]);
  assert.equal(match.matched, true);
  assert.deepEqual(match.bindings, { X: "H" });
});

test("M and m are persistent major and minor variables", () => {
  assert.deepEqual(expansionStrings("1M-2M"), ["1H-2H", "1S-2S"]);
  assert.deepEqual(expansionStrings("1m-2m"), ["1C-2C", "1D-2D"]);
});

test("X, Y, Z, and W are introduced in order and learn distinct suits", () => {
  const expression = api.compileSequenceExpression("1X-2Y-3Z-4W");
  const learned = expression.matchExact(["1C", "2D", "3H", "4S"]);
  assert.equal(learned.matched, true);
  assert.deepEqual(learned.bindings, { X: "C", Y: "D", Z: "H", W: "S" });
  assert.equal(expression.testExact(["1C", "2D", "3H", "4C"]), false);
  assert.throws(() => api.compileSequenceExpression("1Y"), /no legal concrete sequence/);
});

test("standalone * accepts zero or more calls", () => {
  const expression = api.compileSequenceExpression("1C-*-2C");
  assert.equal(expression.testExact(["1C", "2C"]), true);
  assert.equal(expression.testExact(["1C", "1D", "2C"]), true);
  assert.equal(expression.testExact(["1C", "1D", "1H", "2C"]), true);
});

test("standalone ? accepts one or more calls", () => {
  const expression = api.compileSequenceExpression("1C-?-2C");
  assert.equal(expression.testExact(["1C", "2C"]), false);
  assert.equal(expression.testExact(["1C", "1D", "2C"]), true);
  assert.equal(expression.testExact(["1C", "1D", "1H", "2C"]), true);
});

test("groups and alternatives compile to legal concrete auctions", () => {
  assert.deepEqual(expansionStrings("1H-(2C|2D)"), ["1H-2C", "1H-2D"]);
  assert.throws(() => api.compileSequenceExpression("1S-1H"), /no legal concrete sequence/);
});

test("overlap analysis returns a concrete legal witness", () => {
  assert.deepEqual(api.findSequenceOverlap("1M", "1H"), ["1H"]);
  assert.equal(api.findSequenceOverlap("1M", "1m"), null);
  assert.deepEqual(
    api.findSequenceOverlap("1C-*-2C", "1C-1D-2C"),
    ["1C", "1D", "2C"]
  );
  assert.deepEqual(
    api.findSequenceOverlap(
      api.compileSequenceExpression("1X-2Y", { where: ["Y<X"] }),
      "1S-2H"
    ),
    ["1S", "2H"]
  );
  assert.deepEqual(
    api.findSequenceOverlap("1S-^2C-2H", "1S-^2m-2H"),
    ["1S", "2C", "2H"]
  );
});

test("an explicit-fit expression can learn its suit after earlier bidding", () => {
  const blackwood = api.compileSequenceExpression("*-#X-*-#X-*-4NT");
  const result = blackwood.matchExact(["1C", "1H", "2H", "4NT"]);
  assert.equal(result.matched, true);
  assert.deepEqual(result.bindings, { X: "H" });
  assert.equal(blackwood.testExact(["1NT", "3NT", "4NT"]), false);
  assert.throws(() => api.compileSequenceExpression("1C-BID-2C"), /Invalid bidding-expression atom/);
  assert.throws(() => api.compileSequenceExpression("1C-.-2C"), /Invalid bidding-expression atom/);
});

test("^ marks opponent calls in a full-auction expression", () => {
  const competitive = api.compileSequenceExpression("1S-^2C-2H");
  assert.equal(
    competitive.testExact(["1S", "2C", "2H"], { dealer: "N", systemSide: "NS" }),
    true
  );
  assert.equal(
    competitive.testExact(["1S", "2D", "2H"], { dealer: "N", systemSide: "NS" }),
    false
  );
  assert.equal(
    competitive.testExact(["1S", "2C", "2H"], { dealer: "N", systemSide: "EW" }),
    false
  );
  assert.equal(
    competitive.test(["P", "P", "1S", "2C", "2H"], { dealer: "N", systemSide: "NS" }),
    true
  );
  const grouped = api.compileSequenceExpression("1S-^(2C|2D)-2H");
  assert.equal(grouped.testExact(["1S", "2D", "2H"], { dealer: "N", systemSide: "NS" }), true);
});

test("general 2/1 learns two ordered, distinct suits", () => {
  const twoOverOne = api.compileSequenceExpression("1X-2Y", { where: ["Y<X"] });
  assert.deepEqual(twoOverOne.expand().map((calls) => calls.join("-")), [
    "1D-2C",
    "1H-2C",
    "1H-2D",
    "1S-2C",
    "1S-2D",
    "1S-2H",
  ]);
  assert.equal(twoOverOne.testExact(["1S", "2H"]), true);
  assert.equal(twoOverOne.testExact(["1H", "2S"]), false);
  assert.equal(twoOverOne.testExact(["1D", "2D"]), false);
  assert.deepEqual(twoOverOne.matchExact(["1S", "2H"]).bindings, { X: "S", Y: "H" });
});

test("sequence rules execute through UniversalBiddingEngine without UI changes", () => {
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem({
    schemaVersion: "1.2",
    conventions: [],
    sequenceRules: [
      {
        id: "learned-two-over-one",
        expression: "1X-2Y",
        where: ["Y<X"],
        meaning: "2/1 game force",
        priority: 100,
        filters: { minHcp: 12 },
      },
      {
        id: "explicit-fit-blackwood",
        expression: "*-#X-*-#X-*-4NT",
        requiresAgreement: ["X"],
        meaning: "Blackwood ace ask after explicit agreement",
        priority: 120,
      },
    ],
  });

  const afterOpening = engine.evaluate(["1H", "P"], "N", { minHcp: 12, maxHcp: 40 }, "NS");
  assert.deepEqual(
    afterOpening.suggestions.filter((item) => item.fromNodeId === "learned-two-over-one").map((item) => item.bid),
    ["2C", "2D"]
  );

  const afterResponse = engine.evaluate(["1S", "P", "2H"], "N", { minHcp: 12, maxHcp: 40 }, "NS");
  const learnedMatch = afterResponse.frames[2].matches.find((item) => item.toNodeId === "learned-two-over-one");
  assert.equal(learnedMatch.meaning, "2/1 game force");
  assert.deepEqual(learnedMatch.bindings, { X: "S", Y: "H" });

  const beforeBlackwood = engine.evaluate(["1S", "P", "2S", "P"], "N", {}, "NS");
  assert.equal(
    beforeBlackwood.suggestions.some((item) => item.bid === "4NT" && item.fromNodeId === "explicit-fit-blackwood"),
    true
  );

  const falseAgreement = engine.evaluate(["1H", "P", "1S", "P", "2H", "P", "4NT"], "N", {}, "NS");
  assert.equal(
    falseAgreement.frames[6].matches.some((item) => item.toNodeId === "explicit-fit-blackwood"),
    false
  );
});

test("opponent-marked sequence rules execute against the full auction", () => {
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem({
    conventions: [],
    sequenceRules: [{
      id: "competitive-two-heart-response",
      expression: "1S-^2C-2H",
      meaning: "Heart response after an opponent club overcall",
      priority: 100,
    }],
  });

  const before = engine.evaluate(["1S", "2C"], "N", {}, "NS");
  assert.equal(
    before.suggestions.some((item) => item.bid === "2H" && item.fromNodeId === "competitive-two-heart-response"),
    true
  );
  const result = engine.evaluate(["1S", "2C", "2H"], "N", {}, "NS");
  assert.equal(
    result.frames[2].matches.some((item) => item.toNodeId === "competitive-two-heart-response"),
    true
  );
});

test("transition trees learn the same abstract suit bindings", () => {
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem({
    conventions: [{
      id: "symbolic-tree",
      children: [{
        id: "opening-X",
        trigger: "1X",
        filters: { auctionRole: "opening" },
        children: [
          { id: "raise-X", trigger: "2X", meaning: "Raise learned suit" },
          { id: "new-Y", trigger: "2Y", meaning: "Learn a distinct second suit" },
        ],
      }],
    }],
  });

  const afterOpening = engine.evaluate(["1H", "P"], "N", {}, "NS");
  assert.deepEqual(
    afterOpening.suggestions.filter((item) => item.toNodeId === "raise-X").map((item) => item.bid),
    ["2H"]
  );
  assert.deepEqual(
    afterOpening.suggestions.filter((item) => item.toNodeId === "new-Y").map((item) => item.bid),
    ["2C", "2D", "2S"]
  );

  const learned = engine.evaluate(["1H", "P", "2D"], "N", {}, "NS");
  const path = learned.paths.find((item) => item.node.id === "new-Y");
  assert.deepEqual(path.context.symbolBindings, { X: "H", Y: "D" });
});

test("symbolic suit filters apply to the suit learned by a transition", () => {
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem({
    conventions: [{
      id: "symbolic-filter",
      children: [{
        id: "five-card-X",
        trigger: "1X",
        filters: { auctionRole: "opening", minSuit: { X: 5 }, maxSuit: { X: 13 } },
        children: [],
      }],
    }],
  });

  const fourHearts = engine.evaluate(["1H"], "N", { minSuit: { H: 4 }, maxSuit: { H: 4 } }, "NS");
  assert.equal(fourHearts.frames[0].matches.some((item) => item.toNodeId === "five-card-X"), false);

  const fiveHearts = engine.evaluate(["1H"], "N", { minSuit: { H: 5 }, maxSuit: { H: 5 } }, "NS");
  assert.equal(fiveHearts.frames[0].matches.some((item) => item.toNodeId === "five-card-X"), true);
});

test("the shipped 2/1 system explains 1S-P-2C with the default broad hand filter", () => {
  const systemPath = path.join(__dirname, "..", "Customization", "standard-two-over-one.json");
  const system = JSON.parse(fs.readFileSync(systemPath, "utf8"));
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem(system);

  const result = engine.evaluate(["1S", "P", "2C"], "N", {}, "NS");
  const openingMatch = result.frames[0].matches.find((item) => item.toNodeId === "o1S");
  assert.equal(openingMatch.meaning.includes("12+ points and 5+ spades"), true);
  const match = result.frames[2].matches.find((item) => item.toNodeId === "two-over-one-learned-sequence");
  assert.equal(match.meaning.startsWith("2/1 game forcing"), true);
  assert.deepEqual(match.bindings, { X: "S", Y: "C" });

  const incompatible = engine.evaluate(["1S"], "N", { minHcp: 0, maxHcp: 10 }, "NS");
  assert.equal(incompatible.frames[0].matches.some((item) => item.toNodeId === "o1S"), false);
});

test("the standard 2/1 fact layer advances through entry, strain, fit, controls, and completion", () => {
  const systemPath = path.join(__dirname, "..", "Customization", "standard-two-over-one.json");
  const system = JSON.parse(fs.readFileSync(systemPath, "utf8"));
  const engine = new api.UniversalBiddingEngine();
  engine.setSystem(system);
  const hand = { minHcp: 12, maxHcp: 21 };

  const entry = engine.evaluate(["1S", "P", "2C"], "N", hand, "NS");
  assert.equal(entry.facts.progress.twoOverOne.phase, "entry");
  assert.equal(entry.facts.forcing.game, true);

  const strain = engine.evaluate(["1S", "P", "2C", "P", "2D"], "N", hand, "NS");
  assert.equal(strain.facts.progress.twoOverOne.phase, "strain-selection");

  const fit = engine.evaluate(["1S", "P", "2C", "P", "2D", "P", "2S"], "N", hand, "NS");
  assert.equal(fit.facts.progress.twoOverOne.phase, "fit-confirmed");
  assert.equal(fit.facts.fit.suit, "S");

  const controls = engine.evaluate(["1S", "P", "2C", "P", "2D", "P", "2S", "P", "3H"], "N", hand, "NS");
  assert.equal(controls.facts.progress.twoOverOne.phase, "control-bidding");
  assert.equal(controls.facts.slam.control.suit, "H");

  const complete = engine.evaluate(["1S", "P", "2C", "P", "2D", "P", "2S", "P", "3H", "P", "4S"], "N", hand, "NS");
  assert.equal(complete.facts.progress.twoOverOne.phase, "complete");
  assert.equal(complete.facts.progress.twoOverOne.gameForceSatisfied, true);
  assert.equal(complete.facts.forcing.game, false);

  const simpleRaise = engine.evaluate(["1S", "P", "2S"], "N", hand, "NS");
  assert.equal(simpleRaise.facts.convention.twoOverOne, false);
  assert.equal(simpleRaise.facts.forcing.game, false);
});

test("personal FG v0.5 carries facts, required alerts, and symbolic delayed-splinter filters", () => {
  const systemPath = path.join(__dirname, "..", "Customization", "personal-fgv0-5.json");
  const system = JSON.parse(fs.readFileSync(systemPath, "utf8"));
  const ids = new Set();
  const nodes = [];
  const visit = (node) => {
    assert.equal(ids.has(node.id), false, `duplicate node id ${node.id}`);
    ids.add(node.id);
    nodes.push(node);
    for (const child of node.children || []) visit(child);
  };
  for (const convention of system.conventions) for (const child of convention.children || []) visit(child);
  assert.equal(nodes.every((node) => node.meaning && Object.keys(node.facts || {}).length), true);

  const oneNotrump = nodes.find((node) => node.id === "fg1NT");
  for (const child of oneNotrump.children) {
    const expectedAlert = !/^[4-7]NT$/.test(child.trigger);
    assert.equal(child.alert, expectedAlert, `unexpected 1NT response alert for ${child.trigger}`);
  }
  assert.equal(nodes.filter((node) => /splinter/i.test(node.id)).every((node) => node.alert), true);
  assert.equal(nodes.filter((node) => /exclusion/i.test(node.id)).every((node) => node.alert), true);
  assert.equal(nodes.find((node) => node.id === "fg-rkcb").alert, true);

  const engine = new api.UniversalBiddingEngine();
  engine.setSystem(system);
  const sequence = ["1D", "P", "2C", "P", "2H", "P", "3S"];
  const eligible = engine.evaluate(sequence, "N", {
    minHcp: 15,
    maxHcp: 15,
    minSuit: { H: 3 },
    maxSuit: { S: 1 },
  }, "NS");
  const delayed = eligible.frames[6].matches.find((item) => item.toNodeId === "personal-fgv0-5-delayed-splinter-2-new-higher");
  assert.equal(Boolean(delayed), true);
  assert.equal(delayed.alert, true);
  assert.equal(delayed.facts.shortness.suit, "S");

  const ineligible = engine.evaluate(sequence, "N", {
    minHcp: 15,
    maxHcp: 15,
    maxSuit: { H: 2, S: 1 },
  }, "NS");
  assert.equal(ineligible.frames[6].matches.some((item) => item.toNodeId === "personal-fgv0-5-delayed-splinter-2-new-higher"), false);
});

test("the browser data bundle contains the same learned 2/1 rules", () => {
  const bundlePath = path.join(__dirname, "..", "Customization", "system-data.js");
  const source = fs.readFileSync(bundlePath, "utf8");
  const prefix = "window.BridgeSystemData = ";
  assert.equal(source.startsWith(prefix), true);
  const bundle = JSON.parse(source.slice(prefix.length, source.lastIndexOf(";")));
  const system = bundle.systems.find((item) => item.systemId === "two-over-one");
  assert.equal(system.schemaVersion, "1.4");
  assert.equal(system.sequenceRules.some((rule) => rule.id === "two-over-one-learned-sequence"), true);
  assert.equal(system.sequenceRules.some((rule) => rule.id === "two-over-one-explicit-fit-blackwood"), true);
});

console.log(`# ${passed} tests passed`);
