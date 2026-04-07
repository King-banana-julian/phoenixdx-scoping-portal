import { useState } from 'react';
import { CheckCircle2, Plus, X } from 'lucide-react';
import { STANDARD_ASSUMPTIONS } from '../constants/index.js';

const AssumptionsPanel = () => {
  const [assumptions, setAssumptions] = useState(STANDARD_ASSUMPTIONS.map(a => ({ ...a })));
  const [newText, setNewText] = useState('');

  const toggle = (id) => setAssumptions(prev => prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  const remove = (id) => setAssumptions(prev => prev.filter(a => a.id !== id));
  const add = () => {
    if (!newText.trim()) return;
    setAssumptions(prev => [...prev, { id: `custom_${Date.now()}`, text: newText.trim(), checked: true, editable: true }]);
    setNewText('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle2 size={15} color="#10b981" />
        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Project Assumptions</span>
      </div>
      <p className="text-sm text-slate-500 mb-4">Standard PhoenixDX assumptions are pre-loaded. These are <strong>risk declarations</strong> — each checked assumption is one PhoenixDX is proceeding on. If any prove false during delivery, a change request is triggered.</p>
      <div className="space-y-2 mb-4">
        {assumptions.map(a => (
          <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${a.checked ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
            <button onClick={() => toggle(a.id)} className="flex-shrink-0 mt-0.5 bg-transparent border-none cursor-pointer p-0">
              <CheckCircle2 size={15} color={a.checked ? '#16a34a' : '#cbd5e1'} />
            </button>
            <span className={`text-xs flex-1 leading-relaxed ${a.checked ? 'text-green-800' : 'text-slate-400 line-through'}`}>{a.text}</span>
            {a.editable && (
              <button onClick={() => remove(a.id)} className="flex-shrink-0 bg-transparent border-none cursor-pointer p-0">
                <X size={12} color="#ef4444" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a custom assumption..."
          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder-slate-400"
        />
        <button onClick={add} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-colors">
          <Plus size={13} /> Add
        </button>
      </div>
    </div>
  );
};

export default AssumptionsPanel;
