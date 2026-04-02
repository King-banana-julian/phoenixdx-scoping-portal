import React from 'react';
import { MQM_TIERS, PILLARS } from '../constants';
import { Info, ShieldAlert, Zap } from 'lucide-react';

const ImplementationPlan = () => {
  return (
    <div className="space-y-12">
      {/* 1. The Three Pillars */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Info className="text-blue-400" size={24} />
          <h3 className="text-2xl font-bold text-slate-100">1. The Evaluation Pillars</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.slice(0, 3).map((pillar) => (
            <div key={pillar.id} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">{pillar.label}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Tier Model Breakdown */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="text-emerald-400" size={24} />
          <h3 className="text-2xl font-bold text-slate-100">2. The Tier Model Breakdown</h3>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-700">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-300">Tier</th>
                <th className="p-4 text-sm font-semibold text-slate-300">Maturity Level</th>
                <th className="p-4 text-sm font-semibold text-slate-300 text-center">Multiplier (M)</th>
                <th className="p-4 text-sm font-semibold text-slate-300">Organizational Friction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {MQM_TIERS.map((tier) => (
                <tr key={tier.tier} className="bg-slate-900/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${tier.color}`}>
                      {tier.tier}
                    </span>
                  </td>
                  <td className={`p-4 font-medium ${tier.textColor}`}>{tier.name}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-slate-800 rounded-full font-mono text-sm border border-slate-700">
                      {tier.multiplier.toFixed(1)}x
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-400 italic">
                    {tier.friction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Strategic Multiplier Approach Summary */}
      <section className="bg-emerald-500/10 p-8 rounded-2xl border border-emerald-500/20 relative overflow-hidden">
        <Zap className="absolute -right-4 -top-4 text-emerald-500/20" size={120} />
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            The Strategic Multiplier Approach
          </h3>
          <p className="text-slate-300 leading-relaxed max-w-2xl">
            This methodology accounts for the "Hidden Friction" in design engagements. 
            By acknowledging that <span className="text-emerald-400 font-bold">Low Maturity clients require more education, alignment, and syncing</span>, 
            we preserve our team's bandwidth and ensure delivered excellence.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ImplementationPlan;
