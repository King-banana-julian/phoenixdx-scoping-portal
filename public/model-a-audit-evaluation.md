# Model A — Audit & Evaluation Activities

## About this model

Model A covers activities where PhoenixDX systematically evaluates an existing product, competitor landscape, or compliance requirement against a defined standard. The work follows a consistent four-phase structure regardless of scale.

**Phase structure:** Preparation → Execution → Synthesis → Report & Playback

**When this model applies:** The team has something to evaluate — a live product, a set of competitors, a prototype, or a codebase — and needs structured findings with severity ratings and prioritised recommendations.

**AI acceleration note:** AI is effective in Preparation (setup, criteria definition) and early Execution (automated scanning, data scraping). Synthesis and Report & Playback always require human expert review. AI findings must never be presented to clients without human validation.

---

## Activities in this model

- Heuristic Evaluation
- Competitor & Comparative Analysis
- Usability Testing

---

## Heuristic Evaluation

**Double Diamond phase:** Discover
**Model:** A — Audit & Evaluation
**PhoenixDX approach:** We use Jakob Nielsen's 10 Usability Heuristics as the baseline to identify UX low-hanging fruit before moving into more expensive user testing. In Large and XL projects, multiple evaluators work independently to reduce evaluator bias.

### Effort by size

| Size | Scope trigger | Effort | AI-accelerated | Friction |
|------|--------------|--------|---------------|---------|
| Small | 1 core flow, ~5–10 screens | 2d | 1.5d | 0.8x |
| Medium | 3–5 user journeys, 10–15 screens | 4.5d | 3d | 0.9x |
| Large | 40+ screens, enterprise portal, 3 evaluators | 9d | 6d | 1.0x |
| Extra Large | Multi-platform ecosystem (Web, iOS, Android), 5 evaluators | 17d | 11d | 1.2x |

### Phase breakdown

**Preparation**
- Small: 0.5d — Define 1 core flow, set up evaluation spreadsheet
- Medium: 1d — Define 3–5 user journeys, align on heuristics (e.g. WCAG + Nielsen)
- Large: 2d — Audit 15+ templates, set up multi-evaluator tracking, persona alignment
- XL: 3d — Map full ecosystem architecture, cross-platform scoping (iOS/Android/Web)

**Execution**
- Small: 0.5d — Single evaluator walkthrough of core screens
- Medium: 1.5d — 2 evaluators, independent audits of 10–15 key templates
- Large: 3d — 3 evaluators, deep dive into complex logic, forms, error handling
- XL: 6d — 5 evaluators, auditing accessibility, localised content, cross-device states

**Synthesis**
- Small: 0.5d — Consolidate notes, basic severity ranking (0–4 scale)
- Medium: 1d — Resolve evaluator discrepancies, map issues to specific heuristics
- Large: 2.5d — Thematic clustering, root-cause analysis, Quick Win vs Strategic fixes
- XL: 5d — Full architectural risk assessment, mapping findings to technical debt

**Report & Playback**
- Small: 0.5d — Short PDF summary with Top 5 issues and fixes
- Medium: 1d — Detailed report with annotated screenshots and severity heatmaps
- Large: 1.5d — Interactive workshop, prioritisation of fix backlog for dev
- XL: 3d — Executive readout, long-term UX debt roadmap, global compliance audit

### Deliverables

- **Small:** Heuristic evaluation report with Top 5 issues, severity ratings, and annotated screenshots
- **Medium:** Detailed report with severity heatmaps, annotated screenshots, and prioritised fix backlog for dev
- **Large:** Interactive workshop findings, thematic issue clusters, Quick Win vs Strategic fix categorisation, and dev-ready backlog
- **XL:** Executive readout, long-term UX debt roadmap, global compliance audit, and cross-platform fix strategy

### Dependencies

- **Small:** Live product, staging environment, or prototype to evaluate
- **Medium:** Live product or prototype with 10–15 screens, defined user journeys, evaluation rubric
- **Large:** Full product access, 15+ screen templates, multi-evaluator team aligned, persona documentation
- **XL:** Multi-platform product access (Web, iOS, Android), full component library, cross-platform evaluation framework

### AI validation requirements

- **Small:** Human expert must verify AI-flagged severity ratings against domain and brand context
- **Medium:** Evaluators must resolve AI discrepancies and validate heuristic mapping against specific user journeys
- **Large:** Thematic clustering and root-cause analysis must be validated by senior UX lead — AI cannot determine strategic fix priority
- **XL:** Full architectural risk assessment and UX debt roadmap require human expert sign-off — AI cannot assess cross-platform systemic impact

