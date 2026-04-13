import React from 'react';
import { ChevronRight, FileText, Share, Download } from 'lucide-react';

const EstimateSummary = ({ calculation, clientName, projectName, engMode, selectedGoal }) => {
  const { finalDays, totalCost, strategyM, maturityM, governanceM, infoM } = calculation;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. HERO STATS */}
      <div className="swiss-card border-swiss-interactive-primary bg-swiss-bg-info">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-4">
          <div>
            <span className="text-[10px] font-bold text-swiss-interactive-primary uppercase tracking-[0.2em] mb-2 block">Projected Delivery Effort</span>
            <div className="text-5xl font-bold text-swiss-text-primary tabular-nums tracking-tight">
              {finalDays > 0 ? finalDays.toFixed(1) : "—"}<span className="text-2xl ml-1 text-swiss-text-tertiary font-medium">days</span>
            </div>
          </div>
          <div className="h-12 w-[1px] bg-swiss-interactive-primary/20 hidden md:block" />
          <div className="text-right">
            <span className="text-[10px] font-bold text-swiss-interactive-primary uppercase tracking-[0.2em] mb-2 block">Commercial Estimate</span>
            <div className="text-5xl font-bold text-swiss-text-success tabular-nums tracking-tight">
              {totalCost > 0 ? `$${Math.round(totalCost).toLocaleString("en-AU")}` : "—"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. TRACEABILITY CHAIN */}
        <section className="swiss-card space-y-6">
          <h3 className="swiss-label uppercase tracking-widest border-b border-swiss-border-subtle pb-4">Traceability Chain</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center group">
              <span className="text-xs text-swiss-text-secondary font-medium">Strategic Objective</span>
              <span className="text-sm font-semibold text-swiss-text-primary">{(strategyM || 1).toFixed(2)}×</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-xs text-swiss-text-secondary font-medium">Maturity Quotient</span>
              <span className="text-sm font-semibold text-swiss-text-primary">{(maturityM || 1).toFixed(2)}×</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-xs text-swiss-text-secondary font-medium">Governance Overhead</span>
              <span className="text-sm font-semibold text-swiss-text-primary">{(governanceM || 1).toFixed(2)}×</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-xs text-swiss-text-secondary font-medium">Information Readiness</span>
              <span className="text-sm font-semibold text-swiss-text-primary">{infoM > 1 ? "+25%" : "0%"}</span>
            </div>
            <div className="pt-4 border-t border-swiss-border-default flex justify-between items-center">
              <span className="text-xs font-bold text-swiss-text-primary uppercase tracking-wider">Compound Factor</span>
              <span className="text-lg font-bold text-swiss-interactive-primary tabular-nums">
                {(strategyM * maturityM * governanceM * (infoM > 1 ? 1.25 : 1) * 1.2).toFixed(2)}×
              </span>
            </div>
          </div>
        </section>

        {/* 3. ENGAGEMENT CONTEXT */}
        <section className="swiss-card space-y-6 bg-swiss-bg-secondary border-swiss-border-subtle">
          <h3 className="swiss-label uppercase tracking-widest border-b border-swiss-border-default pb-4">Engagement Context</h3>
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest block mb-1">Entity</span>
              <div className="text-sm font-semibold text-swiss-text-primary">{clientName || "—"}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest block mb-1">Initiative</span>
              <div className="text-sm font-semibold text-swiss-text-primary">{projectName || "—"}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest block mb-1">Model</span>
              <div className="text-sm font-semibold text-swiss-text-primary uppercase tracking-tight">{(engMode || "").replace(/_/g, " ")}</div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. EXPORT ACTIONS */}
      <div className="flex items-center justify-center gap-4 pt-12">
        <button 
          className="flex items-center gap-3 px-8 h-12 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover active:bg-[#042C53] active:scale-95 text-white rounded-md text-sm font-bold transition-all duration-200"
          onClick={() => window.print()}
        >
          <Download size={16} strokeWidth={3} />
          Export Estimate (PDF)
        </button>
        <button className="flex items-center gap-2 px-6 h-12 border border-swiss-border-default text-swiss-text-secondary hover:bg-white hover:border-swiss-text-tertiary rounded-md text-sm font-semibold transition-all active:scale-95">
          <Share size={16} />
          Copy Share Link
        </button>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-swiss-text-tertiary font-medium uppercase tracking-[0.3em]">Authorized for Internal Use Only — PhoenixDX</p>
      </div>
    </div>
  );
};

export default EstimateSummary;
