import { useState } from 'react';
import { ShieldAlert, Plus, X, Check } from 'lucide-react';
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
    <div className="swiss-card">
      <div className="flex items-center gap-3 mb-4">
        <ShieldAlert size={12} className="text-swiss-text-success" />
        <h2 className="swiss-label mb-0">Project Assumptions</h2>
      </div>
      <p className="text-xs text-swiss-text-secondary mb-6 font-normal italic leading-relaxed">
        Declared risks — each checked assumption is one PhoenixDX is proceeding on. False assumptions trigger change requests.
      </p>
      
      <div className="space-y-2 mb-6">
        {assumptions.map(a => (
          <div 
            key={a.id} 
            onClick={() => toggle(a.id)}
            className={`flex items-start gap-4 p-4 rounded-md border transition-all duration-150 ease-in-out cursor-pointer active:scale-[0.99] group ${
              a.checked 
                ? 'bg-swiss-bg-info border-swiss-interactive-primary' 
                : 'bg-[#F7F6F3] border-swiss-border-default'
            }`}
          >
            <div 
              className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                a.checked 
                  ? 'bg-swiss-interactive-primary border-swiss-interactive-primary text-white' 
                  : 'bg-white border-swiss-border-default group-hover:border-swiss-interactive-primary'
              }`}
            >
              {a.checked && <Check size={12} strokeWidth={3} />}
            </div>
            <span className={`text-[13px] flex-1 leading-normal font-medium transition-all ${a.checked ? 'text-swiss-text-primary' : 'text-swiss-text-tertiary line-through'}`}>
              {a.text}
            </span>
            {a.editable && (
              <button 
                onClick={(e) => { e.stopPropagation(); remove(a.id); }} 
                className="flex-shrink-0 p-1 rounded-sm hover:bg-swiss-bg-danger/10 text-swiss-text-tertiary hover:text-swiss-text-danger transition-all opacity-0 group-hover:opacity-100"
              >
                <X size={12} />
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
          placeholder="Declare custom risk/assumption..."
          className="swiss-input flex-1 font-normal"
        />
        <button 
          onClick={add} 
          className="flex items-center gap-2 px-6 h-10 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover active:bg-[#042C53] active:scale-95 text-white rounded-md text-sm font-semibold transition-all duration-150 ease-in-out flex-shrink-0"
        >
          <Plus size={14} /> Add Assumption
        </button>
      </div>
    </div>
  );
};

export default AssumptionsPanel;
