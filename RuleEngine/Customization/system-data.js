window.BridgeSystemData = {
  "systems": [
    {
      "schemaVersion": "1.3",
      "systemId": "standard-natural",
      "systemName": "Standard Natural (Core)",
      "description": "Core SAYC-like natural baseline with compact control-point follow-ups. Useful as reference baseline for ACBL Basic chart.",
      "notes": "Bids are intentionally stored as transition trees that can be expanded in SystemBuilder.",
      "sequenceRules": [
        {
          "id": "natural-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "requiresAgreement": [
            "X"
          ],
          "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
          "priority": 120
        },
        {
          "id": "standard-natural-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one ace.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "blackwood",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "pass",
                "step": 1,
                "keycards": [
                  1
                ]
              }
            }
          }
        },
        {
          "id": "standard-natural-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or four aces.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "blackwood",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "double",
                "step": 2,
                "keycards": [
                  0,
                  4
                ]
              }
            }
          }
        }
      ],
      "conventions": [
        {
          "id": "opening-bids",
          "name": "Opening and responses",
          "children": [
            {
              "id": "o1C",
              "trigger": "1C",
              "meaning": "Natural 1♣: 12–21 aHCP and 3+ clubs (better-minor treatment).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "C": 3
                },
                "maxSuit": {
                  "C": 13
                }
              },
              "children": [
                {
                  "id": "o1C-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 points with balanced shape, often sign-off path.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 9,
                    "minSuit": {
                      "C": 2
                    }
                  },
                  "children": [
                    {
                      "id": "o1C-1NT-2H",
                      "trigger": "2H",
                      "meaning": "In some systems: correction with 5+ hearts and tolerance. Adapt as needed."
                    }
                  ]
                },
                {
                  "id": "o1C-2C",
                  "trigger": "2C",
                  "meaning": "Responder shows game interest, game-forcing tone in this baseline."
                },
                {
                  "id": "o1C-1D",
                  "trigger": "1D",
                  "meaning": "6-10+ cards and 5+ club hand shape support or minor improvement. Adjust as needed."
                },
                {
                  "id": "o1C-1H",
                  "trigger": "1H",
                  "meaning": "Any hand with 4+ hearts, not strong enough to force 2/1.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "o1D",
              "trigger": "1D",
              "meaning": "Natural 1♦: 12–21 aHCP and 3+ diamonds (better-minor treatment).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "D": 3
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "children": [
                {
                  "id": "o1D-1NT",
                  "trigger": "1NT",
                  "meaning": "10+ points, balanced, game values; often waiting/invitation style varies."
                },
                {
                  "id": "o1D-1H",
                  "trigger": "1H",
                  "meaning": "4+ hearts response."
                },
                {
                  "id": "o1D-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades response."
                },
                {
                  "id": "o1D-2D",
                  "trigger": "2D",
                  "meaning": "Weak support/raise sequence, not forcing unless convention-specific conditions."
                }
              ]
            },
            {
              "id": "o1H",
              "trigger": "1H",
              "meaning": "Natural 1♥: 12–21 aHCP and 5+ hearts.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
                }
              },
              "children": [
                {
                  "id": "o1H-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 point response, no 4-card spade support."
                },
                {
                  "id": "o1H-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades, game-forcing depends on partnership agreements."
                },
                {
                  "id": "o1H-2H",
                  "trigger": "2H",
                  "meaning": "10+ points or simple support."
                },
                {
                  "id": "o1H-2NT",
                  "trigger": "2NT",
                  "meaning": "Invite game in no-fit conditions."
                }
              ]
            },
            {
              "id": "o1S",
              "trigger": "1S",
              "meaning": "Natural 1♠: 12–21 aHCP and 5+ spades.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
                }
              },
              "children": [
                {
                  "id": "o1S-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 point response, weak/no-support pattern."
                },
                {
                  "id": "o1S-2S",
                  "trigger": "2S",
                  "meaning": "Support or better."
                },
                {
                  "id": "o1S-2NT",
                  "trigger": "2NT",
                  "meaning": "Game invitation."
                },
                {
                  "id": "o1S-2NTx",
                  "trigger": "3S",
                  "meaning": "Strong support/fit continuation."
                }
              ]
            },
            {
              "id": "o1NT",
              "trigger": "1NT",
              "meaning": "Natural 1NT: 15–17 aHCP, balanced (4333, 4432, or 5332), with no six-card suit.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 15,
                "maxHcp": 17,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "nt2C",
                  "trigger": "2C",
                  "meaning": "Stayman / major suit investigation.",
                  "children": [
                    {
                      "id": "nt2C-2D",
                      "trigger": "2D",
                      "meaning": "No 4-card major visible; return NT if confirmed."
                    },
                    {
                      "id": "nt2C-2H",
                      "trigger": "2H",
                      "meaning": "4+ hearts, no spade guarantee."
                    },
                    {
                      "id": "nt2C-2S",
                      "trigger": "2S",
                      "meaning": "4+ spades, no heart guarantee."
                    }
                  ],
                  "facts": {
                    "convention": {
                      "stayman": true
                    }
                  }
                },
                {
                  "id": "nt2D",
                  "trigger": "2D",
                  "meaning": "Transfer to hearts (if enabled in your structure)."
                },
                {
                  "id": "nt2H",
                  "trigger": "2H",
                  "meaning": "Transfer to spades (if enabled in your structure)."
                },
                {
                  "id": "nt3D",
                  "trigger": "3D",
                  "meaning": "Game support or minor-first hand."
                }
              ]
            },
            {
              "id": "std-2C",
              "trigger": "2C",
              "meaning": "Artificial strong 2♣: 22+ aHCP, any shape (or equivalent playing-trick strength).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 22,
                "maxHcp": 40
              },
              "children": []
            },
            {
              "id": "std-2NT",
              "trigger": "2NT",
              "meaning": "Natural 2NT: balanced 20–21 aHCP (4333, 4432, or 5332).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 20,
                "maxHcp": 21
              },
              "children": []
            },
            {
              "id": "std-weak-club-opening",
              "nodeType": "group",
              "label": "Weak club opening",
              "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "C",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "std-3C",
                  "trigger": "3C",
                  "meaning": "Preemptive 3C opening: 6–10 aHCP and a 7-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-club-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 7
                    },
                    "maxSuit": {
                      "C": 7
                    }
                  },
                  "children": []
                },
                {
                  "id": "std-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4C opening: 6–10 aHCP and a 8+-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-club-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 8
                    },
                    "maxSuit": {
                      "C": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "std-weak-diamond-opening",
              "nodeType": "group",
              "label": "Weak diamond opening",
              "meaning": "Parallel preemptive opening options in diamond: 2D, 3D, 4D. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "D",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "std-2D",
                  "trigger": "2D",
                  "meaning": "Weak two in D: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-diamond-opening"
                  }
                },
                {
                  "id": "std-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 6–10 aHCP and a 7-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 7
                    },
                    "maxSuit": {
                      "D": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "std-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 6–10 aHCP and a 8+-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 8
                    },
                    "maxSuit": {
                      "D": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "std-weak-heart-opening",
              "nodeType": "group",
              "label": "Weak heart opening",
              "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "H",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "std-2H",
                  "trigger": "2H",
                  "meaning": "Weak two in H: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-heart-opening"
                  }
                },
                {
                  "id": "std-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 6–10 aHCP and a 7-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 7
                    },
                    "maxSuit": {
                      "H": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "std-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 6–10 aHCP and a 8+-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 8
                    },
                    "maxSuit": {
                      "H": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "std-weak-spade-opening",
              "nodeType": "group",
              "label": "Weak spade opening",
              "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "S",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "std-2S",
                  "trigger": "2S",
                  "meaning": "Weak two in S: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-spade-opening"
                  }
                },
                {
                  "id": "std-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 6–10 aHCP and a 7-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 7
                    },
                    "maxSuit": {
                      "S": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "std-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 6–10 aHCP and a 8+-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "std-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 8
                    },
                    "maxSuit": {
                      "S": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "overcalls",
          "name": "Overcalls and competitive bids",
          "children": [
            {
              "id": "over-X",
              "trigger": "X",
              "meaning": "Double for penalty or takeout depending context. Resolve by system.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "over-XX",
              "trigger": "XX",
              "meaning": "Redouble: typically indicates value against a double.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "ov1C",
              "trigger": "1C",
              "meaning": "Natural overcall in clubs in competition.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "ov1D",
              "trigger": "1D",
              "meaning": "Natural overcall in diamonds in competition.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov1H",
              "trigger": "1H",
              "meaning": "Natural overcall in hearts in competition.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov1S",
              "trigger": "1S",
              "meaning": "Natural overcall in spades in competition.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov1NT",
              "trigger": "1NT",
              "meaning": "Natural overcall no-trump.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov2C",
              "trigger": "2C",
              "meaning": "Strong natural overcall in clubs or artificial if defined.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov2D",
              "trigger": "2D",
              "meaning": "Strong natural overcall in diamonds.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov2H",
              "trigger": "2H",
              "meaning": "Strong natural overcall in hearts.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "ov2S",
              "trigger": "2S",
              "meaning": "Strong natural overcall in spades.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            }
          ]
        }
      ],
      "openingProfile": {
        "1NT": {
          "pointRange": {
            "min": 15,
            "max": 17
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332; no six-card suit)"
        },
        "1Major": {
          "pointRange": {
            "min": 12,
            "max": 21
          },
          "suitLengthRange": {
            "H": {
              "min": 5,
              "max": 13
            },
            "S": {
              "min": 5,
              "max": 13
            }
          }
        },
        "1Minor": {
          "clubs": {
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          },
          "diamonds": {
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          }
        },
        "2NT": {
          "pointRange": {
            "min": 20,
            "max": 21
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332)",
          "enabled": true
        },
        "strongOpening": {
          "bid": "2C",
          "pointRange": {
            "min": 22,
            "max": 40
          }
        },
        "weakTwos": {
          "enabled": true,
          "suits": [
            "D",
            "H",
            "S"
          ],
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "suitLengthRange": {
            "min": 6,
            "max": 13
          }
        },
        "weakOpenings": {
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
          "ladders": [
            {
              "suit": "C",
              "levels": [
                3,
                4
              ],
              "minimumLength": 7
            },
            {
              "suit": "D",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "H",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "S",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            }
          ]
        }
      },
      "openingReference": {
        "source": "Standard teaching reference; partnership agreements may vary.",
        "summary": "Standard American-style natural base: five-card majors, 15–17 notrump, strong 2♣, and three weak twos.",
        "openings": [
          {
            "bid": "1♣",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 3+ clubs"
          },
          {
            "bid": "1♦",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 3+ diamonds"
          },
          {
            "bid": "1♥",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 5+ hearts"
          },
          {
            "bid": "1♠",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 5+ spades"
          },
          {
            "bid": "1NT",
            "pointRange": {
              "min": 15,
              "max": 17
            },
            "lengthLabel": "balanced: 4333, 4432, or 5332"
          },
          {
            "bid": "2♣",
            "pointRange": {
              "min": 22,
              "max": 40
            },
            "lengthLabel": "artificial strong; any shape"
          },
          {
            "bid": "2♦/2♥/2♠",
            "pointRange": {
              "min": 6,
              "max": 10
            },
            "lengthLabel": "weak two; exactly six cards (with 3/4-level preempt ladders also catalogued)"
          },
          {
            "bid": "2NT",
            "pointRange": {
              "min": 20,
              "max": 21
            },
            "lengthLabel": "balanced: 4333, 4432, or 5332"
          }
        ],
        "conventions": [
          {
            "label": "Stayman",
            "description": "2♣ after 1NT asks for a four-card major."
          },
          {
            "label": "Jacoby transfers",
            "description": "2♦ transfers to hearts; 2♥ transfers to spades after 1NT."
          },
          {
            "label": "Blackwood",
            "description": "4NT is an ace ask only after a suit has been agreed."
          }
        ]
      },
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.0",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.suit}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.0",
          "merge": "deep-patch"
        },
        "agreement": {
          "aceAsk": {
            "method": "blackwood",
            "interference": "D0P1",
            "d0p1": {
              "double": {
                "step": 1,
                "aces": [
                  0,
                  4
                ]
              },
              "pass": {
                "step": 2,
                "aces": [
                  1
                ]
              },
              "nextAvailable": [
                {
                  "step": 3,
                  "aces": [
                    2
                  ]
                },
                {
                  "step": 4,
                  "aces": [
                    3
                  ]
                }
              ]
            }
          }
        },
        "forcing": {
          "game": false,
          "round": false
        },
        "fit": {
          "confirmed": false
        }
      }
    },
    {
      "schemaVersion": "1.3",
      "systemId": "two-over-one",
      "systemName": "2/1 Game Forcing",
      "description": "A practical 2/1 Game Forcing map tuned for teaching and automation with explicit phase transitions.",
      "notes": "Conventions are modeled as bid-triggered transitions. Control-bidding nodes are represented by generated nodes that emit suit-control suggestions.",
      "sequenceRules": [
        {
          "id": "two-over-one-learned-sequence",
          "expression": "1X-2Y",
          "where": [
            "Y<X"
          ],
          "meaning": "2/1 game forcing: a non-jump two-level response in a new, lower-ranking suit.",
          "priority": 110
        },
        {
          "id": "two-over-one-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "requiresAgreement": [
            "X"
          ],
          "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
          "priority": 120
        },
        {
          "id": "two-over-one-facts-two-over-one-entry",
          "expression": "1M-2X",
          "where": [
            "X<M"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 game force: each partner has shown at least 12 points.",
          "priority": 940,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "partnership": {
              "points": {
                "opener": {
                  "min": 12
                },
                "responder": {
                  "min": 12
                },
                "combined": {
                  "min": 24
                }
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-two-over-one-major-fit",
          "expression": "1M-2X-2Y-#M",
          "where": [
            "X<M"
          ],
          "requiresAgreement": [
            "M"
          ],
          "meaning": "2/1 major fit confirmed: opener has five and responder has three or more.",
          "priority": 960,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{M}}",
              "openerLength": 5,
              "responderLength": 3,
              "combinedMinimum": 8
            },
            "partnership": {
              "points": {
                "opener": {
                  "min": 12
                },
                "responder": {
                  "min": 12
                },
                "combined": {
                  "min": 24
                }
              }
            }
          }
        },
        {
          "id": "two-over-one-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one or four key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "pass",
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              }
            }
          }
        },
        {
          "id": "two-over-one-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or three key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "double",
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              }
            }
          }
        }
      ],
      "conventions": [
        {
          "id": "opening",
          "name": "Opening and game-forcing follow-up",
          "children": [
            {
              "id": "o1C",
              "trigger": "1C",
              "meaning": "Natural 1♣: 12–21 aHCP and 3+ clubs (better-minor treatment).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "C": 3
                },
                "maxSuit": {
                  "C": 13
                }
              },
              "children": [
                {
                  "id": "o1C-1D",
                  "trigger": "1D",
                  "meaning": "Responder 4+ diamonds response (possibly weak-to-mid range).",
                  "children": [
                    {
                      "id": "o1C-1D-1NT",
                      "trigger": "1NT",
                      "meaning": "Light balanced hand (usually no game-forcing interest)."
                    },
                    {
                      "id": "o1C-1D-2D",
                      "trigger": "2D",
                      "meaning": "Strong response to a club opening; may be forcing depending on point count."
                    }
                  ]
                },
                {
                  "id": "o1C-1H",
                  "trigger": "1H",
                  "meaning": "4+ hearts, usually not strong."
                },
                {
                  "id": "o1C-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades, usually not forcing."
                },
                {
                  "id": "o1C-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural balanced response to a 1C opening."
                },
                {
                  "id": "o1C-2C",
                  "trigger": "2C",
                  "meaning": "Club raise or strong natural support; it is not a 2/1 game-force response because it is not a new lower-ranking suit.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "o1D",
              "trigger": "1D",
              "meaning": "Natural 1♦: 12–21 aHCP and 3+ diamonds (better-minor treatment).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "D": 3
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "children": [
                {
                  "id": "o1D-1H",
                  "trigger": "1H",
                  "meaning": "4+ hearts."
                },
                {
                  "id": "o1D-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades."
                },
                {
                  "id": "o1D-1NT",
                  "trigger": "1NT",
                  "meaning": "Balanced hand, non-forcing in many partnerships."
                },
                {
                  "id": "o1D-2D",
                  "trigger": "2D",
                  "meaning": "Diamond raise or support sequence; it is not a 2/1 game-force response.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "D",
                    "suits": [
                      "C",
                      "H",
                      "S"
                    ],
                    "startLevel": 4,
                    "description": "Control-bid phase in diamond context (skip a suit if control is missing)."
                  },
                  "children": [
                    {
                      "id": "o1D-2D-3C",
                      "trigger": "3C",
                      "meaning": "Feature suit rebid in diamonds context.",
                      "children": [
                        {
                          "id": "o1D-2D-3C-4NT",
                          "trigger": "4NT",
                          "meaning": "Key-card query. Respond in 5C/5D/5H/5S or as your partnership variant."
                        }
                      ]
                    },
                    {
                      "id": "o1D-2D-4NT",
                      "trigger": "4NT",
                      "meaning": "Ace/king check path after control or pre-control sequence."
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1D-2C-21",
                  "trigger": "2C",
                  "children": [],
                  "meaning": "2/1 game force in clubs: after an uncontested 1♦ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "o1H",
              "trigger": "1H",
              "meaning": "Natural 1♥: 12–21 aHCP and 5+ hearts.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
                }
              },
              "children": [
                {
                  "id": "o1H-1NT",
                  "trigger": "1NT",
                  "meaning": "6–9 aHCP, no 4-card spade support."
                },
                {
                  "id": "o1H-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades; response not usually forcing."
                },
                {
                  "id": "o1H-2H",
                  "trigger": "2H",
                  "meaning": "Heart raise or support sequence; it is not a 2/1 game-force response.",
                  "children": [
                    {
                      "id": "o1H-2H-2NT",
                      "trigger": "2NT",
                      "meaning": "In-between hand with no sure game force.",
                      "facts": {
                        "forcing": {
                          "game": true,
                          "source": "system agreement"
                        }
                      }
                    },
                    {
                      "id": "o1H-2H-3H",
                      "trigger": "3H",
                      "meaning": "Game-forcing continuation where control-phase can start for heart fit bidding.",
                      "generated": {
                        "type": "control-bids",
                        "agreedSuit": "H",
                        "suits": [
                          "C",
                          "D",
                          "S"
                        ],
                        "startLevel": 4,
                        "description": "Use control bids in any unagreed suit: cheapest at current control level, next control levels as needed."
                      },
                      "children": [
                        {
                          "id": "o1H-2H-3H-4NT",
                          "trigger": "4NT",
                          "meaning": "Ace/king control check after at least one control attempt."
                        }
                      ]
                    },
                    {
                      "id": "o1H-2H-3S",
                      "trigger": "3S",
                      "meaning": "New suit forcing to 3H phase; often shows slam interest."
                    },
                    {
                      "id": "o1H-2H-4H",
                      "trigger": "4H",
                      "meaning": "Strong slam-leaning continuation."
                    },
                    {
                      "id": "o1H-2H-3NT",
                      "trigger": "3NT",
                      "meaning": "Sign-off/no further force path."
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1H-2C",
                  "trigger": "2C",
                  "meaning": "2/1 game force in clubs: after an uncontested 1♥ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1H-2D-21",
                  "trigger": "2D",
                  "children": [],
                  "meaning": "2/1 game force in diamonds: after an uncontested 1♥ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "o1S",
              "trigger": "1S",
              "meaning": "Natural 1♠: 12+ points and 5+ spades (normally 12–21 aHCP).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
                }
              },
              "children": [
                {
                  "id": "o1S-1NT",
                  "trigger": "1NT",
                  "meaning": "6–9 aHCP, no heart support."
                },
                {
                  "id": "o1S-2S",
                  "trigger": "2S",
                  "meaning": "Spade raise or support sequence; it is not a 2/1 game-force response.",
                  "children": [
                    {
                      "id": "o1S-2S-2NT",
                      "trigger": "2NT",
                      "meaning": "Minimum game-forcing-invitation variation."
                    },
                    {
                      "id": "o1S-2S-3S",
                      "trigger": "3S",
                      "meaning": "Control phase candidate and fit-oriented continuation.",
                      "generated": {
                        "type": "control-bids",
                        "agreedSuit": "S",
                        "suits": [
                          "C",
                          "D",
                          "H"
                        ],
                        "startLevel": 4,
                        "description": "Use control bidding in 4th suit and beyond after agreed spade fit."
                      },
                      "children": [
                        {
                          "id": "o1S-2S-3S-4NT",
                          "trigger": "4NT",
                          "meaning": "RKCB or 4NT ace-ask family.",
                          "facts": {
                            "convention": {
                              "rkcb": true
                            },
                            "slam": {
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430",
                                "interference": "D0P1",
                                "accelerated": false,
                                "type": "keycard"
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "o1S-2S-3C",
                      "trigger": "3C",
                      "meaning": "Minor-suit game try / feature."
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1S-2C",
                  "trigger": "2C",
                  "meaning": "2/1 game force in clubs: after an uncontested 1♠ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1S-2D-21",
                  "trigger": "2D",
                  "children": [],
                  "meaning": "2/1 game force in diamonds: after an uncontested 1♠ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "o1S-2H-21",
                  "trigger": "2H",
                  "children": [],
                  "meaning": "2/1 game force in hearts: after an uncontested 1♠ opening, this non-jump new-suit response has highest priority when eligible.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "o1NT",
              "trigger": "1NT",
              "meaning": "Natural 1NT: 15–17 aHCP, balanced (4333, 4432, or 5332), with no six-card suit.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 15,
                "maxHcp": 17,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "nt2C",
                  "trigger": "2C",
                  "meaning": "Stayman.",
                  "facts": {
                    "convention": {
                      "stayman": true
                    }
                  }
                },
                {
                  "id": "nt2C-2D",
                  "trigger": "2D",
                  "meaning": "No 4-card major."
                },
                {
                  "id": "nt2C-2H",
                  "trigger": "2H",
                  "meaning": "Show 4+ hearts."
                },
                {
                  "id": "nt2C-2S",
                  "trigger": "2S",
                  "meaning": "Show 4+ spades."
                },
                {
                  "id": "nt2D",
                  "trigger": "2D",
                  "meaning": "Transfer to hearts (if partnership uses transfer structure)."
                },
                {
                  "id": "nt2H",
                  "trigger": "2H",
                  "meaning": "Transfer to spades (if partnership uses transfer structure)."
                }
              ]
            },
            {
              "id": "twoone-2C",
              "trigger": "2C",
              "meaning": "Artificial strong 2♣: 22+ aHCP, any shape (or equivalent playing-trick strength).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 22,
                "maxHcp": 40
              },
              "children": []
            },
            {
              "id": "twoone-2NT",
              "trigger": "2NT",
              "meaning": "Natural 2NT: balanced 20–21 aHCP (4333, 4432, or 5332).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 20,
                "maxHcp": 21
              },
              "children": []
            },
            {
              "id": "twoone-weak-club-opening",
              "nodeType": "group",
              "label": "Weak club opening",
              "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "C",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "twoone-3C",
                  "trigger": "3C",
                  "meaning": "Preemptive 3C opening: 6–10 aHCP and a 7-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-club-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 7
                    },
                    "maxSuit": {
                      "C": 7
                    }
                  },
                  "children": []
                },
                {
                  "id": "twoone-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4C opening: 6–10 aHCP and a 8+-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-club-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 8
                    },
                    "maxSuit": {
                      "C": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "twoone-weak-diamond-opening",
              "nodeType": "group",
              "label": "Weak diamond opening",
              "meaning": "Parallel preemptive opening options in diamond: 2D, 3D, 4D. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "D",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "twoone-2D",
                  "trigger": "2D",
                  "meaning": "Weak two in D: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-diamond-opening"
                  }
                },
                {
                  "id": "twoone-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 6–10 aHCP and a 7-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 7
                    },
                    "maxSuit": {
                      "D": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "twoone-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 6–10 aHCP and a 8+-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 8
                    },
                    "maxSuit": {
                      "D": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "twoone-weak-heart-opening",
              "nodeType": "group",
              "label": "Weak heart opening",
              "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "H",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "twoone-2H",
                  "trigger": "2H",
                  "meaning": "Weak two in H: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-heart-opening"
                  }
                },
                {
                  "id": "twoone-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 6–10 aHCP and a 7-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 7
                    },
                    "maxSuit": {
                      "H": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "twoone-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 6–10 aHCP and a 8+-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 8
                    },
                    "maxSuit": {
                      "H": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "twoone-weak-spade-opening",
              "nodeType": "group",
              "label": "Weak spade opening",
              "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "S",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "twoone-2S",
                  "trigger": "2S",
                  "meaning": "Weak two in S: 6–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 6
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-spade-opening"
                  }
                },
                {
                  "id": "twoone-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 6–10 aHCP and a 7-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 7
                    },
                    "maxSuit": {
                      "S": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "twoone-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 6–10 aHCP and a 8+-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "twoone-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 8
                    },
                    "maxSuit": {
                      "S": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "slam",
          "name": "Slam tools",
          "children": [
            {
              "id": "rkcb-4nt",
              "trigger": "4NT",
              "meaning": "Roman Key Card/Blackwood query after agreed suit context.",
              "children": [
                {
                  "id": "rkcb-5C",
                  "trigger": "5C",
                  "meaning": "1 or 4 key cards (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5C",
                        "keycards": [
                          0,
                          3
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "rkcb-5D",
                  "trigger": "5D",
                  "meaning": "0 or 3 key cards (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          1,
                          4
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "rkcb-5H",
                  "trigger": "5H",
                  "meaning": "2 key cards without the trump queen (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2,
                          5
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "rkcb-5S",
                  "trigger": "5S",
                  "meaning": "2 key cards with the trump queen (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      }
                    }
                  }
                },
                {
                  "id": "rkcb-5NT",
                  "trigger": "5NT",
                  "meaning": "King/queen inquiry for grand-slam attempts.",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            }
          ]
        },
        {
          "id": "competition",
          "name": "Competitive structure",
          "children": [
            {
              "id": "cDBL",
              "trigger": "X",
              "meaning": "Takeout/penalty double context-dependent.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "cXX",
              "trigger": "XX",
              "meaning": "Redouble for re-penalty or extra strength.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "oc1C",
              "trigger": "1C",
              "meaning": "Natural one club overcall.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "oc1D",
              "trigger": "1D",
              "meaning": "Natural one diamond overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "oc1H",
              "trigger": "1H",
              "meaning": "Natural one heart overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "oc1S",
              "trigger": "1S",
              "meaning": "Natural one spade overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            }
          ]
        }
      ],
      "openingProfile": {
        "1NT": {
          "pointRange": {
            "min": 15,
            "max": 17
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332; no six-card suit)"
        },
        "1Major": {
          "pointRange": {
            "min": 12,
            "max": 21
          },
          "suitLengthRange": {
            "H": {
              "min": 5,
              "max": 13
            },
            "S": {
              "min": 5,
              "max": 13
            }
          }
        },
        "1Minor": {
          "clubs": {
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          },
          "diamonds": {
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          }
        },
        "2NT": {
          "pointRange": {
            "min": 20,
            "max": 21
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332)",
          "enabled": true
        },
        "strongOpening": {
          "bid": "2C",
          "pointRange": {
            "min": 22,
            "max": 40
          }
        },
        "weakTwos": {
          "enabled": true,
          "suits": [
            "D",
            "H",
            "S"
          ],
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "suitLengthRange": {
            "min": 6,
            "max": 13
          }
        },
        "weakOpenings": {
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
          "ladders": [
            {
              "suit": "C",
              "levels": [
                3,
                4
              ],
              "minimumLength": 7
            },
            {
              "suit": "D",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "H",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "S",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            }
          ]
        }
      },
      "openingReference": {
        "source": "Standard teaching reference; partnership agreements may vary.",
        "summary": "Modern 2/1 Game Forcing base: five-card majors, 15–17 notrump, strong 2♣, and three weak twos.",
        "openings": [
          {
            "bid": "1♣",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 3+ clubs"
          },
          {
            "bid": "1♦",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 3+ diamonds"
          },
          {
            "bid": "1♥",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 5+ hearts"
          },
          {
            "bid": "1♠",
            "pointRange": {
              "min": 12,
              "max": 21
            },
            "lengthLabel": "natural; 5+ spades"
          },
          {
            "bid": "1NT",
            "pointRange": {
              "min": 15,
              "max": 17
            },
            "lengthLabel": "balanced: 4333, 4432, or 5332"
          },
          {
            "bid": "2♣",
            "pointRange": {
              "min": 22,
              "max": 40
            },
            "lengthLabel": "artificial strong; any shape"
          },
          {
            "bid": "2♦/2♥/2♠",
            "pointRange": {
              "min": 6,
              "max": 10
            },
            "lengthLabel": "weak two; exactly six cards (with 3/4-level preempt ladders also catalogued)"
          },
          {
            "bid": "2NT",
            "pointRange": {
              "min": 20,
              "max": 21
            },
            "lengthLabel": "balanced: 4333, 4432, or 5332"
          }
        ],
        "conventions": [
          {
            "label": "2/1 game force",
            "description": "After an uncontested 1♦, 1♥, or 1♠ opening: 1♦–2♣; 1♥–2♣/2♦; 1♠–2♣/2♦/2♥. The response is a non-jump new suit and commits the partnership to game."
          },
          {
            "label": "Forcing 1NT",
            "description": "The 1NT response to a major opening is forcing for one round in the base structure."
          },
          {
            "label": "Stayman and transfers",
            "description": "Use 2♣ Stayman and 2♦/2♥ Jacoby transfers after 1NT."
          }
        ]
      },
      "priorityPolicy": {
        "rule": "2/1 game force is highest priority only for an uncontested non-jump new-suit response at the two level that is lower ranking than the opening suit.",
        "eligiblePaths": [
          "1D-2C",
          "1H-2C",
          "1H-2D",
          "1S-2C",
          "1S-2D",
          "1S-2H"
        ],
        "excludedExamples": [
          "1H-2S",
          "1H-2H",
          "1S-2S",
          "1D-2D"
        ]
      },
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.0",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.suit}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.0",
          "merge": "deep-patch"
        },
        "agreement": {
          "aceAsk": {
            "method": "rkcb-1430",
            "interference": "D0P1",
            "d0p1": {
              "pass": {
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              },
              "double": {
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              },
              "nextAvailable": [
                {
                  "step": 3,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": false
                },
                {
                  "step": 4,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": true
                }
              ]
            }
          }
        },
        "forcing": {
          "game": false,
          "round": false
        },
        "fit": {
          "confirmed": false
        }
      }
    },
    {
      "schemaVersion": "1.3",
      "systemId": "precision-1c",
      "systemName": "1C Precision (Core)",
      "description": "Precision framework with 1C as artificial strong opening and 2/1-like continuation branches.",
      "notes": "Used as a digitalizable baseline; feel free to edit all follow-up nodes in SystemBuilder.",
      "sequenceRules": [
        {
          "id": "precision-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "requiresAgreement": [
            "X"
          ],
          "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
          "priority": 120
        },
        {
          "id": "precision-1c-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one or four key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "pass",
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              }
            }
          }
        },
        {
          "id": "precision-1c-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or three key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "double",
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              }
            }
          }
        }
      ],
      "conventions": [
        {
          "id": "precision-opening",
          "name": "Precision openings",
          "children": [
            {
              "id": "p1C",
              "trigger": "1C",
              "meaning": "Precision 1♣: artificial, forcing, 16+ aHCP; any shape.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 16,
                "maxHcp": 40,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "p1C-1D",
                  "trigger": "1D",
                  "meaning": "Artificial/semantically overloaded response (can be weak jump-relief in many variants).",
                  "facts": {
                    "convention": {
                      "weakJump": true
                    }
                  }
                },
                {
                  "id": "p1C-1H",
                  "trigger": "1H",
                  "meaning": "12+ with five-card heart fit or strong 4+ suit response pattern."
                },
                {
                  "id": "p1C-1S",
                  "trigger": "1S",
                  "meaning": "12+ with five-card spade fit or strong 4+ suit response pattern."
                },
                {
                  "id": "p1C-1NT",
                  "trigger": "1NT",
                  "meaning": "Balanced 10-12, support, or waiting style by partnership agreement."
                },
                {
                  "id": "p1C-2C",
                  "trigger": "2C",
                  "meaning": "Artificial responder inquiry into opener shape.",
                  "children": [
                    {
                      "id": "p1C-2C-2D",
                      "trigger": "2D",
                      "meaning": "Opener's rebid structure in diamonds."
                    },
                    {
                      "id": "p1C-2C-2H",
                      "trigger": "2H",
                      "meaning": "Transfer or positive response to possible spade/heart orientation."
                    },
                    {
                      "id": "p1C-2C-2S",
                      "trigger": "2S",
                      "meaning": "Responder shows major-suit emphasis after 2C."
                    },
                    {
                      "id": "p1C-2C-2NT",
                      "trigger": "2NT",
                      "meaning": "Natural 12+ balanced path from 1C structures."
                    }
                  ]
                }
              ]
            },
            {
              "id": "p1D",
              "trigger": "1D",
              "meaning": "Precision 1♦: 11–15 aHCP and 2+ diamonds; may be a short diamond in a balanced limited hand.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 11,
                "maxHcp": 15,
                "minSuit": {
                  "D": 2
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "children": [
                {
                  "id": "p1D-1H",
                  "trigger": "1H",
                  "meaning": "4+ heart support."
                },
                {
                  "id": "p1D-1S",
                  "trigger": "1S",
                  "meaning": "4+ spade support."
                },
                {
                  "id": "p1D-2D",
                  "trigger": "2D",
                  "meaning": "New-suit game forcing in 2/1 context.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "D",
                    "suits": [
                      "C",
                      "H",
                      "S"
                    ],
                    "startLevel": 3,
                    "description": "Use control bids to show shortness and support in non-diamond suits."
                  },
                  "children": [
                    {
                      "id": "p1D-2D-4NT",
                      "trigger": "4NT",
                      "meaning": "Control-structure-based ace ask.",
                      "facts": {
                        "slam": {
                          "aceAsk": {
                            "active": true,
                            "method": "rkcb-1430",
                            "interference": "D0P1",
                            "accelerated": false,
                            "type": "keycard"
                          }
                        }
                      }
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "p1D-2NT",
                  "trigger": "2NT",
                  "meaning": "Not-forcing invitation hand."
                }
              ]
            },
            {
              "id": "p1H",
              "trigger": "1H",
              "meaning": "Precision 1♥: 11–15 aHCP and 5+ hearts.",
              "children": [
                {
                  "id": "p1H-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 aHCP response range, no spade support."
                },
                {
                  "id": "p1H-2H-cbf",
                  "trigger": "2H",
                  "meaning": "Game-forcing support / 2/1 continuation.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "p1H-2S",
                  "trigger": "2S",
                  "meaning": "4+ spade second suit."
                },
                {
                  "id": "p1H-3H",
                  "trigger": "3H",
                  "meaning": "Control phase for heart fit.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "H",
                    "suits": [
                      "C",
                      "D",
                      "S"
                    ],
                    "startLevel": 4,
                    "description": "Elimination control phase: play highest available first-round control in unbid suits."
                  }
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 11,
                "maxHcp": 15,
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
                }
              }
            },
            {
              "id": "p1S",
              "trigger": "1S",
              "meaning": "Precision 1♠: 11–15 aHCP and 5+ spades.",
              "children": [
                {
                  "id": "p1S-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 aHCP response, no hearts."
                },
                {
                  "id": "p1S-2S",
                  "trigger": "2S",
                  "meaning": "Game-forcing support / 2/1 continuation.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "p1S-2S-cb",
                  "trigger": "3S",
                  "meaning": "3S as control phase anchor for spade fits.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "S",
                    "suits": [
                      "C",
                      "D",
                      "H"
                    ],
                    "startLevel": 4,
                    "description": "Slam control continuation after spade fit."
                  },
                  "children": [
                    {
                      "id": "p1S-2S-cb-4NT",
                      "trigger": "4NT",
                      "meaning": "Key card inquiry (RKCB/Blackwood branch).",
                      "facts": {
                        "convention": {
                          "blackwood": true,
                          "rkcb": true
                        },
                        "slam": {
                          "aceAsk": {
                            "active": true,
                            "method": "rkcb-1430",
                            "interference": "D0P1",
                            "accelerated": false,
                            "type": "keycard"
                          }
                        }
                      }
                    },
                    {
                      "id": "p1S-2S-cb-5NT",
                      "trigger": "5NT",
                      "meaning": "Grand-slam inquiry."
                    }
                  ]
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 11,
                "maxHcp": 15,
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
                }
              }
            },
            {
              "id": "p1NT",
              "trigger": "1NT",
              "meaning": "Precision 1NT: 13–15 aHCP, balanced, normally without a five-card major.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 13,
                "maxHcp": 15,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "p1NT-2C",
                  "trigger": "2C",
                  "meaning": "Stayman.",
                  "facts": {
                    "convention": {
                      "stayman": true
                    }
                  }
                },
                {
                  "id": "p1NT-2D",
                  "trigger": "2D",
                  "meaning": "Stayman minor check or feature request depending partnership notes.",
                  "facts": {
                    "convention": {
                      "stayman": true
                    }
                  }
                },
                {
                  "id": "p1NT-2D-2H",
                  "trigger": "2H",
                  "meaning": "Transfer-to-hearts."
                },
                {
                  "id": "p1NT-2D-2S",
                  "trigger": "2S",
                  "meaning": "Transfer-to-spades."
                }
              ]
            },
            {
              "id": "precision-2C",
              "trigger": "2C",
              "meaning": "Precision 2♣: 11–15 aHCP and 6+ clubs (a partnership may use a five-card club variant with a four-card major).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 11,
                "maxHcp": 15,
                "minSuit": {
                  "C": 6
                },
                "maxSuit": {
                  "C": 13
                }
              },
              "children": []
            },
            {
              "id": "precision-2D",
              "trigger": "2D",
              "meaning": "Precision 2♦: artificial shape bid in this base; 11–15 aHCP, with the exact distribution defined by partnership agreement.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 11,
                "maxHcp": 15
              },
              "children": []
            },
            {
              "id": "precision-weak-club-opening",
              "nodeType": "group",
              "label": "Weak club opening",
              "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "C",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "precision-3C",
                  "trigger": "3C",
                  "meaning": "Preemptive 3C opening: 5–10 aHCP and a 7-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-club-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 7
                    },
                    "maxSuit": {
                      "C": 7
                    }
                  },
                  "children": []
                },
                {
                  "id": "precision-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4C opening: 5–10 aHCP and a 8+-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-club-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 8
                    },
                    "maxSuit": {
                      "C": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "precision-weak-diamond-opening",
              "nodeType": "group",
              "label": "Weak diamond opening",
              "meaning": "Parallel preemptive opening options in diamond: 3D, 4D. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "D",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "precision-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 5–10 aHCP and a 7-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-diamond-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 7
                    },
                    "maxSuit": {
                      "D": 7
                    }
                  },
                  "children": []
                },
                {
                  "id": "precision-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 5–10 aHCP and a 8+-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 8
                    },
                    "maxSuit": {
                      "D": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "precision-weak-heart-opening",
              "nodeType": "group",
              "label": "Weak heart opening",
              "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "H",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "precision-2H",
                  "trigger": "2H",
                  "meaning": "Precision weak 2H: 5–10 aHCP and a sound six-card major.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-heart-opening"
                  }
                },
                {
                  "id": "precision-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 5–10 aHCP and a 7-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 7
                    },
                    "maxSuit": {
                      "H": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "precision-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 5–10 aHCP and a 8+-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 8
                    },
                    "maxSuit": {
                      "H": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "precision-weak-spade-opening",
              "nodeType": "group",
              "label": "Weak spade opening",
              "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "S",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "precision-2S",
                  "trigger": "2S",
                  "meaning": "Precision weak 2S: 5–10 aHCP and a sound six-card major.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-spade-opening"
                  }
                },
                {
                  "id": "precision-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 5–10 aHCP and a 7-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 7
                    },
                    "maxSuit": {
                      "S": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "precision-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 5–10 aHCP and a 8+-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "precision-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 8
                    },
                    "maxSuit": {
                      "S": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "precision-auxiliary",
          "name": "Slam and control tools",
          "children": [
            {
              "id": "prkcb",
              "trigger": "4NT",
              "meaning": "RKC/Blackwood request.",
              "children": [
                {
                  "id": "prkcb-5C",
                  "trigger": "5C",
                  "meaning": "1 or 4 key cards (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5C",
                        "keycards": [
                          0,
                          3
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "prkcb-5D",
                  "trigger": "5D",
                  "meaning": "0 or 3 key cards (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          1,
                          4
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "prkcb-5H",
                  "trigger": "5H",
                  "meaning": "2 key cards without the trump queen (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2,
                          5
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "prkcb-5S",
                  "trigger": "5S",
                  "meaning": "2 key cards with the trump queen (RKCB 1430).",
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            },
            {
              "id": "p5nt",
              "trigger": "5NT",
              "meaning": "King/queen inquiry after an affirmative RKCB context.",
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            },
            {
              "id": "pgerber",
              "trigger": "3C",
              "meaning": "Gerber-like ace ask path (used in some Precision agreements).",
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "gerber": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            }
          ]
        },
        {
          "id": "precision-overcalls",
          "name": "Competitive openings",
          "children": [
            {
              "id": "pX",
              "trigger": "X",
              "meaning": "Takeout/penalty double (context dependent).",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "pXX",
              "trigger": "XX",
              "meaning": "Redouble.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "poc1C",
              "trigger": "1C",
              "meaning": "Natural 1C overcall or convention agreement.",
              "filters": {
                "auctionRole": "contextual"
              }
            }
          ]
        }
      ],
      "openingProfile": {
        "1NT": {
          "pointRange": {
            "min": 13,
            "max": 15
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332; no six-card suit)"
        },
        "1Major": {
          "pointRange": {
            "min": 11,
            "max": 15
          },
          "suitLengthRange": {
            "H": {
              "min": 5,
              "max": 13
            },
            "S": {
              "min": 5,
              "max": 13
            }
          }
        },
        "1Minor": {
          "clubs": {
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "suitLengthRange": {
              "min": 2,
              "max": 13
            }
          },
          "diamonds": {
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "suitLengthRange": {
              "min": 2,
              "max": 13
            }
          }
        },
        "2NT": {
          "pointRange": null,
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "not used; strong balanced hands open 1C",
          "enabled": false
        },
        "strongOpening": {
          "bid": "1C",
          "pointRange": {
            "min": 16,
            "max": 40
          }
        },
        "weakTwos": {
          "enabled": true,
          "suits": [
            "H",
            "S"
          ],
          "pointRange": {
            "min": 5,
            "max": 10
          },
          "suitLengthRange": {
            "min": 6,
            "max": 13
          }
        },
        "weakOpenings": {
          "pointRange": {
            "min": 5,
            "max": 10
          },
          "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
          "ladders": [
            {
              "suit": "C",
              "levels": [
                3,
                4
              ],
              "minimumLength": 7
            },
            {
              "suit": "D",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "H",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "S",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            }
          ]
        }
      },
      "openingReference": {
        "source": "Standard teaching reference; partnership agreements may vary.",
        "summary": "Classic Precision Club base: artificial 16+ 1♣, limited natural openings, and weak twos in the majors.",
        "openings": [
          {
            "bid": "1♣",
            "pointRange": {
              "min": 16,
              "max": 40
            },
            "lengthLabel": "artificial strong; any shape"
          },
          {
            "bid": "1♦",
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "lengthLabel": "limited natural/short diamond; 2+ diamonds"
          },
          {
            "bid": "1♥",
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "lengthLabel": "natural; 5+ hearts"
          },
          {
            "bid": "1♠",
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "lengthLabel": "natural; 5+ spades"
          },
          {
            "bid": "1NT",
            "pointRange": {
              "min": 13,
              "max": 15
            },
            "lengthLabel": "balanced; normally no five-card major"
          },
          {
            "bid": "2♣",
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "lengthLabel": "natural; 6+ clubs or partnership variant"
          },
          {
            "bid": "2♦",
            "pointRange": {
              "min": 11,
              "max": 15
            },
            "lengthLabel": "artificial Multi-style/shape bid; partnership-defined"
          },
          {
            "bid": "2♥/2♠",
            "pointRange": {
              "min": 5,
              "max": 10
            },
            "lengthLabel": "weak two; sound six-card major"
          },
          {
            "bid": "2NT",
            "pointRange": null,
            "lengthLabel": "not used as a natural opening; strong balanced hands start with 1♣"
          }
        ],
        "conventions": [
          {
            "label": "Strong 1♣",
            "description": "Artificial and forcing, showing 16+ aHCP regardless of shape."
          },
          {
            "label": "Limited one-level openings",
            "description": "All non-1♣ one-level openings are limited to 11–15 aHCP in this reference."
          },
          {
            "label": "Weak major twos",
            "description": "2♥ and 2♠ are 5–10 aHCP with a sound six-card major; 2♦ is reserved for the selected artificial structure."
          }
        ]
      },
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.0",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.suit}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.0",
          "merge": "deep-patch"
        },
        "agreement": {
          "aceAsk": {
            "method": "rkcb-1430",
            "interference": "D0P1",
            "d0p1": {
              "pass": {
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              },
              "double": {
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              },
              "nextAvailable": [
                {
                  "step": 3,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": false
                },
                {
                  "step": 4,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": true
                }
              ]
            }
          }
        },
        "forcing": {
          "game": false,
          "round": false
        },
        "fit": {
          "confirmed": false
        }
      }
    },
    {
      "schemaVersion": "1.3",
      "systemId": "acol",
      "systemName": "ACOL (classic)",
      "description": "ACOL-style profile with weak club treatment, natural majors, and structured game-forcing responses.",
      "notes": "This file is a compact digital baseline and is intentionally editable via SystemBuilder.",
      "sequenceRules": [
        {
          "id": "acol-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "requiresAgreement": [
            "X"
          ],
          "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
          "priority": 120
        },
        {
          "id": "acol-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one ace.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "blackwood",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "pass",
                "step": 1,
                "keycards": [
                  1
                ]
              }
            }
          }
        },
        {
          "id": "acol-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or four aces.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "blackwood",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "double",
                "step": 2,
                "keycards": [
                  0,
                  4
                ]
              }
            }
          }
        }
      ],
      "conventions": [
        {
          "id": "acol-opening",
          "name": "Opening methods",
          "children": [
            {
              "id": "acol1C",
              "trigger": "1C",
              "meaning": "Natural Acol 1♣: 12–19 aHCP and 3+ clubs.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 19,
                "minSuit": {
                  "C": 3
                },
                "maxSuit": {
                  "C": 13
                }
              },
              "children": [
                {
                  "id": "acol1C-1D",
                  "trigger": "1D",
                  "meaning": "Responder natural 4+ diamonds."
                },
                {
                  "id": "acol1C-1H",
                  "trigger": "1H",
                  "meaning": "Natural 1H response."
                },
                {
                  "id": "acol1C-1S",
                  "trigger": "1S",
                  "meaning": "Natural 1S response."
                },
                {
                  "id": "acol1C-1NT",
                  "trigger": "1NT",
                  "meaning": "No major fit response/limp style."
                },
                {
                  "id": "acol1C-2C",
                  "trigger": "2C",
                  "meaning": "Game-forcing probe to a weak 1C opener."
                },
                {
                  "id": "acol1C-2D",
                  "trigger": "2D",
                  "meaning": "Control-oriented route for strong minor fit support."
                }
              ]
            },
            {
              "id": "acol1D",
              "trigger": "1D",
              "meaning": "Natural Acol 1♦: 12–19 aHCP and 4+ diamonds.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 19,
                "minSuit": {
                  "D": 4
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "children": [
                {
                  "id": "acol1D-2D",
                  "trigger": "2D",
                  "meaning": "2/1 game-forcing response.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "acol1D-1NT",
                  "trigger": "1NT",
                  "meaning": "Balanced no-ruff, non-forcing."
                },
                {
                  "id": "acol1D-1H",
                  "trigger": "1H",
                  "meaning": "4+ hearts."
                },
                {
                  "id": "acol1D-1S",
                  "trigger": "1S",
                  "meaning": "4+ spades."
                },
                {
                  "id": "acol1D-2NT",
                  "trigger": "2NT",
                  "meaning": "Invitation to notrump in no-fit contexts."
                }
              ]
            },
            {
              "id": "acol1H",
              "trigger": "1H",
              "meaning": "Natural Acol 1♥: 12–19 aHCP and 4+ hearts.",
              "children": [
                {
                  "id": "acol1H-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 pt continuation."
                },
                {
                  "id": "acol1H-2H",
                  "trigger": "2H",
                  "meaning": "2/1 game-forcing response.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "acol1H-2H-cb",
                  "trigger": "2S",
                  "meaning": "4+ spade new suit in game-forcing track."
                },
                {
                  "id": "acol1H-2H-bf",
                  "trigger": "2NT",
                  "meaning": "Slam-inclined invitation with game force uncertain.",
                  "facts": {
                    "forcing": {
                      "game": true,
                      "source": "system agreement"
                    }
                  }
                },
                {
                  "id": "acol1H-3H",
                  "trigger": "3H",
                  "meaning": "Control phase anchor for hearts fit.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "H",
                    "suits": [
                      "C",
                      "D",
                      "S"
                    ],
                    "startLevel": 4,
                    "description": "Control bidding available after agreed heart fit."
                  }
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 19,
                "minSuit": {
                  "H": 4
                },
                "maxSuit": {
                  "H": 13
                }
              }
            },
            {
              "id": "acol1S",
              "trigger": "1S",
              "meaning": "Natural Acol 1♠: 12–19 aHCP and 4+ spades.",
              "children": [
                {
                  "id": "acol1S-1NT",
                  "trigger": "1NT",
                  "meaning": "6-9 pt invitation and no spade support."
                },
                {
                  "id": "acol1S-2S",
                  "trigger": "2S",
                  "meaning": "2/1 game-forcing response.",
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "acol1S-2S-2NT",
                  "trigger": "2NT",
                  "meaning": "In-between invitation."
                },
                {
                  "id": "acol1S-3S",
                  "trigger": "3S",
                  "meaning": "Control phase anchor for spade fit.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "S",
                    "suits": [
                      "C",
                      "D",
                      "H"
                    ],
                    "startLevel": 4,
                    "description": "Cuebids/control tries for slam in spade context."
                  }
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 19,
                "minSuit": {
                  "S": 4
                },
                "maxSuit": {
                  "S": 13
                }
              }
            },
            {
              "id": "acol1NT",
              "trigger": "1NT",
              "meaning": "Acol 1NT: 12–14 aHCP, balanced (4333, 4432, or suitable 5332) with no six-card suit.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 14,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "acol1NT-2C",
                  "trigger": "2C",
                  "meaning": "Major-suit inquiry."
                },
                {
                  "id": "acol1NT-2D",
                  "trigger": "2D",
                  "meaning": "Minor-suit inquiry."
                },
                {
                  "id": "acol1NT-2H",
                  "trigger": "2H",
                  "meaning": "Transfer or response to heart fit."
                },
                {
                  "id": "acol1NT-2S",
                  "trigger": "2S",
                  "meaning": "Transfer or response to spade fit."
                }
              ]
            },
            {
              "id": "acol-2C",
              "trigger": "2C",
              "meaning": "Artificial strong 2♣: 22+ aHCP, any shape (or equivalent playing-trick strength).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 22,
                "maxHcp": 40
              },
              "children": []
            },
            {
              "id": "acol-2NT",
              "trigger": "2NT",
              "meaning": "Natural 2NT: balanced 20–22 aHCP (4333, 4432, or 5332).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 20,
                "maxHcp": 22
              },
              "children": []
            },
            {
              "id": "acol-weak-club-opening",
              "nodeType": "group",
              "label": "Weak club opening",
              "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "C",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "acol-3C",
                  "trigger": "3C",
                  "meaning": "Preemptive 3C opening: 5–10 aHCP and a 7-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-club-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 7
                    },
                    "maxSuit": {
                      "C": 7
                    }
                  },
                  "children": []
                },
                {
                  "id": "acol-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4C opening: 5–10 aHCP and a 8+-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-club-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 8
                    },
                    "maxSuit": {
                      "C": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "acol-weak-diamond-opening",
              "nodeType": "group",
              "label": "Weak diamond opening",
              "meaning": "Parallel preemptive opening options in diamond: 2D, 3D, 4D. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "D",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "acol-2D",
                  "trigger": "2D",
                  "meaning": "Weak two in D: 5–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-diamond-opening"
                  }
                },
                {
                  "id": "acol-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 5–10 aHCP and a 7-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 7
                    },
                    "maxSuit": {
                      "D": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "acol-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 5–10 aHCP and a 8+-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 8
                    },
                    "maxSuit": {
                      "D": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "acol-weak-heart-opening",
              "nodeType": "group",
              "label": "Weak heart opening",
              "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "H",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "acol-2H",
                  "trigger": "2H",
                  "meaning": "Weak two in H: 5–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-heart-opening"
                  }
                },
                {
                  "id": "acol-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 5–10 aHCP and a 7-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 7
                    },
                    "maxSuit": {
                      "H": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "acol-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 5–10 aHCP and a 8+-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 8
                    },
                    "maxSuit": {
                      "H": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            },
            {
              "id": "acol-weak-spade-opening",
              "nodeType": "group",
              "label": "Weak spade opening",
              "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 5,
                  "max": 10
                },
                "suit": "S",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "acol-2S",
                  "trigger": "2S",
                  "meaning": "Weak two in S: 5–10 aHCP and a sound six-card suit.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [],
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-spade-opening"
                  }
                },
                {
                  "id": "acol-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 5–10 aHCP and a 7-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 7
                    },
                    "maxSuit": {
                      "S": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                },
                {
                  "id": "acol-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 5–10 aHCP and a 8+-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 5,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "acol-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 5,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 8
                    },
                    "maxSuit": {
                      "S": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "acol-slam",
          "name": "Slam structure",
          "children": [
            {
              "id": "acol4NT",
              "trigger": "4NT",
              "meaning": "RKCB/Blackwood request.",
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "blackwood",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            },
            {
              "id": "acol5C",
              "trigger": "5C",
              "meaning": "0/4 style response.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acol5D",
              "trigger": "5D",
              "meaning": "1/5 style response.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acol5H",
              "trigger": "5H",
              "meaning": "2/6 style response.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acol5S",
              "trigger": "5S",
              "meaning": "3 style response.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acol5NT",
              "trigger": "5NT",
              "meaning": "King/queen control ask.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acol6C",
              "trigger": "6C",
              "meaning": "Gerber path/ace ask in minor context.",
              "filters": {
                "auctionRole": "contextual"
              },
              "facts": {
                "convention": {
                  "gerber": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "blackwood",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            }
          ]
        },
        {
          "id": "acol-competition",
          "name": "Overcalls and doubles",
          "children": [
            {
              "id": "acolX",
              "trigger": "X",
              "meaning": "Takeout / penalty double.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            },
            {
              "id": "acolXX",
              "trigger": "XX",
              "meaning": "Redouble.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acoloc1C",
              "trigger": "1C",
              "meaning": "Overcall in clubs.",
              "filters": {
                "auctionRole": "contextual"
              }
            },
            {
              "id": "acoloc1NT",
              "trigger": "1NT",
              "meaning": "No-trump overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              }
            }
          ]
        }
      ],
      "openingProfile": {
        "1NT": {
          "pointRange": {
            "min": 12,
            "max": 14
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332; no six-card suit)"
        },
        "1Major": {
          "pointRange": {
            "min": 12,
            "max": 19
          },
          "suitLengthRange": {
            "H": {
              "min": 4,
              "max": 13
            },
            "S": {
              "min": 4,
              "max": 13
            }
          }
        },
        "1Minor": {
          "clubs": {
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          },
          "diamonds": {
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "suitLengthRange": {
              "min": 4,
              "max": 13
            }
          }
        },
        "2NT": {
          "pointRange": {
            "min": 20,
            "max": 22
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced (4333, 4432, or 5332)",
          "enabled": true
        },
        "strongOpening": {
          "bid": "2C",
          "pointRange": {
            "min": 22,
            "max": 40
          }
        },
        "weakTwos": {
          "enabled": true,
          "suits": [
            "D",
            "H",
            "S"
          ],
          "pointRange": {
            "min": 5,
            "max": 10
          },
          "suitLengthRange": {
            "min": 6,
            "max": 13
          }
        },
        "weakOpenings": {
          "pointRange": {
            "min": 5,
            "max": 10
          },
          "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
          "ladders": [
            {
              "suit": "C",
              "levels": [
                3,
                4
              ],
              "minimumLength": 7
            },
            {
              "suit": "D",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "H",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "S",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            }
          ]
        }
      },
      "openingReference": {
        "source": "Standard teaching reference; partnership agreements may vary.",
        "summary": "Standard English Acol base: four-card majors, weak 12–14 notrump, strong 2♣, and an explicit three-weak-two option.",
        "openings": [
          {
            "bid": "1♣",
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "lengthLabel": "natural; 3+ clubs"
          },
          {
            "bid": "1♦",
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "lengthLabel": "natural; 4+ diamonds"
          },
          {
            "bid": "1♥",
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "lengthLabel": "natural; 4+ hearts"
          },
          {
            "bid": "1♠",
            "pointRange": {
              "min": 12,
              "max": 19
            },
            "lengthLabel": "natural; 4+ spades"
          },
          {
            "bid": "1NT",
            "pointRange": {
              "min": 12,
              "max": 14
            },
            "lengthLabel": "balanced: 4333, 4432, or suitable 5332"
          },
          {
            "bid": "2♣",
            "pointRange": {
              "min": 22,
              "max": 40
            },
            "lengthLabel": "artificial strong; any shape or 8+ playing tricks"
          },
          {
            "bid": "2♦/2♥/2♠",
            "pointRange": {
              "min": 5,
              "max": 10
            },
            "lengthLabel": "weak-two option; six-card suit"
          },
          {
            "bid": "2NT",
            "pointRange": {
              "min": 20,
              "max": 22
            },
            "lengthLabel": "balanced: 4333, 4432, or 5332"
          }
        ],
        "conventions": [
          {
            "label": "Stayman",
            "description": "2♣ after 1NT asks for a four-card major."
          },
          {
            "label": "Weak twos",
            "description": "This base chooses three weak twos; some Acol partnerships instead use strong two-bids."
          },
          {
            "label": "Blackwood",
            "description": "4NT is an ace ask only after a suit has been agreed."
          }
        ]
      },
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.0",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.suit}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.0",
          "merge": "deep-patch"
        },
        "agreement": {
          "aceAsk": {
            "method": "blackwood",
            "interference": "D0P1",
            "d0p1": {
              "double": {
                "step": 1,
                "aces": [
                  0,
                  4
                ]
              },
              "pass": {
                "step": 2,
                "aces": [
                  1
                ]
              },
              "nextAvailable": [
                {
                  "step": 3,
                  "aces": [
                    2
                  ]
                },
                {
                  "step": 4,
                  "aces": [
                    3
                  ]
                }
              ]
            }
          }
        },
        "forcing": {
          "game": false,
          "round": false
        },
        "fit": {
          "confirmed": false
        }
      }
    },
    {
      "schemaVersion": "1.3",
      "systemId": "personal-fgv0-3",
      "systemName": "Personal FG 2/1 v0.3",
      "description": "A structured extraction of the FG 30-minute notes into executable tree format. Persistent fact-state edition sourced from FG Bidding System in 30 minutes (1).xlsx.",
      "notes": "Nodes were intentionally kept compact where the source diagram was conceptual. Extend each branch in SystemBuilder for exact card-by-card style.",
      "conventions": [
        {
          "id": "fg-opening",
          "name": "Opening and major opening control",
          "children": [
            {
              "id": "fg1C",
              "trigger": "1C",
              "meaning": "FG strong club opening: 12+ HCP, 3+ clubs, unbiddable diamonds, no 5-card major.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 20,
                "minSuit": {
                  "C": 3
                },
                "maxSuit": {
                  "C": 13,
                  "M": 4,
                  "D": 2
                }
              },
              "children": [
                {
                  "id": "fg1C-1D",
                  "trigger": "1D",
                  "meaning": "Responder with 4+ diamonds.",
                  "children": [
                    {
                      "id": "fg1C-1D-1NT",
                      "trigger": "1NT",
                      "meaning": "Balanced or light continuation; often game-forcing uncertainty exists.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-1D-2D",
                      "trigger": "2D",
                      "meaning": "Game interest route.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                },
                {
                  "id": "fg1C-1H",
                  "trigger": "1H",
                  "meaning": "Responder shows hearts.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-1S",
                  "trigger": "1S",
                  "meaning": "Responder shows spades.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-1NT",
                  "trigger": "1NT",
                  "meaning": "Responder minimum/no major emphasis.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-2C",
                  "trigger": "2C",
                  "meaning": "Artificial forcing continuation in this FG profile.",
                  "children": [
                    {
                      "id": "fg1C-2C-2D",
                      "trigger": "2D",
                      "meaning": "Opener confirms shape or distribution.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-2C-2H",
                      "trigger": "2H",
                      "meaning": "Transfer-style response or major support.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-2C-2S",
                      "trigger": "2S",
                      "meaning": "Transfer-style response or major support.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-2C-2NT",
                      "trigger": "2NT",
                      "meaning": "Balanced confirmation.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                }
              ],
              "alert": false
            },
            {
              "id": "fg1D",
              "trigger": "1D",
              "meaning": "Natural 1D opening.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 20,
                "minSuit": {
                  "D": 3
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "children": [
                {
                  "id": "fg1D-1H",
                  "trigger": "1H",
                  "meaning": "Heart response; suit support.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1D-1S",
                  "trigger": "1S",
                  "meaning": "Spade response; suit support.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1D-1NT",
                  "trigger": "1NT",
                  "meaning": "Balanced invite/no big force.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1D-2C-21",
                  "trigger": "2C",
                  "meaning": "2/1 game force in clubs: highest-priority eligible new-suit response after 1♦.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1D-2D",
                  "trigger": "2D",
                  "meaning": "Diamond support/raise branch, not a 2/1 game-force response.",
                  "generated": {
                    "type": "control-bids",
                    "agreedSuit": "D",
                    "suits": [
                      "C",
                      "H",
                      "S"
                    ],
                    "startLevel": 4,
                    "description": "Elimination control bidding after a diamond-support control phase."
                  },
                  "children": [
                    {
                      "id": "fg1D-2D-4NT",
                      "trigger": "4NT",
                      "meaning": "Ace/king check after at least one control phase.",
                      "clearControl": true,
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ],
              "alert": false
            },
            {
              "id": "fg1H",
              "trigger": "1H",
              "meaning": "5+ card heart opening.",
              "children": [
                {
                  "id": "fg1H-1NT",
                  "trigger": "1NT",
                  "meaning": "Responder minimum (6-9), likely no 4-card support in spades.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1H-2H",
                  "trigger": "2H",
                  "meaning": "Major-suit raise, not a 2/1 response. A qualifying 2/1 new-suit response has higher priority.",
                  "children": [
                    {
                      "id": "fg1H-2H-2NT",
                      "trigger": "2NT",
                      "meaning": "Invitation phase (incomplete support).",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1H-2H-3H",
                      "trigger": "3H",
                      "meaning": "Control-phase start in fitted heart sequence.",
                      "generated": {
                        "type": "control-bids",
                        "agreedSuit": "H",
                        "suits": [
                          "C",
                          "D",
                          "S"
                        ],
                        "startLevel": 4,
                        "description": "Starting from agreed suit, bid first/second controls in unbid suits."
                      },
                      "children": [
                        {
                          "id": "fg1H-2H-3H-4NT",
                          "trigger": "4NT",
                          "meaning": "RKC/4NT (after a round of control-bidding).",
                          "filters": {},
                          "children": [],
                          "alert": false,
                          "facts": {
                            "convention": {
                              "rkcb": true
                            },
                            "slam": {
                              "control": {
                                "active": true,
                                "suit": "{{call.suit}}",
                                "round": "first-or-second",
                                "elimination": {
                                  "method": "ascending-suit-elimination",
                                  "skippedSuitDeniesControl": true
                                }
                              }
                            }
                          }
                        },
                        {
                          "id": "fg1H-2H-3H-5NT",
                          "trigger": "5NT",
                          "meaning": "King ask after positive ace ask.",
                          "filters": {},
                          "children": [],
                          "alert": false,
                          "facts": {
                            "slam": {
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430",
                                "interference": "D0P1",
                                "accelerated": false,
                                "type": "keycard"
                              }
                            }
                          }
                        }
                      ],
                      "filters": {},
                      "alert": false
                    },
                    {
                      "id": "fg1H-2H-3S",
                      "trigger": "3S",
                      "meaning": "New-suit game try / side control.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1H-2H-4H",
                      "trigger": "4H",
                      "meaning": "Strong support or direct slam trial.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1H-2C-21",
                  "trigger": "2C",
                  "meaning": "2/1 game force in clubs: highest-priority eligible new-suit response after 1♥.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1H-2D-21",
                  "trigger": "2D",
                  "meaning": "2/1 game force in diamonds: highest-priority eligible new-suit response after 1♥.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
                }
              },
              "alert": false
            },
            {
              "id": "fg1S",
              "trigger": "1S",
              "meaning": "5+ card spade opening.",
              "children": [
                {
                  "id": "fg1S-1NT",
                  "trigger": "1NT",
                  "meaning": "Responder minimum in balanced style.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1S-2S",
                  "trigger": "2S",
                  "meaning": "Major-suit raise, not a 2/1 response. A qualifying 2/1 new-suit response has higher priority.",
                  "children": [
                    {
                      "id": "fg1S-2S-2NT",
                      "trigger": "2NT",
                      "meaning": "Invitational, not yet solid for force.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1S-2S-3S",
                      "trigger": "3S",
                      "meaning": "Strong fit and control-phase candidate.",
                      "generated": {
                        "type": "control-bids",
                        "agreedSuit": "S",
                        "suits": [
                          "C",
                          "D",
                          "H"
                        ],
                        "startLevel": 4,
                        "description": "Control bidding around spade fit with suit omissions."
                      },
                      "children": [
                        {
                          "id": "fg1S-2S-3S-4NT",
                          "trigger": "4NT",
                          "meaning": "RKC/Key-card query.",
                          "filters": {},
                          "children": [],
                          "alert": false,
                          "facts": {
                            "convention": {
                              "rkcb": true
                            }
                          }
                        },
                        {
                          "id": "fg1S-2S-3S-5NT",
                          "trigger": "5NT",
                          "meaning": "Queen ask / king check if partnership uses this.",
                          "filters": {},
                          "children": [],
                          "alert": false
                        }
                      ],
                      "filters": {},
                      "alert": false
                    },
                    {
                      "id": "fg1S-2S-3C",
                      "trigger": "3C",
                      "meaning": "Minor-suit side control and feature bid.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 9,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "S": 3
                    }
                  },
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1S-2C-21",
                  "trigger": "2C",
                  "meaning": "2/1 game force in clubs: highest-priority eligible new-suit response after 1♠.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1S-2D-21",
                  "trigger": "2D",
                  "meaning": "2/1 game force in diamonds: highest-priority eligible new-suit response after 1♠.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg1S-2H-21",
                  "trigger": "2H",
                  "meaning": "2/1 game force in hearts: highest-priority eligible new-suit response after 1♠.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "partnership": {
                      "points": {
                        "opener": {
                          "min": 12
                        },
                        "responder": {
                          "min": 12
                        },
                        "combined": {
                          "min": 24
                        }
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 21,
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
                }
              },
              "alert": false
            },
            {
              "id": "fg1NT",
              "trigger": "1NT",
              "meaning": "Natural no-trump opening (FG family range treated separately in this profile).",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 15,
                "maxHcp": 17,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "fg1NT-2C",
                  "trigger": "2C",
                  "meaning": "Stayman.",
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 9
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "stayman": true
                    }
                  }
                },
                {
                  "id": "fg1NT-2D",
                  "trigger": "2D",
                  "meaning": "Transfer into hearts (optional).",
                  "filters": {
                    "minSuit": {
                      "H": 5
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1NT-2H",
                  "trigger": "2H",
                  "meaning": "Transfer into spades (optional).",
                  "filters": {
                    "minSuit": {
                      "S": 5
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1NT-2NTC",
                  "trigger": "2NT",
                  "meaning": "Transfer into clubs.",
                  "filters": {
                    "minSuit": {
                      "C": 6
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "node-1",
                  "trigger": "2S",
                  "meaning": "minor stayman, 5-4 in minors looking for 5-4 fits.",
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 9,
                    "minSuit": {
                      "C": 4,
                      "D": 4
                    }
                  },
                  "children": [
                    {
                      "id": "node-2",
                      "trigger": "3C",
                      "meaning": "To play.",
                      "filters": {
                        "minSuit": {
                          "C": 4
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false
                    },
                    {
                      "id": "node-3",
                      "trigger": "3D",
                      "meaning": "To play.",
                      "filters": {
                        "minSuit": {
                          "D": 4
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false
                    },
                    {
                      "id": "node-4",
                      "trigger": "2NT",
                      "meaning": "No fit, not enough for game.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 16,
                        "maxSuit": {
                          "D": 3,
                          "C": 3
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false
                    },
                    {
                      "id": "node-5",
                      "trigger": "3NT",
                      "meaning": "Enough for game.",
                      "filters": {
                        "maxHcp": 17,
                        "minHcp": 17
                      },
                      "children": [],
                      "generated": null,
                      "alert": false
                    }
                  ],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "convention": {
                      "minorStayman": true,
                      "stayman": true
                    },
                    "fit": {
                      "confirmed": true,
                      "openerLength": 5,
                      "responderLength": 4,
                      "combinedMinimum": 9,
                      "suit": "{{call.suit}}"
                    }
                  }
                }
              ],
              "alert": false
            }
          ]
        },
        {
          "id": "fg-phase-structure",
          "name": "Phase II / Phase III controls",
          "children": [
            {
              "id": "fg-enter-phase-ii",
              "trigger": "2NT",
              "meaning": "Entering Phase II (deciding color / color checks).",
              "children": [
                {
                  "id": "fg-ii-2D",
                  "trigger": "2D",
                  "meaning": "Move toward fit confirmation / feature checks.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-ii-3D",
                  "trigger": "3D",
                  "meaning": "Cuebid-style step for fit and hand strength.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "cueBid": true
                    },
                    "slam": {
                      "control": {
                        "active": true,
                        "suit": "{{call.suit}}",
                        "round": "first-or-second",
                        "elimination": {
                          "method": "ascending-suit-elimination",
                          "skippedSuitDeniesControl": true
                        }
                      }
                    }
                  }
                },
                {
                  "id": "fg-ii-3S",
                  "trigger": "3S",
                  "meaning": "Jump into control context depending on prior agreement.",
                  "filters": {},
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "alert": false
            },
            {
              "id": "fg-enter-phase-iii",
              "trigger": "3C",
              "meaning": "Entering control phase / Phase III in FG flow.",
              "generated": {
                "type": "control-bids",
                "agreedSuit": "",
                "suits": [
                  "C",
                  "D",
                  "H",
                  "S"
                ],
                "startLevel": 4,
                "description": "Generalized control-bid phase for FG; remove suits as controls are shown."
              },
              "children": [
                {
                  "id": "fg-iii-4C",
                  "trigger": "4C",
                  "meaning": "Club control route with suit priority.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-iii-4D",
                  "trigger": "4D",
                  "meaning": "Diamond control route with suit priority.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-iii-4H",
                  "trigger": "4H",
                  "meaning": "Heart control route with suit priority.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-iii-4S",
                  "trigger": "4S",
                  "meaning": "Spade control route with suit priority.",
                  "filters": {},
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-iii-5C",
                  "trigger": "5C",
                  "meaning": "Secondary control sequence if phase needs escalation.",
                  "filters": {},
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "alert": false
            }
          ]
        },
        {
          "id": "fg-ace-ask",
          "name": "Ace/Kings and cuebids",
          "children": [
            {
              "id": "fg-rkcb",
              "trigger": "4NT",
              "meaning": "RKCB/4NT query, typically after at least one round of controls.",
              "children": [
                {
                  "id": "fg-rkcb-5C",
                  "trigger": "5C",
                  "meaning": "1 or 4 key cards (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5C",
                        "keycards": [
                          0,
                          3
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "fg-rkcb-5D",
                  "trigger": "5D",
                  "meaning": "0 or 3 key cards (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          1,
                          4
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "fg-rkcb-5H",
                  "trigger": "5H",
                  "meaning": "2 key cards without the trump queen (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2,
                          5
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "fg-rkcb-5S",
                  "trigger": "5S",
                  "meaning": "2 key cards with the trump queen (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "convention": {
                      "rkcb": true
                    },
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "alert": false,
              "facts": {
                "convention": {
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            },
            {
              "id": "fg-5NT",
              "trigger": "5NT",
              "meaning": "King/queen inquiry.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-exclusion",
              "trigger": "5D",
              "meaning": "Exclusion RKC style when void is known.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "rkcb": true,
                  "exclusion": true
                },
                "shortness": {
                  "suit": "{{call.suit}}",
                  "exact": 0
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "type": "exclusion",
                    "excludedSuit": "{{call.suit}}",
                    "interference": "D0P1"
                  }
                }
              }
            },
            {
              "id": "fg-gerber",
              "trigger": "4C",
              "meaning": "Gerber request; usually after NT or club-centered auctions.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "gerber": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "gerber",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "gerber"
                  }
                }
              }
            }
          ]
        },
        {
          "id": "fg-controls-and-splinters",
          "name": "Splinter and cuebids",
          "children": [
            {
              "id": "fg-splinter",
              "trigger": "3D",
              "meaning": "Splinter route candidate: shortness + game force in 2/1 contexts.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "splinter": true,
                  "twoOverOne": true
                },
                "forcing": {
                  "game": true,
                  "source": "2/1"
                },
                "partnership": {
                  "points": {
                    "opener": {
                      "min": 12
                    },
                    "responder": {
                      "min": 12
                    },
                    "combined": {
                      "min": 24
                    }
                  }
                },
                "fit": {
                  "confirmed": true
                },
                "shortness": {
                  "suit": "{{call.suit}}",
                  "min": 0,
                  "max": 1
                },
                "slam": {
                  "interest": true
                }
              }
            },
            {
              "id": "fg-exclusion-2-level",
              "trigger": "4D",
              "meaning": "Exclusion control line when singleton/void is established.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "exclusion": true
                },
                "shortness": {
                  "suit": "{{call.suit}}",
                  "exact": 0
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "type": "exclusion",
                    "excludedSuit": "{{call.suit}}",
                    "interference": "D0P1"
                  }
                }
              }
            },
            {
              "id": "fg-cuebid",
              "trigger": "4H",
              "meaning": "Cuebid style; confirm side control and fit strength.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "cueBid": true
                },
                "slam": {
                  "control": {
                    "active": true,
                    "suit": "{{call.suit}}",
                    "round": "first-or-second",
                    "elimination": {
                      "method": "ascending-suit-elimination",
                      "skippedSuitDeniesControl": true
                    }
                  }
                }
              }
            },
            {
              "id": "fg-michaels",
              "trigger": "2NT",
              "meaning": "Michaels cue at 5-5 two-suit discovery point.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "convention": {
                  "michaels": true
                }
              }
            }
          ]
        },
        {
          "id": "fg-overcalls",
          "name": "Overcalls and competition",
          "children": [
            {
              "id": "fg-oc1",
              "trigger": "1C",
              "meaning": "1-level club overcall (context-dependent).",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-oc1D",
              "trigger": "1D",
              "meaning": "1-level diamond overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-oc1H",
              "trigger": "1H",
              "meaning": "1-level heart overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-oc1S",
              "trigger": "1S",
              "meaning": "1-level spade overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-ocX",
              "trigger": "X",
              "meaning": "Competitive double.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-ocXX",
              "trigger": "XX",
              "meaning": "Redouble.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-oc1NT",
              "trigger": "1NT",
              "meaning": "NT overcall when holding stopper.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-overcall2C",
              "trigger": "2C",
              "meaning": "2C overcall (potentially conventional).",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C"
              },
              "children": [],
              "alert": false
            }
          ]
        },
        {
          "id": "fg-multi-landy",
          "name": "Multi-Landy defense to 1NT",
          "notes": "All branches assume the opponents opened 1NT and pass between displayed partnership calls.",
          "children": [
            {
              "id": "fg-ml-2C",
              "trigger": "2C",
              "meaning": "Multi-Landy: both majors, typically at least 5-4.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "H": 4,
                  "S": 4
                }
              },
              "children": [
                {
                  "id": "fg-ml-2C-2D",
                  "trigger": "2D",
                  "meaning": "No fit in majors.",
                  "children": [
                    {
                      "id": "fg-ml-2C-2D-2H",
                      "trigger": "2H",
                      "meaning": "Hearts.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg-ml-2C-2D-2S",
                      "trigger": "2S",
                      "meaning": "Spades.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {
                    "maxSuit": {
                      "H": 3,
                      "S": 3
                    }
                  },
                  "alert": false,
                  "facts": {
                    "fit": {
                      "confirmed": true
                    }
                  }
                },
                {
                  "id": "node-1",
                  "trigger": "2H",
                  "meaning": "Fit in hearts",
                  "filters": {
                    "minSuit": {
                      "H": 4
                    }
                  },
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "fit": {
                      "confirmed": true
                    }
                  }
                },
                {
                  "id": "node-2",
                  "trigger": "2S",
                  "meaning": "Fit in spade",
                  "filters": {
                    "minSuit": {
                      "S": 4
                    }
                  },
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "fit": {
                      "confirmed": true
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "convention": {
                  "multiLandy": true
                }
              }
            },
            {
              "id": "fg-ml-2D",
              "trigger": "2D",
              "meaning": "Multi-Landy: one major, usually a six-card suit.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT"
              },
              "children": [
                {
                  "id": "fg-ml-2D-2H",
                  "trigger": "2H",
                  "meaning": "Pass or correct: hearts is acceptable; 2S asks for the other major.",
                  "children": [
                    {
                      "id": "fg-ml-2D-2H-2S",
                      "trigger": "2S",
                      "meaning": "Spades.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                }
              ],
              "alert": false,
              "facts": {
                "convention": {
                  "multiLandy": true
                }
              }
            },
            {
              "id": "fg-ml-2H",
              "trigger": "2H",
              "meaning": "Multi-Landy: hearts and a minor.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "H": 5
                }
              },
              "children": [
                {
                  "id": "fg-ml-2H-2NT",
                  "trigger": "2NT",
                  "meaning": "Advancer asks for the minor.",
                  "children": [
                    {
                      "id": "fg-ml-2H-2NT-3C",
                      "trigger": "3C",
                      "meaning": "Clubs.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg-ml-2H-2NT-3D",
                      "trigger": "3D",
                      "meaning": "Diamonds.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                }
              ],
              "alert": false,
              "facts": {
                "convention": {
                  "multiLandy": true
                }
              }
            },
            {
              "id": "fg-ml-2S",
              "trigger": "2S",
              "meaning": "Multi-Landy: spades and a minor.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "S": 5
                }
              },
              "children": [
                {
                  "id": "fg-ml-2S-2NT",
                  "trigger": "2NT",
                  "meaning": "Advancer asks for the minor.",
                  "children": [
                    {
                      "id": "fg-ml-2S-2NT-3C",
                      "trigger": "3C",
                      "meaning": "Clubs.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg-ml-2S-2NT-3D",
                      "trigger": "3D",
                      "meaning": "Diamonds.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                }
              ],
              "alert": false,
              "facts": {
                "convention": {
                  "multiLandy": true
                }
              }
            },
            {
              "id": "fg-ml-2NT",
              "trigger": "2NT",
              "meaning": "Multi-Landy: both minors, typically 5-5 or better.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "C": 5,
                  "D": 5
                }
              },
              "children": [
                {
                  "id": "fg-ml-2NT-3C",
                  "trigger": "3C",
                  "meaning": "Advancer selects clubs or gives a pass-or-correct preference.",
                  "children": [
                    {
                      "id": "fg-ml-2NT-3C-3D",
                      "trigger": "3D",
                      "meaning": "Correct to diamonds.",
                      "filters": {},
                      "children": [],
                      "alert": false
                    }
                  ],
                  "filters": {},
                  "alert": false
                }
              ],
              "alert": false,
              "facts": {
                "convention": {
                  "multiLandy": true
                }
              }
            }
          ]
        },
        {
          "id": "fg-weak-openings",
          "name": "Weak openings and preempts",
          "children": [
            {
              "id": "fg-weak-club-opening",
              "nodeType": "group",
              "label": "Weak club opening",
              "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "C",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "fg-3C",
                  "trigger": "3C",
                  "meaning": "Preemptive 3C opening: 6–10 HCP and a 7-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-club-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 7
                    },
                    "maxSuit": {
                      "C": 7
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4C opening: 6–10 HCP and a 8+-card club suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "C",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-club-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 8
                    },
                    "maxSuit": {
                      "C": 13
                    },
                    "auctionRole": "opening"
                  },
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {},
              "alert": false
            },
            {
              "id": "fg-weak-diamond-opening",
              "nodeType": "group",
              "label": "Weak diamond opening",
              "meaning": "Parallel preemptive opening options in diamond: 2D, 3D, 4D. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "D",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "fg-2D",
                  "trigger": "2D",
                  "meaning": "Preemptive 2D opening (catalogue alternative): 6–10 HCP and a 6-card D suit. This is an alternative opening, not a continuation after the parent node.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-diamond-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 6
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 6–10 HCP and a 7-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-diamond-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 7
                    },
                    "maxSuit": {
                      "D": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 6–10 HCP and a 8+-card diamond suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "D",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-diamond-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "D": 8
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {},
              "alert": false
            },
            {
              "id": "fg-weak-heart-opening",
              "nodeType": "group",
              "label": "Weak heart opening",
              "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "H",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "fg-2H",
                  "trigger": "2H",
                  "meaning": "Preemptive 2H opening (catalogue alternative): 6–10 HCP and a 6-card H suit. This is an alternative opening, not a continuation after the parent node.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-heart-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 6
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 6–10 HCP and a 7-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-heart-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 7
                    },
                    "maxSuit": {
                      "H": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 6–10 HCP and a 8+-card heart suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "H",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-heart-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "H": 8
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {},
              "alert": false
            },
            {
              "id": "fg-weak-spade-opening",
              "nodeType": "group",
              "label": "Weak spade opening",
              "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
              "displayRole": "opener",
              "weakOpeningGroup": {
                "pointRange": {
                  "min": 6,
                  "max": 10
                },
                "suit": "S",
                "layout": "parallel alternatives",
                "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)"
              },
              "children": [
                {
                  "id": "fg-2S",
                  "trigger": "2S",
                  "meaning": "Preemptive 2S opening (catalogue alternative): 6–10 HCP and a 6-card S suit. This is an alternative opening, not a continuation after the parent node.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 6,
                      "max": 6
                    },
                    "bidLevel": 2,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-spade-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 6
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 6–10 HCP and a 7-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 7,
                      "max": 7
                    },
                    "bidLevel": 3,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-spade-opening"
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 7
                    },
                    "maxSuit": {
                      "S": 7
                    },
                    "auctionRole": "opening"
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 6–10 HCP and a 8+-card spade suit.",
                  "displayRole": "opener",
                  "weakOpening": {
                    "catalogueAlternative": true,
                    "pointRange": {
                      "min": 6,
                      "max": 10
                    },
                    "longestSuit": "S",
                    "longestSuitLength": {
                      "min": 8,
                      "max": 13
                    },
                    "bidLevel": 4,
                    "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
                    "parentLayout": "parallel suit opening options",
                    "parentGroupId": "fg-weak-spade-opening"
                  },
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "S": 8
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [],
                  "alert": false
                }
              ],
              "filters": {},
              "alert": false
            }
          ]
        },
        {
          "id": "convention-1788925263125",
          "name": "Ace and Keycard Asks",
          "children": [
            {
              "id": "node-1",
              "trigger": "4NT",
              "meaning": "Roman Keycard Asking for 4 aces and  trump King",
              "filters": {},
              "children": [
                {
                  "id": "node-2",
                  "trigger": "5C",
                  "meaning": "1 or 4 key cards (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5C",
                        "keycards": [
                          1,
                          4
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "node-3",
                  "trigger": "5D",
                  "meaning": "0 or 3 key cards (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          3,
                          0
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "node-4",
                  "trigger": "5H",
                  "meaning": "2 key cards without the trump queen (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2,
                          5
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "node-5",
                  "trigger": "5S",
                  "meaning": "2 key cards with the trump queen (RKCB 1430).",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "slam": {
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "interference": "D0P1",
                        "accelerated": false,
                        "type": "keycard"
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5S",
                        "keycards": [
                          2,
                          5
                        ]
                      }
                    }
                  }
                }
              ],
              "generated": null,
              "alert": false,
              "facts": {
                "convention": {
                  "rkcb": true
                },
                "slam": {
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                }
              }
            },
            {
              "id": "node-6",
              "trigger": "5NT",
              "meaning": "King Asks, responder answers the king in ascending order; stop back at trump",
              "filters": {},
              "children": [
                {
                  "id": "node-7",
                  "trigger": "6C",
                  "meaning": "Has Club King",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false
                },
                {
                  "id": "node-8",
                  "trigger": "6D",
                  "meaning": "has Diamond King",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false
                },
                {
                  "id": "node-9",
                  "trigger": "6H",
                  "meaning": "has Heart King",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false
                },
                {
                  "id": "node-10",
                  "trigger": "6S",
                  "meaning": "has Spade King",
                  "filters": {},
                  "children": [],
                  "generated": null,
                  "alert": false
                }
              ],
              "generated": null,
              "alert": false
            }
          ],
          "notes": ""
        }
      ],
      "openingProfile": {
        "1NT": {
          "pointRange": {
            "min": 15,
            "max": 17
          },
          "suitLengthRange": {
            "C": {
              "min": 2,
              "max": 5
            },
            "D": {
              "min": 2,
              "max": 5
            },
            "H": {
              "min": 2,
              "max": 5
            },
            "S": {
              "min": 2,
              "max": 5
            }
          },
          "shape": "balanced"
        },
        "1Major": {
          "pointRange": {
            "min": 12,
            "max": 21
          },
          "suitLengthRange": {
            "H": {
              "min": 5,
              "max": 13
            },
            "S": {
              "min": 5,
              "max": 13
            }
          }
        },
        "1Minor": {
          "clubs": {
            "pointRange": {
              "min": 12,
              "max": 20
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          },
          "diamonds": {
            "pointRange": {
              "min": 12,
              "max": 20
            },
            "suitLengthRange": {
              "min": 3,
              "max": 13
            }
          }
        },
        "2NT": {
          "pointRange": null,
          "suitLengthRange": null,
          "treatment": "not a natural opening in this profile"
        },
        "strongOpening": {
          "bid": "1C",
          "pointRange": {
            "min": 12,
            "max": 20
          }
        },
        "weakTwos": {
          "enabled": true,
          "suits": [
            "D",
            "H",
            "S"
          ],
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "suitLengthRange": {
            "min": 6,
            "max": 13
          }
        },
        "weakOpenings": {
          "pointRange": {
            "min": 6,
            "max": 10
          },
          "levelRule": "bid level = longest suit length - 4 (catalogued through level 4)",
          "ladders": [
            {
              "suit": "C",
              "levels": [
                3,
                4
              ],
              "minimumLength": 7
            },
            {
              "suit": "D",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "H",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            },
            {
              "suit": "S",
              "levels": [
                2,
                3,
                4
              ],
              "minimumLength": 6
            }
          ]
        }
      },
      "priorityPolicy": {
        "2/1GameForce": "highest when the configured HCP range qualifies: 1D-2C, 1H-2C/2D, and 1S-2C/2D/2H only",
        "priority": 100
      },
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.0",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.suit}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.0",
          "merge": "deep-patch"
        },
        "agreement": {
          "aceAsk": {
            "method": "rkcb-1430",
            "interference": "D0P1",
            "d0p1": {
              "pass": {
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              },
              "double": {
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              },
              "nextAvailable": [
                {
                  "step": 3,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": false
                },
                {
                  "step": 4,
                  "keycards": [
                    2
                  ],
                  "trumpQueen": true
                }
              ]
            }
          }
        },
        "forcing": {
          "game": false,
          "round": false
        },
        "fit": {
          "confirmed": false
        }
      },
      "version": "0.3",
      "sourceWorkbook": "FG Bidding System in 30 minutes (1).xlsx",
      "sequenceRules": [
        {
          "id": "personal-fgv0-3-facts-two-over-one-entry",
          "expression": "1M-2X",
          "where": [
            "X<M"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 game force: each partner has shown at least 12 points.",
          "priority": 940,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "partnership": {
              "points": {
                "opener": {
                  "min": 12
                },
                "responder": {
                  "min": 12
                },
                "combined": {
                  "min": 24
                }
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-two-over-one-major-fit",
          "expression": "1M-2X-2Y-#M",
          "where": [
            "X<M"
          ],
          "requiresAgreement": [
            "M"
          ],
          "meaning": "2/1 major fit confirmed: opener has five and responder has three or more.",
          "priority": 960,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{M}}",
              "openerLength": 5,
              "responderLength": 3,
              "combinedMinimum": 8
            },
            "partnership": {
              "points": {
                "opener": {
                  "min": 12
                },
                "responder": {
                  "min": 12
                },
                "combined": {
                  "min": 24
                }
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-control-phase",
          "expression": "1H-2C-2D-2H-2S",
          "where": [],
          "requiresAgreement": [
            "H"
          ],
          "meaning": "2/1 phase III: spades is a first- or second-round control; skipped suits deny control.",
          "priority": 980,
          "alert": true,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "fit": {
              "confirmed": true,
              "suit": "H",
              "openerLength": 5,
              "responderLength": 3,
              "combinedMinimum": 8
            },
            "slam": {
              "control": {
                "active": true,
                "suit": "S",
                "round": "first-or-second",
                "elimination": {
                  "method": "ascending-suit-elimination",
                  "skippedSuitDeniesControl": true
                }
              }
            },
            "partnership": {
              "points": {
                "opener": {
                  "min": 12
                },
                "responder": {
                  "min": 12
                },
                "combined": {
                  "min": 24
                }
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-accelerated-rkcb",
          "expression": "1H-2C-2D-2H-2S-2NT",
          "where": [],
          "requiresAgreement": [
            "H"
          ],
          "meaning": "Accelerated RKCB after a confirmed heart fit and one control bid.",
          "priority": 1000,
          "alert": true,
          "facts": {
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "keycard",
                "accelerated": true,
                "agreedSuit": "H",
                "interference": "D0P1"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-splinter",
          "expression": "1D-2C-2H-3S",
          "where": [],
          "requiresAgreement": [],
          "meaning": "2/1 splinter: heart support with zero or one spade.",
          "priority": 990,
          "alert": true,
          "facts": {
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "fit": {
              "confirmed": true,
              "suit": "H",
              "responderLength": 3,
              "combinedMinimum": 8
            },
            "shortness": {
              "suit": "S",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-exclusion-rkcb",
          "expression": "1D-2C-2H-3S-4C-5D",
          "where": [],
          "requiresAgreement": [],
          "meaning": "Exclusion RKCB in diamonds, asking for key cards outside the diamond void.",
          "priority": 1010,
          "alert": true,
          "facts": {
            "fit": {
              "confirmed": true,
              "suit": "H"
            },
            "shortness": {
              "suit": "D",
              "exact": 0
            },
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "H",
                "excludedSuit": "D",
                "interference": "D0P1"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-facts-fourth-suit-stopper",
          "expression": "1D-2C-2H-2S-3C",
          "where": [],
          "requiresAgreement": [],
          "meaning": "Fourth-suit inquiry asks for a club stopper before notrump.",
          "priority": 970,
          "alert": true,
          "facts": {
            "forcing": {
              "round": true
            },
            "inquiry": {
              "type": "stopper",
              "suit": "C"
            }
          }
        },
        {
          "id": "personal-fgv0-3-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one or four key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "pass",
                "step": 1,
                "keycards": [
                  1,
                  4
                ]
              }
            }
          }
        },
        {
          "id": "personal-fgv0-3-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or three key cards.",
          "priority": 1100,
          "facts": {
            "slam": {
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1"
              },
              "response": {
                "convention": "D0P1",
                "action": "double",
                "step": 2,
                "keycards": [
                  0,
                  3
                ]
              }
            }
          }
        }
      ]
    }
  ]
};
