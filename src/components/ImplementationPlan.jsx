import React from 'react';
import { MQM_TIERS, PILLARS } from '../constants';
import { Info, ShieldAlert, Zap } from 'lucide-react';

const ImplementationPlan = () => {
  return (
    <div className="space-y-12">
      {/* 1. The Evaluation Pillars */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Info className="text-swiss-interactive-primary" size={16} />
          <h3 className="swiss-label mb-0 uppercase tracking-[0.2em]">1. Evaluation Pillars</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.slice(0, 3).map((pillar) => (
            <div key={pillar.id} className="swiss-card hover:border-swiss-text-tertiary transition-all">
              <h4 className="text-sm font-semibold text-swiss-interactive-primary mb-2">{pillar.label}</h4>
              <p className="text-xs text-swiss-text-secondary leading-relaxed font-normal">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Tier Model Breakdown */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="text-swiss-text-success" size={16} />
          <h3 className="swiss-label mb-0 uppercase tracking-[0.2em]">2. Tier Model Breakdown</h3>
        </div>
        <div className="overflow-hidden rounded-md border border-swiss-border-default bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-swiss-bg-secondary">
              <tr>
                <th className="p-4 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest border-b border-swiss-border-default">Tier</th>
                <th className="p-4 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest border-b border-swiss-border-default">Maturity Level</th>
                <th className="p-4 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest border-b border-swiss-border-default text-center">Multiplier</th>
                <th className="p-4 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest border-b border-swiss-border-default">Organizational Friction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-swiss-border-subtle">
              {MQM_TIERS.map((tier) => (
                <tr key={tier.tier} className="hover:bg-swiss-bg-secondary transition-colors group">
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-sm text-white font-bold text-xs ${tier.color.replace('bg-', 'bg-')}`}>
                      {tier.tier}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-semibold ${tier.textColor.replace('text-', 'text-')}`}>{tier.name}</td>
                  <td className="p-4 text-center">
                    <span className="text-sm font-semibold text-swiss-interactive-primary tabular-nums">
                      {tier.multiplier.toFixed(1)}x
                    </span>
                  </td>
                  <td className="p-4 text-xs text-swiss-text-secondary italic font-normal">
                    {tier.friction || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Strategic Multiplier Approach Summary */}
      <section className="bg-swiss-bg-success/10 p-8 rounded-md border border-swiss-border-success/20 relative overflow-hidden">
        <Zap className="absolute -right-4 -top-4 text-swiss-border-success/10" size={120} />
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-swiss-text-success mb-4 flex items-center gap-2 uppercase tracking-widest">
            The Strategic Multiplier Approach
          </h3>
          <p className="text-swiss-text-secondary text-sm leading-relaxed max-w-2xl font-normal">
            This methodology accounts for the <span className="text-swiss-text-primary font-semibold">"Hidden Friction"</span> in design engagements. 
            By acknowledging that <span className="text-swiss-text-success font-bold">Low Maturity clients require more education, alignment, and syncing</span>, 
            we preserve our team's bandwidth and ensure delivered excellence.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ImplementationPlan;
