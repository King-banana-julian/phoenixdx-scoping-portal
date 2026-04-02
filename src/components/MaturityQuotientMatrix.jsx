import React, { useMemo } from 'react';
import { PILLARS, MQM_TIERS } from '../constants';
import { TrendingUp } from 'lucide-react';

/**
 * MaturityQuotientMatrix Component
 * 
 * @param {Object} scores - Object containing scores for Strategy, Culture, Process, Outcomes
 * @param {Function} onScoreChange - Callback when a score is updated
 */
const MaturityQuotientMatrix = ({ scores, onScoreChange }) => {
  
  // Calculate Average Maturity Score
  const avgMaturity = useMemo(() => {
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }, [scores]);

  // Determine Maturity Tier based on average
  const currentTier = useMemo(() => {
    return MQM_TIERS.find(t => avgMaturity >= t.scoreRange[0] && avgMaturity <= t.scoreRange[1]) || MQM_TIERS[2];
  }, [avgMaturity]);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="text-violet-600" size={20} />
          Maturity Quotient Matrix (MQM)
        </h3>
        <div className={`px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 flex items-center gap-3 shadow-sm`}>
          <div className={`w-2 h-2 rounded-full animate-pulse bg-violet-500`} />
          <span className={`text-sm font-bold text-violet-700`}>
            {currentTier.name} ({currentTier.multiplier.toFixed(1)}x)
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {PILLARS.map(pillar => (
          <div key={pillar.id} className="space-y-3 group">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-bold text-gray-700 group-hover:text-violet-600 transition-colors">
                  {pillar.label}
                </label>
                <p className="text-[10px] text-gray-500 italic mt-0.5">{pillar.description}</p>
              </div>
              <span className={`text-xl font-black tabular-nums transition-colors duration-300 text-violet-600`}>
                {scores[pillar.id].toFixed(1)}
              </span>
            </div>
            
            {/* Discrete Segmented Control Track */}
            <div className="flex gap-1 mt-2 p-1 bg-gray-100 rounded-xl border border-gray-200">
              {pillar.levels.map(level => {
                const isActive = scores[pillar.id] === level.score;
                return (
                  <div key={level.score} className="relative flex-1 group/btn">
                    <button
                      onClick={() => onScoreChange(pillar.id, level.score)}
                      className={`w-full py-2.5 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-300
                        ${isActive 
                          ? `bg-white border border-violet-600 text-violet-700 shadow-sm` 
                          : `bg-transparent border border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700`
                        }
                      `}
                    >
                      {level.label}
                    </button>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all duration-300 z-50 pointer-events-none">
                      <p className="text-[10px] text-gray-600 leading-relaxed font-normal">{level.desc}</p>
                      
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-200" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" style={{ marginTop: '-2px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-md transition-all duration-500 bg-violet-600`}>
                {currentTier.tier}
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Aggregate Maturity Stage</h4>
                <div className={`text-2xl font-black tracking-tight text-violet-700`}>
                    {currentTier.name} Strategy
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {currentTier.friction}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityQuotientMatrix;
