import React from 'react';
import { Zap, Info, ShieldAlert } from 'lucide-react';

const ActivityManifest = ({ activities, selectedActivities, toggleActivity, updateActivity }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-swiss-text-primary tracking-tight">Activity Manifest</h2>
        <p className="text-sm text-swiss-text-tertiary">Select activities and define their scope size. Strategic risk guards will trigger based on your selections.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => {
          const isSelected = !!selectedActivities[activity.id];
          const config = selectedActivities[activity.id] || { size: 'Small', ai: false };
          const effortData = activity.effortBySize[config.size] || {};

          return (
            <div 
              key={activity.id}
              className={`border p-4 transition-all duration-200 ${
                isSelected 
                ? 'border-swiss-interactive-primary bg-white ring-1 ring-swiss-interactive-primary/20' 
                : 'border-swiss-border-default bg-swiss-bg-secondary hover:border-swiss-border-accent'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="pt-1">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleActivity(activity.id, 'Small')}
                      className="w-4 h-4 rounded-sm border-swiss-border-default text-swiss-interactive-primary focus:ring-swiss-interactive-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-swiss-text-primary">{activity.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-swiss-bg-tertiary text-swiss-text-tertiary uppercase tracking-wider rounded-sm">
                        Model {activity.model}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider">Size & Scope</label>
                          <div className="flex gap-1">
                            {['Small', 'Medium', 'Large', 'XL'].map(size => (
                              <button
                                key={size}
                                onClick={() => updateActivity(activity.id, { size })}
                                className={`px-3 py-1 text-xs font-semibold rounded-sm border transition-all ${
                                  config.size === size
                                  ? 'bg-swiss-interactive-primary text-white border-swiss-interactive-primary'
                                  : 'bg-white text-swiss-text-secondary border-swiss-border-default hover:border-swiss-border-accent'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider">AI Acceleration</label>
                          <button
                            onClick={() => updateActivity(activity.id, { ai: !config.ai })}
                            className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-sm border transition-all ${
                              config.ai
                              ? 'bg-swiss-bg-success text-swiss-text-success border-swiss-border-success'
                              : 'bg-white text-swiss-text-secondary border-swiss-border-default hover:border-swiss-border-accent'
                            }`}
                          >
                            <Zap size={10} className={config.ai ? 'fill-current' : ''} />
                            {config.ai ? 'AI Active' : 'Enable AI'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right space-y-1 min-w-[80px]">
                  <div className="text-xs font-bold text-swiss-text-tertiary uppercase tracking-wider">Effort</div>
                  <div className="text-lg font-mono font-semibold text-swiss-text-primary">
                    {isSelected ? (config.ai ? effortData.aiEffort : effortData.effort) : '—'}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-swiss-border-subtle flex gap-6">
                  <div className="flex-1 space-y-1">
                    <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider flex items-center gap-1">
                      <Info size={10} /> Trigger
                    </div>
                    <div className="text-xs text-swiss-text-secondary leading-normal">
                      {effortData.trigger}
                    </div>
                  </div>
                  {activity.scopeGuards.length > 0 && (
                    <div className="flex-1 space-y-1">
                      <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider flex items-center gap-1">
                        <ShieldAlert size={10} /> Logic Guards
                      </div>
                      <div className="text-xs text-swiss-text-secondary leading-normal">
                        {activity.scopeGuards[0]}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityManifest;
