"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

global.window = {};
require(path.join(__dirname, "..", "engine", "biddingEngine.js"));

const api = global.window.BridgeBiddingEngine;
const corpusPath = path.join(__dirname, "generated-standard-system-sequences.json");
const systemFiles = {
  "standard-natural": "standard-natural.json",
  "two-over-one": "standard-two-over-one.json",
  "precision-1c": "standard-precision-1c.json",
  acol: "standard-acol.json",
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertLegalAuction(testCase) {
  const prefix = [];
  for (const [index, call] of testCase.auction.entries()) {
    const legal = api.legalBidCodesForState(prefix, testCase.dealer);
    assert.equal(
      legal.has(call),
      true,
      `${testCase.id}: ${call} at call ${index + 1} is illegal after ${prefix.join("-") || "(start)"}`
    );
    prefix.push(call);
  }
}

const systems = new Map();
for (const [systemId, fileName] of Object.entries(systemFiles)) {
  const system = readJson(path.join(__dirname, "..", "Customization", fileName));
  const engine = new api.UniversalBiddingEngine();
  assert.doesNotThrow(() => engine.setSystem(system), `${systemId} must compile every sequence rule`);
  assert.ok(system.sequenceRules.length > 0, `${systemId} must ship at least one sequence rule`);
  systems.set(systemId, { system, engine });
}

const corpus = readJson(corpusPath);
assert.equal(corpus.length, 100, "the generated regression corpus must contain exactly 100 sequences");
assert.equal(new Set(corpus.map((testCase) => testCase.id)).size, 100, "test sequence ids must be unique");

let passed = 0;
for (const testCase of corpus) {
  assertLegalAuction(testCase);
  const loaded = systems.get(testCase.systemId);
  assert.ok(loaded, `${testCase.id}: unknown system ${testCase.systemId}`);

  const result = loaded.engine.evaluate(
    testCase.auction,
    testCase.dealer,
    {},
    testCase.systemSide
  );
  const frame = result.frames[result.frames.length - 1];
  const match = frame.matches.find((item) => item.toNodeId === testCase.expectRuleId);
  assert.equal(
    Boolean(match),
    testCase.expectMatched,
    `${testCase.id}: ${testCase.expectRuleId} result for ${testCase.auction.join("-")}`
  );

  if (match && testCase.expectedBindings) {
    assert.deepEqual(match.bindings, testCase.expectedBindings, `${testCase.id}: learned suit bindings`);
    assert.ok(match.sequenceExpression, `${testCase.id}: Auctioneer diagnostic expression must be retained`);
  }

  if (testCase.expectMatched) {
    const prefix = testCase.auction.slice(0, -1);
    const expectedCall = testCase.auction[testCase.auction.length - 1];
    const before = loaded.engine.evaluate(prefix, testCase.dealer, {}, testCase.systemSide);
    const suggestion = before.suggestions.find((item) => (
      item.bid === expectedCall && item.fromNodeId === testCase.expectRuleId
    ));
    assert.ok(suggestion, `${testCase.id}: engine must suggest and execute terminal ${expectedCall}`);
    assert.equal(suggestion.sequenceExpression, match.sequenceExpression, `${testCase.id}: suggestion diagnostics`);
  }

  passed += 1;
  console.log(`ok ${passed} - ${testCase.id} ${testCase.category}`);
}

const categoryCounts = Object.fromEntries(
  [...new Set(corpus.map((testCase) => testCase.category))].map((category) => [
    category,
    corpus.filter((testCase) => testCase.category === category).length,
  ])
);
assert.deepEqual(categoryCounts, {
  "two-over-one-positive": 24,
  "two-over-one-negative": 16,
  "explicit-fit-blackwood-positive": 40,
  "explicit-fit-blackwood-negative": 20,
});

console.log(`# ${passed} generated standard-system regex sequences passed`);
