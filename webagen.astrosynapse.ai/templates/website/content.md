# Korvane Silicon — Company Document

**Fabless Semiconductor Design House**
Korvane Silicon B.V. · Eindhoven, Netherlands
Website: https://korvanesilicon.eu · Email: hello@korvanesilicon.eu

> All company names, people, products, customers, figures and addresses in this document are fictional and created for demo purposes.

---

## Table of Contents

1. [Company Overview](#1-company-overview)
2. [Mission & Positioning](#2-mission--positioning)
3. [How We Operate](#3-how-we-operate)
4. [Our Process: Concept to Silicon](#4-our-process-concept-to-silicon)
5. [Solutions (Services)](#5-solutions-services)
6. [Products](#6-products)
7. [Use Cases](#7-use-cases)
8. [Supply Chain Resilience](#8-supply-chain-resilience)
9. [Quality & Certifications](#9-quality--certifications)
10. [About the Company](#10-about-the-company)
11. [Strategy & Direction](#11-strategy--direction)
12. [Contact & Company Details](#12-contact--company-details)

---

## 1. Company Overview

Korvane Silicon is a fabless semiconductor design house — part chip design studio, part product company. We design, verify, and ship low-power chips for the intelligent edge: AI inference accelerators, power management ICs, radar sensors, and secure microcontrollers. Alongside our own chips, we design custom silicon for companies whose products have outgrown off-the-shelf parts.

We don't own a fab. We own the design, the verification, the test programs, and the relationship with every foundry and packaging partner in our supply chain — so our customers get one accountable team from first specification to volume production.

**Core pillars:** Efficiency · Reliability · Longevity

**Focus areas:** Edge AI · Power · Sensing · Security

**At a glance:**

| | |
|---|---|
| **Founded** | 2019 |
| **Headquarters** | Eindhoven, Netherlands |
| **Design centers** | Eindhoven (digital & system), Porto (analog & RF) |
| **Team** | 46 engineers, 61 people total |
| **Tape-outs completed** | 23 (11 own products, 12 customer ASICs) |
| **Chips shipped** | 9.4 million units to date |
| **Process nodes** | 22nm FD-SOI, 40nm RF CMOS, 130nm BCD, 180nm |

---

## 2. Mission & Positioning

> We design chips that do one thing exceptionally well.

General-purpose chips are built to sell into every market at once, which means every product that uses them pays for features it will never touch — in power, in board space, and in cost. We design silicon around a specific job and strip out everything else.

**Our approach to silicon:** Not every product needs a custom chip, and pretending otherwise is how hardware programs burn a year and a seven-figure budget. If an off-the-shelf part meets your power, cost, and supply requirements, we will tell you to buy it. Custom silicon earns its place only when volume, power budget, form factor, security, or supply risk make standard parts the more expensive option over the product's lifetime.

**Our promise to clients:** Tell us what you're building; we'll tell you honestly whether you need custom silicon at all, and what it would take to get there.

**What we are not:** We are not a foundry, a distributor, or a design-services body shop. Every engagement is led by senior engineers who have taken chips through tape-out, and every chip we design for a client goes through the same process as our own products.

---

## 3. How We Operate

### Two halves that feed each other

We split our work into two halves:

- **Design Services** — we design custom ASICs and SoCs for clients, and supply verification, analog IP, packaging, test, and firmware expertise as stand-alone services.
- **Products** — we design and sell our own chips (Nerva N1, Ostra P8, Lumen R60, Vault M4) and the Tessel evaluation platform.

Client programs fund our research. The research becomes reusable IP — power domains, radar front ends, crypto engines, RISC-V subsystems. That silicon-proven IP goes into our own products, and our products prove it at volume before it goes back into client designs. Every block we license to a client has already shipped in production.

### Protocol-driven delivery

Hardware punishes improvisation: a mistake found after tape-out costs months, not hours. Every program runs on a small set of internal protocols, refined across 23 tape-outs:

- Specification Freeze Protocol
- Architecture Review Protocol
- Verification Sign-off Protocol
- Tape-out Readiness Protocol
- Silicon Bring-up Protocol
- Qualification & Release Protocol
- Customer Handoff Protocol

### Technology stack

The same toolchain and IP library serves our own products and our client programs, so what we build for ourselves and what we build for clients stays compatible:

- **Processor cores:** RISC-V (RV32 control cores, RV64 application cores with vector extensions)
- **Digital design:** SystemVerilog, UVM verification, formal property checking
- **Analog & RF:** Custom ADCs, PLLs, LDOs, mmWave front ends
- **Process nodes:** 22nm FD-SOI, 40nm RF CMOS, 130nm BCD, 180nm mixed-signal
- **Packaging:** QFN, FCBGA, WLCSP, antenna-in-package, 2.5D chiplet integration
- **Firmware:** C and Rust, Zephyr RTOS support, in-house model compiler for Nerva

---

## 4. Our Process: Concept to Silicon

From first conversation to production silicon in nine stages. A typical custom ASIC program takes 14 to 22 months; a derivative of existing Korvane IP can take as little as 9.

1. **Discovery.** We review your product, volumes, power budget, and supply risks — and decide together whether custom silicon makes sense at all.
2. **Specification.** Requirements become a frozen specification: functions, interfaces, power targets, package, cost per unit.
3. **Architecture.** We partition the system, select IP blocks, choose the process node, and model power and performance before any design work starts.
4. **Design.** RTL for digital blocks, schematics and layout for analog and RF, built from silicon-proven IP wherever possible.
5. **Verification.** UVM testbenches, formal checks, and FPGA prototypes run until coverage targets are met — typically 70% of the pre-silicon effort.
6. **Physical design.** Floorplanning, place and route, timing closure, and sign-off checks for the target foundry.
7. **Tape-out.** The design goes to the foundry through a multi-project wafer for prototypes or a dedicated run for production.
8. **Bring-up & characterization.** First silicon is tested on our lab benches across voltage and temperature, with firmware ready on day one.
9. **Qualification & production.** Reliability testing, test program release, and handover to volume manufacturing with dual-sourced supply.

**What you get at every stage:** a written gate review, an updated cost-per-unit estimate, and a clear go or no-go recommendation. You can stop at any gate and keep everything produced so far.

---

## 5. Solutions (Services)

Silicon built around how your product actually works.

### 5.1 Custom ASIC & SoC Design
**Your product's chip, designed from the specification up.**

We design custom ASICs and RISC-V based SoCs from specification to tape-out, combining our silicon-proven IP library with new blocks built for your product. One chip can replace a board full of discrete parts — cutting power, area, and unit cost while making your design much harder to copy.

- RISC-V SoC design
- Mixed-signal ASICs
- Spec to tape-out ownership
- 22nm to 180nm process nodes
- Multi-project wafer prototyping
- Cost-per-unit modeling from day one

**Typical engagement:** 14–22 months; a derivative design starts at 9.

### 5.2 Design Verification & DFT
**Find the bug before the foundry does.**

Verification is the majority of the work in any chip, and the stage most often underfunded. We build UVM testbenches, write formal properties, and run FPGA prototypes until coverage closes, and we insert design-for-test structures so every chip can be tested quickly in production.

- UVM testbench development
- Formal verification
- FPGA prototyping
- Scan and BIST insertion
- Coverage closure and sign-off

### 5.3 Analog & Mixed-Signal IP
**Proven analog blocks, licensable or custom-built.**

Our Porto design center builds the analog blocks most digital teams can't: data converters, clock generation, power regulation, and high-speed interfaces. License a block from our catalog or have one designed and ported to your process.

- 12-bit and 16-bit ADCs
- Fractional-N PLLs
- Low-noise LDOs and DC-DC converters
- SerDes up to 16 Gbps
- Process porting

### 5.4 Packaging & Chiplet Integration
**The package is part of the design.**

We design the package alongside the die — selecting the format, modeling thermal and signal integrity, and managing the packaging partner. For larger systems, we integrate multiple dies into a single 2.5D chiplet package.

- QFN, FCBGA and WLCSP
- Antenna-in-package for mmWave
- 2.5D chiplet integration
- Thermal and signal-integrity modeling
- Packaging partner management

### 5.5 Test, Qualification & Reliability
**Every chip proven before it ships.**

We develop the production test programs, run reliability qualification, and handle failure analysis when something comes back from the field. Automotive programs are qualified to AEC-Q100.

- ATE test program development
- AEC-Q100 qualification
- HTOL, ESD and latch-up testing
- Characterization across voltage and temperature
- Failure analysis

### 5.6 Embedded Firmware & SDKs
**Silicon is only as good as the software that runs it.**

Every chip we design ships with working firmware on day one of bring-up: bootloaders, drivers, board support packages, and Zephyr RTOS integration. For AI hardware, we build the model compilers that turn trained networks into efficient on-chip code.

- Bootloaders and secure boot
- Device drivers and BSPs
- Zephyr RTOS support
- Model compiler toolchains
- Reference applications

### 5.7 Lifecycle & Obsolescence Management
**When your critical part goes end-of-life, we build its replacement.**

Industrial, medical, and rail products live for decades; the chips inside them often don't. We design pin-compatible, drop-in replacements for discontinued parts and guarantee long-term supply so a single end-of-life notice never stops your production line.

- Pin-compatible drop-in replacements
- 15-year supply commitments
- Last-time-buy planning
- Component risk audits

### 5.8 Engineering Team Augmentation
**We don't just consult. We embed.**

We place silicon, firmware, and test engineers directly inside your hardware team, working in your tools and your schedules — not delivering a report and leaving.

| | |
|---|---|
| **What we do** | Embed digital, analog, verification, firmware and test engineers into your hardware team to design, verify, and ship — not just review. |
| **Why us** | Engineers who have taken chips through tape-out, onboarded through the same protocols we use internally (Specification Freeze, Tape-out Readiness, Customer Handoff) instead of ad hoc. Includes VP-level silicon leadership. |
| **Process** | Discovery → Scoping → Embedded delivery → Handoff |
| **Engagement** | Custom scoped, minimum three months, starting from a discovery call |
| **Proof** | 23 tape-outs, first-pass silicon success on 19 of them, delivered under protocol: Specification Freeze, Architecture Review, Verification Sign-off, Tape-out Readiness, Silicon Bring-up, Qualification & Release |

---

## 6. Products

Chips we design and ship ourselves.

| # | Product | Status | One-liner | Link |
|---|---|---|---|---|
| 001 | Nerva N1 | In Production | Edge AI inference accelerator, 8 TOPS at under one watt | https://korvanesilicon.eu/nerva |
| 002 | Ostra P8 | In Production | Eight-rail power management IC for battery-powered devices | https://korvanesilicon.eu/ostra |
| 003 | Lumen R60 | Engineering Samples | 60 GHz radar sensor SoC for presence, gesture and vital signs | https://korvanesilicon.eu/lumen |
| 004 | Vault M4 | Waitlist | Secure microcontroller with post-quantum cryptography | https://korvanesilicon.eu/vault |
| 005 | Tessel Kit | Live | Modular evaluation platform for every Korvane chip | https://korvanesilicon.eu/tessel |

### 6.1 Nerva N1 — In Production
**Run vision AI on the device, not in the cloud.**

**Problem:** Smart cameras, inspection systems, and robots need to run neural networks in real time, but GPUs draw too much power and cloud inference adds latency, bandwidth cost, and privacy risk.

**Solution:** Nerva N1 is a dedicated inference accelerator that runs modern vision and audio models locally at 8 TOPS while drawing under one watt — small enough to sit next to the image sensor and efficient enough to run on battery or PoE power.

**How it works:**
1. Train your model in PyTorch or TensorFlow as usual
2. Compile it with the Nerva toolchain to INT8 or INT4
3. Connect Nerva N1 to your host over PCIe or USB
4. Stream camera frames directly in through MIPI CSI-2
5. Your model runs on-device at under one watt

**Key specifications:**

| | |
|---|---|
| Peak performance | 8 TOPS (INT8), 16 TOPS (INT4) |
| Typical power | 0.9 W at full load |
| On-chip memory | 4 MB SRAM |
| Control core | RISC-V RV32 |
| Interfaces | MIPI CSI-2 (2× 4-lane), PCIe Gen3 x1, USB 3.2 |
| Process | 22nm FD-SOI |
| Package | 9 × 9 mm FCBGA |
| Temperature range | −40 °C to +105 °C |

**What sets it apart:** Unlike general-purpose GPUs and NPUs bundled into application processors, Nerva N1 keeps the full model in on-chip memory, so it never stalls waiting on external DRAM. That's where most of its power advantage comes from, and why it delivers consistent frame rates with no thermal throttling.

**Proof:** Lyrafield, a maker of industrial inspection cameras, moved defect detection from an embedded GPU module to Nerva N1, cutting camera power from 11 W to 3.2 W and removing the fan from its enclosure entirely.

**Key features:** 8 TOPS · Sub-1 W · INT4/INT8 · On-chip SRAM · RISC-V control core

### 6.2 Ostra P8 — In Production
**Eight power rails. One chip. Two microamps.**

**Problem:** Battery-powered industrial and medical devices often need six to ten separate voltage regulators, each adding board area, cost, and standby current that drains batteries in storage.

**Solution:** Ostra P8 integrates four buck converters and four LDOs into a single programmable power management IC with a quiescent current of just 2 µA, configured over I²C or PMBus and stored in one-time-programmable memory.

- **Integrate** — Four high-efficiency buck converters and four low-noise LDOs replace up to eight discrete regulators.
- **Program** — Voltages, sequencing, and fault limits set over I²C/PMBus, then locked into on-chip OTP memory.
- **Monitor** — Built-in telemetry reports voltage, current, and temperature on every rail.
- **Protect** — Over-voltage, over-current, and thermal shutdown on each rail independently.

**Key specifications:** 2.7–5.5 V input · up to 94% efficiency · 2 µA quiescent current · 130nm BCD · 4 × 4 mm WLCSP

**Proof:** Brenholt Elektro, an industrial drives manufacturer, replaced seven discrete regulators with a single Ostra P8, cutting power-section BOM cost by 31% and board area by 44%.

**Key features:** 8 rails · 2 µA quiescent · I²C/PMBus · On-chip telemetry · OTP configuration

### 6.3 Lumen R60 — Engineering Samples
**See presence, motion and breathing — without a camera.**

Lumen R60 is a 60 GHz radar sensor SoC that detects people, gestures, and vital signs through plastic and fabric, with no camera and no images to protect.

- **Sense** — Three transmit and four receive channels with integrated antennas produce a 4D point cloud of range, speed, and angle.
- **Process** — An on-chip DSP and RISC-V core run detection algorithms locally, so only results leave the chip.
- **Privacy** — Radar sees movement, not faces, making it suitable for bathrooms, bedrooms, and care homes where cameras are unacceptable.
- **Applications** — In-cabin child presence detection, elderly fall detection, smart lighting, and touchless controls.

**Key specifications:** 57–64 GHz · 3 TX / 4 RX · antenna-in-package · up to 15 m range · 40nm RF CMOS · AEC-Q100 qualification in progress

**Key features:** 60 GHz radar · 4D point cloud · On-chip DSP · Antenna-in-package · Privacy by design

### 6.4 Vault M4 — Waitlist
**A microcontroller ready for the quantum era.**

Vault M4 is a secure RISC-V microcontroller with a hardware root of trust and built-in post-quantum cryptography, designed for connected devices that must stay secure for fifteen years or more.

- **Built for long-lived devices** — Smart meters, industrial controllers, and medical devices stay in the field for 15+ years. Vault M4 implements the post-quantum algorithms ML-KEM and ML-DSA in hardware, so devices shipped today stay secure after classical encryption is broken.
- **Hardware root of trust** — Device keys are generated from a physically unclonable function and never stored in memory. Secure boot, encrypted firmware updates, and an active tamper-detection mesh are built in.
- **Coming next** — Pre-certified firmware stacks for EU Cyber Resilience Act compliance, and a secure provisioning service that injects keys during production testing.

**Key specifications:** RISC-V RV32 at 200 MHz · 1 MB flash · 256 KB SRAM · hardware PQC engine · PUF key storage · 22nm FD-SOI

**Key features:** Post-quantum crypto · PUF root of trust · Secure boot · Tamper detection · CRA-ready

### 6.5 Tessel Kit — Live
**Prototype with every Korvane chip on one board.**

Tessel is a modular evaluation platform: one carrier board, plug-in modules for each Korvane chip, and a desktop app for configuration, telemetry, and firmware flashing. Prototype a vision sensor, a radar node, or a secure gateway in an afternoon instead of designing a custom board first.

- Carrier board with USB-C power and debug
- Plug-in modules for Nerva N1, Ostra P8, Lumen R60 and Vault M4
- Raspberry Pi and Arduino-compatible headers
- Tessel Studio desktop app for Windows, macOS and Linux
- Reference designs and schematics included

**Key features:** Modular · Plug-in chip modules · Tessel Studio app · Open reference designs

---

## 7. Use Cases

Where purpose-built silicon actually pays off — organised by application, not by spec sheet.

### 7.1 By Application

| Application | What our silicon does |
|---|---|
| **Edge vision** | Cameras detect defects, read labels, and count objects locally, with no video leaving the device. |
| **Industrial motor control** | Precise, efficient drive control with integrated power stages and real-time fault protection. |
| **Battery management** | Every cell monitored and balanced, extending battery life and catching failures before they become hazards. |
| **Smart metering** | Meters that stay secure for fifteen years, protected against today's attacks and tomorrow's quantum computers. |
| **In-cabin sensing** | Radar detects a child left in a car, through blankets and seats, without a camera. |
| **Predictive maintenance** | Vibration and acoustic models run on the sensor, flagging bearing wear weeks before failure. |
| **Medical wearables** | Months of continuous monitoring on a coin cell, thanks to microamp-level standby power. |
| **Drone flight control** | Obstacle detection and navigation processed onboard, within the tight power budget of a small airframe. |
| **Secure IoT gateways** | Hardware root of trust and encrypted updates for every device connected to the network. |

### 7.2 By Industry

Low-power, long-life silicon, applied across sectors:

- **Automotive** — In-cabin radar sensing and power management, qualified to AEC-Q100 for vehicle environments.
- **Industrial automation** — Machine vision, motor control, and predictive maintenance on the factory floor.
- **Energy** — Secure smart meters, battery storage systems, and grid-edge monitoring with fifteen-year supply.
- **Medical devices** — Wearables and patient monitors running for months on a single small battery.
- **Agritech** — Solar-powered field sensors and vision systems that run for seasons without maintenance.
- **Smart buildings** — Privacy-preserving occupancy sensing that cuts lighting and HVAC energy use.

### 7.3 Silicon in Industrial Systems

Not every product needs a custom chip, and pretending otherwise is how hardware programs fail.

**The right approach:** Where an off-the-shelf part meets the power, cost, and supply requirements, that part wins. Custom silicon earns its place only where standard parts can't meet the power budget, take up too much board space, cost too much at volume, or carry an unacceptable supply risk. In industrial systems especially, the cost of getting it wrong is high: a single discontinued component can halt a production line built to run for twenty years.

Applied well, this looks like three tiers of integration rather than custom silicon everywhere at once:

**Tier 1 — Consolidation & supply security**
Discrete power regulators, interface chips, and glue logic consolidated into a single standard Korvane part or a small custom ASIC. The board gets smaller, the bill of materials gets shorter, and every critical component comes with a fifteen-year supply commitment. No machine learning, no new architecture — just fewer parts that can go end-of-life.

**Tier 2 — Intelligence at the sensor**
- Vision, vibration, and acoustic models running directly on the sensor node, so only events — not raw data — travel over the network.
- Radar-based presence and motion detection replacing cameras wherever privacy matters.
- Local decision-making that keeps working when the network connection drops.

**Tier 3 — Secure, self-managing fleets**
- Hardware root of trust in every device, so only authenticated firmware ever runs.
- Post-quantum encrypted over-the-air updates across fleets of thousands of devices.
- On-chip telemetry that reports power, temperature, and health, so failing devices are replaced before they fail.
- Extension into fully custom SoCs that combine sensing, inference, power, and security on a single die, once volumes justify it.

### 7.4 Emerging Capabilities

- **Chiplet systems** — UCIe-based chiplet integration, so customers can combine Korvane dies with their own in one package instead of designing a full SoC.
- **RISC-V vector compute** — Application-class RISC-V cores with vector extensions for signal processing and AI workloads too large for a microcontroller.
- **Analog in-memory compute** — Research into computing neural network layers directly inside memory arrays, targeting a further 10× efficiency gain over Nerva N1.

Don't see your application? That usually means the right chip hasn't been designed yet — tell us what you're building.

---

## 8. Supply Chain Resilience

**Dual-sourced silicon. Supported for fifteen years.**

The chip shortage of the early 2020s stopped production lines for want of parts costing less than a euro. Every Korvane product is designed to avoid single points of failure:

- **Two foundries per process node** — every production design is qualified at a primary and a secondary foundry, with at least one in Europe.
- **Two packaging and test partners** — packaging and final test qualified at sites on two continents.
- **Fifteen-year longevity commitment** — every standard product carries a guaranteed minimum production life of fifteen years from release.
- **Buffer stock programs** — customers on long-term agreements can hold dedicated wafer and finished-goods stock in bonded storage.
- **EU Chips Act alignment** — our design and qualification activities are based in the EU, supporting customers with European sourcing requirements.

---

## 9. Quality & Certifications

- ISO 9001 certified quality management system
- ISO 26262 functional safety process for automotive programs (ASIL-B capable)
- AEC-Q100 qualification for automotive products
- IEC 62443 secure development lifecycle for industrial security products
- Full traceability from wafer lot to individual unit
- Zero-defect program with 8D failure analysis reporting

---

## 10. About the Company

### Our story

Korvane Silicon was founded in 2019 by four engineers who had spent their careers inside large semiconductor companies, watching good product ideas get cancelled because they didn't fit a roadmap built for smartphones. They started Korvane to design the chips those large companies wouldn't: low-volume, long-life, highly specific silicon for industrial, medical, and automotive products.

The first years were funded entirely by custom ASIC work for clients. In 2022, the power management IP built for those clients became Ostra P8, our first product. Nerva N1 followed in 2024.

### Leadership

- **Ilse Varendonck** — Co-founder & CEO. Previously led mixed-signal product lines for industrial markets.
- **Tomás Revelo** — Co-founder & CTO. Digital architect behind three generations of low-power SoCs.
- **Marta Quintela** — Co-founder & Head of Analog, Porto. Specialist in data converters and mmWave front ends.
- **Joris Abbenhuis** — Co-founder & VP Operations. Runs foundry, packaging, and supply chain relationships.

### How we work

- Small, senior teams: every program is led by an engineer with at least two tape-outs behind them.
- Honest recommendations: we turn down programs where custom silicon isn't the right answer.
- Long relationships: our first client is still a client, now on its third chip.

### Careers

We hire digital designers, verification engineers, analog and RF designers, firmware engineers, and test engineers in Eindhoven and Porto. Open roles are published on our website.

---

## 11. Strategy & Direction

The near-term plan is straightforward:

1. Grow a small, senior design team across Eindhoven and Porto.
2. Fund it through custom ASIC programs and design services.
3. Use that runway to expand our own product families — Nerva, Ostra, Lumen, and Vault — each eventually run as an independent business unit.
4. Launch the Nerva N2 and Vault M4 in production by 2028.

We are optimising for first-pass silicon success and long customer relationships, not for headcount.

---

## 12. Contact & Company Details

**Korvane Silicon B.V.**
Registered in Eindhoven, Netherlands
Kalkovenweg 117, 5652 RT Eindhoven, Netherlands

**Porto Design Center**
Rua das Fundições 48, 4100-321 Porto, Portugal

- **Email:** hello@korvanesilicon.eu
- **Sales & samples:** sales@korvanesilicon.eu
- **Website:** https://korvanesilicon.eu
- **LinkedIn:** https://www.linkedin.com/company/korvane-silicon/
- **GitHub:** https://github.com/korvanesilicon

**Engagements** start with a discovery call. The website contact form asks for: first name, last name, work email, company, expected annual volume, and what you're building.

**Samples & evaluation kits** can be requested through the product pages; engineering samples require a short application.

**Legal:** Privacy Policy, Terms of Sale, and Conflict Minerals Policy are published on the website.

© Korvane Silicon B.V. Eindhoven, Netherlands.
