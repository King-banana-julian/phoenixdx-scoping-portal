import React, { useState, useMemo } from 'react';
import { Target, Clock, BarChart2, Zap, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MQM_TIERS, STRATEGIC_INTENTS, CONTEXT_MULTIPLIERS, UX_ACTIVITIES, ENGAGEMENT_MODES } from './constants/index.js';
import EngagementSetup from './components/EngagementSetup';
import RequirementsIntake from './components/RequirementsIntake';
import SquadBuilder from './components/SquadBuilder';
import IntelligencePanel from './components/IntelligencePanel';
import MaturityQuotientMatrix from './components/MaturityQuotientMatrix';
import ContextToggles from './components/ContextToggles';
import AssumptionsPanel from './components/AssumptionsPanel';
import EstimateSummary from './components/EstimateSummary';
import './App.css';

function App() {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [engMode, setEngMode] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [reqText, setReqText] = useState('');
  const [parsedReqs, setParsedReqs] = useState([]);
  const [squadRoles, setSquadRoles] = useState({});

  // Discovery & IQ State
  const [selectedIntentId, setSelectedIntentId] = useState('digital_experience');
  const [pillarScores, setPillarScores] = useState({ strategy: 3, culture: 3, process: 3, outcomes: 3 });
  const [selectedActivities] = useState({});
  const [infoMaturity, setInfoMaturity] = useState('high');
  const [governance, setGovernance] = useState('direct');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(() => { 
    const d = new Date(); 
    d.setDate(d.getDate() + 90); 
    return d.toISOString().split('T')[0]; 
  });
  const [budgetCap, setBudgetCap] = useState('');
  const [dayRate] = useState('');
  const [documentedScenarios] = useState(0);
  const [undocumentedScenarios] = useState(0);

  // --- CALCULATION LOGIC ---
  const calculation = useMemo(() => {
    const avgScore = Object.values(pillarScores).reduce((a, b) => a + b, 0) / 4;
    const tier = MQM_TIERS.find(t => avgScore >= t.scoreRange[0] && avgScore <= t.scoreRange[1]) || MQM_TIERS[2];
    const maturityM = tier.multiplier;
    const intent = STRATEGIC_INTENTS.find(i => i.id === selectedIntentId);
    const strategyM = intent?.legacyMultiplier ?? 1.0;
    const infoM = CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.multiplier ?? 1.0;
    const decisionM = CONTEXT_MULTIPLIERS.governance[governance]?.multiplier ?? 1.0;
    const governanceM = infoM * decisionM;
    let activityDays = 0;
    Object.entries(selectedActivities).forEach(([id, data]) => {
      const activity = UX_ACTIVITIES.find(a => a.id === id);
      if (!activity) return;
      const quantity = data.quantity || 1;
      let effort = activity.baseEffort * quantity;
      if (activity.buffer) effort *= (1 + activity.buffer);
      activityDays += effort;
      if (activity.synthesisRatio) activityDays += (effort * activity.synthesisRatio);
    });
    const scenarioDays = (documentedScenarios * 1.5) + (undocumentedScenarios * 3.0);
    const baseDays = activityDays + scenarioDays;
    const compoundedBase = baseDays * strategyM * maturityM * governanceM;
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
    return { baseDays, activityDays, scenarioDays, strategyM, maturityM, infoM, decisionM, governanceM, compoundedBase, finalDays, availableBusinessDays, selectedIntent: intent, currentTier: tier };
  }, [selectedIntentId, pillarScores, selectedActivities, infoMaturity, governance, startDate, targetDate, documentedScenarios, undocumentedScenarios]);

  // --- RENDER ---
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased relative">

      {/* STICKY NAV BAR (top: 0) */}
      <div className="bg-white border-b border-swiss-border-default px-8 h-16 flex items-center justify-between sticky top-0 z-[60] w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-swiss-interactive-primary flex items-center justify-center">
            <Target size={14} color="white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm text-swiss-text-primary">PhoenixDX Scoping Portal</div>
            <div className="text-xs text-swiss-text-tertiary">Engagement Value-Alignment Engine</div>
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

      {/* STICKY PROGRESS BAR TRACK (top: 64px) */}
      <div className="sticky top-[64px] z-[50] w-full h-1 bg-swiss-bg-tertiary">
        <div 
          className="h-full bg-swiss-interactive-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {/* STICKY STEP NAVIGATION BAR (top: 68px) */}
      <div className="bg-white border-b border-swiss-border-default sticky top-[68px] z-40 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 py-2 flex items-center gap-0">
          {['Engagement','Context','Requirements','Squad','Estimate'].map((label, i) => {
            const stepNum = i + 1;
            const isActive = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <div key={label} className="flex items-center flex-1">
                <button 
                  onClick={() => setCurrentStep(stepNum)} 
                  className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none p-0 group"
                >
                  <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-swiss-interactive-primary text-white' 
                      : isDone 
                        ? 'bg-swiss-bg-success text-swiss-text-success' 
                        : 'bg-swiss-bg-tertiary text-swiss-text-tertiary group-hover:bg-swiss-interactive-primary-inactive'
                  }`}>
                    {isDone ? <CheckCircle2 size={12} /> : stepNum}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive 
                      ? 'text-swiss-interactive-primary' 
                      : 'text-swiss-text-tertiary group-hover:text-swiss-interactive-primary-hover'
                  }`}>
                    {label}
                  </span>
                </button>
                {i < 4 && (
                  <div className={`flex-1 h-px mx-2 mb-4 ${isDone ? 'bg-swiss-border-success' : 'bg-swiss-border-subtle'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 bg-swiss-bg-secondary w-full">
        <div className="max-w-6xl mx-auto px-8 py-10 flex gap-12 items-start">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-6">

            {currentStep === 1 && (
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
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
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
                <AssumptionsPanel />
              </div>
            )}

            {currentStep === 3 && (
              <RequirementsIntake
                reqText={reqText} setReqText={setReqText}
                parsedReqs={parsedReqs} setParsedReqs={setParsedReqs}
              />
            )}

            {currentStep === 4 && (
              <SquadBuilder
                engMode={engMode}
                squadRoles={squadRoles}
                setSquadRoles={setSquadRoles}
              />
            )}

            {currentStep === 5 && (
              <EstimateSummary
                calculation={calculation}
                clientName={clientName}
                projectName={projectName}
                engMode={engMode}
                selectedGoal={selectedIntentId}
              />
            )}
          </div>

          {/* RIGHT COLUMN — SIDEBAR */}
          <div className="w-64 flex-shrink-0 sticky top-[160px] space-y-4">
            <IntelligencePanel
              calculation={calculation}
            />
          </div>

        </div>
      </div>

      {/* STICKY FOOTER (bottom: 0) */}
      <div className="bg-white border-t border-swiss-border-default sticky bottom-0 z-50 w-full">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 h-10 border border-swiss-border-default rounded-md text-swiss-text-secondary font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-swiss-bg-secondary transition-all active:scale-95 transition-all duration-150 ease-in-out"
          >
            <ChevronLeft size={14} /> Back
          </button>
          <button
            onClick={() => setCurrentStep(s => Math.min(5, s + 1))}
            className="flex items-center gap-2 px-6 h-10 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover active:bg-[#042C53] active:scale-95 text-white rounded-md font-semibold text-sm transition-all duration-150 ease-in-out"
          >
            {currentStep === 4 ? 'Generate Estimate' : 'Next Step'} <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

