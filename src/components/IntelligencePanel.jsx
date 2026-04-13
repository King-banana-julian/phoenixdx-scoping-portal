import { Target, Clock, BarChart2, Zap, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IntelligencePanel = ({ calculation }) => {
  const { finalDays, availableBusinessDays, strategyM, maturityM, governanceM, infoM } = calculation;
  const daysRemaining = availableBusinessDays > 0 ? availableBusinessDays - finalDays : null;
  const timeCritical = daysRemaining !== null && daysRemaining < 0;
  const infoBuffer = infoM > 1 ? 0.25 : 0;
  const compound = strategyM * maturityM * governanceM * (1 + infoBuffer) * 1.2;

  const riskData = [
    { name: 'Base', h: 100, fill: '#888780' },
    { name: 'Risk', h: 165, fill: '#A32D2D' },
  ];

  return (
    <div className="space-y-4">

      {/* SCOPE GUARD */}
      <div className="swiss-card">
        <div className="flex items-center gap-2 mb-4">
          <Target size={12} className="text-swiss-interactive-primary" />
          <h2 className="swiss-label mb-0">Scope Guard</h2>
        </div>
        
        <div className={`rounded-md p-3 mb-3 ${timeCritical ? 'bg-swiss-bg-danger/10 border border-swiss-border-danger/30' : 'bg-swiss-bg-secondary border border-swiss-border-subtle'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${timeCritical ? 'text-swiss-text-danger' : 'text-swiss-text-tertiary'}`}>Days Remaining</span>
            <Clock size={12} className={timeCritical ? 'text-swiss-text-danger' : 'text-swiss-text-tertiary'} />
          </div>
          <div className={`text-xl font-semibold mt-1 tabular-nums ${timeCritical ? 'text-swiss-text-danger' : 'text-swiss-text-primary'}`}>
            {daysRemaining !== null ? `${daysRemaining.toFixed(1)} d` : '—'}
          </div>
        </div>

        <div className="bg-swiss-bg-secondary border border-swiss-border-subtle rounded-md p-3">
          <span className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider">Expected total Days</span>
          <div className="text-xl font-semibold text-swiss-text-primary mt-1 tabular-nums">
            {finalDays > 0 ? `${finalDays.toFixed(1)} d` : '—'}
          </div>
        </div>

        {timeCritical && (
          <div className="mt-4 flex items-center gap-2 bg-swiss-bg-danger/10 border border-swiss-border-danger/20 rounded-sm px-3 py-1.5">
            <AlertTriangle size={11} className="text-swiss-text-danger" />
            <span className="text-[10px] font-bold text-swiss-text-danger uppercase tracking-wider">Timeline Critical</span>
          </div>
        )}
      </div>

      {/* FRICTION STACK */}
      <div className="swiss-card">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={12} className="text-swiss-text-warning" />
          <h2 className="swiss-label mb-0">Friction Stack</h2>
        </div>
        
        <div className="space-y-2">
          {[
            { label: 'Strategic Goal', val: `${strategyM.toFixed(2)}×`, hi: strategyM > 1 },
            { label: 'Maturity stage', val: `${maturityM.toFixed(2)}×`, hi: maturityM > 1 },
            { label: 'Governance model', val: `${governanceM.toFixed(2)}×`, hi: governanceM > 1 },
            { label: 'Info readiness', val: infoBuffer > 0 ? '+25%' : '—', hi: infoBuffer > 0 },
            { label: 'Project buffer', val: '+20%', hi: true },
          ].map((row, i) => (
            <div key={row.label} className="flex justify-between items-center py-1">
              <span className="text-xs text-swiss-text-secondary font-medium">{row.label}</span>
              <span className={`text-xs font-semibold tabular-nums ${row.hi ? 'text-swiss-interactive-primary' : 'text-swiss-text-tertiary'}`}>
                {row.val}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-swiss-border-default">
          <span className="text-[10px] font-bold text-swiss-text-primary uppercase tracking-widest">Compound Factor</span>
          <span className="text-sm font-bold text-swiss-interactive-primary tabular-nums">
            {compound.toFixed(2)}×
          </span>
        </div>
      </div>

      {/* HISTORICAL RISK */}
      <div className="swiss-card">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={12} className="text-swiss-text-danger" />
          <h2 className="swiss-label mb-0">Historical Risk</h2>
        </div>
        <p className="text-[10px] text-swiss-text-tertiary mb-3 font-semibold uppercase tracking-wider">Effort variance at low maturity</p>
        
        <div className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData} barCategoryGap="20%">
              <CartesianGrid vertical={false} stroke="#EDECEA" strokeDasharray="0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#888780', fontWeight: 600 }} 
              />
              <YAxis 
                hide 
              />
              <Tooltip 
                cursor={{ fill: '#F7F6F3' }}
                contentStyle={{ borderRadius: '4px', border: '1px solid #D3D1C7', fontSize: '10px', fontWeight: 600 }}
              />
              <Bar dataKey="h" radius={[2, 2, 0, 0]}>
                {riskData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-swiss-text-danger font-bold text-center mt-4 uppercase tracking-[0.1em]">
          Avg. +65% overrun at Tier ≤ 2
        </p>
      </div>

    </div>
  );
};

export default IntelligencePanel;

