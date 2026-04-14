import React from 'react';
import { Calendar, Users, Briefcase, FileText, Layout, CheckCircle2, DollarSign, MessageSquare, Info, ChevronRight } from 'lucide-react';

const RadioCard = ({ label, selected, onClick, description }) => (
  <button
    onClick={onClick}
    className={`flex flex-col text-left p-4 rounded-lg border transition-all duration-200 h-full ${
      selected 
        ? 'bg-[#E6F1FB] border-[#185FA5] border-2 ring-1 ring-[#185FA5]' 
        : 'bg-white border-[#D3D1C7] hover:bg-[#F7F6F3] hover:border-[#888780]'
    }`}
  >
    <div className={`text-sm tracking-tight ${selected ? 'font-semibold text-[#185FA5]' : 'font-medium text-[#0A0A0A]'}`}>
      {label}
    </div>
    {description && (
      <div className="text-[11px] leading-snug text-[#888780] mt-1 line-clamp-2">
        {description}
      </div>
    )}
  </button>
);

const CheckboxRow = ({ label, checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`flex items-center gap-4 p-3 rounded-sm cursor-pointer transition-colors group ${checked ? 'bg-white' : 'hover:bg-[#F7F6F3]'}`}
  >
    <div className={`w-5 h-5 rounded-[2px] border flex items-center justify-center transition-all ${
      checked ? 'bg-[#185FA5] border-[#185FA5]' : 'bg-white border-[#D3D1C7] group-hover:border-[#888780]'
    }`}>
      {checked && <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-1" />}
    </div>
    <span className={`text-sm ${checked ? 'text-[#0A0A0A]' : 'text-[#5F5E5A]'}`}>
      {label}
    </span>
  </div>
);

const SectionHeading = ({ letter, title }) => (
  <div className="flex items-center gap-3 border-l-4 border-[#185FA5] pl-4 py-1 mb-6">
    <span className="text-base font-bold text-[#0A0A0A] uppercase tracking-wider">{letter} — {title}</span>
  </div>
);

const QuestionLabel = ({ label, helper, required }) => (
  <div className="space-y-1 mb-4">
    <div className="text-[13px] font-bold text-[#5F5E5A] flex items-center gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </div>
    {helper && <div className="text-[12px] text-[#888780] leading-normal">{helper}</div>}
  </div>
);

const IntakeForm = ({ state, setState, onSubmit }) => {
  const isFormValid = state.q1 && state.q2 && state.q7;

  const update = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const toggleArray = (key, value) => {
    setState(prev => {
      const current = prev[key] || [];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(v => v !== value) };
      }
      return { ...prev, [key]: [...current, value] };
    });
  };

  return (
    <div className="space-y-16">
      {/* SECTION A: CLIENT SITUATION */}
      <div className="space-y-10">
        <SectionHeading letter="A" title="Client Situation" />
        
        <div className="space-y-8">
          {/* Q1 */}
          <div className="space-y-4">
            <QuestionLabel label="What kind of engagement is this?" required />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "New product or platform being built from scratch",
                "Existing product being redesigned or improved",
                "Legacy system being modernised or replaced",
                "Internal tool for staff",
                "Research or discovery only — no build yet confirmed"
              ].map(opt => (
                <RadioCard key={opt} label={opt} selected={state.q1 === opt} onClick={() => update('q1', opt)} />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-4">
            <QuestionLabel 
              label="What is the client primarily trying to achieve?" 
              helper="Plain English objectives help us align the strategy."
              required 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Modernise a legacy system", desc: "Migrating from old software or technical debt." },
                { label: "Create a new digital product", desc: "A brand new customer experience from zero." },
                { label: "Build or improve an internal tool", desc: "Enabling staff efficiency and workflows." },
                { label: "Enable customers to self-serve", desc: "Reducing support load through automation." },
                { label: "Launch a new product or feature", desc: "Innovation-led growth for existing users." },
                { label: "Meet accessibility or compliance", desc: "GDPR, WCAG 2.2, or regulatory requirements." }
              ].map(opt => (
                <RadioCard 
                  key={opt.label} 
                  label={opt.label} 
                  description={opt.desc}
                  selected={state.q2 === opt.label} 
                  onClick={() => update('q2', opt.label)} 
                />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-4">
            <QuestionLabel label="How would you describe the client's current state?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-[#EDECEA] rounded-sm p-2 bg-[#FBFBFA]">
              {[
                "They have existing documentation, briefs, or specs",
                "They have existing personas or user research",
                "They have a working product or prototype we can review",
                "Processes and workflows are mostly undocumented or verbal",
                "There is no existing product — starting from zero",
                "We have not been able to access any documentation yet"
              ].map(opt => (
                <CheckboxRow key={opt} label={opt} checked={state.q3.includes(opt)} onChange={() => toggleArray('q3', opt)} />
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-4">
            <QuestionLabel label="How does the client make decisions?" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: "Direct Owner", desc: "One person (PM/PO) owns decisions." },
                { label: "Small Group", desc: "2–3 stakeholders need to agree." },
                { label: "Large Committee", desc: "multiple departments involved." }
              ].map(opt => (
                <RadioCard 
                  key={opt.label} 
                  label={opt.label} 
                  description={opt.desc}
                  selected={state.q4 === opt.label} 
                  onClick={() => update('q4', opt.label)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: PROJECT CONTEXT */}
      <div className="space-y-10">
        <SectionHeading letter="B" title="Project Context" />
        
        <div className="space-y-8">
          {/* Q5 */}
          <div className="space-y-4">
            <QuestionLabel label="How large is the product or system we are scoping for?" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { l: "Small", d: "< 10 screens" },
                { l: "Medium", d: "10-20 screens" },
                { l: "Large", d: "40+ screens" },
                { l: "Extra Large", d: "Multi-platform" },
                { l: "Not sure yet", d: "Needs discovery" }
              ].map(opt => (
                <RadioCard key={opt.l} label={opt.l} description={opt.d} selected={state.q5 === opt.l} onClick={() => update('q5', opt.l)} />
              ))}
            </div>
          </div>

          {/* Q6 */}
          <div className="space-y-4">
            <QuestionLabel label="What does the client expect to receive at the end?" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-1">
              {[
                "Research findings and insights",
                "User journey maps or service blueprints",
                "Wireframes or interaction designs",
                "High-fidelity visual designs",
                "A working prototype",
                "A design system or component library",
                "A statement of work or project plan",
                "Not discussed yet"
              ].map(opt => (
                <CheckboxRow key={opt} label={opt} checked={state.q6.includes(opt)} onChange={() => toggleArray('q6', opt)} />
              ))}
            </div>
          </div>

          {/* Q7 */}
          <div className="max-w-xs space-y-4">
            <QuestionLabel 
              label="When does the client want to start?" 
              helper="Used to trigger Chapter Lead review."
              required 
            />
            <input 
              type="date" 
              value={state.q7} 
              onChange={(e) => update('q7', e.target.value)}
              className="w-full h-11 px-4 border border-[#D3D1C7] rounded-sm focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5] outline-none text-sm font-medium"
            />
          </div>

          {/* Q8 */}
          <div className="space-y-4">
            <QuestionLabel label="Did the client mention any constraints?" />
            <div className="flex flex-wrap gap-2">
              {[
                "Fixed budget", "Fixed deadline", "Team is small", "Compliance requirements", "Specific technology", "No constraints"
              ].map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleArray('q8', opt)}
                  className={`px-4 py-2 rounded-full border text-[12px] font-bold uppercase tracking-tight transition-all ${
                    state.q8.includes(opt) 
                      ? 'bg-[#185FA5] border-[#185FA5] text-white' 
                      : 'bg-white border-[#D3D1C7] text-[#5F5E5A] hover:border-[#888780]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: ENGAGEMENT SIGNALS */}
      <div className="space-y-10">
        <SectionHeading letter="C" title="Engagement Signals" />
        
        <div className="space-y-8">
          {/* Q9 */}
          <div className="space-y-4">
            <QuestionLabel label="Was a budget discussed?" />
            <div className="flex gap-3 items-start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                {[
                  "Yes", "Not yet discussed", "Client declined"
                ].map(opt => (
                  <RadioCard key={opt} label={opt} selected={state.q9.type === opt} onClick={() => update('q9', { ...state.q9, type: opt })} />
                ))}
              </div>
              {state.q9.type === 'Yes' && (
                <div className="flex-1 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888780]" />
                    <input 
                      type="number" 
                      placeholder="Enter approximate budget (AUD ex GST)"
                      value={state.q9.value}
                      onChange={(e) => update('q9', { ...state.q9, value: e.target.value })}
                      className="w-full h-14 pl-10 pr-4 border-2 border-[#185FA5] rounded-lg text-sm font-bold placeholder:text-[#D3D1C7] outline-none shadow-sm focus:shadow-blue-900/10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Q10 */}
          <div className="space-y-4">
            <QuestionLabel label="How would you describe the client's UX maturity?" helper="Helps us apply the right friction buffer." />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { l: "High", d: "Design team, clear system." },
                { l: "Medium", d: "Gaps likely, some docs." },
                { l: "Low", d: "Discovery needed, verbal." },
                { l: "Unknown", d: "Low signal so far." }
              ].map(opt => (
                <RadioCard key={opt.l} label={opt.l} description={opt.d} selected={state.q10 === opt.l} onClick={() => update('q10', opt.l)} />
              ))}
            </div>
          </div>

          {/* Q12 */}
          <div className="space-y-4">
            <QuestionLabel label="Anything else captured from the meeting?" helper="Free text — assumptions, concerns, client quotes." />
            <textarea 
              value={state.q12}
              onChange={(e) => update('q12', e.target.value)}
              placeholder="Assumption summary..."
              className="w-full h-32 p-4 border border-[#D3D1C7] rounded-sm focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5] outline-none text-sm font-medium resize-none"
            />
          </div>
        </div>
      </div>

      {/* SUBMIT SECTION */}
      <div className="pt-8 border-t border-[#EDECEA] flex flex-col items-center gap-4">
        {!isFormValid && (
          <div className="flex items-center gap-2 text-[#888780] italic text-sm">
            <Info size={14} /> Adding more context improves the accuracy of your recommended scope.
          </div>
        )}
        <button 
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`px-10 h-14 rounded-sm font-bold text-lg transition-all flex items-center gap-3 transition-opacity ${
            isFormValid 
              ? 'bg-[#0A0A0A] hover:bg-[#2A2A2A] text-white shadow-xl' 
              : 'bg-[#D3D1C7] text-white cursor-not-allowed'
          }`}
        >
          Review my intake summary <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default IntakeForm;
