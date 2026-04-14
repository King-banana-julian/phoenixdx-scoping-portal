import React from 'react';

const SummarySection = ({ title, items }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between border-b border-[#EDECEA] pb-2">
      <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">{title}</h3>
      <button 
        onClick={() => document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' })}
        className="text-[10px] font-bold text-[#185FA5] uppercase tracking-widest hover:underline"
      >
        Edit
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="text-[11px] font-bold text-[#888780] uppercase tracking-tight">{item.label}</div>
          <div className={`text-sm font-medium ${item.value ? 'text-[#0A0A0A]' : 'text-[#888780] italic'}`}>
            {Array.isArray(item.value) 
              ? (item.value.length > 0 ? item.value.join(', ') : 'Not provided')
              : (item.value || 'Not provided')}
          </div>
          {!item.value && (
            <div className="text-[10px] text-[#888780] flex items-center gap-1">
              <span>▲</span> Not provided — this may reduce recommendation accuracy
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const IntakeSummary = ({ state }) => {
  const sections = [
    {
      title: "A — Client Situation",
      items: [
        { label: "Engagement Type", value: state.q1 },
        { label: "Strategic Objective", value: state.q2 },
        { label: "Current Situation", value: state.q3 },
        { label: "Decision Style", value: state.q4 }
      ]
    },
    {
      title: "B — Project Context",
      items: [
        { label: "Product Scale", value: state.q5 },
        { label: "Deliverables", value: state.q6 },
        { label: "Start Date", value: state.q7 },
        { label: "Constraints", value: state.q8 }
      ]
    },
    {
      title: "C — Engagement Signals",
      items: [
        { label: "Budget Discussed", value: state.q9.type === 'Yes' ? `Yes (${state.q9.value})` : state.q9.type },
        { label: "UX Maturity", value: state.q10 },
        { label: "Additional Context", value: state.q12 }
      ]
    }
  ];

  return (
    <div className="bg-[#FBFBFA] border border-[#D3D1C7] rounded-sm p-8 space-y-12 shadow-sm">
      {sections.map((section, idx) => (
        <SummarySection key={idx} title={section.title} items={section.items} />
      ))}
    </div>
  );
};

export default IntakeSummary;