### Contingency notes

- **Small:** Domain expertise gaps may require additional immersion time
- **Medium:** Evaluator discrepancies require reconciliation time not always factored into estimates
- **Large:** Multi-evaluator coordination and stakeholder workshop scheduling can extend timeline
- **XL:** Cross-platform scope complexity and legal compliance requirements can significantly extend XL engagements

### Scope guard rules

- If Legacy Modernisation is selected as strategic goal → Heuristic Evaluation is **mandatory**
- If no product or prototype exists → block this activity, flag as dependency not met
- If XL size selected without multi-evaluator team confirmed → trigger RESOURCE RISK warning

---

## Competitor & Comparative Analysis

**Double Diamond phase:** Discover
**Model:** A — Audit & Evaluation
**PhoenixDX approach:** A Comparative analysis often looks outside the direct industry to find best-in-class interactions (e.g. looking at Uber's map interface to improve a logistics app). The output shifts from tactical at Small to strategic at XL.

### Effort by size

| Size | Scope trigger | Effort | AI-accelerated | Friction |
|------|--------------|--------|---------------|---------|
| Small | 2 direct competitors, 3–5 criteria | 2d | 1d | 0.6x |
| Medium | 4–5 competitors, formal scoring rubric | 4d | 2d | 0.7x |
| Large | 8–10 rivals across 2 sectors | 7d | 3.5d | 0.8x |
| Extra Large | 15+ rivals, global landscape, all platforms | 15d | 7.5d | 1.0x |

### Phase breakdown

**Preparation**
- Small: 0.5d — Identify 2 direct rivals, define 3–5 key UX criteria
- Medium: 1d — Identify 4–5 rivals, define formal scoring rubric
- Large: 1.5d — Market landscape scan, identify 8–10 rivals across 2 sectors
- XL: 3d — Global landscape scan, 15+ rivals, cross-industry benchmarks

**Execution**
- Small: 1d — High-level UI/feature screenshots and pros/cons list
- Medium: 2d — Deep dive into user flows, sign-up funnels, and feature parity
- Large: 4d — Functional teardowns, account creation/testing, accessibility audits
- XL: 8d — Full platform teardowns (Web/Mobile/Tablet) for all rivals

**Synthesis**
- Small: 0.25d — Basic summary of where we sit in the market
- Medium: 0.5d — SWCD (Strengths, Weaknesses, Commonalities, Differentials) matrix
- Large: 1d — Gap analysis report, identifying Blue Ocean opportunities
- XL: 3d — Comprehensive strategic whitepaper on market positioning

**Report & Playback**
- Small: 0.25d — Short PDF or Loom video walkthrough
- Medium: 0.5d — 1-hour workshop with Product/Marketing leads
- Large: 0.5d — Formal presentation deck with Best-in-Class UI moodboard
- XL: 1d — Executive board-level presentation and strategic workshop

### Deliverables

- **Small:** Basic competitor matrix with pros/cons list and high-level market positioning summary
- **Medium:** SWCD matrix, user flow comparison, feature parity analysis, and 1-hour workshop playback
- **Large:** Gap analysis report, Blue Ocean opportunity map, Best-in-Class UI moodboard, and formal presentation deck
- **XL:** Comprehensive strategic whitepaper, full platform teardown matrix, and executive board-level presentation

### Dependencies

- **Small:** Approved product vision or brief, list of 2–3 known direct competitors
- **Medium:** Product vision, defined scoring rubric, access to 4–5 competitor products including flows
- **Large:** Market landscape brief, access to 8–10 competitor products, accessibility testing tools
- **XL:** Global scope brief, access to 15+ rival platforms across all devices, cross-industry benchmark framework

### AI validation requirements

- **Small:** Manual check of AI-scraped feature data for accuracy and recency
- **Medium:** Human review of SWCD matrix conclusions and strategic positioning logic
- **Large:** Gap analysis and Blue Ocean recommendations must be validated against real market data by a strategist
- **XL:** Comprehensive strategic whitepaper and executive positioning require full human review — AI cannot validate market strategy

### Contingency notes

- **Small:** Access to gated or paywall-protected competitor products can add unexpected time
- **Medium:** Deep-dive into competitor funnels requiring account creation and testing adds execution time
- **Large:** Functional teardowns of subscription-gated B2B tools can double execution phase
- **XL:** Multi-platform teardowns at global scale require significant coordination and can uncover scope not initially estimated

### Scope guard rules

- If Digital Experience is selected as strategic goal → Competitor Analysis is **recommended**
- If Product Innovation is selected → Competitor Analysis is **mandatory**
- If no product vision or brief exists → flag dependency not met

---

## Usability Testing

**Double Diamond phase:** Develop
**Model:** A — Audit & Evaluation
**PhoenixDX approach:** This is the Truth Phase. It transitions from theoretical design to evidence-based validation. While AI can simulate personas, nothing replaces the nuance of a human user struggling with a broken interaction. Always include a buffer day for L and XL due to participant no-shows and prototype bugs.

### Effort by size

| Size | Scope trigger | Effort | AI-accelerated | Friction |
|------|--------------|--------|---------------|---------|
| Small | 5 users, 3 key tasks, basic prototype | 4d | 3d | 1.1x |
| Medium | 8–10 users, 8–10 tasks, SUS scoring | 8d | 6d | 1.1x |
| Large | 15–20 segmented users, 15+ tasks | 15d | 11d | 1.2x |
| Extra Large | 30+ users, multi-platform, accessibility testing | 30d | 22d | 1.3x |

### Phase breakdown

**Preparation**
- Small: 1d — Script 3 key tasks, 5 user recruits, basic prototype check
- Medium: 2d — Script 8–10 tasks, screener design, pilot session
- Large: 4d — 15+ tasks, 15–20 users, segmented screeners, complex prototype logic
- XL: 6d — 30+ users, multi-platform (Web/Mobile) setup, international recruitment

**Execution**
- Small: 1.5d — 1 day of back-to-back 45-min sessions (5 users)
- Medium: 3d — 2.5 days of 60-min sessions, moderating and observing
- Large: 6d — 5 days of sessions, potentially multiple moderators, recording management
- XL: 12d — 10+ days of sessions, diverse time zones, accessibility-specific testing

**Synthesis**
- Small: 1d — Identify Top 3 blockers, Quick Wins list
- Medium: 2d — Rainbow Spreadsheet analysis, tagging friction points, UX scoring (SUS)
- Large: 3d — Affinity mapping of all sessions, root-cause analysis of failures
- XL: 8d — Cross-segment data analysis, trend mapping, technical feasibility vetting

**Report & Playback**
- Small: 0.5d — High-level summary deck, prioritise fixes for dev
- Medium: 1d — Highlight reels (video clips), formal report with Fix vs Ignore
- Large: 2d — Interactive findings workshop, mapping fixes to the Roadmap
- XL: 4d — Executive readout, global design strategy shift, risk assessment

### Deliverables

- **Small:** High-level summary deck with Top 3 blockers, Quick Wins list, and dev fix priorities
- **Medium:** Formal report with highlight video reels, Fix vs Ignore analysis, and SUS score baseline
- **Large:** Interactive findings workshop, affinity map of all sessions, root-cause analysis, and Roadmap fix mapping
- **XL:** Executive readout, quantitative UX metrics baseline (Task Success Rate, Time-on-Task, Error Rate), global design strategy

### Dependencies

- **Small:** Usability script with 3 tasks, 5 recruited participants, basic prototype or design
- **Medium:** Usability script with 8–10 tasks, screener design, pilot session completed, 8–10 recruited participants
- **Large:** Complex prototype with all flows, 15+ task scripts, 15–20 segmented and screened participants
- **XL:** Multi-platform prototype, 30+ task scripts, international recruitment, accessibility-specific test setup

### AI validation requirements

- **Small:** Human moderator required — AI cannot replicate real-time facilitation or observe behavioural nuance
- **Medium:** Rainbow Spreadsheet tagging and SUS scoring must be validated by researcher against session recordings
- **Large:** Root-cause analysis of usability failures requires senior researcher — AI cannot determine systemic vs surface-level causes
- **XL:** Cross-segment data analysis and technical feasibility vetting require human researcher and engineering review

### Contingency notes

- **Small:** Participant no-shows are common — always have a backup recruit confirmed
- **Medium:** Prototype bugs discovered mid-session can invalidate test data and require re-runs
- **Large:** Stakeholder consensus on severity ratings after findings workshop often requires additional facilitation
- **XL:** International recruitment for XL projects involving FinTech or Health data requires NDA and data anonymisation overhead

### Scope guard rules

- If Legacy Modernisation goal selected → Usability Testing is **mandatory** — removing it triggers STRATEGIC RISK
- If Interactive Prototype is not in scope → block Usability Testing, flag dependency not met
- If no participants recruited by 5 days before scheduled sessions → trigger TIMELINE RISK warning
