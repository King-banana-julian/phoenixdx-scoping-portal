/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Calculator, Info, Zap, ShieldAlert, TrendingUp } from 'lucide-react';

/**
 * StrategicEffortMultiplierEngine (SEME) Component
 * 
 * @param {number} baseHours - Raw production hours entered by the user
 * @param {number} multiplier - Multiplier value from MQM (e.g., 1.3)
 * @param {Function} onBaseHoursChange - Callback for updating base hours
 */
const StrategicEffortMultiplierEngine = ({ calculation }) => {
  const { 
    baseHours, 
    strategyM, 
    maturityM, 
    governanceM, 
    finalAllocation 
  } = calculation;
  
  // Breakdown steps
  const maturityAdjustment = (baseHours * maturityM) - baseHours;
  const strategySubtotal = baseHours * maturityM * strategyM;
  const strategyAdjustment = strategySubtotal - (baseHours * maturityM);
  const governanceSubtotal = strategySubtotal * governanceM;
  const governanceAdjustment = governanceSubtotal - strategySubtotal;
  const strategicBuffer = governanceSubtotal * 0.20;

  return (
    <section className="bg-slate-800 p-8 rounded-2xl border-2 border-blue-500/20 shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-blue-400" size={28} />
        <h3 className="text-2xl font-bold text-slate-100 italic">Strategic Estimation Calculator</h3>
      </div>

      <div className="space-y-10">
        {/* Breakdown Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-slate-500" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Base Effort</span>
            </div>
            <div className="text-2xl font-black text-slate-300 tabular-nums">
              {Math.round(baseHours)}h
            </div>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
                <ShieldAlert size={14} className="text-emerald-500/70" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Maturity ({maturityM}x)</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">
              +{Math.round(maturityAdjustment)}h
            </div>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-purple-500/70" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Strategy ({strategyM}x)</span>
            </div>
            <div className="text-2xl font-black text-purple-400 tabular-nums">
              +{Math.round(strategyAdjustment)}h
            </div>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-orange-500/70" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Governance ({governanceM.toFixed(2)}x)</span>
            </div>
            <div className="text-2xl font-black text-orange-400 tabular-nums">
              +{Math.round(governanceAdjustment)}h
            </div>
          </div>
        </div>

        {/* The Hero Stat */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl border border-blue-400/30 shadow-[0_20px_50px_rgba(37,99,235,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calculator size={120} />
          </div>
          <div className="relative z-10">
            <label className="text-xs uppercase tracking-[0.3em] text-blue-200/60 font-black mb-2 block">
              Total Strategic Allocation (+20% Buffer)
            </label>
            <div className="text-7xl md:text-8xl font-black text-white flex items-baseline gap-4 tabular-nums drop-shadow-2xl">
              {Math.round(finalAllocation)}
              <span className="text-3xl text-blue-200/40 tracking-tight">HOURS</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-700/50">
          <Info className="text-slate-500 mt-0.5 flex-shrink-0" size={16} />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Logic: <code className="text-blue-400/80">(Base × Mat_M × Strat_M × Gov_M) × 1.2</code> per <strong>Strategic Requirements Matrix</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StrategicEffortMultiplierEngine;
