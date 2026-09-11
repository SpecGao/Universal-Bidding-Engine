(function (global) {
  "use strict";

  const SEAT_ORDER = ["N", "E", "S", "W"];
  const SUITS = ["C", "D", "H", "S", "N"];
  const CONTRACT_DENOMINATIONS = ["C", "D", "H", "S", "NT"];
  const SUIT_VARIABLES = ["X", "Y", "Z", "W"];
  const ABSTRACT_SUIT_CANDIDATES = {
    M: ["H", "S"],
    m: ["C", "D"],
    X: ["C", "D", "H", "S"],
    Y: ["C", "D", "H", "S"],
    Z: ["C", "D", "H", "S"],
    W: ["C", "D", "H", "S"],
  };
  const BID_SORT_WEIGHT = {
    P: 0,
    X: 1,
    XX: 2,
  };
  for (let i = 1; i <= 7; i++) {
    BID_SORT_WEIGHT[`${i}C`] = 10 + i * 10 + 1;
    BID_SORT_WEIGHT[`${i}D`] = 10 + i * 10 + 2;
    BID_SORT_WEIGHT[`${i}H`] = 10 + i * 10 + 3;
    BID_SORT_WEIGHT[`${i}S`] = 10 + i * 10 + 4;
    BID_SORT_WEIGHT[`${i}NT`] = 10 + i * 10 + 5;
  }

  function contractBidIndex(rawBid) {
    const bid = rawBid && rawBid.code ? rawBid : parseBid(rawBid);
    if (!bid || bid.type !== "bid") return null;
    const denominationIndex = CONTRACT_DENOMINATIONS.indexOf(bid.suit);
    return denominationIndex < 0 ? null : (bid.level - 1) * 5 + denominationIndex;
  }

  function contractBidFromIndex(index) {
    const numericIndex = Number(index);
    if (!Number.isInteger(numericIndex) || numericIndex < 0 || numericIndex >= 35) return null;
    const level = Math.floor(numericIndex / 5) + 1;
    return `${level}${CONTRACT_DENOMINATIONS[numericIndex % 5]}`;
  }

  function addToContractBid(rawBid, offset) {
    const index = contractBidIndex(rawBid);
    const numericOffset = Number(offset);
    if (index == null || !Number.isInteger(numericOffset)) return null;
    return contractBidFromIndex(index + numericOffset);
  }

  function compareContractBids(left, right) {
    const leftIndex = contractBidIndex(left);
    const rightIndex = contractBidIndex(right);
    if (leftIndex == null || rightIndex == null) return null;
    return Math.sign(leftIndex - rightIndex);
  }

  function parseBid(raw) {
    if (raw == null) return null;
    const t = String(raw).trim().toUpperCase().replace(/\s+/g, "");
    if (!t) return null;

    if (t === "P" || t === "PASS") {
      return { type: "pass", code: "P", level: 0, suit: "P" };
    }
    if (t === "X" || t === "DBL") {
      return { type: "double", code: "X", level: 0, suit: "X" };
    }
    if (t === "XX" || t === "X X" || t === "REDOUBLE" || t === "RDBL") {
      return { type: "redouble", code: "XX", level: 0, suit: "XX" };
    }

    const m = t.match(/^([1-7])(?:([CDHS])|(NT)|N)$/);
    if (!m) return null;
    const level = Number(m[1]);
    const suit = m[2] || "NT";
    return {
      type: "bid",
      code: `${level}${suit}`,
      level,
      suit,
    };
  }

  function bidToCode(bid) {
    if (!bid) return "";
    if (bid.type === "pass") return "P";
    if (bid.type === "double") return "X";
    if (bid.type === "redouble") return "XX";
    return `${bid.level}${bid.suit}`;
  }

  function seatOf(indexFromDealer, dealer) {
    const start = SEAT_ORDER.indexOf(dealer);
    const normalizedStart = start >= 0 ? start : 0;
    const seatIndex = (normalizedStart + indexFromDealer) % SEAT_ORDER.length;
    return SEAT_ORDER[seatIndex];
  }

  function seatSideOfSeat(seat) {
    return seat === "N" || seat === "S" ? "NS" : "EW";
  }

  function belongsToSystemSide(context, seat) {
    const systemSide = context && context.systemSide;
    return !systemSide || systemSide === seatSideOfSeat(seat);
  }

  function normalizeCallValue(rawCall) {
    if (!rawCall) return null;
    return rawCall && rawCall.code ? rawCall : parseBid(rawCall);
  }

  function bridgeStateFromAuction(auctionCalls, dealer) {
    const calls = Array.isArray(auctionCalls) ? auctionCalls : [];
    let highestBidWeight = 0;
    let lastBidSeat = null;
    let doublerSeat = null;
    let isRedoubled = false;
    let hasBid = false;
    let consecutivePasses = 0;

    for (let i = 0; i < calls.length; i++) {
      const call = normalizeCallValue(calls[i]);
      if (!call) continue;
      const seat = seatOf(i, dealer);

      if (call.type === "pass") {
        consecutivePasses += 1;
        continue;
      }

      consecutivePasses = 0;

      if (call.type === "bid") {
        const weight = BID_SORT_WEIGHT[call.code];
        if (Number.isFinite(weight) && weight > highestBidWeight) {
          highestBidWeight = weight;
        }
        lastBidSeat = seat;
        hasBid = true;
        doublerSeat = null;
        isRedoubled = false;
        continue;
      }

      if (call.type === "double") {
        if (lastBidSeat != null && seatSideOfSeat(seat) !== seatSideOfSeat(lastBidSeat) && doublerSeat == null) {
          doublerSeat = seat;
          isRedoubled = false;
        }
        continue;
      }

      if (call.type === "redouble") {
        if (doublerSeat != null && seatSideOfSeat(seat) !== seatSideOfSeat(doublerSeat) && !isRedoubled) {
          doublerSeat = seat;
          isRedoubled = true;
        }
      }
    }

    const auctionOver = hasBid ? consecutivePasses >= 3 : consecutivePasses >= 4;
    return {
      hasBid,
      highestBidWeight,
      lastBidSeat,
      doublerSeat,
      isRedoubled,
      consecutivePasses,
      auctionOver,
      callsCount: calls.length,
    };
  }

  function legalBidCodesForState(auctionCalls, dealer) {
    const state = bridgeStateFromAuction(auctionCalls, dealer);
    const nextSeat = seatOf(state.callsCount, dealer);
    const legal = new Set();

    if (state.auctionOver) return legal;

    legal.add("P");

    for (let level = 1; level <= 7; level++) {
      for (const suit of ["C", "D", "H", "S", "NT"]) {
        const code = bidToCode(parseBid(`${level}${suit}`));
        if (BID_SORT_WEIGHT[code] > state.highestBidWeight) {
          legal.add(code);
        }
      }
    }

    if (state.hasBid && state.lastBidSeat && state.doublerSeat == null && seatSideOfSeat(nextSeat) !== seatSideOfSeat(state.lastBidSeat)) {
      legal.add("X");
    }

    if (state.doublerSeat && !state.isRedoubled && seatSideOfSeat(nextSeat) !== seatSideOfSeat(state.doublerSeat)) {
      legal.add("XX");
    }

    return legal;
  }

  function parsePatternBid(raw) {
    const compact = String(raw == null ? "" : raw).trim().replace(/\s+/g, "");
    const match = compact.match(/^([#1-7])(NT|[CDHSMmXYZWxyzw])$/);
    if (!match) return null;
    const levelToken = match[1];
    const rawSuit = match[2];
    const suitToken = rawSuit === "m" ? "m" : rawSuit.toUpperCase();
    const symbolicSuit = Object.prototype.hasOwnProperty.call(ABSTRACT_SUIT_CANDIDATES, suitToken);
    if (levelToken !== "#" && !symbolicSuit) {
      const parsed = parseBid(`${levelToken}${suitToken}`);
      return parsed ? { kind: "exact", code: parsed.code } : null;
    }
    const allowedSuits = symbolicSuit ? ABSTRACT_SUIT_CANDIDATES[suitToken] : [suitToken];
    if (!allowedSuits || !allowedSuits.length) return null;
    return {
      kind: "contract-pattern",
      level: levelToken === "#" ? null : Number(levelToken),
      suitToken,
      allowedSuits: allowedSuits.slice(),
      bindsSuit: symbolicSuit,
    };
  }

  function cloneBindings(bindings) {
    return Object.assign({}, bindings || {});
  }

  function bindingKey(bindings) {
    return Object.keys(bindings || {}).sort().map((key) => `${key}:${bindings[key]}`).join(",");
  }

  function resolveSuitToken(token, bindings) {
    if (CONTRACT_DENOMINATIONS.includes(token)) return token;
    if (Object.prototype.hasOwnProperty.call(bindings || {}, token)) return bindings[token];
    return null;
  }

  function resolveRelationOperand(rawOperand, bindings, currentCall) {
    const compact = String(rawOperand == null ? "" : rawOperand).trim().replace(/\s+/g, "");
    if (!compact) return null;

    const arithmeticMatch = compact.match(/^(.*?)([+-]\d+)$/);
    const base = arithmeticMatch ? arithmeticMatch[1] : compact;
    const offset = arithmeticMatch ? Number(arithmeticMatch[2]) : 0;
    const currentCode = currentCall && currentCall.code ? currentCall.code : bidToCode(parseBid(currentCall));

    if (base === "." || base.toUpperCase() === "BID") {
      const index = contractBidIndex(currentCode);
      if (index == null) return null;
      const shifted = index + offset;
      return shifted >= 0 && shifted < 35 ? { type: "bid", value: shifted } : null;
    }

    const patternBid = parsePatternBid(base);
    if (patternBid) {
      if (patternBid.kind === "exact") {
        const index = contractBidIndex(patternBid.code);
        const shifted = index + offset;
        return shifted >= 0 && shifted < 35 ? { type: "bid", value: shifted } : null;
      }
      if (patternBid.level == null) return null;
      const suit = resolveSuitToken(patternBid.suitToken, bindings);
      if (!suit) return null;
      const index = contractBidIndex(`${patternBid.level}${suit}`);
      const shifted = index + offset;
      return shifted >= 0 && shifted < 35 ? { type: "bid", value: shifted } : null;
    }

    const suitToken = base === "m" ? "m" : base.toUpperCase();
    const suit = resolveSuitToken(suitToken, bindings);
    if (suit && offset === 0) {
      return { type: "suit", value: CONTRACT_DENOMINATIONS.indexOf(suit) };
    }

    if (/^-?\d+$/.test(base) && offset === 0) {
      return { type: "number", value: Number(base) };
    }
    return null;
  }

  function parseBidRelation(rawRelation) {
    const relation = String(rawRelation == null ? "" : rawRelation).trim();
    const match = relation.match(/^(.+?)(<=|>=|!=|==|=|<|>)(.+)$/);
    if (!match) throw new Error(`Invalid bid relation: ${relation || "(empty)"}`);
    return { left: match[1].trim(), operator: match[2], right: match[3].trim(), source: relation };
  }

  function evaluateParsedBidRelation(relation, bindings, currentCall) {
    const left = resolveRelationOperand(relation.left, bindings, currentCall);
    const right = resolveRelationOperand(relation.right, bindings, currentCall);
    if (!left || !right || left.type !== right.type) return null;
    if (relation.operator === "=" || relation.operator === "==") return left.value === right.value;
    if (relation.operator === "!=") return left.value !== right.value;
    if (relation.operator === "<") return left.value < right.value;
    if (relation.operator === ">") return left.value > right.value;
    if (relation.operator === "<=") return left.value <= right.value;
    if (relation.operator === ">=") return left.value >= right.value;
    return false;
  }

  function evaluateBidRelation(rawRelation, bindings) {
    const relation = typeof rawRelation === "string" ? parseBidRelation(rawRelation) : rawRelation;
    const result = evaluateParsedBidRelation(relation, bindings || {}, null);
    if (result == null) {
      throw new Error(`Bid relation cannot be resolved: ${relation.source || rawRelation}`);
    }
    return result;
  }

  function tokenizeSequenceExpression(source) {
    const tokens = [];
    let index = 0;
    while (index < source.length) {
      const char = source[index];
      if (/\s/.test(char)) {
        index += 1;
        continue;
      }
      if (source.slice(index, index + 3) === "(?:") {
        tokens.push({ type: "(" });
        index += 3;
        continue;
      }
      if (["-", "|", "(", ")", "*", "?", "^"].includes(char)) {
        tokens.push({ type: char });
        index += 1;
        continue;
      }
      let end = index;
      while (end < source.length && !/[\s\-|()*?^]/.test(source[end])) end += 1;
      if (end === index) throw new Error(`Unexpected character “${source[index]}” at ${index + 1}`);
      tokens.push({ type: "atom", value: source.slice(index, end) });
      index = end;
    }
    return tokens;
  }

  function predicateAtomFromText(text) {
    const match = String(text || "").match(/^(<=|>=|!=|==|=|<|>)(.+)$/);
    if (!match) return null;
    return { kind: "predicate", operator: match[1], operand: match[2] };
  }

  function expressionAtomFromText(text) {
    const predicate = predicateAtomFromText(text);
    if (predicate) return predicate;
    const patternBid = parsePatternBid(text);
    if (patternBid) return patternBid;
    const call = parseBid(text);
    if (call) return { kind: "exact", code: call.code };
    throw new Error(`Invalid bidding-expression atom: ${text}`);
  }

  function parseSequenceExpression(source) {
    const tokens = tokenizeSequenceExpression(source);
    let position = 0;

    function current() {
      return tokens[position] || null;
    }

    function setExpressionActor(node, actor) {
      if (node.type === "atom") {
        return { ...node, atom: { ...node.atom, actor } };
      }
      if (node.type === "repeat") {
        return { ...node, child: setExpressionActor(node.child, actor) };
      }
      if (node.type === "sequence") {
        return { ...node, children: node.children.map((child) => setExpressionActor(child, actor)) };
      }
      if (node.type === "alternation") {
        return { ...node, branches: node.branches.map((branch) => setExpressionActor(branch, actor)) };
      }
      return node;
    }

    function parsePrimary() {
      const token = current();
      if (!token) throw new Error("Unexpected end of bidding expression");
      if (token.type === "^") {
        position += 1;
        if (!current() || current().type === "^") {
          throw new Error("^ must be followed by an opponent bid, wildcard, or group");
        }
        return setExpressionActor(parsePrimary(), "opponent");
      }
      if (token.type === "*") {
        position += 1;
        return { type: "repeat", child: { type: "atom", atom: { kind: "any" } }, min: 0 };
      }
      if (token.type === "?") {
        position += 1;
        return { type: "repeat", child: { type: "atom", atom: { kind: "any" } }, min: 1 };
      }
      if (token.type === "(") {
        position += 1;
        const node = parseAlternation();
        if (!current() || current().type !== ")") throw new Error("Unclosed group in bidding expression");
        position += 1;
        return node;
      }
      if (token.type !== "atom") throw new Error(`Expected a bid at expression token ${position + 1}`);
      position += 1;
      return { type: "atom", atom: expressionAtomFromText(token.value) };
    }

    function parseTerm() {
      const primary = parsePrimary();
      const token = current();
      if (token && (token.type === "*" || token.type === "?")) {
        position += 1;
        return { type: "repeat", child: primary, min: token.type === "*" ? 0 : 1 };
      }
      return primary;
    }

    function canStartTerm(token) {
      return Boolean(token && ["atom", "(", "*", "?", "^"].includes(token.type));
    }

    function parseSequence() {
      const children = [];
      while (canStartTerm(current())) {
        children.push(parseTerm());
        if (current() && current().type === "-") {
          position += 1;
          if (!canStartTerm(current())) throw new Error("A dash must be followed by a bid or group");
        } else if (!canStartTerm(current())) {
          break;
        }
      }
      if (!children.length) return { type: "empty" };
      return children.length === 1 ? children[0] : { type: "sequence", children };
    }

    function parseAlternation() {
      const branches = [parseSequence()];
      while (current() && current().type === "|") {
        position += 1;
        branches.push(parseSequence());
      }
      return branches.length === 1 ? branches[0] : { type: "alternation", branches };
    }

    if (!tokens.length) throw new Error("Bidding expression cannot be empty");
    const ast = parseAlternation();
    if (position !== tokens.length) throw new Error(`Unexpected token ${tokens[position].type} in bidding expression`);
    return ast;
  }

  function expressionHasOpponentAtoms(ast) {
    if (!ast) return false;
    if (ast.type === "atom") return ast.atom && ast.atom.actor === "opponent";
    if (ast.type === "repeat") return expressionHasOpponentAtoms(ast.child);
    if (ast.type === "sequence") return ast.children.some(expressionHasOpponentAtoms);
    if (ast.type === "alternation") return ast.branches.some(expressionHasOpponentAtoms);
    return false;
  }

  function buildSequenceNfa(ast) {
    const states = [];
    function newState() {
      const state = { id: states.length, transitions: [] };
      states.push(state);
      return state.id;
    }
    function epsilon(from, to) {
      states[from].transitions.push({ type: "epsilon", to });
    }
    function fragment(node) {
      if (node.type === "empty") {
        const start = newState();
        const end = newState();
        epsilon(start, end);
        return { start, end };
      }
      if (node.type === "atom") {
        const start = newState();
        const end = newState();
        states[start].transitions.push({ type: "atom", atom: node.atom, to: end });
        return { start, end };
      }
      if (node.type === "sequence") {
        const parts = node.children.map(fragment);
        for (let i = 0; i < parts.length - 1; i++) epsilon(parts[i].end, parts[i + 1].start);
        return { start: parts[0].start, end: parts[parts.length - 1].end };
      }
      if (node.type === "alternation") {
        const start = newState();
        const end = newState();
        for (const branch of node.branches) {
          const part = fragment(branch);
          epsilon(start, part.start);
          epsilon(part.end, end);
        }
        return { start, end };
      }
      if (node.type === "repeat") {
        const start = newState();
        const end = newState();
        const part = fragment(node.child);
        epsilon(start, part.start);
        if (node.min === 0) epsilon(start, end);
        epsilon(part.end, part.start);
        epsilon(part.end, end);
        return { start, end };
      }
      throw new Error(`Unsupported bidding-expression node: ${node.type}`);
    }
    const built = fragment(ast);
    return { states, start: built.start, accept: built.end };
  }

  function matchPredicateAtom(atom, call) {
    if (!call || call.type !== "bid") return false;
    const rawOperand = String(atom.operand || "").trim();
    const suitOperand = rawOperand === "m" ? "m" : rawOperand.toUpperCase();
    let equality;
    if (suitOperand === "M") equality = call.suit === "H" || call.suit === "S";
    else if (suitOperand === "m") equality = call.suit === "C" || call.suit === "D";
    else if (CONTRACT_DENOMINATIONS.includes(suitOperand)) equality = call.suit === suitOperand;
    else {
      const relation = {
        left: "BID",
        operator: atom.operator,
        right: rawOperand,
        source: `BID${atom.operator}${rawOperand}`,
      };
      const result = evaluateParsedBidRelation(relation, {}, call);
      return result === true;
    }
    if (atom.operator === "=" || atom.operator === "==") return equality;
    if (atom.operator === "!=") return !equality;
    return false;
  }

  function matchExpressionAtom(atom, call, bindings) {
    if (!call) return null;
    const actualActor = call._expressionActor || call.expressionActor || call.actor || "system";
    const requiredActor = atom.actor || "system";
    if (actualActor !== requiredActor) return null;
    if (atom.kind === "any") return cloneBindings(bindings);
    if (atom.kind === "predicate") return matchPredicateAtom(atom, call) ? cloneBindings(bindings) : null;
    if (atom.kind === "exact") return call.code === atom.code ? cloneBindings(bindings) : null;
    if (atom.kind !== "contract-pattern" || call.type !== "bid") return null;
    if (atom.level != null && call.level !== atom.level) return null;
    if (!atom.allowedSuits.includes(call.suit)) return null;
    if (!atom.bindsSuit) return cloneBindings(bindings);

    const existing = bindings && bindings[atom.suitToken];
    if (existing) return existing === call.suit ? cloneBindings(bindings) : null;

    if (SUIT_VARIABLES.includes(atom.suitToken)) {
      const expected = SUIT_VARIABLES.find((symbol) => !bindings || !bindings[symbol]);
      if (expected !== atom.suitToken) return null;
      const used = new Set(SUIT_VARIABLES.map((symbol) => bindings && bindings[symbol]).filter(Boolean));
      if (used.has(call.suit)) return null;
    }

    const learned = cloneBindings(bindings);
    learned[atom.suitToken] = call.suit;
    return learned;
  }

  function constraintsAllow(constraints, bindings, requireResolved) {
    for (const constraint of constraints || []) {
      const result = evaluateParsedBidRelation(constraint, bindings || {}, null);
      if (result === false || (requireResolved && result == null)) return false;
    }
    return true;
  }

  function epsilonClosure(nfa, configs) {
    const output = [];
    const queue = configs.slice();
    const seen = new Set();
    while (queue.length) {
      const config = queue.shift();
      const key = `${config.state}|${config.startIndex}|${bindingKey(config.bindings)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      output.push(config);
      for (const transition of nfa.states[config.state].transitions) {
        if (transition.type === "epsilon") {
          queue.push({ state: transition.to, bindings: config.bindings, startIndex: config.startIndex });
        }
      }
    }
    return output;
  }

  function advanceSequenceNfa(compiled, configs, call) {
    const next = [];
    for (const config of epsilonClosure(compiled.nfa, configs)) {
      for (const transition of compiled.nfa.states[config.state].transitions) {
        if (transition.type !== "atom") continue;
        const bindings = matchExpressionAtom(transition.atom, call, config.bindings);
        if (!bindings || !constraintsAllow(compiled.constraints, bindings, false)) continue;
        next.push({ state: transition.to, bindings, startIndex: config.startIndex });
      }
    }
    return epsilonClosure(compiled.nfa, next);
  }

  function acceptingSequenceConfigs(compiled, configs) {
    return epsilonClosure(compiled.nfa, configs).filter((config) => (
      config.state === compiled.nfa.accept && constraintsAllow(compiled.constraints, config.bindings, true)
    ));
  }

  function normalizeSequenceCalls(rawCalls) {
    const calls = [];
    for (const rawCall of Array.isArray(rawCalls) ? rawCalls : []) {
      const call = normalizeCallValue(rawCall);
      if (!call) return null;
      calls.push(call);
    }
    return calls;
  }

  function expressionActorForIndex(index, dealer, systemSide) {
    if (systemSide !== "NS" && systemSide !== "EW") return "system";
    return seatSideOfSeat(seatOf(index, dealer || "N")) === systemSide ? "system" : "opponent";
  }

  function annotateSequenceActors(compiled, calls, options) {
    const opts = options || {};
    if (!compiled.hasOpponentAtoms || (calls || []).every((call) => call && call._expressionActor)) {
      return calls;
    }
    if (opts.systemSide !== "NS" && opts.systemSide !== "EW") return calls;
    return calls.map((call, index) => ({
      ...call,
      _expressionActor: expressionActorForIndex(index, opts.dealer || "N", opts.systemSide),
    }));
  }

  function validateAuctionCalls(calls, dealer) {
    const prefix = [];
    for (let index = 0; index < calls.length; index++) {
      if (!legalBidCodesForState(prefix, dealer).has(calls[index].code)) {
        return { valid: false, invalidIndex: index };
      }
      prefix.push(calls[index]);
    }
    return { valid: true, invalidIndex: -1 };
  }

  function simulateSequenceExpression(compiled, calls, options) {
    const opts = options || {};
    const exact = Boolean(opts.exact);
    let active = exact
      ? epsilonClosure(compiled.nfa, [{ state: compiled.nfa.start, bindings: {}, startIndex: 0 }])
      : [];
    const matches = [];

    if (exact && !calls.length) {
      for (const config of acceptingSequenceConfigs(compiled, active)) {
        matches.push({ startIndex: 0, endIndex: -1, bindings: cloneBindings(config.bindings) });
      }
    }

    for (let index = 0; index < calls.length; index++) {
      if (!exact) {
        active = epsilonClosure(compiled.nfa, active.concat({
          state: compiled.nfa.start,
          bindings: {},
          startIndex: index,
        }));
      }
      active = advanceSequenceNfa(compiled, active, calls[index]);
      for (const config of acceptingSequenceConfigs(compiled, active)) {
        matches.push({
          startIndex: config.startIndex,
          endIndex: index,
          bindings: cloneBindings(config.bindings),
        });
      }
    }

    const relevantMatches = exact
      ? matches.filter((match) => match.startIndex === 0 && match.endIndex === calls.length - 1)
      : matches;
    relevantMatches.sort((left, right) => (
      right.endIndex - left.endIndex || left.startIndex - right.startIndex
    ));
    return { active, matches: relevantMatches };
  }

  function sequenceMatchResult(compiled, rawCalls, options) {
    const opts = options || {};
    let calls = normalizeSequenceCalls(rawCalls);
    if (!calls) return { matched: false, error: "Auction contains an invalid call.", invalidIndex: -1 };
    calls = annotateSequenceActors(compiled, calls, opts);
    if (opts.validateAuction !== false) {
      const validity = validateAuctionCalls(calls, opts.dealer || "N");
      if (!validity.valid) {
        return {
          matched: false,
          error: `Auction call ${validity.invalidIndex + 1} is illegal.`,
          invalidIndex: validity.invalidIndex,
        };
      }
    }
    const simulation = simulateSequenceExpression(compiled, calls, opts);
    const match = simulation.matches[0] || null;
    return {
      matched: Boolean(match),
      bindings: match ? match.bindings : {},
      startIndex: match ? match.startIndex : -1,
      endIndex: match ? match.endIndex : -1,
      matches: simulation.matches,
    };
  }

  function sequenceNextCalls(compiled, rawCalls, options) {
    const opts = options || {};
    let calls = normalizeSequenceCalls(rawCalls);
    if (!calls) return [];
    calls = annotateSequenceActors(compiled, calls, opts);
    if (opts.validateAuction !== false) {
      const validity = validateAuctionCalls(calls, opts.dealer || "N");
      if (!validity.valid) return [];
    }
    const simulation = simulateSequenceExpression(compiled, calls, { exact: false });
    const base = epsilonClosure(compiled.nfa, simulation.active.concat({
      state: compiled.nfa.start,
      bindings: {},
      startIndex: calls.length,
    }));
    const legalAuction = normalizeSequenceCalls(opts.legalAuction || rawCalls) || calls;
    const legalCodes = [...legalBidCodesForState(legalAuction, opts.dealer || "N")];
    const out = [];
    for (const code of legalCodes) {
      const call = parseBid(code);
      if (compiled.hasOpponentAtoms) {
        call._expressionActor = opts.nextActor || expressionActorForIndex(
          (opts.legalAuction || rawCalls || []).length,
          opts.dealer || "N",
          opts.systemSide
        );
      }
      const next = advanceSequenceNfa(compiled, base, call);
      if (!next.length) continue;
      const accepting = acceptingSequenceConfigs(compiled, next);
      const configs = accepting.length ? accepting : next;
      out.push({
        bid: code,
        completes: accepting.length > 0,
        bindings: configs.map((config) => cloneBindings(config.bindings)),
      });
    }
    out.sort((left, right) => (BID_SORT_WEIGHT[left.bid] || 1000) - (BID_SORT_WEIGHT[right.bid] || 1000));
    return out;
  }

  function expandCompiledSequence(compiled, options) {
    const opts = options || {};
    if (compiled.hasOpponentAtoms && !opts._actorSideResolved && opts.systemSide !== "NS" && opts.systemSide !== "EW") {
      const combined = [];
      const used = new Set();
      for (const systemSide of ["NS", "EW"]) {
        for (const sequence of expandCompiledSequence(compiled, { ...opts, systemSide, _actorSideResolved: true })) {
          const key = sequence.join("-");
          if (!used.has(key)) {
            used.add(key);
            combined.push(sequence);
          }
          if (combined.length >= Math.max(1, Number(opts.limit || 1000))) return combined;
        }
      }
      return combined;
    }
    const limit = Math.max(1, Number(opts.limit || 1000));
    const maxCalls = Math.max(0, Number(opts.maxCalls == null ? 12 : opts.maxCalls));
    const dealer = opts.dealer || "N";
    const queue = [{
      calls: [],
      configs: epsilonClosure(compiled.nfa, [{ state: compiled.nfa.start, bindings: {}, startIndex: 0 }]),
    }];
    const expansions = [];
    const used = new Set();

    while (queue.length && expansions.length < limit) {
      const item = queue.shift();
      if (acceptingSequenceConfigs(compiled, item.configs).length) {
        const sequence = item.calls.map((call) => call.code);
        const key = sequence.join("-");
        if (!used.has(key)) {
          used.add(key);
          expansions.push(sequence);
        }
      }
      if (item.calls.length >= maxCalls) continue;
      const legalCodes = [...legalBidCodesForState(item.calls, dealer)];
      for (const code of legalCodes) {
        const call = parseBid(code);
        const expressionCall = compiled.hasOpponentAtoms
          ? { ...call, _expressionActor: expressionActorForIndex(item.calls.length, dealer, opts.systemSide) }
          : call;
        const next = advanceSequenceNfa(compiled, item.configs, expressionCall);
        if (next.length) queue.push({ calls: item.calls.concat(call), configs: next });
      }
    }
    return expansions;
  }

  function findSequenceOverlap(leftExpression, rightExpression, options) {
    const opts = options || {};
    const left = typeof leftExpression === "string"
      ? compileSequenceExpression(leftExpression, { where: opts.leftWhere })
      : leftExpression;
    const right = typeof rightExpression === "string"
      ? compileSequenceExpression(rightExpression, { where: opts.rightWhere })
      : rightExpression;
    if (!left || !left.nfa || !right || !right.nfa) {
      throw new Error("Both overlap operands must be compiled bidding expressions or expression strings");
    }

    const maxCalls = Math.max(0, Number(opts.maxCalls == null ? 16 : opts.maxCalls));
    const maxStates = Math.max(1, Number(opts.maxStates == null ? 50000 : opts.maxStates));
    const dealer = opts.dealer || "N";
    const systemSide = opts.systemSide === "EW" ? "EW" : "NS";
    const actorAware = left.hasOpponentAtoms || right.hasOpponentAtoms;
    const queue = [{
      calls: [],
      leftConfigs: epsilonClosure(left.nfa, [{ state: left.nfa.start, bindings: {}, startIndex: 0 }]),
      rightConfigs: epsilonClosure(right.nfa, [{ state: right.nfa.start, bindings: {}, startIndex: 0 }]),
    }];
    let visited = 0;

    while (queue.length && visited < maxStates) {
      const item = queue.shift();
      visited += 1;
      if (
        acceptingSequenceConfigs(left, item.leftConfigs).length
        && acceptingSequenceConfigs(right, item.rightConfigs).length
      ) {
        return item.calls.map((call) => call.code);
      }
      if (item.calls.length >= maxCalls) continue;
      for (const code of legalBidCodesForState(item.calls, dealer)) {
        const call = parseBid(code);
        const actor = expressionActorForIndex(item.calls.length, dealer, systemSide);
        const leftNext = actorAware && !left.hasOpponentAtoms && actor === "opponent"
          ? item.leftConfigs
          : advanceSequenceNfa(left, item.leftConfigs, left.hasOpponentAtoms ? { ...call, _expressionActor: actor } : call);
        if (!leftNext.length) continue;
        const rightNext = actorAware && !right.hasOpponentAtoms && actor === "opponent"
          ? item.rightConfigs
          : advanceSequenceNfa(right, item.rightConfigs, right.hasOpponentAtoms ? { ...call, _expressionActor: actor } : call);
        if (!rightNext.length) continue;
        queue.push({
          calls: item.calls.concat(call),
          leftConfigs: leftNext,
          rightConfigs: rightNext,
        });
      }
    }
    return null;
  }

  function compileSequenceExpression(source, options) {
    const expression = String(source == null ? "" : source).trim();
    const opts = options || {};
    const ast = parseSequenceExpression(expression);
    const constraints = (Array.isArray(opts.where) ? opts.where : opts.where ? [opts.where] : [])
      .map(parseBidRelation);
    const compiled = {
      source: expression,
      ast,
      nfa: buildSequenceNfa(ast),
      constraints,
      hasOpponentAtoms: expressionHasOpponentAtoms(ast),
      match(rawCalls, matchOptions) {
        return sequenceMatchResult(compiled, rawCalls, Object.assign({}, matchOptions, { exact: false }));
      },
      matchExact(rawCalls, matchOptions) {
        return sequenceMatchResult(compiled, rawCalls, Object.assign({}, matchOptions, { exact: true }));
      },
      test(rawCalls, matchOptions) {
        return compiled.match(rawCalls, matchOptions).matched;
      },
      testExact(rawCalls, matchOptions) {
        return compiled.matchExact(rawCalls, matchOptions).matched;
      },
      next(rawCalls, nextOptions) {
        return sequenceNextCalls(compiled, rawCalls, nextOptions);
      },
      expand(expandOptions) {
        return expandCompiledSequence(compiled, expandOptions);
      },
    };
    if (!expandCompiledSequence(compiled, { limit: 1, maxCalls: Number(opts.validationMaxCalls || 40) }).length) {
      throw new Error(`Bidding expression has no legal concrete sequence: ${expression}`);
    }
    return compiled;
  }

  function handFilterDefaults() {
    return {
      minHcp: 0,
      maxHcp: 40,
      minSuit: { C: 0, D: 0, H: 0, S: 0 },
      maxSuit: { C: 13, D: 13, H: 13, S: 13 },
      controls: { C: "", D: "", H: "", S: "" },
    };
  }

  function normalizeMaxHcpConstraint(v, defaultVal) {
    if (v == null) return defaultVal;
    const parsed = Number(v);
    return Number.isNaN(parsed) ? defaultVal : parsed;
  }

  function suitConstraintFor(map, suit, bindings, mode, fallback) {
    let value = fallback;
    let matched = false;
    for (const [token, rawValue] of Object.entries(map || {})) {
      const resolvedSuit = resolveSuitToken(token, bindings || {});
      if (resolvedSuit !== suit) continue;
      const numeric = Number(rawValue);
      if (Number.isNaN(numeric)) continue;
      value = !matched
        ? numeric
        : mode === "min" ? Math.max(value, numeric) : Math.min(value, numeric);
      matched = true;
    }
    return value;
  }

  function passesFilters(transitionFilters, handFilter, seat, systemSeat, symbolBindings) {
    const f = transitionFilters || {};
    if (!handFilter) handFilter = handFilterDefaults();

    if (f.seat != null && seat && f.seat !== seat) return false;
    const handMinHcp = Number(handFilter.minHcp == null ? 0 : handFilter.minHcp);
    const handMaxHcp = Number(handFilter.maxHcp == null ? 40 : handFilter.maxHcp);
    const ruleMinHcp = Number(f.minHcp == null ? 0 : f.minHcp);
    const ruleMaxHcp = Number(f.maxHcp == null ? 40 : f.maxHcp);
    if (handMaxHcp < ruleMinHcp || handMinHcp > ruleMaxHcp) return false;

    for (const suit of ["C", "D", "H", "S"]) {
      const handMin = Number(handFilter.minSuit?.[suit] || 0);
      const handMax = Number(handFilter.maxSuit?.[suit] == null ? 13 : handFilter.maxSuit[suit]);
      const ruleMin = suitConstraintFor(f.minSuit, suit, symbolBindings, "min", 0);
      const ruleMax = suitConstraintFor(f.maxSuit, suit, symbolBindings, "max", 13);
      if (handMax < ruleMin || handMin > ruleMax) return false;
    }
    if (f.controlsMustHave) {
      for (const suit of ["C", "D", "H", "S"]) {
        const required = suitConstraintFor(f.controlsMustHave, suit, symbolBindings, "min", 0);
        if (Number(handFilter.controls[suit] || 0) < required) return false;
      }
    }
    if (f.requires && f.requires !== "none") {
      if (handFilter && handFilter.requires && handFilter.requires.indexOf(f.requires) === -1) {
        return false;
      }
    }
    if (systemSeat && f.onlyForSystemSeat && systemSeat !== "any" && systemSeat !== "opener" && systemSeat !== "responder") {
      // reserved for future relative-seat expansion
      return false;
    }
    return true;
  }

  function hasPriorBid(auctionCalls, callIndex) {
    for (let index = 0; index < callIndex; index++) {
      const call = auctionCalls[index];
      if (call && call.type === "bid") return true;
    }
    return false;
  }

  function matchesAuctionRole(transitionFilters, auctionCalls, callIndex) {
    const role = transitionFilters && transitionFilters.auctionRole;
    if (!role) return true;
    const priorBid = hasPriorBid(auctionCalls, callIndex);
    if (role === "opening") return !priorBid;
    if (role === "overcall") return priorBid;
    if (role === "contextual") return false;
    return true;
  }

  function normalizeNode(node, counter) {
    node.id = node.id || `node-${counter.next++}`;
    node.children = Array.isArray(node.children) ? node.children : [];
    node.filters = node.filters || {};
    node.facts = normalizeFacts(node.facts);
    node.alert = Boolean(node.alert);
    node.meaning = node.meaning || "";
    node.generated = node.generated || null;
    node.clearControl = node.clearControl || false;
    node.children.forEach((child) => normalizeNode(child, counter));
  }

  function isPlainFactObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function cloneFactValue(value) {
    if (Array.isArray(value)) return value.map(cloneFactValue);
    if (!isPlainFactObject(value)) return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneFactValue(item)]));
  }

  function normalizeFacts(value) {
    return isPlainFactObject(value) ? cloneFactValue(value) : {};
  }

  function mergeFacts(base, patch) {
    const result = normalizeFacts(base);
    if (!isPlainFactObject(patch)) return result;
    Object.entries(patch).forEach(([key, value]) => {
      if (isPlainFactObject(value) && value.$delete === true) {
        delete result[key];
      } else if (isPlainFactObject(value)) {
        result[key] = mergeFacts(isPlainFactObject(result[key]) ? result[key] : {}, value);
      } else {
        result[key] = cloneFactValue(value);
      }
    });
    return result;
  }

  function readFactTemplatePath(source, path) {
    return String(path || "").split(".").reduce((value, key) => {
      if (value == null || !Object.prototype.hasOwnProperty.call(Object(value), key)) return undefined;
      return value[key];
    }, source);
  }

  function resolveFactValue(value, context, meta) {
    if (Array.isArray(value)) return value.map((item) => resolveFactValue(item, context, meta));
    if (isPlainFactObject(value)) {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveFactValue(item, context, meta)]));
    }
    if (typeof value !== "string") return value;

    const call = meta && meta.call ? meta.call : {};
    const bindings = (context && context.symbolBindings) || {};
    const templateSource = {
      ...bindings,
      bindings,
      call: {
        code: call.code,
        level: call.level,
        strain: call.strain || call.suit,
        suit: call.suit || call.strain,
        type: call.type,
      },
      seat: meta && meta.seat,
      side: context && context.systemSide,
    };
    const exact = value.match(/^\{\{\s*([^}]+?)\s*\}\}$/);
    if (exact) {
      const resolved = readFactTemplatePath(templateSource, exact[1]);
      return resolved === undefined ? value : cloneFactValue(resolved);
    }
    return value.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (whole, path) => {
      const resolved = readFactTemplatePath(templateSource, path);
      return resolved === undefined ? whole : String(resolved);
    });
  }

  function resolveFacts(value, context, meta) {
    return normalizeFacts(resolveFactValue(normalizeFacts(value), context || {}, meta || {}));
  }

  function cloneContext(context) {
    const copy = Object.assign({}, context || {});
    if (context && context.symbolBindings) {
      copy.symbolBindings = cloneBindings(context.symbolBindings);
    }
    if (context && context.control) {
      copy.control = cloneFactValue(context.control);
    }
    copy.facts = normalizeFacts(context && context.facts);
    return copy;
  }

  function matchTreeTrigger(trigger, call, bindings) {
    const patternBid = parsePatternBid(trigger);
    const atom = patternBid || (() => {
      const parsed = parseBid(trigger);
      return parsed ? { kind: "exact", code: parsed.code } : null;
    })();
    return atom ? matchExpressionAtom(atom, call, bindings || {}) : null;
  }

  function executableChildren(node) {
    const result = [];
    const collect = (children) => {
      for (const child of children || []) {
        if (child && child.trigger) {
          result.push(child);
        } else if (child && child.nodeType === "group") {
          collect(child.children);
        }
      }
    };
    collect(node && node.children);
    return result;
  }

  function dedupePaths(paths) {
    const keySet = new Set();
    const deduped = [];
    for (const p of paths) {
      const key = `${p.node.id}|${JSON.stringify(p.context || {})}`;
      if (!keySet.has(key)) {
        keySet.add(key);
        deduped.push(p);
      }
    }
    return deduped;
  }

  const CONTROL_SUIT_NAMES = { C: "clubs", D: "diamonds", H: "hearts", S: "spades" };
  const CONTROL_SEAT_NAMES = { N: "North", E: "East", S: "South", W: "West" };

  function normalizedCall(rawCall) {
    return rawCall && rawCall.code ? rawCall : parseBid(rawCall);
  }

  function controlStyleText(style) {
    if (style === "first-round") return "first-round";
    if (style === "second-round") return "second-round";
    return "first- or second-round";
  }

  function controlAllowedSuits(control) {
    return Array.isArray(control && control.suits) && control.suits.length
      ? control.suits.filter((suit) => ["C", "D", "H", "S"].includes(suit))
      : ["C", "D", "H", "S"];
  }

  function controlShownSuits(control) {
    const shown = new Set();
    const bySeat = control && control.shownBySeat;
    if (!bySeat || typeof bySeat !== "object") return shown;
    Object.values(bySeat).forEach((suits) => {
      if (!suits || typeof suits !== "object") return;
      Object.keys(suits).forEach((suit) => shown.add(suit));
    });
    return shown;
  }

  function previousContractIndex(auctionCalls, callIndex) {
    for (let index = callIndex - 1; index >= 0; index--) {
      const call = normalizedCall(auctionCalls[index]);
      if (call && call.type === "bid") return contractBidIndex(call);
    }
    return -1;
  }

  function skippedControlSuits(control, call, auctionCalls, callIndex) {
    if (!control || control.inferSkipped === false) return [];
    const parsed = normalizedCall(call);
    const actualIndex = contractBidIndex(parsed);
    if (!parsed || actualIndex == null) return [];
    const earlierIndex = previousContractIndex(auctionCalls, callIndex);
    const allowed = new Set(controlAllowedSuits(control));
    const alreadyShown = controlShownSuits(control);
    const skipped = [];
    const minLevel = Number(control.startLevel == null ? 1 : control.startLevel);

    for (let index = earlierIndex + 1; index < actualIndex; index++) {
      const code = contractBidFromIndex(index);
      const candidate = parseBid(code);
      if (!candidate || candidate.suit === "NT") continue;
      if (candidate.level < minLevel) continue;
      if (candidate.suit === control.agreedSuit || !allowed.has(candidate.suit)) continue;
      if (alreadyShown.has(candidate.suit) || skipped.includes(candidate.suit)) continue;
      skipped.push(candidate.suit);
    }
    return skipped;
  }

  function isControlBid(call, context, callIndex) {
    const parsed = normalizedCall(call);
    if (!parsed || parsed.type !== "bid" || parsed.suit === "NT") return false;
    const control = context && context.control;
    if (!control || control.active === false) return false;
    if (Number.isInteger(control.startedAtIndex) && Number.isInteger(callIndex) && callIndex <= control.startedAtIndex) {
      return false;
    }
    const minLevel = Number(control.startLevel == null ? 1 : control.startLevel);
    if (Number.isNaN(minLevel) || parsed.level < minLevel) return false;
    if (control.agreedSuit && parsed.suit === control.agreedSuit) return false;
    return controlAllowedSuits(control).includes(parsed.suit);
  }

  function controlMeaning(control, event) {
    const shownSuit = CONTROL_SUIT_NAMES[event.suit] || event.suit;
    const agreedSuit = CONTROL_SUIT_NAMES[control.agreedSuit] || control.agreedSuit || "the agreed suit";
    const style = controlStyleText(control.style);
    const bidder = CONTROL_SEAT_NAMES[event.seat] || event.seat || "the bidder";
    const skippedNames = event.skippedSuits.map((suit) => CONTROL_SUIT_NAMES[suit] || suit);
    const skippedList = skippedNames.length === 2
      ? `${skippedNames[0]} and ${skippedNames[1]}`
      : skippedNames.length > 2
        ? `${skippedNames.slice(0, -1).join(", ")}, and ${skippedNames[skippedNames.length - 1]}`
        : skippedNames[0] || "";
    const skipText = skippedNames.length
      ? ` Bypassing ${skippedList} denies ${style} control there in ${bidder}'s hand.`
      : " No lower eligible control suit was bypassed.";
    const values = {
      bid: event.code,
      suit: event.suit,
      suitName: shownSuit,
      agreedSuit: control.agreedSuit,
      agreedSuitName: agreedSuit,
      style: control.style,
      styleText: style,
      seat: event.seat,
      bidder,
      skippedSuits: event.skippedSuits.join("/"),
      skippedSuitNames: skippedList,
      skipText,
    };
    const template = control.meaningTemplate;
    if (template) {
      return String(template).replace(/\{\{\s*([^}]+?)\s*\}\}/g, (whole, key) => (
        Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : whole
      )).replace(/\s+([.,;:])/g, "$1").trim();
    }
    return `${event.code} shows ${style} control in ${shownSuit} with ${agreedSuit} agreed as trumps.${skipText}`;
  }

  function controlActivationFacts(control) {
    const shownBySeat = cloneFactValue(control.shownBySeat || {});
    return {
      fit: {
        confirmed: true,
        suit: control.agreedSuit,
      },
      slam: {
        interest: true,
        control: {
          active: true,
          available: true,
          agreedSuit: control.agreedSuit,
          style: control.style,
          inferSkipped: control.inferSkipped !== false,
          shownBySeat,
          deniedBySeat: cloneFactValue(control.deniedBySeat || {}),
          history: (control.bidHistory || []).slice(),
        },
      },
      progress: {
        controlBidding: {
          active: true,
          agreedSuit: control.agreedSuit,
          source: control.source || "system rule",
        },
      },
    };
  }

  function controlClearFacts(call) {
    const parsed = normalizedCall(call) || {};
    return {
      slam: {
        control: {
          active: false,
          available: false,
          endedBy: parsed.code || "",
        },
      },
      progress: {
        controlBidding: {
          active: false,
          endedBy: parsed.code || "",
        },
      },
    };
  }

  function activateControlPhase(context, rawConfig, meta) {
    if (!rawConfig || rawConfig.type !== "control-bids") return null;
    const resolved = resolveFactValue(cloneFactValue(rawConfig), context || {}, meta || {});
    const agreedSuit = resolved.agreedSuit || readFactTemplatePath(context && context.facts, "fit.suit") || "";
    if (!["C", "D", "H", "S"].includes(agreedSuit)) return null;
    const existing = context && context.control;
    const samePhase = existing && existing.active !== false && existing.agreedSuit === agreedSuit;
    const control = samePhase ? cloneFactValue(existing) : {
      active: true,
      controlEnabled: true,
      agreedSuit,
      suits: resolved.suits || ["C", "D", "H", "S"],
      startLevel: resolved.startLevel,
      style: resolved.style || "first-or-second-round",
      inferSkipped: resolved.inferSkipped !== false,
      description: resolved.description || "",
      meaningTemplate: resolved.meaningTemplate || "",
      source: resolved.source || (meta && meta.sourceId) || "system rule",
      startedAtIndex: meta && Number.isInteger(meta.callIndex) ? meta.callIndex : -1,
      bidHistory: [],
      events: [],
      shownBySeat: {},
      deniedBySeat: {},
    };

    if (Array.isArray(resolved.knownControls)) {
      for (const known of resolved.knownControls) {
        if (!known || !["C", "D", "H", "S"].includes(known.suit)) continue;
        const knownSeat = known.seat || (meta && meta.seat) || "partnership";
        control.shownBySeat[knownSeat] = control.shownBySeat[knownSeat] || {};
        control.shownBySeat[knownSeat][known.suit] = {
          round: known.round || control.style,
          source: known.source || "known control",
          code: known.code || (meta && meta.call && meta.call.code) || "",
        };
      }
    }
    context.control = control;
    return { control, facts: controlActivationFacts(control) };
  }

  function controlBidResult(context, call, seat, auctionCalls, callIndex) {
    if (!isControlBid(call, context, callIndex)) return null;
    const parsed = normalizedCall(call);
    const control = cloneFactValue(context.control);
    const alreadyRecorded = (control.events || []).some((event) => (
      event.callIndex === callIndex && event.code === parsed.code && event.seat === seat
    ));
    if (alreadyRecorded) return null;
    const event = {
      callIndex,
      code: parsed.code,
      level: parsed.level,
      suit: parsed.suit,
      seat,
      round: control.style || "first-or-second-round",
      skippedSuits: skippedControlSuits(control, parsed, auctionCalls, callIndex),
    };
    const meaning = controlMeaning(control, event);
    control.bidHistory = Array.isArray(control.bidHistory) ? control.bidHistory.slice() : [];
    control.bidHistory.push(parsed.code);
    control.events = Array.isArray(control.events) ? control.events.slice() : [];
    control.events.push(event);
    control.lastLevel = parsed.level;
    control.lastSuit = parsed.suit;
    control.lastCall = parsed.code;
    control.shownBySeat = cloneFactValue(control.shownBySeat || {});
    control.shownBySeat[seat] = control.shownBySeat[seat] || {};
    control.shownBySeat[seat][parsed.suit] = {
      code: parsed.code,
      round: event.round,
      source: "control bid",
    };
    control.deniedBySeat = cloneFactValue(control.deniedBySeat || {});
    if (event.skippedSuits.length) {
      control.deniedBySeat[seat] = control.deniedBySeat[seat] || {};
      event.skippedSuits.forEach((suit) => {
        control.deniedBySeat[seat][suit] = {
          at: parsed.code,
          round: event.round,
          reason: "bypassed in ascending control bidding",
        };
      });
    }

    const facts = {
      lastBid: {
        seat,
        code: parsed.code,
        meaning,
        points: { method: "control", min: null, max: null },
        suitLengths: [],
      },
      fit: {
        confirmed: true,
        suit: control.agreedSuit,
      },
      slam: {
        interest: true,
        control: {
          active: true,
          available: true,
          agreedSuit: control.agreedSuit,
          style: event.round,
          latest: cloneFactValue(event),
          shownBySeat: cloneFactValue(control.shownBySeat),
          deniedBySeat: cloneFactValue(control.deniedBySeat),
          history: control.bidHistory.slice(),
        },
      },
      progress: {
        controlBidding: {
          active: true,
          agreedSuit: control.agreedSuit,
          lastCall: parsed.code,
          lastSeat: seat,
        },
      },
    };
    const twoOverOne = context && context.facts && context.facts.progress && context.facts.progress.twoOverOne;
    if (twoOverOne && twoOverOne.active) {
      facts.progress.twoOverOne = {
        active: true,
        phase: "control-bidding",
        phaseNumber: 3,
        fitConfirmed: true,
        agreedSuit: control.agreedSuit,
        gameForceSatisfied: false,
      };
    }
    return { control, event, meaning, facts };
  }

  function buildControlSuggestions(path, auction, legalCalls, nextSeat) {
    const context = (path.context && path.context.control) || {};
    if (!context || context.active === false || !context.agreedSuit) return [];
    const shown = controlShownSuits(context);
    const suits = controlAllowedSuits(context).filter((suit) => suit !== context.agreedSuit && !shown.has(suit));
    const startLevel = Number(context.startLevel == null ? 1 : context.startLevel);
    const suggestions = [];

    for (const suit of suits) {
      let code = null;
      for (let level = Math.max(1, startLevel); level <= 7; level++) {
        const candidate = `${level}${suit}`;
        if (legalCalls.has(candidate)) {
          code = candidate;
          break;
        }
      }
      if (!code) continue;
      const previewContext = cloneContext(path.context);
      const result = controlBidResult(previewContext, parseBid(code), nextSeat, auction.concat(parseBid(code)), auction.length);
      if (!result) continue;
      suggestions.push({
        bid: code,
        meaning: result.meaning,
        fromNodeId: path.node.id,
        generated: true,
        generatedControl: true,
        toNodeId: path.node.id,
        facts: result.facts,
        factsAfter: mergeFacts(path.context.facts, result.facts),
      });
    }

    if (!suggestions.length && auction.some((call) => normalizedCall(call) && normalizedCall(call).type === "bid")) {
      suggestions.push({
        bid: "P",
        meaning: "No new control is available from the current control-bidding state.",
        fromNodeId: path.node.id,
        generated: true,
        generatedControl: true,
        toNodeId: path.node.id,
      });
    }
    return suggestions;
  }

  class UniversalBiddingEngine {
    constructor() {
      this.currentSystem = null;
    }

    setSystem(system) {
      const normalized = this._normalizeSystem(system);
      this.currentSystem = normalized;
      return normalized;
    }

    _normalizeSystem(system) {
      if (!system || typeof system !== "object") {
        throw new Error("Invalid system object");
      }
      const copy = JSON.parse(JSON.stringify(system));
      copy.schemaVersion = copy.schemaVersion || "1.0";
      copy.initialFacts = normalizeFacts(copy.initialFacts || copy.facts);
      copy.conventions = Array.isArray(copy.conventions) ? copy.conventions : [];
      const counter = { next: 1 };
      copy.conventions.forEach((conv) => {
        conv.id = conv.id || `conv-${counter.next++}`;
        conv.children = Array.isArray(conv.children) ? conv.children : [];
        conv.children.forEach((node) => normalizeNode(node, counter));
      });
      copy.sequenceRules = Array.isArray(copy.sequenceRules) ? copy.sequenceRules : [];
      const sequenceRules = copy.sequenceRules.slice();
      for (const convention of copy.conventions) {
        if (Array.isArray(convention.sequenceRules)) sequenceRules.push(...convention.sequenceRules);
        if (convention.expression) sequenceRules.push(convention);
      }
      copy._compiledSequenceRules = sequenceRules.map((rule, index) => {
        if (!rule || typeof rule !== "object") {
          throw new Error(`Invalid sequence rule at index ${index}`);
        }
        const expression = rule.expression || rule.sequence || rule.pattern;
        if (!expression) throw new Error(`Sequence rule ${rule.id || index + 1} has no expression`);
        try {
          return {
            id: rule.id || `sequence-rule-${counter.next++}`,
            expression,
            meaning: rule.meaning || rule.description || "No stored meaning.",
            alert: Boolean(rule.alert),
            priority: Number(rule.priority || 0),
            filters: rule.filters || {},
            facts: normalizeFacts(rule.facts),
            generated: rule.generated || null,
            clearControl: Boolean(rule.clearControl),
            matchSuffix: Boolean(rule.matchSuffix),
            requiresAgreement: (Array.isArray(rule.requiresAgreement)
              ? rule.requiresAgreement
              : rule.requiresAgreement ? [rule.requiresAgreement] : []).map(String),
            compiled: compileSequenceExpression(expression, { where: rule.where }),
          };
        } catch (error) {
          throw new Error(`Invalid sequence rule ${rule.id || index + 1}: ${error.message}`);
        }
      });
      copy._root = {
        id: "__system_root__",
        meaning: "System root",
        children: copy.conventions.flatMap((conv) => conv.children || []),
      };
      return copy;
    }

    normalizeHandFilter(rawFilter) {
      const filter = rawFilter || {};
      return {
        minHcp: normalizeMaxHcpConstraint(filter.minHcp, 0),
        maxHcp: normalizeMaxHcpConstraint(filter.maxHcp, 40),
        minSuit: {
          C: Number(filter.minSuit?.C || 0),
          D: Number(filter.minSuit?.D || 0),
          H: Number(filter.minSuit?.H || 0),
          S: Number(filter.minSuit?.S || 0),
        },
        maxSuit: {
          C: Number(filter.maxSuit?.C == null ? 13 : filter.maxSuit.C),
          D: Number(filter.maxSuit?.D == null ? 13 : filter.maxSuit.D),
          H: Number(filter.maxSuit?.H == null ? 13 : filter.maxSuit.H),
          S: Number(filter.maxSuit?.S == null ? 13 : filter.maxSuit.S),
        },
        controls: {
          C: Number(filter.controls?.C || 0),
          D: Number(filter.controls?.D || 0),
          H: Number(filter.controls?.H || 0),
          S: Number(filter.controls?.S || 0),
        },
      };
    }

    evaluate(auctionCalls, dealer, handFilterRaw, systemSide, options) {
      if (!this.currentSystem) {
        throw new Error("No system loaded");
      }
      const handFilter = this.normalizeHandFilter(handFilterRaw);
      const filterHistoricalCalls = !options || options.filterHistoricalCalls !== false;
      const historicalHandFilter = filterHistoricalCalls
        ? handFilter
        : this.normalizeHandFilter(handFilterDefaults());
      const normalizedCalls = auctionCalls.map((c) => (c && c.code ? c : parseBid(c))).filter(Boolean);

      const startingContext = systemSide === "NS" || systemSide === "EW" ? { systemSide } : {};
      startingContext.facts = normalizeFacts(this.currentSystem.initialFacts);
      let paths = [{ node: this.currentSystem._root, context: startingContext }];
      const frames = [];

      normalizedCalls.forEach((call, idx) => {
        const seat = seatOf(idx, dealer);
        const stepResult = this._advanceOneStep(paths, call, seat, historicalHandFilter, normalizedCalls, idx);
        frames.push({
          call: { ...call },
          seat,
          matches: stepResult.matches,
          nextPathsCount: stepResult.next.length,
        });
        paths = stepResult.next.length ? stepResult.next : paths;
      });

      const effectiveSystemSide = this._effectiveSystemSide(paths, systemSide);
      this._appendSequenceRuleMatches(frames, normalizedCalls, dealer, historicalHandFilter, effectiveSystemSide, paths);
      const suggestions = this._mergeSuggestions(
        this._buildSuggestions(paths, normalizedCalls, dealer, handFilter),
        this._buildSequenceSuggestions(normalizedCalls, dealer, handFilter, effectiveSystemSide)
      );

      return {
        frames,
        paths,
        suggestions,
        handFilter,
        facts: paths.length ? normalizeFacts(paths[0].context.facts) : normalizeFacts(this.currentSystem.initialFacts),
      };
    }

    evaluateForDisplay(auctionCalls, dealer, handFilterRaw, systemSide) {
      // A single UI hand describes the next bidder, not both partners' earlier calls.
      // Preserve all historical meanings while still filtering next-call suggestions.
      return this.evaluate(auctionCalls, dealer, handFilterRaw, systemSide, {
        filterHistoricalCalls: false,
      });
    }

    _effectiveSystemSide(paths, requestedSide) {
      if (requestedSide === "NS" || requestedSide === "EW") return requestedSide;
      const learnedSides = new Set((paths || []).map((path) => path.context && path.context.systemSide).filter(Boolean));
      return learnedSides.size === 1 ? [...learnedSides][0] : null;
    }

    _partnershipCallsThrough(auctionCalls, dealer, side, lastIndex) {
      const calls = [];
      const stop = lastIndex == null ? auctionCalls.length - 1 : lastIndex;
      for (let index = 0; index <= stop; index++) {
        if (seatSideOfSeat(seatOf(index, dealer)) === side) calls.push(auctionCalls[index]);
      }
      return calls;
    }

    _expressionCallsThrough(rule, auctionCalls, dealer, side, lastIndex) {
      if (!rule.compiled.hasOpponentAtoms) {
        return this._partnershipCallsThrough(auctionCalls, dealer, side, lastIndex);
      }
      const calls = [];
      const stop = lastIndex == null ? auctionCalls.length - 1 : lastIndex;
      for (let index = 0; index <= stop; index++) {
        calls.push({
          ...auctionCalls[index],
          _expressionActor: seatSideOfSeat(seatOf(index, dealer)) === side ? "system" : "opponent",
        });
      }
      return calls;
    }

    _sequenceAgreementPasses(rule, bindings, auctionCalls, dealer, side, lastIndex) {
      if (!rule.requiresAgreement.length) return true;
      const stop = lastIndex == null ? auctionCalls.length - 1 : lastIndex;
      for (const symbol of rule.requiresAgreement) {
        const suit = bindings && bindings[symbol];
        if (!suit) return false;
        const bidders = new Set();
        for (let index = 0; index <= stop; index++) {
          const call = auctionCalls[index];
          const seat = seatOf(index, dealer);
          if (
            seatSideOfSeat(seat) === side
            && call && call.type === "bid"
            && call.suit === suit
          ) {
            bidders.add(seat);
          }
        }
        if (bidders.size < 2) return false;
      }
      return true;
    }

    _sequenceRulePasses(rule, handFilter, seat, auctionCalls, callIndex, symbolBindings) {
      if (!passesFilters(rule.filters, handFilter, seat, seat, symbolBindings)) return false;
      const role = rule.filters && rule.filters.auctionRole;
      if (role && role !== "contextual" && !matchesAuctionRole(rule.filters, auctionCalls, callIndex)) return false;
      return true;
    }

    _sequenceCallSets(rule, relevantCalls) {
      if (!rule.matchSuffix) return [relevantCalls];
      const sets = [];
      for (let start = 0; start <= relevantCalls.length; start++) {
        sets.push(relevantCalls.slice(start));
      }
      return sets;
    }

    _appendSequenceRuleMatches(frames, auctionCalls, dealer, handFilter, systemSide, paths) {
      const rules = this.currentSystem._compiledSequenceRules || [];
      if (!rules.length) return;
      for (let index = 0; index < frames.length; index++) {
        const frame = frames[index];
        for (const path of paths || []) {
          if (!belongsToSystemSide(path.context, frame.seat)) continue;
          const controlResult = controlBidResult(path.context, frame.call, frame.seat, auctionCalls, index);
          if (!controlResult) continue;
          const pathContext = path.context;
          pathContext.control = controlResult.control;
          pathContext.facts = mergeFacts(pathContext.facts, controlResult.facts);
          if (!frame.matches.some((match) => match.generatedControl && match.controlEvent && match.controlEvent.callIndex === index)) {
            frame.matches.push({
              node: { id: "__generated_control_bid__" },
              toNodeId: "__generated_control_bid__",
              meaning: controlResult.meaning,
              alert: false,
              generated: true,
              generatedControl: true,
              controlEvent: cloneFactValue(controlResult.event),
              facts: controlResult.facts,
              factsAfter: normalizeFacts(pathContext.facts),
            });
          }
        }
        for (const rule of rules) {
          const frameSide = seatSideOfSeat(frame.seat);
          const side = systemSide || frameSide;
          if (rule.compiled.hasOpponentAtoms && !systemSide) continue;
          if (!rule.compiled.hasOpponentAtoms && frameSide !== side) continue;
          const relevantCalls = this._expressionCallsThrough(rule, auctionCalls, dealer, side, index);
          if (!this._sequenceRulePasses(rule, handFilter, frame.seat, auctionCalls, index)) continue;
          let acceptedMatch = null;
          for (const callSet of this._sequenceCallSets(rule, relevantCalls)) {
            const result = rule.compiled.match(callSet, { validateAuction: false, dealer, systemSide: side });
            if (!result.matched || result.endIndex !== callSet.length - 1) continue;
            acceptedMatch = result.matches.find((match) => (
              match.endIndex === callSet.length - 1
              && this._sequenceAgreementPasses(rule, match.bindings, auctionCalls, dealer, side, index)
              && this._sequenceRulePasses(rule, handFilter, frame.seat, auctionCalls, index, match.bindings)
            ));
            if (acceptedMatch) break;
          }
          if (!acceptedMatch) continue;
          const factContext = {
            symbolBindings: cloneBindings(acceptedMatch.bindings),
            systemSide: side,
            facts: paths && paths.length ? paths[0].context.facts : this.currentSystem.initialFacts,
          };
          let factDelta = resolveFacts(rule.facts, factContext, { call: frame.call, seat: frame.seat });
          let factsAfter = mergeFacts(factContext.facts, factDelta);
          let activationFacts = {};
          if (rule.generated && rule.generated.type === "control-bids") {
            const previewContext = cloneContext(factContext);
            previewContext.facts = factsAfter;
            const activated = activateControlPhase(previewContext, rule.generated, {
              call: frame.call,
              seat: frame.seat,
              callIndex: index,
              sourceId: rule.id,
            });
            if (activated) {
              activationFacts = activated.facts;
              factDelta = mergeFacts(factDelta, activationFacts);
              factsAfter = mergeFacts(factsAfter, activationFacts);
            }
          }
          if (rule.clearControl) {
            const clearedFacts = controlClearFacts(frame.call);
            factDelta = mergeFacts(factDelta, clearedFacts);
            factsAfter = mergeFacts(factsAfter, clearedFacts);
          }
          frame.matches.push({
            node: { id: rule.id },
            toNodeId: rule.id,
            meaning: rule.meaning,
            alert: rule.alert,
            sequenceExpression: rule.expression,
            bindings: cloneBindings(acceptedMatch.bindings),
            facts: factDelta,
            factsAfter,
          });
          (paths || []).forEach((path) => {
            if (!path.context.systemSide || path.context.systemSide === side) {
              const ruleContext = cloneContext(path.context);
              ruleContext.symbolBindings = Object.assign({}, acceptedMatch.bindings || {});
              ruleContext.facts = path.context.facts;
              path.context.facts = mergeFacts(path.context.facts, resolveFacts(rule.facts, ruleContext, {
                call: frame.call,
                seat: frame.seat,
              }));
              if (rule.generated && rule.generated.type === "control-bids") {
                ruleContext.facts = path.context.facts;
                const activated = activateControlPhase(ruleContext, rule.generated, {
                  call: frame.call,
                  seat: frame.seat,
                  callIndex: index,
                  sourceId: rule.id,
                });
                if (activated) {
                  path.context.control = activated.control;
                  path.context.facts = mergeFacts(path.context.facts, activated.facts);
                }
              }
              if (rule.clearControl) {
                delete path.context.control;
                path.context.facts = mergeFacts(path.context.facts, controlClearFacts(frame.call));
              }
            }
          });
          frame.facts = factsAfter;
        }
      }
    }

    _buildSequenceSuggestions(auctionCalls, dealer, handFilter, systemSide) {
      const rules = this.currentSystem._compiledSequenceRules || [];
      if (!rules.length) return [];
      const nextSeat = seatOf(auctionCalls.length, dealer);
      const nextSide = seatSideOfSeat(nextSeat);
      if (systemSide && nextSide !== systemSide) return [];
      const suggestions = [];
      for (const rule of rules) {
        const side = systemSide || nextSide;
        if (rule.compiled.hasOpponentAtoms && !systemSide) continue;
        const relevantCalls = this._expressionCallsThrough(rule, auctionCalls, dealer, side);
        if (!this._sequenceRulePasses(rule, handFilter, nextSeat, auctionCalls, auctionCalls.length)) continue;
        const candidates = this._sequenceCallSets(rule, relevantCalls).flatMap((callSet) => rule.compiled.next(callSet, {
          validateAuction: false,
          legalAuction: auctionCalls,
          dealer,
          systemSide: side,
          nextActor: "system",
        }));
        for (const candidate of candidates) {
          if (!candidate.completes) continue;
          const acceptedBindings = candidate.bindings.filter((bindings) => (
            this._sequenceAgreementPasses(
              rule,
              bindings,
              auctionCalls,
              dealer,
              side,
              auctionCalls.length - 1
            )
            && this._sequenceRulePasses(
              rule,
              handFilter,
              nextSeat,
              auctionCalls,
              auctionCalls.length,
              bindings
            )
          ));
          if (!acceptedBindings.length) continue;
          const suggestionContext = {
            symbolBindings: cloneBindings(acceptedBindings[0]),
            systemSide: side,
            facts: this.currentSystem.initialFacts,
          };
          const factDelta = resolveFacts(rule.facts, suggestionContext, { call: parseBid(candidate.bid), seat: nextSeat });
          suggestions.push({
            bid: candidate.bid,
            meaning: rule.meaning,
            fromNodeId: rule.id,
            toNodeId: rule.id,
            priority: rule.priority,
            sequenceExpression: rule.expression,
            bindings: acceptedBindings.map(cloneBindings),
            facts: factDelta,
            factsAfter: mergeFacts(suggestionContext.facts, factDelta),
          });
        }
      }
      return suggestions;
    }

    _mergeSuggestions() {
      const suggestions = Array.prototype.concat.apply([], arguments);
      const unique = [];
      const used = new Set();
      for (const suggestion of suggestions) {
        const key = `${suggestion.bid}|${suggestion.fromNodeId}|${suggestion.meaning}`;
        if (used.has(key)) continue;
        used.add(key);
        unique.push(suggestion);
      }
      unique.sort((left, right) => {
        const priorityDifference = Number(right.priority || 0) - Number(left.priority || 0);
        if (priorityDifference) return priorityDifference;
        return (BID_SORT_WEIGHT[left.bid] || 1000) - (BID_SORT_WEIGHT[right.bid] || 1000);
      });
      return unique.slice(0, 36);
    }

    _advanceOneStep(paths, call, seat, handFilter, auctionCalls, callIndex) {
      const matches = [];
      const next = [];

      for (const path of paths) {
        const childList = executableChildren(path.node);
        const matched = [];

        if (!belongsToSystemSide(path.context, seat)) {
          next.push({ node: path.node, context: cloneContext(path.context) });
          continue;
        }

        for (const child of childList) {
          if (!child.trigger) continue;
          const learnedBindings = matchTreeTrigger(child.trigger, call, path.context && path.context.symbolBindings);
          if (!learnedBindings) continue;
          if (!matchesAuctionRole(child.filters, auctionCalls, callIndex)) {
            continue;
          }
          if (!passesFilters(child.filters, handFilter, seat, seat, learnedBindings)) {
            continue;
          }

          const childContext = cloneContext(path.context);
          childContext.symbolBindings = learnedBindings;
          if (!childContext.systemSide) {
            childContext.systemSide = seatSideOfSeat(seat);
          }
          let factDelta = resolveFacts(child.facts, childContext, { call, seat });
          childContext.facts = mergeFacts(childContext.facts, factDelta);
          if (child.generated && child.generated.type === "control-bids") {
            const activated = activateControlPhase(childContext, child.generated, {
              call,
              seat,
              callIndex,
              sourceId: child.id,
            });
            if (activated) {
              factDelta = mergeFacts(factDelta, activated.facts);
              childContext.facts = mergeFacts(childContext.facts, activated.facts);
            }
          }
          if (child.clearControl) {
            delete childContext.control;
            const clearedFacts = controlClearFacts(call);
            factDelta = mergeFacts(factDelta, clearedFacts);
            childContext.facts = mergeFacts(childContext.facts, clearedFacts);
          }
          matched.push({
            node: child,
            context: childContext,
            meaning: child.meaning || "",
            alert: Boolean(child.alert),
            facts: factDelta,
            factsAfter: normalizeFacts(childContext.facts),
          });
          next.push({ node: child, context: childContext });
        }

        if (!matched.length) {
          const controlResult = controlBidResult(path.context, call, seat, auctionCalls, callIndex);
          if (controlResult) {
            const pathContext = cloneContext(path.context);
            pathContext.control = controlResult.control;
            pathContext.facts = mergeFacts(pathContext.facts, controlResult.facts);
            next.push({ node: path.node, context: pathContext });
            matches.push({
              node: path.node,
              context: pathContext,
              meaning: controlResult.meaning,
              alert: false,
              generated: true,
              generatedControl: true,
              controlEvent: cloneFactValue(controlResult.event),
              facts: controlResult.facts,
              factsAfter: normalizeFacts(pathContext.facts),
            });
          } else {
            // Keep path for recovery when bidding goes off-system.
            next.push({ node: path.node, context: cloneContext(path.context) });
          }
        } else {
          matches.push(...matched);
        }
      }

      return {
        matches: dedupePaths(matches.map((m) => ({ ...m, toNodeId: m.node.id }))),
        next: dedupePaths(next),
      };
    }

    _buildSuggestions(paths, auctionCalls, dealer, handFilter) {
      const legalCalls = legalBidCodesForState(auctionCalls, dealer);
      const nextSeat = seatOf(auctionCalls.length, dealer);
      const suggestions = [];

      for (const path of paths) {
        if (!belongsToSystemSide(path.context, nextSeat)) continue;
        const nodeChildren = executableChildren(path.node);
        for (const child of nodeChildren) {
          if (!child.trigger) continue;
          if (!matchesAuctionRole(child.filters, auctionCalls, auctionCalls.length)) continue;
          for (const legalCode of legalCalls) {
            const learnedBindings = matchTreeTrigger(
              child.trigger,
              parseBid(legalCode),
              path.context && path.context.symbolBindings
            );
            if (!learnedBindings) continue;
            if (!passesFilters(child.filters, handFilter, nextSeat, nextSeat, learnedBindings)) continue;
            const suggestionContext = cloneContext(path.context);
            suggestionContext.symbolBindings = learnedBindings;
            const factDelta = resolveFacts(child.facts, suggestionContext, { call: parseBid(legalCode), seat: nextSeat });
            suggestions.push({
              bid: legalCode,
              meaning: child.meaning || "No stored meaning.",
              fromNodeId: path.node.id,
              toNodeId: child.id,
              priority: Number(child.priority || 0),
              symbolicTrigger: child.trigger === legalCode ? null : child.trigger,
              bindings: learnedBindings,
              facts: factDelta,
              factsAfter: mergeFacts(suggestionContext.facts, factDelta),
            });
          }
        }
        if (path.context && path.context.control && path.context.control.active !== false) {
          const controlSuggestions = buildControlSuggestions(path, auctionCalls, legalCalls, nextSeat);
          for (const item of controlSuggestions) {
            if (legalCalls.has(item.bid)) {
              suggestions.push(item);
            }
          }
        }
      }

      const uniq = [];
      const used = new Set();
      for (const suggestion of suggestions) {
        const key = `${suggestion.bid}|${suggestion.fromNodeId}`;
        if (!used.has(key)) {
          used.add(key);
          uniq.push(Object.assign({}, suggestion, {
            toNodeId: suggestion.toNodeId || null,
            priority: Number(suggestion.priority || 0),
          }));
        }
      }
      uniq.sort((a, b) => {
        const priorityDifference = Number(b.priority || 0) - Number(a.priority || 0);
        if (priorityDifference) return priorityDifference;
        const aw = BID_SORT_WEIGHT[a.bid] || 1000;
        const bw = BID_SORT_WEIGHT[b.bid] || 1000;
        return aw - bw;
      });
      return uniq.slice(0, 36);
    }
  }

  global.BridgeBiddingEngine = {
    UniversalBiddingEngine,
    parseBid,
    bidToCode,
    parsePatternBid,
    compileSequenceExpression,
    findSequenceOverlap,
    evaluateBidRelation,
    contractBidIndex,
    contractBidFromIndex,
    addToContractBid,
    compareContractBids,
    mergeFacts,
    resolveFacts,
    legalBidCodesForState,
    handFilterDefaults,
    SEAT_ORDER,
  };
})(window);
