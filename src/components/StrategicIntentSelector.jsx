import React from 'react';
import { STRATEGIC_INTENTS } from '../constants';
import { Target, CheckCircle2 } from 'lucide-react';

const StrategicIntentSelector = ({ selectedIntentId, onSelectIntent }) => {
  return (
    <div className="space-y-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <Target size={48} className="mx-auto text-violet-600 mb-4 opacity-80" />
        <h2 className="text-3xl font-black text-gray-900 mb-2">Primary Strategic Intent</h2>
        <p className="text-gray-500 text-lg">
          Select the core goal of this project. This establishes our baseline risk profile and pre-selects mandatory discovery activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STRATEGIC_INTENTS.map((intent) => {
          const isSelected = selectedIntentId === intent.id;
          
          return (
            <button
              key={intent.id}
              onClick={() => onSelectIntent(intent.id)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 group flex flex-col justify-between h-full ${
                isSelected 
                  ? `bg-white border-violet-600 shadow-md` 
                  : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold transition-colors ${isSelected ? 'text-violet-900' : 'text-gray-900'}`}>
                    {intent.label}
                  </h3>
                  <div className={`flex-shrink-0 transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <CheckCircle2 size={24} className={isSelected ? 'text-violet-600' : 'text-gray-300'} />
                  </div>
                </div>
                
                <p className={`text-sm mb-6 ${isSelected ? 'text-gray-700' : 'text-gray-500'}`}>
                  {intent.description}
                </p>
              </div>

              <div className="space-y-3 mt-auto">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="block text-[10px] uppercase font-black tracking-wider text-gray-500 mb-1">
                    Core Value Metric
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {intent.coreValue}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 p-2 rounded-lg border border-gray-200 text-center">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-0.5">
                      Legacy Mul
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-900">
                      {intent.legacyMultiplier}x
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-50 p-2 rounded-lg border border-gray-200 text-center">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-0.5">
                      Risk Buf
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-900">
                      +{Math.round(intent.riskBuffer * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StrategicIntentSelector;
