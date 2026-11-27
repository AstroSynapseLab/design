# Website UI components

## Website Components

- Website Landing Heading Section
- Website Services Section
- Website Products Section
- Website Heading Section
- Website Content Section
- Website Contact Section
- Website Product Section
- Website Grid Section
- Website List Section
- Website FAQ Section
- Website Team Section
- Website Stream Section


### Shared rules

**Ruleset:**

- Every link and button sends either `href` (navigates) or `data-prompt` (sends a new message; the answer is added below the page)
- Add `"clear": true` next to a `data-prompt` when the answer should start a new page; the current page moves to history
- A non-empty `data-prompt` wins over `href`; send `clear` only as `true`, and only with a non-empty `data-prompt`

### Website Landing Heading Section

**Ruleset:**

- Use when the page (components array) is empty: always generate the website-landing-heading-section component first, unless the users query implies another type of component
- Keep the badges between min 1 - max 3 items
- Keep the badges label between min 1 - max 2 words
- Keep the main-heading between min 3 - max 8 words
- Keep the sub-heading between min 10 - max 30 words
- Keep the marquee between min 1 - max 3 words per entry
- Keep the ctas between min 0 - max 2 items
- Keep the ctas label between min 1 - max 4 words
- Keep the ctas href as a route starting with `/`
- Keep the ctas data-prompt as the follow-up question the button sends, empty when it only navigates
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
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
          { "label": "Efficiency"},
          { "label": "Reliability"},
          { "label": "Longevity"}
        ],
        "ctas": [
          { "label": "Start a project", "href": "/contact", "data-prompt": "" },
          { "label": "Explore our chips", "href": "/products", "data-prompt": "What chips do you make? Show me your products.", "clear": true }
        ],
        "marquee": ["Edge AI", "Power", "Korvane Silicon"]
      }
    }
  ]
}
```

### Website Services Section

**Ruleset:**

- Use when asked about the services provided
- Keep the list-items between min 3 - max 8 items
- Keep the heading between min 5 - max 8 words
- Keep the sur-heading to 1 word
- Keep the list-items title between min 2 - max 8 words
- Keep the list-items sub-title between min 8 - max 15 words

**JSON:**

```jsx
{
  "section_id": "section-a2",
  "components": [
    {
      "category": "services-section",
      "name": "website-services-section",
      "props": {
        "heading": "From concept to silicon under one roof",
        "sur-heading": "capabilities",
        "list-items": [
          { "title": "Custom ASIC & SoC Design.", "sub-title": "RISC-V SoCs · mixed-signal ASICs · spec to tape-out · 22nm to 180nm nodes"},
          { "title": "Design Verification & DFT.", "sub-title": "UVM testbenches · formal verification · FPGA prototyping · scan and BIST insertion"},
          { "title": "Analog & Mixed-Signal IP.", "sub-title": "ADCs · PLLs · LDOs · SerDes · licensable or custom-built for your process"},
          { "title": "Packaging & Chiplet Integration.", "sub-title": "QFN · FCBGA · WLCSP · antenna-in-package · 2.5D chiplets · thermal modeling"},
          { "title": "Test, Qualification & Reliability.", "sub-title": "ATE test programs · AEC-Q100 qualification · HTOL and ESD testing · failure analysis"},
          { "title": "Embedded Firmware & SDKs.", "sub-title": "Bootloaders · drivers · Zephyr RTOS support · model compilers for our accelerators"},
          { "title": "Lifecycle & Obsolescence Management.", "sub-title": "Drop-in replacements for end-of-life parts · 15-year supply · last-time-buy planning"},
          { "title": "Engineering Team Augmentation.", "sub-title": "Embedded silicon, firmware and test engineers · protocol-driven onboarding · VP-level leadership"}
        ]
      }
    }
  ]
}
```

### Website Products Section

**Ruleset:**

- Use when asked about the products offered
- Generate one product-card per product
- Keep the main-heading between min 4 - max 8 words
- Keep the sur-heading to 1 word
- Keep the product-cards title between min 1 - max 3 words
- Keep the product-cards sub-title between min 5 - max 15 words
- Keep the product-cards badge between min 1 - max 2 words
- Keep the product-cards cta between min 1 - max 4 words
- Keep the pills between min 2 - max 5 items
- Keep the pills label between min 1 - max 3 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-a3",
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
            {"label": "8 TOPS"},
            {"label": "Sub-1W"},
            {"label": "INT4/INT8"},
            {"label": "On-chip SRAM"},
            {"label": "RISC-V control core"}
          ]
          },
          {
          "title": "Ostra P8",
          "sub-title": "Eight-rail power management IC for battery-powered industrial and medical devices",
          "badge": "In production",
          "cta": "Request samples",
          "pills": [
            {"label": "8 rails"},
            {"label": "2µA quiescent"},
            {"label": "I²C/PMBus"},
            {"label": "On-chip telemetry"}
          ]
          },
          {
          "title": "Lumen R60",
          "sub-title": "60 GHz radar sensor SoC for presence, gesture and vital-sign detection",
          "badge": "Engineering samples",
          "cta": "Apply for samples",
          "pills": [
            {"label": "60 GHz radar"},
            {"label": "4D point cloud"},
            {"label": "On-chip DSP"},
            {"label": "Antenna-in-package"}
          ]
          },
          {
          "title": "Vault M4",
          "sub-title": "Secure microcontroller with post-quantum cryptography and hardware root of trust",
          "badge": "Waitlist",
          "cta": "Join the waitlist",
          "pills": [
            {"label": "Post-quantum crypto"},
            {"label": "PUF root of trust"},
            {"label": "Secure boot"},
            {"label": "CRA-ready"}
          ]
          },
          {
          "title": "Tessel Kit",
          "sub-title": "Modular evaluation platform for prototyping with every Korvane chip",
          "badge": "Live",
          "cta": "Order a kit",
          "pills": [
            {"label": "Plug-in modules"},
            {"label": "Tessel Studio app"},
            {"label": "Open reference designs"}
          ]
          }
        ]
      }
    }
  ]
}
```

