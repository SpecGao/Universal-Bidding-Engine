"use strict";

const fs = require("node:fs");
const path = require("node:path");

const cases = [];
let serial = 1;

function add(testCase) {
  cases.push({
    id: `regex-auction-${String(serial++).padStart(3, "0")}`,
    ...testCase,
  });
}

const twoOverOnePairs = [
  ["1D", "2C", { X: "D", Y: "C" }],
  ["1H", "2C", { X: "H", Y: "C" }],
  ["1H", "2D", { X: "H", Y: "D" }],
  ["1S", "2C", { X: "S", Y: "C" }],
  ["1S", "2D", { X: "S", Y: "D" }],
  ["1S", "2H", { X: "S", Y: "H" }],
];

const seatVariants = [
  { dealer: "N", systemSide: "NS", wrap: (opening, response) => [opening, "P", response] },
  { dealer: "E", systemSide: "EW", wrap: (opening, response) => [opening, "P", response] },
  { dealer: "N", systemSide: "NS", wrap: (opening, response) => ["P", "P", opening, "P", response] },
  { dealer: "W", systemSide: "EW", wrap: (opening, response) => ["P", "P", opening, "P", response] },
];

for (const [opening, response, expectedBindings] of twoOverOnePairs) {
  for (const variant of seatVariants) {
    add({
      category: "two-over-one-positive",
      systemId: "two-over-one",
      dealer: variant.dealer,
      systemSide: variant.systemSide,
      auction: variant.wrap(opening, response),
      expectRuleId: "two-over-one-learned-sequence",
      expectMatched: true,
      expectedBindings,
    });
  }
}

const twoOverOneNegatives = [
  ["1C", "P", "2C"], ["1C", "P", "2D"], ["1C", "P", "2H"], ["1C", "P", "2S"],
  ["1D", "P", "2D"], ["1D", "P", "2H"], ["1D", "P", "2S"], ["1H", "P", "2H"],
  ["1H", "P", "2S"], ["1S", "P", "2S"], ["1NT", "P", "2C"], ["1NT", "P", "2D"],
  ["1NT", "P", "2H"], ["1NT", "P", "2S"], ["1S", "P", "3H"], ["1H", "P", "3C"],
];

for (const auction of twoOverOneNegatives) {
  add({
    category: "two-over-one-negative",
    systemId: "two-over-one",
    dealer: "N",
    systemSide: "NS",
    auction,
    expectRuleId: "two-over-one-learned-sequence",
    expectMatched: false,
  });
}

const systems = [
  ["standard-natural", "natural-explicit-fit-blackwood"],
  ["two-over-one", "two-over-one-explicit-fit-blackwood"],
  ["precision-1c", "precision-explicit-fit-blackwood"],
  ["acol", "acol-explicit-fit-blackwood"],
];

const blackwoodPositives = [
  { auction: ["1C", "P", "2C", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "C" },
  { auction: ["1D", "P", "2D", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "D" },
  { auction: ["1H", "P", "2H", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "H" },
  { auction: ["1S", "P", "2S", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "S" },
  { auction: ["1H", "P", "1S", "P", "2C", "P", "2H", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "H" },
  { auction: ["1H", "P", "1S", "P", "2S", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "S" },
  { auction: ["1D", "P", "1H", "P", "1S", "P", "2D", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "D" },
  { auction: ["1C", "P", "1D", "P", "1H", "P", "3C", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "C" },
  { auction: ["1H", "P", "2H", "P", "4NT"], dealer: "E", systemSide: "EW", suit: "H" },
  { auction: ["P", "P", "1S", "P", "2S", "P", "4NT"], dealer: "N", systemSide: "NS", suit: "S" },
];

for (const [systemId, expectRuleId] of systems) {
  for (const sample of blackwoodPositives) {
    add({
      category: "explicit-fit-blackwood-positive",
      systemId,
      dealer: sample.dealer,
      systemSide: sample.systemSide,
      auction: sample.auction,
      expectRuleId,
      expectMatched: true,
      expectedBindings: { X: sample.suit },
    });
  }
}

const blackwoodNegatives = [
  ["1H", "P", "1S", "P", "2C", "P", "4NT"],
  ["1H", "P", "1S", "P", "2H", "P", "4NT"],
  ["1NT", "P", "3NT", "P", "4NT"],
  ["1C", "P", "1D", "P", "2C", "P", "4NT"],
  ["1H", "P", "2C", "P", "2S", "P", "4NT"],
];

for (const [systemId, expectRuleId] of systems) {
  for (const auction of blackwoodNegatives) {
    add({
      category: "explicit-fit-blackwood-negative",
      systemId,
      dealer: "N",
      systemSide: "NS",
      auction,
      expectRuleId,
      expectMatched: false,
    });
  }
}

if (cases.length !== 100) {
  throw new Error(`Expected exactly 100 generated sequences, received ${cases.length}`);
}

const outputPath = path.join(__dirname, "generated-standard-system-sequences.json");
fs.writeFileSync(outputPath, `${JSON.stringify(cases, null, 2)}\n`, "utf8");
console.log(`Generated ${cases.length} test sequences in ${outputPath}`);
