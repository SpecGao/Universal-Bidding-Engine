(() => {
  const engine = new BridgeBiddingEngine.UniversalBiddingEngine();
  const state = {
    auction: [],
    pendingAlert: false,
    lastAnalysis: null,
    handFilter: BridgeBiddingEngine.handFilterDefaults(),
    systems: [],
    currentSystemId: "",
    dealer: "N",
    systemSide: "",
  };

  const ui = {
    systemSelect: document.getElementById("systemSelect"),
    dealerSelect: document.getElementById("dealerSelect"),
    systemSideSelect: document.getElementById("systemSideSelect"),
    hcpMin: document.getElementById("hcpMin"),
    hcpMax: document.getElementById("hcpMax"),
    minC: document.getElementById("minC"),
    minD: document.getElementById("minD"),
    minH: document.getElementById("minH"),
    minS: document.getElementById("minS"),
    systemFile: document.getElementById("systemFile"),
    bidTextInput: document.getElementById("bidTextInput"),
    bidInputWarning: document.getElementById("bidInputWarning"),
    addBidText: document.getElementById("addBidText"),
    bidGrid: document.getElementById("bidGrid"),
    deleteLast: document.getElementById("deleteLast"),
    clearAuction: document.getElementById("clearAuction"),
    auctionRows: document.getElementById("auctionRows"),
    auctionMeaningTooltip: document.getElementById("auctionMeaningTooltip"),
    meaningBox: document.getElementById("meaningBox"),
    suggestionNotes: document.getElementById("suggestionNotes"),
    suggestionList: document.getElementById("suggestionList"),
  };

  const SUIT_SYMBOLS = { C: "♣", D: "♦", H: "♥", S: "♠", NT: "NT" };
  const SUITS = ["C", "D", "H", "S", "NT"];
  const BID_SORT_WEIGHT = {
    P: 0,
    X: 1,
    XX: 2,
  };
  for (let level = 1; level <= 7; level++) {
    BID_SORT_WEIGHT[`${level}C`] = 10 + level * 10 + 1;
    BID_SORT_WEIGHT[`${level}D`] = 10 + level * 10 + 2;
    BID_SORT_WEIGHT[`${level}H`] = 10 + level * 10 + 3;
    BID_SORT_WEIGHT[`${level}S`] = 10 + level * 10 + 4;
    BID_SORT_WEIGHT[`${level}NT`] = 10 + level * 10 + 5;
  }

  function seatOrderFrom(dealer) {
    const all = ["N", "E", "S", "W"];
    const start = Math.max(0, all.indexOf(dealer));
    const out = [];
    for (let i = 0; i < all.length; i++) {
      out.push(all[(start + i) % all.length]);
    }
    return out;
  }

  function seatForCallIndex(index, dealer) {
    return seatOrderFrom(dealer)[index % 4];
  }

  function callToDisplay(call) {
    if (!call || !call.code) return "";
    return call.code === "NT" ? "NT" : call.code;
  }

  function bidButtonCode(level, suit) {
    if (suit === "NT") return `${level}NT`;
    return `${level}${suit}`;
  }

  function ensureAuctionMeaningTooltip() {
    if (!ui.auctionMeaningTooltip) {
      const tooltip = document.createElement("div");
      tooltip.id = "auctionMeaningTooltip";
      tooltip.className = "auction-meaning-tooltip";
      tooltip.setAttribute("role", "tooltip");
      tooltip.setAttribute("aria-live", "polite");
      document.body.appendChild(tooltip);
      ui.auctionMeaningTooltip = tooltip;
    }
    return ui.auctionMeaningTooltip;
  }

  function flattenFactText(value, prefix = "") {
    if (!value || typeof value !== "object") return [];
    return Object.entries(value).flatMap(([key, item]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (item && typeof item === "object" && !Array.isArray(item)) return flattenFactText(item, path);
      return [`${path}=${Array.isArray(item) ? item.join("/") : String(item)}`];
    });
  }

  function factChangeText(facts) {
    const entries = flattenFactText(facts);
    return entries.length ? `Facts set: ${entries.join("; ")}` : "";
  }

  function frameMeaningText(frame) {
    if (!frame || !frame.call) {
      return "This bid has no agreed-upon convention.";
    }
    const lines = [`${frame.call.code} by ${frame.seat}`];
    const isAlert = Boolean(frame.call.manualAlert) || (frame.matches && frame.matches.some((m) => m.alert));
    if (isAlert) {
      lines.push("• ALERT!");
    }
    if (frame.matches && frame.matches.length) {
      for (const m of frame.matches) {
        if (m && m.meaning) lines.push(`• ${m.meaning}`);
        const diagnostic = expressionDiagnostic(m);
        if (diagnostic) lines.push(`  ${diagnostic}`);
      }
    }
    if (lines.length === 1) {
      lines.push("This bid has no agreed-upon convention.");
    }
    return lines.join("\n");
  }

  function bindingText(rawBindings) {
    const candidates = Array.isArray(rawBindings) ? rawBindings : [rawBindings];
    const rendered = [];
    for (const bindings of candidates) {
      if (!bindings || typeof bindings !== "object") continue;
      const text = Object.keys(bindings).sort().map((key) => `${key}=${bindings[key]}`).join(", ");
      if (text && !rendered.includes(text)) rendered.push(text);
    }
    return rendered.join(" or ");
  }

  function expressionDiagnostic(item) {
    if (!item || !item.sequenceExpression) return "";
    const learned = bindingText(item.bindings);
    return `Expression: ${item.sequenceExpression}${learned ? ` · learned ${learned}` : ""}`;
  }

  function setBidButtonLabel(button, level, suit) {
    button.textContent = "";

    const levelNode = document.createElement("span");
    levelNode.textContent = level;
    button.appendChild(levelNode);

    if (!SUIT_SYMBOLS[suit]) return;

    const symbolNode = document.createElement("span");
    symbolNode.className = `bid-suit-symbol suit-${suit.toLowerCase()}`;
    symbolNode.textContent = SUIT_SYMBOLS[suit];
    button.appendChild(symbolNode);
  }

  function hideAuctionMeaningTooltip() {
    const tooltip = ensureAuctionMeaningTooltip();
    tooltip.classList.remove("visible");
  }

  function moveAuctionMeaningTooltip(event) {
    const tooltip = ensureAuctionMeaningTooltip();
    const x = Math.min(window.innerWidth - 220, event.clientX + 12);
    const y = Math.min(window.innerHeight - 60, event.clientY + 12);
    tooltip.style.left = `${Math.max(0, x)}px`;
    tooltip.style.top = `${Math.max(0, y)}px`;
  }

  function showAuctionMeaningTooltip(event) {
    const tooltip = ensureAuctionMeaningTooltip();
    const message = event.currentTarget.dataset.meaning || "";
    if (!message) {
      tooltip.classList.remove("visible");
      return;
    }
    tooltip.textContent = message;
    tooltip.classList.add("visible");
    moveAuctionMeaningTooltip(event);
  }

  function readFilterFromUI() {
    state.handFilter = {
      minHcp: Number(ui.hcpMin.value || 0),
      maxHcp: Number(ui.hcpMax.value || 40),
      minSuit: {
        C: Number(ui.minC.value || 0),
        D: Number(ui.minD.value || 0),
        H: Number(ui.minH.value || 0),
        S: Number(ui.minS.value || 0),
      },
      controls: { C: "", D: "", H: "", S: "" },
    };
  }

  function clearBidInputWarning() {
    if (ui.bidInputWarning) ui.bidInputWarning.textContent = "";
  }

  function setBidInputWarning(message) {
    if (!ui.bidInputWarning) return;
    ui.bidInputWarning.textContent = message || "";
  }

  function normalizeCode(rawBid) {
    return String(rawBid || "").trim().toUpperCase().replace(/\s+/g, "");
  }

  const SEAT_CYCLE = ["N", "E", "S", "W"];
  const seatSideOfSeat = (seat) => (seat === "N" || seat === "S" ? "NS" : "EW");

  function fallbackLegalBidSetFromAuction(auction, dealer) {
    const calls = Array.isArray(auction) ? auction : [];
    let highestBidWeight = 0;
    let lastBidSeat = null;
    let doublerSeat = null;
    let isRedoubled = false;
    let hasBid = false;
    let consecutivePasses = 0;

    for (let i = 0; i < calls.length; i++) {
      const raw = calls[i];
      const call = raw && raw.code ? raw : BridgeBiddingEngine.parseBid(raw);
      if (!call) continue;
      const seat = seatForCallIndex(i, dealer);

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

    const legal = new Set();
    const auctionOver = hasBid ? consecutivePasses >= 3 : consecutivePasses >= 4;
    if (auctionOver) return legal;

    legal.add("P");
    for (let level = 1; level <= 7; level++) {
      for (const suit of ["C", "D", "H", "S", "NT"]) {
        const code = `${level}${suit}`;
        if (BID_SORT_WEIGHT[code] > highestBidWeight) {
          legal.add(code);
        }
      }
    }

    const nextSeat = seatForCallIndex(calls.length, dealer);
    if (hasBid && lastBidSeat && doublerSeat == null && seatSideOfSeat(nextSeat) !== seatSideOfSeat(lastBidSeat)) {
      legal.add("X");
    }
    if (doublerSeat && !isRedoubled && seatSideOfSeat(nextSeat) !== seatSideOfSeat(doublerSeat)) {
      legal.add("XX");
    }
    return legal;
  }

  function addCall(rawBid) {
    const bid = BridgeBiddingEngine.parseBid(rawBid);
    if (!bid) return;
    if (state.pendingAlert) {
      bid.manualAlert = true;
      state.pendingAlert = false;
    }
    state.auction.push(bid);
    clearBidInputWarning();
    render();
  }

  function legalBidSetFromAuction(auction, dealer) {
    const fallback = fallbackLegalBidSetFromAuction(auction, dealer);
    if (!BridgeBiddingEngine.legalBidCodesForState) {
      return fallback;
    }
    try {
      const engineLegal = Array.from(BridgeBiddingEngine.legalBidCodesForState(auction || state.auction, dealer || state.dealer) || []).map((bid) =>
        normalizeCode(bid)
      );
      if (engineLegal.length) {
        const legal = new Set(engineLegal);
        fallback.forEach((code) => legal.add(code));
        return legal;
      }
    } catch (error) {
      console.error(error);
      return fallback;
    }
    return fallback;
  }

  function applyBidButtonRules() {
    const legal = legalBidSetFromAuction(state.auction, state.dealer);
    ui.bidGrid.querySelectorAll("button[data-bid]").forEach((btn) => {
      const bid = normalizeCode(btn.dataset.bid);
      if (!bid) {
        btn.disabled = true;
        btn.title = "";
        return;
      }
      const isLegal = legal.has(bid);
      btn.disabled = !isLegal;
      btn.title = isLegal ? "Add this bid" : "Not legal from current state";
    });
  }

  function addCallsFromText(rawText) {
    const text = String(rawText || "").trim();
    if (!text) {
      return { added: 0, warnings: [] };
    }

    let tokens = text.split(/[\s,]+/).map((t) => t.trim()).filter(Boolean);
    if (text.includes("-")) {
      const parts = text.split("-").map((token) => token.trim()).filter(Boolean);
      if (!parts.length || parts.some((token) => /[\s,]/.test(token))) {
        return { added: 0, warnings: ["Hyphenated shorthand must contain one concrete call per segment."] };
      }
      const firstIsOpponent = parts[0].startsWith("^");
      const nextSide = seatSideOfSeat(seatForCallIndex(state.auction.length, state.dealer));
      const shorthandSystemSide = state.systemSide || (firstIsOpponent === true
        ? (nextSide === "NS" ? "EW" : "NS")
        : nextSide);
      const expanded = [];
      let projectedLength = state.auction.length;
      for (const part of parts) {
        const isOpponent = part.startsWith("^");
        const token = isOpponent ? part.slice(1) : part;
        if (!token) return { added: 0, warnings: ["^ must be followed by a concrete opponent call."] };
        const desiredSide = isOpponent
          ? (shorthandSystemSide === "NS" ? "EW" : "NS")
          : shorthandSystemSide;
        const actualSide = seatSideOfSeat(seatForCallIndex(projectedLength, state.dealer));
        if (actualSide !== desiredSide) {
          expanded.push("P");
          projectedLength += 1;
        }
        expanded.push(token);
        projectedLength += 1;
      }
      tokens = expanded;
    }
    if (!tokens.length) return { added: 0, warnings: [] };

    let workingAuction = state.auction.slice();
    const warnings = [];
    let added = 0;
    let legal = legalBidSetFromAuction(workingAuction, state.dealer);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const parsed = BridgeBiddingEngine.parseBid(token);
      if (!parsed) {
        warnings.push(`Could not parse "${token}"`);
        break;
      }
      const bidCode = normalizeCode(parsed.code);
      if (!legal.has(bidCode)) {
        warnings.push(`Illegal bid "${token}" in sequence position ${i + 1}`);
        break;
      }
      const call = state.pendingAlert && added === 0 ? { ...parsed, manualAlert: true } : parsed;
      if (state.pendingAlert && added === 0) {
        state.pendingAlert = false;
      }
      workingAuction.push(call);
      added += 1;
      try {
        legal = legalBidSetFromAuction(workingAuction, state.dealer);
      } catch (error) {
        warnings.push(`Failed to validate "${token}"`);
        break;
      }
    }

    if (added) {
      state.auction = workingAuction.slice(0, state.auction.length + added);
    }
    return { added, warnings };
  }

  function renderAuctionRows(resultFrames) {
    const frames = resultFrames || [];
    ui.auctionRows.innerHTML = "";
    const rowCount = Math.ceil(state.auction.length / SEAT_CYCLE.length);
    const seatToColumn = {
      N: 0,
      E: 1,
      S: 2,
      W: 3,
    };

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = document.createElement("tr");
      const cells = [];
      for (let seatOffset = 0; seatOffset < SEAT_CYCLE.length; seatOffset++) {
        const emptyCell = document.createElement("td");
        cells.push(emptyCell);
      }

      for (let seatOffset = 0; seatOffset < SEAT_CYCLE.length; seatOffset++) {
        const callIndex = rowIndex * SEAT_CYCLE.length + seatOffset;
        const call = state.auction[callIndex];
        if (!call) break;
        const seat = seatForCallIndex(callIndex, state.dealer);
        const col = seatToColumn[seat];
        const value = callToDisplay(call);
        const klass = call.type === "pass" ? "auction-row-pass" : "";
        const frame = frames[callIndex] || { call, seat, matches: [] };
        const isAlert = Boolean(call.manualAlert) || frame.matches.some((m) => m.alert);

        const td = document.createElement("td");
        td.className = klass;
        td.textContent = value;
        td.classList.add("auction-call-cell");
        td.dataset.meaning = frameMeaningText(frame);
        td.addEventListener("mouseenter", showAuctionMeaningTooltip);
        td.addEventListener("mousemove", moveAuctionMeaningTooltip);
        td.addEventListener("mouseleave", hideAuctionMeaningTooltip);
        if (isAlert) {
          const badge = document.createElement("span");
          badge.className = "auction-alert-pill";
          badge.textContent = "A";
          td.appendChild(badge);
        }
        cells[col] = td;
      }
      cells.forEach((cell) => {
        row.appendChild(cell);
      });
      ui.auctionRows.appendChild(row);
    }
  }

  function handleTextAuctionSubmit() {
    const result = addCallsFromText(ui.bidTextInput.value);
    if (result.warnings.length) {
      setBidInputWarning(result.warnings.join(" | "));
    } else {
      clearBidInputWarning();
    }
    ui.bidTextInput.value = "";
    render();
  }

  function suggestionsInBidOrder(suggestions) {
    return [...(suggestions || [])].sort((left, right) => {
      const leftBid = normalizeCode(left && left.bid);
      const rightBid = normalizeCode(right && right.bid);
      const leftWeight = Object.prototype.hasOwnProperty.call(BID_SORT_WEIGHT, leftBid)
        ? BID_SORT_WEIGHT[leftBid]
        : Number.MAX_SAFE_INTEGER;
      const rightWeight = Object.prototype.hasOwnProperty.call(BID_SORT_WEIGHT, rightBid)
        ? BID_SORT_WEIGHT[rightBid]
        : Number.MAX_SAFE_INTEGER;
      return leftWeight - rightWeight || leftBid.localeCompare(rightBid);
    });
  }

  function renderMeaningAndSuggestions(analysis) {
    const suggestions = suggestionsInBidOrder(analysis.suggestions);
    if (!analysis.frames.length) {
      ui.meaningBox.value = "No calls yet. Enter bids to begin.\n";
      ui.suggestionNotes.value = "Start suggestions are from opening-book nodes.";
      renderSuggestionChips(suggestions);
      return;
    }

    const lastFrame = analysis.frames[analysis.frames.length - 1];
    const meaningsForFrame = (frame) => [...new Set(frame.matches.map((match) => {
      const diagnostic = expressionDiagnostic(match);
      return [match.meaning, diagnostic].filter(Boolean).join("\n  ");
    }).filter(Boolean))];
    const lastMeanings = meaningsForFrame(lastFrame);
    if (lastMeanings.length) {
      ui.meaningBox.value = `Last call ${lastFrame.call.code} by ${lastFrame.seat}:\n${lastMeanings.join("\n")}`;
    } else {
      let latestMeaningFrame = null;
      let latestMeanings = [];
      for (let index = analysis.frames.length - 2; index >= 0; index--) {
        const candidateMeanings = meaningsForFrame(analysis.frames[index]);
        if (!candidateMeanings.length) continue;
        latestMeaningFrame = analysis.frames[index];
        latestMeanings = candidateMeanings;
        break;
      }
      const recentMeaning = latestMeaningFrame
        ? `\n\nMost recent system meaning — ${latestMeaningFrame.call.code} by ${latestMeaningFrame.seat}:\n${latestMeanings.join("\n")}`
        : "";
      ui.meaningBox.value = `Last call ${lastFrame.call.code} by ${lastFrame.seat}:\n(No direct system meaning for this call.)${recentMeaning}`;
    }

    const suggestionText = [];
    for (const suggestion of suggestions) {
      const diagnostic = expressionDiagnostic(suggestion);
      suggestionText.push(`${suggestion.bid} => ${suggestion.meaning}${diagnostic ? `\n  ${diagnostic}` : ""}`);
    }
    ui.suggestionNotes.value = suggestionText.join("\n");
    renderSuggestionChips(suggestions);
  }

  function renderSuggestionChips(suggestions) {
    ui.suggestionList.innerHTML = "";
    for (const suggestion of suggestions) {
      const chip = document.createElement("div");
      chip.className = "suggestion-chip";
      const label = document.createElement("strong");
      label.textContent = suggestion.bid;
      const desc = document.createElement("span");
      desc.textContent = suggestion.meaning || "No meaning saved.";
      const diagnosticText = expressionDiagnostic(suggestion);
      const diagnostic = document.createElement("code");
      diagnostic.className = "meta-note";
      diagnostic.textContent = diagnosticText;
      const useButton = document.createElement("button");
      useButton.textContent = "Use this call";
      useButton.addEventListener("click", () => {
        addCall(suggestion.bid);
      });
      chip.append(label, desc);
      if (diagnosticText) chip.appendChild(diagnostic);
      chip.appendChild(useButton);
      ui.suggestionList.appendChild(chip);
    }
    if (suggestions.length === 0) {
      const empty = document.createElement("div");
      empty.className = "meta-note";
      empty.textContent = "No rule-match suggestions for this point.";
      ui.suggestionList.appendChild(empty);
    }
  }

  function bundledSystemEntries() {
    const systems = window.BridgeSystemData && Array.isArray(window.BridgeSystemData.systems)
      ? window.BridgeSystemData.systems
      : [];
    return systems.map((system) => ({
      id: system.systemId,
      name: system.systemName || system.systemId,
      fileData: system,
      default: system.systemId === "standard-natural",
    })).filter((entry) => entry.id);
  }

  async function loadSystemIndex() {
    const bundledSystems = bundledSystemEntries();
    if (window.location.protocol === "file:" && bundledSystems.length) {
      state.systems = bundledSystems;
      return;
    }
    try {
      const response = await fetch("/api/systems", { cache: "no-store" });
      if (!response.ok) throw new Error("system endpoint fetch failed");
      const list = await response.json();
      state.systems = Array.isArray(list.systems) ? list.systems : [];
      return;
    } catch (endpointError) {
      try {
        const response = await fetch("Customization/loadable/system-index.json", { cache: "no-store" });
        if (!response.ok) throw new Error("index fetch failed");
        const list = await response.json();
        state.systems = Array.isArray(list.systems) ? list.systems : [];
        return;
      } catch (indexError) {
        state.systems = bundledSystems.length ? bundledSystems : [
          { id: "standard-natural", name: "Standard Natural (Core)", file: "Customization/loadable/standard-natural.json", default: true },
          { id: "two-over-one", name: "2/1 Game Forcing", file: "Customization/loadable/standard-two-over-one.json", default: false },
          { id: "precision-1c", name: "1C Precision (Core)", file: "Customization/loadable/standard-precision-1c.json", default: false },
          { id: "acol", name: "ACOL (classic)", file: "Customization/loadable/standard-acol.json", default: false },
          { id: "personal-fg", name: "Personal FG 2/1 v0.5", file: "Customization/loadable/personal-fgv0-5.json", default: false },
        ];
        console.warn("System catalog fallback used", endpointError.message, indexError.message);
      }
    }
  }

  async function loadSystemByFile(filePath) {
    const response = await fetch(filePath, { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to fetch ${filePath}`);
    return response.json();
  }

  async function ensureSystemLoaded() {
    const selection = state.currentSystemId || state.systems.find((s) => s.default)?.id;
    let target = state.systems.find((s) => s.id === selection);
    if (!target && state.systems[0]) target = state.systems[0];
    if (!target) throw new Error("No system to load");
    let systemData = null;
    if (target.fileData) {
      systemData = target.fileData;
    } else if (target.file) {
      systemData = await loadSystemByFile(target.file);
    } else {
      throw new Error("No system file source to load");
    }
    state.currentSystemId = target.id;
    engine.setSystem(systemData);
    return systemData;
  }

  function rebuildSystemSelect() {
    ui.systemSelect.innerHTML = "";
    state.systems.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name || item.id;
      if (item.default) option.selected = true;
      ui.systemSelect.appendChild(option);
    });
    state.currentSystemId = ui.systemSelect.value;
  }

  function updateManualAlertButton() {
    const button = ui.bidGrid.querySelector(".bid-button.alert");
    if (!button) return;
    button.classList.toggle("is-active", state.pendingAlert);
    button.setAttribute("aria-pressed", String(state.pendingAlert));
    button.title = state.pendingAlert
      ? "Alert selected. Click again to cancel."
      : "Mark the next call as alertable.";
  }

  function buildBidGrid() {
    const levels = ["1", "2", "3", "4", "5", "6", "7"];
    const actions = [
      { code: "P", label: "PASS", kind: "pass" },
      { code: "X", label: "DBL", kind: "double" },
      { code: "XX", label: "XX", kind: "redouble" },
      { code: null, label: "Alert!", kind: "alert", title: "Manual alert marker action", action: "none" },
      { code: null, label: "Director", kind: "director", title: "Director alert-style warning marker", action: "none" },
    ];

    ui.bidGrid.innerHTML = "";
    const actionRow = document.createElement("div");
    actionRow.className = "bid-action-row";
    for (const action of actions) {
      const b = document.createElement("button");
      b.className = `bid-button ${action.kind}`;
      b.type = "button";
      const label = document.createElement("span");
      label.className = "bid-button-label";
      if (action.kind === "director") {
        label.className += " bid-button-label--whitebox";
      }
      label.textContent = action.label;
      b.appendChild(label);
      b.title = action.title || action.label;
      if (action.code) {
        b.dataset.bid = action.code;
        b.addEventListener("click", () => addCall(action.code));
      } else if (action.action === "none") {
        b.addEventListener("click", () => {
          if (action.kind === "director") {
            setBidInputWarning("Director mode selected. Use this as an annotation-style marker while reviewing bids.");
          } else if (action.kind === "alert") {
            state.pendingAlert = !state.pendingAlert;
            updateManualAlertButton();
            if (state.pendingAlert) {
              setBidInputWarning("Alert selected. Click Alert again to cancel; the next call will be marked.");
            } else {
              clearBidInputWarning();
            }
          }
        });
      }
      actionRow.appendChild(b);
    }
    ui.bidGrid.appendChild(actionRow);
    updateManualAlertButton();

    for (const level of levels) {
      const rankRow = document.createElement("div");
      rankRow.className = "bid-rank-row";
      for (const suit of SUITS) {
        const code = bidButtonCode(level, suit);
        const btn = document.createElement("button");
        btn.className = `bid-button bid-${suit.toLowerCase()}`;
        btn.type = "button";
        btn.dataset.bid = code;
        setBidButtonLabel(btn, level, suit);
        btn.addEventListener("click", () => addCall(code));
        rankRow.appendChild(btn);
      }
      ui.bidGrid.appendChild(rankRow);
    }
  }

  async function render() {
    readFilterFromUI();
    updateManualAlertButton();
    const fallbackFrames = state.auction.map((call, index) => ({
      call,
      seat: seatForCallIndex(index, state.dealer),
      matches: [],
    }));

    applyBidButtonRules();
    renderAuctionRows(fallbackFrames);

    if (!state.currentSystemId) {
      state.lastAnalysis = null;
      renderMeaningAndSuggestions({ frames: fallbackFrames, suggestions: [] });
      return;
    }

    let analysis = null;
    try {
      await ensureSystemLoaded();
      analysis = engine.evaluateForDisplay(state.auction, state.dealer, state.handFilter, state.systemSide || undefined);
    } catch (error) {
      console.error(error);
      setBidInputWarning(`System expressions could not be executed: ${error.message}`);
      state.lastAnalysis = null;
      renderMeaningAndSuggestions({ frames: fallbackFrames, suggestions: [] });
      return;
    }
    state.lastAnalysis = analysis;
    renderAuctionRows(analysis.frames);
    applyBidButtonRules();
    renderMeaningAndSuggestions(analysis);
  }

  function bindActions() {
    ui.dealerSelect.addEventListener("change", () => {
      state.dealer = ui.dealerSelect.value;
      clearBidInputWarning();
      render();
    });

    ui.systemSideSelect.addEventListener("change", () => {
      state.systemSide = ui.systemSideSelect.value;
      clearBidInputWarning();
      render();
    });

    [ui.hcpMin, ui.hcpMax, ui.minC, ui.minD, ui.minH, ui.minS].forEach((input) => {
      input.addEventListener("input", () => {
        clearBidInputWarning();
        render();
      });
    });

    ui.systemSelect.addEventListener("change", (event) => {
      state.currentSystemId = event.target.value;
      clearBidInputWarning();
      render();
    });

    ui.systemFile.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const id = parsed.systemId || `custom-${Date.now()}`;
        const name = parsed.systemName || file.name;
        const fileEntry = { id, name: `${name} (Imported)`, fileData: parsed };
        state.systems = state.systems.filter((item) => item.imported !== true);
        state.systems.push(fileEntry);
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = fileEntry.name;
        opt.selected = true;
        ui.systemSelect.appendChild(opt);
        state.currentSystemId = id;
        engine.setSystem(fileEntry.fileData);
        render();
      } catch (err) {
        alert(`Unable to load this system file: ${err.message}`);
      }
      event.target.value = "";
    });

    ui.addBidText.addEventListener("click", () => {
      handleTextAuctionSubmit();
    });

    ui.bidTextInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        handleTextAuctionSubmit();
      }
    });

    ui.deleteLast.addEventListener("click", () => {
      if (!state.auction.length) return;
      state.auction.pop();
      clearBidInputWarning();
      render();
    });

    ui.clearAuction.addEventListener("click", () => {
      state.auction = [];
      clearBidInputWarning();
      render();
    });
  }

  async function bootstrap() {
    await loadSystemIndex();
    rebuildSystemSelect();
    buildBidGrid();
    bindActions();
    ensureAuctionMeaningTooltip();
    if (state.currentSystemId) {
      try {
        const defaultSystem = await ensureSystemLoaded();
        engine.setSystem(defaultSystem);
      } catch (err) {
        console.error(err);
      }
    }
    render();
  }

  bootstrap().catch((err) => console.error("Auctioneer init failed", err));
})();
