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
      <div className="swiss-card w-full">
        <div className="text-swiss-text-tertiary text-sm py-12 text-center font-normal italic">
          Select an engagement model to configure your squad.
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
    <div className="swiss-card w-full p-0 overflow-hidden">
      <div className="p-8 border-b border-swiss-border-subtle bg-white">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="swiss-label mb-0">Squad Configuration</h2>
          {activeMode && (
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-swiss-bg-info border border-swiss-interactive-primary/20 text-swiss-interactive-primary uppercase tracking-widest"
            >
              {activeMode.label}
            </span >
          )}
        </div>
        <p className="text-sm text-swiss-text-secondary font-normal italic leading-relaxed">
          Determine effort and rates (AUD ex GST). Commercial data is volatile and not persisted.
        </p>
      </div>

      <div className="overflow-x-auto w-full bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-swiss-bg-secondary">
              <th className="py-3 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-default">Role</th>
              <th className="py-3 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-default">Days</th>
              <th className="py-3 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-default">Rate (AUD)</th>
              <th className="py-3 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-default text-right">Total</th>
              <th className="py-3 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-[0.2em] border-b border-swiss-border-default w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-swiss-border-subtle">
            {roles.map((role, idx) => {
              const days = squadRoles?.[role.id]?.days || "";
              const rate = squadRoles?.[role.id]?.rate || "";
              const numDays = parseFloat(days) || 0;
              const numRate = parseFloat(rate) || 0;
              const hasTotal = numDays > 0 && numRate > 0;

              return (
                <tr key={role.id} className="hover:bg-swiss-bg-secondary transition-colors group">
                  <td className="py-4 px-8 text-sm font-semibold text-swiss-text-primary">
                    {role.label}
                  </td>
                  <td className="py-4 px-8">
                    <input
                      type="number"
                      min="0"
                      value={days}
                      onChange={(e) => handleRoleChange(role.id, 'days', e.target.value)}
                      className="swiss-input w-24 px-3 tabular-nums"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-4 px-8">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={rate}
                      onChange={(e) => handleRoleChange(role.id, 'rate', e.target.value)}
                      className="swiss-input w-28 px-3 tabular-nums"
                    />
                  </td>
                  <td className="py-4 px-8 text-right tabular-nums">
                    {hasTotal ? (
                      <span className="text-sm font-semibold text-swiss-text-primary">
                        ${(numDays * numRate).toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                      </span>
                    ) : (
                      <span className="text-swiss-text-tertiary font-normal">—</span>
                    )}
                  </td>
                  <td className="py-4 px-8 text-center">
                    <button onClick={() => setRoles(prev => prev.filter(r => r.id !== role.id))}
                      className="text-swiss-text-tertiary hover:text-swiss-text-danger transition-all duration-150 p-1 rounded-sm hover:bg-swiss-bg-danger/10 opacity-0 group-hover:opacity-100 active:scale-90">
                      <X size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-swiss-bg-secondary/30">
            <tr>
              <td className="py-6 px-8 text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-widest text-right">Aggregate</td>
              <td className="py-6 px-8 text-sm font-bold text-swiss-interactive-primary tabular-nums">
                {totals.days > 0 ? totals.days.toFixed(1) : "—"}
              </td>
              <td className="py-6 px-8"></td>
              <td className="py-6 px-8 text-sm font-bold text-swiss-text-success text-right tabular-nums">
                {totals.cost > 0 ? `$${totals.cost.toLocaleString("en-AU", { maximumFractionDigits: 0 })}` : "—"}
              </td>
              <td className="py-6 px-8"></td>
            </tr>
          </tfoot>
        </table>

        <div className="p-8 bg-swiss-bg-secondary flex gap-3 border-t border-swiss-border-default">
          <input
            value={newRoleLabel}
            onChange={e => setNewRoleLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRole()}
            placeholder="Add custom role label..."
            className="swiss-input flex-1 font-normal"
          />
          <button onClick={addRole}
            className="flex items-center gap-2 px-6 h-10 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover active:bg-[#042C53] active:scale-95 text-white rounded-md text-sm font-semibold transition-all duration-150 ease-in-out">
            <Plus size={14} /> Add Role
          </button>
        </div>
      </div>
    </div>
  );
}

