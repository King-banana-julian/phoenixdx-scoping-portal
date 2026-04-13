import React from 'react';
import { UX_ACTIVITIES } from '../constants';
import { ClipboardList, Plus, Minus, Info, Check } from 'lucide-react';

const ActivitySelection = ({ selectedActivities, onToggleActivity, onUpdateQuantity }) => {
  const stages = ['Discover', 'Define', 'Develop', 'Deliver'];

  return (
    <section className="swiss-card">
      <div className="flex items-center gap-2 mb-8">
        <ClipboardList className="text-swiss-interactive-primary" size={16} />
        <h2 className="swiss-label mb-0">Activity Manifest</h2>
      </div>

      <div className="space-y-12">
        {stages.map(stage => (
          <div key={stage} className="space-y-4">
            <h4 className="flex items-center gap-3 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-subtle pb-2">
              {stage} Phase
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {UX_ACTIVITIES.filter(a => a.stage === stage).map(activity => {
                const isSelected = !!selectedActivities[activity.id];
                const quantity = selectedActivities[activity.id]?.quantity || 1;

                return (
                  <div 
                    key={activity.id}
                    className={`flex flex-col p-4 rounded-md border transition-all duration-150 ease-in-out group active:scale-[0.99] cursor-pointer ${
                      isSelected 
                        ? 'bg-swiss-bg-info border-swiss-interactive-primary' 
                        : 'bg-white border-swiss-border-default hover:border-swiss-interactive-primary'
                    }`}
                    onClick={() => onToggleActivity(activity.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div 
                          className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-swiss-interactive-primary border-swiss-interactive-primary text-white' 
                              : 'bg-white border-swiss-border-default group-hover:border-swiss-interactive-primary'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-swiss-text-primary leading-tight">
                            {activity.outcome || "—"}
                          </span>
                          <span className={`text-[11px] mt-1 font-medium ${isSelected ? 'text-swiss-interactive-primary' : 'text-swiss-text-tertiary'}`}>
                            Activity: {activity.label}
                          </span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div 
                          className="flex items-center gap-2 bg-white rounded-md p-1 border border-swiss-interactive-primary/20 shadow-none"
                          onClick={(e) => e.stopPropagation()} // Prevent card toggle
                        >
                          <button 
                            onClick={() => onUpdateQuantity(activity.id, Math.max(1, quantity - 1))}
                            className="p-1.5 hover:bg-swiss-bg-secondary rounded-sm text-swiss-text-tertiary hover:text-swiss-text-primary transition-all active:scale-90"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-semibold text-swiss-interactive-primary min-w-[16px] text-center tabular-nums">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(activity.id, quantity + 1)}
                            className="p-1.5 hover:bg-swiss-bg-secondary rounded-sm text-swiss-text-tertiary hover:text-swiss-text-primary transition-all active:scale-90"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pl-9 mt-3 flex items-center gap-4 text-[10px] font-semibold text-swiss-text-tertiary uppercase tracking-wider">
                      <span>Base: {activity.baseEffort} {activity.unit}</span>
                      {activity.synthesisRatio && (
                        <span className="text-swiss-text-success italic flex items-center gap-1">
                          <Info size={10} />
                          Synthesis Automator Active (1:{activity.synthesisRatio})
                        </span>
                      )}
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
