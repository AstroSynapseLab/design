# Do we need custom silicon?

A product manager isn't sure a custom chip is worth it. The agent answers honestly, explains the process and the cost questions, and offers a discovery call.

## Step 1 · The real question

**User:** Do we even need a custom chip?

**Why:** The topic shifts to a judgement call, so a heading leads; a content section with the three tiers gives the substance.

```json
[
  {
    "section_id": "section-a1",
    "components": [
      {
        "category": "heading-section",
        "name": "website-heading-section",
        "props": {
          "heading": "Maybe not. Here is how to tell.",
          "sur-heading": "Honestly",
          "sub-text": "If an off-the-shelf part meets your power, cost and supply requirements, we will tell you to buy it. Custom silicon earns its place only when standard parts become the more expensive option."
        }
      }
    ]
  },
  {
    "section_id": "section-a2",
    "components": [
      {
        "category": "content-section",
        "name": "website-content-section",
        "props": {
          "main-heading": "Silicon in industrial systems",
          "sur-heading": "",
          "sub-heading": "Not every product needs a custom chip. Where an off-the-shelf part meets the power, cost, and supply requirements, that part wins. In industrial systems, a single discontinued component can halt a line built to run for twenty years, so integration happens in three tiers.",
          "lists": {
            "bullet": [],
            "rich": [],
            "paragraph": [
              {
                "title": "Consolidation & supply security",
                "text": "Discrete regulators, interface chips, and glue logic consolidated into a single standard Korvane part or a small custom ASIC. The board gets smaller, the bill of materials gets shorter, and every critical component comes with a fifteen-year supply commitment."
              },
              {
                "title": "Intelligence at the sensor",
                "text": "Vision, vibration, and acoustic models run directly on the sensor node, so only events travel over the network. Radar replaces cameras wherever privacy matters, and local decisions keep working when the connection drops."
              },
              {
                "title": "Secure, self-managing fleets",
                "text": "A hardware root of trust in every device, post-quantum encrypted over-the-air updates across thousands of units, and on-chip telemetry that flags failing devices before they fail. Fully custom SoCs follow once volumes justify them."
              }
            ]
          },
          "pills": [],
          "cta": "Contact us"
        }
      }
    ]
  }
]
```

## Step 2 · How it works

**User:** How does a custom chip project work?

**Why:** Ordered steps belong in the numbered list of `website-content-section`.

```json
[
  {
    "section_id": "section-a3",
    "components": [
      {
        "category": "content-section",
        "name": "website-content-section",
        "props": {
          "main-heading": "From first conversation to production silicon",
          "sur-heading": "Our process",
          "sub-heading": "Nine stages, each ending in a written gate review, an updated cost per unit and a clear go or no-go recommendation.",
          "lists": {
            "bullet": [],
            "numbered": [
              {
                "text": "Discovery: decide together whether custom silicon makes sense at all."
              },
              {
                "text": "Specification: freeze functions, interfaces, power targets, package and unit cost."
              },
              {
                "text": "Architecture: partition the system and model power before any design."
              },
              {
                "text": "Design: RTL, analog schematics and layout from silicon-proven IP."
              },
              {
                "text": "Verification: testbenches, formal checks and FPGA prototypes until coverage closes."
              },
              {
                "text": "Physical design: floorplan, place and route, timing closure, sign-off."
              },
              {
                "text": "Tape-out: the design goes to the foundry for prototypes."
              },
              {
                "text": "Bring-up: first silicon tested across voltage and temperature, firmware ready."
              },
              {
                "text": "Qualification: reliability testing, then handover to dual-sourced volume production."
              }
            ],
            "rich": [],
            "paragraph": []
          },
          "pills": [
            {
              "label": "14–22 months"
            },
            {
              "label": "Derivatives: 9 months"
            },
            {
              "label": "Gate reviews"
            }
          ],
          "cta": "Book a discovery call"
        }
      }
    ]
  }
]
```

## Step 3 · Time and money

**User:** How long does it take, and what does it cost?

**Why:** Several practical questions at once: `website-faq-section`, answered only from the company document.

```json
[
  {
    "section_id": "section-a4",
    "components": [
      {
        "category": "faq-section",
        "name": "website-faq-section",
        "unique": true,
        "props": {
          "heading": "Time and cost",
          "sub-heading": "Straight answers before you commit to anything.",
          "items": [
            {
              "question": "How long does a custom ASIC program take?",
              "answer": "A typical program takes 14 to 22 months from first conversation to production silicon. A derivative of existing Korvane IP can take as little as nine months."
            },
            {
              "question": "What will each chip cost us?",
              "answer": "We model the cost per unit from day one and update it at every stage gate, so you always know the number before deciding to continue."
            },
            {
              "question": "Can we stop partway through?",
              "answer": "Yes. You can stop at any gate and keep everything produced so far: specifications, models, verification work and any silicon that has been made."
            },
            {
              "question": "What if a standard part would do?",
              "answer": "Then we will tell you to buy it. Custom silicon only earns its place when volume, power, size, security or supply risk make standard parts more expensive."
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-a5",
    "components": [
      {
        "category": "cta-section",
        "name": "website-cta-section",
        "props": {
          "heading": "Tape out with us.",
          "sur-heading": "Collaborate",
          "sub-heading": "Tell us what you're building; we'll tell you honestly whether you need custom silicon at all."
        }
      }
    ]
  }
]
```
