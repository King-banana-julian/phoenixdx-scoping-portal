# Architecture — PhoenixDX Scoping Portal

---

## State Management

All application state is lifted to `App.jsx`. There is no external state library.

### State variables in App.jsx

| Variable | Type | Purpose |
|---|---|---|
| `engMode` | string \| null | Selected engagement type (ux_only, design_to_dev, full_delivery) |
| `industry` | string \| null | Selected industry id |
| `clientName` | string | Client organisation name |
| `projectName` | string | Project name |
| `startDate` | string | Project start date (ISO) |
| `targetDate` | string | Target delivery date (ISO) |
| `budgetCap` | string | Budget cap in AUD ex GST (empty if no cap) |
| `dayRate` | string | Day rate for cost calculations |
| `selectedIntentId` | string | Strategic intent / goal id |
| `pillarScores` | object | MQM scores per pillar {strategy, culture, process, outcomes} |
| `selectedActivities` | object | Selected UX activities keyed by id |
| `infoMaturity` | string | 'high' or 'low' |
| `governance` | string | 'direct' or 'committee' |
| `documentedScenarios` | number | Count of documented SSR scenarios |
| `undocumentedScenarios` | number | Count of undocumented SSR scenarios |
| `selectedRisks` | array | Selected risk factor ids |
| `reqText` | string | Raw requirements text input |
| `parsedReqs` | array | Structured requirements extracted from reqText |
| `squadRoles` | object | Squad role effort and rates keyed by role id |
| `currentStep` | number | Active step in the portal wizard (1–5) |

---

## Calculation Logic

The core calculation lives in a single `useMemo` block in `App.jsx`. It is the single source of truth for all derived values passed to components.

**Output shape:**
```js
{
  baseDays, activityDays, scenarioDays,
  strategyM, maturityM, infoM, decisionM, governanceM,
  compoundedBase, finalDays,
  availableBusinessDays,
  selectedIntent, currentTier
}
```

This object is passed to `IntelligencePanel` for sidebar display.

---

## Component Map

### Portal Components (new — light mode only)

| Component | Step | Receives |
|---|---|---|
| `EngagementSetup` | 1 | engMode, industry, clientName, projectName, startDate, targetDate, budgetCap, selectedGoal |
| `MaturityQuotientMatrix` | 2 | pillarScores, onScoreChange |
| `ContextToggles` | 2 | infoMaturity, governance, onChange handlers |
| `AssumptionsPanel` | 2 | (self-contained, uses STANDARD_ASSUMPTIONS from constants) |
| `RequirementsIntake` | 3 | reqText, parsedReqs, setters |
| `SquadBuilder` | 4 | engMode, squadRoles, setSquadRoles |
| `IntelligencePanel` | Sidebar | budgetCap, dayRate, calculation |

### Legacy Components (from uxdiscovery-and-scope — do not modify)

| Component | Status | Notes |
|---|---|---|
| `DiscoveryWizard` | Reserved | Full 6-step wizard, not currently rendered in portal flow |
| `ActivitySelection` | Available | UX activity selector, to be surfaced in Phase 2 |
| `StrategicIntentSelector` | Available | Used internally by DiscoveryWizard |
| `ContextToggles` | Active | Rendered in Step 2 |
| `MaturityQuotientMatrix` | Active | Rendered in Step 2 |
| `TechnicalRequirementsPanel` | Available | To be surfaced in Phase 2 |
| `StrategicEffortMultiplierEngine` | Available | Quote view from legacy wizard |
| `EffortBaselineGraph` | Available | Effort visualisation from legacy wizard |
| `ImplementationPlan` | Available | Separate tab view |

---

## Constants

All constants are exported from `src/constants/index.js`. See `docs/CONSTANTS_REFERENCE.md` for full documentation.

---

## Styling Rules

- Light mode only — no dark mode Tailwind classes anywhere in portal components
- Card pattern: `bg-white border border-slate-200 rounded-2xl p-6 shadow-sm`
- Input pattern: `px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500`
- Primary button: `bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold`
- Section labels: `text-xs font-extrabold text-slate-500 uppercase tracking-widest`
- Page background: `bg-slate-50`

---

## Adding a New Step

1. Create the component in `src/components/`
2. Add state variables to `App.jsx` if needed
3. Add a new step label to the step bar array in `App.jsx`
4. Add a new `currentStep === N` block in the left column JSX
5. Update `docs/ARCHITECTURE.md` component map
6. Add any new constants to `src/constants/index.js` and document in `docs/CONSTANTS_REFERENCE.md`
