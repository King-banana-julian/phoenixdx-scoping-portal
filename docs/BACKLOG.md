# Backlog — PhoenixDX Scoping Portal

Items are listed in priority order within each section. Backlog items marked 🔴 are blockers for Phase 2. Items marked 🟡 are important but not blocking. Items marked 🟢 are enhancements.

---

## In Progress

[ ] Intelligence Panel — reposition as Scope Integrity and Review screen

---

## Completed

[x] Discovery Intake Layer — 15 Apr 2026
[x] Activity Manifest — intake data wiring — 15 Apr 2026
[x] Scope Summary — budget alignment check — 15 Apr 2026

---

## Phase 2 — AI-Assisted Parsing

### 🔴 BL-001 — Anthropic API integration for requirements parsing
**Context:** The Requirements step (Step 3) currently parses plain text locally using pattern matching. This needs to be replaced with a real AI call.
**What it should do:** Accept a pasted client brief or uploaded document, send it to the Anthropic API, and return structured requirements categorised as Functional or Non-Functional, with priority ratings, integration flags, and suggested PhoenixDX delivery activities mapped to each requirement.
**Dependencies:** Anthropic API key configured in environment variables.
**Related file:** `src/components/RequirementsIntake.jsx`

### 🔴 BL-002 — AI Activity Efficiency Layer
**Context:** The ux-ai-productivity skill contains a precise efficiency table mapping 12 UX activities to time savings with and without AI. This should be surfaced in the portal.
**What it should do:** Overlay the efficiency table onto the UX activity selector. For each selected activity, show estimated days with and without AI assistance. Surface the relevant prompt template from the skill so the lead member can copy it directly.
**Dependencies:** ActivitySelection.jsx from legacy repo must be wired into Step 2 or a new Step 2.5.
**Related file:** `src/components/ActivitySelection.jsx`, `src/constants/index.js` (UX_ACTIVITIES)

---

## Phase 3 — Deliverables Layer

### 🟡 BL-003 — Assumptions wired to SOW risk declaration
**Context:** The Project Assumptions panel (Step 2, AssumptionsPanel.jsx) currently displays assumptions as informational items. They are risk declarations — if any prove false during delivery, a change request is triggered.
**What it should do:** In the Step 5 estimate output, generate a formatted Assumptions & Risk Declarations section. Checked assumptions appear as confirmed. Unchecked assumptions appear as open questions flagged for client confirmation before work commences.
**Related file:** `src/components/AssumptionsPanel.jsx`

---

## Phase 4 — Squad Recommendation Engine

### 🟡 BL-004 — Phase-aware squad allocation model
**Context:** The current Squad Builder shows total days per role but has no concept of which roles are active in which delivery phases. A Senior Developer has zero involvement in a Discovery sprint. A Lead Designer has minimal involvement in Build sprints.
**What it should do:** Each role in SQUAD_ROLE_TEMPLATES should map to specific delivery phases (e.g. UX Designer: Discovery/Define/Design, Developer: Build/UAT/Deployment, EM: all phases). The Squad Builder should show effort by phase, not just total days. This enables a visual delivery timeline showing who is active when and provides a more accurate cost profile per phase.
**Dependencies:** ENGAGEMENT_MODES phases array already exists in constants.
**Related file:** `src/components/SquadBuilder.jsx`, `src/constants/index.js`

### 🟡 BL-005 — Auto-suggest squad from scope signals
**Context:** Once engagement type, strategic goal, and requirements are set, the portal has enough signal to suggest a squad.
**What it should do:** Based on engMode + selectedIntentId + parsedReqs, auto-populate a suggested squad configuration as a starting point. Lead member can then adjust.
**Related file:** `src/components/SquadBuilder.jsx`

---

## Phase 5 — Export and SOW

### 🟢 BL-006 — Export estimate to PDF
**Context:** The Step 5 estimate view exists but has no export capability.
**What it should do:** Generate a PDF containing: client name, project name, engagement type, strategic goal, WMBT statements, delivery phases, squad configuration (roles and days only — no rates in the export), multiplier breakdown, final day estimate, and the assumptions/risk declaration section.

### 🟢 BL-007 — SOW template generation
**Context:** Full SOW documents follow a standard PhoenixDX structure confirmed across Bupa, SSR, and Urbanise engagements.
**What it should do:** From the Step 5 estimate, generate a pre-filled SOW Word document using the standard PhoenixDX template structure.

---

## Data Gaps (Pending from Team)

### 🔴 DG-001 — Industry reference library
**What's needed:** 4–5 real project reference snapshots to replace dummy examples in the INDUSTRIES constant. Format: industry, what was built, duration, squad size, engagement type.
**Who provides:** PhoenixDX delivery team.
**Current state:** Dummy text in `src/constants/index.js` INDUSTRIES array.

### 🔴 DG-002 — Confirmed standard assumptions list
**What's needed:** Delivery team to confirm which of the 10 pre-loaded assumptions are truly universal vs project-specific, and whether any are missing.
**Who provides:** PhoenixDX delivery team.
**Current state:** 10 placeholder assumptions in `src/constants/index.js` STANDARD_ASSUMPTIONS array.

### 🟡 DG-003 — Updated squad chart document
**What's needed:** A current version of the PhoenixDX squad chart (the 2020 version is outdated).
**Who provides:** PhoenixDX operations.
**Current state:** Squad role templates in SQUAD_ROLE_TEMPLATES are based on confirmed SOW data from Bupa and SSR but may not reflect current team structure.

### 🟡 DG-004 — Dev estimation framework
**What's needed:** Input from the dev team on how development effort is sized for the Squad Builder build phases.
**Who provides:** PhoenixDX technical leads.
**Current state:** Squad Builder accepts manual day input only — no estimation framework applied to dev roles.
