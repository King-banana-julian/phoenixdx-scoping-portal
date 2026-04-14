import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Zap, Check } from 'lucide-react';

const PhaseBadge = ({ phase }) => {
  const getPhaseColor = (p) => {
    if (p.includes('Discover')) return '#185FA5';
    if (p.includes('Define')) return '#378ADD';
    if (p.includes('Develop')) return '#0F6E56';
    if (p.includes('Deliver')) return '#085041';
    return '#888780';
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-3 rounded-full" style={{ backgroundColor: getPhaseColor(phase) }} />
      <span className="text-[10px] font-bold text-[#888780] uppercase tracking-widest">{phase}</span>
    </div>
  );
};

const ActivityCard = ({ activity, size, effort, reason, isOptional, onAdd }) => (
  <div className={`p-4 bg-white border rounded-lg transition-all ${isOptional ? 'border-[#D3D1C7] border-dashed opacity-80' : 'border-[#D3D1C7] shadow-sm'}`}>
    <div className="flex justify-between items-start mb-3">
      <div className="space-y-1">
        <PhaseBadge phase={activity.phasesBySize?.[size]?.[0]?.name || 'Discovery'} />
        <h4 className="text-sm font-bold text-[#0A0A0A]">{activity.label}</h4>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-[#185FA5] leading-none">{effort}d</div>
        <div className="px-2 py-0.5 mt-1 bg-[#EDECEA] text-[#5F5E5A] text-[9px] font-bold uppercase rounded-sm inline-block">
          {size}
        </div>
      </div>
    </div>
    <div className="text-[12px] text-[#5F5E5A] leading-relaxed italic mb-3">
      "{reason}"
    </div>
    {isOptional && (
      <button 
        onClick={() => onAdd(activity.id)}
        className="w-full h-8 flex items-center justify-center gap-2 border border-[#185FA5] text-[#185FA5] rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-[#E6F1FB] transition-all"
      >
        <Plus size={14} /> Add to scope
      </button>
    )}
  </div>
);

const RecommendationSet = ({ recs, activities }) => {
  const [showOptional, setShowOptional] = useState(false);

  const mandatoryActivities = recs.mandatory.map(id => activities.find(a => a.id === id)).filter(Boolean);
  const optionalActivities = recs.recommended.map(id => activities.find(a => a.id === id)).filter(Boolean);

  const totalEffort = mandatoryActivities.reduce((sum, a) => {
    const e = a.effortBySize?.[recs.defaultSize]?.effort || 0;
    return sum + parseFloat(e);
  }, 0);

  return (
    <div className="space-y-10">
      {/* MANDATORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mandatoryActivities.map(activity => (
          <ActivityCard 
            key={activity.id}
            activity={activity}
            size={recs.defaultSize}
            effort={activity.effortBySize?.[recs.defaultSize]?.effort}
            reason={recs.reasons[activity.id]}
          />
        ))}
      </div>

      {/* OPTIONAL */}
      <div className="space-y-4">
        <button 
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-2 text-sm font-bold text-[#185FA5] uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          {showOptional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showOptional ? 'Hide' : `Show ${optionalActivities.length}`} optional activities
        </button>
        
        {showOptional && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {optionalActivities.map(activity => (
              <ActivityCard 
                key={activity.id}
                activity={activity}
                size={recs.defaultSize}
                effort={activity.effortBySize?.[recs.defaultSize]?.effort}
                reason={recs.reasons[activity.id]}
                isOptional
                onAdd={() => {}} // This is handled in Step 2 mostly, or we could add toggle logic here
              />
            ))}
          </div>
        )}
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-[#0A0A0A] text-white p-8 rounded-sm flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#185FA5] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
        
        <div className="flex gap-12 relative z-10">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#888780] uppercase tracking-widest">Recommended activities</div>
            <div className="text-3xl font-bold">{mandatoryActivities.length}</div>
          </div>
          <div className="space-y-1 border-l border-[#2A2A2A] pl-12">
            <div className="text-[10px] font-bold text-[#888780] uppercase tracking-widest">Estimated total effort</div>
            <div className="text-3xl font-bold">{totalEffort.toFixed(1)}d</div>
          </div>
          <div className="space-y-1 border-l border-[#2A2A2A] pl-12">
            <div className="text-[10px] font-bold text-[#888780] uppercase tracking-widest">Confidence</div>
            <div className="text-3xl font-bold text-[#0F6E56]">High</div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <div className="text-right hidden lg:block">
            <div className="text-[10px] font-bold text-[#888780] uppercase tracking-widest">Squad Recommendation</div>
            <div className="text-sm font-medium">1x Senior PD, 1x UX Researcher</div>
          </div>
          <Zap className="text-[#185FA5] fill-[#185FA5]" size={24} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationSet;
