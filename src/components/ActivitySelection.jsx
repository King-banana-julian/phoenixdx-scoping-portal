import React from 'react';
import { UX_ACTIVITIES } from '../constants';
import { ClipboardList, Plus, Minus, Info } from 'lucide-react';

const ActivitySelection = ({ selectedActivities, onToggleActivity, onUpdateQuantity }) => {
  const stages = ['Discover', 'Define', 'Develop', 'Deliver'];

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="text-violet-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">UX Activity Selection</h3>
      </div>

      <div className="space-y-8">
        {stages.map(stage => (
          <div key={stage} className="space-y-4">
            <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest border-b border-gray-200 pb-2">
              <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full">{stage} Phase</span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {UX_ACTIVITIES.filter(a => a.stage === stage).map(activity => {
                const isSelected = !!selectedActivities[activity.id];
                const quantity = selectedActivities[activity.id]?.quantity || 0;

                return (
                  <div 
                    key={activity.id}
                    className={`flex flex-col p-4 rounded-xl border transition-all group ${
                      isSelected 
                        ? 'bg-violet-50 border-violet-300 shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleActivity(activity.id)}
                          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                            isSelected ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 group-hover:border-violet-400'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </button>
                        <div className="flex flex-col">
                          {/* Outcome is bold black text */}
                          <span className={`font-bold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
                            {activity.outcome}
                          </span>
                          {/* Activity is smaller gray text below it */}
                          <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-violet-700 font-medium' : 'text-gray-500'}`}>
                            Activity: {activity.label}
                          </span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-violet-200 shadow-sm">
                          <button 
                            onClick={() => onUpdateQuantity(activity.id, Math.max(1, quantity - 1))}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-mono font-bold text-violet-700 min-w-[20px] text-center">
                            {quantity || 1}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(activity.id, (quantity || 1) + 1)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pl-8">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-1">
                        <span>Base: {activity.baseEffort} {activity.unit}</span>
                        {activity.synthesisRatio && (
                          <span className="text-emerald-600 italic flex items-center gap-1">
                            <Info size={10} />
                            Synthesis Automator Active (1:{activity.synthesisRatio})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySelection;
