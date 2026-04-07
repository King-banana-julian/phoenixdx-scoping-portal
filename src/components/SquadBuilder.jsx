import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { SQUAD_ROLE_TEMPLATES, ENGAGEMENT_MODES } from '../constants/index.js';

export default function SquadBuilder({ engMode, squadRoles, setSquadRoles }) {
  const [roles, setRoles] = useState(
    engMode && SQUAD_ROLE_TEMPLATES[engMode] ? SQUAD_ROLE_TEMPLATES[engMode].map(r => ({ ...r })) : []
  );

  useEffect(() => {
    if (engMode && SQUAD_ROLE_TEMPLATES[engMode]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoles(SQUAD_ROLE_TEMPLATES[engMode].map(r => ({ ...r })));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSquadRoles({});
    }
  }, [engMode, setSquadRoles]);

  const [newRoleLabel, setNewRoleLabel] = useState('');

  if (!engMode) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
        <div className="text-slate-400 text-sm py-8 text-center">
          Select an engagement type in the Engagement Setup section to configure your squad.
        </div>
      </div>
    );
  }

  const activeMode = ENGAGEMENT_MODES.find(m => m.id === engMode);

  const addRole = () => {
    if (!newRoleLabel.trim()) return;
    const newId = `custom_${Date.now()}`;
    setRoles(prev => [...prev, { id: newId, label: newRoleLabel.trim(), days: 0, rate: '' }]);
    setNewRoleLabel('');
  };

  const handleRoleChange = (roleId, field, value) => {
    setSquadRoles(prev => ({
      ...prev,
      [roleId]: {
        ...(prev?.[roleId] || {}),
        [field]: value
      }
    }));
  };

  const totals = roles.reduce((acc, role) => {
    const days = parseFloat(squadRoles?.[role.id]?.days) || 0;
    const rate = parseFloat(squadRoles?.[role.id]?.rate) || 0;
    acc.days += days;
    acc.cost += (days * rate);
    return acc;
  }, { days: 0, cost: 0 });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
          Squad Builder
        </h2>
        {activeMode && (
          <span 
            className="text-[10px] font-bold px-2 py-0.5 rounded text-white" 
            style={{ backgroundColor: activeMode.color }}
          >
            {activeMode.label}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Enter effort in days and day rate (AUD ex GST) per role. Rates are confidential and not stored or shared.
      </p>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200">Role</th>
              <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200">Days Effort</th>
              <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200">Day Rate (AUD)</th>
              <th className="py-3 px-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Total (AUD ex GST)</th>
              <th className="py-3 px-4 text-xs font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-200">Remove</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, idx) => {
              const days = squadRoles?.[role.id]?.days || "";
              const rate = squadRoles?.[role.id]?.rate || "";
              const numDays = parseFloat(days) || 0;
              const numRate = parseFloat(rate) || 0;
              const hasTotal = numDays > 0 && numRate > 0;

              return (
                <tr key={role.id} className={`border-b border-slate-100 ${idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-800">
                    {role.label}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      value={days}
                      onChange={(e) => handleRoleChange(role.id, 'days', e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 w-24"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter rate"
                      value={rate}
                      onChange={(e) => handleRoleChange(role.id, 'rate', e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 w-32"
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {hasTotal ? (
                      <span className="text-sm font-bold text-slate-800">
                        ${(numDays * numRate).toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                      </span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <button onClick={() => setRoles(prev => prev.filter(r => r.id !== role.id))}
                      className="text-slate-300 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer">
                      <X size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-4 px-4 text-sm font-extrabold text-slate-800 text-right">Total</td>
              <td className="py-4 px-4 text-sm font-extrabold text-indigo-600">
                {totals.days > 0 ? totals.days : "—"}
              </td>
              <td className="py-4 px-4"></td>
              <td className="py-4 px-4 text-sm font-extrabold text-emerald-600 text-right">
                {totals.cost > 0 ? `$${totals.cost.toLocaleString("en-AU", { maximumFractionDigits: 0 })}` : "—"}
              </td>
              <td className="py-4 px-4"></td>
            </tr>
          </tfoot>
        </table>

        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
          <input
            value={newRoleLabel}
            onChange={e => setNewRoleLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRole()}
            placeholder="Add a custom role (e.g. Business Analyst, QA Lead)..."
            className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder-slate-400"
          />
          <button onClick={addRole}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-colors">
            <Plus size={13} /> Add Role
          </button>
        </div>
      </div>
    </div>
  );
}
