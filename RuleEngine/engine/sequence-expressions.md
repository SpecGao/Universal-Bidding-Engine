# Legal bidding-sequence expressions

`BridgeBiddingEngine.compileSequenceExpression(expression, options)` compiles a bidding expression to a legality-aware state machine. The compiler rejects an expression when no concrete Bridge auction can satisfy it. Matching and expansion also discard calls that are illegal in the current auction state.

## Syntax

| Form | Meaning |
| --- | --- |
| `1C`, `4NT`, `P`, `X`, `XX` | An exact call. A bare `X` is double. |
| `#D` | Diamonds at any independently selected legal level. |
| `1M`, `2M` | One learned major (`H` or `S`), persistent within the match. |
| `1m`, `2m` | One learned minor (`C` or `D`), persistent within the match. |
| `1X`, `2Y`, `3Z`, `4W` | Learned non-NT suits. `X` through `W` must first appear in that order and bind to distinct suits. |
| `A-B` | Sequence A followed by B. |
| `(A|B)` | Grouping and alternatives. `(?:A|B)` is also accepted. |
| `*` | Zero or more arbitrary legal calls. |
| `?` | One or more arbitrary legal calls. This is deliberately the project convention, not JavaScript RegExp's zero-or-one quantifier. |
| `^A` | A call by an opponent. `^` can prefix an atom, wildcard, or group; it is not a start anchor. |
| `(?:!=NT)` | Any one contract bid whose denomination is not NT. Denominations support `=`/`!=`; concrete contract operands also support `<`, `>`, `<=`, and `>=`. |

Examples:

```js
const { compileSequenceExpression } = BridgeBiddingEngine;

compileSequenceExpression("1D-#D-4D").expand();
// [["1D", "2D", "4D"], ["1D", "3D", "4D"]]

compileSequenceExpression("1C-1X-3NT").expand();
// middle bid is 1D, 1H, or 1S

compileSequenceExpression("1S-^2C-2H")
  .testExact(["1S", "2C", "2H"], { dealer: "N", systemSide: "NS" });
// true: East's 2C is marked as an opponent call
```

Use `matchExact` or `testExact` when the whole supplied auction must match. `match` and `test` search for a matching contiguous segment, which lets contextual rules such as Blackwood work after earlier system bidding. At an evaluation frame, the engine requires that segment to end on the current call. `next` returns legal calls that can advance the expression and marks calls that complete it. `expand` returns concrete legal sequences; pass `maxCalls` and `limit` when expanding repetition-heavy expressions.

## Bid arithmetic and ordering

The engine numbers contracts from `1C` through `7NT` in bidding order. It exports:

- `addToContractBid("1D", 5)`, which returns `"2D"`;
- `compareContractBids(left, right)`, which returns `-1`, `0`, or `1`;
- `evaluateBidRelation("1D+5=2D")`, which returns `true`.
- `findSequenceOverlap(left, right)`, which returns a concrete legal witness or `null`.

Rules can add `where` relations over learned suits. This describes all natural 2/1 new-suit game forces without six separate tree branches:

```json
{
  "id": "two-over-one",
  "expression": "1X-2Y",
  "where": ["Y<X"],
  "meaning": "2/1 game force",
  "priority": 100
}
```

## System execution

A system may contain a top-level `sequenceRules` array. `UniversalBiddingEngine.setSystem` compiles each rule; `evaluate` adds completed rules to frame meanings and adds legal, expression-completing calls to suggestions. Rule objects accept `id`, `expression` (or `sequence`/`pattern`), `where`, `requiresAgreement`, `meaning`, `alert`, `priority`, `facts`, `generated`, `clearControl`, and the existing hand `filters`.

Without `^`, system execution removes opponent calls before matching, preserving compact partnership notation such as `1X-2Y`. If an expression contains `^`, it is matched against the full auction: unprefixed atoms are system-side calls and `^`-prefixed atoms are opponent calls. For example, `1S-^2C-2H` describes a competitive auction without writing an opponent pass.

Explicit-fit Blackwood is represented by `*-#X-*-#X-*-4NT` with `"requiresAgreement": ["X"]`. The leading wildcard means the learned suit need not be the first call, and the agreement guard requires both partnership seats—not one bidder twice—to have named `X`.

The same symbol matcher is used by ordinary transition-tree `trigger` values. A tree can therefore open with `1X`, retain the learned suit in its path context, and use `2X` for a raise or `2Y` for a distinct new suit. Suggestions are always emitted as concrete legal calls.

## System-independent control bidding

A tree node or sequence rule can enter the shared control-bidding state with `generated.type` set to `control-bids`. The engine resolves the agreed suit, keeps the state after the matching tree path ends, records controls by seat, and records eligible suits bypassed during ascending control bidding as denials by that bidder. An executed generated control is returned as an ordinary frame match with both readable `meaning` text and structured `facts`.

```json
{
  "id": "fit-opening-suit",
  "expression": "1X-2Y-?-#X",
  "where": ["Y<X"],
  "requiresAgreement": ["X"],
  "meaning": "The opening suit is agreed; control bidding is available.",
  "generated": {
    "type": "control-bids",
    "agreedSuit": "{{X}}",
    "style": "first-or-second-round",
    "inferSkipped": true,
    "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
  }
}
```

Splinters use the same mechanism and may preload their short suit as a known control with `knownControls`. Set `clearControl` on a terminal rule such as game, signoff, or RKCB to leave control mode. System files decide when the phase starts and what style it uses; ascending-bid inference and fact maintenance remain engine behavior.