### Website Heading Section

**Ruleset:**

- Use when conversation switches topics or when context implies emphasis on a topic
- Keep the heading between min 5 - max 8 words in min 1 - max 2 sentences
- Keep the sur-heading to max 1 word
- Keep the sub-text between min 10 - max 40 words

**JSON:**

```jsx
{
  "section_id": "section-a4",
  "components": [
    {
      "category": "heading-section",
      "name": "website-heading-section",
      "props": {
        "heading": "Dual-sourced silicon. Supported for fifteen years.",
        "sur-heading": "Resilience",
        "sub-text": "Every production design is qualified at two foundries and two packaging partners, with at least one site in Europe. Every standard product carries a fifteen-year longevity commitment, so one end-of-life notice never stops your line."
      }
    }
  ]
}
```

### Website CTA Section

**Ruleset:**

- Use when you want to incite the user to act and contact us in some way
- Keep the heading between min 2 - max 6 words
- Keep the sur-heading to max 1 word
- Keep the sub-heading between min 10 - max 20 words

**JSON:**

```jsx
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
```

### Website Contact Section

**Ruleset:**

- Use when you want to provide the user a contact form
- The contact form needs no props
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-a10",
  "components": [
    {
      "category": "contact-section",
      "name": "website-contact-section",
      "unique": true
    }
  ]
}
```

### Website Product Section

**Ruleset:**

- Use to display details about a product
- Keep the main-heading as the name of the product
- Keep the badge between min 1 - max 3 words
- Keep the top-paragraph title between min 5 - max 10 words
- Keep the top-paragraph text between min 20 - max 50 words
- Keep the bottom-paragraph title between min 5 - max 10 words
- Keep the bottom-paragraph text between min 20 - max 50 words
- The bottom-paragraph is optional, send an empty object when there is nothing to add
- Use the numbered list for one-line sentences of features, guides, or pain points the product addresses
- Keep the numbered list text between min 8 - max 12 words
- Keep the numbered list between min 3 - max 6 items
- Use the rich list for small titled paragraphs of features or use cases
- Keep the rich list title between min 1 - max 2 words
- Keep the rich list text between min 15 - max 30 words
- Keep the rich list between min 3 - max 5 items
- Use the labeled list for paragraphs whose first sentence acts as the label
- Keep the labeled list label between min 2 - max 4 words
- Keep the labeled list text between min 1 - max 30 words
- Keep the pills label between min 1 - max 3 words
- Keep the pills between min 2 - max 5 items
- Keep the cta between min 1 - max 3 words

**JSON Variant 1:**

```jsx
{
  "section_id": "section-a5",
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
            {"text": "Train your model in PyTorch or TensorFlow as usual"},
            {"text": "Compile it with the Nerva toolchain to INT8 or INT4"},
            {"text": "Connect Nerva N1 to your host over PCIe or USB"},
            {"text": "Stream camera frames directly in through MIPI CSI-2 inputs"},
            {"text": "Your model runs on the device at under one watt"}
          ],
          "rich": [],
          "labeled": []
        },
        "bottom-paragraph": {
          "title": "What sets it apart from GPUs and NPUs",
          "text": "Unlike general-purpose GPUs and NPUs bundled into application processors, Nerva N1 keeps the full model in on-chip memory, so it never stalls waiting on external DRAM. That delivers consistent frame rates, no thermal throttling, and no fan."
        },
        "pills": [
          {"label": "8 TOPS"},
          {"label": "Sub-1W"},
          {"label": "INT4/INT8"},
          {"label": "On-chip SRAM"},
          {"label": "22nm FD-SOI"}
        ],
        "cta": "View the datasheet"
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-a7",
  "components": [
    {
      "category": "product-section",
      "name": "website-product-section",
      "props": {
        "main-heading": "Lumen R60",
        "badge": "Engineering Samples",
        "top-paragraph": {
          "title": "See presence, motion and breathing without a camera.",
          "text": "Lumen R60 is a 60 GHz radar sensor SoC that detects people, gestures, and vital signs through plastic and fabric, with no camera and no images to protect."
        },
        "lists": {
          "numbered": [],
          "rich": [
            {"title": "Sense", "text": "Three transmit and four receive channels with integrated antennas produce a 4D point cloud of range, speed, and angle."},
            {"title": "Process", "text": "An on-chip DSP and RISC-V core run detection algorithms locally, so only results leave the chip, never raw radar data."},
            {"title": "Privacy", "text": "Radar sees movement, not faces, making it suitable for bathrooms, bedrooms, and care homes where cameras are unacceptable."},
            {"title": "Applications", "text": "In-cabin child presence detection, elderly fall detection, smart lighting control, and touchless interfaces for appliances and public kiosks."},
            {"title": "Specifications", "text": "57 to 64 GHz, three transmit and four receive channels, antenna-in-package, up to 15 metres range, with AEC-Q100 qualification in progress."}
          ],
          "labeled": []
        },
        "bottom-paragraph": {},
        "pills": [
          {"label": "60 GHz radar"},
          {"label": "4D point cloud"},
          {"label": "On-chip DSP"},
          {"label": "Privacy by design"}
        ],
        "cta": "Apply for samples"
      }
    }
  ]
}
```

**JSON Variant 3:**

```jsx
{
  "section_id": "section-a6",
  "components": [
    {
      "category": "product-section",
      "name": "website-product-section",
      "props": {
        "main-heading": "Vault M4",
        "badge": "Waitlist",
        "top-paragraph": {
          "title": "A microcontroller ready for the quantum era.",
          "text": "Vault M4 is a secure RISC-V microcontroller with a hardware root of trust and built-in post-quantum cryptography, designed for connected devices that must stay secure for fifteen years or more."
        },
        "lists": {
          "numbered": [],
          "rich": [],
          "labeled": [
            {"label": "Built for long-lived devices.", "text": "Smart meters and industrial controllers stay in the field for 15+ years. Hardware ML-KEM and ML-DSA keep them secure after classical encryption is broken."},
            {"label": "Hardware root of trust.", "text": "Device keys come from a physically unclonable function and are never stored in memory, with secure boot, encrypted updates, and active tamper detection built in."},
            {"label": "Coming next.", "text": "Pre-certified firmware stacks for EU Cyber Resilience Act compliance, plus a provisioning service that injects keys during production testing."}
          ]
        },
        "bottom-paragraph": {},
        "pills": [
          {"label": "Post-quantum crypto"},
          {"label": "PUF root of trust"},
          {"label": "Secure boot"},
          {"label": "Tamper detection"},
          {"label": "CRA-ready"}
        ],
        "cta": "Join the waitlist"
      }
    }
  ]
}
```

### Website Grid Section

**Ruleset:**

- Use to list items in boxes like relevant use cases, markets, verticals etc.
- Keep the heading between min 1 - max 5 words
- Keep the card-items between min 3 - max 9 items
- Keep the card-items title between min 1 - max 5 words
- Keep the card-items sub-title between min 10 - max 20 words

**JSON:**

```jsx
{
  "section_id": "section-a8",
  "components": [
    {
      "category": "grid-section",
      "name": "website-grid-section",
      "props": {
        "heading": "By Application",
        "card-items": [
          { "title": "Edge vision.", "sub-title": "Cameras detect defects, read labels, and count objects locally, with no video ever leaving the device."},
          { "title": "Industrial motor control.", "sub-title": "Precise, efficient drive control with integrated power stages and real-time fault protection on every channel."},
          { "title": "Battery management.", "sub-title": "Every cell monitored and balanced, extending battery life and catching failures before they become hazards."},
          { "title": "Smart metering.", "sub-title": "Meters that stay secure for fifteen years, protected against today's attacks and tomorrow's quantum computers."},
          { "title": "In-cabin sensing.", "sub-title": "Radar detects a child left in a car, through blankets and seats, without using a camera."},
          { "title": "Predictive maintenance.", "sub-title": "Vibration and acoustic models run on the sensor itself, flagging bearing wear weeks before a failure."},
          { "title": "Medical wearables.", "sub-title": "Months of continuous patient monitoring on a single coin cell, thanks to microamp-level standby power."},
          { "title": "Drone flight control.", "sub-title": "Obstacle detection and navigation processed onboard, within the tight power budget of a small airframe."},
          { "title": "Secure IoT gateways.", "sub-title": "Hardware root of trust and encrypted firmware updates for every device connected to the network."}
        ]
      }
    }
  ]
}
```

### Website List Section

**Ruleset:**

- Use when you want to provide a list of items
- Never use for FAQs or question and answer content, use the Website FAQ Section instead
- Keep the heading between min 1 - max 5 words
- Keep the sub-heading between min 5 - max 10 words in min 1 - max 2 sentences
- Keep the list-items between min 3 - max 8 items
- Keep the list-items title between min 1 - max 4 words
- Keep the list-items sub-title between min 10 - max 15 words

**JSON:**

```jsx
{
  "section_id": "section-a9",
  "components": [
    {
      "category": "list-section",
      "name": "website-list-section",
      "props": {
        "heading": "By Industry",
        "sub-heading": "Low-power, long-life silicon, applied across sectors:",
        "list-items": [
          { "title": "Automotive.", "sub-title": "In-cabin radar sensing and power management, qualified to AEC-Q100 for vehicle environments."},
          { "title": "Industrial automation.", "sub-title": "Machine vision, motor control, and predictive maintenance running directly on the factory floor."},
          { "title": "Energy.", "sub-title": "Secure smart meters, battery storage systems, and grid-edge monitoring with fifteen-year supply."},
          { "title": "Medical devices.", "sub-title": "Wearables and patient monitors running for months on a single small battery."},
          { "title": "Agritech.", "sub-title": "Solar-powered field sensors and vision systems that run for seasons without any maintenance."},
          { "title": "Smart buildings.", "sub-title": "Privacy-preserving occupancy sensing that cuts lighting and HVAC energy use across entire buildings."}
        ]
      }
    }
  ]
}
```

### Website Content Section

**Ruleset:**

- Use when displaying a large section with a lot of content, combine multiple lists if needed
- Keep the main-heading between min 1 - max 10 words
- Keep the sur-heading between min 1 - max 5 words
- Keep the sub-heading between min 10 - max 50 words
- Keep the cta between min 1 - max 4 words
- Keep the pills between min 1 - max 5 items
- Keep the pills label between min 1 - max 3 words
- Use the bullet list for one-line statements
- Keep the bullet list text between min 3 - max 12 words
- Use the numbered list for ordered steps
- Keep the numbered list text between min 8 - max 12 words
- Use the rich list for small titled paragraphs
- Keep the rich list title between min 1 - max 2 words
- Keep the rich list text between min 15 - max 30 words
- Use the paragraph list for titled paragraphs with longer text
- Keep the paragraph list title between min 1 - max 5 words
- Keep the paragraph list text between min 15 - max 60 words

**JSON Variant 1:**

```jsx
{
  "section_id": "section-b1",
  "components": [
    {
      "category": "content-section",
      "name": "website-content-section",
      "props": {
        "main-heading": "Your product's chip, designed from the specification up",
        "sur-heading": "Custom ASIC & SoC Design",
        "sub-heading": "We design custom ASICs and RISC-V based SoCs from specification to tape-out, combining our silicon-proven IP library with new blocks built for your product.",
        "lists": {
          "bullet": [],
          "rich": [],
          "paragraph": [
            {"title": "Replace a board with a chip", "text": "One custom chip can replace a board full of discrete parts, cutting power consumption, board area, and unit cost while making your design far harder to copy."},
            {"title": "Built from proven IP", "text": "Power domains, radar front ends, crypto engines, and RISC-V subsystems already shipping in our own products go into your design, reducing risk and shortening the schedule."},
            {"title": "Cost known from day one", "text": "Every program starts with a cost-per-unit model that is updated at each gate review, so you always know what the chip will cost at volume before committing further."}
          ]
        },
        "pills": [
          {"label": "RISC-V SoCs"},
          {"label": "Mixed-signal ASICs"},
          {"label": "22nm to 180nm"},
          {"label": "MPW prototyping"}
        ],
        "cta": "Start a project"
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-b1",
  "components": [
    {
      "category": "content-section",
      "name": "website-content-section",
      "props": {
        "main-heading": "Every chip proven before it ships.",
        "sur-heading": "Test, Qualification & Reliability",
        "sub-heading": "We develop production test programs, run reliability qualification, and handle failure analysis when something comes back from the field.",
        "lists": {
          "bullet": [
            {"text": "ATE test program development and optimisation"},
            {"text": "AEC-Q100 qualification for automotive programs"},
            {"text": "High-temperature operating life testing"},
            {"text": "ESD and latch-up testing"},
            {"text": "Characterisation across voltage and temperature corners"},
            {"text": "Wafer-level and final test correlation"},
            {"text": "Full traceability from wafer lot to unit"},
            {"text": "8D failure analysis reporting for field returns"}
          ],
          "rich": [],
          "paragraph": []
        },
        "pills": [],
        "cta": "Contact us"
      }
    }
  ]
}
```

**JSON Variant 3:**

```jsx
{
  "section_id": "section-b1",
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
            {"title": "What we do", "text": "Embed digital, analog, verification, firmware and test engineers into your hardware team to design, verify, and ship, not just review."},
            {"title": "Why us", "text": "Engineers who have taken chips through tape-out, onboarded through the same protocols we use internally instead of ad hoc, with VP-level silicon leadership included."},
            {"title": "Process", "text": "Discovery and scoping first, then engineers embedded in your team for delivery, finishing with a documented handoff under our Customer Handoff Protocol."},
            {"title": "Engagement", "text": "Custom scoped engagements with a minimum of three months, always starting from a discovery call with our senior engineers."},
            {"title": "Proof", "text": "23 tape-outs with first-pass silicon success on 19 of them, delivered under our Specification Freeze, Verification Sign-off and Tape-out Readiness protocols."}
          ],
          "paragraph": []
        },
        "pills": [],
        "cta": "Book a discovery call"
      }
    }
  ]
}
```

**JSON Variant 4:**

```jsx
{
  "section_id": "section-b1",
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
            {"title": "Consolidation & supply security", "text": "Discrete regulators, interface chips, and glue logic consolidated into a single standard Korvane part or a small custom ASIC. The board gets smaller, the bill of materials gets shorter, and every critical component comes with a fifteen-year supply commitment."},
            {"title": "Intelligence at the sensor", "text": "Vision, vibration, and acoustic models run directly on the sensor node, so only events travel over the network. Radar replaces cameras wherever privacy matters, and local decisions keep working when the connection drops."},
            {"title": "Secure, self-managing fleets", "text": "A hardware root of trust in every device, post-quantum encrypted over-the-air updates across thousands of units, and on-chip telemetry that flags failing devices before they fail. Fully custom SoCs follow once volumes justify them."}
          ]
        },
        "pills": [],
        "cta": "Contact us"
      }
    }
  ]
}
```

### Website FAQ Section

**Ruleset:**

- Use when asked for an FAQ, frequently asked questions, or any question and answer content
- Keep the heading between min 1 - max 5 words
- Keep the sub-heading between min 5 - max 15 words in min 1 - max 2 sentences
- Keep the items between min 3 - max 8 items
- Keep the items question as a full question between min 4 - max 12 words
- Keep the items answer between min 15 - max 50 words
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON:**

```jsx
{
  "section_id": "section-c1",
  "components": [
    {
      "category": "faq-section",
      "name": "website-faq-section",
      "unique": true,
      "props": {
        "heading": "Frequently asked questions",
        "sub-heading": "Straight answers about working with our silicon team.",
        "items": [
          { "question": "How long does a custom ASIC program take?", "answer": "A typical program runs twelve to eighteen months from specification to first silicon, with MPW prototypes available in the first six months."},
          { "question": "What are the minimum order volumes?", "answer": "Standard parts ship from a single reel. Custom ASICs usually make sense from around fifty thousand units a year, and we model the cost per unit before you commit."},
          { "question": "How long will parts stay in production?", "answer": "Every critical component comes with a fifteen-year supply commitment, backed by multi-foundry sourcing for our core process nodes."}
        ]
      }
    }
  ]
}
```

### Website Team Section

**Ruleset:**

- Use when the user asks who is behind the company: the team, founders, leadership, or the people they would work with
- Send it alone, or after an website-heading-section or website-content-section; it can be followed by an website-cta-section
- Use `variant` `grid` for the whole team and `featured` when one person leads the answer (founder, CEO, or a person the user asked about); default is `grid`
- Generate a plausible team that fits the company's industry, size and location
- Keep the sur-heading to max 1 word
- Keep the heading between min 3 - max 8 words
- Keep the sub-heading between min 10 - max 25 words, optional
- Keep the members between min 3 - max 8 items for `grid`, and min 3 - max 5 items for `featured`, where the first member is the featured one
- Keep the members name to a first and last name
- Keep the members role between min 1 - max 5 words
- Keep the members bio between min 8 - max 20 words, or min 20 - max 40 words for the featured member
- Keep the members image as an Unsplash portrait photo id, for example `photo-1573496359142-b8d87734a5a2`
- Keep the members socials between min 0 - max 3 items; `type` is one of `linkedin`, `x`, `github`, and `href` is always `#`
- Keep the members data-prompt as `Tell me more about <name>`
- Keep the ctas between min 0 - max 1 item; send `href` as a route starting with `/` to navigate, or `data-prompt` to ask the agent, empty when it only navigates
- Unique: always send `"unique": true` on the component; the page holds it once, and sending it again fills in its missing props and scrolls to it instead of adding a copy

