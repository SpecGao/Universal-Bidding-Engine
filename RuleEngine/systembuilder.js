(() => {
  const QUICK_DRAFT_STORAGE_KEY = "bridge-rule-engine.quick-customization-draft";
  const ACTIVE_TREE_STORAGE_KEY = "bridge-rule-engine.active-convention-tree";
  const ACTIVE_TREE_COOKIE = "bridge-rule-engine-active-tree";
  const ui = {
    select: document.getElementById("builderSystemSelect"),
    import: document.getElementById("builderImport"),
    addConvention: document.getElementById("newConvention"),
    exportBtn: document.getElementById("exportSystem"),
    downloadBtn: document.getElementById("downloadSystem"),
    addSequenceRule: document.getElementById("newSequenceRule"),
    status: document.getElementById("builderStatus"),
    systemMetadata: document.getElementById("systemMetadata"),
    sequenceRuleArea: document.getElementById("sequenceRuleArea"),
    systemAudit: document.getElementById("systemAudit"),
    treeArea: document.getElementById("treeArea"),
  };

  const state = {
    systems: [],
    currentSystem: null,
    currentSystemId: "",
    nodeCounter: 1,
    expandedNodes: new Set(),
    expandedContexts: new Set(),
    editingNodes: new Set(),
    editingContexts: new Set(),
    heatmapOpen: false,
    persistenceEnabled: false,
    persistTimer: null,
    auditTimer: null,
    restoredTree: null,
    idRepairs: [],
  };

  function newBlankNode() {
    return {
      id: `node-${state.nodeCounter++}`,
      trigger: "",
      meaning: "",
      filters: {},
      facts: {},
      children: [],
      generated: null,
      alert: false,
    };
  }

  function newConvention() {
    return {
      id: `convention-${Date.now()}`,
      name: "New Convention",
      children: [],
      notes: "",
    };
  }

  function newSequenceRule() {
    return {
      id: `sequence-rule-${state.nodeCounter++}`,
      expression: "",
      where: [],
      requiresAgreement: [],
      meaning: "",
      facts: {},
      priority: 0,
    };
  }

  function readSystems() {
    const bundledSystems = () => {
      if (!window.BridgeSystemData || !Array.isArray(window.BridgeSystemData.systems)) return [];
      return window.BridgeSystemData.systems.map((system) => ({
        id: system.systemId,
        name: system.systemName || system.systemId,
        fileData: system,
        default: system.systemId === "standard-natural",
      }));
    };
    // A static browser cannot enumerate a directory. This manifest is the
    // authoritative list of every selectable JSON system in Customization/
    // loadable, so the picker never mixes in an older source-only draft.
    return fetch("Customization/loadable/system-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Loadable system index fetch failed");
        return res.json();
      })
      .then((json) => json.systems || [])
      .catch(() => bundledSystems());
  }

  function setStatus(message, isError = false) {
    if (!ui.status) return;
    ui.status.textContent = message || "";
    ui.status.classList.toggle("is-error", Boolean(isError));
  }

  function readQuickCustomizationDraft() {
    try {
      const raw = window.localStorage.getItem(QUICK_DRAFT_STORAGE_KEY);
      if (!raw) return null;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object" || !draft.systemId) return null;
      return draft;
    } catch (err) {
      console.warn("Unable to read the quick-customization draft", err);
      return null;
    }
  }

  function readActiveTreeCookie() {
    try {
      const name = `${ACTIVE_TREE_COOKIE}=`;
      const part = document.cookie.split(";").map((entry) => entry.trim()).find((entry) => entry.startsWith(name));
      return part ? decodeURIComponent(part.slice(name.length)) : "";
    } catch (err) {
      return "";
    }
  }

  function readPersistedTree() {
    const cookieSystemId = readActiveTreeCookie();
    try {
      const raw = window.sessionStorage.getItem(ACTIVE_TREE_STORAGE_KEY);
      if (raw) {
        const snapshot = JSON.parse(raw);
        if (snapshot?.system?.systemId && (!cookieSystemId || snapshot.system.systemId === cookieSystemId)) return snapshot;
      }
    } catch (err) {
      console.warn("Unable to restore the active convention tree", err);
    }
    const draft = readQuickCustomizationDraft();
    if (draft) return { system: draft, expandedNodes: [], expandedContexts: [] };
    return null;
  }

  function persistCurrentTree() {
    if (!state.persistenceEnabled || !state.currentSystem) return;
    const snapshot = {
      system: state.currentSystem,
      expandedNodes: [...state.expandedNodes],
      expandedContexts: [...state.expandedContexts],
      heatmapOpen: state.heatmapOpen,
    };
    try {
      window.sessionStorage.setItem(ACTIVE_TREE_STORAGE_KEY, JSON.stringify(snapshot));
      window.localStorage.setItem(QUICK_DRAFT_STORAGE_KEY, JSON.stringify(state.currentSystem));
    } catch (err) {
      console.warn("Unable to persist the active convention tree", err);
    }
    try {
      document.cookie = `${ACTIVE_TREE_COOKIE}=${encodeURIComponent(state.currentSystem.systemId)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    } catch (err) {
      console.warn("Unable to persist the active-tree cookie", err);
    }
  }

  function scheduleTreePersistence() {
    if (!state.persistenceEnabled) return;
    if (state.persistTimer) window.clearTimeout(state.persistTimer);
    state.persistTimer = window.setTimeout(() => {
      state.persistTimer = null;
      persistCurrentTree();
    }, 60);
  }

  async function loadSystemFromStore(item) {
    if (item.fileData) return JSON.parse(JSON.stringify(item.fileData));
    const response = await fetch(item.file);
    return response.json();
  }

  function normalizeSystemShape(sys) {
    sys.systemId = sys.systemId || `system-${Date.now()}`;
    sys.systemName = sys.systemName || "Unnamed system";
    sys.conventions = Array.isArray(sys.conventions) ? sys.conventions : [];
    sys.sequenceRules = Array.isArray(sys.sequenceRules) ? sys.sequenceRules : [];
    const usedIds = new Set();
    const repairs = [];
    const reserveId = (requestedId, prefix, location) => {
      const original = String(requestedId || "").trim();
      let base = original;
      if (!base) {
        do {
          base = `${prefix}-${state.nodeCounter++}`;
        } while (usedIds.has(base));
      }
      let candidate = base;
      let suffix = 2;
      while (usedIds.has(candidate)) candidate = `${base}-${suffix++}`;
      usedIds.add(candidate);
      const generatedNumber = candidate.match(/^(?:node|sequence-rule)-(\d+)(?:-\d+)?$/);
      if (generatedNumber) state.nodeCounter = Math.max(state.nodeCounter, Number(generatedNumber[1]) + 1);
      if (original && candidate !== original) repairs.push({ original, candidate, location });
      return candidate;
    };
    sys.sequenceRules.forEach((rule) => {
      rule.id = reserveId(rule.id, "sequence-rule", `bidding expression ${rule.expression || "(empty)"}`);
      rule.expression = rule.expression || rule.sequence || rule.pattern || "";
      rule.where = Array.isArray(rule.where) ? rule.where : rule.where ? [rule.where] : [];
      rule.requiresAgreement = Array.isArray(rule.requiresAgreement)
        ? rule.requiresAgreement
        : rule.requiresAgreement ? [rule.requiresAgreement] : [];
      rule.meaning = rule.meaning || rule.description || "";
      rule.facts = rule.facts && typeof rule.facts === "object" && !Array.isArray(rule.facts) ? rule.facts : {};
      rule.priority = Number(rule.priority || 0);
    });
    sys.conventions.forEach((conv) => {
      conv.id = reserveId(conv.id, "convention", `convention ${conv.name || "(unnamed)"}`);
      conv.children = Array.isArray(conv.children) ? conv.children : [];
      ensureNodeIds(conv.children, reserveId);
    });
    normalizeCompetitionContexts(sys);
    if (!sys.notes) sys.notes = "";
    if (!sys.description) sys.description = "";
    state.idRepairs = repairs;
    return sys;
  }

  function ensureNodeIds(nodes, reserveId, path = []) {
    for (const [index, node] of (nodes || []).entries()) {
      const segment = node.trigger || node.label || `node ${index + 1}`;
      const nodePath = path.concat(segment);
      node.id = reserveId(node.id, "node", `tree route ${nodePath.join(" – ")}`);
      node.filters = node.filters || {};
      node.facts = node.facts && typeof node.facts === "object" && !Array.isArray(node.facts) ? node.facts : {};
      node.children = Array.isArray(node.children) ? node.children : [];
      node.alert = Boolean(node.alert);
      ensureNodeIds(node.children, reserveId, nodePath);
    }
  }

  function idRepairNotice() {
    if (!state.idRepairs.length) return "";
    const count = state.idRepairs.length;
    return `Repaired ${count} duplicate internal ID${count === 1 ? "" : "s"}; all tree nodes are now independently addressable.`;
  }

  function buildSystemSelect() {
    ui.select.innerHTML = "";
    for (const item of state.systems) {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name || item.id;
      ui.select.appendChild(opt);
    }
    if (!state.currentSystemId && state.systems.length) {
      state.currentSystemId = state.systems[0].id;
    }
    ui.select.value = state.currentSystemId;
  }

  function renderMetadata() {
    if (!state.currentSystem) return;
    ui.systemMetadata.innerHTML = `
      <div class="question-card">
        <div><strong>${state.currentSystem.systemName}</strong> (${state.currentSystem.systemId})</div>
        <p>${state.currentSystem.description || "No description."}</p>
        <div class="meta-note">${state.currentSystem.notes || ""}</div>
      </div>
    `;
  }

  function sequenceRuleWhereText(rule) {
    return (Array.isArray(rule.where) ? rule.where : rule.where ? [rule.where] : []).join(", ");
  }

  function parseSequenceRuleWhere(value) {
    return String(value || "").split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
  }

  function sequenceRuleAgreementText(rule) {
    return (Array.isArray(rule.requiresAgreement)
      ? rule.requiresAgreement
      : rule.requiresAgreement ? [rule.requiresAgreement] : []).join(", ");
  }

  function parseSequenceRuleAgreement(value) {
    return String(value || "").split(/[\s,]+/).map((item) => item.trim()).filter(Boolean);
  }

  function validateSequenceRuleCard(rule, card, message) {
    if (!rule.expression.trim()) {
      card.classList.add("is-invalid");
      message.classList.add("is-error");
      message.textContent = "Enter a bidding expression.";
      return null;
    }
    const invalidAgreement = (rule.requiresAgreement || []).find((symbol) => !["M", "m", "X", "Y", "Z", "W"].includes(symbol));
    if (invalidAgreement) {
      card.classList.add("is-invalid");
      message.classList.add("is-error");
      message.textContent = `Bidding expression: ${rule.expression}. Unknown agreement symbol ${invalidAgreement}. Use M, m, X, Y, Z, or W.`;
      return null;
    }
    try {
      const compiled = window.BridgeBiddingEngine.compileSequenceExpression(rule.expression, { where: rule.where });
      card.classList.remove("is-invalid");
      message.classList.remove("is-error");
      message.textContent = "Valid: at least one legal concrete auction matches this rule.";
      return compiled;
    } catch (error) {
      card.classList.add("is-invalid");
      message.classList.add("is-error");
      message.textContent = `Bidding expression: ${rule.expression}. ${error.message}`;
      return null;
    }
  }

  function renderSequenceRules() {
    if (!ui.sequenceRuleArea) return;
    ui.sequenceRuleArea.innerHTML = "";
    const rules = state.currentSystem?.sequenceRules || [];
    if (!rules.length) {
      const empty = document.createElement("p");
      empty.className = "meta-note";
      empty.textContent = "No sequence-expression rules yet. Tree nodes can still use #, M, m, X, Y, Z, and W in their trigger bids.";
      ui.sequenceRuleArea.appendChild(empty);
      return;
    }

    rules.forEach((rule, index) => {
      const card = document.createElement("article");
      card.className = "sequence-rule-card";
      const fields = document.createElement("div");
      fields.className = "sequence-rule-fields";

      const idLabel = document.createElement("label");
      idLabel.textContent = "Rule ID";
      const idInput = document.createElement("input");
      idInput.value = rule.id || "";
      idInput.placeholder = "stayman-sequence";
      idLabel.appendChild(idInput);

      const expressionLabel = document.createElement("label");
      expressionLabel.textContent = "Bidding expression";
      const expressionInput = document.createElement("input");
      expressionInput.value = rule.expression || "";
      expressionInput.placeholder = "1X-2Y or 1S-^2C-2H";
      expressionLabel.appendChild(expressionInput);

      const whereLabel = document.createElement("label");
      whereLabel.textContent = "Where relations";
      const whereInput = document.createElement("input");
      whereInput.value = sequenceRuleWhereText(rule);
      whereInput.placeholder = "Y<X, 1D+5=2D";
      whereLabel.appendChild(whereInput);

      const priorityLabel = document.createElement("label");
      priorityLabel.textContent = "Priority";
      const priorityInput = document.createElement("input");
      priorityInput.type = "number";
      priorityInput.value = Number(rule.priority || 0);
      priorityLabel.appendChild(priorityInput);

      const agreementLabel = document.createElement("label");
      agreementLabel.textContent = "Require partnership agreement";
      const agreementInput = document.createElement("input");
      agreementInput.value = sequenceRuleAgreementText(rule);
      agreementInput.placeholder = "X (optional)";
      agreementLabel.appendChild(agreementInput);

      const meaningLabel = document.createElement("label");
      meaningLabel.className = "sequence-rule-meaning";
      meaningLabel.textContent = "Meaning";
      const meaningInput = document.createElement("textarea");
      meaningInput.rows = 2;
      meaningInput.value = rule.meaning || "";
      meaningInput.placeholder = "Meaning shown when the expression completes";
      meaningLabel.appendChild(meaningInput);

      fields.append(idLabel, expressionLabel, whereLabel, agreementLabel, priorityLabel, meaningLabel);
      card.appendChild(fields);

      const actions = document.createElement("div");
      actions.className = "systembuilder-controls";
      const alertLabel = document.createElement("label");
      alertLabel.className = "inline-row";
      alertLabel.textContent = "Alert when matched";
      const alertInput = document.createElement("input");
      alertInput.type = "checkbox";
      alertInput.checked = Boolean(rule.alert);
      alertLabel.appendChild(alertInput);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "secondary-button";
      remove.textContent = "Remove rule";
      actions.append(alertLabel, remove);
      card.appendChild(actions);

      const validation = document.createElement("p");
      validation.className = "sequence-rule-validation";
      card.appendChild(validation);
      card.appendChild(createFactsEditor(rule));

      const update = () => {
        rule.id = idInput.value.trim();
        rule.expression = expressionInput.value.trim();
        rule.where = parseSequenceRuleWhere(whereInput.value);
        rule.requiresAgreement = parseSequenceRuleAgreement(agreementInput.value);
        rule.priority = Number(priorityInput.value || 0);
        rule.meaning = meaningInput.value.trim();
        rule.alert = alertInput.checked;
        validateSequenceRuleCard(rule, card, validation);
        scheduleAuditRefresh();
        scheduleTreePersistence();
      };
      [idInput, expressionInput, whereInput, agreementInput, priorityInput, meaningInput, alertInput].forEach((input) => {
        input.addEventListener("input", update);
        input.addEventListener("change", update);
      });
      remove.addEventListener("click", () => {
        state.currentSystem.sequenceRules.splice(index, 1);
        renderSequenceRules();
        refreshSystemAudit();
        scheduleTreePersistence();
      });

      validateSequenceRuleCard(rule, card, validation);
      ui.sequenceRuleArea.appendChild(card);
    });
  }

  function isTreeGroup(node) {
    return node?.nodeType === "group";
  }

  function createFactsEditor(target) {
    const wrap = document.createElement("div");
    wrap.className = "fact-editor";
    const title = document.createElement("strong");
    title.textContent = "Persistent facts";

    const shortcuts = document.createElement("div");
    shortcuts.className = "fact-shortcuts";
    const method = document.createElement("select");
    [
      ["", "Ace ask: inherit"],
      ["blackwood", "Blackwood"],
      ["rkcb-1430", "RKCB 1430"],
      ["rkcb-3014", "RKCB 3014"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      method.appendChild(option);
    });
    const d0p1Label = document.createElement("label");
    const d0p1 = document.createElement("input");
    d0p1.type = "checkbox";
    d0p1Label.append(d0p1, document.createTextNode(" D0P1"));
    shortcuts.append(method, d0p1Label);

    const textarea = document.createElement("textarea");
    textarea.spellcheck = false;
    textarea.placeholder = '{"fit":{"suit":"{{M}}","combinedMinimum":8}}';

    const ensureFacts = () => {
      if (!target.facts || typeof target.facts !== "object" || Array.isArray(target.facts)) target.facts = {};
      return target.facts;
    };
    const ensureAceAsk = () => {
      const facts = ensureFacts();
      facts.slam = facts.slam && typeof facts.slam === "object" ? facts.slam : {};
      facts.slam.aceAsk = facts.slam.aceAsk && typeof facts.slam.aceAsk === "object" ? facts.slam.aceAsk : {};
      return facts.slam.aceAsk;
    };
    const syncFromFacts = (includeText) => {
      const facts = ensureFacts();
      const aceAsk = facts.slam && facts.slam.aceAsk ? facts.slam.aceAsk : {};
      method.value = aceAsk.method || "";
      d0p1.checked = aceAsk.interference === "D0P1";
      if (includeText) textarea.value = Object.keys(facts).length ? JSON.stringify(facts, null, 2) : "";
    };
    const notify = () => {
      scheduleAuditRefresh();
      scheduleTreePersistence();
    };

    method.addEventListener("change", () => {
      const aceAsk = ensureAceAsk();
      if (method.value) aceAsk.method = method.value;
      else delete aceAsk.method;
      syncFromFacts(true);
      notify();
    });
    d0p1.addEventListener("change", () => {
      const aceAsk = ensureAceAsk();
      if (d0p1.checked) aceAsk.interference = "D0P1";
      else delete aceAsk.interference;
      syncFromFacts(true);
      notify();
    });
    textarea.addEventListener("input", () => {
      try {
        const parsed = textarea.value.trim() ? JSON.parse(textarea.value) : {};
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Facts must be a JSON object.");
        target.facts = parsed;
        wrap.classList.remove("is-invalid");
        syncFromFacts(false);
        notify();
      } catch (error) {
        wrap.classList.add("is-invalid");
      }
    });

    wrap.append(title, shortcuts, textarea);
    syncFromFacts(true);
    return wrap;
  }

  function asCollapsedNodeDetails(node, card, depth) {
    const details = document.createElement("details");
    details.className = "node-details";
    details.style.marginLeft = `${Math.min(depth * 8, 48)}px`;
    const summary = document.createElement("summary");
    const label = isTreeGroup(node)
      ? `Edit group: ${node.label || "Opening group"}`
      : `Edit bid: ${node.trigger || "New bid"}`;
    summary.textContent = label;
    card.style.marginLeft = "0";
    details.append(summary, card);
    return details;
  }

  function buildGroupControls(node, parentArray, index, depth) {
    const card = document.createElement("div");
    card.className = "node-card node-card--group";
    card.style.marginLeft = `${Math.min(depth * 8, 48)}px`;

    const header = document.createElement("div");
    header.className = "inline-row";
    header.style.marginBottom = "8px";
    const title = document.createElement("strong");
    title.className = "node-card-title";
    title.textContent = node.label || "Opening group";
    const nodeId = document.createElement("span");
    nodeId.className = "node-id";
    nodeId.textContent = node.id;
    header.append(title, nodeId);
    card.appendChild(header);

    const fields = document.createElement("div");
    fields.className = "node-fields";
    const label = document.createElement("label");
    label.innerHTML = "group label<input placeholder='Weak diamond opening' />";
    const labelInput = label.querySelector("input");
    labelInput.value = node.label || "";
    labelInput.addEventListener("input", (ev) => { node.label = ev.target.value; });
    const meaning = document.createElement("label");
    meaning.innerHTML = "description<textarea rows='2'></textarea>";
    const meaningInput = meaning.querySelector("textarea");
    meaningInput.className = "small";
    meaningInput.value = node.meaning || "";
    meaningInput.addEventListener("input", (ev) => { node.meaning = ev.target.value; });
    const displayRole = document.createElement("label");
    displayRole.innerHTML = `bubble color / bidder<select>
      <option value="">Automatic (auction turn)</option>
      <option value="opener">Opener</option>
      <option value="responder">Responder</option>
      <option value="opponent">Opponent</option>
    </select>`;
    const displayRoleSelect = displayRole.querySelector("select");
    displayRoleSelect.value = ["opener", "responder", "opponent"].includes(node.displayRole) ? node.displayRole : "";
    displayRoleSelect.addEventListener("change", (ev) => {
      if (ev.target.value) node.displayRole = ev.target.value;
      else delete node.displayRole;
      rerenderTree();
    });
    fields.append(label, meaning, displayRole);
    card.appendChild(fields);

    const actions = document.createElement("div");
    actions.className = "systembuilder-controls";
    const addChild = document.createElement("button");
    addChild.textContent = "Add opening option";
    addChild.addEventListener("click", () => {
      const child = newBlankNode();
      child.filters.auctionRole = "opening";
      node.children.push(child);
      rerenderTree();
    });
    const del = document.createElement("button");
    del.textContent = "Delete group";
    del.addEventListener("click", () => {
      parentArray.splice(index, 1);
      rerenderTree();
    });
    actions.append(addChild, del);
    card.appendChild(actions);

    const childrenArea = document.createElement("div");
    childrenArea.className = "node-children";
    (node.children || []).forEach((child, childIndex) => {
      childrenArea.appendChild(buildControls(child, node.children, childIndex, depth + 1));
    });
    card.appendChild(childrenArea);
    return asCollapsedNodeDetails(node, card, depth);
  }

  function buildControls(node, parentArray, index, depth) {
    if (isTreeGroup(node)) return buildGroupControls(node, parentArray, index, depth);
    const card = document.createElement("div");
    card.className = "node-card";
    card.style.marginLeft = `${Math.min(depth * 8, 48)}px`;

    const header = document.createElement("div");
    header.className = "inline-row";
    header.style.marginBottom = "8px";
    const triggerLabel = document.createElement("strong");
    triggerLabel.className = "node-card-title";
    triggerLabel.textContent = node.trigger ? `Bid ${node.trigger}` : "New bid";
    const nodeId = document.createElement("span");
    nodeId.className = "node-id";
    nodeId.textContent = node.id;
    header.appendChild(triggerLabel);
    header.appendChild(nodeId);
    card.appendChild(header);

    const fields = document.createElement("div");
    fields.className = "node-editor-layout";
    const mainFields = document.createElement("div");
    mainFields.className = "node-editor-main";
    const numericFields = document.createElement("div");
    numericFields.className = "node-numeric-grid";

    const trigger = document.createElement("label");
    trigger.className = "node-editor-bid";
    trigger.innerHTML = "trigger bid<input placeholder=\"1C / #D / #M / 2X / 3W / P / X / XX\" />";
    const triggerInput = trigger.querySelector("input");
    triggerInput.value = node.trigger || "";
    triggerInput.addEventListener("input", (ev) => {
      // Keep lower-case m intact: it denotes an unspecified minor suit.
      node.trigger = ev.target.value.trim();
    });

    const meaning = document.createElement("label");
    meaning.className = "node-editor-meaning";
    meaning.innerHTML = "meaning<textarea rows='2'></textarea>";
    const meaningInput = meaning.querySelector("textarea");
    meaningInput.className = "node-editor-meaning-input";
    meaningInput.value = node.meaning || "";
    meaningInput.addEventListener("input", (ev) => {
      node.meaning = ev.target.value;
    });

    const minHcp = document.createElement("label");
    minHcp.innerHTML = "min aHCP<input type='number' min='0' max='40' />";
    const minHcpInput = minHcp.querySelector("input");
    minHcpInput.value = node.filters.minHcp || "";
    minHcpInput.addEventListener("input", (ev) => {
      const val = Number(ev.target.value);
      node.filters.minHcp = Number.isNaN(val) ? undefined : val;
      if (ev.target.value === "") delete node.filters.minHcp;
    });

    const maxHcp = document.createElement("label");
    maxHcp.innerHTML = "max aHCP<input type='number' min='0' max='40' />";
    const maxHcpInput = maxHcp.querySelector("input");
    maxHcpInput.value = node.filters.maxHcp || "";
    maxHcpInput.addEventListener("input", (ev) => {
      const val = Number(ev.target.value);
      node.filters.maxHcp = Number.isNaN(val) ? undefined : val;
      if (ev.target.value === "") delete node.filters.maxHcp;
    });

    const minSuitC = document.createElement("label");
    minSuitC.innerHTML = "min clubs<input type='number' min='0' max='13' />";
    minSuitC.querySelector("input").value = node.filters.minSuit?.C || "";
    minSuitC.querySelector("input").addEventListener("input", (ev) => {
      node.filters.minSuit = node.filters.minSuit || {};
      const v = Number(ev.target.value);
      if (ev.target.value === "") delete node.filters.minSuit.C;
      else node.filters.minSuit.C = v;
    });

    const minSuitD = document.createElement("label");
    minSuitD.innerHTML = "min diamonds<input type='number' min='0' max='13' />";
    minSuitD.querySelector("input").value = node.filters.minSuit?.D || "";
    minSuitD.querySelector("input").addEventListener("input", (ev) => {
      node.filters.minSuit = node.filters.minSuit || {};
      if (ev.target.value === "") delete node.filters.minSuit.D;
      else node.filters.minSuit.D = Number(ev.target.value);
    });

    const minSuitH = document.createElement("label");
    minSuitH.innerHTML = "min hearts<input type='number' min='0' max='13' />";
    minSuitH.querySelector("input").value = node.filters.minSuit?.H || "";
    minSuitH.querySelector("input").addEventListener("input", (ev) => {
      node.filters.minSuit = node.filters.minSuit || {};
      if (ev.target.value === "") delete node.filters.minSuit.H;
      else node.filters.minSuit.H = Number(ev.target.value);
    });

    const minSuitS = document.createElement("label");
    minSuitS.innerHTML = "min spades<input type='number' min='0' max='13' />";
    minSuitS.querySelector("input").value = node.filters.minSuit?.S || "";
    minSuitS.querySelector("input").addEventListener("input", (ev) => {
      node.filters.minSuit = node.filters.minSuit || {};
      if (ev.target.value === "") delete node.filters.minSuit.S;
      else node.filters.minSuit.S = Number(ev.target.value);
    });

    function buildMinSuitInput(labelText, suit) {
      const label = document.createElement("label");
      label.innerHTML = `${labelText}<input type='number' min='0' max='13' />`;
      const input = label.querySelector("input");
      input.value = node.filters.minSuit?.[suit] ?? "";
      input.addEventListener("input", (ev) => {
        node.filters.minSuit = node.filters.minSuit || {};
        if (ev.target.value === "") delete node.filters.minSuit[suit];
        else node.filters.minSuit[suit] = Number(ev.target.value);
      });
      return label;
    }

    const minSuitM = buildMinSuitInput("min major (M)", "M");
    const minSuitm = buildMinSuitInput("min minor (m)", "m");
    const minSuitX = buildMinSuitInput("min X", "X");
    const minSuitY = buildMinSuitInput("min Y", "Y");
    const minSuitZ = buildMinSuitInput("min Z", "Z");
    const minSuitW = buildMinSuitInput("min W", "W");

    function buildMaxSuitInput(labelText, suit) {
      const label = document.createElement("label");
      label.innerHTML = `${labelText}<input type='number' min='0' max='13' />`;
      const input = label.querySelector("input");
      input.value = node.filters.maxSuit?.[suit] ?? "";
      input.addEventListener("input", (ev) => {
        node.filters.maxSuit = node.filters.maxSuit || {};
        if (ev.target.value === "") delete node.filters.maxSuit[suit];
        else node.filters.maxSuit[suit] = Number(ev.target.value);
      });
      return label;
    }

    const maxSuitC = buildMaxSuitInput("max clubs", "C");
    const maxSuitD = buildMaxSuitInput("max diamonds", "D");
    const maxSuitH = buildMaxSuitInput("max hearts", "H");
    const maxSuitS = buildMaxSuitInput("max spades", "S");
    const maxSuitM = buildMaxSuitInput("max major (M)", "M");
    const maxSuitm = buildMaxSuitInput("max minor (m)", "m");
    const maxSuitX = buildMaxSuitInput("max X", "X");
    const maxSuitY = buildMaxSuitInput("max Y", "Y");
    const maxSuitZ = buildMaxSuitInput("max Z", "Z");
    const maxSuitW = buildMaxSuitInput("max W", "W");

    const auctionRole = document.createElement("label");
    auctionRole.innerHTML = `auction role (top-level)<select>
      <option value="any">Any</option>
      <option value="opening">Opening only</option>
      <option value="overcall">Overcall only</option>
      <option value="contextual">Contextual only (not a root bid)</option>
    </select>`;
    const auctionRoleSelect = auctionRole.querySelector("select");
    auctionRoleSelect.value = node.filters.auctionRole || "any";
    auctionRoleSelect.addEventListener("change", (ev) => {
      if (ev.target.value === "any") delete node.filters.auctionRole;
      else node.filters.auctionRole = ev.target.value;
      rerenderTree();
    });

    const displayRole = document.createElement("label");
    displayRole.innerHTML = `bubble color / bidder<select>
      <option value="">Automatic (auction turn)</option>
      <option value="opener">Opener</option>
      <option value="responder">Responder</option>
      <option value="opponent">Opponent</option>
    </select>`;
    const displayRoleSelect = displayRole.querySelector("select");
    displayRoleSelect.value = ["opener", "responder", "opponent"].includes(node.displayRole) ? node.displayRole : "";
    displayRoleSelect.addEventListener("change", (ev) => {
      if (ev.target.value) node.displayRole = ev.target.value;
      else delete node.displayRole;
      rerenderTree();
    });

    const opponentOpening = document.createElement("label");
    opponentOpening.innerHTML = "opponent opening (overcall)<input placeholder='1C / 1NT' />";
    const opponentOpeningInput = opponentOpening.querySelector("input");
    opponentOpeningInput.value = node.filters.opponentOpening || "";
    opponentOpeningInput.addEventListener("change", (ev) => {
      const code = bidCode(ev.target.value);
      if (!ev.target.value.trim()) {
        delete node.filters.opponentOpening;
      } else if (isContractBid(code)) {
        if (nodeAuctionRole(node) === "overcall" && !isLegalTreeCall([code], node.trigger)) {
          setStatus(bidLegalityWarning([code], node.trigger), true);
          ev.target.value = node.filters.opponentOpening || "";
          return;
        }
        node.filters.opponentOpening = code;
        ev.target.value = code;
      } else {
        setStatus(`Bidding sequence: ${biddingSequenceText([], ev.target.value)}. Opponent opening must be a contract bid such as 1C or 1NT.`, true);
        ev.target.value = node.filters.opponentOpening || "";
        return;
      }
      rerenderTree();
    });

    const alertButton = document.createElement("button");
    alertButton.type = "button";
    alertButton.className = "alert-toggle";
    alertButton.textContent = node.alert ? "Alert! ON" : "Alert!";
    alertButton.title = node.alert ? "Remove Alert from this bid" : "Mark this bid as Alert!";
    alertButton.addEventListener("click", () => {
      node.alert = !node.alert;
      alertButton.textContent = node.alert ? "Alert! ON" : "Alert!";
      alertButton.classList.toggle("active", node.alert);
      alertButton.title = node.alert ? "Remove Alert from this bid" : "Mark this bid as Alert!";
      scheduleTreePersistence();
    });

    const controlsToggle = document.createElement("label");
    controlsToggle.innerHTML = "control-bid phase<input type='checkbox' />";
    const controlsCheckbox = controlsToggle.querySelector("input");
    controlsCheckbox.checked = node.generated?.type === "control-bids";
    controlsCheckbox.addEventListener("change", (ev) => {
      if (ev.target.checked && !node.generated) {
        node.generated = { type: "control-bids", agreedSuit: "", suits: ["C", "D", "H", "S"], startLevel: 4, description: "Control-bid suggestion." };
      } else if (!ev.target.checked) {
        node.generated = null;
      }
      rerenderTree();
    });

    // Keep the numeric editor as a fixed five-column matrix. Read it from
    // right to left as S, H, D, C, aHCP; the DOM order below is therefore
    // aHCP, C, D, H, S. The next two rows are the abstract suit ranges.
    [
      maxHcp, maxSuitC, maxSuitD, maxSuitH, maxSuitS,
      minHcp, minSuitC, minSuitD, minSuitH, minSuitS,
      maxSuitM, maxSuitm, maxSuitX, maxSuitY, maxSuitZ,
      minSuitM, minSuitm, minSuitX, minSuitY, minSuitZ
    ].forEach((field) => field.classList.add("node-numeric-field"));
    numericFields.append(
      maxHcp, maxSuitC, maxSuitD, maxSuitH, maxSuitS,
      minHcp, minSuitC, minSuitD, minSuitH, minSuitS,
      maxSuitM, maxSuitm, maxSuitX, maxSuitY, maxSuitZ,
      minSuitM, minSuitm, minSuitX, minSuitY, minSuitZ
    );

    // W is an existing optional legacy placeholder. Keep its values editable
    // without disturbing the requested four-row M/m/X/Y/Z matrix when unused.
    if (node.filters.minSuit?.W != null || node.filters.maxSuit?.W != null) {
      const legacySpacer = () => {
        const spacer = document.createElement("span");
        spacer.className = "node-numeric-spacer";
        return spacer;
      };
      maxSuitW.classList.add("node-numeric-field");
      minSuitW.classList.add("node-numeric-field");
      numericFields.append(maxSuitW, legacySpacer(), legacySpacer(), legacySpacer(), legacySpacer());
      numericFields.append(minSuitW, legacySpacer(), legacySpacer(), legacySpacer(), legacySpacer());
    }

    mainFields.append(trigger, meaning, auctionRole, displayRole, opponentOpening);
    fields.append(mainFields, numericFields);
    card.appendChild(fields);
    mainFields.append(alertButton, controlsToggle, createFactsEditor(node));
    if (node.generated && node.generated.type === "control-bids") {
      const controlFields = document.createElement("div");
      controlFields.className = "inline-row";
      controlFields.innerHTML = `
        <label>agreed suit
          <input class="small" type="text" maxlength="1" value="${node.generated.agreedSuit || ""}" />
        </label>
        <label>start level
          <input class="small" type="number" min="2" max="7" value="${node.generated.startLevel || 4}" />
        </label>
      `;
      const [agreedInput, levelInput] = controlFields.querySelectorAll("input");
      agreedInput.addEventListener("input", (ev) => {
        node.generated.agreedSuit = ev.target.value.trim().toUpperCase();
      });
      levelInput.addEventListener("input", (ev) => {
        node.generated.startLevel = Number(ev.target.value || 4);
      });
      const descLabel = document.createElement("label");
      descLabel.className = "inline-row";
      descLabel.textContent = "description";
      const descTextarea = document.createElement("textarea");
      descTextarea.rows = 2;
      descTextarea.value = node.generated.description || "";
      descTextarea.addEventListener("input", (ev) => {
        node.generated.description = ev.target.value;
      });
      mainFields.append(controlFields, descLabel, descTextarea);
    }

    const actions = document.createElement("div");
    actions.className = "systembuilder-controls";
    const addChild = document.createElement("button");
    addChild.textContent = "Add follow-up";
    addChild.addEventListener("click", () => {
      node.children.push(newBlankNode());
      rerenderTree();
    });
    const del = document.createElement("button");
    del.textContent = "Delete node";
    del.addEventListener("click", () => {
      parentArray.splice(index, 1);
      rerenderTree();
    });
    actions.append(addChild, del);
    mainFields.appendChild(actions);

    const childrenArea = document.createElement("div");
    childrenArea.className = "node-children";
    node.children.forEach((child, childIndex) => {
      childrenArea.appendChild(buildControls(child, node.children, childIndex, depth + 1));
    });
    card.appendChild(childrenArea);

    return asCollapsedNodeDetails(node, card, depth);
  }

  const ABSTRACT_SUIT_CANDIDATES = {
    C: ["C"],
    D: ["D"],
    H: ["H"],
    S: ["S"],
    NT: ["NT"],
    M: ["H", "S"],
    m: ["C", "D"],
    X: ["C", "D", "H", "S"],
    Y: ["C", "D", "H", "S"],
    Z: ["C", "D", "H", "S"],
    W: ["C", "D", "H", "S"]
  };
  const ABSTRACT_PLACEHOLDER_ORDER = ["X", "Y", "Z", "W"];
  const DENOMINATION_ORDER = { C: 0, D: 1, H: 2, S: 3, NT: 4 };

  function canonicalAbstractBid(value) {
    const compact = String(value ?? "").trim().replace(/\s+/g, "");
    const match = compact.match(/^(#|[1-7])(NT|[CDHSMmXYZWxyzw])$/);
    if (!match) return "";
    const level = match[1];
    const symbol = match[2] === "m" ? "m" : match[2].toUpperCase();
    // A numbered abstract bid needs an unspecified denomination. With #, a
    // concrete denomination is also valid because the level is unspecified.
    const isNumberedAbstractSuit = ["M", "m", "X", "Y", "Z", "W"].includes(symbol);
    if (level !== "#" && !isNumberedAbstractSuit) return "";
    return ABSTRACT_SUIT_CANDIDATES[symbol] ? `${level}${symbol}` : "";
  }

  function bidCode(value) {
    const abstractBid = canonicalAbstractBid(value);
    if (abstractBid) return abstractBid;
    const parsed = window.BridgeBiddingEngine?.parseBid(value);
    return parsed ? window.BridgeBiddingEngine.bidToCode(parsed) : "";
  }

  function isAbstractBid(value) {
    return Boolean(canonicalAbstractBid(value));
  }

  function isNativeContractBid(value) {
    return window.BridgeBiddingEngine?.parseBid(value)?.type === "bid";
  }

  function isContractBid(value) {
    return isAbstractBid(value) || isNativeContractBid(value);
  }

  function bidRank(level, denomination) {
    return (Number(level) - 1) * 5 + DENOMINATION_ORDER[denomination];
  }

  function contractBidParts(value) {
    const abstractBid = canonicalAbstractBid(value);
    if (abstractBid) {
      return {
        level: abstractBid[0] === "#" ? null : Number(abstractBid[0]),
        symbol: abstractBid.slice(1),
        abstract: true,
        levelAbstract: abstractBid[0] === "#"
      };
    }
    const parsed = window.BridgeBiddingEngine?.parseBid(value);
    if (!parsed || parsed.type !== "bid") return null;
    return { level: parsed.level, denomination: parsed.suit, abstract: false };
  }

  function abstractIntroductionIsOrdered(calls) {
    const introduced = new Set();
    for (const call of calls) {
      const parts = contractBidParts(call);
      if (!parts?.abstract || !ABSTRACT_PLACEHOLDER_ORDER.includes(parts.symbol) || introduced.has(parts.symbol)) continue;
      const expected = ABSTRACT_PLACEHOLDER_ORDER[introduced.size];
      if (parts.symbol !== expected) return false;
      introduced.add(parts.symbol);
    }
    return true;
  }

  // Abstract suits are persistent unknown suits within one branch. A # level
  // is independently resolved at each occurrence. Check whether at least one
  // concrete expansion makes every displayed contract strictly higher than
  // the preceding one. X, Y, Z, and W are distinct and may first appear only in
  // that order.
  function symbolicAuctionIsLegal(auction) {
    const contractCalls = auction.map((call) => bidCode(call)).filter(isContractBid);
    if (!abstractIntroductionIsOrdered(contractCalls)) return false;
    const symbols = [...new Set(contractCalls.map((call) => contractBidParts(call)).filter((parts) => parts?.abstract).map((parts) => parts.symbol))];
    if (!symbols.length) return false;

    function auctionFitsAssignments(assignments) {
      function visitCall(index, previousRank) {
        if (index >= contractCalls.length) return true;
        const parts = contractBidParts(contractCalls[index]);
        const denomination = parts.abstract ? assignments[parts.symbol] : parts.denomination;
        if (!denomination) return false;
        const possibleLevels = parts.levelAbstract ? [1, 2, 3, 4, 5, 6, 7] : [parts.level];
        return possibleLevels.some((level) => {
          const rank = bidRank(level, denomination);
          return rank > previousRank && visitCall(index + 1, rank);
        });
      }
      return visitCall(0, -1);
    }

    function trySymbol(index, assignments) {
      if (index >= symbols.length) return auctionFitsAssignments(assignments);
      const symbol = symbols[index];
      const usedPlaceholderSuits = new Set(ABSTRACT_PLACEHOLDER_ORDER.map((placeholder) => assignments[placeholder]).filter(Boolean));
      for (const denomination of ABSTRACT_SUIT_CANDIDATES[symbol]) {
        if (ABSTRACT_PLACEHOLDER_ORDER.includes(symbol) && usedPlaceholderSuits.has(denomination)) continue;
        assignments[symbol] = denomination;
        if (trySymbol(index + 1, assignments)) return true;
      }
      delete assignments[symbol];
      return false;
    }

    return trySymbol(0, {});
  }

  function legalCalls(auction) {
    return window.BridgeBiddingEngine?.legalBidCodesForState(auction, "N") || new Set();
  }

  function isLegalTreeCall(auction, value) {
    const code = bidCode(value);
    if (!code) return false;
    if (isContractBid(code) && (isAbstractBid(code) || auction.some((call) => isAbstractBid(call)))) {
      return symbolicAuctionIsLegal(auction.concat(code));
    }
    if (auction.some((call) => isAbstractBid(call))) return code === "P";
    return legalCalls(auction).has(code);
  }

  function biddingSequenceText(auction, continuation) {
    const calls = (auction || []).map((call) => bidCode(call) || String(call || "").trim()).filter(Boolean);
    const trailing = bidCode(continuation) || String(continuation || "").trim();
    if (trailing) calls.push(trailing);
    return calls.length ? calls.join(" – ") : "start of auction";
  }

  function bidLegalityWarning(auction, value) {
    const raw = String(value ?? "").trim();
    const code = bidCode(raw);
    const contractSequence = auction.concat(code || raw).map((call) => bidCode(call)).filter(isContractBid);
    const sequenceLabel = `Bidding sequence: ${biddingSequenceText(auction, code || raw)}.`;
    if (!code) {
      return `${sequenceLabel} “${raw || "blank"}” is not a bid. Use 1–7 or # with C, D, H, S, NT, M, m, X, Y, Z, or W.`;
    }
    if (!abstractIntroductionIsOrdered(contractSequence)) {
      return `${sequenceLabel} ${code} is not valid here: X, Y, Z, and W must first appear in that order.`;
    }
    if (isAbstractBid(code) || auction.some((call) => isAbstractBid(call))) {
      return `${sequenceLabel} ${code} has no legal concrete expansion. # must resolve to a strictly higher legal level in this branch.`;
    }
    return `${sequenceLabel} ${code} is not a legal call in this auction.`;
  }

  function nodeAuctionRole(node) {
    return node.filters?.auctionRole || "opening";
  }

  function competitionContextFor(node) {
    const configured = bidCode(node.filters?.opponentOpening);
    if (isContractBid(configured)) return configured;
    const ownBid = bidCode(node.trigger);

    // A generic overcall needs a real opposing opening before it can appear in
    // a bridge tree. Prefer the lowest possible opening that makes the action
    // legal, and leave calls that cannot be a direct overcall out of the graph.
    const possibleOpenings = ["1C", "1D", "1H", "1S", "1NT", "2C", "2D", "2H", "2S", "2NT"];
    return possibleOpenings.find((opening) => isLegalTreeCall([opening], ownBid)) || "";
  }

  function normalizeCompetitionContexts(system) {
    for (const convention of system.conventions || []) {
      for (const node of convention.children || []) {
        if (isTreeGroup(node)) continue;
        if (nodeAuctionRole(node) !== "overcall") continue;
        const context = competitionContextFor(node);
        if (context && isLegalTreeCall([context], node.trigger)) {
          node.filters.opponentOpening = context;
        } else {
          // 1C and XX cannot be direct overcalls of an opposing contract bid.
          // Keep the record editable, but do not draw it as a false legal tree.
          node.filters.auctionRole = "contextual";
        }
      }
    }
  }

  function impliedOpponentPass(auction, call) {
    const next = auction.concat(call);
    // Convention trees show partnership actions; the other side's pass is
    // implicit between two displayed partnership bids.
    if (isContractBid(call)) next.push("P");
    return next;
  }

  function treeNodeKey(convention, node) {
    return `${convention.id}:${node.id}`;
  }

  function treeContextKey(convention, opponentOpening) {
    return `${convention.id}:opponent:${opponentOpening}`;
  }

  function responseRole(depth) {
    return depth % 2 === 0 ? "opener" : "responder";
  }

  function displayRoleFor(node, fallbackRole) {
    return ["opener", "responder", "opponent"].includes(node?.displayRole) ? node.displayRole : fallbackRole;
  }

  const SUIT_SYMBOLS = {
    C: "♣", D: "♦", H: "♥", S: "♠", NT: "NT",
    M: "M", m: "m", X: "X", Y: "Y", Z: "Z", W: "W"
  };

  function finiteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function rangeText(minimum, maximum) {
    const min = finiteNumber(minimum);
    const max = finiteNumber(maximum);
    if (min != null && max != null) return min === max ? String(min) : `${min}–${max}`;
    if (min != null) return `${min}+`;
    if (max != null) return `≤${max}`;
    return "any";
  }

  function suitLengthText(suit, minimum, maximum) {
    const symbol = SUIT_SYMBOLS[suit] || suit;
    const min = finiteNumber(minimum);
    const max = finiteNumber(maximum);
    if (min != null && max != null) return min === max ? `${symbol} ${min}` : `${symbol} ${min}–${max}`;
    if (min != null) return `${symbol} ${min}+`;
    if (max != null) return `${symbol} ≤${max}`;
    return "";
  }

  function nodeConstraintSummary(node) {
    const filters = node?.filters || {};
    const pointRange = node?.weakOpening?.pointRange || node?.weakOpeningGroup?.pointRange || filters;
    const hcp = `aHCP ${rangeText(pointRange?.min ?? pointRange?.minHcp, pointRange?.max ?? pointRange?.maxHcp)}`;
    if (isTreeGroup(node) && node?.weakOpeningGroup?.suit) {
      const suit = node.weakOpeningGroup.suit;
      const lengths = [...new Set((node.children || []).map((child) => {
        const weakMinimum = finiteNumber(child.weakOpening?.longestSuitLength?.min);
        return weakMinimum != null ? `${SUIT_SYMBOLS[suit] || suit} ${weakMinimum}+` : suitLengthText(suit, child.filters?.minSuit?.[suit], child.filters?.maxSuit?.[suit]);
      }).filter(Boolean))];
      return `${hcp}; ${lengths.join(" / ") || "suit length any"}`;
    }
    if (node?.weakOpening?.longestSuit) {
      const suit = node.weakOpening.longestSuit;
      const minimum = finiteNumber(node.weakOpening.longestSuitLength?.min);
      if (minimum != null) return `${hcp}; ${SUIT_SYMBOLS[suit] || suit} ${minimum}+`;
    }
    const suits = ["C", "D", "H", "S", "M", "m", "X", "Y", "Z", "W"]
      .map((suit) => suitLengthText(suit, filters.minSuit?.[suit], filters.maxSuit?.[suit]))
      .filter(Boolean);
    return `${hcp}; ${suits.join(", ") || "suit length any"}`;
  }

  function appendNodeDescription(item, node) {
    const meaning = node?.meaning?.trim();
    const description = document.createElement("p");
    description.className = "bubble-meaning";
    const constraints = document.createElement("span");
    constraints.className = "bubble-constraints";
    constraints.textContent = nodeConstraintSummary(node);
    description.appendChild(constraints);
    if (meaning) description.append(`; ${meaning}`);
    item.appendChild(description);
  }

  function queueTreeNodeScroll(key) {
    window.requestAnimationFrame(() => {
      const target = [...document.querySelectorAll("[data-tree-node-key]")].find((element) => element.dataset.treeNodeKey === key);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      target.querySelector(".bid-bubble")?.focus({ preventScroll: true });
    });
  }

  function revealTreeNode(convention, node, ancestors = []) {
    [...ancestors, node].forEach((entry) => state.expandedNodes.add(treeNodeKey(convention, entry)));
    const key = treeNodeKey(convention, node);
    rerenderTree();
    queueTreeNodeScroll(key);
  }

  function buildRevealButton(convention, node, ancestors) {
    const reveal = document.createElement("button");
    reveal.type = "button";
    reveal.className = "bubble-reveal";
    reveal.textContent = "⌖";
    reveal.title = "Expand this branch and scroll to it";
    reveal.setAttribute("aria-label", `Expand and scroll to ${node.label || node.trigger || "this node"}`);
    reveal.addEventListener("click", (event) => {
      event.stopPropagation();
      revealTreeNode(convention, node, ancestors);
    });
    return reveal;
  }

  function buildContextRevealButton(convention, opponentOpening) {
    const key = treeContextKey(convention, opponentOpening);
    const reveal = document.createElement("button");
    reveal.type = "button";
    reveal.className = "bubble-reveal";
    reveal.textContent = "⌖";
    reveal.title = "Expand this opponent context and scroll to it";
    reveal.setAttribute("aria-label", `Expand and scroll to opponent opening ${opponentOpening}`);
    reveal.addEventListener("click", (event) => {
      event.stopPropagation();
      state.expandedContexts.add(key);
      rerenderTree();
      queueTreeNodeScroll(key);
    });
    return reveal;
  }

  function legalChildren(node, auction) {
    return (node.children || []).filter((child) => {
      return isLegalTreeCall(auction, child.trigger);
    });
  }

  function validateBranchLegality(node, auction, issues, label) {
    const code = bidCode(node.trigger);
    const prefix = label || node.id || "node";
    if (!code || !isLegalTreeCall(auction, code)) {
      issues.push(`${prefix}: ${bidLegalityWarning(auction, node.trigger)}`);
      return;
    }
    const nextAuction = impliedOpponentPass(auction, code);
    for (const child of node.children || []) {
      validateBranchLegality(child, nextAuction, issues, child.id || prefix);
    }
  }

  function conventionLegalityIssues(convention) {
    const issues = [];
    for (const node of convention.children || []) {
      if (isTreeGroup(node)) {
        for (const child of node.children || []) {
          if (!isContractBid(child.trigger)) {
            issues.push(`${node.label || node.id}: ${bidLegalityWarning([], child.trigger)}`);
            continue;
          }
          validateBranchLegality(child, [], issues);
        }
        continue;
      }
      const role = nodeAuctionRole(node);
      if (role === "contextual") continue;
      if (role === "overcall") {
        const opponentOpening = competitionContextFor(node);
        if (!opponentOpening) {
          issues.push(`${node.id || node.trigger}: Bidding sequence: ${biddingSequenceText([], node.trigger)}. A direct overcall needs an opposing opening bid.`);
          continue;
        }
        validateBranchLegality(node, [opponentOpening], issues);
      } else {
        if (!isContractBid(node.trigger)) {
          issues.push(`${node.id || node.trigger}: ${bidLegalityWarning([], node.trigger)}`);
          continue;
        }
        validateBranchLegality(node, [], issues);
      }
    }
    return issues;
  }

  function auditIssueKey(issue) {
    return `${issue.severity}|${issue.code}|${issue.message}|${(issue.sequence || []).join("-")}`;
  }

  function pushAuditIssue(issues, issue) {
    if (issues.length >= 100) return;
    const key = auditIssueKey(issue);
    if (!issues.some((existing) => auditIssueKey(existing) === key)) issues.push(issue);
  }

  function numericBounds(filters, minimumKey, maximumKey, defaultMinimum, defaultMaximum) {
    const minimum = Number(filters?.[minimumKey] == null ? defaultMinimum : filters[minimumKey]);
    const maximum = Number(filters?.[maximumKey] == null ? defaultMaximum : filters[maximumKey]);
    return { minimum, maximum };
  }

  function filtersMayOverlap(leftFilters, rightFilters) {
    const left = leftFilters || {};
    const right = rightFilters || {};
    if (left.seat && right.seat && left.seat !== right.seat) return false;
    if (left.auctionRole && right.auctionRole && left.auctionRole !== right.auctionRole) return false;
    if (left.opponentOpening && right.opponentOpening && bidCode(left.opponentOpening) !== bidCode(right.opponentOpening)) return false;

    const leftHcp = numericBounds(left, "minHcp", "maxHcp", 0, 40);
    const rightHcp = numericBounds(right, "minHcp", "maxHcp", 0, 40);
    if (Math.max(leftHcp.minimum, rightHcp.minimum) > Math.min(leftHcp.maximum, rightHcp.maximum)) return false;

    const suitKeys = new Set([
      ...Object.keys(left.minSuit || {}), ...Object.keys(left.maxSuit || {}),
      ...Object.keys(right.minSuit || {}), ...Object.keys(right.maxSuit || {}),
    ]);
    for (const suit of suitKeys) {
      const leftMinimum = Number(left.minSuit?.[suit] == null ? 0 : left.minSuit[suit]);
      const leftMaximum = Number(left.maxSuit?.[suit] == null ? 13 : left.maxSuit[suit]);
      const rightMinimum = Number(right.minSuit?.[suit] == null ? 0 : right.minSuit[suit]);
      const rightMaximum = Number(right.maxSuit?.[suit] == null ? 13 : right.maxSuit[suit]);
      if (Math.max(leftMinimum, rightMinimum) > Math.min(leftMaximum, rightMaximum)) return false;
    }
    return true;
  }

  function auditFilterConsistency(owner, filters, issues) {
    const f = filters || {};
    const hcp = numericBounds(f, "minHcp", "maxHcp", 0, 40);
    if (!Number.isFinite(hcp.minimum) || !Number.isFinite(hcp.maximum) || hcp.minimum < 0 || hcp.maximum > 40 || hcp.minimum > hcp.maximum) {
      pushAuditIssue(issues, {
        severity: "error",
        code: "impossible-hcp-filter",
        message: `${owner} has an impossible aHCP range (${f.minHcp ?? 0}–${f.maxHcp ?? 40}).`,
      });
    }

    const suitKeys = new Set([...Object.keys(f.minSuit || {}), ...Object.keys(f.maxSuit || {})]);
    for (const suit of suitKeys) {
      const minimum = Number(f.minSuit?.[suit] == null ? 0 : f.minSuit[suit]);
      const maximum = Number(f.maxSuit?.[suit] == null ? 13 : f.maxSuit[suit]);
      if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || minimum < 0 || maximum > 13 || minimum > maximum) {
        pushAuditIssue(issues, {
          severity: "error",
          code: "impossible-suit-filter",
          message: `${owner} has an impossible ${suit} length range (${f.minSuit?.[suit] ?? 0}–${f.maxSuit?.[suit] ?? 13}).`,
        });
      }
    }

    const concreteSuits = ["C", "D", "H", "S"];
    const minimumTotal = concreteSuits.reduce((sum, suit) => sum + Number(f.minSuit?.[suit] || 0), 0);
    const maximumTotal = concreteSuits.reduce((sum, suit) => sum + Number(f.maxSuit?.[suit] == null ? 13 : f.maxSuit[suit]), 0);
    if (minimumTotal > 13 || maximumTotal < 13) {
      pushAuditIssue(issues, {
        severity: "error",
        code: "impossible-shape-filter",
        message: `${owner} has suit-length bounds that cannot total 13 cards.`,
      });
    }
  }

  function overlapSeverity(left, right) {
    const samePriority = Number(left.priority || 0) === Number(right.priority || 0);
    const sameMeaning = String(left.meaning || "").trim() === String(right.meaning || "").trim();
    const sameAlert = Boolean(left.alert) === Boolean(right.alert);
    return samePriority && (!sameMeaning || !sameAlert) ? "error" : "warning";
  }

  function overlapMessage(kind, left, right, witness) {
    const priorityText = Number(left.priority || 0) === Number(right.priority || 0)
      ? `both use priority ${Number(left.priority || 0)}`
      : `priorities ${Number(left.priority || 0)} and ${Number(right.priority || 0)} resolve the choice`;
    return `${kind} ${left.id} and ${right.id} both match ${witness.join("-")}; ${priorityText}.`;
  }

  function concreteOverlap(leftCompiled, rightCompiled, maxCalls = 24) {
    try {
      return window.BridgeBiddingEngine.findSequenceOverlap(leftCompiled, rightCompiled, { maxCalls });
    } catch (error) {
      return null;
    }
  }

  function auditSiblingNodes(nodes, path, parentLabel, issues, atRoot = false) {
    const flattened = [];
    for (const node of nodes || []) {
      if (isTreeGroup(node)) flattened.push(...(node.children || []));
      else flattened.push(node);
    }

    const compiled = flattened.map((node) => {
      let nodePath = path.concat(node.trigger || "");
      if (atRoot && nodeAuctionRole(node) === "overcall") {
        const opponentOpening = competitionContextFor(node);
        if (opponentOpening) nodePath = [opponentOpening].concat(nodePath);
      }
      try {
        return {
          node,
          path: nodePath,
          compiled: window.BridgeBiddingEngine.compileSequenceExpression(nodePath.join("-")),
        };
      } catch (error) {
        return { node, path: nodePath, compiled: null };
      }
    });

    for (let leftIndex = 0; leftIndex < compiled.length; leftIndex++) {
      for (let rightIndex = leftIndex + 1; rightIndex < compiled.length; rightIndex++) {
        const left = compiled[leftIndex];
        const right = compiled[rightIndex];
        if (!left.compiled || !right.compiled) continue;
        if (atRoot && nodeAuctionRole(left.node) !== nodeAuctionRole(right.node)) continue;
        if (!filtersMayOverlap(left.node.filters, right.node.filters)) continue;
        const witness = concreteOverlap(left.compiled, right.compiled, Math.max(16, left.path.length + 2));
        if (!witness) continue;
        pushAuditIssue(issues, {
          severity: overlapSeverity(left.node, right.node),
          code: "tree-overlap",
          message: overlapMessage(`Sibling routes under ${parentLabel}`, left.node, right.node, witness),
          sequence: witness,
        });
      }
    }

    for (const entry of compiled) {
      if (!entry.compiled) continue;
      auditSiblingNodes(entry.node.children || [], entry.path, entry.node.id || entry.node.trigger, issues, false);
    }
  }

  function collectTreePathRecords(nodes, path, convention, records, isRoot = false) {
    for (const node of nodes || []) {
      if (isTreeGroup(node)) {
        collectTreePathRecords(node.children || [], path, convention, records, isRoot);
        continue;
      }
      const role = isRoot ? nodeAuctionRole(node) : "continuation";
      const nodePath = path.concat(node.trigger || "");
      if (role !== "overcall" && role !== "contextual") {
        try {
          records.push({
            id: node.id || node.trigger,
            meaning: node.meaning || "",
            priority: Number(node.priority || 0),
            alert: Boolean(node.alert),
            filters: node.filters || {},
            expression: nodePath.join("-"),
            compiled: window.BridgeBiddingEngine.compileSequenceExpression(nodePath.join("-")),
            convention: convention.id || convention.name,
          });
        } catch (error) {
          // Legality validation reports the invalid path with a more useful context.
        }
      }
      collectTreePathRecords(node.children || [], nodePath, convention, records, false);
    }
  }

  function collectDefinitionIds(system, issues) {
    const seen = new Map();
    function record(id, type, location) {
      const key = String(id || "").trim();
      if (!key) {
        pushAuditIssue(issues, { severity: "error", code: "missing-id", message: `${type} is missing an ID at ${location}.` });
        return;
      }
      if (seen.has(key)) {
        const first = seen.get(key);
        pushAuditIssue(issues, {
          severity: "error",
          code: "duplicate-id",
          message: `Duplicate ID ${key} is used by ${first.type} at ${first.location} and ${type} at ${location}.`,
        });
      } else {
        seen.set(key, { type, location });
      }
    }
    function visitNode(node, path) {
      const segment = node.trigger || node.label || node.id || "(unnamed)";
      const nodePath = path.concat(segment);
      const location = nodePath.join(" – ");
      record(node.id, isTreeGroup(node) ? "tree group" : "tree node", `tree route ${location}`);
      auditFilterConsistency(`Node ${node.id || node.trigger || "(unnamed)"}`, node.filters, issues);
      (node.children || []).forEach((child) => visitNode(child, nodePath));
    }
    for (const convention of system.conventions || []) {
      const conventionLocation = `convention ${convention.name || convention.id || "(unnamed)"}`;
      record(convention.id, "convention", conventionLocation);
      (convention.children || []).forEach((node) => visitNode(node, []));
    }
    for (const rule of system.sequenceRules || []) {
      record(rule.id, "sequence rule", `bidding expression ${rule.expression || "(empty)"}`);
      auditFilterConsistency(`Rule ${rule.id || "(unnamed)"}`, rule.filters, issues);
    }
  }

  function auditSequenceRules(system, treeRecords, issues) {
    const compiledRules = [];
    for (const rule of system.sequenceRules || []) {
      const expression = String(rule.expression || "").trim();
      if (!expression) {
        pushAuditIssue(issues, {
          severity: "error",
          code: "missing-expression",
          message: `Sequence rule ${rule.id || "(unnamed)"} has no expression.`,
        });
        continue;
      }
      try {
        const compiled = window.BridgeBiddingEngine.compileSequenceExpression(expression, { where: rule.where });
        const searchCompiled = window.BridgeBiddingEngine.compileSequenceExpression(`*-(?:${expression})`, { where: rule.where });
        compiledRules.push({
          ...rule,
          id: rule.id || "(unnamed)",
          priority: Number(rule.priority || 0),
          compiled,
          searchCompiled,
        });
      } catch (error) {
        pushAuditIssue(issues, {
          severity: "error",
          code: "invalid-expression",
          message: `Sequence rule ${rule.id || "(unnamed)"}; bidding expression ${expression}: ${error.message}`,
        });
      }
    }

    for (let leftIndex = 0; leftIndex < compiledRules.length; leftIndex++) {
      for (let rightIndex = leftIndex + 1; rightIndex < compiledRules.length; rightIndex++) {
        const left = compiledRules[leftIndex];
        const right = compiledRules[rightIndex];
        if (!filtersMayOverlap(left.filters, right.filters)) continue;
        const witness = concreteOverlap(left.searchCompiled, right.compiled)
          || concreteOverlap(right.searchCompiled, left.compiled);
        if (!witness) continue;
        pushAuditIssue(issues, {
          severity: overlapSeverity(left, right),
          code: "expression-overlap",
          message: overlapMessage("Expression rules", left, right, witness),
          sequence: witness,
        });
      }
    }

    for (const rule of compiledRules) {
      for (const tree of treeRecords) {
        if (!filtersMayOverlap(rule.filters, tree.filters)) continue;
        const witness = concreteOverlap(rule.searchCompiled, tree.compiled);
        if (!witness) continue;
        pushAuditIssue(issues, {
          severity: overlapSeverity(rule, tree),
          code: "expression-tree-overlap",
          message: overlapMessage(`Expression/tree routes in ${tree.convention}`, rule, tree, witness),
          sequence: witness,
        });
      }
    }
  }

  function systemDefinitionIssues(system) {
    const issues = [];
    if (!system) return issues;
    collectDefinitionIds(system, issues);

    const treeRecords = [];
    for (const convention of system.conventions || []) {
      for (const message of conventionLegalityIssues(convention)) {
        pushAuditIssue(issues, { severity: "error", code: "illegal-tree-path", message });
      }
      auditSiblingNodes(convention.children || [], [], convention.name || convention.id, issues, true);
      collectTreePathRecords(convention.children || [], [], convention, treeRecords, true);
    }
    auditSequenceRules(system, treeRecords, issues);
    return issues;
  }

  function refreshSystemAudit() {
    if (!ui.systemAudit) return;
    ui.systemAudit.innerHTML = "";
    let issues;
    try {
      issues = systemDefinitionIssues(state.currentSystem);
    } catch (error) {
      issues = [{ severity: "error", code: "audit-failed", message: `Definition audit failed: ${error.message}` }];
    }
    const errors = issues.filter((issue) => issue.severity === "error");
    const warnings = issues.filter((issue) => issue.severity === "warning");
    const summary = document.createElement("div");
    summary.className = "audit-summary";
    const overall = document.createElement("span");
    overall.className = `audit-badge${errors.length ? " is-error" : warnings.length ? " is-warning" : ""}`;
    overall.textContent = errors.length ? "Needs attention" : warnings.length ? "Valid with overlaps" : "Consistent";
    summary.appendChild(overall);
    if (errors.length) {
      const errorBadge = document.createElement("span");
      errorBadge.className = "audit-badge is-error";
      errorBadge.textContent = `${errors.length} error${errors.length === 1 ? "" : "s"}`;
      summary.appendChild(errorBadge);
    }
    if (warnings.length) {
      const warningBadge = document.createElement("span");
      warningBadge.className = "audit-badge is-warning";
      warningBadge.textContent = `${warnings.length} overlap warning${warnings.length === 1 ? "" : "s"}`;
      summary.appendChild(warningBadge);
    }
    ui.systemAudit.appendChild(summary);

    if (!issues.length) {
      const clear = document.createElement("p");
      clear.className = "meta-note";
      clear.textContent = "No legality, consistency, or overlap issues found.";
      ui.systemAudit.appendChild(clear);
      return;
    }
    const list = document.createElement("ul");
    list.className = "audit-list";
    for (const issue of issues) {
      const item = document.createElement("li");
      item.className = `audit-item${issue.severity === "error" ? " is-error" : ""}`;
      const message = document.createElement("span");
      message.textContent = `${issue.severity === "error" ? "Error" : "Overlap"}: ${issue.message}`;
      item.appendChild(message);
      if (Array.isArray(issue.sequence) && issue.sequence.length) {
        const sequence = document.createElement("code");
        sequence.className = "audit-sequence";
        sequence.textContent = `Bidding sequence: ${issue.sequence.join(" – ")}`;
        item.appendChild(sequence);
      }
      list.appendChild(item);
    }
    ui.systemAudit.appendChild(list);
  }

  function scheduleAuditRefresh() {
    if (state.auditTimer) window.clearTimeout(state.auditTimer);
    state.auditTimer = window.setTimeout(() => {
      state.auditTimer = null;
      refreshSystemAudit();
    }, 160);
  }

  function collapseNodeBranch(convention, node) {
    state.expandedNodes.delete(treeNodeKey(convention, node));
    for (const child of node.children || []) collapseNodeBranch(convention, child);
  }

  function appendGraphEditor(item, convention, node, auction) {
    const key = treeNodeKey(convention, node);
    if (!state.editingNodes.has(key)) return;

    const editor = document.createElement("div");
    editor.className = "graph-node-editor";
    const bidLabel = document.createElement("label");
    bidLabel.textContent = "Bid";
    const bidInput = document.createElement("input");
    bidInput.value = node.trigger || "";
    bidInput.maxLength = 3;
    bidInput.placeholder = "1C / #D / #M / 2X / 3W";
    bidLabel.appendChild(bidInput);
    const meaningLabel = document.createElement("label");
    meaningLabel.textContent = "Meaning";
    const meaningInput = document.createElement("textarea");
    meaningInput.rows = 2;
    meaningInput.value = node.meaning || "";
    meaningLabel.appendChild(meaningInput);
    const roleLabel = document.createElement("label");
    roleLabel.textContent = "Bubble color / bidder";
    const roleInput = document.createElement("select");
    roleInput.innerHTML = `
      <option value="">Automatic (auction turn)</option>
      <option value="opener">Opener</option>
      <option value="responder">Responder</option>
      <option value="opponent">Opponent</option>`;
    roleInput.value = displayRoleFor(node, "") === "" ? "" : node.displayRole || "";
    roleLabel.appendChild(roleInput);
    const actions = document.createElement("div");
    actions.className = "graph-editor-actions";
    const save = document.createElement("button");
    save.type = "button";
    save.textContent = "Save node";
    save.addEventListener("click", (event) => {
      event.stopPropagation();
      const code = bidCode(bidInput.value);
      if (!code || !isLegalTreeCall(auction, code)) {
        setStatus(bidLegalityWarning(auction, bidInput.value), true);
        return;
      }
      const originalTrigger = node.trigger;
      node.trigger = code;
      const branchIssues = [];
      validateBranchLegality(node, auction, branchIssues);
      if (branchIssues.length) {
        node.trigger = originalTrigger;
        setStatus(`That bid would make a follow-up illegal: ${branchIssues[0]}`, true);
        return;
      }
      node.meaning = meaningInput.value.trim();
      if (roleInput.value) node.displayRole = roleInput.value;
      else delete node.displayRole;
      state.editingNodes.delete(key);
      setStatus("Node updated.");
      rerenderTree();
    });
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "secondary-button";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (event) => {
      event.stopPropagation();
      state.editingNodes.delete(key);
      rerenderTree();
    });
    actions.append(save, cancel);
    editor.append(bidLabel, meaningLabel, roleLabel, actions);
    item.appendChild(editor);
  }

  function appendGroupEditor(item, convention, node) {
    const key = treeNodeKey(convention, node);
    if (!state.editingNodes.has(key)) return;
    const editor = document.createElement("div");
    editor.className = "graph-node-editor";
    const label = document.createElement("label");
    label.textContent = "Group label";
    const labelInput = document.createElement("input");
    labelInput.value = node.label || "";
    label.appendChild(labelInput);
    const meaning = document.createElement("label");
    meaning.textContent = "Description";
    const meaningInput = document.createElement("textarea");
    meaningInput.rows = 2;
    meaningInput.value = node.meaning || "";
    meaning.appendChild(meaningInput);
    const role = document.createElement("label");
    role.textContent = "Bubble color / bidder";
    const roleInput = document.createElement("select");
    roleInput.innerHTML = `<option value="">Automatic (auction turn)</option><option value="opener">Opener</option><option value="responder">Responder</option><option value="opponent">Opponent</option>`;
    roleInput.value = node.displayRole || "";
    role.appendChild(roleInput);
    const actions = document.createElement("div");
    actions.className = "graph-editor-actions";
    const save = document.createElement("button");
    save.type = "button";
    save.textContent = "Save group";
    save.addEventListener("click", (event) => {
      event.stopPropagation();
      node.label = labelInput.value.trim() || "Opening group";
      node.meaning = meaningInput.value.trim();
      if (roleInput.value) node.displayRole = roleInput.value;
      else delete node.displayRole;
      state.editingNodes.delete(key);
      setStatus("Group updated.");
      rerenderTree();
    });
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "secondary-button";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (event) => {
      event.stopPropagation();
      state.editingNodes.delete(key);
      rerenderTree();
    });
    actions.append(save, cancel);
    editor.append(label, meaning, role, actions);
    item.appendChild(editor);
  }

  function buildGroupNode(convention, node, ancestors = []) {
    const item = document.createElement("div");
    item.className = "bubble-branch bubble-branch--group";
    const children = (node.children || []).filter((child) => {
      const code = bidCode(child.trigger);
      return isContractBid(code) && isLegalTreeCall([], code);
    });
    const key = treeNodeKey(convention, node);
    item.dataset.treeNodeKey = key;
    const expanded = state.expandedNodes.has(key);
    const canExpand = children.length > 0;
    const bubbleRow = document.createElement("div");
    bubbleRow.className = "bubble-row";
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = `bid-bubble bid-bubble--${displayRoleFor(node, "opener")} bid-bubble--group${canExpand ? " is-expandable" : " is-terminal"}`;
    bubble.setAttribute("aria-expanded", String(expanded));
    bubble.title = canExpand ? "Click to show or hide the alternative opening bids" : "No legal opening options";
    const label = document.createElement("span");
    label.className = "bid-bubble__call";
    label.textContent = node.label || "Opening group";
    const indicator = document.createElement("span");
    indicator.className = "bid-bubble__indicator";
    indicator.textContent = canExpand ? (expanded ? "−" : "+") : "•";
    bubble.append(label, indicator);
    bubble.addEventListener("click", () => {
      if (!canExpand) return;
      if (expanded) collapseNodeBranch(convention, node);
      else state.expandedNodes.add(key);
      rerenderTree();
    });
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "bubble-edit";
    edit.textContent = "Edit";
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      if (state.editingNodes.has(key)) state.editingNodes.delete(key);
      else state.editingNodes.add(key);
      rerenderTree();
    });
    bubbleRow.append(buildRevealButton(convention, node, ancestors), bubble, edit);
    item.appendChild(bubbleRow);
    appendNodeDescription(item, node);
    appendGroupEditor(item, convention, node);
    if (expanded) {
      const childArea = document.createElement("div");
      childArea.className = "bubble-children";
      children.forEach((child) => childArea.appendChild(buildGraphNode(convention, child, [], 0, [...ancestors, node])));
      item.appendChild(childArea);
    }
    return item;
  }

  function buildGraphNode(convention, node, auction, depth, ancestors = []) {
    const item = document.createElement("div");
    item.className = "bubble-branch";
    const code = bidCode(node.trigger);
    const nextAuction = impliedOpponentPass(auction, code);
    const children = legalChildren(node, nextAuction);
    const key = treeNodeKey(convention, node);
    item.dataset.treeNodeKey = key;
    const expanded = state.expandedNodes.has(key);
    const canExpand = children.length > 0;

    const bubbleRow = document.createElement("div");
    bubbleRow.className = "bubble-row";
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = `bid-bubble bid-bubble--${displayRoleFor(node, responseRole(depth))}${canExpand ? " is-expandable" : " is-terminal"}`;
    bubble.setAttribute("aria-expanded", String(expanded));
    bubble.title = canExpand ? "Click to expand or collapse legal follow-ups" : "No legal stored follow-ups";
    const bid = document.createElement("span");
    bid.className = "bid-bubble__call";
    bid.textContent = code || "New";
    const indicator = document.createElement("span");
    indicator.className = "bid-bubble__indicator";
    indicator.textContent = canExpand ? (expanded ? "−" : "+") : "•";
    bubble.append(bid, indicator);
    bubble.addEventListener("click", () => {
      if (!canExpand) return;
      if (expanded) collapseNodeBranch(convention, node);
      else state.expandedNodes.add(key);
      rerenderTree();
    });

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "bubble-edit";
    edit.textContent = "Edit";
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      if (state.editingNodes.has(key)) state.editingNodes.delete(key);
      else state.editingNodes.add(key);
      rerenderTree();
    });
    bubbleRow.append(buildRevealButton(convention, node, ancestors), bubble, edit);
    item.appendChild(bubbleRow);
    appendNodeDescription(item, node);
    appendGraphEditor(item, convention, node, auction);

    if (expanded) {
      const childArea = document.createElement("div");
      childArea.className = "bubble-children";
      children.forEach((child) => childArea.appendChild(buildGraphNode(convention, child, nextAuction, depth + 1, [...ancestors, node])));
      item.appendChild(childArea);
    }
    return item;
  }

  function appendOpponentContextEditor(item, convention, opponentOpening, roots) {
    const key = treeContextKey(convention, opponentOpening);
    if (!state.editingContexts.has(key)) return;
    const editor = document.createElement("div");
    editor.className = "graph-node-editor";
    const label = document.createElement("label");
    label.textContent = "Opponent opening";
    const input = document.createElement("input");
    input.value = opponentOpening;
    input.maxLength = 3;
    label.appendChild(input);
    const actions = document.createElement("div");
    actions.className = "graph-editor-actions";
    const save = document.createElement("button");
    save.type = "button";
    save.textContent = "Save context";
    save.addEventListener("click", (event) => {
      event.stopPropagation();
      const code = bidCode(input.value);
      if (!isContractBid(code) || roots.some((root) => !isLegalTreeCall([code], root.trigger))) {
        setStatus("This opponent opening does not make every displayed overcall legal.", true);
        return;
      }
      roots.forEach((root) => {
        root.filters = root.filters || {};
        root.filters.opponentOpening = code;
      });
      state.editingContexts.delete(key);
      setStatus("Opponent-opening context updated.");
      rerenderTree();
    });
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "secondary-button";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (event) => {
      event.stopPropagation();
      state.editingContexts.delete(key);
      rerenderTree();
    });
    actions.append(save, cancel);
    editor.append(label, actions);
    item.appendChild(editor);
  }

  function buildOpponentContext(convention, opponentOpening, roots) {
    const item = document.createElement("div");
    item.className = "bubble-branch bubble-branch--opponent";
    const legalRoots = roots.filter((root) => isLegalTreeCall([opponentOpening], root.trigger));
    const key = treeContextKey(convention, opponentOpening);
    item.dataset.treeNodeKey = key;
    const expanded = state.expandedContexts.has(key);
    const bubbleRow = document.createElement("div");
    bubbleRow.className = "bubble-row";
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = "bid-bubble bid-bubble--opponent is-expandable";
    bubble.setAttribute("aria-expanded", String(expanded));
    bubble.title = "Opponent opening: click to show or hide legal overcalls";
    bubble.innerHTML = `<span class="bid-bubble__call">${opponentOpening}</span><span class="bid-bubble__indicator">${expanded ? "−" : "+"}</span>`;
    bubble.addEventListener("click", () => {
      if (expanded) {
        state.expandedContexts.delete(key);
        legalRoots.forEach((node) => collapseNodeBranch(convention, node));
      } else {
        state.expandedContexts.add(key);
      }
      rerenderTree();
    });
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "bubble-edit";
    edit.textContent = "Edit";
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      if (state.editingContexts.has(key)) state.editingContexts.delete(key);
      else state.editingContexts.add(key);
      rerenderTree();
    });
    bubbleRow.append(buildContextRevealButton(convention, opponentOpening), bubble, edit);
    item.appendChild(bubbleRow);
    appendNodeDescription(item, { filters: {}, meaning: "Opponent opening — click to reveal the first overcall." });
    appendOpponentContextEditor(item, convention, opponentOpening, legalRoots);
    if (expanded) {
      const childArea = document.createElement("div");
      childArea.className = "bubble-children";
      legalRoots.forEach((root) => childArea.appendChild(buildGraphNode(convention, root, [opponentOpening], 0)));
      item.appendChild(childArea);
    }
    return item;
  }

  function buildConventionTreePreview(convention) {
    const preview = document.createElement("section");
    preview.className = "tree-preview interactive-tree";
    const heading = document.createElement("h3");
    heading.textContent = "Interactive convention tree";
    const note = document.createElement("p");
    note.className = "meta-note";
    note.textContent = "Start with a parent opening. Click a bubble to reveal only its legal follow-ups; click it again to fold that branch. # = an unspecified legal level; M = an unspecified major; m = an unspecified minor; and X/Y/Z/W are distinct unspecified suits introduced in that order. These symbols can be combined (for example #D or #M); invalid expansions and overlapping siblings appear in the definition audit. Edit changes the bid and meaning directly.";
    const graph = document.createElement("div");
    graph.className = "bubble-graph";

    const openingRoots = [];
    const treeGroups = [];
    const overcallGroups = new Map();
    for (const node of convention.children || []) {
      if (isTreeGroup(node)) {
        treeGroups.push(node);
        continue;
      }
      const role = nodeAuctionRole(node);
      if (role === "contextual") continue;
      if (role === "overcall") {
        const opponentOpening = competitionContextFor(node);
        if (!opponentOpening) continue;
        if (!overcallGroups.has(opponentOpening)) overcallGroups.set(opponentOpening, []);
        overcallGroups.get(opponentOpening).push(node);
      } else if (isContractBid(node.trigger) && isLegalTreeCall([], node.trigger)) {
        openingRoots.push(node);
      }
    }

    treeGroups.forEach((node) => graph.appendChild(buildGroupNode(convention, node)));
    openingRoots.forEach((node) => graph.appendChild(buildGraphNode(convention, node, [], 0)));
    [...overcallGroups.entries()].sort(([a], [b]) => a.localeCompare(b)).forEach(([opening, roots]) => {
      graph.appendChild(buildOpponentContext(convention, opening, roots));
    });
    if (!graph.childNodes.length) {
      const empty = document.createElement("span");
      empty.className = "meta-note";
      empty.textContent = "No legal opening or anchored-overcall roots yet. Add a contract bid and select its top-level auction role.";
      graph.appendChild(empty);
    }

    const issues = conventionLegalityIssues(convention);
    const audit = document.createElement("p");
    audit.className = `tree-legality ${issues.length ? "is-error" : ""}`;
    audit.textContent = issues.length
      ? `${issues.length} stored call${issues.length === 1 ? "" : "s"} are omitted because they are not legal in this auction context. ${issues[0]}`
      : "Every displayed branch passes bridge auction legality checks.";
    preview.append(heading, note, graph, audit);
    return preview;
  }

  const HEATMAP_SUITS = ["C", "D", "H", "S", "NT"];
  const HEATMAP_LEVELS = [1, 2, 3, 4, 5, 6, 7];
  const HEATMAP_MAX_OCCURRENCES = 15;
  const HEATMAP_BASE_COLOR_LEVEL = 5;
  const HEATMAP_CONTRACT_CODES = HEATMAP_LEVELS.flatMap((level) => (
    HEATMAP_SUITS.map((suit) => `${level}${suit}`)
  ));

  function heatmapCode(level, suit) {
    return `${level}${suit}`;
  }

  function heatmapCell(cells, code) {
    if (!cells.has(code)) cells.set(code, { normal: [], opponent: [], followup: [] });
    return cells.get(code);
  }

  function addHeatmapEntry(cells, rawCode, category, source) {
    const code = bidCode(rawCode);
    // The map is deliberately the real 1♣–7NT grid. Abstract bids such as
    // 2M remain available in the tree, but do not pretend to occupy one
    // concrete cell on the printed bridge-bid map.
    if (!isNativeContractBid(code)) return;
    const entries = heatmapCell(cells, code)[category];
    // A cell records at most fifteen occurrences in each colour channel. This
    // keeps very broad sequence expressions useful without overwhelming the
    // visual scale or retaining unbounded expansion data.
    if (entries.length < HEATMAP_MAX_OCCURRENCES) entries.push(source);
  }

  function collectHeatmapBranch(cells, convention, node, category = "normal", depth = 0) {
    if (isTreeGroup(node)) {
      (node.children || []).forEach((child) => collectHeatmapBranch(cells, convention, child, category, depth));
      return;
    }
    const visualRole = displayRoleFor(node, responseRole(depth));
    const entryCategory = visualRole === "opponent" ? "opponent" : category;
    addHeatmapEntry(cells, node.trigger, entryCategory, { convention, node });
    const childCategory = entryCategory === "opponent" ? "followup" : category;
    (node.children || []).forEach((child) => collectHeatmapBranch(cells, convention, child, childCategory, depth + 1));
  }

  function heatmapExpressionRules(system) {
    const records = [];
    const add = (rule, source) => {
      const expression = String(rule?.expression || rule?.sequence || rule?.pattern || "").trim();
      if (expression) records.push({ rule, expression, source });
    };
    (system.sequenceRules || []).forEach((rule) => add(rule, "system sequence rule"));
    for (const convention of system.conventions || []) {
      (convention.sequenceRules || []).forEach((rule) => add(rule, `convention ${convention.id || convention.name || "rule"}`));
      add(convention, `convention ${convention.id || convention.name || "expression"}`);
    }
    return records;
  }

  // Produce the structural paths through the expression AST. A `*` can
  // describe arbitrarily many calls, so repeat paths deliberately include its
  // empty form and one representative form. Its `any` atom below expands to
  // the complete 1C–7NT heatmap instead of attempting an impractically large
  // auction-by-auction enumeration.
  function heatmapExpressionPaths(node) {
    if (!node || node.type === "empty") return [[]];
    if (node.type === "atom") return [[node.atom]];
    if (node.type === "sequence") {
      return (node.children || []).reduce((paths, child) => (
        paths.flatMap((path) => heatmapExpressionPaths(child).map((childPath) => path.concat(childPath)))
      ), [[]]);
    }
    if (node.type === "alternation") return (node.branches || []).flatMap((branch) => heatmapExpressionPaths(branch));
    if (node.type === "repeat") return [[]].concat(heatmapExpressionPaths(node.child));
    return [[]];
  }

  function heatmapBindingVariants(atoms, where) {
    const variables = [];
    for (const atom of atoms) {
      if (atom.kind !== "contract-pattern" || !atom.bindsSuit || variables.includes(atom.suitToken)) continue;
      variables.push(atom.suitToken);
    }
    const candidatesFor = (symbol) => {
      const candidates = atoms
        .filter((atom) => atom.kind === "contract-pattern" && atom.bindsSuit && atom.suitToken === symbol)
        .map((atom) => atom.allowedSuits || []);
      return candidates.reduce((allowed, next) => allowed.filter((suit) => next.includes(suit)), ["C", "D", "H", "S", "NT"]);
    };
    const variants = [];
    const visit = (index, bindings) => {
      if (index >= variables.length) {
        const relationshipsHold = (where || []).every((relation) => {
          try {
            // Relations that require a current BID are resolved by the rule
            // engine at match time. They cannot invalidate a suit-only map
            // expansion, so retain their candidate rather than hiding it.
            return window.BridgeBiddingEngine.evaluateBidRelation(relation, bindings) !== false;
          } catch (error) {
            return true;
          }
        });
        if (relationshipsHold) variants.push(bindings);
        return;
      }
      const symbol = variables[index];
      const usedPlaceholders = new Set(["X", "Y", "Z", "W"].map((key) => bindings[key]).filter(Boolean));
      for (const suit of candidatesFor(symbol)) {
        if (["X", "Y", "Z", "W"].includes(symbol) && usedPlaceholders.has(suit)) continue;
        visit(index + 1, { ...bindings, [symbol]: suit });
      }
    };
    visit(0, {});
    return variants.length ? variants : [{}];
  }

  function heatmapPredicateMatches(atom, code) {
    const parts = contractBidParts(code);
    if (!parts || parts.abstract) return false;
    const operand = String(atom.operand || "").trim();
    const suitOperand = operand === "m" ? "m" : operand.toUpperCase();
    if (["C", "D", "H", "S", "NT", "M", "m"].includes(suitOperand)) {
      const equal = suitOperand === "M"
        ? ["H", "S"].includes(parts.denomination)
        : suitOperand === "m"
          ? ["C", "D"].includes(parts.denomination)
          : parts.denomination === suitOperand;
      return ["=", "=="].includes(atom.operator) ? equal : atom.operator === "!=" ? !equal : false;
    }
    const target = window.BridgeBiddingEngine.contractBidIndex(operand);
    const current = window.BridgeBiddingEngine.contractBidIndex(code);
    if (target == null || current == null) return false;
    if (["=", "=="].includes(atom.operator)) return current === target;
    if (atom.operator === "!=") return current !== target;
    if (atom.operator === "<") return current < target;
    if (atom.operator === ">") return current > target;
    if (atom.operator === "<=") return current <= target;
    if (atom.operator === ">=") return current >= target;
    return false;
  }

  function heatmapAtomCodes(atom, bindings) {
    if (atom.kind === "exact") return [atom.code];
    if (atom.kind === "any") return HEATMAP_CONTRACT_CODES;
    if (atom.kind === "predicate") return HEATMAP_CONTRACT_CODES.filter((code) => heatmapPredicateMatches(atom, code));
    if (atom.kind !== "contract-pattern") return [];
    const suits = atom.bindsSuit && bindings[atom.suitToken]
      ? [bindings[atom.suitToken]]
      : atom.allowedSuits || [];
    const levels = atom.level == null ? HEATMAP_LEVELS : [atom.level];
    return levels.flatMap((level) => suits.map((suit) => `${level}${suit}`));
  }

  function collectHeatmapExpression(cells, record) {
    let compiled;
    try {
      compiled = window.BridgeBiddingEngine?.compileSequenceExpression(record.expression, { where: record.rule?.where });
    } catch (error) {
      // The expression editor and definition audit show the detailed warning.
      // An invalid expression simply cannot contribute a concrete heat cell.
      return;
    }

    // Expand every concrete form of the expression's bid atoms, rather than
    // enumerating whole auctions. This is equivalent for the heatmap (which
    // records bids, not routes), includes #/M/m/X/Y/Z substitutions and is
    // safe for unbounded `*` expressions.
    // A bid is counted at most once per expression and colour channel: a broad
    // wildcard may reach it through many equivalent auction paths, but it is
    // still one convention-rule occurrence on the heatmap.
    const codesByCategory = new Map([
      ["normal", new Set()],
      ["followup", new Set()],
    ]);
    for (const atoms of heatmapExpressionPaths(compiled.ast)) {
      const variants = heatmapBindingVariants(atoms, record.rule?.where);
      let opponentHasBid = false;
      for (const atom of atoms) {
        const isOpponentBid = atom.actor === "opponent";
        if (!isOpponentBid) {
          const category = opponentHasBid ? "followup" : "normal";
          for (const bindings of variants) {
            heatmapAtomCodes(atom, bindings).forEach((code) => {
              codesByCategory.get(category).add(code);
            });
          }
        }
        // The opponent's initiating/context call remains colourless, while
        // the partnership calls that follow it receive the purple treatment.
        if (isOpponentBid) opponentHasBid = true;
      }
    }
    codesByCategory.forEach((codes, category) => {
      codes.forEach((code) => {
        addHeatmapEntry(cells, code, category, { expression: record.expression, source: record.source });
      });
    });
  }

  function collectHeatmapCells(system) {
    const cells = new Map();
    for (const convention of system.conventions || []) {
      for (const node of convention.children || []) {
        if (isTreeGroup(node)) {
          collectHeatmapBranch(cells, convention, node);
          continue;
        }
        const role = nodeAuctionRole(node);
        if (role === "contextual") continue;
        if (role === "overcall") {
          const opponentOpening = competitionContextFor(node);
          if (!opponentOpening || !isLegalTreeCall([opponentOpening], node.trigger)) continue;
          // Every stored partnership action in a competitive branch is a
          // follow-up to the opposing opening, including the first overcall.
          // The opening itself is context only; it does not colour the map.
          collectHeatmapBranch(cells, convention, node, "followup");
        } else if (isContractBid(node.trigger) && isLegalTreeCall([], node.trigger)) {
          collectHeatmapBranch(cells, convention, node);
        }
      }
    }
    heatmapExpressionRules(system).forEach((record) => collectHeatmapExpression(cells, record));
    return cells;
  }

  const HEATMAP_COLORS = {
    // Full blue is deliberately the responder-bubble blue so that a five
    // level blue field reads with exactly the same visual strength.
    brass: [122, 83, 27],
    blue: [115, 212, 223],
    purple: [202, 116, 241],
    red: [244, 83, 87],
    intenseBlue: [51, 224, 243],
    intensePurple: [231, 97, 255],
    intenseRed: [255, 54, 64]
  };

  function heatmapLevels(cell) {
    return {
      blue: Math.min(HEATMAP_MAX_OCCURRENCES, cell.normal.length),
      purple: Math.min(HEATMAP_MAX_OCCURRENCES, cell.followup.length),
      red: Math.min(HEATMAP_MAX_OCCURRENCES, cell.opponent.length)
    };
  }

  function compositeColor(base, overlay, opacity) {
    const amount = Math.max(0, Math.min(1, opacity));
    return base.map((channel, index) => Math.round(channel * (1 - amount) + overlay[index] * amount));
  }

  function colorToCss(color) {
    return `rgb(${color.join(" ")})`;
  }

  function heatmapColor(levels) {
    const applyOccurrenceColor = (base, color, intenseColor, count) => {
      if (!count) return base;
      if (count <= HEATMAP_BASE_COLOR_LEVEL) {
        return compositeColor(base, color, count / HEATMAP_BASE_COLOR_LEVEL);
      }
      // Preserve the established five-occurrence colour exactly, then use the
      // remaining ten occurrences for a visibly stronger extension.
      return compositeColor(color, intenseColor, (count - HEATMAP_BASE_COLOR_LEVEL) / (HEATMAP_MAX_OCCURRENCES - HEATMAP_BASE_COLOR_LEVEL));
    };
    let color = HEATMAP_COLORS.brass.slice();
    color = applyOccurrenceColor(color, HEATMAP_COLORS.blue, HEATMAP_COLORS.intenseBlue, levels.blue);
    color = applyOccurrenceColor(color, HEATMAP_COLORS.purple, HEATMAP_COLORS.intensePurple, levels.purple);
    color = applyOccurrenceColor(color, HEATMAP_COLORS.red, HEATMAP_COLORS.intenseRed, levels.red);
    return color;
  }

  function heatmapLevelDescription(levels) {
    const parts = [];
    if (levels.blue) parts.push(`${levels.blue}/${HEATMAP_MAX_OCCURRENCES} blue`);
    if (levels.purple) parts.push(`${levels.purple}/${HEATMAP_MAX_OCCURRENCES} purple`);
    if (levels.red) parts.push(`${levels.red}/${HEATMAP_MAX_OCCURRENCES} red`);
    return parts.join(", ") || "brass base only";
  }

  function appendHeatmapBid(call, code) {
    const parts = contractBidParts(code);
    if (!parts || parts.abstract) {
      call.textContent = code;
      return;
    }
    call.append(String(parts.level));
    const suit = document.createElement("span");
    suit.className = `heatmap-bid-suit heatmap-bid-suit--${parts.denomination.toLowerCase()}`;
    suit.textContent = SUIT_SYMBOLS[parts.denomination] || parts.denomination;
    call.appendChild(suit);
  }

  function buildHeatmapLabel(code, levels) {
    const label = document.createElement("span");
    label.className = "heatmap-bid";
    label.title = `${code}: ${heatmapLevelDescription(levels)}`;
    const call = document.createElement("span");
    call.className = "heatmap-bid__call";
    appendHeatmapBid(call, code);
    label.append(call);
    return label;
  }

  function buildConventionHeatmap() {
    const details = document.createElement("details");
    details.className = "convention-heatmap";
    details.open = state.heatmapOpen;
    const summary = document.createElement("summary");
    summary.textContent = "All-convention bid heatmap (five strains × seven levels)";
    details.appendChild(summary);
    details.addEventListener("toggle", () => {
      state.heatmapOpen = details.open;
      scheduleTreePersistence();
    });

    const body = document.createElement("div");
    body.className = "convention-heatmap__body";
    const note = document.createElement("p");
    note.className = "meta-note";
    note.textContent = "Every cell contains only its bid. Tree routes and every legal concrete expansion of sequence expressions are superposed, up to 15 occurrences per colour. Brass is the base; normal partnership routes add blue, competitive partnership routes add purple, and explicitly opponent-styled tree nodes add red. Five blue occurrences retain the original responder-blue intensity; initial opponent openings do not colour this field.";
    const scroller = document.createElement("div");
    scroller.className = "heatmap-scroll";
    const grid = document.createElement("div");
    grid.className = "convention-heatmap__grid";
    const cells = collectHeatmapCells(state.currentSystem);
    HEATMAP_SUITS.forEach((suit) => {
      HEATMAP_LEVELS.forEach((level) => {
        const code = heatmapCode(level, suit);
        const cell = heatmapCell(cells, code);
        const levels = heatmapLevels(cell);
        const centerColor = heatmapColor(levels);
        const cellElement = document.createElement("div");
        cellElement.className = "heatmap-cell";
        cellElement.setAttribute("aria-label", `${code}: ${heatmapLevelDescription(levels)}`);
        cellElement.style.setProperty("--heatmap-field-color", colorToCss(centerColor));
        cellElement.style.setProperty("--heatmap-field-opacity", levels.blue || levels.purple || levels.red ? "1" : "0");
        cellElement.appendChild(buildHeatmapLabel(code, levels));
        grid.appendChild(cellElement);
      });
    });
    scroller.appendChild(grid);
    body.append(note, scroller);
    details.appendChild(body);
    return details;
  }

  function buildConventionPanel(convention, index) {
    const panel = document.createElement("div");
    panel.className = "tree";
    const header = document.createElement("div");
    header.className = "inline-row convention-header";

    const position = document.createElement("label");
    position.className = "convention-position";
    position.append(document.createTextNode("Place"));
    const positionSelect = document.createElement("select");
    const conventionCount = state.currentSystem.conventions.length;
    for (let positionNumber = 1; positionNumber <= conventionCount; positionNumber++) {
      const option = document.createElement("option");
      option.value = String(positionNumber);
      option.textContent = String(positionNumber);
      positionSelect.appendChild(option);
    }
    positionSelect.value = String(index + 1);
    positionSelect.title = "Move this convention to the selected place";
    positionSelect.setAttribute("aria-label", `Place ${index + 1} for ${convention.name || "this convention"}`);
    positionSelect.addEventListener("change", (event) => {
      const targetIndex = Number(event.target.value) - 1;
      if (!Number.isInteger(targetIndex) || targetIndex === index) return;
      const conventions = state.currentSystem.conventions;
      const [moved] = conventions.splice(index, 1);
      conventions.splice(targetIndex, 0, moved);
      setStatus(`Moved ${moved.name || "Convention"} to place ${targetIndex + 1}.`);
      rerenderTree();
    });
    position.appendChild(positionSelect);

    const titleInput = document.createElement("input");
    titleInput.style.flex = "1";
    titleInput.value = convention.name;
    titleInput.addEventListener("input", (ev) => {
      convention.name = ev.target.value;
    });

    const delConv = document.createElement("button");
    delConv.textContent = "Remove convention";
    delConv.addEventListener("click", () => {
      state.currentSystem.conventions.splice(index, 1);
      rerenderTree();
    });
    header.append(position, document.createTextNode("Convention name"), titleInput, delConv);
    panel.appendChild(header);
    panel.appendChild(buildConventionTreePreview(convention));

    const addNode = document.createElement("button");
    addNode.textContent = "Add top-level node";
    addNode.addEventListener("click", () => {
      convention.children.push(newBlankNode());
      rerenderTree();
    });
    panel.appendChild(addNode);

    convention.children.forEach((node, childIndex) => {
      panel.appendChild(buildControls(node, convention.children, childIndex, 1));
    });

    panel.appendChild(document.createTextNode(""));
    return panel;
  }

  function renderTree() {
    ui.treeArea.innerHTML = "";
    if (!state.currentSystem) return;
    if (!Array.isArray(state.currentSystem.conventions)) {
      state.currentSystem.conventions = [];
    }
    ui.treeArea.appendChild(buildConventionHeatmap());
    state.currentSystem.conventions.forEach((conv, i) => {
      ui.treeArea.appendChild(buildConventionPanel(conv, i));
    });
  }

  function rerenderTree() {
    renderMetadata();
    renderSequenceRules();
    renderTree();
    refreshSystemAudit();
    scheduleTreePersistence();
  }

  function attachEvents() {
    ui.treeArea.addEventListener("input", scheduleTreePersistence);
    ui.treeArea.addEventListener("input", scheduleAuditRefresh);
    ui.treeArea.addEventListener("change", scheduleTreePersistence);
    ui.treeArea.addEventListener("change", scheduleAuditRefresh);
    window.addEventListener("pagehide", persistCurrentTree);
    ui.select.addEventListener("change", async (e) => {
      state.currentSystemId = e.target.value;
      await loadCurrentSystem();
    });

    ui.import.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        const raw = await file.text();
        const parsed = JSON.parse(raw);
        parsed.systemId = parsed.systemId || `custom-${Date.now()}`;
        const imported = {
          id: parsed.systemId,
          name: parsed.systemName || file.name,
          fileData: parsed,
          imported: true,
        };
        const existingIndex = state.systems.findIndex((system) => system.id === imported.id);
        if (existingIndex >= 0) state.systems.splice(existingIndex, 1, imported);
        else state.systems.push(imported);
        state.currentSystemId = imported.id;
        buildSystemSelect();
        await loadCurrentSystem();
        setStatus(`Loaded ${imported.name} from the imported file.${idRepairNotice() ? ` ${idRepairNotice()}` : ""}`);
      } catch (err) {
        alert(`Import failed: ${err.message}`);
      }
      e.target.value = "";
    });

    ui.addConvention.addEventListener("click", () => {
      state.currentSystem.conventions.push(newConvention());
      rerenderTree();
    });

    ui.addSequenceRule.addEventListener("click", () => {
      state.currentSystem.sequenceRules = state.currentSystem.sequenceRules || [];
      state.currentSystem.sequenceRules.push(newSequenceRule());
      state.currentSystem.schemaVersion = "1.2";
      renderSequenceRules();
      refreshSystemAudit();
      scheduleTreePersistence();
    });

    ui.exportBtn.addEventListener("click", () => {
      const output = JSON.stringify(state.currentSystem, null, 2);
      navigator.clipboard.writeText(output).then(
        () => setStatus("System JSON copied to the clipboard."),
        () => setStatus("Clipboard access was unavailable. Use Export File to save the JSON.", true)
      );
    });

    ui.downloadBtn.addEventListener("click", () => {
      const output = JSON.stringify(state.currentSystem, null, 2);
      const blob = new Blob([output], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${state.currentSystem.systemId}.bidding-system.json`;
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 0);
      setStatus("System JSON download started.");
    });
  }

  async function loadCurrentSystem() {
    const item = state.systems.find((sys) => sys.id === state.currentSystemId);
    if (!item) return;
    try {
      const loaded = await loadSystemFromStore(item);
      state.currentSystem = normalizeSystemShape(loaded);
      if (state.restoredTree?.system?.systemId === state.currentSystem.systemId) {
        state.expandedNodes = new Set(state.restoredTree.expandedNodes || []);
        state.expandedContexts = new Set(state.restoredTree.expandedContexts || []);
        state.heatmapOpen = Boolean(state.restoredTree.heatmapOpen);
        state.restoredTree = null;
      } else {
        state.heatmapOpen = false;
      }
      ui.select.value = state.currentSystemId;
      rerenderTree();
      setStatus(idRepairNotice() || (item.quickDraft ? "Showing the system created by Quick Customization." : ""));
    } catch (err) {
      state.currentSystem = null;
      ui.treeArea.innerHTML = "";
      setStatus(`Could not load ${item.name || item.id}. Import its JSON file or open this app through a local web server.`, true);
      console.error(err);
    }
  }

  async function bootstrap() {
    const loadedSystems = await readSystems().catch(() => []);
    if (loadedSystems.length === 0) {
      state.systems = [
        { id: "standard-natural", name: "Standard Natural (five-card majors)", file: "Customization/standard-natural.json", default: true },
        { id: "two-over-one", name: "2/1 Game Forcing", file: "Customization/standard-two-over-one.json", default: false },
        { id: "precision-1c", name: "Precision Club", file: "Customization/standard-precision-1c.json", default: false },
        { id: "acol", name: "Standard English Acol", file: "Customization/standard-acol.json", default: false },
      ];
    } else {
      state.systems = loadedSystems;
    }
    const restored = readPersistedTree();
    if (restored?.system) {
      const draft = restored.system;
      const draftEntry = {
        id: draft.systemId,
        name: `${draft.systemName || "Customized system"} (Saved convention tree)`,
        fileData: draft,
        quickDraft: true,
      };
      state.systems = state.systems.filter((item) => item.id !== draftEntry.id);
      state.systems.unshift(draftEntry);
      state.currentSystemId = draftEntry.id;
      state.restoredTree = restored;
    }
    buildSystemSelect();
    await loadCurrentSystem();
    attachEvents();
    state.persistenceEnabled = true;
    persistCurrentTree();
  }

  bootstrap().catch((err) => console.error(err));
})();
