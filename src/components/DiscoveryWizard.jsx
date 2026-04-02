import React, { useState, useMemo } from 'react';
import {
  UX_ACTIVITIES, STRATEGIC_INTENTS, TECH_REQUIREMENTS, CONTEXT_MULTIPLIERS, RISK_FACTORS
} from '../constants';
import ActivitySelection from './ActivitySelection';
import StrategicIntentSelector from './StrategicIntentSelector';
import ContextToggles from './ContextToggles';
import TechnicalRequirementsPanel from './TechnicalRequirementsPanel';
import MaturityQuotientMatrix from './MaturityQuotientMatrix';
import { ChevronRight, ChevronLeft, Flag, CheckCircle2, Clock, ArrowRight, Calendar, DollarSign, Database, FileText, AlertTriangle, AlertCircle } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Boundaries' },
  { id: 2, label: 'Scenarios'  },
  { id: 3, label: 'Intent'     },
  { id: 4, label: 'Context'    },
  { id: 5, label: 'Tech Scope' },
  { id: 6, label: 'Quote'      },
];

const DiscoveryWizard = ({ 
  selectedIntentId,
  onSelectIntent,
  selectedActivities, 
  onToggleActivity, 
  onUpdateQuantity,
  pillarScores,
  onScoreChange,
  selectedRisks,
  onToggleRisk,
  infoMaturity,
  onInfoMaturityChange,
  governance,
  onGovernanceChange,
  startDate, onStartDateChange,
  targetDate, onTargetDateChange,
  budgetCap, onBudgetCapChange,
  dayRate, onDayRateChange,
  documentedScenarios, onDocumentedScenariosChange,
  undocumentedScenarios, onUndocumentedScenariosChange,
  finalCalculation,
  baseDays
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const timelineItems = useMemo(() => {
    let items = [];
    let cumulativeDays = 0;

    Object.entries(selectedActivities).forEach(([id, data]) => {
      const activity = UX_ACTIVITIES.find(a => a.id === id);
      if (!activity) return;

      const quantity = data.quantity || 1;
      let effort = activity.baseEffort * quantity;
      if (activity.buffer) effort *= (1 + activity.buffer);
      
      const intent = STRATEGIC_INTENTS.find(i => i.id === selectedIntentId);
      const legacyM = intent?.legacyMultiplier ?? 1.0;
      const isDevelop = activity.stage === 'Develop';
      const appliedEffort = isDevelop && legacyM > 1 ? effort * legacyM : effort;

      items.push({ ...activity, effort: appliedEffort, isSynthesis: false, startDay: cumulativeDays });
      cumulativeDays += appliedEffort;

      // 10-day Wait-Time logic for Testing/Surveys (Passive Timeline, doesn't cost budget)
      if (activity.id === 'usability_testing' || activity.id === 'ab_testing') {
        items.push({
          id: `${activity.id}_passive`,
          label: `Participant Recruitment & Testing`,
          stage: activity.stage,
          outcome: 'Passive wait-time. No budget consumed.',
          effort: 10,
          isSynthesis: false,
          isPassive: true,
          startDay: cumulativeDays
        });
        cumulativeDays += 10;
      }

      if (activity.synthesisRatio) {
        const synthEffort = appliedEffort * activity.synthesisRatio;
        items.push({
          id: `${activity.id}_synthesis`,
          label: `Synthesis & Alignment (${activity.label})`,
          stage: activity.stage,
          outcome: 'Mandatory data synthesis and stakeholder alignment.',
          effort: synthEffort,
          isSynthesis: true,
          startDay: cumulativeDays
        });
        cumulativeDays += synthEffort;
      }
    });
    
    return items;
  }, [selectedActivities, selectedIntentId]);

  const selectedIntent    = STRATEGIC_INTENTS.find(i => i.id === selectedIntentId);
  const techReqs          = TECH_REQUIREMENTS[selectedIntentId] || [];
  const selectedActs      = Object.keys(selectedActivities).map(id => UX_ACTIVITIES.find(a => a.id === id)).filter(Boolean);
  const hasActivities     = selectedActs.length > 0;
  const infoMaturityData  = CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity];
  const governanceData    = CONTEXT_MULTIPLIERS.governance[governance];

  const isTimeCritical = finalCalculation?.finalDays > finalCalculation?.availableBusinessDays;
  const currentCost = (finalCalculation?.finalDays || 0) * dayRate;
  const isBudgetCritical = currentCost > budgetCap;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />

      {/* Wizard Header / Progress */}
      <div className="bg-white p-6 border-b border-gray-200 relative z-10">
        <div className="flex items-center gap-2 w-full">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors flex-shrink-0 ${
                currentStep === step.id ? 'bg-violet-600 text-white shadow-md' :
                currentStep > step.id ? 'bg-violet-400 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
              </div>
              <div className="hidden sm:block">
                <div className={`text-xs font-black uppercase tracking-wider ${currentStep === step.id ? 'text-violet-600' : 'text-gray-400'}`}>
                  {step.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 ml-2 ${currentStep > step.id ? 'bg-violet-200' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Body */}
      <div className="p-8 relative min-h-[500px]">

        {/* ── Step 1: Boundaries & Diagnostics ── */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
            
            {/* Section A: Project Boundaries */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900">1.1 Project Boundaries</h3>
                <p className="text-gray-500 mt-2">Define the hard constraints for this engagement.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-violet-600">
                    <Calendar size={20} /> <span className="font-bold">Timeline</span>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Target Delivery Date</label>
                    <input type="date" value={targetDate} onChange={(e) => onTargetDateChange(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" />
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Available Business Days:</span>
                    <span className="text-gray-900 font-mono font-bold">{finalCalculation?.availableBusinessDays}</span>
                  </div>
                </div>

                <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <DollarSign size={20} /> <span className="font-bold">Budget</span>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Budget Cap ($)</label>
                    <input type="number" value={budgetCap} onChange={(e) => onBudgetCapChange(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Chapter Day Rate ($)</label>
                    <input type="number" value={dayRate} onChange={(e) => onDayRateChange(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Organizational Audit */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900">1.2 Organizational Audit</h3>
                <p className="text-gray-500 mt-2">Assess the UX maturity of the organization across 4 strategic pillars.</p>
              </div>
              <MaturityQuotientMatrix 
                scores={pillarScores} 
                onScoreChange={onScoreChange} 
              />
            </div>

            {/* Section C: Risk Profiling */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900">1.3 Risk Profiling</h3>
                <p className="text-gray-500 mt-2">Identify structural constraints that carry compounding effort multipliers.</p>
              </div>
              <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="space-y-3">
                  {RISK_FACTORS.map(risk => (
                    <button
                      key={risk.id}
                      onClick={() => onToggleRisk(risk.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group
                        ${selectedRisks.includes(risk.id) 
                          ? 'bg-orange-50 border-orange-500' 
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className={`mt-1 flex-shrink-0 transition-colors ${selectedRisks.includes(risk.id) ? 'text-orange-500' : 'text-gray-400'}`}>
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">{risk.label}</span>
                            <span className="text-xs font-mono text-orange-600 font-bold">+{risk.impact * 100}%</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{risk.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>

          </div>
        )}

        {/* ── Step 2: Scenario Quantification (SSR) ── */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
             <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900">Scenario Quantification</h3>
              <p className="text-gray-500 mt-2">Establish the baseline design effort using the SSR (Scenario Size/Risk) Rule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-violet-300">
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full text-green-600">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Documented Scenarios</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Clear flow, documented requirements (1.5 Days/Scenario)</p>
                    <input type="number" min="0" value={documentedScenarios} onChange={(e) => onDocumentedScenariosChange(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-2xl font-bold text-center font-mono focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-violet-300">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                    <Database size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Undocumented/Tribal Scenarios</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Discovery needed, knowledge silos (3.0 Days/Scenario)</p>
                    <input type="number" min="0" value={undocumentedScenarios} onChange={(e) => onUndocumentedScenariosChange(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-2xl font-bold text-center font-mono focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex justify-between items-center mt-8 shadow-sm">
              <span className="text-indigo-900 font-medium">Scenario Contribution to Base Days:</span>
              <span className="text-violet-600 font-mono font-black text-2xl">{finalCalculation?.scenarioDays} <span className="text-sm font-medium text-violet-400">Days</span></span>
            </div>
          </div>
        )}

        {/* ── Step 3: Strategic Intent ── */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StrategicIntentSelector
              selectedIntentId={selectedIntentId}
              onSelectIntent={(id) => {
                onSelectIntent(id);
                setCurrentStep(4);
              }}
            />
          </div>
        )}

        {/* ── Step 4: Context Toggles ── */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <ContextToggles
              infoMaturity={infoMaturity}
              onInfoMaturityChange={onInfoMaturityChange}
              governance={governance}
              onGovernanceChange={onGovernanceChange}
            />
          </div>
        )}

        {/* ── Step 5: Technical Requirements ── */}
        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <TechnicalRequirementsPanel selectedIntentId={selectedIntentId} />

            {/* Activity Selection inline below */}
            <div className="mt-10 border-t border-slate-700/50 pt-8">
              <div className="mb-6">
                <h3 className="text-xl font-black text-white">Adjust Discovery Activities</h3>
                <p className="text-slate-400 mt-1 text-sm">
                  Mandatory activities for <strong className="text-white">{selectedIntent?.label}</strong> are pre-selected. Add or remove as needed.
                </p>
              </div>
              <ActivitySelection
                selectedActivities={selectedActivities}
                onToggleActivity={onToggleActivity}
                onUpdateQuantity={onUpdateQuantity}
              />
            </div>
          </div>
        )}

        {/* ── Step 6: Timeline & Quote ── */}
        {currentStep === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">

            {/* Scope Guard Warning */}
            {(isTimeCritical || isBudgetCritical) && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 flex items-start gap-4 animate-pulse-subtle">
                <div className="bg-red-500 text-slate-900 p-2 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="text-amber-400 font-bold mb-1">Scope Guard Triggered</h4>
                  <p className="text-amber-200/70 text-sm leading-relaxed">
                    Note: This scope is leaning toward a <strong>'Comprehensive'</strong> build. 
                    Would you like to review 'Must-Haves' for a Lean MVP?
                  </p>
                </div>
              </div>
            )}

            {/* WMBT Logic: What Must Be True */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-[10px] uppercase tracking-widest text-blue-400 font-black mb-5">
                What Must Be True (WMBT) for Success
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(selectedIntent?.wmbt || []).map((statement, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700/30 p-4 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                    {statement}
                  </div>
                ))}
              </div>
            </div>

            {/* Traceability Chain */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-5">
                Traceability Chain: Goal → Requirement → UX Activity → Outcome
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {/* Goal */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-white">
                  {selectedIntent?.label ?? '—'}
                </div>
                <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
                {/* Business Metric */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-blue-300 font-medium">
                  {selectedIntent?.coreValue ?? '—'}
                </div>
                <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
                {/* Tech Requirements */}
                <div className="flex flex-wrap gap-1.5">
                  {techReqs.map(r => (
                    <span key={r.id} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-lg">
                      {r.label}
                    </span>
                  ))}
                </div>
                <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
                {/* UX Activities */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedActs.length > 0 ? selectedActs.map(a => (
                    <span key={a.id} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-lg">
                      {a.label}
                    </span>
                  )) : (
                    <span className="text-slate-600 text-xs italic">No activities selected</span>
                  )}
                </div>
                <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
                {/* Outcome */}
                <span className="text-slate-400 text-xs font-medium italic">
                  {selectedIntent?.coreValue ?? 'Deliverable Output'}
                </span>
              </div>
            </div>

            {/* Visual Timeline (Outcome-First View) */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6 flex items-center gap-2">
                <Clock size={14} /> Gantt Timeline & Dependencies
              </h3>
              
              <div className="flex flex-col mb-4">
                <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
                  <span>Start: {startDate}</span>
                  <span className={isTimeCritical ? 'text-red-400' : 'text-slate-400'}>
                    Delivery: {targetDate}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                  {/* Proportion logic: show how much budget matches days visually */}
                  <div 
                    className={`h-full ${isTimeCritical ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: `${Math.min(100, (finalCalculation.finalDays / finalCalculation.availableBusinessDays) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {timelineItems.length === 0 ? (
                  <div className="text-center p-8 text-slate-500 font-medium border border-dashed border-slate-700 rounded-xl">
                    No activities selected in Step 3.
                  </div>
                ) : (
                  timelineItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${
                          item.isPassive ? 'bg-slate-600 border-2 border-slate-500 shadow-[0_0_10px_rgba(100,116,139,0.5)]' :
                          item.isSynthesis ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                          item.isTriggered ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' :
                          'bg-blue-500'
                        }`} />
                        {idx !== timelineItems.length - 1 && <div className="w-px h-full bg-slate-700 my-2 absolute top-4 bottom-[-16px]" />}
                      </div>
                      <div className={`flex-1 p-4 rounded-xl border transition-colors ${
                        item.isPassive ? 'bg-slate-800/50 border-slate-700/50 border-dashed opacity-75' :
                        item.isSynthesis ? 'bg-emerald-500/10 border-emerald-500/20' :
                        item.isTriggered  ? 'bg-amber-500/10 border-amber-500/20' :
                        'bg-slate-800 border-slate-700 group-hover:border-slate-500'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold text-sm tracking-tight ${
                              item.isPassive ? 'text-slate-400 italic' :
                              item.isSynthesis ? 'text-emerald-400' :
                              item.isTriggered  ? 'text-amber-400' :
                              'text-slate-100'
                            }`}>{item.outcome}</span>
                            
                            {item.isPassive && (
                              <span className="text-[10px] bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                Passive Timeline
                              </span>
                            )}
                            {item.isTriggered && !item.isSynthesis && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                Auto-Triggered
                              </span>
                            )}
                            {item.stage === 'Develop' && finalCalculation.strategyM > 1 && !item.isSynthesis && (
                              <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                Effort {finalCalculation.strategyM}x
                              </span>
                            )}
                          </div>
                          <span className={`font-mono font-bold text-sm ${
                            item.isSynthesis ? 'text-emerald-500' :
                            item.isTriggered  ? 'text-amber-500' :
                            'text-blue-400'
                          }`}>
                            {item.effort.toFixed(1)} days
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Activity: {item.label}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Raw Timeline Estimate</span>
                <span className="text-white font-mono font-bold text-lg">{finalCalculation?.baseDays?.toFixed(1)} Days total base</span>
              </div>
            </div>

            {/* SEME Final Output Box */}
            <div className={`bg-gradient-to-br rounded-3xl p-8 border relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500
              ${(isTimeCritical || isBudgetCritical) 
                ? 'from-red-900 to-slate-900 border-red-500/30' 
                : 'from-blue-900 to-slate-900 border-blue-500/30'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Flag size={150} />
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Final Scope Allocation</h4>
                  <div className="text-6xl font-black text-white tabular-nums drop-shadow-lg flex items-baseline gap-2">
                    {finalCalculation?.finalDays?.toFixed(1)}
                    <span className="text-2xl text-blue-200/50 font-medium tracking-tight">Days</span>
                  </div>
                  <p className="text-blue-200/60 text-sm mt-4 font-medium leading-relaxed">
                    Accounts for org. maturity ({finalCalculation.maturityM}×), intent complexity ({finalCalculation.strategyM}×),
                    info maturity ({finalCalculation.infoM}×), governance ({finalCalculation.governanceM.toFixed(2)}×), and 20% strategic buffer.
                  </p>
                </div>

                <div className="space-y-3 bg-slate-950/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-800">
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-3">Compound Multiplier Breakdown</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Base Component</span>
                    <span className="text-slate-200 font-mono">{baseDays?.toFixed(1)} Days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Maturity Friction ({finalCalculation.maturityM}×)</span>
                    <span className="text-slate-200 font-mono">+{((finalCalculation.maturityM - 1) * baseDays).toFixed(1)} Days</span>
                  </div>
                  {finalCalculation.strategyM > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-400">Intent Complexity ({finalCalculation.strategyM}×)</span>
                      <span className="text-purple-400 font-mono">+{((finalCalculation.strategyM - 1) * baseDays * finalCalculation.maturityM).toFixed(1)} Days</span>
                    </div>
                  )}
                  {finalCalculation.infoM > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-400">Low Info Maturity (+25%)</span>
                      <span className="text-orange-400 font-mono">+{((finalCalculation.infoM - 1) * baseDays * finalCalculation.maturityM * finalCalculation.strategyM).toFixed(1)} Days</span>
                    </div>
                  )}
                  {finalCalculation.decisionM > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-400">Committee Governance (+20%)</span>
                      <span className="text-orange-400 font-mono">+{((finalCalculation.decisionM - 1) * baseDays * finalCalculation.maturityM * finalCalculation.strategyM * finalCalculation.infoM).toFixed(1)} Days</span>
                    </div>
                  )}
                  <div className="w-full h-px bg-slate-800 my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Strategic Alignment Buffer (20%)</span>
                    <span className="text-blue-400 font-mono">+{((finalCalculation.compoundedBase * 1.2) - finalCalculation.compoundedBase).toFixed(1)} Days</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Wizard Footer Controls */}
      <div className="bg-gray-50/80 p-6 border-t border-gray-200 flex justify-between items-center relative z-10">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft size={20} /> Back
        </button>

        {currentStep < 6 ? (
          <button
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            disabled={currentStep === 5 && !hasActivities}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-sm disabled:opacity-50 disabled:shadow-none transition-all"
          >
            {currentStep === 1 ? 'Continue to Activities' : 'Next Step'} <ChevronRight size={20} />
          </button>
        ) : (
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all">
            <CheckCircle2 size={20} /> Finalize Scope
          </button>
        )}
      </div>
    </div>
  );
};

export default DiscoveryWizard;
