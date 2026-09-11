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
      "schemaVersion": "1.5",
      "systemId": "two-over-one",
      "systemName": "2/1 Game Forcing",
      "description": "A practical, documented 2/1 Game Forcing system using five-card majors, a 15–17 1NT, forcing 1NT responses to major openings, inverted minor-style raises, and explicit auction-progress facts.",
      "notes": "Ranges are HCP unless an explanation says otherwise. Core agreements follow Bridge World Standard 2017 and ACBL teaching references; judgment, vulnerability, seat, and partnership style can alter marginal opening and preempt decisions. Artificial or contextual calls explicitly carry an unrestricted 0–40 HCP range and no natural suit-length promise.",
      "sequenceRules": [
        {
          "id": "two-over-one-learned-sequence",
          "expression": "1X-2Y",
          "where": [
            "Y<X"
          ],
          "meaning": "2/1 game forcing: an uncontested, unpassed-hand non-jump response in a new lower-ranking suit, showing 12+ HCP and normally 4+ cards (1♠–2♥ promises 5+ hearts).",
          "priority": 110,
          "filters": {
            "minHcp": 12,
            "maxHcp": 40,
            "minSuit": {
              "Y": 4
            },
            "maxSuit": {
              "Y": 13
            }
          }
        },
        {
          "id": "two-over-one-facts-entry",
          "expression": "1X-2Y",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "filters": {
            "minHcp": 12,
            "maxHcp": 40,
            "minSuit": {
              "Y": 4
            },
            "maxSuit": {
              "Y": 13
            }
          },
          "meaning": "2/1 game forcing: an uncontested, unpassed-hand non-jump response in a new lower-ranking suit, showing 12+ HCP and normally 4+ cards (1♠–2♥ promises 5+ hearts).",
          "priority": 940,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 game forcing: an uncontested, unpassed-hand non-jump response in a new lower-ranking suit, showing 12+ HCP and normally 4+ cards (1♠–2♥ promises 5+ hearts).",
              "points": {
                "method": "HCP",
                "min": 12,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Y}}",
                  "min": 4,
                  "max": 13
                }
              ]
            },
            "convention": {
              "twoOverOne": true
            },
            "forcing": {
              "game": true,
              "round": false,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "entry",
                "phaseNumber": 1,
                "openingSuit": "{{X}}",
                "responseSuit": "{{Y}}",
                "fitConfirmed": false,
                "gameForceSatisfied": false
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
          "id": "two-over-one-facts-phase-ii-suit",
          "expression": "1X-2Y-(?:!=NT)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 Phase II begins with opener's first suit rebid.",
          "priority": 950,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II begins with opener's first suit rebid.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "strain-selection",
                "phaseNumber": 2,
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-phase-ii-notrump",
          "expression": "1X-2Y-(2NT|3NT)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 Phase II begins with opener's first notrump rebid.",
          "priority": 950,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II begins with opener's first notrump rebid.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "strain-selection",
                "phaseNumber": 2,
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-fit-opening",
          "expression": "1X-2Y-?-#X",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "X"
          ],
          "meaning": "2/1 Phase II confirms a fit in the opening suit.",
          "priority": 960,
          "generated": {
            "type": "control-bids",
            "agreedSuit": "{{X}}",
            "suits": [
              "C",
              "D",
              "H",
              "S"
            ],
            "style": "first-or-second-round",
            "inferSkipped": true,
            "source": "2/1 explicit agreement in the opening suit",
            "description": "After the opening suit is agreed, side-suit calls may show controls for slam exploration.",
            "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
          },
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II confirms a fit in the opening suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-fit-response",
          "expression": "1X-2Y-#Y",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Y"
          ],
          "meaning": "2/1 Phase II confirms a fit in responder's suit.",
          "priority": 960,
          "generated": {
            "type": "control-bids",
            "agreedSuit": "{{Y}}",
            "suits": [
              "C",
              "D",
              "H",
              "S"
            ],
            "style": "first-or-second-round",
            "inferSkipped": true,
            "source": "2/1 explicit agreement in responder's suit",
            "description": "After responder's suit is agreed, side-suit calls may show controls for slam exploration.",
            "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
          },
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II confirms a fit in responder's suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-fit-second-suit",
          "expression": "1X-2Y-#Z-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Z"
          ],
          "meaning": "2/1 Phase II confirms a fit in opener's second suit.",
          "priority": 960,
          "generated": {
            "type": "control-bids",
            "agreedSuit": "{{Z}}",
            "suits": [
              "C",
              "D",
              "H",
              "S"
            ],
            "style": "first-or-second-round",
            "inferSkipped": true,
            "source": "2/1 explicit agreement in opener's second suit",
            "description": "After opener's second suit is agreed, side-suit calls may show controls for slam exploration.",
            "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
          },
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II confirms a fit in opener's second suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "two-over-one-sample-splinter-heart-fit",
          "expression": "1H-(3S|4C|4D)",
          "meaning": "Splinter raise: hearts are agreed; responder shows game-forcing support and zero or one card in the bid suit. Control bidding is now available.",
          "priority": 965,
          "alert": true,
          "generated": {
            "type": "control-bids",
            "agreedSuit": "H",
            "suits": [
              "C",
              "D",
              "H",
              "S"
            ],
            "style": "first-or-second-round",
            "inferSkipped": true,
            "source": "splinter raise",
            "knownControls": [
              {
                "suit": "{{call.suit}}",
                "seat": "{{seat}}",
                "round": "first-or-second-round",
                "source": "splinter shortness",
                "code": "{{call.code}}"
              }
            ],
            "description": "The splinter suit is already known to be controlled; subsequent side-suit bids show controls upward.",
            "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
          },
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Splinter raise: hearts are agreed; responder shows game-forcing support and zero or one card in the bid suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "convention": {
              "splinter": true
            },
            "forcing": {
              "game": true,
              "source": "splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "H"
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
          "id": "two-over-one-sample-splinter-spade-fit",
          "expression": "1S-(4C|4D|4H)",
          "meaning": "Splinter raise: spades are agreed; responder shows game-forcing support and zero or one card in the bid suit. Control bidding is now available.",
          "priority": 965,
          "alert": true,
          "generated": {
            "type": "control-bids",
            "agreedSuit": "S",
            "suits": [
              "C",
              "D",
              "H",
              "S"
            ],
            "style": "first-or-second-round",
            "inferSkipped": true,
            "source": "splinter raise",
            "knownControls": [
              {
                "suit": "{{call.suit}}",
                "seat": "{{seat}}",
                "round": "first-or-second-round",
                "source": "splinter shortness",
                "code": "{{call.code}}"
              }
            ],
            "description": "The splinter suit is already known to be controlled; subsequent side-suit bids show controls upward.",
            "meaningTemplate": "{{bid}} shows {{styleText}} control in {{suitName}} with {{agreedSuitName}} agreed as trumps.{{skipText}}"
          },
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Splinter raise: spades are agreed; responder shows game-forcing support and zero or one card in the bid suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "convention": {
              "splinter": true
            },
            "forcing": {
              "game": true,
              "source": "splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "S"
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
          "id": "two-over-one-facts-control-opening-fit",
          "expression": "1X-2Y-?-#X-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "X"
          ],
          "meaning": "2/1 Phase III control bidding after agreement in the opening suit.",
          "priority": 970,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III control bidding after agreement in the opening suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{Z}}",
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
          "id": "two-over-one-facts-control-response-fit",
          "expression": "1X-2Y-#Y-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Y"
          ],
          "meaning": "2/1 Phase III control bidding after agreement in responder's suit.",
          "priority": 970,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III control bidding after agreement in responder's suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{Z}}",
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
          "id": "two-over-one-facts-control-second-suit-fit",
          "expression": "1X-2Y-#Z-#Z-#W",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Z"
          ],
          "meaning": "2/1 Phase III control bidding after agreement in opener's second suit.",
          "priority": 970,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III control bidding after agreement in opener's second suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{W}}",
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
          "id": "two-over-one-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "where": [],
          "requiresAgreement": [
            "X"
          ],
          "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
          "priority": 980,
          "clearControl": true,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Blackwood / key-card ace ask after both partners explicitly bid the same suit.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "convention": {
              "blackwood": true,
              "rkcb": true
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1",
                "accelerated": false,
                "type": "keycard",
                "agreedSuit": "{{X}}"
              }
            },
            "progress": {
              "twoOverOne": {
                "phase": "slam-pursuit",
                "phaseNumber": 4
              }
            }
          }
        },
        {
          "id": "two-over-one-facts-game-force-complete",
          "expression": "1X-2Y-*-(3NT|4H|4S|5C|5D)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "The 2/1 game force is satisfied when the partnership reaches a game contract.",
          "priority": 990,
          "clearControl": true,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "The 2/1 game force is satisfied when the partnership reaches a game contract.",
              "points": {
                "method": "HCP",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": false,
              "round": false,
              "source": "2/1-complete"
            },
            "progress": {
              "twoOverOne": {
                "active": false,
                "phase": "complete",
                "phaseNumber": 4,
                "gameForceSatisfied": true
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
              "meaning": "Natural 1♣ opening: 12+ points (normally 12–21 HCP) and 3+ clubs. Open 1♣ with 3–3 minors; with longer unequal minors, open the longer minor.",
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
                  "meaning": "1♦ response: 6+ HCP and 4+ diamonds; natural and forcing for one round by an unpassed responder.",
                  "children": [
                    {
                      "id": "o1C-1D-1NT",
                      "trigger": "1NT",
                      "meaning": "Opener's 1NT rebid: 12–14 HCP and a balanced hand, denying a four-card major that could have been bid at the one level.",
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 14,
                        "minSuit": {
                          "C": 3,
                          "D": 2,
                          "H": 2,
                          "S": 2
                        },
                        "maxSuit": {
                          "C": 5,
                          "D": 5,
                          "H": 3,
                          "S": 3
                        }
                      },
                      "facts": {
                        "rebid": {
                          "naturalNotrump": true,
                          "balanced": true
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener's 1NT rebid: 12–14 HCP and a balanced hand, denying a four-card major that could have been bid at the one level.",
                          "points": {
                            "method": "HCP",
                            "min": 12,
                            "max": 14
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 3,
                              "max": 5
                            },
                            {
                              "suit": "D",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "H",
                              "min": 2,
                              "max": 3
                            },
                            {
                              "suit": "S",
                              "min": 2,
                              "max": 3
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1C-1D-2D",
                      "trigger": "2D",
                      "meaning": "Opener's simple diamond raise: usually 12–15 HCP, 3+ clubs from the opening, and 4+ diamond support; non-forcing.",
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 15,
                        "minSuit": {
                          "C": 3,
                          "D": 4
                        },
                        "maxSuit": {
                          "C": 13,
                          "D": 13
                        }
                      },
                      "facts": {
                        "fit": {
                          "confirmed": true,
                          "suit": "D",
                          "openerLength": 4
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener's simple diamond raise: usually 12–15 HCP, 3+ clubs from the opening, and 4+ diamond support; non-forcing.",
                          "points": {
                            "method": "HCP",
                            "min": 12,
                            "max": 15
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 3,
                              "max": 13
                            },
                            {
                              "suit": "D",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        }
                      }
                    }
                  ],
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 4
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "D"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♦ response: 6+ HCP and 4+ diamonds; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1C-1H",
                  "trigger": "1H",
                  "meaning": "1♥ response: 6+ HCP and 4+ hearts; natural and forcing for one round by an unpassed responder.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 4
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "H"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♥ response: 6+ HCP and 4+ hearts; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1C-1S",
                  "trigger": "1S",
                  "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "S"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1C-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response to 1♣: 6–10 HCP, balanced, non-forcing, and normally denying a four-card major.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 2,
                      "D": 2,
                      "H": 2,
                      "S": 2
                    },
                    "maxSuit": {
                      "C": 5,
                      "D": 5,
                      "H": 3,
                      "S": 3
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "response": {
                      "naturalNotrump": true,
                      "balanced": true
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response to 1♣: 6–10 HCP, balanced, non-forcing, and normally denying a four-card major.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 2,
                          "max": 5
                        },
                        {
                          "suit": "D",
                          "min": 2,
                          "max": 5
                        },
                        {
                          "suit": "H",
                          "min": 2,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 2,
                          "max": 3
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1C-2C",
                  "trigger": "2C",
                  "meaning": "Inverted club raise: 10+ HCP, 5+ clubs, no four-card major, and forcing at least through 3♣; it is a raise, not a 2/1 new-suit game force.",
                  "facts": {
                    "convention": {
                      "twoOverOne": false,
                      "invertedMinor": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "throughLevel": "3C",
                      "source": "inverted minor"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C",
                      "responderLength": 5
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0,
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Inverted club raise: 10+ HCP, 5+ clubs, no four-card major, and forcing at least through 3♣; it is a raise, not a 2/1 new-suit game force.",
                      "points": {
                        "method": "HCP",
                        "min": 10,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    }
                  },
                  "filters": {
                    "minHcp": 10,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13,
                      "H": 3,
                      "S": 3
                    }
                  }
                }
              ],
              "facts": {
                "opening": {
                  "natural": true,
                  "strain": "C",
                  "betterMinor": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1♣ opening: 12+ points (normally 12–21 HCP) and 3+ clubs. Open 1♣ with 3–3 minors; with longer unequal minors, open the longer minor.",
                  "points": {
                    "method": "HCP",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 3,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "o1D",
              "trigger": "1D",
              "meaning": "Natural 1♦ opening: 12+ points (normally 12–21 HCP) and 3+ diamonds. It normally shows 4+ diamonds, but may be three cards in a 4–4–3–2 hand with both majors.",
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
                  "meaning": "1♥ response: 6+ HCP and 4+ hearts; natural and forcing for one round by an unpassed responder.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 4
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "H"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♥ response: 6+ HCP and 4+ hearts; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1D-1S",
                  "trigger": "1S",
                  "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "S"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1D-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response to 1♦: 6–10 HCP, balanced, non-forcing, and normally denying a four-card major.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10,
                    "minSuit": {
                      "C": 2,
                      "D": 2,
                      "H": 2,
                      "S": 2
                    },
                    "maxSuit": {
                      "C": 5,
                      "D": 5,
                      "H": 3,
                      "S": 3
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "response": {
                      "naturalNotrump": true,
                      "balanced": true
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response to 1♦: 6–10 HCP, balanced, non-forcing, and normally denying a four-card major.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 2,
                          "max": 5
                        },
                        {
                          "suit": "D",
                          "min": 2,
                          "max": 5
                        },
                        {
                          "suit": "H",
                          "min": 2,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 2,
                          "max": 3
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1D-2D",
                  "trigger": "2D",
                  "meaning": "Inverted diamond raise: 10+ HCP, 4+ diamonds, no four-card major, and forcing at least through 3♦; it is a raise, not a 2/1 new-suit game force.",
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
                      "meaning": "After an inverted diamond raise, 3♣ shows club values or a club stopper while keeping 3NT in view; it does not promise natural club length.",
                      "children": [
                        {
                          "id": "o1D-2D-3C-4NT",
                          "trigger": "4NT",
                          "meaning": "Roman Key Card Blackwood in the agreed diamond fit; responder has slam-going values, and 4NT asks for key cards rather than showing a natural notrump range.",
                          "filters": {
                            "minHcp": 15,
                            "maxHcp": 40,
                            "minSuit": {
                              "D": 4
                            },
                            "maxSuit": {
                              "D": 13
                            }
                          },
                          "facts": {
                            "convention": {
                              "blackwood": true,
                              "rkcb": true
                            },
                            "fit": {
                              "confirmed": true,
                              "suit": "D"
                            },
                            "slam": {
                              "interest": true,
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430"
                              }
                            },
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Roman Key Card Blackwood in the agreed diamond fit; responder has slam-going values, and 4NT asks for key cards rather than showing a natural notrump range.",
                              "points": {
                                "method": "HCP",
                                "min": 15,
                                "max": 40
                              },
                              "suitLengths": [
                                {
                                  "suit": "D",
                                  "min": 4,
                                  "max": 13
                                }
                              ]
                            }
                          }
                        }
                      ],
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 21,
                        "minSuit": {
                          "D": 3
                        },
                        "maxSuit": {
                          "D": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "inverted minor continuation"
                        },
                        "stopper": {
                          "suit": "C",
                          "shown": true
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "After an inverted diamond raise, 3♣ shows club values or a club stopper while keeping 3NT in view; it does not promise natural club length.",
                          "points": {
                            "method": "HCP",
                            "min": 12,
                            "max": 21
                          },
                          "suitLengths": [
                            {
                              "suit": "D",
                              "min": 3,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1D-2D-4NT",
                      "trigger": "4NT",
                      "meaning": "Roman Key Card Blackwood by opener with an agreed diamond fit and slam interest; 4NT is an ace/key-card ask, not a natural notrump bid.",
                      "filters": {
                        "minHcp": 18,
                        "maxHcp": 21,
                        "minSuit": {
                          "D": 3
                        },
                        "maxSuit": {
                          "D": 13
                        }
                      },
                      "facts": {
                        "convention": {
                          "blackwood": true,
                          "rkcb": true
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "D"
                        },
                        "slam": {
                          "interest": true,
                          "aceAsk": {
                            "active": true,
                            "method": "rkcb-1430"
                          }
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Roman Key Card Blackwood by opener with an agreed diamond fit and slam interest; 4NT is an ace/key-card ask, not a natural notrump bid.",
                          "points": {
                            "method": "HCP",
                            "min": 18,
                            "max": 21
                          },
                          "suitLengths": [
                            {
                              "suit": "D",
                              "min": 3,
                              "max": 13
                            }
                          ]
                        }
                      }
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": false,
                      "invertedMinor": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "throughLevel": "3D",
                      "source": "inverted minor"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D",
                      "responderLength": 4
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0,
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Inverted diamond raise: 10+ HCP, 4+ diamonds, no four-card major, and forcing at least through 3♦; it is a raise, not a 2/1 new-suit game force.",
                      "points": {
                        "method": "HCP",
                        "min": 10,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 4,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    }
                  },
                  "filters": {
                    "minHcp": 10,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 4
                    },
                    "maxSuit": {
                      "D": 13,
                      "H": 3,
                      "S": 3
                    }
                  }
                },
                {
                  "id": "o1D-2C-21",
                  "trigger": "2C",
                  "children": [],
                  "meaning": "1♦–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 4
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "D",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "C",
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♦–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "facts": {
                "opening": {
                  "natural": true,
                  "strain": "D",
                  "betterMinor": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1♦ opening: 12+ points (normally 12–21 HCP) and 3+ diamonds. It normally shows 4+ diamonds, but may be three cards in a 4–4–3–2 hand with both majors.",
                  "points": {
                    "method": "HCP",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 3,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "o1H",
              "trigger": "1H",
              "meaning": "Natural 1♥ opening: 12+ points and 5+ hearts (normally 12–21 HCP); use judgment with distributional borderline hands.",
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
                  "meaning": "Forcing 1NT response to 1♥: 6–12 HCP, forcing one round by an unpassed hand, and normally denying four spades; it may conceal three-card heart support with invitational values.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 12,
                    "minSuit": {},
                    "maxSuit": {
                      "H": 3,
                      "S": 3
                    }
                  },
                  "facts": {
                    "convention": {
                      "forcingOneNotrump": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "forcing 1NT"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Forcing 1NT response to 1♥: 6–12 HCP, forcing one round by an unpassed hand, and normally denying four spades; it may conceal three-card heart support with invitational values.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 12
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1H-1S",
                  "trigger": "1S",
                  "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "one-over-one"
                    },
                    "response": {
                      "natural": true,
                      "suit": "S"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠ response: 6+ HCP and 4+ spades; natural and forcing for one round by an unpassed responder.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1H-2H",
                  "trigger": "2H",
                  "meaning": "Simple heart raise: 6–9 HCP and 3+ hearts; constructive but non-forcing and not a 2/1 response.",
                  "children": [
                    {
                      "id": "o1H-2H-2NT",
                      "trigger": "2NT",
                      "meaning": "2NT is a general game try after the simple heart raise: usually 15–17 HCP with 5+ hearts, forcing one round but not to game.",
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "major-suit game try"
                        },
                        "progress": {
                          "twoOverOne": {
                            "active": false,
                            "phase": "not-started",
                            "phaseNumber": 0
                          }
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        },
                        "gameTry": {
                          "type": "general"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "2NT is a general game try after the simple heart raise: usually 15–17 HCP with 5+ hearts, forcing one round but not to game.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 5,
                              "max": 13
                            }
                          ]
                        }
                      },
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "H": 5
                        },
                        "maxSuit": {
                          "H": 13
                        }
                      }
                    },
                    {
                      "id": "o1H-2H-3H",
                      "trigger": "3H",
                      "meaning": "Preemptive heart reraise after a simple raise: typically 12–14 HCP and 6+ hearts; non-forcing and not a control-bid sequence.",
                      "generated": null,
                      "children": [
                        {
                          "id": "o1H-2H-3H-4NT",
                          "trigger": "4NT",
                          "meaning": "Contextual RKCB after a preemptive 3♥ reraise; responder needs a maximum, exceptional controls, or substantial distributional extras. This is not a routine standard auction.",
                          "filters": {
                            "minHcp": 9,
                            "maxHcp": 12,
                            "minSuit": {
                              "H": 3
                            },
                            "maxSuit": {
                              "H": 13
                            }
                          },
                          "facts": {
                            "convention": {
                              "blackwood": true,
                              "rkcb": true
                            },
                            "fit": {
                              "confirmed": true,
                              "suit": "H"
                            },
                            "slam": {
                              "interest": true,
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430"
                              }
                            },
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Contextual RKCB after a preemptive 3♥ reraise; responder needs a maximum, exceptional controls, or substantial distributional extras. This is not a routine standard auction.",
                              "points": {
                                "method": "HCP",
                                "min": 9,
                                "max": 12
                              },
                              "suitLengths": [
                                {
                                  "suit": "H",
                                  "min": 3,
                                  "max": 13
                                }
                              ]
                            }
                          }
                        }
                      ],
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 14,
                        "minSuit": {
                          "H": 6
                        },
                        "maxSuit": {
                          "H": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        },
                        "raise": {
                          "type": "preemptive"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Preemptive heart reraise after a simple raise: typically 12–14 HCP and 6+ hearts; non-forcing and not a control-bid sequence.",
                          "points": {
                            "method": "HCP",
                            "min": 12,
                            "max": 14
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 6,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1H-2H-3S",
                      "trigger": "3S",
                      "meaning": "3♠ is a natural or help-suit game try: usually 15–17 HCP, 5+ hearts, and 4+ spades, forcing one round below game.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "H": 5,
                          "S": 4
                        },
                        "maxSuit": {
                          "H": 13,
                          "S": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "help-suit game try"
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        },
                        "gameTry": {
                          "type": "help-suit",
                          "suit": "S"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "3♠ is a natural or help-suit game try: usually 15–17 HCP, 5+ hearts, and 4+ spades, forcing one round below game.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 5,
                              "max": 13
                            },
                            {
                              "suit": "S",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1H-2H-4H",
                      "trigger": "4H",
                      "meaning": "Game signoff in hearts: normally 18–21 HCP or equivalent playing strength with 5+ hearts; it does not by itself invite slam.",
                      "filters": {
                        "minHcp": 18,
                        "maxHcp": 21,
                        "minSuit": {
                          "H": 5
                        },
                        "maxSuit": {
                          "H": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        },
                        "signoff": {
                          "contract": "4H"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Game signoff in hearts: normally 18–21 HCP or equivalent playing strength with 5+ hearts; it does not by itself invite slam.",
                          "points": {
                            "method": "HCP",
                            "min": 18,
                            "max": 21
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 5,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1H-2H-3NT",
                      "trigger": "3NT",
                      "meaning": "Natural choice-of-game offer: about 18–19 HCP, a balanced hand, and five hearts; responder may choose 3NT or 4♥.",
                      "filters": {
                        "minHcp": 18,
                        "maxHcp": 19,
                        "minSuit": {
                          "C": 2,
                          "D": 2,
                          "H": 5,
                          "S": 2
                        },
                        "maxSuit": {
                          "C": 5,
                          "D": 5,
                          "H": 5,
                          "S": 5
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": true,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        },
                        "rebid": {
                          "naturalNotrump": true,
                          "balanced": true
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Natural choice-of-game offer: about 18–19 HCP, a balanced hand, and five hearts; responder may choose 3NT or 4♥.",
                          "points": {
                            "method": "HCP",
                            "min": 18,
                            "max": 19
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "D",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "H",
                              "min": 5,
                              "max": 5
                            },
                            {
                              "suit": "S",
                              "min": 2,
                              "max": 5
                            }
                          ]
                        }
                      }
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H",
                      "responderLength": 3
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0,
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Simple heart raise: 6–9 HCP and 3+ hearts; constructive but non-forcing and not a 2/1 response.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 9
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        }
                      ]
                    }
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 9,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  }
                },
                {
                  "id": "o1H-2C",
                  "trigger": "2C",
                  "meaning": "1♥–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 4
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "children": [],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "H",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "C",
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♥–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1H-2D-21",
                  "trigger": "2D",
                  "children": [],
                  "meaning": "1♥–2♦: 12+ HCP and 4+ diamonds; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 4
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "H",
                        "responseSuit": "D",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "D",
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♥–2♦: 12+ HCP and 4+ diamonds; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "facts": {
                "opening": {
                  "natural": true,
                  "strain": "H",
                  "fiveCardMajor": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1♥ opening: 12+ points and 5+ hearts (normally 12–21 HCP); use judgment with distributional borderline hands.",
                  "points": {
                    "method": "HCP",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "H",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "o1S",
              "trigger": "1S",
              "meaning": "Natural 1♠ opening: 12+ points and 5+ spades (normally 12–21 HCP); use judgment with distributional borderline hands.",
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
                  "meaning": "Forcing 1NT response to 1♠: 6–12 HCP and forcing one round by an unpassed hand; it may contain a long suit that is not strong enough for a game-forcing 2/1 response.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 12,
                    "minSuit": {},
                    "maxSuit": {
                      "S": 3
                    }
                  },
                  "facts": {
                    "convention": {
                      "forcingOneNotrump": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "forcing 1NT"
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Forcing 1NT response to 1♠: 6–12 HCP and forcing one round by an unpassed hand; it may contain a long suit that is not strong enough for a game-forcing 2/1 response.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 12
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1S-2S",
                  "trigger": "2S",
                  "meaning": "Simple spade raise: 6–9 HCP and 3+ spades; constructive but non-forcing and not a 2/1 response.",
                  "children": [
                    {
                      "id": "o1S-2S-2NT",
                      "trigger": "2NT",
                      "meaning": "2NT is a general game try after the simple spade raise: usually 15–17 HCP with 5+ spades, forcing one round but not to game.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "S": 5
                        },
                        "maxSuit": {
                          "S": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "major-suit game try"
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "S"
                        },
                        "gameTry": {
                          "type": "general"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "2NT is a general game try after the simple spade raise: usually 15–17 HCP with 5+ spades, forcing one round but not to game.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "S",
                              "min": 5,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1S-2S-3S",
                      "trigger": "3S",
                      "meaning": "Preemptive spade reraise after a simple raise: typically 12–14 HCP and 6+ spades; non-forcing and not a control-bid sequence.",
                      "generated": null,
                      "children": [
                        {
                          "id": "o1S-2S-3S-4NT",
                          "trigger": "4NT",
                          "meaning": "Contextual RKCB after a preemptive 3♠ reraise; responder needs a maximum, exceptional controls, or substantial distributional extras. This is not a routine standard auction.",
                          "facts": {
                            "convention": {
                              "blackwood": true,
                              "rkcb": true
                            },
                            "slam": {
                              "interest": true,
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430",
                                "interference": "D0P1",
                                "accelerated": false,
                                "type": "keycard"
                              }
                            },
                            "progress": {
                              "twoOverOne": {
                                "phase": "slam-pursuit",
                                "phaseNumber": 4
                              }
                            },
                            "fit": {
                              "confirmed": true,
                              "suit": "S"
                            },
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Contextual RKCB after a preemptive 3♠ reraise; responder needs a maximum, exceptional controls, or substantial distributional extras. This is not a routine standard auction.",
                              "points": {
                                "method": "HCP",
                                "min": 9,
                                "max": 12
                              },
                              "suitLengths": [
                                {
                                  "suit": "S",
                                  "min": 3,
                                  "max": 13
                                }
                              ]
                            }
                          },
                          "filters": {
                            "minHcp": 9,
                            "maxHcp": 12,
                            "minSuit": {
                              "S": 3
                            },
                            "maxSuit": {
                              "S": 13
                            }
                          }
                        }
                      ],
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 14,
                        "minSuit": {
                          "S": 6
                        },
                        "maxSuit": {
                          "S": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "S"
                        },
                        "raise": {
                          "type": "preemptive"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Preemptive spade reraise after a simple raise: typically 12–14 HCP and 6+ spades; non-forcing and not a control-bid sequence.",
                          "points": {
                            "method": "HCP",
                            "min": 12,
                            "max": 14
                          },
                          "suitLengths": [
                            {
                              "suit": "S",
                              "min": 6,
                              "max": 13
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "o1S-2S-3C",
                      "trigger": "3C",
                      "meaning": "3♣ is a natural or help-suit game try: usually 15–17 HCP, 5+ spades, and 4+ clubs, forcing one round below game.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "C": 4,
                          "S": 5
                        },
                        "maxSuit": {
                          "C": 13,
                          "S": 13
                        }
                      },
                      "facts": {
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "help-suit game try"
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "S"
                        },
                        "gameTry": {
                          "type": "help-suit",
                          "suit": "C"
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "3♣ is a natural or help-suit game try: usually 15–17 HCP, 5+ spades, and 4+ clubs, forcing one round below game.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 4,
                              "max": 13
                            },
                            {
                              "suit": "S",
                              "min": 5,
                              "max": 13
                            }
                          ]
                        }
                      }
                    }
                  ],
                  "facts": {
                    "convention": {
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S",
                      "responderLength": 3
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0,
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Simple spade raise: 6–9 HCP and 3+ spades; constructive but non-forcing and not a 2/1 response.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 9
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        }
                      ]
                    }
                  },
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 9,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  }
                },
                {
                  "id": "o1S-2C",
                  "trigger": "2C",
                  "meaning": "1♠–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 4
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "children": [],
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "C",
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠–2♣: 12+ HCP and 4+ clubs; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1S-2D-21",
                  "trigger": "2D",
                  "children": [],
                  "meaning": "1♠–2♦: 12+ HCP and 4+ diamonds; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 4
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "D",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "D",
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠–2♦: 12+ HCP and 4+ diamonds; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "o1S-2H-21",
                  "trigger": "2H",
                  "children": [],
                  "meaning": "1♠–2♥: 12+ HCP and 5+ hearts; an uncontested, unpassed-hand 2/1 response that forces to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 5
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "H",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                    },
                    "response": {
                      "natural": true,
                      "suit": "H",
                      "minimumLength": 5
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "1♠–2♥: 12+ HCP and 5+ hearts; an uncontested, unpassed-hand 2/1 response that forces to game.",
                      "points": {
                        "method": "HCP",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "facts": {
                "opening": {
                  "natural": true,
                  "strain": "S",
                  "fiveCardMajor": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1♠ opening: 12+ points and 5+ spades (normally 12–21 HCP); use judgment with distributional borderline hands.",
                  "points": {
                    "method": "HCP",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "S",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "o1NT",
              "trigger": "1NT",
              "meaning": "Natural 1NT opening: 15–17 HCP and balanced, normally 4–3–3–3, 4–4–3–2, or 5–3–3–2; no singleton, void, or six-card suit.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 15,
                "maxHcp": 17,
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                },
                "minSuit": {
                  "C": 2,
                  "D": 2,
                  "H": 2,
                  "S": 2
                }
              },
              "children": [
                {
                  "id": "nt2C",
                  "trigger": "2C",
                  "meaning": "Stayman: normally 8+ HCP with at least one four-card major, asking opener to show a four-card major; artificial and forcing for one round.",
                  "facts": {
                    "convention": {
                      "stayman": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "Stayman"
                    },
                    "shapeAsk": {
                      "majors": true,
                      "minimumLength": 4
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Stayman: normally 8+ HCP with at least one four-card major, asking opener to show a four-card major; artificial and forcing for one round.",
                      "points": {
                        "method": "HCP",
                        "min": 8,
                        "max": 40
                      },
                      "suitLengths": [],
                      "suitLengthAlternatives": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    }
                  },
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 40,
                    "suitLengthAlternatives": [
                      {
                        "suit": "H",
                        "min": 4,
                        "max": 13
                      },
                      {
                        "suit": "S",
                        "min": 4,
                        "max": 13
                      }
                    ]
                  },
                  "children": [
                    {
                      "id": "nt2C-2D",
                      "trigger": "2D",
                      "meaning": "Stayman response: 15–17 HCP, balanced, and no four-card major.",
                      "children": [],
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "C": 2,
                          "D": 2,
                          "H": 2,
                          "S": 2
                        },
                        "maxSuit": {
                          "C": 5,
                          "D": 5,
                          "H": 3,
                          "S": 3
                        }
                      },
                      "facts": {
                        "convention": {
                          "stayman": true
                        },
                        "response": {
                          "deniesFourCardMajor": true
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman response: 15–17 HCP, balanced, and no four-card major.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "D",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "H",
                              "min": 2,
                              "max": 3
                            },
                            {
                              "suit": "S",
                              "min": 2,
                              "max": 3
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "nt2C-2H",
                      "trigger": "2H",
                      "meaning": "Stayman response: 15–17 HCP, balanced, and 4+ hearts; with both majors, this system shows hearts first.",
                      "children": [],
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "C": 2,
                          "D": 2,
                          "H": 4,
                          "S": 2
                        },
                        "maxSuit": {
                          "C": 5,
                          "D": 5,
                          "H": 5,
                          "S": 5
                        }
                      },
                      "facts": {
                        "convention": {
                          "stayman": true
                        },
                        "response": {
                          "showsMajor": "H",
                          "minimumLength": 4
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman response: 15–17 HCP, balanced, and 4+ hearts; with both majors, this system shows hearts first.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "D",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "H",
                              "min": 4,
                              "max": 5
                            },
                            {
                              "suit": "S",
                              "min": 2,
                              "max": 5
                            }
                          ]
                        }
                      }
                    },
                    {
                      "id": "nt2C-2S",
                      "trigger": "2S",
                      "meaning": "Stayman response: 15–17 HCP, balanced, 4+ spades, and fewer than four hearts.",
                      "children": [],
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "C": 2,
                          "D": 2,
                          "H": 2,
                          "S": 4
                        },
                        "maxSuit": {
                          "C": 5,
                          "D": 5,
                          "H": 3,
                          "S": 5
                        }
                      },
                      "facts": {
                        "convention": {
                          "stayman": true
                        },
                        "response": {
                          "showsMajor": "S",
                          "minimumLength": 4,
                          "deniesFourHearts": true
                        },
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman response: 15–17 HCP, balanced, 4+ spades, and fewer than four hearts.",
                          "points": {
                            "method": "HCP",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "D",
                              "min": 2,
                              "max": 5
                            },
                            {
                              "suit": "H",
                              "min": 2,
                              "max": 3
                            },
                            {
                              "suit": "S",
                              "min": 4,
                              "max": 5
                            }
                          ]
                        }
                      }
                    }
                  ]
                },
                {
                  "id": "nt2D",
                  "trigger": "2D",
                  "meaning": "Jacoby transfer to hearts: 0+ HCP and 5+ hearts; artificial and forcing opener to bid 2♥ under normal conditions.",
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 5
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "transfer": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "Jacoby transfer"
                    },
                    "transfer": {
                      "targetSuit": "H",
                      "minimumLength": 5
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to hearts: 0+ HCP and 5+ hearts; artificial and forcing opener to bid 2♥ under normal conditions.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "nt2H",
                  "trigger": "2H",
                  "meaning": "Jacoby transfer to spades: 0+ HCP and 5+ spades; artificial and forcing opener to bid 2♠ under normal conditions.",
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40,
                    "minSuit": {
                      "S": 5
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "convention": {
                      "transfer": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "Jacoby transfer"
                    },
                    "transfer": {
                      "targetSuit": "S",
                      "minimumLength": 5
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to spades: 0+ HCP and 5+ spades; artificial and forcing opener to bid 2♠ under normal conditions.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "facts": {
                "opening": {
                  "strain": "NT",
                  "natural": true,
                  "balanced": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1NT opening: 15–17 HCP and balanced, normally 4–3–3–3, 4–4–3–2, or 5–3–3–2; no singleton, void, or six-card suit.",
                  "points": {
                    "method": "HCP",
                    "min": 15,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "D",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "H",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "S",
                      "min": 2,
                      "max": 5
                    }
                  ]
                }
              }
            },
            {
              "id": "twoone-2C",
              "trigger": "2C",
              "meaning": "Strong artificial 2♣ opening: normally 22+ HCP if balanced, or an unbalanced hand with equivalent game-going playing strength; no club length is promised.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 22,
                "maxHcp": 40,
                "minSuit": {},
                "maxSuit": {}
              },
              "children": [],
              "facts": {
                "convention": {
                  "strongTwoClubs": true,
                  "artificial": true
                },
                "forcing": {
                  "game": false,
                  "round": true,
                  "source": "strong 2C"
                },
                "opening": {
                  "strain": "C",
                  "natural": false
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Strong artificial 2♣ opening: normally 22+ HCP if balanced, or an unbalanced hand with equivalent game-going playing strength; no club length is promised.",
                  "points": {
                    "method": "HCP",
                    "min": 22,
                    "max": 40
                  },
                  "suitLengths": []
                }
              }
            },
            {
              "id": "twoone-2NT",
              "trigger": "2NT",
              "meaning": "Natural 2NT opening: 20–21 HCP and balanced, normally 4–3–3–3, 4–4–3–2, or 5–3–3–2.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 20,
                "maxHcp": 21,
                "minSuit": {
                  "C": 2,
                  "D": 2,
                  "H": 2,
                  "S": 2
                },
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "children": [],
              "facts": {
                "opening": {
                  "strain": "NT",
                  "natural": true,
                  "balanced": true
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 2NT opening: 20–21 HCP and balanced, normally 4–3–3–3, 4–4–3–2, or 5–3–3–2.",
                  "points": {
                    "method": "HCP",
                    "min": 20,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "D",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "H",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "S",
                      "min": 2,
                      "max": 5
                    }
                  ]
                }
              }
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
                  "meaning": "Preemptive 3♣ opening: 6–10 HCP and exactly seven clubs in this system's level-by-length ladder; vulnerability and suit quality matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "C"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3♣ opening: 6–10 HCP and exactly seven clubs in this system's level-by-length ladder; vulnerability and suit quality matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-4C",
                  "trigger": "4C",
                  "meaning": "Preemptive 4♣ opening: 6–10 HCP and 8+ clubs in this system's level-by-length ladder; vulnerability and playing strength matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "C"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4♣ opening: 6–10 HCP and 8+ clubs in this system's level-by-length ladder; vulnerability and playing strength matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "reference": {
                "structuralContainer": true,
                "pointRange": "not applicable",
                "suitLength": "not applicable"
              }
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
                  "meaning": "Weak 2D opening: typically 5–11 HCP and exactly six diamonds; suit quality, seat, and vulnerability matter.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 11,
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
                  },
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "D"
                    },
                    "suitQuality": {
                      "disciplined": true
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak 2D opening: typically 5–11 HCP and exactly six diamonds; suit quality, seat, and vulnerability matter.",
                      "points": {
                        "method": "HCP",
                        "min": 5,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-3D",
                  "trigger": "3D",
                  "meaning": "Preemptive 3D opening: 6–10 HCP and exactly seven diamonds in this system's level-by-length ladder; vulnerability and suit quality matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "D"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3D opening: 6–10 HCP and exactly seven diamonds in this system's level-by-length ladder; vulnerability and suit quality matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-4D",
                  "trigger": "4D",
                  "meaning": "Preemptive 4D opening: 6–10 HCP and 8+ diamonds in this system's level-by-length ladder; vulnerability and playing strength matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "D"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4D opening: 6–10 HCP and 8+ diamonds in this system's level-by-length ladder; vulnerability and playing strength matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "reference": {
                "structuralContainer": true,
                "pointRange": "not applicable",
                "suitLength": "not applicable"
              }
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
                  "meaning": "Weak 2H opening: typically 5–11 HCP and exactly six hearts; suit quality, seat, and vulnerability matter.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 11,
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
                  },
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "H"
                    },
                    "suitQuality": {
                      "disciplined": true
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak 2H opening: typically 5–11 HCP and exactly six hearts; suit quality, seat, and vulnerability matter.",
                      "points": {
                        "method": "HCP",
                        "min": 5,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-3H",
                  "trigger": "3H",
                  "meaning": "Preemptive 3H opening: 6–10 HCP and exactly seven hearts in this system's level-by-length ladder; vulnerability and suit quality matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "H"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3H opening: 6–10 HCP and exactly seven hearts in this system's level-by-length ladder; vulnerability and suit quality matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-4H",
                  "trigger": "4H",
                  "meaning": "Preemptive 4H opening: 6–10 HCP and 8+ hearts in this system's level-by-length ladder; vulnerability and playing strength matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "H"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4H opening: 6–10 HCP and 8+ hearts in this system's level-by-length ladder; vulnerability and playing strength matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "reference": {
                "structuralContainer": true,
                "pointRange": "not applicable",
                "suitLength": "not applicable"
              }
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
                  "meaning": "Weak 2S opening: typically 5–11 HCP and exactly six spades; suit quality, seat, and vulnerability matter.",
                  "filters": {
                    "auctionRole": "opening",
                    "minHcp": 5,
                    "maxHcp": 11,
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
                  },
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "S"
                    },
                    "suitQuality": {
                      "disciplined": true
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak 2S opening: typically 5–11 HCP and exactly six spades; suit quality, seat, and vulnerability matter.",
                      "points": {
                        "method": "HCP",
                        "min": 5,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-3S",
                  "trigger": "3S",
                  "meaning": "Preemptive 3S opening: 6–10 HCP and exactly seven spades in this system's level-by-length ladder; vulnerability and suit quality matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "S"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3S opening: 6–10 HCP and exactly seven spades in this system's level-by-length ladder; vulnerability and suit quality matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "twoone-4S",
                  "trigger": "4S",
                  "meaning": "Preemptive 4S opening: 6–10 HCP and 8+ spades in this system's level-by-length ladder; vulnerability and playing strength matter.",
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
                  "children": [],
                  "facts": {
                    "opening": {
                      "preemptive": true,
                      "strain": "S"
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4S opening: 6–10 HCP and 8+ spades in this system's level-by-length ladder; vulnerability and playing strength matter.",
                      "points": {
                        "method": "HCP",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "reference": {
                "structuralContainer": true,
                "pointRange": "not applicable",
                "suitLength": "not applicable"
              }
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
              "meaning": "Roman Key Card Blackwood (1430) after a trump suit is agreed: 4NT asks for the four aces plus the trump king; it has no independent HCP or natural suit-length range.",
              "children": [
                {
                  "id": "rkcb-5C",
                  "trigger": "5C",
                  "meaning": "RKCB 1430 response: 1 or 4 key cards; the bid has no independent HCP or club-length promise.",
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5C",
                        "keycards": [
                          1,
                          4
                        ]
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: 1 or 4 key cards; the bid has no independent HCP or club-length promise.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": []
                    }
                  },
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40
                  }
                },
                {
                  "id": "rkcb-5D",
                  "trigger": "5D",
                  "meaning": "RKCB 1430 response: 0 or 3 key cards; the bid has no independent HCP or diamond-length promise.",
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          0,
                          3
                        ]
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: 0 or 3 key cards; the bid has no independent HCP or diamond-length promise.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": []
                    }
                  },
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40
                  }
                },
                {
                  "id": "rkcb-5H",
                  "trigger": "5H",
                  "meaning": "RKCB 1430 response: 2 key cards without the trump queen; the bid has no independent HCP or heart-length promise.",
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2
                        ],
                        "trumpQueen": false
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: 2 key cards without the trump queen; the bid has no independent HCP or heart-length promise.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": []
                    }
                  },
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40
                  }
                },
                {
                  "id": "rkcb-5S",
                  "trigger": "5S",
                  "meaning": "RKCB 1430 response: 2 key cards with the trump queen; the bid has no independent HCP or spade-length promise.",
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5S",
                        "keycards": [
                          2
                        ],
                        "trumpQueen": true
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: 2 key cards with the trump queen; the bid has no independent HCP or spade-length promise.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": []
                    }
                  },
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40
                  }
                },
                {
                  "id": "rkcb-5NT",
                  "trigger": "5NT",
                  "meaning": "Grand-slam try after RKCB: 5NT confirms possession of all key cards and asks for specific kings; it has no natural notrump range.",
                  "facts": {
                    "convention": {
                      "blackwood": true,
                      "rkcb": true
                    },
                    "slam": {
                      "kingAsk": {
                        "active": true,
                        "method": "specific-king"
                      }
                    },
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Grand-slam try after RKCB: 5NT confirms possession of all key cards and asks for specific kings; it has no natural notrump range.",
                      "points": {
                        "method": "HCP",
                        "min": 0,
                        "max": 40
                      },
                      "suitLengths": []
                    }
                  },
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 40
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual",
                "minHcp": 0,
                "maxHcp": 40
              },
              "facts": {
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                },
                "progress": {
                  "twoOverOne": {
                    "phase": "slam-pursuit",
                    "phaseNumber": 4
                  }
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Roman Key Card Blackwood (1430) after a trump suit is agreed: 4NT asks for the four aces plus the trump king; it has no independent HCP or natural suit-length range.",
                  "points": {
                    "method": "HCP",
                    "min": 0,
                    "max": 40
                  },
                  "suitLengths": []
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
              "meaning": "Takeout double of a low-level suit opening: approximately opening values (12+ total points) with support for the unbid suits, or 18+ strength with a hand too strong for a simple overcall.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C",
                "minHcp": 12,
                "maxHcp": 40,
                "suitLengthAlternatives": [
                  {
                    "description": "Usually 3+ cards in every unbid suit, preferably four cards in each unbid major."
                  }
                ]
              },
              "facts": {
                "convention": {
                  "takeoutDouble": true
                },
                "forcing": {
                  "game": false,
                  "round": true,
                  "source": "takeout double"
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Takeout double of a low-level suit opening: approximately opening values (12+ total points) with support for the unbid suits, or 18+ strength with a hand too strong for a simple overcall.",
                  "points": {
                    "method": "HCP",
                    "min": 12,
                    "max": 40
                  },
                  "suitLengths": [],
                  "suitLengthAlternatives": [
                    {
                      "description": "Usually 3+ cards in every unbid suit, preferably four cards in each unbid major."
                    }
                  ]
                }
              }
            },
            {
              "id": "cXX",
              "trigger": "XX",
              "meaning": "Strength-showing redouble after an opposing takeout double: normally 10+ HCP, interest in penalizing the opponents, and no particular suit length promised.",
              "filters": {
                "auctionRole": "contextual",
                "minHcp": 10,
                "maxHcp": 40,
                "minSuit": {},
                "maxSuit": {}
              },
              "facts": {
                "convention": {
                  "strengthRedouble": true
                },
                "forcing": {
                  "game": false,
                  "round": true,
                  "source": "redouble"
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Strength-showing redouble after an opposing takeout double: normally 10+ HCP, interest in penalizing the opponents, and no particular suit length promised.",
                  "points": {
                    "method": "HCP",
                    "min": 10,
                    "max": 40
                  },
                  "suitLengths": []
                }
              }
            },
            {
              "id": "oc1C",
              "trigger": "1C",
              "meaning": "Natural one-level club overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
              "filters": {
                "auctionRole": "contextual",
                "minHcp": 8,
                "maxHcp": 17,
                "minSuit": {
                  "C": 5
                },
                "maxSuit": {
                  "C": 13
                }
              },
              "facts": {
                "overcall": {
                  "natural": true,
                  "suit": "C",
                  "minimumLength": 5
                },
                "forcing": {
                  "game": false,
                  "round": false
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural one-level club overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
                  "points": {
                    "method": "HCP",
                    "min": 8,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "oc1D",
              "trigger": "1D",
              "meaning": "Natural one-level diamond overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C",
                "minHcp": 8,
                "maxHcp": 17,
                "minSuit": {
                  "D": 5
                },
                "maxSuit": {
                  "D": 13
                }
              },
              "facts": {
                "overcall": {
                  "natural": true,
                  "suit": "D",
                  "minimumLength": 5
                },
                "forcing": {
                  "game": false,
                  "round": false
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural one-level diamond overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
                  "points": {
                    "method": "HCP",
                    "min": 8,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "oc1H",
              "trigger": "1H",
              "meaning": "Natural one-level heart overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C",
                "minHcp": 8,
                "maxHcp": 17,
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
                }
              },
              "facts": {
                "overcall": {
                  "natural": true,
                  "suit": "H",
                  "minimumLength": 5
                },
                "forcing": {
                  "game": false,
                  "round": false
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural one-level heart overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
                  "points": {
                    "method": "HCP",
                    "min": 8,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "H",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
              }
            },
            {
              "id": "oc1S",
              "trigger": "1S",
              "meaning": "Natural one-level spade overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1C",
                "minHcp": 8,
                "maxHcp": 17,
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
                }
              },
              "facts": {
                "overcall": {
                  "natural": true,
                  "suit": "S",
                  "minimumLength": 5
                },
                "forcing": {
                  "game": false,
                  "round": false
                },
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural one-level spade overcall: typically 8–17 HCP and a good 5+ card suit; vulnerability and suit quality affect the lower end.",
                  "points": {
                    "method": "HCP",
                    "min": 8,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "S",
                      "min": 5,
                      "max": 13
                    }
                  ]
                }
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
            "min": 5,
            "max": 11
          },
          "suitLengthRange": {
            "min": 6,
            "max": 6
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
        "source": "Bridge World Standard 2017 and ACBL 2/1/SAYC teaching references; partnership agreements may vary.",
        "summary": "Modern 2/1 GF baseline: 12–21 one-level suit openings, five-card majors, three-card better minors, 15–17 1NT, 20–21 2NT, strong artificial 2C, and disciplined weak twos.",
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
              "min": 5,
              "max": 11
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
        "version": "1.2",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{m}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.level}}",
          "{{call.strain}}",
          "{{call.suit}}",
          "{{seat}}",
          "{{side}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.2",
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
        },
        "slam": {
          "interest": false,
          "control": {
            "active": false,
            "available": false
          }
        },
        "progress": {
          "controlBidding": {
            "active": false
          },
          "twoOverOne": {
            "active": false,
            "phase": "not-started",
            "phaseNumber": 0,
            "fitConfirmed": false,
            "gameForceSatisfied": false
          }
        }
      },
      "referenceRevision": "2026-09-11",
      "referenceSources": [
        {
          "title": "Bridge World Standard 2017",
          "url": "https://www.bridgeworld.com/pages/readingroom/bws/bwscompletesystem.html",
          "usedFor": "Five-card majors, 15–17 1NT, 20–weak-22 2NT family, game-forcing 2/1, semiforcing/forcing-notrump structure, inverted minor-style raises, and major-raise continuations."
        },
        {
          "title": "ACBL — Introduction to Two-Over-One Game Forcing",
          "url": "https://cdn.acbl.org/assets/documents/teachers/Major-Suit-Raises-II-TM.pdf",
          "usedFor": "Opening-strength two-level new-suit responses, forcing 1NT, uncontested/unpassed-hand applicability, and forcing progression to game."
        },
        {
          "title": "ACBL Standard American Yellow Card System Booklet",
          "url": "https://web2.acbl.org/documentlibrary/play/SP3%20%28bk%29%20single%20pages.pdf",
          "usedFor": "Base opening ranges, three-card minors, five-card majors, Stayman, Jacoby transfers, strong 2C, 20–21 2NT, and weak-two shape."
        },
        {
          "title": "ACBL — Jacoby 2NT",
          "url": "https://web2.acbl.org/documentLibrary/play/Commonly_Used_Conventions/Commonly_Used_Conventions.pdf",
          "usedFor": "Standard major-suit raise ranges and trump lengths."
        }
      ]
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
      "schemaVersion": "1.4",
      "systemId": "personal-fg",
      "systemName": "Personal FG 2/1 v0.5",
      "description": "FG 2/1 bidding system populated from the 30-minute workbook with executable point, suit-length, alert, and persistent-fact data.",
      "notes": "Point values follow the workbook's HCP-plus-shape convention. Workbook text is treated as reference data. Phase I enters 2/1, Phase II selects and confirms strain, Phase III shows controls, and the game force completes only at a game contract.",
      "conventions": [
        {
          "id": "fg-opening",
          "name": "Opening and major opening control",
          "children": [
            {
              "id": "fg1C",
              "trigger": "1C",
              "meaning": "Natural 1C: 12–20 points, 3+ clubs, at most two diamonds, and no five-card major.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 12,
                "maxHcp": 20,
                "minSuit": {
                  "C": 3
                },
                "maxSuit": {
                  "C": 13,
                  "D": 2,
                  "H": 4,
                  "S": 4
                }
              },
              "children": [
                {
                  "id": "fg1C-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response: 6–10 points, balanced or short of club support; invitational in this structure.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 10
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response: 6–10 points, balanced or short of club support; invitational in this structure.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "convention": {
                      "naturalNotrump": true
                    }
                  }
                },
                {
                  "id": "fg1C-2C",
                  "trigger": "2C",
                  "meaning": "Inverted club raise: 12+ points and 4+ clubs; forcing for one round.",
                  "children": [
                    {
                      "id": "fg1C-2C-2D",
                      "trigger": "2D",
                      "meaning": "Opener confirms shape or distribution.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener confirms shape or distribution.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg1C-2C-2H",
                      "trigger": "2H",
                      "meaning": "Transfer-style response or major support.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Transfer-style response or major support.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg1C-2C-2S",
                      "trigger": "2S",
                      "meaning": "Transfer-style response or major support.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Transfer-style response or major support.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg1C-2C-2NT",
                      "trigger": "2NT",
                      "meaning": "Balanced confirmation.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Balanced confirmation.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 4
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Inverted club raise: 12+ points and 4+ clubs; forcing for one round.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "invertedMinor": true
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "inverted minor"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C",
                      "responderLength": 4,
                      "combinedMinimum": 7
                    }
                  }
                },
                {
                  "id": "fg1C-1X",
                  "trigger": "1X",
                  "meaning": "One-level new-suit response: 6+ points and 4+ cards in the new suit; forcing for one round.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 40,
                    "minSuit": {
                      "X": 4
                    },
                    "maxSuit": {
                      "X": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "One-level new-suit response: 6+ points and 4+ cards in the new suit; forcing for one round.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "{{X}}",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "new suit"
                    }
                  },
                  "children": [
                    {
                      "id": "fg1C-1X-1NT",
                      "trigger": "1NT",
                      "meaning": "Opener rebids 1NT with 12.5–14 points and no four-card fit for responder's suit.",
                      "filters": {
                        "minHcp": 12.5,
                        "maxHcp": 14,
                        "maxSuit": {
                          "X": 3
                        }
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener rebids 1NT with 12.5–14 points and no four-card fit for responder's suit.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 12.5,
                            "max": 14
                          },
                          "suitLengths": [
                            {
                              "suit": "{{X}}",
                              "min": 0,
                              "max": 3
                            }
                          ]
                        },
                        "convention": {
                          "naturalNotrump": true
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false
                    },
                    {
                      "id": "fg1C-1X-P",
                      "trigger": "P",
                      "meaning": "Opener passes only with a dead minimum and no constructive rebid.",
                      "filters": {
                        "minHcp": 12,
                        "maxHcp": 12.5
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener passes only with a dead minimum and no constructive rebid.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 12,
                            "max": 12.5
                          },
                          "suitLengths": []
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        }
                      },
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-1X-new-suit",
                      "trigger": "#Y",
                      "meaning": "Opener rebids a second suit with 15–17 points.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "Y": 4
                        },
                        "maxSuit": {
                          "Y": 13
                        }
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener rebids a second suit with 15–17 points.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "{{Y}}",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        },
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "new suit rebid"
                        }
                      },
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1C-1X-2NT",
                      "trigger": "2NT",
                      "meaning": "Opener rebids 2NT with 18–19 points.",
                      "filters": {
                        "minHcp": 18,
                        "maxHcp": 19
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener rebids 2NT with 18–19 points.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 18,
                            "max": 19
                          },
                          "suitLengths": []
                        },
                        "convention": {
                          "naturalNotrump": true
                        }
                      },
                      "children": [],
                      "alert": false
                    }
                  ],
                  "generated": null,
                  "alert": false
                },
                {
                  "id": "fg1C-3C",
                  "trigger": "3C",
                  "meaning": "Weak club raise: 6–11 points and 5+ clubs.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak club raise: 6–11 points and 5+ clubs.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C",
                      "responderLength": 5,
                      "combinedMinimum": 8
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "generated": null,
                  "alert": false
                },
                {
                  "id": "fg1C-2D-weak-jump",
                  "trigger": "2D",
                  "meaning": "Weak jump response: 6–11 points and 6+ diamonds.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak jump response: 6–11 points and 6+ diamonds.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "weakJump": true
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-2H-weak-jump",
                  "trigger": "2H",
                  "meaning": "Weak jump response: 6–11 points and 6+ hearts.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "H": 6
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak jump response: 6–11 points and 6+ hearts.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "weakJump": true
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-2S-weak-jump",
                  "trigger": "2S",
                  "meaning": "Weak jump response: 6–11 points and 6+ spades.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "S": 6
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak jump response: 6–11 points and 6+ spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "weakJump": true
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-2NT",
                  "trigger": "2NT",
                  "meaning": "Natural 2NT response: 11–12 points, balanced or short of club support; invitational.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 12
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 2NT response: 11–12 points, balanced or short of club support; invitational.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 12
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "naturalNotrump": true
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1C-splinter-3D",
                  "trigger": "3D",
                  "meaning": "3D splinter: 11–14 points, 5+ C, and zero or one D.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "D": 1,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3D splinter: 11–14 points, 5+ C, and zero or one D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "D",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1C-splinter-3H",
                  "trigger": "3H",
                  "meaning": "3H splinter: 11–14 points, 5+ C, and zero or one H.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "H": 1,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3H splinter: 11–14 points, 5+ C, and zero or one H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "H",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1C-splinter-3S",
                  "trigger": "3S",
                  "meaning": "3S splinter: 11–14 points, 5+ C, and zero or one S.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "S": 1,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3S splinter: 11–14 points, 5+ C, and zero or one S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "S",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1C-exclusion-4D",
                  "trigger": "4D",
                  "meaning": "4D Exclusion RKCB: confirms C, shows a void in D, and asks for key cards outside D.",
                  "filters": {
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "D": 0,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4D Exclusion RKCB: confirms C, shows a void in D, and asks for key cards outside D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "D",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "C",
                        "excludedSuit": "D",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "C"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1C-exclusion-4H",
                  "trigger": "4H",
                  "meaning": "4H Exclusion RKCB: confirms C, shows a void in H, and asks for key cards outside H.",
                  "filters": {
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "H": 0,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4H Exclusion RKCB: confirms C, shows a void in H, and asks for key cards outside H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "H",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "C",
                        "excludedSuit": "H",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "C"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1C-exclusion-4S",
                  "trigger": "4S",
                  "meaning": "4S Exclusion RKCB: confirms C, shows a void in S, and asks for key cards outside S.",
                  "filters": {
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "S": 0,
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4S Exclusion RKCB: confirms C, shows a void in S, and asks for key cards outside S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "C"
                    },
                    "shortness": {
                      "suit": "S",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "C",
                        "excludedSuit": "S",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "C"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1C: 12–20 points, 3+ clubs, at most two diamonds, and no five-card major.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 12,
                    "max": 20
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 3,
                      "max": 13
                    },
                    {
                      "suit": "D",
                      "min": 0,
                      "max": 2
                    },
                    {
                      "suit": "H",
                      "min": 0,
                      "max": 4
                    },
                    {
                      "suit": "S",
                      "min": 0,
                      "max": 4
                    }
                  ]
                },
                "convention": {
                  "natural": true
                },
                "opening": {
                  "suit": "C"
                }
              }
            },
            {
              "id": "fg1D",
              "trigger": "1D",
              "meaning": "Natural 1D: 12–20 points and 3+ diamonds.",
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
                  "meaning": "Natural 1H response: 6–11 points and 4+ hearts.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "H": 4
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1H response: 6–11 points and 4+ hearts.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "round": true,
                      "game": false,
                      "source": "new suit"
                    }
                  }
                },
                {
                  "id": "fg1D-1S",
                  "trigger": "1S",
                  "meaning": "Natural 1S response: 6–11 points and 4+ spades.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1S response: 6–11 points and 4+ spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "round": true,
                      "game": false,
                      "source": "new suit"
                    }
                  }
                },
                {
                  "id": "fg1D-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response: 6–11 points without a preferred four-card major; not a 2/1 entry.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "maxSuit": {
                      "H": 3,
                      "S": 3
                    }
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response: 6–11 points without a preferred four-card major; not a 2/1 entry.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    },
                    "convention": {
                      "naturalNotrump": true,
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  }
                },
                {
                  "id": "fg1D-2C-21",
                  "trigger": "2C",
                  "meaning": "Artificial 2/1 entry over 1D: 12+ points; the club suit may be phantom, and the partnership is forced to game.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Artificial 2/1 entry over 1D: 12+ points; the club suit may be phantom, and the partnership is forced to game.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "D",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1D-2D",
                  "trigger": "2D",
                  "meaning": "Invitational diamond raise: 9–11 points and 5+ diamonds; not a 2/1 entry.",
                  "generated": null,
                  "children": [
                    {
                      "id": "fg1D-2D-4NT",
                      "trigger": "4NT",
                      "meaning": "Ace/king check after at least one control phase.",
                      "clearControl": true,
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Ace/king check after at least one control phase.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {
                    "minHcp": 9,
                    "maxHcp": 11,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Invitational diamond raise: 9–11 points and 5+ diamonds; not a 2/1 entry.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 9,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D",
                      "responderLength": 5,
                      "combinedMinimum": 8
                    }
                  }
                },
                {
                  "id": "fg1D-3D",
                  "trigger": "3D",
                  "meaning": "Weak diamond raise: 6–8 points and 5+ diamonds.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 8,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Weak diamond raise: 6–8 points and 5+ diamonds.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 8
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D",
                      "responderLength": 5,
                      "combinedMinimum": 8
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1D-splinter-4C",
                  "trigger": "4C",
                  "meaning": "4C splinter: 11–14 points, 5+ D, and zero or one C.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "C": 1,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4C splinter: 11–14 points, 5+ D, and zero or one C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "C",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1D-splinter-3H",
                  "trigger": "3H",
                  "meaning": "3H splinter: 11–14 points, 5+ D, and zero or one H.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "H": 1,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3H splinter: 11–14 points, 5+ D, and zero or one H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "H",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1D-splinter-3S",
                  "trigger": "3S",
                  "meaning": "3S splinter: 11–14 points, 5+ D, and zero or one S.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "S": 1,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3S splinter: 11–14 points, 5+ D, and zero or one S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "S",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1D-exclusion-5C",
                  "trigger": "5C",
                  "meaning": "5C Exclusion RKCB: confirms D, shows a void in C, and asks for key cards outside C.",
                  "filters": {
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "C": 0,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5C Exclusion RKCB: confirms D, shows a void in C, and asks for key cards outside C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "C",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "D",
                        "excludedSuit": "C",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "D"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1D-exclusion-4H",
                  "trigger": "4H",
                  "meaning": "4H Exclusion RKCB: confirms D, shows a void in H, and asks for key cards outside H.",
                  "filters": {
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "H": 0,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4H Exclusion RKCB: confirms D, shows a void in H, and asks for key cards outside H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "H",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "D",
                        "excludedSuit": "H",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "D"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1D-exclusion-4S",
                  "trigger": "4S",
                  "meaning": "4S Exclusion RKCB: confirms D, shows a void in S, and asks for key cards outside S.",
                  "filters": {
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "S": 0,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4S Exclusion RKCB: confirms D, shows a void in S, and asks for key cards outside S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "D"
                    },
                    "shortness": {
                      "suit": "S",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "D",
                        "excludedSuit": "S",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "D"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1D: 12–20 points and 3+ diamonds.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 12,
                    "max": 20
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 3,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "natural": true
                },
                "opening": {
                  "suit": "D"
                }
              }
            },
            {
              "id": "fg1H",
              "trigger": "1H",
              "meaning": "Natural 1H: 12–21 points and 5+ hearts.",
              "children": [
                {
                  "id": "fg1H-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response: 6–11 points with fewer than four spades; cannot enter 2/1.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "maxSuit": {
                      "S": 3
                    }
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response: 6–11 points with fewer than four spades; cannot enter 2/1.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    },
                    "convention": {
                      "naturalNotrump": true,
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  }
                },
                {
                  "id": "fg1H-2H",
                  "trigger": "2H",
                  "meaning": "Simple heart raise: 6–8 points and exactly three hearts; not a 2/1 entry.",
                  "children": [
                    {
                      "id": "fg1H-2H-2NT",
                      "trigger": "2NT",
                      "meaning": "Opener's 2NT game try after a simple heart raise; the auction is invitational, not game forcing.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17
                      },
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener's 2NT game try after a simple heart raise; the auction is invitational, not game forcing.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": []
                        },
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "game try"
                        }
                      }
                    },
                    {
                      "id": "fg1H-2H-3H",
                      "trigger": "3H",
                      "meaning": "Opener invites game by raising the agreed heart fit to 3H; this is not a 2/1 control phase.",
                      "generated": null,
                      "children": [
                        {
                          "id": "fg1H-2H-3H-4NT",
                          "trigger": "4NT",
                          "meaning": "RKC/4NT (after a round of control-bidding).",
                          "filters": {},
                          "children": [],
                          "alert": true,
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "RKC/4NT (after a round of control-bidding).",
                              "points": {
                                "method": "HCP+shape",
                                "min": null,
                                "max": null
                              },
                              "suitLengths": []
                            },
                            "convention": {
                              "blackwood": true,
                              "rkcb": true
                            },
                            "slam": {
                              "interest": true,
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430",
                                "interference": "D0P1",
                                "accelerated": false,
                                "type": "keycard"
                              }
                            },
                            "progress": {
                              "twoOverOne": {
                                "phase": "slam-pursuit",
                                "phaseNumber": 4
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
                          "alert": true,
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "King ask after positive ace ask.",
                              "points": {
                                "method": "HCP+shape",
                                "min": null,
                                "max": null
                              },
                              "suitLengths": []
                            }
                          }
                        }
                      ],
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "H": 6
                        },
                        "maxSuit": {
                          "H": 13
                        }
                      },
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener invites game by raising the agreed heart fit to 3H; this is not a 2/1 control phase.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 6,
                              "max": 13
                            }
                          ]
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        }
                      }
                    },
                    {
                      "id": "fg1H-2H-3S",
                      "trigger": "3S",
                      "meaning": "New-suit game try / side control.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "New-suit game try / side control.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg1H-2H-4H",
                      "trigger": "4H",
                      "meaning": "Opener places the contract in 4H when partnership values reach about 25 points.",
                      "filters": {
                        "minHcp": 17,
                        "maxHcp": 21
                      },
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener places the contract in 4H when partnership values reach about 25 points.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 17,
                            "max": 21
                          },
                          "suitLengths": []
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "H"
                        }
                      }
                    }
                  ],
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 8,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "H": 3
                    }
                  },
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Simple heart raise: 6–8 points and exactly three hearts; not a 2/1 entry.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 8
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 3
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H",
                      "openerLength": 5,
                      "responderLength": 3,
                      "combinedMinimum": 8
                    }
                  }
                },
                {
                  "id": "fg1H-2C-21",
                  "trigger": "2C",
                  "meaning": "2/1 game-force response in clubs: 12+ points and 5+ clubs.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "2/1 game-force response in clubs: 12+ points and 5+ clubs.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "H",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1H-2D-21",
                  "trigger": "2D",
                  "meaning": "2/1 game-force response in diamonds: 12+ points and 5+ diamonds.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "2/1 game-force response in diamonds: 12+ points and 5+ diamonds.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "H",
                        "responseSuit": "D",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1H-1S",
                  "trigger": "1S",
                  "meaning": "Natural 1S response: 6–11 points and 4+ spades.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1S response: 6–11 points and 4+ spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "game": false,
                      "round": true,
                      "source": "new suit"
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1H-3H",
                  "trigger": "3H",
                  "meaning": "Constructive heart raise: 9–11 points with exactly three hearts, or 4+ hearts with game-going fit strength.",
                  "filters": {
                    "minHcp": 9,
                    "maxHcp": 11,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Constructive heart raise: 9–11 points with exactly three hearts, or 4+ hearts with game-going fit strength.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 9,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H",
                      "openerLength": 5,
                      "responderLength": 3,
                      "combinedMinimum": 8
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1H-splinter-4C",
                  "trigger": "4C",
                  "meaning": "4C splinter: 11–14 points, 3+ H, and zero or one C.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "C": 1,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4C splinter: 11–14 points, 3+ H, and zero or one C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "C",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1H-splinter-4D",
                  "trigger": "4D",
                  "meaning": "4D splinter: 11–14 points, 3+ H, and zero or one D.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "D": 1,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4D splinter: 11–14 points, 3+ H, and zero or one D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "D",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1H-splinter-3S",
                  "trigger": "3S",
                  "meaning": "3S splinter: 11–14 points, 3+ H, and zero or one S.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "S": 1,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "3S splinter: 11–14 points, 3+ H, and zero or one S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "S",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1H-exclusion-5C",
                  "trigger": "5C",
                  "meaning": "5C Exclusion RKCB: confirms H, shows a void in C, and asks for key cards outside C.",
                  "filters": {
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "C": 0,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5C Exclusion RKCB: confirms H, shows a void in C, and asks for key cards outside C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "C",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "H",
                        "excludedSuit": "C",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "H"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1H-exclusion-5D",
                  "trigger": "5D",
                  "meaning": "5D Exclusion RKCB: confirms H, shows a void in D, and asks for key cards outside D.",
                  "filters": {
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "D": 0,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5D Exclusion RKCB: confirms H, shows a void in D, and asks for key cards outside D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "D",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "H",
                        "excludedSuit": "D",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "H"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1H-exclusion-4S",
                  "trigger": "4S",
                  "meaning": "4S Exclusion RKCB: confirms H, shows a void in S, and asks for key cards outside S.",
                  "filters": {
                    "minSuit": {
                      "H": 3
                    },
                    "maxSuit": {
                      "S": 0,
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4S Exclusion RKCB: confirms H, shows a void in S, and asks for key cards outside S.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H"
                    },
                    "shortness": {
                      "suit": "S",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "H",
                        "excludedSuit": "S",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "H"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
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
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1H: 12–21 points and 5+ hearts.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "H",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "natural": true
                },
                "opening": {
                  "suit": "H"
                }
              }
            },
            {
              "id": "fg1S",
              "trigger": "1S",
              "meaning": "Natural 1S: 12–21 points and 5+ spades.",
              "children": [
                {
                  "id": "fg1S-1NT",
                  "trigger": "1NT",
                  "meaning": "Natural 1NT response: 6–11 points and fewer than three spades; cannot enter 2/1.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "maxSuit": {
                      "S": 2
                    }
                  },
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Natural 1NT response: 6–11 points and fewer than three spades; cannot enter 2/1.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 2
                        }
                      ]
                    },
                    "convention": {
                      "naturalNotrump": true,
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  }
                },
                {
                  "id": "fg1S-2S",
                  "trigger": "2S",
                  "meaning": "Simple spade raise: 6–8 points and exactly three spades; not a 2/1 entry.",
                  "children": [
                    {
                      "id": "fg1S-2S-2NT",
                      "trigger": "2NT",
                      "meaning": "Opener's 2NT game try after a simple spade raise; invitational, not game forcing.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17
                      },
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener's 2NT game try after a simple spade raise; invitational, not game forcing.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": []
                        },
                        "forcing": {
                          "game": false,
                          "round": true,
                          "source": "game try"
                        }
                      }
                    },
                    {
                      "id": "fg1S-2S-3S",
                      "trigger": "3S",
                      "meaning": "Opener invites game by raising the agreed spade fit to 3S; this is not a 2/1 control phase.",
                      "generated": null,
                      "children": [
                        {
                          "id": "fg1S-2S-3S-4NT",
                          "trigger": "4NT",
                          "meaning": "RKC/Key-card query.",
                          "filters": {},
                          "children": [],
                          "alert": true,
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "RKC/Key-card query.",
                              "points": {
                                "method": "HCP+shape",
                                "min": null,
                                "max": null
                              },
                              "suitLengths": []
                            },
                            "convention": {
                              "blackwood": true,
                              "rkcb": true
                            },
                            "slam": {
                              "interest": true,
                              "aceAsk": {
                                "active": true,
                                "method": "rkcb-1430",
                                "interference": "D0P1",
                                "accelerated": false,
                                "type": "keycard"
                              }
                            },
                            "progress": {
                              "twoOverOne": {
                                "phase": "slam-pursuit",
                                "phaseNumber": 4
                              }
                            }
                          }
                        },
                        {
                          "id": "fg1S-2S-3S-5NT",
                          "trigger": "5NT",
                          "meaning": "Queen ask / king check if partnership uses this.",
                          "filters": {},
                          "children": [],
                          "alert": true,
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Queen ask / king check if partnership uses this.",
                              "points": {
                                "method": "HCP+shape",
                                "min": null,
                                "max": null
                              },
                              "suitLengths": []
                            }
                          }
                        }
                      ],
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 17,
                        "minSuit": {
                          "S": 6
                        },
                        "maxSuit": {
                          "S": 13
                        }
                      },
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener invites game by raising the agreed spade fit to 3S; this is not a 2/1 control phase.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "S",
                              "min": 6,
                              "max": 13
                            }
                          ]
                        },
                        "forcing": {
                          "game": false,
                          "round": false
                        },
                        "fit": {
                          "confirmed": true,
                          "suit": "S"
                        }
                      }
                    },
                    {
                      "id": "fg1S-2S-3C",
                      "trigger": "3C",
                      "meaning": "Minor-suit side control and feature bid.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Minor-suit side control and feature bid.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 8,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "S": 3
                    }
                  },
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Simple spade raise: 6–8 points and exactly three spades; not a 2/1 entry.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 8
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 3
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": false
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S",
                      "openerLength": 5,
                      "responderLength": 3,
                      "combinedMinimum": 8
                    }
                  }
                },
                {
                  "id": "fg1S-2C-21",
                  "trigger": "2C",
                  "meaning": "2/1 game-force response in clubs: 12+ points and 5+ clubs.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "2/1 game-force response in clubs: 12+ points and 5+ clubs.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1S-2D-21",
                  "trigger": "2D",
                  "meaning": "2/1 game-force response in diamonds: 12+ points and 5+ diamonds.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "2/1 game-force response in diamonds: 12+ points and 5+ diamonds.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "D",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1S-2H-21",
                  "trigger": "2H",
                  "meaning": "2/1 game-force response in hearts: 12+ points and 4+ hearts.",
                  "priority": 100,
                  "filters": {
                    "minHcp": 12,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 4
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "2/1 game-force response in hearts: 12+ points and 4+ hearts.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 12,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "S",
                        "responseSuit": "H",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  "id": "fg1S-3S-four-card",
                  "trigger": "3S",
                  "meaning": "Constructive spade raise with 4+ spades; the partnership has at least a nine-card fit.",
                  "filters": {
                    "minHcp": 6,
                    "maxHcp": 11,
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Constructive spade raise with 4+ spades; the partnership has at least a nine-card fit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S",
                      "openerLength": 5,
                      "responderLength": 4,
                      "combinedMinimum": 9
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1S-3S-invitational",
                  "trigger": "3S",
                  "meaning": "Invitational spade raise: 9–11 points and exactly three spades.",
                  "filters": {
                    "minHcp": 9,
                    "maxHcp": 11,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "S": 3
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Invitational spade raise: 9–11 points and exactly three spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 9,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 3
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S",
                      "openerLength": 5,
                      "responderLength": 3,
                      "combinedMinimum": 8
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1S-splinter-4C",
                  "trigger": "4C",
                  "meaning": "4C splinter: 11–14 points, 3+ S, and zero or one C.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "C": 1,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4C splinter: 11–14 points, 3+ S, and zero or one C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "C",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1S-splinter-4D",
                  "trigger": "4D",
                  "meaning": "4D splinter: 11–14 points, 3+ S, and zero or one D.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "D": 1,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4D splinter: 11–14 points, 3+ S, and zero or one D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "D",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1S-splinter-4H",
                  "trigger": "4H",
                  "meaning": "4H splinter: 11–14 points, 3+ S, and zero or one H.",
                  "filters": {
                    "minHcp": 11,
                    "maxHcp": 14,
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "H": 1,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4H splinter: 11–14 points, 3+ S, and zero or one H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 11,
                        "max": 14
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 1
                        }
                      ]
                    },
                    "convention": {
                      "splinter": true,
                      "delayedSplinter": false
                    },
                    "forcing": {
                      "game": true,
                      "source": "splinter"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "H",
                      "min": 0,
                      "max": 1
                    },
                    "slam": {
                      "interest": true
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "not-started",
                        "phaseNumber": 0
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1S-exclusion-5C",
                  "trigger": "5C",
                  "meaning": "5C Exclusion RKCB: confirms S, shows a void in C, and asks for key cards outside C.",
                  "filters": {
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "C": 0,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5C Exclusion RKCB: confirms S, shows a void in C, and asks for key cards outside C.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "C",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "C",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "S",
                        "excludedSuit": "C",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "S"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1S-exclusion-5D",
                  "trigger": "5D",
                  "meaning": "5D Exclusion RKCB: confirms S, shows a void in D, and asks for key cards outside D.",
                  "filters": {
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "D": 0,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5D Exclusion RKCB: confirms S, shows a void in D, and asks for key cards outside D.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "D",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "S",
                        "excludedSuit": "D",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "S"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1S-exclusion-5H",
                  "trigger": "5H",
                  "meaning": "5H Exclusion RKCB: confirms S, shows a void in H, and asks for key cards outside H.",
                  "filters": {
                    "minSuit": {
                      "S": 3
                    },
                    "maxSuit": {
                      "H": 0,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "5H Exclusion RKCB: confirms S, shows a void in H, and asks for key cards outside H.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 3,
                          "max": 13
                        },
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 0
                        }
                      ]
                    },
                    "convention": {
                      "exclusion": true,
                      "rkcb": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "exclusion RKCB"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S"
                    },
                    "shortness": {
                      "suit": "H",
                      "exact": 0
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "rkcb-1430",
                        "type": "exclusion",
                        "agreedSuit": "S",
                        "excludedSuit": "H",
                        "interference": "D0P1"
                      }
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": false,
                        "phase": "slam-pursuit",
                        "phaseNumber": 4,
                        "fitConfirmed": true,
                        "agreedSuit": "S"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
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
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1S: 12–21 points and 5+ spades.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 12,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "S",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "natural": true
                },
                "opening": {
                  "suit": "S"
                }
              }
            },
            {
              "id": "fg1NT",
              "trigger": "1NT",
              "meaning": "Natural 1NT opening: 15–17 points, no singleton or void, and no suit longer than five cards.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 15,
                "maxHcp": 17,
                "minSuit": {
                  "C": 2,
                  "D": 2,
                  "H": 2,
                  "S": 2
                },
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
                  "meaning": "Stayman: 8–9 points, asks for a four-card major and may be used without one to invite 2NT.",
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 9
                  },
                  "children": [
                    {
                      "id": "fg1NT-2C-2D",
                      "trigger": "2D",
                      "meaning": "Stayman reply: no four-card major.",
                      "filters": {
                        "maxSuit": {
                          "H": 3,
                          "S": 3
                        }
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman reply: no four-card major.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 0,
                              "max": 3
                            },
                            {
                              "suit": "S",
                              "min": 0,
                              "max": 3
                            }
                          ]
                        },
                        "convention": {
                          "stayman": true
                        },
                        "fit": {
                          "confirmed": false
                        }
                      },
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1NT-2C-2H",
                      "trigger": "2H",
                      "meaning": "Stayman reply: 4+ hearts; four-card spades remain possible.",
                      "filters": {
                        "minSuit": {
                          "H": 4
                        },
                        "maxSuit": {
                          "H": 13
                        }
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman reply: 4+ hearts; four-card spades remain possible.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": [
                            {
                              "suit": "H",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        },
                        "convention": {
                          "stayman": true
                        },
                        "shownSuit": {
                          "suit": "H",
                          "minLength": 4
                        }
                      },
                      "children": [],
                      "alert": false
                    },
                    {
                      "id": "fg1NT-2C-2S",
                      "trigger": "2S",
                      "meaning": "Stayman reply: 4+ spades and fewer than four hearts.",
                      "filters": {
                        "minSuit": {
                          "S": 4
                        },
                        "maxSuit": {
                          "H": 3,
                          "S": 13
                        }
                      },
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Stayman reply: 4+ spades and fewer than four hearts.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": [
                            {
                              "suit": "S",
                              "min": 4,
                              "max": 13
                            },
                            {
                              "suit": "H",
                              "min": 0,
                              "max": 3
                            }
                          ]
                        },
                        "convention": {
                          "stayman": true
                        },
                        "shownSuit": {
                          "suit": "S",
                          "minLength": 4
                        }
                      },
                      "children": [],
                      "alert": false
                    }
                  ],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Stayman: 8–9 points, asks for a four-card major and may be used without one to invite 2NT.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 8,
                        "max": 9
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "stayman": true
                    },
                    "inquiry": {
                      "type": "four-card-major"
                    }
                  }
                },
                {
                  "id": "fg1NT-2D",
                  "trigger": "2D",
                  "meaning": "Jacoby transfer to hearts: 5+ hearts.",
                  "filters": {
                    "minSuit": {
                      "H": 5
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [
                    {
                      "id": "fg1NT-2D-2H",
                      "trigger": "2H",
                      "meaning": "Opener accepts the transfer to hearts.",
                      "filters": {},
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener accepts the transfer to hearts.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        },
                        "convention": {
                          "transfer": true
                        },
                        "transfer": {
                          "targetSuit": "H",
                          "accepted": true
                        }
                      },
                      "children": [
                        {
                          "id": "fg1NT-2D-2H-P",
                          "trigger": "P",
                          "meaning": "Responder signs off with a minimum transfer hand.",
                          "filters": {
                            "minHcp": 0,
                            "maxHcp": 7,
                            "minSuit": {
                              "H": 5
                            },
                            "maxSuit": {
                              "H": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder signs off with a minimum transfer hand.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 0,
                                "max": 7
                              },
                              "suitLengths": [
                                {
                                  "suit": "H",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": false,
                              "round": false
                            },
                            "fit": {
                              "confirmed": true,
                              "suit": "H"
                            }
                          },
                          "children": [],
                          "alert": false
                        },
                        {
                          "id": "fg1NT-2D-2H-2NT",
                          "trigger": "2NT",
                          "meaning": "Responder invites 3NT with 8–9 points after transferring to hearts.",
                          "filters": {
                            "minHcp": 8,
                            "maxHcp": 9,
                            "minSuit": {
                              "H": 5
                            },
                            "maxSuit": {
                              "H": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder invites 3NT with 8–9 points after transferring to hearts.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 8,
                                "max": 9
                              },
                              "suitLengths": [
                                {
                                  "suit": "H",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": false,
                              "round": false
                            },
                            "convention": {
                              "naturalNotrump": true
                            }
                          },
                          "children": [],
                          "alert": false
                        },
                        {
                          "id": "fg1NT-2D-2H-3NT",
                          "trigger": "3NT",
                          "meaning": "Responder shows 10+ points; opener chooses 3NT or 4H.",
                          "filters": {
                            "minHcp": 10,
                            "maxHcp": 40,
                            "minSuit": {
                              "H": 5
                            },
                            "maxSuit": {
                              "H": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder shows 10+ points; opener chooses 3NT or 4H.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 10,
                                "max": 40
                              },
                              "suitLengths": [
                                {
                                  "suit": "H",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": true,
                              "source": "transfer continuation"
                            }
                          },
                          "children": [],
                          "alert": false
                        }
                      ],
                      "alert": false
                    }
                  ],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to hearts: 5+ hearts.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "H"
                    }
                  }
                },
                {
                  "id": "fg1NT-2H",
                  "trigger": "2H",
                  "meaning": "Jacoby transfer to spades: 5+ spades.",
                  "filters": {
                    "minSuit": {
                      "S": 5
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [
                    {
                      "id": "fg1NT-2H-2S",
                      "trigger": "2S",
                      "meaning": "Opener accepts the transfer to spades.",
                      "filters": {},
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener accepts the transfer to spades.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        },
                        "convention": {
                          "transfer": true
                        },
                        "transfer": {
                          "targetSuit": "S",
                          "accepted": true
                        }
                      },
                      "children": [
                        {
                          "id": "fg1NT-2H-2S-P",
                          "trigger": "P",
                          "meaning": "Responder signs off with a minimum transfer hand.",
                          "filters": {
                            "minHcp": 0,
                            "maxHcp": 7,
                            "minSuit": {
                              "S": 5
                            },
                            "maxSuit": {
                              "S": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder signs off with a minimum transfer hand.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 0,
                                "max": 7
                              },
                              "suitLengths": [
                                {
                                  "suit": "S",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": false,
                              "round": false
                            },
                            "fit": {
                              "confirmed": true,
                              "suit": "S"
                            }
                          },
                          "children": [],
                          "alert": false
                        },
                        {
                          "id": "fg1NT-2H-2S-2NT",
                          "trigger": "2NT",
                          "meaning": "Responder invites 3NT with 8–9 points after transferring to spades.",
                          "filters": {
                            "minHcp": 8,
                            "maxHcp": 9,
                            "minSuit": {
                              "S": 5
                            },
                            "maxSuit": {
                              "S": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder invites 3NT with 8–9 points after transferring to spades.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 8,
                                "max": 9
                              },
                              "suitLengths": [
                                {
                                  "suit": "S",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": false,
                              "round": false
                            },
                            "convention": {
                              "naturalNotrump": true
                            }
                          },
                          "children": [],
                          "alert": false
                        },
                        {
                          "id": "fg1NT-2H-2S-3NT",
                          "trigger": "3NT",
                          "meaning": "Responder shows 10+ points; opener chooses 3NT or 4S.",
                          "filters": {
                            "minHcp": 10,
                            "maxHcp": 40,
                            "minSuit": {
                              "S": 5
                            },
                            "maxSuit": {
                              "S": 13
                            }
                          },
                          "facts": {
                            "lastBid": {
                              "seat": "{{seat}}",
                              "code": "{{call.code}}",
                              "meaning": "Responder shows 10+ points; opener chooses 3NT or 4S.",
                              "points": {
                                "method": "HCP+shape",
                                "min": 10,
                                "max": 40
                              },
                              "suitLengths": [
                                {
                                  "suit": "S",
                                  "min": 5,
                                  "max": 13
                                }
                              ]
                            },
                            "forcing": {
                              "game": true,
                              "source": "transfer continuation"
                            }
                          },
                          "children": [],
                          "alert": false
                        }
                      ],
                      "alert": false
                    }
                  ],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to spades: 5+ spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "S"
                    }
                  }
                },
                {
                  "id": "fg1NT-2NTC",
                  "trigger": "2NT",
                  "meaning": "Jacoby transfer to clubs: 6+ clubs.",
                  "filters": {
                    "minSuit": {
                      "C": 6
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "children": [
                    {
                      "id": "fg1NT-2NT-3C",
                      "trigger": "3C",
                      "meaning": "Opener accepts the transfer to clubs.",
                      "filters": {},
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener accepts the transfer to clubs.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        },
                        "convention": {
                          "transfer": true
                        },
                        "transfer": {
                          "targetSuit": "C",
                          "accepted": true
                        }
                      },
                      "children": [],
                      "alert": false
                    }
                  ],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to clubs: 6+ clubs.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "C"
                    }
                  }
                },
                {
                  "id": "fg1NT-2S",
                  "trigger": "2S",
                  "meaning": "Minor Stayman: 8–9 points with 5–4 or better in the minors, or a very strong 4–4; asks opener to show a four-card minor.",
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 9,
                    "minSuit": {
                      "C": 4,
                      "D": 4
                    },
                    "maxSuit": {
                      "C": 13,
                      "D": 13
                    }
                  },
                  "children": [
                    {
                      "id": "fg1NT-2S-3C",
                      "trigger": "3C",
                      "meaning": "Opener shows 4+ clubs in response to minor Stayman.",
                      "filters": {
                        "minSuit": {
                          "C": 4
                        },
                        "maxSuit": {
                          "C": 13
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener shows 4+ clubs in response to minor Stayman.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        },
                        "shownSuit": {
                          "suit": "C",
                          "minLength": 4
                        }
                      }
                    },
                    {
                      "id": "fg1NT-2S-3D",
                      "trigger": "3D",
                      "meaning": "Opener shows 4+ diamonds in response to minor Stayman.",
                      "filters": {
                        "minSuit": {
                          "D": 4
                        },
                        "maxSuit": {
                          "D": 13
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener shows 4+ diamonds in response to minor Stayman.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": [
                            {
                              "suit": "D",
                              "min": 4,
                              "max": 13
                            }
                          ]
                        },
                        "shownSuit": {
                          "suit": "D",
                          "minLength": 4
                        }
                      }
                    },
                    {
                      "id": "fg1NT-2S-2NT",
                      "trigger": "2NT",
                      "meaning": "Opener shows 15–16 points and no four-card minor fit.",
                      "filters": {
                        "minHcp": 15,
                        "maxHcp": 16,
                        "maxSuit": {
                          "C": 3,
                          "D": 3
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener shows 15–16 points and no four-card minor fit.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 15,
                            "max": 16
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 0,
                              "max": 3
                            },
                            {
                              "suit": "D",
                              "min": 0,
                              "max": 3
                            }
                          ]
                        },
                        "fit": {
                          "confirmed": false
                        },
                        "convention": {
                          "naturalNotrump": true
                        }
                      }
                    },
                    {
                      "id": "fg1NT-2S-3NT",
                      "trigger": "3NT",
                      "meaning": "Opener shows 17 points and no four-card minor fit; 3NT is to play.",
                      "filters": {
                        "minHcp": 17,
                        "maxHcp": 17,
                        "maxSuit": {
                          "C": 3,
                          "D": 3
                        }
                      },
                      "children": [],
                      "generated": null,
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Opener shows 17 points and no four-card minor fit; 3NT is to play.",
                          "points": {
                            "method": "HCP+shape",
                            "min": 17,
                            "max": 17
                          },
                          "suitLengths": [
                            {
                              "suit": "C",
                              "min": 0,
                              "max": 3
                            },
                            {
                              "suit": "D",
                              "min": 0,
                              "max": 3
                            }
                          ]
                        },
                        "fit": {
                          "confirmed": false
                        },
                        "convention": {
                          "naturalNotrump": true
                        }
                      }
                    }
                  ],
                  "generated": null,
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Minor Stayman: 8–9 points with 5–4 or better in the minors, or a very strong 4–4; asks opener to show a four-card minor.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 8,
                        "max": 9
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 4,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "minorStayman": true,
                      "stayman": true
                    },
                    "inquiry": {
                      "type": "four-card-minor"
                    }
                  }
                },
                {
                  "id": "fg1NT-3C",
                  "trigger": "3C",
                  "meaning": "Jacoby transfer to diamonds: 6+ diamonds.",
                  "filters": {
                    "minSuit": {
                      "D": 6
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jacoby transfer to diamonds: 6+ diamonds.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "D"
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-3D",
                  "trigger": "3D",
                  "meaning": "13+ points and 5+ clubs with slam interest; may stop in 3NT or 5C without a fit.",
                  "filters": {
                    "minHcp": 13,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "13+ points and 5+ clubs with slam interest; may stop in 3NT or 5C without a fit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 13,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "C",
                      "slamInterest": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "advanced 1NT structure"
                    },
                    "slam": {
                      "interest": true
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-3H",
                  "trigger": "3H",
                  "meaning": "13+ points and 5+ diamonds with slam interest; may stop in 3NT or 5D without a fit.",
                  "filters": {
                    "minHcp": 13,
                    "maxHcp": 40,
                    "minSuit": {
                      "D": 5
                    },
                    "maxSuit": {
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "13+ points and 5+ diamonds with slam interest; may stop in 3NT or 5D without a fit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 13,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "transfer": true
                    },
                    "transfer": {
                      "targetSuit": "D",
                      "slamInterest": true
                    },
                    "forcing": {
                      "game": true,
                      "source": "advanced 1NT structure"
                    },
                    "slam": {
                      "interest": true
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-3S",
                  "trigger": "3S",
                  "meaning": "13+ points and at least 5–5 in the minors; game forcing with slam interest.",
                  "filters": {
                    "minHcp": 13,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5,
                      "D": 5
                    },
                    "maxSuit": {
                      "C": 13,
                      "D": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "13+ points and at least 5–5 in the minors; game forcing with slam interest.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 13,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "D",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "game": true,
                      "source": "advanced 1NT structure"
                    },
                    "slam": {
                      "interest": true
                    },
                    "shape": {
                      "suits": [
                        "C",
                        "D"
                      ],
                      "minimumLengths": [
                        5,
                        5
                      ]
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-3NT",
                  "trigger": "3NT",
                  "meaning": "10–14 points, natural and to play.",
                  "filters": {
                    "minHcp": 10,
                    "maxHcp": 14
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "10–14 points, natural and to play.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 10,
                        "max": 14
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "naturalNotrump": true
                    },
                    "forcing": {
                      "game": false,
                      "round": false
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-4C",
                  "trigger": "4C",
                  "meaning": "Gerber ace ask after 1NT; slam interest.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Gerber ace ask after 1NT; slam interest.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "gerber": true
                    },
                    "slam": {
                      "interest": true,
                      "aceAsk": {
                        "active": true,
                        "method": "gerber",
                        "type": "aces"
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-4D",
                  "trigger": "4D",
                  "meaning": "8–11 points and at least 5–5 in the majors; opener chooses 4H or 4S, with no slam interest.",
                  "filters": {
                    "minHcp": 8,
                    "maxHcp": 11,
                    "minSuit": {
                      "H": 5,
                      "S": 5
                    },
                    "maxSuit": {
                      "H": 13,
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "8–11 points and at least 5–5 in the majors; opener chooses 4H or 4S, with no slam interest.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 8,
                        "max": 11
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 5,
                          "max": 13
                        },
                        {
                          "suit": "S",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "game": true,
                      "source": "major-choice response"
                    },
                    "slam": {
                      "interest": false
                    },
                    "shape": {
                      "suits": [
                        "H",
                        "S"
                      ],
                      "minimumLengths": [
                        5,
                        5
                      ]
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-4M",
                  "trigger": "4M",
                  "meaning": "15+ points and 6+ cards in the bid major; natural, declarer-oriented, and strongly slam interested.",
                  "filters": {
                    "minHcp": 15,
                    "maxHcp": 40,
                    "minSuit": {
                      "M": 6
                    },
                    "maxSuit": {
                      "M": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "15+ points and 6+ cards in the bid major; natural, declarer-oriented, and strongly slam interested.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 15,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "{{M}}",
                          "min": 6,
                          "max": 13
                        }
                      ]
                    },
                    "forcing": {
                      "game": true,
                      "source": "natural major slam try"
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "{{M}}"
                    },
                    "slam": {
                      "interest": true
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg1NT-4NT",
                  "trigger": "4NT",
                  "meaning": "Quantitative invitation to 6NT: 16–17 points.",
                  "filters": {
                    "minHcp": 16,
                    "maxHcp": 17
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Quantitative invitation to 6NT: 16–17 points.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 16,
                        "max": 17
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "quantitativeNotrump": true
                    },
                    "slam": {
                      "interest": true,
                      "inviteLevel": 6
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1NT-5NT",
                  "trigger": "5NT",
                  "meaning": "Quantitative invitation to 7NT: 20–21 points; opener chooses 6NT or 7NT.",
                  "filters": {
                    "minHcp": 20,
                    "maxHcp": 21
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Quantitative invitation to 7NT: 20–21 points; opener chooses 6NT or 7NT.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 20,
                        "max": 21
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "quantitativeNotrump": true
                    },
                    "slam": {
                      "interest": true,
                      "inviteLevel": 7
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1NT-6NT",
                  "trigger": "6NT",
                  "meaning": "18–19 points, natural and to play in a small slam.",
                  "filters": {
                    "minHcp": 18,
                    "maxHcp": 19
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "18–19 points, natural and to play in a small slam.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 18,
                        "max": 19
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "naturalNotrump": true
                    },
                    "slam": {
                      "contractLevel": 6,
                      "signoff": true
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg1NT-7NT",
                  "trigger": "7NT",
                  "meaning": "22+ points, natural and to play; targets at least 37 combined points.",
                  "filters": {
                    "minHcp": 22,
                    "maxHcp": 40
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "22+ points, natural and to play; targets at least 37 combined points.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 22,
                        "max": 40
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "naturalNotrump": true
                    },
                    "slam": {
                      "contractLevel": 7,
                      "signoff": true
                    }
                  },
                  "children": [],
                  "alert": false
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 1NT opening: 15–17 points, no singleton or void, and no suit longer than five cards.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 15,
                    "max": 17
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "D",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "H",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "S",
                      "min": 2,
                      "max": 5
                    }
                  ]
                },
                "convention": {
                  "naturalNotrump": true
                },
                "opening": {
                  "strain": "NT",
                  "balanced": true
                }
              }
            },
            {
              "id": "fg2C-strong",
              "trigger": "2C",
              "meaning": "Artificial strong 2C opening: 22+ points; any shape and forced to at least game after a positive response.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 22,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Artificial strong 2C opening: 22+ points; any shape and forced to at least game after a positive response.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 22,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "convention": {
                  "strongTwoClub": true
                },
                "forcing": {
                  "round": true,
                  "game": false
                }
              },
              "children": [
                {
                  "id": "fg2C-2D-negative",
                  "trigger": "2D",
                  "meaning": "Negative/waiting response: 0–3 points.",
                  "filters": {
                    "minHcp": 0,
                    "maxHcp": 3
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Negative/waiting response: 0–3 points.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 0,
                        "max": 3
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "strongTwoClub": true,
                      "negativeResponse": true
                    },
                    "forcing": {
                      "round": true,
                      "game": false
                    }
                  },
                  "children": [],
                  "alert": false
                },
                {
                  "id": "fg2C-2H-positive",
                  "trigger": "2H",
                  "meaning": "Positive response: 4+ points; game forcing and enters the 2/1 phase structure.",
                  "filters": {
                    "minHcp": 4,
                    "maxHcp": 40,
                    "minSuit": {
                      "H": 5
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Positive response: 4+ points; game forcing and enters the 2/1 phase structure.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 4,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "C",
                        "responseSuit": "H",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg2C-2S-positive",
                  "trigger": "2S",
                  "meaning": "Positive response: 4+ points; game forcing and enters the 2/1 phase structure.",
                  "filters": {
                    "minHcp": 4,
                    "maxHcp": 40,
                    "minSuit": {
                      "S": 5
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Positive response: 4+ points; game forcing and enters the 2/1 phase structure.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 4,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "C",
                        "responseSuit": "S",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg2C-2NT-positive",
                  "trigger": "2NT",
                  "meaning": "Positive balanced response: 4+ points; game forcing and enters the 2/1 phase structure.",
                  "filters": {
                    "minHcp": 4,
                    "maxHcp": 40
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Positive balanced response: 4+ points; game forcing and enters the 2/1 phase structure.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 4,
                        "max": 40
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "C",
                        "responseSuit": "NT",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg2C-3C-positive",
                  "trigger": "3C",
                  "meaning": "Positive club response: 4+ points and 5+ clubs; game forcing and enters the 2/1 phase structure.",
                  "filters": {
                    "minHcp": 4,
                    "maxHcp": 40,
                    "minSuit": {
                      "C": 5
                    },
                    "maxSuit": {
                      "C": 13
                    }
                  },
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Positive club response: 4+ points and 5+ clubs; game forcing and enters the 2/1 phase structure.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 4,
                        "max": 40
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 5,
                          "max": 13
                        }
                      ]
                    },
                    "convention": {
                      "twoOverOne": true
                    },
                    "forcing": {
                      "game": true,
                      "round": false,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "entry",
                        "phaseNumber": 1,
                        "openingSuit": "C",
                        "responseSuit": "C",
                        "fitConfirmed": false,
                        "gameForceSatisfied": false
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
                  },
                  "children": [],
                  "alert": true
                }
              ],
              "alert": false
            },
            {
              "id": "fg2NT",
              "trigger": "2NT",
              "meaning": "Natural 2NT opening: 20–21 points, balanced, with no singleton or void.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 20,
                "maxHcp": 21,
                "minSuit": {
                  "C": 2,
                  "D": 2,
                  "H": 2,
                  "S": 2
                },
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 2NT opening: 20–21 points, balanced, with no singleton or void.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 20,
                    "max": 21
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "D",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "H",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "S",
                      "min": 2,
                      "max": 5
                    }
                  ]
                },
                "convention": {
                  "naturalNotrump": true
                },
                "opening": {
                  "strain": "NT",
                  "balanced": true
                }
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg3NT",
              "trigger": "3NT",
              "meaning": "Natural 3NT opening: 24–26 points and a completely balanced hand.",
              "filters": {
                "auctionRole": "opening",
                "minHcp": 24,
                "maxHcp": 26,
                "minSuit": {
                  "C": 2,
                  "D": 2,
                  "H": 2,
                  "S": 2
                },
                "maxSuit": {
                  "C": 5,
                  "D": 5,
                  "H": 5,
                  "S": 5
                }
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Natural 3NT opening: 24–26 points and a completely balanced hand.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 24,
                    "max": 26
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "D",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "H",
                      "min": 2,
                      "max": 5
                    },
                    {
                      "suit": "S",
                      "min": 2,
                      "max": 5
                    }
                  ]
                },
                "convention": {
                  "naturalNotrump": true
                },
                "opening": {
                  "strain": "NT",
                  "balanced": true
                }
              },
              "children": [],
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
              "meaning": "2/1 Phase II: opener describes shape and the partnership selects and explicitly confirms the contract strain.",
              "children": [
                {
                  "id": "fg-ii-2D",
                  "trigger": "2D",
                  "meaning": "Move toward fit confirmation / feature checks.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Move toward fit confirmation / feature checks.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                },
                {
                  "id": "fg-ii-3D",
                  "trigger": "3D",
                  "meaning": "Cuebid-style step for fit and hand strength.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Cuebid-style step for fit and hand strength.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                },
                {
                  "id": "fg-ii-3S",
                  "trigger": "3S",
                  "meaning": "Jump into control context depending on prior agreement.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Jump into control context depending on prior agreement.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2/1 Phase II: opener describes shape and the partnership selects and explicitly confirms the contract strain.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "forcing": {
                  "game": true,
                  "source": "2/1"
                },
                "progress": {
                  "twoOverOne": {
                    "active": true,
                    "phase": "strain-selection",
                    "phaseNumber": 2,
                    "gameForceSatisfied": false
                  }
                }
              }
            },
            {
              "id": "fg-enter-phase-iii",
              "trigger": "3C",
              "meaning": "2/1 Phase III: after a confirmed fit, bid first- or second-round controls upward; skipping a suit denies control.",
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
                  "meaning": "C control bid: shows first- or second-round control; skipped lower suits deny control.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "C control bid: shows first- or second-round control; skipped lower suits deny control.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "control-bidding",
                        "phaseNumber": 3,
                        "fitConfirmed": true,
                        "agreedSuit": "{{call.suit}}",
                        "gameForceSatisfied": false
                      }
                    },
                    "slam": {
                      "interest": true,
                      "control": {
                        "active": true,
                        "suit": "C",
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
                  "id": "fg-iii-4D",
                  "trigger": "4D",
                  "meaning": "D control bid: shows first- or second-round control; skipped lower suits deny control.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "D control bid: shows first- or second-round control; skipped lower suits deny control.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "control-bidding",
                        "phaseNumber": 3,
                        "fitConfirmed": true,
                        "agreedSuit": "{{call.suit}}",
                        "gameForceSatisfied": false
                      }
                    },
                    "slam": {
                      "interest": true,
                      "control": {
                        "active": true,
                        "suit": "D",
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
                  "id": "fg-iii-4H",
                  "trigger": "4H",
                  "meaning": "H control bid: shows first- or second-round control; skipped lower suits deny control.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "H control bid: shows first- or second-round control; skipped lower suits deny control.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "control-bidding",
                        "phaseNumber": 3,
                        "fitConfirmed": true,
                        "agreedSuit": "{{call.suit}}",
                        "gameForceSatisfied": false
                      }
                    },
                    "slam": {
                      "interest": true,
                      "control": {
                        "active": true,
                        "suit": "H",
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
                  "id": "fg-iii-4S",
                  "trigger": "4S",
                  "meaning": "S control bid: shows first- or second-round control; skipped lower suits deny control.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "S control bid: shows first- or second-round control; skipped lower suits deny control.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "control-bidding",
                        "phaseNumber": 3,
                        "fitConfirmed": true,
                        "agreedSuit": "{{call.suit}}",
                        "gameForceSatisfied": false
                      }
                    },
                    "slam": {
                      "interest": true,
                      "control": {
                        "active": true,
                        "suit": "S",
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
                  "id": "fg-iii-5C",
                  "trigger": "5C",
                  "meaning": "C control bid: shows first- or second-round control; skipped lower suits deny control.",
                  "filters": {},
                  "children": [],
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "C control bid: shows first- or second-round control; skipped lower suits deny control.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "forcing": {
                      "game": true,
                      "source": "2/1"
                    },
                    "progress": {
                      "twoOverOne": {
                        "active": true,
                        "phase": "control-bidding",
                        "phaseNumber": 3,
                        "fitConfirmed": true,
                        "agreedSuit": "{{call.suit}}",
                        "gameForceSatisfied": false
                      }
                    },
                    "slam": {
                      "interest": true,
                      "control": {
                        "active": true,
                        "suit": "C",
                        "round": "first-or-second",
                        "elimination": {
                          "method": "ascending-suit-elimination",
                          "skippedSuitDeniesControl": true
                        }
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
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2/1 Phase III: after a confirmed fit, bid first- or second-round controls upward; skipping a suit denies control.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "forcing": {
                  "game": true,
                  "source": "2/1"
                },
                "progress": {
                  "twoOverOne": {
                    "active": true,
                    "phase": "control-bidding",
                    "phaseNumber": 3,
                    "fitConfirmed": true,
                    "agreedSuit": "{{call.suit}}",
                    "gameForceSatisfied": false
                  }
                },
                "slam": {
                  "interest": true,
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
              "meaning": "Roman Key Card Blackwood (1430) after an agreed suit, normally after at least one control bid.",
              "children": [
                {
                  "id": "fg-rkcb-5C",
                  "trigger": "5C",
                  "meaning": "RKCB 1430 response: one or four key cards.",
                  "filters": {},
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: one or four key cards.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
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
                  "id": "fg-rkcb-5D",
                  "trigger": "5D",
                  "meaning": "RKCB 1430 response: zero or three key cards.",
                  "filters": {},
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: zero or three key cards.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5D",
                        "keycards": [
                          0,
                          3
                        ]
                      }
                    }
                  }
                },
                {
                  "id": "fg-rkcb-5H",
                  "trigger": "5H",
                  "meaning": "RKCB 1430 response: two key cards without the trump queen.",
                  "filters": {},
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: two key cards without the trump queen.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5H",
                        "keycards": [
                          2
                        ],
                        "trumpQueen": false
                      }
                    }
                  }
                },
                {
                  "id": "fg-rkcb-5S",
                  "trigger": "5S",
                  "meaning": "RKCB 1430 response: two key cards with the trump queen.",
                  "filters": {},
                  "children": [],
                  "alert": true,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "RKCB 1430 response: two key cards with the trump queen.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
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
                      },
                      "response": {
                        "method": "rkcb-1430",
                        "bid": "5S",
                        "keycards": [
                          2
                        ],
                        "trumpQueen": true
                      }
                    }
                  }
                }
              ],
              "filters": {
                "auctionRole": "contextual"
              },
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Roman Key Card Blackwood (1430) after an agreed suit, normally after at least one control bid.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "interference": "D0P1",
                    "accelerated": false,
                    "type": "keycard"
                  }
                },
                "progress": {
                  "twoOverOne": {
                    "phase": "slam-pursuit",
                    "phaseNumber": 4
                  }
                }
              }
            },
            {
              "id": "fg-5NT",
              "trigger": "5NT",
              "meaning": "King ask after the key-card response; bid the lowest king held and deny skipped kings.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [
                {
                  "id": "fg-5NT-6C",
                  "trigger": "6C",
                  "meaning": "6C: shows the C king and denies kings in skipped lower-ranking suits.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "6C: shows the C king and denies kings in skipped lower-ranking suits.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "slam": {
                      "kingResponse": {
                        "suit": "C",
                        "deniesSkippedKings": true
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-5NT-6D",
                  "trigger": "6D",
                  "meaning": "6D: shows the D king and denies kings in skipped lower-ranking suits.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "6D: shows the D king and denies kings in skipped lower-ranking suits.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "slam": {
                      "kingResponse": {
                        "suit": "D",
                        "deniesSkippedKings": true
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-5NT-6H",
                  "trigger": "6H",
                  "meaning": "6H: shows the H king and denies kings in skipped lower-ranking suits.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "6H: shows the H king and denies kings in skipped lower-ranking suits.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "slam": {
                      "kingResponse": {
                        "suit": "H",
                        "deniesSkippedKings": true
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-5NT-6S",
                  "trigger": "6S",
                  "meaning": "6S: shows the S king and denies kings in skipped lower-ranking suits.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "6S: shows the S king and denies kings in skipped lower-ranking suits.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "slam": {
                      "kingResponse": {
                        "suit": "S",
                        "deniesSkippedKings": true
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                }
              ],
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "King ask after the key-card response; bid the lowest king held and deny skipped kings.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "convention": {
                  "blackwood": true,
                  "rkcb": true
                },
                "slam": {
                  "kingAsk": {
                    "active": true,
                    "method": "specific-king"
                  }
                }
              }
            },
            {
              "id": "fg-exclusion",
              "trigger": "5D",
              "meaning": "5D Exclusion RKCB: shows a diamond void and asks for key cards outside diamonds.",
              "filters": {
                "auctionRole": "contextual",
                "maxSuit": {
                  "D": 0
                }
              },
              "children": [],
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "5D Exclusion RKCB: shows a diamond void and asks for key cards outside diamonds.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 0,
                      "max": 0
                    }
                  ]
                },
                "convention": {
                  "exclusion": true,
                  "rkcb": true
                },
                "forcing": {
                  "game": true,
                  "source": "exclusion RKCB"
                },
                "fit": {
                  "confirmed": true,
                  "suit": "{{call.suit}}"
                },
                "shortness": {
                  "suit": "D",
                  "exact": 0
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "type": "exclusion",
                    "agreedSuit": "{{call.suit}}",
                    "excludedSuit": "D",
                    "interference": "D0P1"
                  }
                },
                "progress": {
                  "twoOverOne": {
                    "active": true,
                    "phase": "slam-pursuit",
                    "phaseNumber": 4,
                    "fitConfirmed": true,
                    "agreedSuit": "{{call.suit}}"
                  }
                }
              }
            },
            {
              "id": "fg-gerber",
              "trigger": "4C",
              "meaning": "Gerber ace ask, normally after a notrump auction.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [
                {
                  "id": "fg-gerber-4D",
                  "trigger": "4D",
                  "meaning": "4D Gerber response: 0 or 4 aces.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4D Gerber response: 0 or 4 aces.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "gerber": true
                    },
                    "slam": {
                      "response": {
                        "method": "gerber",
                        "bid": "4D",
                        "aces": [
                          0,
                          4
                        ]
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-gerber-4H",
                  "trigger": "4H",
                  "meaning": "4H Gerber response: 1 ace.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4H Gerber response: 1 ace.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "gerber": true
                    },
                    "slam": {
                      "response": {
                        "method": "gerber",
                        "bid": "4H",
                        "aces": [
                          1
                        ]
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-gerber-4S",
                  "trigger": "4S",
                  "meaning": "4S Gerber response: 2 aces.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4S Gerber response: 2 aces.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "gerber": true
                    },
                    "slam": {
                      "response": {
                        "method": "gerber",
                        "bid": "4S",
                        "aces": [
                          2
                        ]
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                },
                {
                  "id": "fg-gerber-4NT",
                  "trigger": "4NT",
                  "meaning": "4NT Gerber response: 3 aces.",
                  "filters": {},
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "4NT Gerber response: 3 aces.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    },
                    "convention": {
                      "gerber": true
                    },
                    "slam": {
                      "response": {
                        "method": "gerber",
                        "bid": "4NT",
                        "aces": [
                          3
                        ]
                      }
                    }
                  },
                  "children": [],
                  "alert": true
                }
              ],
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Gerber ace ask, normally after a notrump auction.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "convention": {
                  "gerber": true
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "gerber",
                    "type": "aces"
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
              "meaning": "Splinter: confirms the agreed suit and shows zero or one diamond; 11–14 directly, or 15+ after entering 2/1.",
              "filters": {
                "auctionRole": "contextual",
                "maxSuit": {
                  "D": 1
                }
              },
              "children": [],
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Splinter: confirms the agreed suit and shows zero or one diamond; 11–14 directly, or 15+ after entering 2/1.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 0,
                      "max": 1
                    }
                  ]
                },
                "convention": {
                  "splinter": true,
                  "delayedSplinter": false
                },
                "forcing": {
                  "game": true,
                  "source": "splinter"
                },
                "fit": {
                  "confirmed": true,
                  "suit": "{{call.suit}}"
                },
                "shortness": {
                  "suit": "D",
                  "min": 0,
                  "max": 1
                },
                "slam": {
                  "interest": true
                },
                "progress": {
                  "twoOverOne": {
                    "active": false,
                    "phase": "not-started",
                    "phaseNumber": 0
                  }
                }
              }
            },
            {
              "id": "fg-exclusion-2-level",
              "trigger": "4D",
              "meaning": "Exclusion RKCB: shows a diamond void and asks for key cards outside diamonds.",
              "filters": {
                "auctionRole": "contextual",
                "maxSuit": {
                  "D": 0
                }
              },
              "children": [],
              "alert": true,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Exclusion RKCB: shows a diamond void and asks for key cards outside diamonds.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "D",
                      "min": 0,
                      "max": 0
                    }
                  ]
                },
                "convention": {
                  "exclusion": true,
                  "rkcb": true
                },
                "forcing": {
                  "game": true,
                  "source": "exclusion RKCB"
                },
                "fit": {
                  "confirmed": true,
                  "suit": "{{call.suit}}"
                },
                "shortness": {
                  "suit": "D",
                  "exact": 0
                },
                "slam": {
                  "interest": true,
                  "aceAsk": {
                    "active": true,
                    "method": "rkcb-1430",
                    "type": "exclusion",
                    "agreedSuit": "{{call.suit}}",
                    "excludedSuit": "D",
                    "interference": "D0P1"
                  }
                },
                "progress": {
                  "twoOverOne": {
                    "active": true,
                    "phase": "slam-pursuit",
                    "phaseNumber": 4,
                    "fitConfirmed": true,
                    "agreedSuit": "{{call.suit}}"
                  }
                }
              }
            },
            {
              "id": "fg-cuebid",
              "trigger": "4H",
              "meaning": "Control bid: confirms fit strength and shows first- or second-round heart control.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Control bid: confirms fit strength and shows first- or second-round heart control.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "forcing": {
                  "game": true,
                  "source": "2/1"
                },
                "progress": {
                  "twoOverOne": {
                    "active": true,
                    "phase": "control-bidding",
                    "phaseNumber": 3,
                    "fitConfirmed": true,
                    "agreedSuit": "{{call.suit}}",
                    "gameForceSatisfied": false
                  }
                },
                "slam": {
                  "interest": true,
                  "control": {
                    "active": true,
                    "suit": "H",
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
              "meaning": "Michaels/minor two-suit route: at least 5–5 in clubs and diamonds.",
              "filters": {
                "auctionRole": "contextual",
                "minSuit": {
                  "C": 5,
                  "D": 5
                },
                "maxSuit": {
                  "C": 13,
                  "D": 13
                }
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Michaels/minor two-suit route: at least 5–5 in clubs and diamonds.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 5,
                      "max": 13
                    },
                    {
                      "suit": "D",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "michaels": true
                },
                "shape": {
                  "suits": [
                    "C",
                    "D"
                  ],
                  "minimumLengths": [
                    5,
                    5
                  ]
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
              "meaning": "1C overcall: 8+ points at the one level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 8,
                "maxHcp": 40
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "1C overcall: 8+ points at the one level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 8,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 1
                }
              }
            },
            {
              "id": "fg-oc1D",
              "trigger": "1D",
              "meaning": "1D overcall: 8+ points at the one level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 8,
                "maxHcp": 40
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "1D overcall: 8+ points at the one level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 8,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 1
                }
              }
            },
            {
              "id": "fg-oc1H",
              "trigger": "1H",
              "meaning": "1H overcall: 8+ points at the one level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 8,
                "maxHcp": 40
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "1H overcall: 8+ points at the one level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 8,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 1
                }
              }
            },
            {
              "id": "fg-oc1S",
              "trigger": "1S",
              "meaning": "1S overcall: 8+ points at the one level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 8,
                "maxHcp": 40
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "1S overcall: 8+ points at the one level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 8,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 1
                }
              }
            },
            {
              "id": "fg-ocX",
              "trigger": "X",
              "meaning": "Takeout double: strong and oriented toward the unbid suits; partnership strength may be considered.",
              "filters": {
                "auctionRole": "overcall"
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Takeout double: strong and oriented toward the unbid suits; partnership strength may be considered.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "takeout-double"
                }
              }
            },
            {
              "id": "fg-ocXX",
              "trigger": "XX",
              "meaning": "Redouble.",
              "filters": {
                "auctionRole": "contextual"
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Redouble.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                }
              }
            },
            {
              "id": "fg-oc1NT",
              "trigger": "1NT",
              "meaning": "Notrump overcall with a stopper in the opponent's bid suit.",
              "filters": {
                "auctionRole": "overcall",
                "requires": "stopper"
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Notrump overcall with a stopper in the opponent's bid suit.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "notrump-overcall",
                  "stopperRequired": true
                }
              }
            },
            {
              "id": "fg-overcall2C",
              "trigger": "2C",
              "meaning": "2C overcall: 10+ points at the two level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 10,
                "maxHcp": 40
              },
              "children": [],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2C overcall: 10+ points at the two level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 10,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 2
                }
              }
            },
            {
              "id": "fg-overcall2D",
              "trigger": "2D",
              "meaning": "2D overcall: 10+ points at the two level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 10,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2D overcall: 10+ points at the two level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 10,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 2
                }
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-overcall2H",
              "trigger": "2H",
              "meaning": "2H overcall: 10+ points at the two level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 10,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2H overcall: 10+ points at the two level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 10,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 2
                }
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-overcall2S",
              "trigger": "2S",
              "meaning": "2S overcall: 10+ points at the two level.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 10,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "2S overcall: 10+ points at the two level.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 10,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 2
                }
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-overcall3X",
              "trigger": "3X",
              "meaning": "Three-level overcall: 12+ points.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 12,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Three-level overcall: 12+ points.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 12,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "competition": {
                  "action": "overcall",
                  "level": 3
                }
              },
              "children": [],
              "alert": false
            },
            {
              "id": "fg-weak-jump-overcall",
              "trigger": "2X",
              "meaning": "Weak jump overcall: 6–10 points and 6+ cards in the bid suit, when the call is a jump.",
              "filters": {
                "auctionRole": "overcall",
                "minHcp": 6,
                "maxHcp": 10,
                "minSuit": {
                  "X": 6
                },
                "maxSuit": {
                  "X": 13
                }
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Weak jump overcall: 6–10 points and 6+ cards in the bid suit, when the call is a jump.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 6,
                    "max": 10
                  },
                  "suitLengths": [
                    {
                      "suit": "{{X}}",
                      "min": 6,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "weakJump": true
                },
                "competition": {
                  "action": "weak-jump-overcall"
                }
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
              "meaning": "Multi-Landy 2C: at least 5–4 in the majors.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "H": 4,
                  "S": 4
                },
                "maxSuit": {
                  "H": 13,
                  "S": 13
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
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Hearts.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg-ml-2C-2D-2S",
                      "trigger": "2S",
                      "meaning": "Spades.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Spades.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
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
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "No fit in majors.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 0,
                          "max": 3
                        },
                        {
                          "suit": "S",
                          "min": 0,
                          "max": 3
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "fg-ml-2C-2H",
                  "trigger": "2H",
                  "meaning": "Advancer selects hearts with 4+ hearts.",
                  "filters": {
                    "minSuit": {
                      "H": 4
                    },
                    "maxSuit": {
                      "H": 13
                    }
                  },
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Advancer selects hearts with 4+ hearts.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "H",
                      "advancerLength": 4
                    }
                  }
                },
                {
                  "id": "fg-ml-2C-2S",
                  "trigger": "2S",
                  "meaning": "Advancer selects spades with 4+ spades.",
                  "filters": {
                    "minSuit": {
                      "S": 4
                    },
                    "maxSuit": {
                      "S": 13
                    }
                  },
                  "children": [],
                  "generated": null,
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Advancer selects spades with 4+ spades.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 4,
                          "max": 13
                        }
                      ]
                    },
                    "fit": {
                      "confirmed": true,
                      "suit": "S",
                      "advancerLength": 4
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Multi-Landy 2C: at least 5–4 in the majors.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "H",
                      "min": 4,
                      "max": 13
                    },
                    {
                      "suit": "S",
                      "min": 4,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "multiLandy": true
                },
                "shape": {
                  "suits": [
                    "H",
                    "S"
                  ],
                  "combinedMinimum": 9,
                  "oneSuitMinimum": 5
                }
              }
            },
            {
              "id": "fg-ml-2D",
              "trigger": "2D",
              "meaning": "Multi-Landy 2D: a single six-card or longer major.",
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
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Spades.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Pass or correct: hearts is acceptable; 2S asks for the other major.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Multi-Landy 2D: a single six-card or longer major.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                },
                "convention": {
                  "multiLandy": true
                },
                "shape": {
                  "oneMajorMinimum": 6
                }
              }
            },
            {
              "id": "fg-ml-2H",
              "trigger": "2H",
              "meaning": "Multi-Landy 2H: 5+ hearts and 4+ cards in one minor.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "H": 5
                },
                "maxSuit": {
                  "H": 13
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
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Clubs.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg-ml-2H-2NT-3D",
                      "trigger": "3D",
                      "meaning": "Diamonds.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Diamonds.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Advancer asks for the minor.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Multi-Landy 2H: 5+ hearts and 4+ cards in one minor.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "H",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "multiLandy": true
                },
                "shape": {
                  "primarySuit": "H",
                  "primaryMinimum": 5,
                  "otherSuitClass": "minor",
                  "otherMinimum": 4
                }
              }
            },
            {
              "id": "fg-ml-2S",
              "trigger": "2S",
              "meaning": "Multi-Landy 2S: 5+ spades and 4+ cards in one minor.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "S": 5
                },
                "maxSuit": {
                  "S": 13
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
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Clubs.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    },
                    {
                      "id": "fg-ml-2S-2NT-3D",
                      "trigger": "3D",
                      "meaning": "Diamonds.",
                      "filters": {},
                      "children": [],
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Diamonds.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Advancer asks for the minor.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Multi-Landy 2S: 5+ spades and 4+ cards in one minor.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "S",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "multiLandy": true
                },
                "shape": {
                  "primarySuit": "S",
                  "primaryMinimum": 5,
                  "otherSuitClass": "minor",
                  "otherMinimum": 4
                }
              }
            },
            {
              "id": "fg-ml-2NT",
              "trigger": "2NT",
              "meaning": "Multi-Landy 2NT: at least 5–5 in the minors.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minSuit": {
                  "C": 5,
                  "D": 5
                },
                "maxSuit": {
                  "C": 13,
                  "D": 13
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
                      "alert": false,
                      "facts": {
                        "lastBid": {
                          "seat": "{{seat}}",
                          "code": "{{call.code}}",
                          "meaning": "Correct to diamonds.",
                          "points": {
                            "method": "HCP+shape",
                            "min": null,
                            "max": null
                          },
                          "suitLengths": []
                        }
                      }
                    }
                  ],
                  "filters": {},
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Advancer selects clubs or gives a pass-or-correct preference.",
                      "points": {
                        "method": "HCP+shape",
                        "min": null,
                        "max": null
                      },
                      "suitLengths": []
                    }
                  }
                }
              ],
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Multi-Landy 2NT: at least 5–5 in the minors.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": [
                    {
                      "suit": "C",
                      "min": 5,
                      "max": 13
                    },
                    {
                      "suit": "D",
                      "min": 5,
                      "max": 13
                    }
                  ]
                },
                "convention": {
                  "multiLandy": true,
                  "michaels": true
                },
                "shape": {
                  "suits": [
                    "C",
                    "D"
                  ],
                  "minimumLengths": [
                    5,
                    5
                  ]
                }
              }
            },
            {
              "id": "fg-ml-X",
              "trigger": "X",
              "meaning": "Penalty double over 1NT: 15+ points.",
              "filters": {
                "auctionRole": "overcall",
                "opponentOpening": "1NT",
                "minHcp": 15,
                "maxHcp": 40
              },
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Penalty double over 1NT: 15+ points.",
                  "points": {
                    "method": "HCP+shape",
                    "min": 15,
                    "max": 40
                  },
                  "suitLengths": []
                },
                "convention": {
                  "multiLandy": true
                },
                "competition": {
                  "action": "penalty-double"
                }
              },
              "children": [],
              "alert": false
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3C opening: 6–10 HCP and a 7-card club suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4C opening: 6–10 HCP and a 8+-card club suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "C",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "filters": {},
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Parallel preemptive opening options in club: 3C, 4C. Each is an alternative opening, not a continuation.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                }
              }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 2D opening (catalogue alternative): 6–10 HCP and a 6-card D suit. This is an alternative opening, not a continuation after the parent node.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3D opening: 6–10 HCP and a 7-card diamond suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4D opening: 6–10 HCP and a 8+-card diamond suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "D",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "filters": {},
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Parallel preemptive opening options in diamond: 2D, 3D, 4D. Each is an alternative opening, not a continuation.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                }
              }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 2H opening (catalogue alternative): 6–10 HCP and a 6-card H suit. This is an alternative opening, not a continuation after the parent node.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3H opening: 6–10 HCP and a 7-card heart suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4H opening: 6–10 HCP and a 8+-card heart suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "H",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "filters": {},
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Parallel preemptive opening options in heart: 2H, 3H, 4H. Each is an alternative opening, not a continuation.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                }
              }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 2S opening (catalogue alternative): 6–10 HCP and a 6-card S suit. This is an alternative opening, not a continuation after the parent node.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 6,
                          "max": 6
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 3S opening: 6–10 HCP and a 7-card spade suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 7,
                          "max": 7
                        }
                      ]
                    }
                  }
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
                  "alert": false,
                  "facts": {
                    "lastBid": {
                      "seat": "{{seat}}",
                      "code": "{{call.code}}",
                      "meaning": "Preemptive 4S opening: 6–10 HCP and a 8+-card spade suit.",
                      "points": {
                        "method": "HCP+shape",
                        "min": 6,
                        "max": 10
                      },
                      "suitLengths": [
                        {
                          "suit": "S",
                          "min": 8,
                          "max": 13
                        }
                      ]
                    }
                  }
                }
              ],
              "filters": {},
              "alert": false,
              "facts": {
                "lastBid": {
                  "seat": "{{seat}}",
                  "code": "{{call.code}}",
                  "meaning": "Parallel preemptive opening options in spade: 2S, 3S, 4S. Each is an alternative opening, not a continuation.",
                  "points": {
                    "method": "HCP+shape",
                    "min": null,
                    "max": null
                  },
                  "suitLengths": []
                }
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
          "shape": "no singleton or void; no six-card suit"
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
            },
            "constraints": {
              "diamondsMax": 2,
              "heartsMax": 4,
              "spadesMax": 4
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
          "treatment": "natural balanced"
        },
        "3NT": {
          "pointRange": {
            "min": 24,
            "max": 26
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
          "treatment": "natural, completely balanced"
        },
        "strongOpening": {
          "bid": "2C",
          "pointRange": {
            "min": 22,
            "max": 40
          },
          "treatment": "artificial strong; 2D shows 0–3, other positive responses force to game"
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
            "max": 6
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
        "2/1GameForce": "highest for an uncontested non-jump response in a new, lower-ranking suit: 1D-2C, 1H-2C/2D, and 1S-2C/2D/2H",
        "progression": "Phase I entry -> Phase II strain selection/explicit fit -> Phase III controls -> slam pursuit or game-force completion",
        "priority": 1000
      },
      "sequenceRules": [
        {
          "id": "personal-fgv0-5-two-over-one-entry",
          "expression": "1X-2Y",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 12,
            "maxHcp": 40
          },
          "meaning": "2/1 Phase I entry: a lower-ranking new suit at the two level shows 12+ points and forces to game.",
          "priority": 1000,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase I entry: a lower-ranking new suit at the two level shows 12+ points and forces to game.",
              "points": {
                "method": "HCP+shape",
                "min": 12,
                "max": 40
              },
              "suitLengths": []
            },
            "convention": {
              "twoOverOne": true
            },
            "forcing": {
              "game": true,
              "round": false,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "entry",
                "phaseNumber": 1,
                "openingSuit": "{{X}}",
                "responseSuit": "{{Y}}",
                "fitConfirmed": false,
                "gameForceSatisfied": false
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
          "id": "personal-fgv0-5-phase-ii-suit",
          "expression": "1X-2Y-(?:!=NT)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 Phase II: opener's first suit rebid begins strain selection.",
          "priority": 1010,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II: opener's first suit rebid begins strain selection.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "strain-selection",
                "phaseNumber": 2,
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-phase-ii-notrump",
          "expression": "1X-2Y-(2NT|3NT)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "2/1 Phase II: opener's first notrump rebid begins strain selection.",
          "priority": 1010,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II: opener's first notrump rebid begins strain selection.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "strain-selection",
                "phaseNumber": 2,
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-fit-opening-suit",
          "expression": "1X-2Y-?-#X",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "X"
          ],
          "meaning": "2/1 Phase II: both partners have confirmed the opening suit.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II: both partners have confirmed the opening suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-fit-response-suit",
          "expression": "1X-2Y-#Y",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Y"
          ],
          "meaning": "2/1 Phase II: opener confirms responder's suit.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II: opener confirms responder's suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-fit-opener-second-suit",
          "expression": "1X-2Y-#Z-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Z"
          ],
          "meaning": "2/1 Phase II: responder confirms opener's second suit.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase II: responder confirms opener's second suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "fit-confirmed",
                "phaseNumber": 2,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-control-after-opening-fit",
          "expression": "1X-2Y-?-#X-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "X"
          ],
          "meaning": "2/1 Phase III: control bidding starts after the opening suit is agreed.",
          "priority": 1030,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III: control bidding starts after the opening suit is agreed.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{Z}}",
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
          "id": "personal-fgv0-5-control-after-response-fit",
          "expression": "1X-2Y-#Y-#Z",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Y"
          ],
          "meaning": "2/1 Phase III: control bidding starts after responder's suit is agreed.",
          "priority": 1030,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III: control bidding starts after responder's suit is agreed.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{Z}}",
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
          "id": "personal-fgv0-5-control-after-second-suit-fit",
          "expression": "1X-2Y-#Z-#Z-#W",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [
            "Z"
          ],
          "meaning": "2/1 Phase III: control bidding starts after opener's second suit is agreed.",
          "priority": 1030,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "2/1 Phase III: control bidding starts after opener's second suit is agreed.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "{{W}}",
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
          "id": "personal-fgv0-5-delayed-splinter-2-new-higher",
          "expression": "1X-2Y-2Z-3W",
          "where": [
            "Y<X",
            "W>Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 1,
              "Z": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-2-new-lower",
          "expression": "1X-2Y-2Z-4W",
          "where": [
            "Y<X",
            "W<Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 1,
              "Z": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-2-opening-higher",
          "expression": "1X-2Y-2X-3Z",
          "where": [
            "Y<X",
            "Z>X"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "X": 3
            },
            "maxSuit": {
              "Z": 1,
              "X": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{X}} and shows zero or one {{Z}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{X}} and shows zero or one {{Z}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{X}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-2-opening-lower",
          "expression": "1X-2Y-2X-4Z",
          "where": [
            "Y<X",
            "Z<X"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "X": 3
            },
            "maxSuit": {
              "Z": 1,
              "X": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{X}} and shows zero or one {{Z}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{X}} and shows zero or one {{Z}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{X}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-3-response-higher",
          "expression": "1X-2Y-3Y-4Z",
          "where": [
            "Y<X",
            "Z>Y"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Y": 3
            },
            "maxSuit": {
              "Z": 1,
              "Y": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Y}} and shows zero or one {{Z}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Y}} and shows zero or one {{Z}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Y}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-3-response-lower",
          "expression": "1X-2Y-3Y-5Z",
          "where": [
            "Y<X",
            "Z<Y"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Y": 3
            },
            "maxSuit": {
              "Z": 1,
              "Y": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Y}} and shows zero or one {{Z}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Y}} and shows zero or one {{Z}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Y}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-3-new-higher",
          "expression": "1X-2Y-3Z-4W",
          "where": [
            "Y<X",
            "W>Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 1,
              "Z": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-delayed-splinter-3-new-lower",
          "expression": "1X-2Y-3Z-5W",
          "where": [
            "Y<X",
            "W<Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minHcp": 15,
            "maxHcp": 40,
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 1,
              "Z": 13
            }
          },
          "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
          "priority": 1020,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Delayed splinter after entering 2/1: confirms {{Z}} and shows zero or one {{W}}.",
              "points": {
                "method": "HCP+shape",
                "min": 15,
                "max": 40
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 1
                }
              ]
            },
            "convention": {
              "splinter": true,
              "delayedSplinter": true
            },
            "forcing": {
              "game": true,
              "source": "delayed splinter"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "min": 0,
              "max": 1
            },
            "slam": {
              "interest": true
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "control-bidding",
                "phaseNumber": 3,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}",
                "gameForceSatisfied": false
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-2-new-higher",
          "expression": "1X-2Y-2Z-4W",
          "where": [
            "Y<X",
            "W>Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 0,
              "Z": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Z}}",
                "excludedSuit": "{{W}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-2-new-lower",
          "expression": "1X-2Y-2Z-5W",
          "where": [
            "Y<X",
            "W<Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 0,
              "Z": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Z}}",
                "excludedSuit": "{{W}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-2-opening-higher",
          "expression": "1X-2Y-2X-4Z",
          "where": [
            "Y<X",
            "Z>X"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "X": 3
            },
            "maxSuit": {
              "Z": 0,
              "X": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{X}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{X}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{X}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{X}}",
                "excludedSuit": "{{Z}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-2-opening-lower",
          "expression": "1X-2Y-2X-5Z",
          "where": [
            "Y<X",
            "Z<X"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "X": 3
            },
            "maxSuit": {
              "Z": 0,
              "X": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{X}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{X}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{X}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{X}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{X}}",
                "excludedSuit": "{{Z}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{X}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-3-response-higher",
          "expression": "1X-2Y-3Y-5Z",
          "where": [
            "Y<X",
            "Z>Y"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Y": 3
            },
            "maxSuit": {
              "Z": 0,
              "Y": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Y}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Y}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Y}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Y}}",
                "excludedSuit": "{{Z}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-3-response-lower",
          "expression": "1X-2Y-3Y-6Z",
          "where": [
            "Y<X",
            "Z<Y"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Y": 3
            },
            "maxSuit": {
              "Z": 0,
              "Y": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Y}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Y}}, shows a void in {{Z}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Y}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{Z}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Y}}"
            },
            "shortness": {
              "suit": "{{Z}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Y}}",
                "excludedSuit": "{{Z}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Y}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-3-new-higher",
          "expression": "1X-2Y-3Z-5W",
          "where": [
            "Y<X",
            "W>Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 0,
              "Z": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Z}}",
                "excludedSuit": "{{W}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-exclusion-3-new-lower",
          "expression": "1X-2Y-3Z-6W",
          "where": [
            "Y<X",
            "W<Z"
          ],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "minSuit": {
              "Z": 3
            },
            "maxSuit": {
              "W": 0,
              "Z": 13
            }
          },
          "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
          "priority": 1040,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB during 2/1: confirms {{Z}}, shows a void in {{W}}, and excludes that suit from the key-card count.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "{{Z}}",
                  "min": 3,
                  "max": 13
                },
                {
                  "suit": "{{W}}",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "{{Z}}"
            },
            "shortness": {
              "suit": "{{W}}",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "{{Z}}",
                "excludedSuit": "{{W}}",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "{{Z}}"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-accelerated-rkcb",
          "expression": "1H-2C-2D-2H-2S-2NT",
          "where": [],
          "requiresAgreement": [
            "H"
          ],
          "alert": true,
          "meaning": "Accelerated RKCB after a confirmed heart fit and at least one control bid.",
          "priority": 1050,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Accelerated RKCB after a confirmed heart fit and at least one control bid.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": true,
              "source": "2/1"
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "H",
                "gameForceSatisfied": false
              }
            },
            "slam": {
              "interest": true,
              "control": {
                "active": true,
                "suit": "S",
                "round": "first-or-second",
                "elimination": {
                  "method": "ascending-suit-elimination",
                  "skippedSuitDeniesControl": true
                }
              },
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1",
                "accelerated": true,
                "type": "keycard",
                "agreedSuit": "H"
              }
            },
            "convention": {
              "blackwood": true,
              "rkcb": true
            }
          }
        },
        {
          "id": "personal-fgv0-5-example-exclusion-rkcb",
          "expression": "1D-2C-2H-3S-4C-5D",
          "where": [],
          "requiresAgreement": [],
          "alert": true,
          "filters": {
            "maxSuit": {
              "D": 0
            }
          },
          "meaning": "Exclusion RKCB in diamonds after the heart fit and control bid.",
          "priority": 1060,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Exclusion RKCB in diamonds after the heart fit and control bid.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": [
                {
                  "suit": "D",
                  "min": 0,
                  "max": 0
                }
              ]
            },
            "convention": {
              "exclusion": true,
              "rkcb": true
            },
            "forcing": {
              "game": true,
              "source": "exclusion RKCB"
            },
            "fit": {
              "confirmed": true,
              "suit": "H"
            },
            "shortness": {
              "suit": "D",
              "exact": 0
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "type": "exclusion",
                "agreedSuit": "H",
                "excludedSuit": "D",
                "interference": "D0P1"
              }
            },
            "progress": {
              "twoOverOne": {
                "active": true,
                "phase": "slam-pursuit",
                "phaseNumber": 4,
                "fitConfirmed": true,
                "agreedSuit": "H"
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-fourth-suit-stopper",
          "expression": "1D-2C-2H-2S-3C",
          "where": [],
          "requiresAgreement": [],
          "alert": true,
          "meaning": "Fourth-suit inquiry asks for a club stopper before notrump.",
          "priority": 1015,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Fourth-suit inquiry asks for a club stopper before notrump.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
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
          "id": "personal-fgv0-5-explicit-fit-blackwood",
          "expression": "*-#X-*-#X-*-4NT",
          "where": [],
          "requiresAgreement": [
            "X"
          ],
          "alert": true,
          "meaning": "Blackwood/RKCB after both partners explicitly bid the agreed suit.",
          "priority": 1070,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "Blackwood/RKCB after both partners explicitly bid the agreed suit.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "convention": {
              "blackwood": true,
              "rkcb": true
            },
            "slam": {
              "interest": true,
              "aceAsk": {
                "active": true,
                "method": "rkcb-1430",
                "interference": "D0P1",
                "accelerated": false,
                "type": "keycard",
                "agreedSuit": "{{X}}"
              }
            },
            "progress": {
              "twoOverOne": {
                "phase": "slam-pursuit",
                "phaseNumber": 4
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-game-force-complete",
          "expression": "1X-2Y-*-(3NT|4H|4S|5C|5D)",
          "where": [
            "Y<X"
          ],
          "requiresAgreement": [],
          "meaning": "The 2/1 game force is satisfied when the partnership reaches a game contract.",
          "priority": 1080,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "The 2/1 game force is satisfied when the partnership reaches a game contract.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
            "forcing": {
              "game": false,
              "round": false,
              "source": "2/1-complete"
            },
            "progress": {
              "twoOverOne": {
                "active": false,
                "phase": "complete",
                "phaseNumber": 4,
                "gameForceSatisfied": true
              }
            }
          }
        },
        {
          "id": "personal-fgv0-5-d0p1-pass",
          "expression": "4NT-^#X-P",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: pass shows one or four key cards.",
          "priority": 1100,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "D0P1 after interference: pass shows one or four key cards.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
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
          "id": "personal-fgv0-5-d0p1-double",
          "expression": "4NT-^#X-X",
          "where": [],
          "requiresAgreement": [],
          "matchSuffix": true,
          "alert": true,
          "meaning": "D0P1 after interference: double shows zero or three key cards.",
          "priority": 1100,
          "facts": {
            "lastBid": {
              "seat": "{{seat}}",
              "code": "{{call.code}}",
              "meaning": "D0P1 after interference: double shows zero or three key cards.",
              "points": {
                "method": "HCP+shape",
                "min": null,
                "max": null
              },
              "suitLengths": []
            },
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
      "version": "0.5",
      "sourceWorkbook": "FG Bidding System in 30 minutes (1).xlsx",
      "factSchema": {
        "id": "bridge-bidding-facts",
        "version": "1.1",
        "patchSemantics": "deep-merge",
        "deleteSentinel": {
          "$delete": true
        },
        "templates": [
          "{{M}}",
          "{{m}}",
          "{{X}}",
          "{{Y}}",
          "{{Z}}",
          "{{W}}",
          "{{call.code}}",
          "{{call.level}}",
          "{{call.strain}}",
          "{{call.suit}}",
          "{{seat}}",
          "{{side}}"
        ]
      },
      "initialFacts": {
        "factLayer": {
          "schema": "bridge-bidding-facts",
          "version": "1.1",
          "merge": "deep-patch"
        },
        "lastBid": {
          "seat": null,
          "code": null,
          "meaning": null,
          "points": {
            "method": "HCP+shape",
            "min": null,
            "max": null
          },
          "suitLengths": []
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
        },
        "progress": {
          "twoOverOne": {
            "active": false,
            "phase": "not-started",
            "phaseNumber": 0,
            "fitConfirmed": false,
            "gameForceSatisfied": false
          }
        }
      },
      "alertPolicy": {
        "categories": [
          "2/1 entry",
          "splinter",
          "delayed splinter",
          "Blackwood/RKCB",
          "Exclusion RKCB"
        ],
        "oneNotrumpResponses": "Alert every direct response to 1NT except 4NT, 5NT, 6NT, and 7NT."
      }
    }
  ]
};
