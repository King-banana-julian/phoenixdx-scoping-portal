import React from 'react';
import { Calendar, FileText, Activity, AlertCircle, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

const formatCurrency = (val) => new Intl.NumberFormat('en-AU', { 
  style: 'currency', 
  currency: 'AUD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(val || 0);

const ScopeSummary = ({ clientName, projectName, engMode, calculation, engagementModeLabel, setCurrentStep }) => {
  const { 
    activityDetails, finalDays, compoundedBase, strategyM, maturityM, governanceM, 
    totalBaseEffort, budgetFit, budgetGap, budgetOverflow, requiredDayRate, 
    daysToRemove, hasBudgetCap, budgetCap, dayRate, estimatedCost 
  } = calculation;

  const getLargestActivity = () => {
    if (!activityDetails || activityDetails.length === 0) return null;
    return activityDetails.reduce((prev, current) => (prev.cost > current.cost) ? prev : current);
  };
  const largestActivity = getLargestActivity();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Scope Guards */}
      {(hasBudgetCap && budgetOverflow) && (
        <div className="bg-[#FAEEDA] border border-[#854F0B] rounded-[8px] p-3 flex items-start gap-3 w-full">
          <span className="text-[#633806] font-bold mt-0.5">▲</span>
          <div>
            <div className="text-[13px] font-semibold text-[#633806]">BUDGET OVERFLOW — Estimated cost exceeds cap by {formatCurrency(budgetGap)}. Review activity sizes or adjust the day rate in Engagement Setup.</div>
          </div>
        </div>
      )}

      {(hasBudgetCap && budgetFit) && (
        <div className="bg-[#E1F5EE] border border-[#0F6E56] rounded-[8px] p-3 flex items-start gap-3 w-full">
          <span className="text-[#085041] font-bold mt-0.5">✓</span>
          <div>
            <div className="text-[13px] font-semibold text-[#085041]">Budget fits — estimated cost is {formatCurrency(budgetGap)} under cap.</div>
          </div>
        </div>
      )}

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
        <div className="swiss-card bg-swiss-interactive-primary border-swiss-interactive-primary space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-white" />
              <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider">Project Effort</h3>
            </div>
            <div className="space-y-1 mt-4">
              <div className="text-3xl font-mono font-bold text-white tracking-tighter">
                {finalDays.toFixed(1)} <span className="text-sm uppercase tracking-widest ml-1 opacity-70">Days</span>
              </div>
              <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Compounded with {((finalDays / totalBaseEffort - 1) * 100).toFixed(0)}% Risk Buffer
              </div>
            </div>
          </div>
          <div className="text-white/80 text-sm font-semibold pt-4 border-t border-white/20 mt-4 flex items-center justify-between">
            <span>Day Rate</span>
            <span className="tabular-nums font-mono">{dayRate ? formatCurrency(dayRate) : '—'}</span>
          </div>
        </div>
      </div>

      {/* Budget Alignment Card */}
      {hasBudgetCap && budgetFit && (
        <div className="bg-[#E1F5EE] border border-[#0F6E56] rounded-[8px] p-4 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0F6E56]" />
          <div className="ml-2">
            <div className="text-[13px] font-semibold text-[#085041] flex items-center gap-2">
              ✓  Scope fits within budget
            </div>
            <div className="text-[13px] font-regular text-[#085041] mt-1">
              Estimated cost is {formatCurrency(budgetGap)} under the budget cap.
            </div>
            <div className="text-[13px] font-semibold text-[#085041] mt-1 tabular-nums">
              Remaining budget: {formatCurrency(budgetGap)} AUD ex GST
            </div>
          </div>
        </div>
      )}

      {hasBudgetCap && budgetOverflow && (
        <div className="bg-[#FAEEDA] border border-[#854F0B] rounded-[8px] p-4 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#854F0B]" />
          <div className="ml-2">
            <div className="text-[13px] font-semibold text-[#633806] flex items-center gap-2">
              ▲  BUDGET OVERFLOW
            </div>
            <div className="text-[13px] font-regular text-[#633806] mt-1">
              Estimated cost exceeds the budget cap by {formatCurrency(budgetGap)} AUD ex GST.
            </div>
            <div className="text-[13px] font-semibold text-[#633806] mt-3">
              To bring this within budget, consider:
            </div>
            <ul className="text-[13px] font-regular text-[#633806] list-disc list-inside mt-2 space-y-1">
              {daysToRemove > 0 && <li>Remove {daysToRemove} days of effort by reducing activity sizes</li>}
              {largestActivity && (
                 <li>Move {largestActivity.name} from {largestActivity.selectedSize} to a smaller tier</li>
              )}
              {requiredDayRate > 0 && dayRate > 0 && (
                 <li>Reduce the day rate from {formatCurrency(dayRate)} to {formatCurrency(requiredDayRate)} to fit within cap</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {!hasBudgetCap && (
        <div className="bg-[#F7F6F3] border border-[#D3D1C7] rounded-[8px] p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-[13px] font-semibold text-[#5F5E5A]">No budget cap set</div>
              <div className="text-[13px] font-regular text-[#5F5E5A]">
                The estimated cost for this scope is {formatCurrency(estimatedCost)} AUD ex GST.
              </div>
              <div className="text-[13px] font-regular text-[#888780] pt-1">
                Add a budget cap in Engagement Setup to see alignment status.
              </div>
            </div>
            <button 
              onClick={() => {
                if (setCurrentStep) setCurrentStep(1); // Go to Engagement Setup
              }}
              className="text-[13px] font-semibold text-[#185FA5] hover:underline"
            >
              Add budget cap
            </button>
          </div>
        </div>
      )}

      {/* Activity Details Table */}
      <div className="bg-white border border-swiss-border-default overflow-hidden">
        <div className="bg-swiss-bg-secondary border-b border-swiss-border-default px-6 py-3 flex justify-between">
          <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest w-1/2">Selected Activities & Effort</div>
          <div className="flex items-center justify-end gap-12 w-1/2">
            <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest w-20 text-right">Days</div>
            <div className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest w-24 text-right">Cost</div>
          </div>
        </div>
        
        <div className="divide-y divide-swiss-border-subtle">
          {activityDetails.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-swiss-bg-secondary transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 rounded-sm bg-swiss-bg-tertiary flex items-center justify-center">
                  <Activity size={14} className="text-swiss-text-tertiary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-swiss-text-primary w-64 md:w-auto truncate">{activity.name}</div>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider">Size: {activity.selectedSize}</span>
                    {activity.selectedAI && (
                      <span className="text-[10px] font-bold text-swiss-text-success uppercase tracking-wider bg-swiss-bg-success px-1.5 py-0.5 rounded-sm">AI Accelerated</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-6 md:gap-12">
                <div className="text-right w-20">
                  <div className="text-sm font-mono font-semibold text-swiss-text-primary">{activity.finalDays.toFixed(1)}d</div>
                  <div className="text-[9px] font-bold text-swiss-text-tertiary uppercase tracking-widest">Adjusted</div>
                </div>
                <div className="text-right w-24">
                  <div className="text-sm font-mono font-semibold text-swiss-text-primary tabular-nums">
                    {formatCurrency(activity.cost)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activityDetails.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-swiss-text-tertiary">No activities selected. Return to Manifest to add scope.</div>
          )}
        </div>

        {/* Footer Total */}
        <div className="bg-[#F7F6F3] border-t border-swiss-border-default px-6 py-4 flex items-center justify-between">
          <div className="text-[13px] font-bold text-swiss-text-primary uppercase tracking-wider">Total Est. Cost</div>
          <div className="flex items-center gap-4">
             {hasBudgetCap && budgetOverflow && (
               <span className="text-[11px] font-bold text-[#854F0B] uppercase tracking-wider bg-[#FAEEDA] border border-[#854F0B] px-2 py-0.5 rounded-sm flex items-center gap-1">
                 <AlertTriangle size={10} /> Over budget
               </span>
             )}
             <div className={`text-[18px] font-mono font-bold tabular-nums ${hasBudgetCap ? (budgetOverflow ? 'text-[#633806]' : 'text-[#085041]') : 'text-swiss-text-primary'}`}>
               {formatCurrency(estimatedCost)}
             </div>
          </div>
        </div>
      </div>

      {/* Multiplier Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Strategic Goal', val: strategyM, desc: 'Legacy / Goal Multiplier' },
          { label: 'Org Maturity', val: maturityM, desc: 'Diagnostic Quotient' },
          { label: 'Governance', val: governanceM, desc: 'Decision Efficiency' }
        ].map(m => (
          <div key={m.label} className="p-4 border border-swiss-border-default flex flex-col gap-2 bg-white rounded-md">
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