**JSON Variant 1:**

```jsx
{
  "section_id": "section-a11",
  "components": [
    {
      "category": "team-section",
      "name": "website-team-section",
      "unique": true,
      "props": {
        "variant": "grid",
        "sur-heading": "Team",
        "heading": "The engineers behind every tape-out",
        "sub-heading": "Silicon, firmware and test engineers who have shipped chips at scale, now working as one team.",
        "members": [
          {
            "name": "Lena Hartmann",
            "role": "Founder & CEO",
            "bio": "Led mixed-signal design teams for fifteen years before founding Korvane.",
            "image": "photo-1573496359142-b8d87734a5a2",
            "socials": [
              { "type": "linkedin", "href": "#" },
              { "type": "x", "href": "#" }
            ],
            "data-prompt": "Tell me more about Lena Hartmann"
          },
          {
            "name": "Marco Vidal",
            "role": "VP of Engineering",
            "bio": "Runs verification and DFT; has signed off forty tape-outs across six nodes.",
            "image": "photo-1500648767791-00dcc994a43e",
            "socials": [{ "type": "linkedin", "href": "#" }],
            "data-prompt": "Tell me more about Marco Vidal"
          },
          {
            "name": "Aiko Tanaka",
            "role": "Head of Firmware",
            "bio": "Builds the SDKs and Zephyr drivers that make our chips easy to adopt.",
            "image": "photo-1544005313-94ddf0286df2",
            "socials": [{ "type": "github", "href": "#" }],
            "data-prompt": "Tell me more about Aiko Tanaka"
          },
          {
            "name": "Daniel Okafor",
            "role": "Test & Reliability Lead",
            "bio": "Owns AEC-Q100 qualification and the failure analysis lab in Dresden.",
            "image": "photo-1507003211169-0a1dd7228f2d",
            "socials": [{ "type": "linkedin", "href": "#" }],
            "data-prompt": "Tell me more about Daniel Okafor"
          }
        ],
        "ctas": [
          { "label": "Join the team", "href": "/careers", "data-prompt": "" }
        ]
      }
    }
  ]
}
```

