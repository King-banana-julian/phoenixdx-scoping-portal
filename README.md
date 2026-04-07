# PhoenixDX Scoping Portal

**Engagement Value-Alignment Engine**

A sales-enablement and internal scoping tool for PhoenixDX lead members. Replaces spreadsheet-based estimation with a structured, multiplier-driven engagement scoping portal.

---

## What This Does

This portal guides a PhoenixDX lead through five steps to produce a defensible engagement estimate:

1. **Engagement** — Select engagement type, industry, client details, project dates, budget, and strategic goal
2. **Context** — Assess organisational UX maturity (MQM), set friction toggles, and declare project assumptions
3. **Requirements** — Paste or upload a client brief to extract and structure requirements
4. **Squad** — Configure the delivery team with effort in days and day rates
5. **Estimate** — View the final compounded estimate with multiplier breakdown, WMBT statements, and delivery phases

---

## Tech Stack

- React + Vite
- Tailwind CSS v3
- Recharts (data visualisations)
- Lucide React (icons)
- Anthropic API (Phase 2 — AI-assisted requirements parsing, not yet active)

---

## Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173` by default.

---

## Project Structure
```
src/
  components/
    EngagementSetup.jsx       # Step 1 — Engagement type, industry, dates, goal
    MaturityQuotientMatrix.jsx # Step 2 — MQM pillar scoring
    ContextToggles.jsx        # Step 2 — Info maturity and governance toggles
    AssumptionsPanel.jsx      # Step 2 — Project assumptions (risk declarations)
    RequirementsIntake.jsx    # Step 3 — Requirements paste and structure
    SquadBuilder.jsx          # Step 4 — Squad configuration with day rates
    IntelligencePanel.jsx     # Sidebar — Scope Guard, Friction Stack, Historical Risk
    ActivitySelection.jsx     # UX activity selector (from legacy repo)
    DiscoveryWizard.jsx       # Full 6-step wizard (from legacy repo, reserved)
    ImplementationPlan.jsx    # Implementation plan view (from legacy repo)
  constants/
    index.js                  # All data constants — see CONSTANTS_REFERENCE.md
  App.jsx                     # Root component — all state lifted here
  main.jsx
  index.css
docs/
  PRODUCT_VISION.md
  ARCHITECTURE.md
  BACKLOG.md
  CONSTANTS_REFERENCE.md
```

---

## Key Design Decisions

- **All rate fields are intentionally blank.** Day rates are entered at scoping time and are not stored, committed, or logged anywhere in the codebase.
- **Light mode only.** No dark mode classes are used anywhere in the portal components.
- **State is lifted to App.jsx.** All calculation logic lives in a single `useMemo` block in App.jsx to ensure one source of truth.
- **Extend, not replace.** Legacy components from the `uxdiscovery-and-scope` repo are preserved and available. New portal steps are built alongside them.

---

## Contributing

This repo is actively developed with Antigravity (AI pair programmer). Before making changes:

1. Read `docs/ARCHITECTURE.md` to understand component boundaries
2. Read `docs/BACKLOG.md` to understand what is in progress
3. Do not modify `DiscoveryWizard.jsx`, `MaturityQuotientMatrix.jsx`, `ActivitySelection.jsx`, `ContextToggles.jsx`, `StrategicIntentSelector.jsx`, `TechnicalRequirementsPanel.jsx`, `StrategicEffortMultiplierEngine.jsx`, or `EffortBaselineGraph.jsx` without explicit instruction
4. All new components must use light mode Tailwind styling only

---

## Status

**Current phase:** Phase 1 — Core portal shell and manual scoping
**Next phase:** Phase 2 — Anthropic API integration for AI-assisted requirements parsing and activity suggestions
