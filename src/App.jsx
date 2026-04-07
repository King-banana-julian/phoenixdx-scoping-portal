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
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 h-14 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Target size={15} color="white" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-800">PhoenixDX Scoping Portal</div>
            <div className="text-xs text-slate-400">Engagement Value-Alignment Engine</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {clientName && <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">{clientName}</span>}
          {engMode && <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700">{ENGAGEMENT_MODES.find(m => m.id === engMode)?.label}</span>}
        </div>
      </div>

      {/* STEP BAR */}
      <div className="bg-white border-b border-slate-200 fixed top-14 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-0">
          {['Engagement','Context','Requirements','Squad','Estimate'].map((label, i) => {
            const stepNum = i + 1;
            const isActive = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <div key={label} className="flex items-center flex-1">
                <button onClick={() => setCurrentStep(stepNum)} className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : isDone ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {isDone ? <CheckCircle2 size={13} /> : stepNum}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
                </button>
                {i < 4 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${isDone ? 'bg-green-200' : 'bg-slate-200'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-8 pt-36 pb-20 flex gap-6 items-start">

        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0 space-y-5">

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
            <div className="space-y-5">
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
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
              <div className="text-slate-400 text-sm">Estimate output coming in next phase.</div>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 rounded-xl text-slate-500 font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-300 bg-white"
            >
              <ChevronLeft size={15} /> Back
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.min(5, s + 1))}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-sm"
            >
              {currentStep === 4 ? 'Generate Estimate' : 'Next Step'} <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — SIDEBAR */}
        <div className="w-64 flex-shrink-0 sticky top-36 space-y-4">
          <IntelligencePanel
            calculation={calculation}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
