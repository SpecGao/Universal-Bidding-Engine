(() => {
  "use strict";

  const DRAFT_STORAGE_KEY = "bridge-rule-engine.quick-customization-draft";
  const ACTIVE_TREE_STORAGE_KEY = "bridge-rule-engine.active-convention-tree";
  const ACTIVE_TREE_COOKIE = "bridge-rule-engine-active-tree";
  const STANDARD_BASES = [
    { id: "standard-natural", name: "Standard Natural (five-card majors)", file: "Customization/standard-natural.json", default: true },
    { id: "two-over-one", name: "2/1 Game Forcing", file: "Customization/standard-two-over-one.json" },
    { id: "precision-1c", name: "Precision Club", file: "Customization/standard-precision-1c.json" },
    { id: "acol", name: "Standard English Acol", file: "Customization/standard-acol.json" },
  ];
  const ui = {
    form: document.getElementById("quickCustomizationForm"),
    baseSystem: document.getElementById("baseSystemSelect"),
    baseSummary: document.getElementById("baseSystemSummary"),
    twoNtEnabled: document.getElementById("twoNtEnabled"),
    twoNtControls: Array.from(document.querySelectorAll("[data-two-nt-control]")),
    weakTwosEnabled: document.getElementById("weakTwosEnabled"),
    weakTwoControls: Array.from(document.querySelectorAll("[data-weak-two-control]")),
    status: document.getElementById("quickCustomizationStatus"),
  };

  const state = { systems: [], loadedBases: new Map() };

  function setStatus(message, isError = false) {
    ui.status.textContent = message || "";
    ui.status.classList.toggle("is-error", Boolean(isError));
  }

  function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeSystem(system) {
    system.schemaVersion = system.schemaVersion || "1.0";
    system.systemId = system.systemId || `custom-${Date.now()}`;
    system.systemName = system.systemName || "Customized system";
    system.conventions = Array.isArray(system.conventions) ? system.conventions : [];
    return system;
  }

  async function loadSystemIndex() {
    let listedSystems = [];
    try {
      const response = await fetch("Customization/system-index.json");
      if (!response.ok) throw new Error("Unable to load the base-system list.");
      const json = await response.json();
      listedSystems = Array.isArray(json.systems) ? json.systems : [];
    } catch (error) {
      listedSystems = [];
    }
    const bundledSystems = window.BridgeSystemData?.systems || [];
    return STANDARD_BASES.map((base) => {
      const listed = listedSystems.find((item) => item.id === base.id || item.file === base.file);
      const bundled = bundledSystems.find((item) => item.systemId === base.id);
      return { ...base, ...(listed || {}), file: base.file, fileData: bundled || null };
    });
  }

  function populateBaseSystems() {
    ui.baseSystem.innerHTML = "";
    for (const system of state.systems) {
      const option = document.createElement("option");
      option.value = system.id;
      option.textContent = system.name || system.id;
      option.selected = Boolean(system.default);
      ui.baseSystem.appendChild(option);
    }
  }

  async function loadBaseSystem(systemId) {
    const entry = state.systems.find((system) => system.id === systemId);
    if (!entry) throw new Error("The selected base system is unavailable.");
    if (state.loadedBases.has(entry.id)) return deepCopy(state.loadedBases.get(entry.id));
    let system;
    if (entry.fileData) {
      system = normalizeSystem(deepCopy(entry.fileData));
    } else {
      const response = await fetch(entry.file);
      if (!response.ok) throw new Error(`Unable to load ${entry.name || entry.id}.`);
      system = normalizeSystem(await response.json());
    }
    state.loadedBases.set(entry.id, system);
    return deepCopy(system);
  }

  function numberValue(formData, name) {
    return Number(formData.get(name));
  }

  function rangeFromForm(formData, prefix) {
    return { min: numberValue(formData, `${prefix}Min`), max: numberValue(formData, `${prefix}Max`) };
  }

  function assertRange(range, label) {
    if (!Number.isFinite(range.min) || !Number.isFinite(range.max) || range.min < 0 || range.max > 40 || range.min > range.max) {
      throw new Error(`${label} needs a valid minimum and maximum aHCP range.`);
    }
  }

  function setControlValue(name, value) {
    const control = ui.form.elements.namedItem(name);
    if (control && value != null) control.value = String(value);
  }

  function setRangeValues(prefix, range) {
    if (!range) return;
    setControlValue(`${prefix}Min`, range.min);
    setControlValue(`${prefix}Max`, range.max);
  }

  function minimumLength(value, suit) {
    if (!value) return null;
    if (value[suit]?.min != null) return Number(value[suit].min);
    if (value.min != null) return Number(value.min);
    return null;
  }

  function profileRange(profile, label) {
    return profile?.[label]?.pointRange || null;
  }

  function setRadio(name, value) {
    const control = ui.form.elements.namedItem(name);
    const values = control && control.length != null ? Array.from(control) : [control];
    values.filter(Boolean).forEach((radio) => {
      radio.checked = radio.value === value;
    });
  }

  function setWeakTwoSuits(suits) {
    const controls = ui.form.elements.namedItem("weakTwoSuits");
    const values = controls && controls.length != null ? Array.from(controls) : [controls];
    values.filter(Boolean).forEach((control) => {
      control.checked = suits.includes(control.value);
    });
  }

  function formatAdjustedPoints(range) {
    if (!range || range.min == null) return "not used";
    return range.max == null || range.max >= 40 ? `${range.min}+ aHCP` : `${range.min}–${range.max} aHCP`;
  }

  function formatLength(shape) {
    if (!shape) return "any shape";
    const parts = Object.entries(shape)
      .filter(([key]) => key !== "min" && key !== "max")
      .map(([suit, range]) => `${range.min != null ? `${range.min}+` : ""}${suit}`);
    if (parts.length) return parts.join(", ");
    if (shape.min != null) return `${shape.min}+ cards in the named suit`;
    return "shape as labelled";
  }

  function appendSummaryLine(container, label, range, length, shape) {
    const line = document.createElement("div");
    line.className = "base-system-summary__line";
    const bid = document.createElement("strong");
    bid.textContent = label;
    const detail = document.createElement("span");
    detail.textContent = `${formatAdjustedPoints(range)} · ${length || formatLength(shape)}`;
    line.append(bid, detail);
    container.appendChild(line);
  }

  function renderBaseSystemSummary(system) {
    ui.baseSummary.innerHTML = "";
    const reference = system.openingReference || {};
    const title = document.createElement("div");
    title.className = "base-system-summary__title";
    title.textContent = `${system.systemName} base profile`;
    ui.baseSummary.appendChild(title);
    if (reference.summary) {
      const summary = document.createElement("p");
      summary.textContent = reference.summary;
      ui.baseSummary.appendChild(summary);
    }
    const entries = Array.isArray(reference.openings) ? reference.openings : [];
    if (entries.length) {
      const lines = document.createElement("div");
      lines.className = "base-system-summary__lines";
      entries.forEach((entry) => appendSummaryLine(lines, entry.bid, entry.pointRange, entry.lengthLabel, entry.suitLengthRange || entry.shape));
      ui.baseSummary.appendChild(lines);
    }
    const conventions = Array.isArray(reference.conventions) ? reference.conventions : [];
    if (conventions.length) {
      const heading = document.createElement("div");
      heading.className = "base-system-summary__subtitle";
      heading.textContent = "Convention labels";
      ui.baseSummary.appendChild(heading);
      const list = document.createElement("ul");
      conventions.forEach((item) => {
        const line = document.createElement("li");
        line.textContent = `${item.label}: ${item.description}`;
        list.appendChild(line);
      });
      ui.baseSummary.appendChild(list);
    }
  }

  function applyBaseDefaults(system) {
    const profile = system.openingProfile || {};
    setRangeValues("oneNt", profileRange(profile, "1NT"));
    setRangeValues("oneMajor", profileRange(profile, "1Major"));
    setRangeValues("oneMinor", profileRange(profile, "1Minor") || profile["1Minor"]?.diamonds?.pointRange);
    setRangeValues("twoNt", profileRange(profile, "2NT"));

    const majorLength = minimumLength(profile["1Major"]?.suitLengthRange, "H") || minimumLength(profile["1Major"]?.suitLengthRange, "S");
    const minorLength = minimumLength(profile["1Minor"]?.suitLengthRange, "D") || minimumLength(profile["1Minor"]?.diamonds?.suitLengthRange, "D") || minimumLength(profile["1Minor"]?.clubs?.suitLengthRange, "C");
    if (majorLength) setControlValue("majorLength", Math.min(5, Math.max(4, majorLength)));
    if (minorLength) setControlValue("minorLength", Math.min(5, Math.max(2, minorLength)));

    const strong = profile.strongOpening || {};
    setRadio("strongOpening", strong.bid || "none");
    setRangeValues("strong", strong.pointRange);
    const weakTwos = profile.weakTwos || {};
    ui.weakTwosEnabled.checked = Boolean(weakTwos.enabled);
    setRangeValues("weakTwo", weakTwos.pointRange);
    if (weakTwos.suitLengthRange?.min != null) setControlValue("weakTwoLength", weakTwos.suitLengthRange.min);
    if (Array.isArray(weakTwos.suits)) setWeakTwoSuits(weakTwos.suits);

    ui.twoNtEnabled.checked = profile["2NT"]?.enabled !== false;
    updateWeakTwoControls();
    updateTwoNtControls();
    renderBaseSystemSummary(system);
  }

  async function selectBaseSystem() {
    try {
      setStatus("Loading the selected base profile…");
      const system = await loadBaseSystem(ui.baseSystem.value);
      applyBaseDefaults(system);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Unable to load the selected base profile.", true);
    }
  }

  function readConfiguration() {
    const formData = new FormData(ui.form);
    const config = {
      name: String(formData.get("systemName") || "").trim(),
      baseSystemId: String(formData.get("baseSystem") || ""),
      oneNt: rangeFromForm(formData, "oneNt"),
      oneMajor: { ...rangeFromForm(formData, "oneMajor"), length: Number(formData.get("majorLength")) },
      oneMinor: { ...rangeFromForm(formData, "oneMinor"), length: Number(formData.get("minorLength")) },
      twoNt: { ...rangeFromForm(formData, "twoNt"), enabled: formData.get("twoNtEnabled") === "on" },
      strongOpening: String(formData.get("strongOpening") || "2C"),
      strong: rangeFromForm(formData, "strong"),
      weakTwos: {
        enabled: formData.get("weakTwosEnabled") === "on",
        min: numberValue(formData, "weakTwoMin"),
        max: numberValue(formData, "weakTwoMax"),
        length: Number(formData.get("weakTwoLength")),
        suits: formData.getAll("weakTwoSuits").map(String),
      },
      conventions: {
        stayman: formData.get("stayman") === "on",
        transfers: formData.get("transfers") === "on",
        gerber: formData.get("gerber") === "on",
        splinter: formData.get("splinter") === "on",
        slamTool: String(formData.get("slamTool") || "none"),
      },
    };

    if (!config.name) throw new Error("Give the customized system a name.");
    assertRange(config.oneNt, "1NT");
    assertRange(config.oneMajor, "1 of a major");
    assertRange(config.oneMinor, "1 of a minor");
    if (config.twoNt.enabled) assertRange(config.twoNt, "2NT");
    if (config.strongOpening !== "none") assertRange(config.strong, "Strong opening");
    if (config.weakTwos.enabled) {
      assertRange(config.weakTwos, "Weak two");
      if (!config.weakTwos.suits.length) throw new Error("Choose at least one weak-two suit or turn weak twos off.");
    }
    return config;
  }

  function node(id, trigger, meaning, filters = {}, children = []) {
    return { id, trigger, meaning, filters, children };
  }

  function openingConvention(system) {
    let convention = system.conventions.find((item) => /opening/i.test(item.name || ""));
    if (!convention) {
      convention = { id: "quick-openings", name: "Opening structure", notes: "Generated by Quick Customization.", children: [] };
      system.conventions.unshift(convention);
    }
    convention.children = Array.isArray(convention.children) ? convention.children : [];
    return convention;
  }

  function rootNode(convention, trigger) {
    return convention.children.find((item) => item.trigger === trigger) || null;
  }

  function upsertRootNode(convention, id, trigger, meaning, filters) {
    const openingFilters = { ...filters, auctionRole: "opening" };
    let target = rootNode(convention, trigger);
    if (!target) {
      target = node(id, trigger, meaning, openingFilters);
      convention.children.push(target);
      return target;
    }
    target.meaning = meaning;
    target.filters = openingFilters;
    target.children = Array.isArray(target.children) ? target.children : [];
    return target;
  }

  function removeRootNode(convention, trigger) {
    convention.children = convention.children.filter((item) => item.trigger !== trigger);
  }

  function childNode(parent, trigger) {
    parent.children = Array.isArray(parent.children) ? parent.children : [];
    return parent.children.find((item) => item.trigger === trigger) || null;
  }

  function upsertChild(parent, id, trigger, meaning, filters = {}) {
    let target = childNode(parent, trigger);
    if (!target) {
      target = node(id, trigger, meaning, filters);
      parent.children.push(target);
      return target;
    }
    target.meaning = meaning;
    target.filters = filters;
    target.children = Array.isArray(target.children) ? target.children : [];
    return target;
  }

  function removeChild(parent, trigger) {
    parent.children = (parent.children || []).filter((item) => item.trigger !== trigger);
  }

  function setStayman(oneNt, enabled) {
    if (!enabled) {
      removeChild(oneNt, "2C");
      return;
    }
    const stayman = upsertChild(oneNt, "quick-stayman-2C", "2C", "Stayman: asks opener to show a four-card major.");
    stayman.children = [
      node("quick-stayman-2D", "2D", "No four-card major."),
      node("quick-stayman-2H", "2H", "Four or more hearts; may also hold four spades."),
      node("quick-stayman-2S", "2S", "Four or more spades; denies four hearts in this simple structure."),
    ];
  }

  function setTransfers(oneNt, enabled) {
    if (!enabled) {
      removeChild(oneNt, "2D");
      removeChild(oneNt, "2H");
      return;
    }
    upsertChild(oneNt, "quick-transfer-2D", "2D", "Jacoby transfer to hearts; opener normally bids 2♥.");
    upsertChild(oneNt, "quick-transfer-2H", "2H", "Jacoby transfer to spades; opener normally bids 2♠.");
  }

  function addSplinters(heartOpening, spadeOpening) {
    const heartSplinters = [
      ["3S", "Splinter raise: 4+ hearts, game-forcing values, and short spades."],
      ["4C", "Splinter raise: 4+ hearts, game-forcing values, and short clubs."],
      ["4D", "Splinter raise: 4+ hearts, game-forcing values, and short diamonds."],
    ];
    const spadeSplinters = [
      ["4C", "Splinter raise: 4+ spades, game-forcing values, and short clubs."],
      ["4D", "Splinter raise: 4+ spades, game-forcing values, and short diamonds."],
      ["4H", "Splinter raise: 4+ spades, game-forcing values, and short hearts."],
    ];
    heartSplinters.forEach(([trigger, meaning]) => upsertChild(heartOpening, `quick-splinter-1H-${trigger}`, trigger, meaning));
    spadeSplinters.forEach(([trigger, meaning]) => upsertChild(spadeOpening, `quick-splinter-1S-${trigger}`, trigger, meaning));
  }

  function removeSplinters(opening) {
    opening.children = (opening.children || []).filter((item) => !String(item.id || "").startsWith("quick-splinter-"));
  }

  function conventionGroup(system) {
    system.conventions = system.conventions.filter((item) => item.id !== "quick-customization-conventions");
    const group = { id: "quick-customization-conventions", name: "Selected conventions", notes: "Added by Quick Customization.", children: [] };
    system.conventions.push(group);
    return group;
  }

  function addSlamTool(group, type) {
    if (type === "none") return;
    const isRkcb = type === "rkcb";
    const meaning = isRkcb
      ? "Roman Key Card Blackwood (4NT): key-card ask after trump is agreed."
      : "Blackwood (4NT): ace ask after trump is agreed.";
    const ask = node("quick-slam-4NT", "4NT", meaning, { auctionRole: "contextual" });
    ask.children = isRkcb
      ? [
          node("quick-rkcb-5C", "5C", "0 or 3 key cards."),
          node("quick-rkcb-5D", "5D", "1 or 4 key cards."),
          node("quick-rkcb-5H", "5H", "2 key cards without the trump queen."),
          node("quick-rkcb-5S", "5S", "2 key cards with the trump queen."),
        ]
      : [
          node("quick-blackwood-5C", "5C", "0 or 4 aces."),
          node("quick-blackwood-5D", "5D", "1 ace."),
          node("quick-blackwood-5H", "5H", "2 aces."),
          node("quick-blackwood-5S", "5S", "3 aces."),
        ];
    group.children.push(ask);
  }

  function openingProfileFromConfiguration(config) {
    return {
      "1NT": {
        pointRange: { min: config.oneNt.min, max: config.oneNt.max },
        suitLengthRange: { C: { min: 2, max: 5 }, D: { min: 2, max: 5 }, H: { min: 2, max: 5 }, S: { min: 2, max: 5 } },
        shape: "balanced",
      },
      "1Major": {
        pointRange: { min: config.oneMajor.min, max: config.oneMajor.max },
        suitLengthRange: { H: { min: config.oneMajor.length, max: 13 }, S: { min: config.oneMajor.length, max: 13 } },
      },
      "1Minor": {
        pointRange: { min: config.oneMinor.min, max: config.oneMinor.max },
        suitLengthRange: { C: { min: config.oneMinor.length, max: 13 }, D: { min: config.oneMinor.length, max: 13 } },
      },
      "2NT": {
        enabled: config.twoNt.enabled,
        pointRange: { min: config.twoNt.min, max: config.twoNt.max },
        suitLengthRange: { C: { min: 2, max: 5 }, D: { min: 2, max: 5 }, H: { min: 2, max: 5 }, S: { min: 2, max: 5 } },
        shape: "balanced",
      },
      strongOpening: {
        bid: config.strongOpening === "none" ? null : config.strongOpening,
        pointRange: config.strongOpening === "none" ? null : { min: config.strong.min, max: config.strong.max },
      },
      weakTwos: {
        enabled: config.weakTwos.enabled,
        suits: config.weakTwos.suits,
        pointRange: { min: config.weakTwos.min, max: config.weakTwos.max },
        suitLengthRange: { min: config.weakTwos.length, max: 13 },
      },
    };
  }

  function applyConfiguration(baseSystem, config) {
    const system = deepCopy(normalizeSystem(baseSystem));
    const opening = openingConvention(system);

    upsertRootNode(
      opening,
      "quick-1D",
      "1D",
      `Natural 1♦ opening: ${config.oneMinor.length}+ diamonds and ${config.oneMinor.min}–${config.oneMinor.max} aHCP.`,
      {
        minHcp: config.oneMinor.min,
        maxHcp: config.oneMinor.max,
        minSuit: { D: config.oneMinor.length },
        maxSuit: { D: 13 },
      }
    );
    const oneHeart = upsertRootNode(
      opening,
      "quick-1H",
      "1H",
      `Natural 1♥ opening: ${config.oneMajor.length}+ hearts and ${config.oneMajor.min}–${config.oneMajor.max} aHCP.`,
      {
        minHcp: config.oneMajor.min,
        maxHcp: config.oneMajor.max,
        minSuit: { H: config.oneMajor.length },
        maxSuit: { H: 13 },
      }
    );
    const oneSpade = upsertRootNode(
      opening,
      "quick-1S",
      "1S",
      `Natural 1♠ opening: ${config.oneMajor.length}+ spades and ${config.oneMajor.min}–${config.oneMajor.max} aHCP.`,
      {
        minHcp: config.oneMajor.min,
        maxHcp: config.oneMajor.max,
        minSuit: { S: config.oneMajor.length },
        maxSuit: { S: 13 },
      }
    );
    const oneNt = upsertRootNode(
      opening,
      "quick-1NT",
      "1NT",
      `Natural 1NT opening: balanced ${config.oneNt.min}–${config.oneNt.max} aHCP.`,
      { minHcp: config.oneNt.min, maxHcp: config.oneNt.max, maxSuit: { C: 5, D: 5, H: 5, S: 5 } }
    );
    if (config.twoNt.enabled) {
      upsertRootNode(
        opening,
        "quick-2NT",
        "2NT",
        `Natural 2NT opening: balanced ${config.twoNt.min}–${config.twoNt.max} aHCP.`,
        { minHcp: config.twoNt.min, maxHcp: config.twoNt.max, maxSuit: { C: 5, D: 5, H: 5, S: 5 } }
      );
    } else {
      removeRootNode(opening, "2NT");
    }

    if (config.strongOpening === "1C") {
      const oneClub = upsertRootNode(
        opening,
        "quick-strong-1C",
        "1C",
        `Artificial strong 1♣ opening: ${config.strong.min}+ aHCP (configured range ${config.strong.min}–${config.strong.max}).`,
        { minHcp: config.strong.min, maxHcp: config.strong.max }
      );
      oneClub.children = [];
      removeRootNode(opening, "2C");
    } else {
      upsertRootNode(
        opening,
        "quick-1C",
        "1C",
        `Natural 1♣ opening: ${config.oneMinor.length}+ clubs and ${config.oneMinor.min}–${config.oneMinor.max} aHCP.`,
        {
          minHcp: config.oneMinor.min,
          maxHcp: config.oneMinor.max,
          minSuit: { C: config.oneMinor.length },
          maxSuit: { C: 13 },
        }
      );
      if (config.strongOpening === "2C") {
        const twoClub = upsertRootNode(
          opening,
          "quick-strong-2C",
          "2C",
          `Artificial strong 2♣ opening: ${config.strong.min}+ aHCP (configured range ${config.strong.min}–${config.strong.max}).`,
          { minHcp: config.strong.min, maxHcp: config.strong.max }
        );
        twoClub.children = [];
      } else {
        removeRootNode(opening, "2C");
      }
    }

    ["2D", "2H", "2S"].forEach((trigger) => removeRootNode(opening, trigger));
    if (config.weakTwos.enabled) {
      config.weakTwos.suits.forEach((suit) => {
        upsertRootNode(
          opening,
          `quick-weak-2${suit}`,
          `2${suit}`,
          `Weak two in ${suit}: ${config.weakTwos.length}+ ${suit === "D" ? "diamonds" : suit === "H" ? "hearts" : "spades"} and ${config.weakTwos.min}–${config.weakTwos.max} aHCP.`,
          {
            minHcp: config.weakTwos.min,
            maxHcp: config.weakTwos.max,
            minSuit: { [suit]: config.weakTwos.length },
            maxSuit: { [suit]: 13 },
          }
        );
      });
    }

    setStayman(oneNt, config.conventions.stayman);
    setTransfers(oneNt, config.conventions.transfers);
    removeSplinters(oneHeart);
    removeSplinters(oneSpade);
    if (config.conventions.splinter) addSplinters(oneHeart, oneSpade);

    const group = conventionGroup(system);
    if (config.conventions.gerber) {
      group.children.push(node("quick-gerber-4C", "4C", "Gerber (4♣): ace ask in a notrump context.", { auctionRole: "contextual" }));
    }
    addSlamTool(group, config.conventions.slamTool);
    if (!group.children.length) system.conventions = system.conventions.filter((item) => item !== group);

    const timestamp = new Date().toISOString();
    const slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom-system";
    system.systemId = `custom-${slug}-${Date.now().toString(36)}`;
    system.systemName = config.name;
    system.description = `Customized opening profile based on ${baseSystem.systemName || config.baseSystemId}.`;
    system.notes = "Created with Quick Customization. Review and extend the convention tree before using it for a partnership.";
    system.openingProfile = openingProfileFromConfiguration(config);
    system.quickCustomization = { createdAt: timestamp, baseSystemId: config.baseSystemId, configuration: config };
    return system;
  }

  function updateWeakTwoControls() {
    const disabled = !ui.weakTwosEnabled.checked;
    ui.weakTwoControls.forEach((container) => {
      container.classList.toggle("is-disabled", disabled);
      container.querySelectorAll("input, select").forEach((control) => {
        control.disabled = disabled;
      });
    });
  }

  function updateTwoNtControls() {
    const disabled = !ui.twoNtEnabled.checked;
    ui.twoNtControls.forEach((container) => {
      container.classList.toggle("is-disabled", disabled);
      container.querySelectorAll("input").forEach((control) => {
        control.disabled = disabled;
      });
    });
  }

  function rememberActiveTree(system) {
    const serialized = JSON.stringify({ system, expandedNodes: [], expandedContexts: [] });
    try {
      window.sessionStorage.setItem(ACTIVE_TREE_STORAGE_KEY, serialized);
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(system));
    } catch (error) {
      console.warn("Unable to save the quick-customization tree", error);
    }
    try {
      document.cookie = `${ACTIVE_TREE_COOKIE}=${encodeURIComponent(system.systemId)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    } catch (error) {
      console.warn("Unable to save the active-tree cookie", error);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("");
    try {
      const config = readConfiguration();
      const baseSystem = await loadBaseSystem(config.baseSystemId);
      const customizedSystem = applyConfiguration(baseSystem, config);
      rememberActiveTree(customizedSystem);
      window.location.assign("systembuilder.html?draft=quick");
    } catch (error) {
      setStatus(error.message || "Unable to create the customized system.", true);
    }
  }

  async function bootstrap() {
    try {
      state.systems = await loadSystemIndex();
      if (!state.systems.length) throw new Error("No base systems were found.");
      populateBaseSystems();
      await selectBaseSystem();
    } catch (error) {
      setStatus(error.message || "Unable to load base systems.", true);
    }
    updateWeakTwoControls();
    updateTwoNtControls();
    ui.weakTwosEnabled.addEventListener("change", updateWeakTwoControls);
    ui.twoNtEnabled.addEventListener("change", updateTwoNtControls);
    ui.baseSystem.addEventListener("change", selectBaseSystem);
    ui.form.addEventListener("submit", onSubmit);
  }

  bootstrap();
})();
