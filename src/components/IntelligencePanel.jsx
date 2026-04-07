import { Target, Clock, BarChart2, Zap, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IntelligencePanel = ({ calculation }) => {
  const { finalDays, availableBusinessDays, strategyM, maturityM, governanceM, infoM } = calculation;
  const daysRemaining = availableBusinessDays > 0 ? availableBusinessDays - finalDays : null;
  const timeCritical = daysRemaining !== null && daysRemaining < 0;
  const infoBuffer = infoM > 1 ? 0.25 : 0;
  const compound = strategyM * maturityM * governanceM * (1 + infoBuffer) * 1.2;

  const riskData = [
    { name: 'Baseline', h: 100, fill: '#94a3b8' },
    { name: 'Low Mat.', h: 165, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-4">

      {/* SCOPE GUARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target size={13} color="#6366f1" />
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Scope Guard</span>
        </div>
        <div className={`rounded-xl p-3 mb-3 ${timeCritical ? 'bg-red-50 border border-red-200' : 'bg-slate-50 border border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${timeCritical ? 'text-red-500' : 'text-slate-500'}`}>Days Remaining</span>
            <Clock size={10} color={timeCritical ? '#ef4444' : '#94a3b8'} />
          </div>
          <div className={`text-2xl font-black mt-1 ${timeCritical ? 'text-red-500' : 'text-slate-800'}`}>
            {daysRemaining !== null ? `${daysRemaining.toFixed(1)} d` : '—'}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <span className="text-xs font-bold text-slate-500">Total Est. Days</span>
          <div className="text-2xl font-black text-slate-800 mt-1">{finalDays > 0 ? `${finalDays.toFixed(1)} d` : '0.0 d'}</div>
        </div>
        {timeCritical && (
          <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertTriangle size={11} color="#ef4444" />
            <span className="text-xs font-extrabold text-red-500">TIMELINE CRITICAL</span>
          </div>
        )}
      </div>

      {/* FRICTION STACK */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={13} color="#f59e0b" />
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Friction Stack</span>
        </div>
        {[
          { label: 'Goal mult.', val: `${strategyM.toFixed(2)}×`, hi: strategyM > 1 },
          { label: 'Maturity', val: `${maturityM.toFixed(2)}×`, hi: maturityM > 1 },
          { label: 'Governance', val: `${governanceM.toFixed(2)}×`, hi: governanceM > 1 },
          { label: 'Info buffer', val: infoBuffer > 0 ? '+25%' : '—', hi: infoBuffer > 0 },
          { label: 'Vibes buffer', val: '+20%', hi: true },
        ].map((row, i, arr) => (
          <div key={row.label} className={`flex justify-between items-center py-1.5 ${i < arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className={`text-xs font-bold ${row.hi ? 'text-indigo-600' : 'text-slate-400'}`}>{row.val}</span>
          </div>
        ))}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
          <span className="text-xs font-extrabold text-slate-800">Compound</span>
          <span className="text-sm font-black text-indigo-600">{compound.toFixed(2)}×</span>
        </div>
      </div>

      {/* HISTORICAL RISK */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={13} color="#ef4444" />
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Historical Risk</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">Low-maturity client effort vs baseline</p>
        <ResponsiveContainer width="100%" height={90}>
          <BarChart data={riskData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
            <Tooltip formatter={v => [`${v}h`, 'Hours']} />
            <Bar dataKey="h" radius={[4, 4, 0, 0]}>
              {riskData.map((d, i) => <Cell key={i} fill={d.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-red-500 font-bold text-center mt-2">+65% overrun at maturity ≤ 2</p>
      </div>

    </div>
  );
};

export default IntelligencePanel;
