import React, { useState } from 'react';
import { ENGAGEMENT_MODES, INDUSTRIES, STRATEGIC_INTENTS } from '../constants/index.js';
import { Palette, Code2, Package, Heart, Landmark, Home, DollarSign, BookOpen, Truck, Cpu, Globe, Layers, Star, Zap, Settings, Users, Shield } from 'lucide-react';

export default function EngagementSetup({
  engMode,
  setEngMode,
  industry,
  setIndustry,
  clientName,
  setClientName,
  projectName,
  setProjectName,
  startDate,
  setStartDate,
  targetDate,
  setTargetDate,
  budgetCap,
  setBudgetCap,
  selectedGoal,
  setSelectedGoal,
}) {
  const [hasBudget, setHasBudget] = useState(true);

  const modeIcons = { ux_only: Palette, design_to_dev: Code2, full_delivery: Package };
  const industryIcons = {
    healthcare: Heart, govt: Landmark, property: Home,
    financial: DollarSign, research: BookOpen,
    logistics: Truck, tech: Cpu, other: Globe
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Section 1 — Engagement Type */}
      <div className="swiss-card">
        <h2 className="swiss-label">Engagement Type</h2>
        <p className="text-sm text-swiss-text-secondary mb-6 font-normal">
          Select the model that best describes the PhoenixDX delivery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENGAGEMENT_MODES.map((mode) => {
            const isActive = engMode === mode.id;
            const Icon = modeIcons[mode.id];
            return (
              <button
                key={mode.id}
                onClick={() => setEngMode(isActive ? null : mode.id)}
                className={`flex flex-col items-start text-left transition-all p-5 rounded-md border h-full active:scale-[0.98] duration-150 ease-in-out ${
                  isActive
                    ? 'border-swiss-interactive-primary bg-swiss-bg-info text-swiss-interactive-primary'
                    : 'border-swiss-border-default bg-white text-swiss-text-primary hover:bg-[#F7F6F3] hover:border-swiss-text-tertiary'
                }`}
              >
                {Icon && <Icon size={16} className={`mb-3 ${isActive ? 'text-swiss-interactive-primary' : 'text-swiss-text-tertiary'}`} />}
                <div className={`font-semibold text-sm ${isActive ? 'text-swiss-text-primary' : 'text-swiss-text-primary'}`}>{mode.label}</div>
                <div className="text-xs mt-1 font-normal text-swiss-text-secondary leading-normal">
                  {mode.sub}
                </div>

                {isActive && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {mode.phases.map((phase) => (
                      <span
                        key={phase}
                        className="text-[10px] font-semibold bg-white border border-swiss-interactive-primary/20 px-2 py-0.5 rounded-sm text-swiss-interactive-primary"
                      >
                        {phase}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Industry */}
      <div className="swiss-card">
        <h2 className="swiss-label">Industry Sector</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map((ind) => {
            const isActive = industry === ind.id;
            const IIcon = industryIcons[ind.id];
            return (
              <button
                key={ind.id}
                onClick={() => setIndustry(isActive ? null : ind.id)}
                className={`flex flex-col items-start text-left transition-all p-3 rounded-md border active:scale-[0.98] duration-150 ease-in-out ${
                  isActive
                    ? 'border-swiss-interactive-primary bg-swiss-bg-info text-swiss-interactive-primary'
                    : 'border-swiss-border-default bg-white text-swiss-text-primary hover:bg-[#F7F6F3] hover:border-swiss-text-tertiary'
                }`}
              >
                {IIcon && <IIcon size={14} className={`mb-2 ${isActive ? 'text-swiss-interactive-primary' : 'text-swiss-text-tertiary'}`} />}
                <div className="text-sm font-semibold text-swiss-text-primary">
                  {ind.label}
                </div>
                {isActive && (
                  <div className="text-xs text-swiss-interactive-primary/80 mt-1 font-normal italic">
                    {ind.example}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3 — Project Details */}
      <div className="swiss-card">
        <h2 className="swiss-label">Project Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-swiss-text-tertiary uppercase">Client Name</label>
            <input
              type="text"
              value={clientName || ''}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Bupa HI Pty Ltd"
              className="swiss-input w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-swiss-text-tertiary uppercase">Project Name</label>
            <input
              type="text"
              value={projectName || ''}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. e-Credentialing Platform"
              className="swiss-input w-full"
            />
          </div>
        </div>

        {/* Dates row */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-swiss-text-tertiary uppercase">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="swiss-input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-swiss-text-tertiary uppercase">Target Date</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
              className="swiss-input w-full" />
          </div>
        </div>

        {/* Business days info pill */}
        {startDate && targetDate && (
          <div className="mt-4 flex items-center gap-2 bg-swiss-bg-info border border-swiss-border-accent/20 rounded-md px-4 py-2">
            <span className="text-xs font-semibold text-swiss-text-info tabular-nums">
              {(() => {
                const d1 = new Date(startDate); const d2 = new Date(targetDate);
                let count = 0; const cur = new Date(d1);
                while (cur <= d2) { if (cur.getDay() !== 0 && cur.getDay() !== 6) count++; cur.setDate(cur.getDate() + 1); }
                return count;
              })()} business days available in window
            </span>
          </div>
        )}

        {/* Budget toggle */}
        <div className="mt-6 pt-6 border-t border-swiss-border-subtle">
          <label className="swiss-label mb-4">Budget Strategy</label>
          <div className="flex gap-2 h-10 mb-4">
            <button 
              onClick={() => setHasBudget(true)}
              className={`flex-1 rounded-md text-sm font-semibold border transition-all active:scale-[0.98] duration-150 ease-in-out ${
                hasBudget 
                  ? 'bg-swiss-interactive-primary text-white border-swiss-interactive-primary' 
                  : 'bg-white text-swiss-text-primary border-swiss-border-default hover:bg-[#F7F6F3] hover:border-swiss-text-tertiary'
              }`}
            >
              Budget Cap Set
            </button>
            <button 
              onClick={() => setHasBudget(false)}
              className={`flex-1 rounded-md text-sm font-semibold border transition-all active:scale-[0.98] duration-150 ease-in-out ${
                !hasBudget 
                  ? 'bg-swiss-interactive-primary text-white border-swiss-interactive-primary' 
                  : 'bg-white text-swiss-text-primary border-swiss-border-default hover:bg-[#F7F6F3] hover:border-swiss-text-tertiary'
              }`}
            >
              No Budget Cap
            </button>
          </div>
          
          {hasBudget ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-swiss-text-tertiary uppercase">Budget Cap (AUD ex GST)</label>
              <input 
                type="number" 
                value={budgetCap} 
                onChange={e => setBudgetCap(e.target.value)}
                placeholder="Enter value..."
                className="swiss-input w-full tabular-nums" 
              />
            </div>
          ) : (
            <div className="bg-swiss-bg-warning border border-swiss-border-warning/30 rounded-md px-4 py-3">
              <p className="text-xs font-semibold text-swiss-text-warning">
                Estimate will calculate total projected cost based on squad configuration.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 4 — Strategic Goal */}
      <div className="swiss-card">
        <h2 className="swiss-label">Strategic Objective</h2>
        <p className="text-sm text-swiss-text-secondary mb-6 font-normal">Select the primary business driver.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STRATEGIC_INTENTS.map(intent => {
            const active = selectedGoal === intent.id;
            const iconMap = {
              legacy_modernization: Layers,
              digital_experience: Star,
              product_innovation: Zap,
              internal_tooling: Settings,
              self_service: Users,
              accessibility_risk: Shield,
            };
            const Icon = iconMap[intent.id] || Star;
            return (
              <button
                key={intent.id}
                onClick={() => setSelectedGoal(active ? null : intent.id)}
                className={`p-5 rounded-md border text-left transition-all active:scale-[0.98] duration-150 ease-in-out ${
                  active 
                    ? 'border-swiss-interactive-primary bg-swiss-bg-info text-swiss-interactive-primary' 
                    : 'border-swiss-border-default bg-white text-swiss-text-primary hover:bg-[#F7F6F3] hover:border-swiss-text-tertiary'
                }`}
              >
                <Icon size={16} className={`mb-3 ${active ? 'text-swiss-interactive-primary' : 'text-swiss-text-tertiary'}`} />
                <div className="text-sm font-semibold text-swiss-text-primary">{intent.label}</div>
                
                {intent.legacyMultiplier > 1 && (
                  <div className={`text-[10px] font-bold uppercase tracking-tight mt-1 tabular-nums ${active ? 'text-swiss-interactive-primary' : 'text-swiss-text-warning'}`}>
                    +{((intent.legacyMultiplier - 1) * 100).toFixed(0)}% Effort Load
                  </div>
                )}
                
                {active && intent.wmbt && (
                  <div className="mt-4 space-y-2 pt-3 border-t border-swiss-interactive-primary/20">
                    <p className="text-[10px] font-semibold text-swiss-text-tertiary uppercase tracking-widest leading-none">Principles for success</p>
                    {intent.wmbt.slice(0, 2).map((w, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-swiss-interactive-primary mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-swiss-text-secondary font-normal leading-normal">{w}</p>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

