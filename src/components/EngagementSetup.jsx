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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">
          Engagement Type
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Select the engagement model that best describes what PhoenixDX will be delivering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENGAGEMENT_MODES.map((mode) => {
            const isActive = engMode === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => setEngMode(isActive ? null : mode.id)}
                className={`cursor-pointer transition-all ${isActive
                    ? 'border-2 rounded-xl p-4'
                    : 'border-2 border-slate-200 bg-white rounded-xl p-4 hover:border-slate-300'
                  }`}
                style={
                  isActive
                    ? { borderColor: mode.color, backgroundColor: `${mode.color}0D` }
                    : {}
                }
              >
                {(() => {
                  const Icon = modeIcons[mode.id];
                  return Icon && <Icon size={20} color={isActive ? mode.color : '#94a3b8'} style={{ marginBottom: 8 }} />;
                })()}
                <div className="font-extrabold text-sm text-slate-800">{mode.label}</div>
                <div className="text-xs text-slate-500 mt-1">{mode.sub}</div>

                {isActive && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {mode.phases.map((phase) => (
                      <span
                        key={phase}
                        className="inline-flex text-[10px] font-bold bg-white/60 border border-slate-200/50 px-2 py-0.5 rounded text-slate-600"
                      >
                        {phase}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Industry */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-6">
          Industry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map((ind) => {
            const isActive = industry === ind.id;
            return (
              <div
                key={ind.id}
                onClick={() => setIndustry(isActive ? null : ind.id)}
                className={`cursor-pointer transition-all ${isActive
                    ? 'border-2 border-violet-500 bg-violet-50 rounded-xl p-3'
                    : 'border-2 border-slate-200 bg-white rounded-xl p-3 hover:border-slate-300'
                  }`}
              >
                {(() => {
                  const IIcon = industryIcons[ind.id];
                  return IIcon && <IIcon size={16} color={isActive ? '#7c3aed' : '#94a3b8'} style={{ marginBottom: 6 }} />;
                })()}
                <div className={`text-sm font-bold ${isActive ? 'text-violet-900' : 'text-slate-700'}`}>
                  {ind.label}
                </div>
                {isActive && (
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {ind.example}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3 — Project Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-6">
          Project Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Client Name
            </label>
            <input
              type="text"
              value={clientName || ''}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Bupa HI Pty Ltd"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Project Name
            </label>
            <input
              type="text"
              value={projectName || ''}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. e-Credentialing Platform"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Dates row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">Target Delivery Date</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors" />
          </div>
        </div>

        {/* Business days info pill - only when both dates set */}
        {startDate && targetDate && (
          <div className="mt-3 flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5">
            <span className="text-xs font-bold text-indigo-600">
              ℹ {(() => {
                const d1 = new Date(startDate); const d2 = new Date(targetDate);
                let count = 0; const cur = new Date(d1);
                while (cur <= d2) { if (cur.getDay() !== 0 && cur.getDay() !== 6) count++; cur.setDate(cur.getDate() + 1); }
                return count;
              })()} business days available in this window
            </span>
          </div>
        )}

        {/* Budget toggle */}
        <div className="mt-4">
          <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Budget</label>
          <div className="flex gap-3 mb-3">
            <button onClick={() => setHasBudget(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${hasBudget ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500'}`}>
              I have a budget cap
            </button>
            <button onClick={() => setHasBudget(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${!hasBudget ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500'}`}>
              Quote me — no cap set
            </button>
          </div>
          {hasBudget && (
            <input type="number" value={budgetCap} onChange={e => setBudgetCap(e.target.value)}
              placeholder="Enter budget cap (AUD ex GST)"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors" />
          )}
          {!hasBudget && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-amber-700">No budget cap set — the estimate will show total projected cost based on your squad configuration.</p>
            </div>
          )}
        </div>
      </div>

      {/* Section 4 — Strategic Goal */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Strategic Goal</p>
        <p className="text-sm text-slate-500 mb-4">Select the primary objective driving this engagement.</p>
        <div className="grid grid-cols-3 gap-3">
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
                className={`p-4 rounded-xl border-2 cursor-pointer text-left transition-all duration-150 ${active ? 'bg-indigo-50' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                style={active ? { borderColor: '#6366f1' } : {}}
              >
                <Icon size={18} color={active ? '#6366f1' : '#94a3b8'} style={{ marginBottom: 8 }} />
                <div className={`text-sm font-bold ${active ? 'text-indigo-700' : 'text-slate-800'}`}>{intent.label}</div>
                {intent.legacyMultiplier > 1 && (
                  <div className="text-xs font-bold text-amber-500 mt-1">+{((intent.legacyMultiplier - 1) * 100).toFixed(0)}% effort</div>
                )}
                {active && intent.wmbt && (
                  <div className="mt-2 space-y-1">
                    {intent.wmbt.slice(0, 2).map((w, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-slate-500 leading-snug">{w}</p>
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
