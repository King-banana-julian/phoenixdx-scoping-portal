import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import EffortBaselineGraph from './EffortBaselineGraph';

const IntelligencePanel = ({
  budgetCap,
  dayRate,
  calculation
}) => {
  const isTimeCritical = calculation?.finalDays > calculation?.availableBusinessDays;
  const currentCost = (calculation?.finalDays || 0) * dayRate;
  const isBudgetCritical = currentCost > budgetCap;

  return (
    <div className="bg-white border-l border-gray-200 overflow-hidden shadow-sm flex flex-col h-full relative rounded-r-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />
      
      {/* Scope Guard (Persistent UI) */}
      <div className={`p-6 border-b flex flex-col gap-4 transition-colors z-10 ${
        (isTimeCritical || isBudgetCritical) ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          {(isTimeCritical || isBudgetCritical) ? (
            <AlertTriangle className="text-red-600 animate-pulse" size={20} />
          ) : (
            <CheckCircle2 className="text-green-600" size={20} />
          )}
          <span className={`font-bold font-mono tracking-wider text-sm uppercase ${
            (isTimeCritical || isBudgetCritical) ? 'text-red-600' : 'text-gray-900'
          }`}>
            Scope Guard Tracker
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 font-bold mb-1">Days Remaining</span>
            <span className={`font-mono font-black text-xl ${isTimeCritical ? 'text-red-600' : 'text-green-600'}`}>
              {((calculation?.availableBusinessDays || 0) - (calculation?.finalDays || 0)).toFixed(1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 font-bold mb-1">Budget Remaining</span>
            <span className={`font-mono font-black text-xl ${isBudgetCritical ? 'text-red-600' : 'text-green-600'}`}>
              ${(budgetCap - currentCost).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Intelligence Panel Body */}
      <div className="p-6 flex-1 flex flex-col z-10">
        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">Discovery Visualizations</h4>
        
        <EffortBaselineGraph currentTier={calculation?.currentTier} />
        
        <div className="mt-8 pt-6 border-t border-gray-200">
           <p className="text-xs text-gray-500 leading-relaxed italic">
             <strong className="text-gray-900">Proof of Value:</strong> Historical data (e.g., SSR/Bupa) shows that Low Maturity projects require ~65% more effort to reach success.
           </p>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
