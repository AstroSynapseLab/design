# Who is behind Korvane?

A visitor wants to know the people before the product: who leads the company, whether it's hiring, and how its engineers work with clients.

## Step 1 · Meets the founders

**User:** Who runs Korvane?

**Why:** `website-team-section` with `variant` `featured`: the CEO leads. The names and roles come from the company document's Leadership section.

```json
[
  {
    "section_id": "section-a1",
    "components": [
      {
        "category": "team-section",
        "name": "website-team-section",
        "unique": true,
        "props": {
          "variant": "featured",
          "sur-heading": "Leadership",
          "heading": "Four engineers who founded Korvane",
          "sub-heading": "They spent their careers inside large chip companies, then left to design the chips those companies wouldn't.",
          "members": [
            {
              "name": "Ilse Varendonck",
              "role": "Co-founder & CEO",
              "bio": "Previously led mixed-signal product lines for industrial markets. Founded Korvane in 2019 to design the low-volume, long-life chips that big semiconductor companies kept cancelling.",
              "image": "photo-1573496359142-b8d87734a5a2",
              "socials": [
                {
                  "type": "linkedin",
                  "href": "#"
                }
              ],
              "data-prompt": "Tell me more about Ilse Varendonck"
            },
            {
              "name": "Tomás Revelo",
              "role": "Co-founder & CTO",
              "bio": "Digital architect behind three generations of low-power SoCs; leads the Eindhoven design center.",
              "image": "photo-1500648767791-00dcc994a43e",
              "socials": [
                {
                  "type": "linkedin",
                  "href": "#"
                }
              ],
              "data-prompt": "Tell me more about Tomás Revelo"
            },
            {
              "name": "Marta Quintela",
              "role": "Co-founder & Head of Analog",
              "bio": "Specialist in data converters and mmWave front ends; runs the Porto analog and RF team.",
              "image": "photo-1544005313-94ddf0286df2",
              "socials": [
                {
                  "type": "linkedin",
                  "href": "#"
                }
              ],
              "data-prompt": "Tell me more about Marta Quintela"
            },
            {
              "name": "Joris Abbenhuis",
              "role": "Co-founder & VP Operations",
              "bio": "Runs every foundry, packaging and supply chain relationship, from first wafer to fifteen-year supply.",
              "image": "photo-1507003211169-0a1dd7228f2d",
              "socials": [
                {
                  "type": "linkedin",
                  "href": "#"
                }
              ],
              "data-prompt": "Tell me more about Joris Abbenhuis"
            }
          ],
          "ctas": [
            {
              "label": "Are you hiring?",
              "href": "",
              "data-prompt": "Are you hiring? What roles are open?"
            }
          ]
        }
      }
    ]
  }
]
```

## Step 2 · Asks about jobs

**User:** Are you hiring?

**Why:** The roles from the Careers section as an `website-list-section`, then a CTA.

```json
[
  {
    "section_id": "section-a2",
    "components": [
      {
        "category": "list-section",
        "name": "website-list-section",
        "props": {
          "heading": "Open roles",
          "sub-heading": "We hire in Eindhoven and Porto.",
          "list-items": [
            {
              "title": "Digital design.",
              "sub-title": "SystemVerilog RTL for RISC-V SoCs and accelerators, from architecture through to sign-off."
            },
            {
              "title": "Verification.",
              "sub-title": "UVM testbenches, formal properties and FPGA prototypes that close coverage before tape-out."
            },
            {
              "title": "Analog and RF design.",
              "sub-title": "Data converters, PLLs and mmWave front ends, designed with our Porto analog team."
            },
            {
              "title": "Firmware.",
              "sub-title": "Bootloaders, drivers and Zephyr support in C and Rust, ready on day one."
            },
            {
              "title": "Test engineering.",
              "sub-title": "ATE test programs, characterization and qualification for every chip we ship."
            }
          ]
        }
      }
    ]
  },
  {
    "section_id": "section-a3",
    "components": [
      {
        "category": "cta-section",
        "name": "website-cta-section",
        "props": {
          "heading": "Work on real silicon.",
          "sur-heading": "Careers",
          "sub-heading": "Small senior teams, honest recommendations and chips that ship. Open roles are published on our website."
        }
      }
    ]
  }
]
```

## Step 3 · How they work with clients

**User:** Can your engineers join our team?

**Why:** Team augmentation from the company document, as `website-content-section` with a rich list.

```json
[
  {
    "section_id": "section-a4",
    "components": [
      {
        "category": "content-section",
        "name": "website-content-section",
        "props": {
          "main-heading": "We don't just consult. We embed.",
          "sur-heading": "Engineering Team Augmentation",
          "sub-heading": "We place silicon, firmware, and test engineers directly inside your hardware team, working in your tools and your schedules, not delivering a report and leaving.",
          "lists": {
            "numbered": [],
            "rich": [
              {
                "title": "What we do",
                "text": "Embed digital, analog, verification, firmware and test engineers into your hardware team to design, verify, and ship, not just review."
              },
              {
                "title": "Why us",
                "text": "Engineers who have taken chips through tape-out, onboarded through the same protocols we use internally instead of ad hoc, with VP-level silicon leadership included."
              },
              {
                "title": "Process",
                "text": "Discovery and scoping first, then engineers embedded in your team for delivery, finishing with a documented handoff under our Customer Handoff Protocol."
              },
              {
                "title": "Engagement",
                "text": "Custom scoped engagements with a minimum of three months, always starting from a discovery call with our senior engineers."
              },
              {
                "title": "Proof",
                "text": "23 tape-outs with first-pass silicon success on 19 of them, delivered under our Specification Freeze, Verification Sign-off and Tape-out Readiness protocols."
              }
            ],
            "paragraph": []
          },
          "pills": [],
          "cta": "Book a discovery call"
        }
      }
    ]
  }
]
```
