import React from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';

const EffortBaselineGraph = ({ currentTier }) => {
  const scenarios = [
    { 
      name: 'Structured', 
      stage: 'Stage 4', 
      baseline: 100, 
      actual: 110, 
      color: 'bg-violet-400', 
      textColor: 'text-violet-600',
      gap: '10%' 
    },
    { 
      name: 'Emergent', 
      stage: 'Stage 3', 
      baseline: 100, 
      actual: 130, 
      color: 'bg-violet-500', 
      textColor: 'text-violet-700',
      gap: '30%' 
    },
    { 
      name: 'Limited', 
      stage: 'Stage 2', 
      baseline: 100, 
      actual: 165, 
      color: 'bg-violet-600', 
      textColor: 'text-violet-800',
      gap: '65%' 
    }
  ];

  const maxVal = 180; // Buffer for labels

  return (
    <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-violet-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900 italic">Strategic Risk Projection (Historical Data)</h3>
      </div>

      <div className="space-y-10">
        {scenarios.map((scenario) => (
          <div key={scenario.stage} className="space-y-3 relative">
            <div className="flex justify-between items-end">
                <div className="flex items-baseline gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${scenario.textColor}`}>{scenario.stage}</span>
                    <span className="text-sm font-bold text-gray-900">{scenario.name}</span>
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                    Gap: <span className={scenario.gap === '65%' ? 'text-red-600 font-bold' : ''}>+{scenario.gap}</span>
                </div>
            </div>
            
            <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center px-4">
                {/* Baseline Marker */}
                <div className="absolute left-[55%] top-0 bottom-0 w-px bg-gray-300 z-10">
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-500 uppercase">Baseline</span>
                </div>

                {/* Actual Bar */}
                <div className="absolute left-0 top-0 bottom-0 flex items-center transition-all duration-1000">
                    <div 
                        className={`h-4 rounded-r-lg transition-all duration-1000 ${
                          currentTier?.name === scenario.name 
                            ? `${scenario.color} shadow-sm border border-violet-200 z-20` 
                            : `${scenario.color} opacity-40 shadow-none`
                        }`}
                        style={{ width: `${(scenario.actual / maxVal) * 100}%` }}
                    />
                </div>
                
                <div className={`relative z-20 flex justify-between w-full transition-opacity duration-500 ${currentTier?.name && currentTier?.name !== scenario.name ? 'opacity-50' : 'opacity-100'}`}>
                    <span className="text-xs font-black text-gray-400">{scenario.baseline}h</span>
                    <span className="text-xs font-black text-gray-800 ml-auto">{scenario.actual}h</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm" />
              <span className="text-[10px] uppercase font-bold text-gray-600">Sales Baseline (100h)</span>
          </div>
          <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-violet-600 rounded-sm" />
              <span className="text-[10px] uppercase font-bold text-gray-600 tracking-tighter">Strategic Reality</span>
          </div>
      </div>
    </section>
  );
};

export default EffortBaselineGraph;
