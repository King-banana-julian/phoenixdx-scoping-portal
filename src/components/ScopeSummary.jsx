import React from 'react';
import { Calendar, FileText, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const ScopeSummary = ({ clientName, projectName, engMode, calculation, engagementModeLabel }) => {
  const { activityDetails, finalDays, compoundedBase, strategyM, maturityM, governanceM, totalBaseEffort } = calculation;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Summary */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-swiss-text-primary tracking-tight">Scope Summary</h2>
        <p className="text-sm text-swiss-text-tertiary">Review the consolidated technical effort and strategic risk profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Context Card */}
        <div className="swiss-card space-y-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-swiss-interactive-primary" />
            <h3 className="text-xs font-bold text-swiss-text-tertiary uppercase tracking-wider">Project Context</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest mb-1">Engagement</div>
              <div className="text-sm font-semibold text-swiss-text-primary">{clientName || 'Unnamed Client'} — {projectName || 'Discovery Phase'}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest mb-1">Delivery Model</div>
              <div className="text-sm font-semibold text-swiss-text-primary">{engagementModeLabel || 'Strategic Discovery'}</div>
            </div>
          </div>
        </div>

        {/* Effort Summary Card */}
        <div className="swiss-card bg-swiss-interactive-primary border-swiss-interactive-primary space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-white" />
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider">Project Effort</h3>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-mono font-bold text-white tracking-tighter">
              {finalDays.toFixed(1)} <span className="text-sm uppercase tracking-widest ml-1 opacity-70">Days</span>
            </div>
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Compounded with {((finalDays / totalBaseEffort - 1) * 100).toFixed(0)}% Risk Buffer
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details Table */}
      <div className="bg-white border border-swiss-border-default overflow-hidden">
        <div className="bg-swiss-bg-secondary border-b border-swiss-border-default px-6 py-3">
          <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest">Selected Activities & Effort</div>
        </div>
        <div className="divide-y divide-swiss-border-subtle">
          {activityDetails.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-swiss-bg-secondary transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-sm bg-swiss-bg-tertiary flex items-center justify-center">
                  <Activity size={14} className="text-swiss-text-tertiary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-swiss-text-primary">{activity.name}</div>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider">Size: {activity.selectedSize}</span>
                    {activity.selectedAI && (
                      <span className="text-[10px] font-bold text-swiss-text-success uppercase tracking-wider bg-swiss-bg-success px-1.5 py-0.5 rounded-sm">AI Accelerated</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-semibold text-swiss-text-primary">{activity.calculatedEffort.toFixed(1)}d</div>
                <div className="text-[9px] font-bold text-swiss-text-tertiary uppercase tracking-widest">Compounded</div>
              </div>
            </div>
          ))}
          {activityDetails.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-swiss-text-tertiary">No activities selected. Return to Manifest to add scope.</div>
          )}
        </div>
      </div>

      {/* Multiplier Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Strategic Goal', val: strategyM, desc: 'Legacy / Goal Multiplier' },
          { label: 'Org Maturity', val: maturityM, desc: 'Diagnostic Quotient' },
          { label: 'Governance', val: governanceM, desc: 'Decision Efficiency' }
        ].map(m => (
          <div key={m.label} className="p-4 border border-swiss-border-default flex flex-col gap-2">
            <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest">{m.label}</div>
            <div className="text-xl font-mono font-bold text-swiss-interactive-primary">{m.val.toFixed(2)}×</div>
            <div className="text-[10px] text-swiss-text-tertiary font-medium">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeSummary;
