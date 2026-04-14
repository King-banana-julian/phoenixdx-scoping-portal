import React, { useMemo } from 'react';
import { PILLARS, MQM_TIERS } from '../constants';
import { TrendingUp } from 'lucide-react';

/**
 * MaturityQuotientMatrix Component
 */
const MaturityQuotientMatrix = ({ scores, onScoreChange }) => {
  
  const avgMaturity = useMemo(() => {
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }, [scores]);

  const currentTier = useMemo(() => {
    return MQM_TIERS.find(t => avgMaturity >= t.scoreRange[0] && avgMaturity <= t.scoreRange[1]) || MQM_TIERS[2];
  }, [avgMaturity]);

  return (
    <section className="swiss-card">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-swiss-interactive-primary" size={14} />
          <h2 className="swiss-label mb-0">Maturity Quotient Matrix</h2>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-1 bg-swiss-bg-info border border-swiss-border-accent rounded-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-swiss-interactive-primary" />
          <span className="text-[11px] font-semibold text-swiss-text-info uppercase tracking-wider">
            {currentTier.name} Stage ({currentTier.multiplier.toFixed(1)}x)
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {PILLARS.map(pillar => (
          <div key={pillar.id} className="space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <label className="text-sm font-semibold text-swiss-text-primary">
                  {pillar.label}
                </label>
                <p className="text-[10px] text-swiss-text-tertiary font-normal italic mt-0.5">{pillar.description}</p>
              </div>
              <span className="text-xl font-semibold tabular-nums text-swiss-interactive-primary">
                {scores[pillar.id].toFixed(1)}
              </span>
            </div>
            
            {/* Discrete Segmented Control Track */}
            <div className="flex gap-1 p-1 bg-swiss-bg-secondary rounded-md border border-swiss-border-subtle">
              {pillar.levels.map(level => {
                const isActive = scores[pillar.id] === level.score;
                return (
                  <div key={level.score} className="relative flex-1 group/btn">
                    <button
                      onClick={() => onScoreChange(pillar.id, level.score)}
                      className={`w-full py-2 rounded-sm text-[10px] font-semibold tracking-wider transition-all
                        ${isActive 
                          ? 'bg-swiss-interactive-primary text-white shadow-sm' 
                          : 'bg-white border border-swiss-interactive-primary text-swiss-interactive-primary hover:bg-swiss-interactive-primary-inactive'
                        }
                      `}
                    >
                      {level.label}
                    </button>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-swiss-bg-primary border border-swiss-border-default rounded-sm shadow-none opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all z-50 pointer-events-none">
                      <p className="text-[10px] text-swiss-text-secondary leading-normal font-normal">{level.desc}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-swiss-border-default" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-swiss-bg-primary" style={{ marginTop: '-2px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-swiss-border-subtle">
        <div className="flex items-center gap-5 bg-swiss-bg-secondary p-4 rounded-md">
            <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-swiss-interactive-primary flex items-center justify-center text-xl font-semibold text-white">
                {currentTier.tier}
            </div>
            <div className="leading-tight">
                <h4 className="text-[10px] font-semibold text-swiss-text-tertiary uppercase tracking-widest mb-1">Aggregate Result</h4>
                <div className="text-base font-semibold text-swiss-text-primary">
                    {currentTier.name} Strategy
                </div>
                <p className="text-[11px] text-swiss-text-secondary mt-1 font-normal italic">
                    {currentTier.friction}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityQuotientMatrix;