**JSON Variant 2:**

```jsx
{
  "section_id": "section-a12",
  "components": [
    {
      "category": "team-section",
      "name": "website-team-section",
      "unique": true,
      "props": {
        "variant": "featured",
        "sur-heading": "Leadership",
        "heading": "Meet the people who lead Korvane",
        "sub-heading": "A small leadership team that still reviews every design before it goes to the foundry.",
        "members": [
          {
            "name": "Lena Hartmann",
            "role": "Founder & CEO",
            "bio": "Spent fifteen years leading mixed-signal design teams before founding Korvane to build chips that do one thing exceptionally well. She still reviews every spec before a program starts.",
            "image": "photo-1573496359142-b8d87734a5a2",
            "socials": [
              { "type": "linkedin", "href": "#" },
              { "type": "x", "href": "#" }
            ],
            "data-prompt": "Tell me more about Lena Hartmann"
          },
          {
            "name": "Marco Vidal",
            "role": "VP of Engineering",
            "bio": "Runs verification and DFT; has signed off forty tape-outs across six nodes.",
            "image": "photo-1500648767791-00dcc994a43e",
            "socials": [{ "type": "linkedin", "href": "#" }],
            "data-prompt": "Tell me more about Marco Vidal"
          },
          {
            "name": "Aiko Tanaka",
            "role": "Head of Firmware",
            "bio": "Builds the SDKs and Zephyr drivers that make our chips easy to adopt.",
            "image": "photo-1544005313-94ddf0286df2",
            "socials": [{ "type": "github", "href": "#" }],
            "data-prompt": "Tell me more about Aiko Tanaka"
          }
        ],
        "ctas": [
          { "label": "Are you hiring?", "href": "", "data-prompt": "Are you hiring? What roles are open?" }
        ]
      }
    }
  ]
}
```

### Website Stream Section

**Ruleset:**

- Use only when no other component can answer the query
- Keep the heading between min 2 - max 8 words, optional
- Leave text empty, it is filled by streaming

**JSON:**

```jsx
{
  "section_id": "section-a1",
  "components": [
    {
      "category": "stream-section",
      "name": "website-stream-section",
      "props": {
        "heading": "About your question",
        "text": ""
      }
    }
  ]
}
```
