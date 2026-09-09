# Auctioneer follow-up report: sequence expressions

No changes were made to `auctioneer.js`, `auctioneer.html`, or any other HTML file in this work.

The existing Auctioneer already calls `UniversalBiddingEngine.setSystem` and `evaluate`, so sequence rules in a loaded system execute without a UI code change. The engine returns their meanings in `frames[].matches` and their completing calls in `suggestions`.

Recommended Auctioneer follow-ups:

1. Add an explicit partnership/system-side selector and pass `"NS"` or `"EW"` as the fourth argument to `engine.evaluate`. The engine can infer a side from a matched transition tree, but a pattern-only system is inherently ambiguous before its first match.
2. Display `sequenceExpression` and learned `bindings` from matches/suggestions in an optional diagnostic detail. This would make a result such as `1S-2H` visibly explain that `X=S` and `Y=H`.
3. Catch and show sequence compiler errors from `setSystem` beside the system-file control. Errors already identify the failing rule and expression; the current generic load flow does not give them a dedicated presentation.
4. Add a repeatable build/check step that regenerates `Customization/system-data.js` from the JSON sources. The bundle was synchronized in this change, but there was no existing generator to prevent a future JSON/bundle mismatch.
