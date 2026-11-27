# First visit to contact

A visitor lands on the empty page, asks what Korvane makes, reads about one chip and decides to get in touch.

## Step 1 · First visit

**User:** _Opens the site. The page is empty._

**Why:** An empty page always starts with `website-landing-heading-section`.

```json
[
  {
    "section_id": "section-a1",
    "components": [
      {
        "category": "landing-heading-section",
        "name": "website-landing-heading-section",
        "unique": true,
        "props": {
          "main-heading": "Purpose-built silicon for the intelligent edge",
          "sub-heading": "Fabless chip design house building low-power AI, power and sensing chips, and custom silicon for products that have outgrown off-the-shelf parts.",
          "badges": [
            {
              "label": "Efficiency"
            },
            {
              "label": "Reliability"
            },
            {
              "label": "Longevity"
            }
          ],
          "ctas": [
            {
              "label": "Start a project",
              "href": "/contact",
              "data-prompt": ""
            },
            {
              "label": "Explore our chips",
              "href": "/products",
              "data-prompt": "What chips do you make? Show me your products."
            }
          ],
          "marquee": [
            "Edge AI",
            "Power",
            "Korvane Silicon"
          ]
        }
      }
    ]
  }
]
```

## Step 2 · Asks about products

**User:** What chips do you make?

**Why:** A question about the products offered: `website-products-section`, one card per product in the company document.

```json
[
  {
    "section_id": "section-a2",
    "components": [
      {
        "category": "products-section",
        "name": "website-products-section",
        "unique": true,
        "props": {
          "main-heading": "Chips we design and ship ourselves.",
          "sur-heading": "Products",
          "product-cards": [
            {
              "title": "Nerva N1",
              "sub-title": "Edge AI inference accelerator, 8 TOPS at under one watt",
              "badge": "In production",
              "cta": "View the datasheet",
              "pills": [
                {
                  "label": "8 TOPS"
                },
                {
                  "label": "Sub-1W"
                },
                {
                  "label": "INT4/INT8"
                },
                {
                  "label": "On-chip SRAM"
                },
                {
                  "label": "RISC-V control core"
                }
              ]
            },
            {
              "title": "Ostra P8",
              "sub-title": "Eight-rail power management IC for battery-powered industrial and medical devices",
              "badge": "In production",
              "cta": "Request samples",
              "pills": [
                {
                  "label": "8 rails"
                },
                {
                  "label": "2µA quiescent"
                },
                {
                  "label": "I²C/PMBus"
                },
                {
                  "label": "On-chip telemetry"
                }
              ]
            },
            {
              "title": "Lumen R60",
              "sub-title": "60 GHz radar sensor SoC for presence, gesture and vital-sign detection",
              "badge": "Engineering samples",
              "cta": "Apply for samples",
              "pills": [
                {
                  "label": "60 GHz radar"
                },
                {
                  "label": "4D point cloud"
                },
                {
                  "label": "On-chip DSP"
                },
                {
                  "label": "Antenna-in-package"
                }
              ]
            },
            {
              "title": "Vault M4",
              "sub-title": "Secure microcontroller with post-quantum cryptography and hardware root of trust",
              "badge": "Waitlist",
              "cta": "Join the waitlist",
              "pills": [
                {
                  "label": "Post-quantum crypto"
                },
                {
                  "label": "PUF root of trust"
                },
                {
                  "label": "Secure boot"
                },
                {
                  "label": "CRA-ready"
                }
              ]
            },
            {
              "title": "Tessel Kit",
              "sub-title": "Modular evaluation platform for prototyping with every Korvane chip",
              "badge": "Live",
              "cta": "Order a kit",
              "pills": [
                {
                  "label": "Plug-in modules"
                },
                {
                  "label": "Tessel Studio app"
                },
                {
                  "label": "Open reference designs"
                }
              ]
            }
          ]
        }
      }
    ]
  }
]
```

## Step 3 · Reads about one chip

**User:** Tell me about Nerva N1

**Why:** One product in detail: `website-product-section`, then a CTA to turn interest into action.

```json
[
  {
    "section_id": "section-a3",
    "components": [
      {
        "category": "product-section",
        "name": "website-product-section",
        "props": {
          "main-heading": "Nerva N1",
          "badge": "In Production",
          "top-paragraph": {
            "title": "Run vision AI on the device, not the cloud.",
            "text": "Smart cameras and robots need real-time neural networks, but GPUs draw too much power and cloud inference adds latency and privacy risk. Nerva N1 runs vision and audio models locally at 8 TOPS while drawing under one watt."
          },
          "lists": {
            "numbered": [
              {
                "text": "Train your model in PyTorch or TensorFlow as usual"
              },
              {
                "text": "Compile it with the Nerva toolchain to INT8 or INT4"
              },
              {
                "text": "Connect Nerva N1 to your host over PCIe or USB"
              },
              {
                "text": "Stream camera frames directly in through MIPI CSI-2 inputs"
              },
              {
                "text": "Your model runs on the device at under one watt"
              }
            ],
            "rich": [],
            "labeled": []
          },
          "bottom-paragraph": {
            "title": "What sets it apart from GPUs and NPUs",
            "text": "Unlike general-purpose GPUs and NPUs bundled into application processors, Nerva N1 keeps the full model in on-chip memory, so it never stalls waiting on external DRAM. That delivers consistent frame rates, no thermal throttling, and no fan."
          },
          "pills": [
            {
              "label": "8 TOPS"
            },
            {
              "label": "Sub-1W"
            },
            {
              "label": "INT4/INT8"
            },
            {
              "label": "On-chip SRAM"
            },
            {
              "label": "22nm FD-SOI"
            }
          ],
          "cta": "View the datasheet"
        }
      }
    ]
  },
  {
    "section_id": "section-a4",
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

## Step 4 · Wants to talk

**User:** I'd like to start a project

**Why:** A heading frames the next step; the contact form needs no props.

```json
[
  {
    "section_id": "section-a5",
    "components": [
      {
        "category": "heading-section",
        "name": "website-heading-section",
        "props": {
          "heading": "Tell us what you're building.",
          "sur-heading": "Contact",
          "sub-text": "Engagements start with a discovery call. Share your expected annual volume and what you're building, and a senior engineer will reply honestly about whether custom silicon makes sense."
        }
      }
    ]
  },
  {
    "section_id": "section-a6",
    "components": [
      {
        "category": "contact-section",
        "name": "website-contact-section",
        "unique": true
      }
    ]
  }
]
```
