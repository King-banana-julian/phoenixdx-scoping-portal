# Constants Reference — PhoenixDX Scoping Portal

All constants are exported from `src/constants/index.js`. This document describes each constant, its purpose, its shape, and whether it contains confirmed or placeholder data.

---

## MQM_TIERS
**Purpose:** Maps average pillar scores to a maturity tier and effort multiplier.
**Status:** ✅ Confirmed — based on PhoenixDX MQM framework.
**Shape:** Array of 5 tier objects with tier number, name, multiplier, scoreRange, friction description, and Tailwind color classes.
**Used by:** MaturityQuotientMatrix.jsx, App.jsx (calculation useMemo)

---

## PILLARS
**Purpose:** Defines the 4 UX maturity pillars (Strategy, Culture, Process, Outcomes) with 5 score levels each.
**Status:** ✅ Confirmed — based on PhoenixDX MQM framework.
**Shape:** Array of 4 pillar objects, each with id, label, description, and 5 level objects (score, label, color classes, hover class, description).
**Used by:** MaturityQuotientMatrix.jsx

---

## RISK_FACTORS
**Purpose:** Optional risk flags that can be applied to an engagement to add effort buffers.
**Status:** ✅ Confirmed — based on common PhoenixDX delivery risks.
**Shape:** Array of 4 objects with id, label, impact (decimal), and description.
**Used by:** DiscoveryWizard.jsx (legacy)

---

## UNKNOWN_TAX
**Purpose:** The universal 20% vibes buffer applied to all final estimates.
**Status:** ✅ Confirmed — standard PhoenixDX practice.
**Value:** 0.20
**Used by:** App.jsx (calculation useMemo)

---

## UX_ACTIVITIES
**Purpose:** The selectable UX activities across the Double Diamond stages (Discover, Define, Develop, Deliver).
**Status:** ✅ Confirmed — based on PhoenixDX UX delivery practice.
**Shape:** Array of 9 activity objects with id, stage, label, outcome, baseEffort, unit, and optional synthesisRatio and buffer.
**Used by:** ActivitySelection.jsx, App.jsx (calculation useMemo)
**Note:** synthesisRatio adds additional synthesis days on top of base effort (e.g. Contextual Inquiry has 1:1 synthesis). buffer adds a percentage buffer (e.g. Wireframing has 20% iteration buffer).

---

## STRATEGIC_INTENTS
**Purpose:** The 6 strategic goals a client engagement can be driven by. Each has a multiplier, mandatory UX activities, WMBT statements, and risk buffer.
**Status:** ✅ Confirmed — based on PhoenixDX strategic framework.
**Shape:** Array of 6 intent objects with id, label, coreValue, description, mandatoryActivities, legacyMultiplier, riskBuffer, wmbt array, and Tailwind color classes.
**Used by:** EngagementSetup.jsx, StrategicIntentSelector.jsx, App.jsx (calculation useMemo)

---

## CONTEXT_MULTIPLIERS
**Purpose:** Friction multipliers for information maturity and governance model.
**Status:** ✅ Confirmed — based on PhoenixDX scoping experience.
**Shape:** Object with two keys (infoMaturity, governance), each containing named options (high/low, direct/committee) with multiplier values.
**Used by:** ContextToggles.jsx, App.jsx (calculation useMemo)

---

## TECH_REQUIREMENTS
**Purpose:** Maps each strategic intent to a list of technical requirements.
**Status:** ✅ Confirmed — based on PhoenixDX delivery patterns.
**Shape:** Object keyed by strategic intent id, each containing an array of requirement objects with id, label, and description.
**Used by:** TechnicalRequirementsPanel.jsx

---

## ENGAGEMENT_MODES
**Purpose:** The 3 PhoenixDX delivery archetypes — Design Sprint, Design to Delivery, Full Delivery.
**Status:** ✅ Confirmed — based on real SOW data (Urbanise, SSR, Bupa/QPS).
**Shape:** Array of 3 mode objects with id, label, sub, color, description, and phases array.
**Used by:** EngagementSetup.jsx, SquadBuilder.jsx, App.jsx (header pills)

---

## INDUSTRIES
**Purpose:** The 8 industry sectors PhoenixDX operates in, with reference project examples.
**Status:** ⚠️ Partially confirmed — industry list is confirmed, example text is placeholder.
**Pending:** Real project reference snapshots from the delivery team (see BACKLOG.md DG-001).
**Shape:** Array of 8 objects with id, label, and example string.
**Used by:** EngagementSetup.jsx

---

## SQUAD_ROLE_TEMPLATES
**Purpose:** Default role configurations for each engagement mode. All rates are empty — entered at scoping time.
**Status:** ✅ Confirmed — roles based on real SOW data from Bupa (full_delivery), SSR (design_to_dev), and Urbanise (ux_only). Rates are intentionally blank.
**Shape:** Object with 3 keys (ux_only, design_to_dev, full_delivery), each containing an array of role objects with id, label, days (0), and rate (empty string).
**Used by:** SquadBuilder.jsx
**Important:** Never pre-populate the rate field. Rates are confidential and entered manually at scoping time.

---

## STANDARD_ASSUMPTIONS
**Purpose:** Pre-loaded risk declaration assumptions for every PhoenixDX engagement.
**Status:** ⚠️ Placeholder — pending confirmation from delivery team (see BACKLOG.md DG-002).
**Shape:** Array of 10 assumption objects with id, text, and checked boolean.
**Used by:** AssumptionsPanel.jsx
**Note:** Checked assumptions are ones PhoenixDX proceeds on. Unchecked assumptions are open questions. In Phase 3 these will be exported to the SOW as a risk declaration section.
