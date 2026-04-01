import React from 'react';
import { ENGAGEMENT_MODES, INDUSTRIES } from '../constants/index.js';

export default function EngagementSetup({
  engMode,
  setEngMode,
  industry,
  setIndustry,
  clientName,
  setClientName,
  projectName,
  setProjectName,
}) {
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
      </div>
    </div>
  );
}
