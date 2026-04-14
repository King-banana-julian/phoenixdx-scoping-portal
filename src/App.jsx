import React, { useState, useMemo, useEffect } from 'react';
import { Target, Clock, BarChart2, Zap, CheckCircle2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { MQM_TIERS, STRATEGIC_INTENTS, CONTEXT_MULTIPLIERS, ENGAGEMENT_MODES } from './constants/index.js';
import EngagementSetup from './components/EngagementSetup';
import DiscoveryIntake from './components/DiscoveryIntake';
import MaturityQuotientMatrix from './components/MaturityQuotientMatrix';
import ContextToggles from './components/ContextToggles';
import ActivityManifest from './components/ActivityManifest';
import ScopeSummary from './components/ScopeSummary';
import IntelligencePanel from './components/IntelligencePanel';
import { useActivityEngine } from './hooks/useActivityEngine';
import './App.css';

function App() {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(0); // Step 0: Discovery Intake
  const [engMode, setEngMode] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  
  // Intake Step 0 State
  const [intakeState, setIntakeState] = useState(() => {
    const saved = localStorage.getItem('phoenix_intake_draft');
    return saved ? JSON.parse(saved) : {
      q1: '', q2: '', q3: [], q4: '', q5: '', q6: [], q7: '', q8: [], q9: { type: '', value: '' }, q10: '', q12: ''
    };
  });
  const [showSummary, setShowSummary] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Draft Auto-save
  useEffect(() => {
    localStorage.setItem('phoenix_intake_draft', JSON.stringify(intakeState));
    setLastSaved(new Date());
  }, [intakeState]);

  // Sync Intake to Wizard
  useEffect(() => {
    if (intakeState.q2) {
      const intentMap = {
        'Modernise a legacy system': 'legacy_modernization',
        'Create a new digital product': 'digital_experience',
        'Build or improve an internal tool': 'internal_tooling',
        'Enable customers to self-serve': 'self_service',
        'Launch a new product or feature': 'product_innovation',
        'Meet accessibility or compliance': 'accessibility_risk'
      };
      if (intentMap[intakeState.q2]) setSelectedIntentId(intentMap[intakeState.q2]);
    }
    if (intakeState.q7) setStartDate(intakeState.q7);
    if (intakeState.q9.value) setBudgetCap(intakeState.q9.value);
    
    // Multipliers
    if (intakeState.q3.length > 0) {
      const lowSignals = ['Processes and workflows are mostly undocumented', 'There is no existing product', 'We have not been able to access any documentation'];
      const hasLowSignal = intakeState.q3.some(s => lowSignals.some(ls => s.includes(ls)));
      setInfoMaturity(hasLowSignal ? 'low' : 'high');
    }
    if (intakeState.q4) {
      setGovernance(intakeState.q4.includes('committee') ? 'committee' : 'direct');
    }
    if (intakeState.q10 === 'High') setInfoMaturity('high');
    else if (intakeState.q10 === 'Low' || intakeState.q10 === 'Unknown') setInfoMaturity('low');

  }, [intakeState, showRecommendations]);

  // Multipliers State
  const [selectedIntentId, setSelectedIntentId] = useState('digital_experience');
  const [pillarScores, setPillarScores] = useState({ strategy: 3, culture: 3, process: 3, outcomes: 3 });
  const [infoMaturity, setInfoMaturity] = useState('high');
  const [governance, setGovernance] = useState('direct');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(() => { 
    const d = new Date(); 
    d.setDate(d.getDate() + 90); 
    return d.toISOString().split('T')[0]; 
  });
  const [budgetCap, setBudgetCap] = useState('');

  // Engine Hook
  const { 
    activities, 
    selectedActivities, 
    toggleActivity, 
    updateActivity, 
    getRecommendations,
    applyRecommendations,
    calculation: engineCalc, 
    loading 
  } = useActivityEngine();

  // --- COMPOSITE CALCULATION ---
  const calculation = useMemo(() => {
    // 1. Diagnostics Multipliers
    const avgScore = Object.values(pillarScores).reduce((a, b) => a + b, 0) / 4;
    const tier = MQM_TIERS.find(t => avgScore >= t.scoreRange[0] && avgScore <= t.scoreRange[1]) || MQM_TIERS[2];
    const maturityM = tier.multiplier;
    
    const intent = STRATEGIC_INTENTS.find(i => i.id === selectedIntentId);
    const strategyM = intent?.legacyMultiplier ?? 1.0;
    
    const infoM = CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.multiplier ?? 1.0;
    const decisionM = CONTEXT_MULTIPLIERS.governance[governance]?.multiplier ?? 1.0;
    const governanceM = infoM * decisionM;

    // 2. Base Days from Engine
    const baseDays = engineCalc.totalBaseEffort;
    
    // 3. Compounding
    const compoundedBase = baseDays * strategyM * maturityM * governanceM;
    
    // 4. Final (including UNKNOWN TAX/Buffer - using 1.2x as per legacy for now)
    const finalDays = compoundedBase * 1.2;

    const getBusinessDays = (start, end) => {
      const d1 = new Date(start); const d2 = new Date(end);
      if (isNaN(d1) || isNaN(d2) || d1 > d2) return 0;
      let count = 0;
      const cur = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      const end2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
      while (cur <= end2) { if (cur.getDay() !== 0 && cur.getDay() !== 6) count++; cur.setDate(cur.getDate() + 1); }
      return count;
    };
    const availableBusinessDays = getBusinessDays(startDate, targetDate);

    return { 
      ...engineCalc,
      baseDays, 
      compoundedBase, 
      finalDays, 
      strategyM, 
      maturityM, 
      infoM, 
      decisionM, 
      governanceM, 
      availableBusinessDays, 
      currentTier: tier,
      selectedIntentId
    };
  }, [selectedIntentId, pillarScores, infoMaturity, governance, startDate, targetDate, engineCalc]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white font-sans font-semibold">Loading Portal Engine...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased relative">
      {/* STICKY NAV BAR */}
      <div className="bg-white border-b border-swiss-border-default px-8 h-16 flex items-center justify-between sticky top-0 z-[60] w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-swiss-interactive-primary flex items-center justify-center">
            <Target size={14} color="white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm text-swiss-text-primary">PhoenixDX Scoping Portal</div>
            <div className="text-xs text-swiss-text-tertiary">Strategic UX Sizing Engine</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {clientName && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-swiss-bg-info border border-swiss-border-accent text-swiss-text-info">
              {clientName}
            </span>
          )}
          {engMode && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-swiss-bg-success border border-swiss-border-success text-swiss-text-success">
              {ENGAGEMENT_MODES.find(m => m.id === engMode)?.label}
            </span>
          )}
        </div>
      </div>

      {/* PROGRESS TRACK */}
      <div className="sticky top-[64px] z-[50] w-full h-1 bg-swiss-bg-tertiary">
        <div 
          className="h-full bg-swiss-interactive-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
        />
      </div>

      {/* STEP NAV */}
      <div className="bg-white border-b border-swiss-border-default sticky top-[68px] z-40 w-full">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          {[
            { id: 0, label: 'Discovery Intake' },
            { id: 1, label: 'Engagement Setup' },
            { id: 2, label: 'Activity Manifest' },
            { id: 3, label: 'Scope Summary' }
          ].map((step, i) => {
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;
            return (
              <div key={step.id} className="flex items-center gap-4 flex-1">
                <button 
                  onClick={() => {
                    if (step.id === 0 || isDone || isActive) setCurrentStep(step.id);
                  }}
                  className={`flex items-center gap-3 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded-sm text-[10px] font-bold ${isActive ? 'bg-swiss-interactive-primary text-white' : isDone ? 'bg-swiss-bg-success text-swiss-text-success' : 'bg-swiss-bg-tertiary text-swiss-text-tertiary'}`}>
                    {isDone ? <CheckCircle2 size={10} /> : step.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-swiss-text-primary' : 'text-swiss-text-tertiary'}`}>
                    {step.label}
                  </span>
                </button>
                {i < 3 && <div className="w-8 h-px bg-swiss-border-subtle" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-swiss-bg-secondary w-full">
        <div className="max-w-6xl mx-auto px-8 py-10 flex gap-12 items-start">
          <div className="flex-1 min-w-0">
            {currentStep === 0 && (
              <DiscoveryIntake 
                state={intakeState} 
                setState={setIntakeState} 
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                showRecommendations={showRecommendations}
                setShowRecommendations={setShowRecommendations}
                lastSaved={lastSaved}
                onContinue={() => setCurrentStep(1)}
                activities={activities}
                getRecommendations={getRecommendations}
                applyRecommendations={applyRecommendations}
              />
            )}

            {currentStep === 1 && (
              <div className="space-y-12">
                <EngagementSetup
                  engMode={engMode} setEngMode={setEngMode}
                  industry={industry} setIndustry={setIndustry}
                  clientName={clientName} setClientName={setClientName}
                  projectName={projectName} setProjectName={setProjectName}
                  startDate={startDate} setStartDate={setStartDate}
                  targetDate={targetDate} setTargetDate={setTargetDate}
                  budgetCap={budgetCap} setBudgetCap={setBudgetCap}
                  selectedGoal={selectedIntentId} setSelectedGoal={setSelectedIntentId}
                />
                <div className="border-t border-swiss-border-default pt-12 space-y-8">
                  <MaturityQuotientMatrix
                    scores={pillarScores}
                    onScoreChange={(pillarId, value) => setPillarScores(prev => ({ ...prev, [pillarId]: value }))}
                  />
                  <ContextToggles
                    infoMaturity={infoMaturity}
                    onInfoMaturityChange={setInfoMaturity}
                    governance={governance}
                    onGovernanceChange={setGovernance}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <ActivityManifest
                activities={activities}
                selectedActivities={selectedActivities}
                toggleActivity={toggleActivity}
                updateActivity={updateActivity}
                recs={getRecommendations(intakeState)}
              />
            )}

            {currentStep === 3 && (
              <ScopeSummary
                clientName={clientName}
                projectName={projectName}
                engMode={engMode}
                calculation={calculation}
                engagementModeLabel={ENGAGEMENT_MODES.find(m => m.id === engMode)?.label}
              />
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-80 flex-shrink-0 sticky top-[160px]">
            <IntelligencePanel 
              calculation={calculation} 
              intakeState={intakeState}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t border-swiss-border-default sticky bottom-0 z-50 w-full">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentStep === 1) {
                // Back to Step 0 Summary
                setCurrentStep(0);
                setShowRecommendations(true);
                setShowSummary(true);
              } else {
                setCurrentStep(s => Math.max(0, s - 1));
              }
            }}
            disabled={currentStep === 0 && !showSummary}
            className="flex items-center gap-2 px-4 h-10 border border-swiss-border-default rounded-sm text-swiss-text-secondary font-semibold text-sm disabled:opacity-30 hover:bg-swiss-bg-secondary transition-all"
          >
            <ChevronLeft size={14} /> Back
          </button>
          
          {currentStep !== 0 && (
            <button
              onClick={() => setCurrentStep(s => Math.min(3, s + 1))}
              disabled={currentStep === 3}
              className="flex items-center gap-2 px-6 h-10 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover text-white rounded-sm font-semibold text-sm transition-all"
            >
              {currentStep === 2 ? 'Review Summary' : 'Next Step'} <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

