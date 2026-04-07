# Product Vision — PhoenixDX Scoping Portal

---

## The Problem

PhoenixDX lead members currently scope engagements using spreadsheets and manual rate calculations. This creates three problems:

1. **Inconsistency** — Different leads apply different multipliers, assumptions, and squad configurations
2. **No traceability** — There is no record of why an estimate was what it was
3. **Speed** — Building a defensible estimate takes hours, not minutes

---

## The Solution

A structured scoping portal that guides a lead through a repeatable estimation process. Every estimate is the product of a documented chain of decisions — engagement type, maturity, strategic goal, friction context, squad configuration — so it can be explained, defended, and handed off.

---

## Who Uses This

**Primary user:** PhoenixDX lead members scoping new client engagements

**Secondary users:** Sales leads reviewing estimate outputs before client presentation

---

## The Three Engagement Archetypes

All engagements at PhoenixDX map to one of three delivery models:

### Design Sprint (UX Only)
- **Profile:** Urbanise, NSW Land Registry Services
- **Squad:** Lead Designer + Senior Designer + light Engagement Manager oversight
- **Duration:** 6–12 weeks
- **Deliverables:** Research, journey maps, high-fidelity wireframes, design system, prototype, handover
- **Total effort:** ~56–80 days

### Design to Delivery
- **Profile:** Southern Star Research
- **Squad:** EM + Solution Architect + Technical Lead + Senior Developer + Developer (onshore/nearshore) + BA + UX Designer
- **Duration:** 3–6 months, phased releases
- **Total effort:** ~200–500 days
- **Commercial model:** Capped T&M with 15% buffer

### Full Delivery
- **Profile:** Bupa, QPS
- **Squad:** Senior EM + Principal TL + Tech Lead + Senior Developers (onshore + nearshore) + Security Lead + Senior BA/QA
- **Duration:** 6–12+ months, multi-phase
- **Total effort:** 500+ days
- **Commercial model:** T&M with cap. Nearshore excluded from Warranty and production phases.

---

## The Estimation Formula
```
Final Days = (Base Days × Strategy_M × Maturity_M × Governance_M) × 1.2
```

Where:
- **Base Days** = UX activity days + scenario days (documented × 1.5, undocumented × 3.0)
- **Strategy_M** = Strategic goal multiplier (Legacy Modernisation = 1.3×, others = 1.0–1.1×)
- **Maturity_M** = MQM tier multiplier (Tier 1 = 1.8×, Tier 5 = 1.0×)
- **Governance_M** = Info maturity × Decision model (Low info = 1.25×, Committee = 1.2×)
- **1.2** = Universal 20% vibes buffer

---

## What Must Be True (WMBT)

Every strategic goal has a set of WMBT statements — conditions that must be true for the engagement to succeed. These are surfaced in Step 5 and included in the final estimate output.

---

## Phased Roadmap

### Phase 1 — Core Portal (Current)
- 5-step wizard shell
- Engagement setup, maturity audit, requirements intake, squad builder
- Manual multiplier calculation
- Sidebar: Scope Guard, Friction Stack, Historical Risk

### Phase 2 — AI-Assisted Parsing
- Anthropic API integration in Requirements step
- Paste a client brief → auto-extract requirements, flag integrations, map to delivery activities
- AI activity efficiency overlay (from ux-ai-productivity skill)

### Phase 3 — Deliverables Layer
- Map UX activities to named artefacts (e.g. Usability Testing → Test Script + Findings Report)
- Surface artefact list in Step 5 estimate output

### Phase 4 — Squad Recommendation Engine
- Phase-aware squad allocation (who is active in which delivery phase)
- Auto-suggest squad composition from scope signals

### Phase 5 — Full Cost View
- Combined UX + design + build cost estimate
- Export to PDF / SOW template
- Assumptions wired to SOW as risk declaration section
