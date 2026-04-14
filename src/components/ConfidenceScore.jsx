import React from 'react';
import { calculateIntakeSignals } from '../utils/intakeLogic';

const ConfidenceScore = ({ state }) => {
  const { score, deltas } = calculateIntakeSignals(state);

  const getStatus = (val) => {
    if (val >= 80) return { label: "High confidence — strong signal for recommendation", color: "#0F6E56", bg: "#E6F4F0" };
    if (val >= 50) return { label: "Medium confidence — some gaps may affect accuracy", color: "#B45309", bg: "#FFFBEB" };
    return { label: "Low confidence — recommendation based on limited signal", color: "#B91C1C", bg: "#FEF2F2" };
  };

  const status = getStatus(score);

  return (
    <div className="bg-white border border-[#D3D1C7] rounded-sm p-8 flex flex-col md:flex-row gap-12 items-start shadow-sm">
      <div className="space-y-2">
        <h3 className="text-[11px] font-bold text-[#888780] uppercase tracking-widest">Scope confidence</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-[48px] font-bold leading-none" style={{ color: status.color }}>
            {score}
          </span>
          <span className="text-sm font-bold text-[#888780]">/ 100</span>
        </div>
        <div 
          className="inline-block px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-tight"
          style={{ backgroundColor: status.bg, color: status.color }}
        >
          {status.label}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="text-[11px] font-bold text-[#5F5E5A] uppercase tracking-wider mb-2">Investigation prompts</div>
        <div className="space-y-3">
          {deltas.map((delta, i) => (
            <div key={i} className="flex gap-3 text-sm leading-relaxed text-[#888780]">
              <span className="text-[#888780]">▲</span>
              <span>{delta}</span>
            </div>
          ))}
          {deltas.length === 0 && (
            <div className="text-sm text-[#0F6E56] font-medium italic">
              All signals captured. High recommendation accuracy expected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfidenceScore;
