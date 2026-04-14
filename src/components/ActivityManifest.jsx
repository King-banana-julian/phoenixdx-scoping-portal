import React, { useState, useEffect } from 'react';
import { Zap, Info, ShieldAlert } from 'lucide-react';
import { calculateIntakeSignals } from '../utils/intakeLogic';

const ActivityManifest = ({
  activities,
  selectedActivities,
  toggleActivity,
  updateActivity,
  recs,
  intakeState,
  intakeCompleted,
  setCurrentStep,
  applyRecommendations,
  screenCounts,
  setScreenCounts
}) => {
  const [showOptional, setShowOptional] = useState(false);
  const [hasAppliedRecs, setHasAppliedRecs] = useState(false);

  // Auto-apply recommendations on load if no manual selections have been made
  useEffect(() => {
    if (intakeCompleted && !hasAppliedRecs && Object.keys(selectedActivities).length === 0) {
      applyRecommendations(recs);
      setHasAppliedRecs(true);
    }
  }, [intakeCompleted, hasAppliedRecs, applyRecommendations, recs, selectedActivities]);

  const toggleOptional = () => setShowOptional(!showOptional);

  // Derived Intake Info for the Banner
  const { score: confidenceScore } = calculateIntakeSignals(intakeState || {});
  
  const intakeEngagementType = intakeState?.q1 || 'Unknown context';
  const intakeObjective = intakeState?.q2 || '';
  const intakeProductScale = intakeState?.q5 || 'Medium';
  const intakeGovernance = intakeState?.q4?.includes('committee') ? 'Committee' : 'Direct';
  
  let infoLvl = 'High';
  if (intakeState?.q10 === 'Low' || intakeState?.q10 === 'Unknown') infoLvl = 'Low';
  if (intakeState?.q3?.some(s => s.includes('undocumented') || s.includes('no existing product') || s.includes('not been able to access'))) infoLvl = 'Low';

  const multiplierSummary = `${infoLvl} fidelity info · ${intakeGovernance} governance`;

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'bg-swiss-bg-success text-swiss-text-success border-swiss-border-success';
    if (score >= 50) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const recommendedIds = recs?.mandatory || [];
  const optionalIds = recs?.recommended || [];

  const getPhaseColor = (stage) => {
    switch (stage) {
      case 'Discover': return '#185FA5';
      case 'Define': return '#378ADD';
      case 'Develop': return '#0F6E56';
      case 'Deliver': return '#085041';
      default: return '#185FA5';
    }
  };

  const renderActivityCard = (activity, isOptionalCard = false) => {
    const isSelected = !!selectedActivities[activity.id];
    const config = selectedActivities[activity.id] || { size: recs?.defaultSize || 'Medium', ai: false };
    const effortData = activity.effortBySize[config.size] || {};
    
    // Safety guard logic for screen counts
    const isWireframeOrHifi = activity.id === 'low_mid_fidelity_wireframes' || activity.id === 'high_fidelity_designs';
    const missingScreenCount = isWireframeOrHifi && isSelected && !screenCounts[activity.id];
    
    // Is it a recommended activity (has left bar and accent styling)?
    const isRecommended = recommendedIds.includes(activity.id) || (isSelected && !isOptionalCard);

    const leftBorderColor = isRecommended ? getPhaseColor(activity.stage) : 'transparent';
    const borderColor = isOptionalCard ? 'border-[#D3D1C7]' : (isSelected ? 'border-[#185FA5]' : 'border-swiss-border-default hover:border-swiss-border-accent');
    const effortColor = isSelected ? 'text-[#185FA5]' : 'text-[#888780]';

    return (
      <div 
        key={activity.id}
        className={`relative border bg-white rounded-[8px] p-4 transition-all duration-200 overflow-hidden ${borderColor}`}
      >
        {/* Left accent bar for selected/mandatory activities */}
        {(!isOptionalCard) && (
          <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: leftBorderColor }} />
        )}

        <div className="flex items-start justify-between gap-4 ml-1">
          <div className="flex items-start gap-4 flex-1">
            {!isOptionalCard && (
              <div className="pt-1">
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => toggleActivity(activity.id, recs?.defaultSize || 'Medium')}
                  className="w-4 h-4 rounded-sm border-swiss-border-default text-swiss-interactive-primary focus:ring-swiss-interactive-primary"
                />
              </div>
            )}
            
            <div className="space-y-1 w-full flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-[#0A0A0A]">{activity.name}</span>
                <span className="text-[11px] font-regular px-1.5 py-0.5 bg-swiss-bg-tertiary text-[#888780] rounded-sm">
                  {activity.stage} · Model {activity.model}
                </span>
              </div>
              
              {isOptionalCard && (
                <div className="text-[13px] font-regular text-[#888780] pt-1">
                  Optional for this engagement type — add if needed
                </div>
              )}

              {isSelected && !isOptionalCard && (
                <div className="flex flex-wrap items-end gap-4 pt-3">
                  {/* Size Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider block">Size & Scope</label>
                    <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-md border border-swiss-border-subtle inline-flex">
                      {['Small', 'Medium', 'Large', 'XL'].map(size => (
                        <button
                          key={size}
                          onClick={() => updateActivity(activity.id, { size })}
                          className={`px-3 py-1 text-[11px] font-semibold rounded-[4px] transition-all ${
                            config.size === size
                            ? 'bg-[#185FA5] text-white shadow-sm'
                            : 'bg-transparent text-[#5F5E5A] hover:bg-white border border-transparent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Acceleration Toggle */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-swiss-text-tertiary uppercase tracking-wider block">AI Acceleration</label>
                    <button
                      onClick={() => updateActivity(activity.id, { ai: !config.ai })}
                      className={`flex items-center gap-2 px-3 h-[28px] text-[11px] font-semibold rounded-[4px] border ${
                        config.ai
                        ? 'bg-swiss-bg-success text-swiss-text-success border-swiss-border-success'
                        : 'bg-white text-swiss-text-secondary border-swiss-border-default hover:border-swiss-border-accent'
                      }`}
                    >
                      <Zap size={10} className={config.ai ? 'fill-current' : ''} />
                      {config.ai ? 'AI Active' : 'Enable AI'}
                    </button>
                  </div>
                </div>
              )}

              {/* Optional Add Button */}
              {isOptionalCard && (
                <div className="pt-3">
                  <button 
                    onClick={() => toggleActivity(activity.id, recs?.defaultSize || 'Medium')}
                    className="flex items-center gap-2 px-4 py-1.5 text-[13px] font-semibold rounded-sm border border-[#D3D1C7] text-swiss-text-secondary hover:border-swiss-interactive-primary hover:text-swiss-interactive-primary transition-all"
                  >
                    Add to scope
                  </button>
                </div>
              )}

            </div>
          </div>

          <div className="text-right flex flex-col justify-start items-end min-w-[80px]">
            <div className="text-[11px] font-bold text-swiss-text-tertiary uppercase tracking-wider">Effort</div>
            <div className={`text-[20px] font-bold ${effortColor}`}>
              {isSelected ? (config.ai ? effortData.aiEffort : effortData.effort) : effortData.effort}
            </div>
            {isSelected && !isOptionalCard && recs?.reasons?.[activity.id] && (
              <div className="text-[10px] italic text-[#888780] mt-1 max-w-[120px]">
                {recs.reasons[activity.id]}
              </div>
            )}
          </div>
        </div>

        {/* Inline Requirements & Scope Guards for Selected Items */}
        {isSelected && !isOptionalCard && missingScreenCount && (
          <div className="mt-4 ml-1">
            <div className="bg-red-50 border border-red-200 rounded-[8px] p-3 flex flex-col gap-2 relative">
              <div className="text-red-700 text-[13px] font-semibold flex items-center gap-2">
                <ShieldAlert size={14} /> Screen count not confirmed
              </div>
              <div className="text-red-600 text-[12px]">
                Confirm the number of screens before this activity can be accurately sized.
              </div>
              <div className="flex items-center gap-3 mt-1">
                <label className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Estimated screen count</label>
                <input 
                  type="number"
                  min="1"
                  value={screenCounts[activity.id] || ''}
                  onChange={(e) => setScreenCounts({ ...screenCounts, [activity.id]: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 text-sm border border-red-300 rounded-sm outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Scope Guards Setup
  const hasLegacyIntent = (intakeEngagementType || '').toLowerCase().includes('legacy');
  const hasContextualInquiry = !!selectedActivities['contextual_inquiry'];
  const hasHeuristicEvaluation = !!selectedActivities['heuristic_evaluation'];
  const hasUserFlows = !!selectedActivities['user_flows'];
  const hasWireframes = !!selectedActivities['low_mid_fidelity_wireframes'];
  const isLargeScale = intakeProductScale === 'Large' || intakeProductScale === 'Extra Large';

  const renderScopeGuards = () => {
    return (
      <div className="space-y-3 mb-6">
        {hasLegacyIntent && !hasContextualInquiry && (
          <div className="bg-rose-50 border border-rose-200 rounded-[8px] p-3 flex items-start gap-3">
            <span className="text-rose-600 font-bold mt-0.5">✕</span>
            <div>
              <div className="text-[13px] font-semibold text-rose-800">STRATEGIC RISK</div>
              <div className="text-[13px] text-rose-700 mt-0.5">
                Contextual Inquiry is recommended for Legacy Modernisation. Removing it increases delivery risk.
              </div>
            </div>
          </div>
        )}
        {hasLegacyIntent && !hasHeuristicEvaluation && (
          <div className="bg-rose-50 border border-rose-200 rounded-[8px] p-3 flex items-start gap-3">
            <span className="text-rose-600 font-bold mt-0.5">✕</span>
            <div>
              <div className="text-[13px] font-semibold text-rose-800">STRATEGIC RISK</div>
              <div className="text-[13px] text-rose-700 mt-0.5">
                Heuristic Evaluation is recommended for Legacy Modernisation. Removing it increases delivery risk.
              </div>
            </div>
          </div>
        )}
        {isLargeScale && hasWireframes && !hasUserFlows && (
          <div className="bg-orange-50 border border-orange-200 rounded-[8px] p-3 flex items-start gap-3">
            <span className="text-orange-600 font-bold mt-0.5">▲</span>
            <div>
              <div className="text-[13px] font-semibold text-orange-800">WARNING</div>
              <div className="text-[13px] text-orange-700 mt-0.5">
                User Flows should be completed before Wireframing begins. Add User Flows or reorder your activities.
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const mainActivities = activities.filter(a => {
    if (selectedActivities[a.id]) return true; // Show anything selected
    if (recommendedIds.includes(a.id)) return true; // Show mandatory
    return false; // Hide optional unless selected
  });

  const availableOptionalCount = activities.filter(a => optionalIds.includes(a.id) && !selectedActivities[a.id]).length;

  return (
    <div className="space-y-8">
      {/* 3. Intake Context Banner */}
      {intakeCompleted && (
        <div className="bg-[#E6F1FB] border border-[#185FA5] rounded-[8px] p-4 flex items-start justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="text-[13px] font-semibold text-[#0C447C]">Scope pre-populated from your discovery intake</div>
              <div className="text-[13px] font-regular text-[#5F5E5A]">
                Based on: {intakeEngagementType} · {intakeObjective} · {intakeProductScale} scale · {multiplierSummary}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-regular text-[#5F5E5A]">Scope confidence:</span>
              <span className={`px-2 py-0.5 text-[11px] font-bold rounded-sm border ${getConfidenceColor(confidenceScore)}`}>
                {confidenceScore}/100
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              setCurrentStep(0);
            }}
            className="text-[13px] font-semibold text-[#185FA5] hover:underline"
          >
            Edit intake answers
          </button>
        </div>
      )}

      {/* 5. Scope Guard Alerts */}
      {renderScopeGuards()}

      {/* Manifest Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[24px] font-semibold text-[#0A0A0A] tracking-tight">Activity Manifest</h2>
        <p className="text-[14px] text-[#5F5E5A]">Review and refine your recommended scope activities.</p>
      </div>

      {/* Main Activities (Recommended or Selected) */}
      <div className="grid grid-cols-1 gap-4">
        {mainActivities.map(a => renderActivityCard(a, false))}
      </div>

      {/* 4. Optional Activities Section */}
      {availableOptionalCount > 0 && (
        <div className="pt-4 mt-8">
          <button 
            onClick={toggleOptional}
            className="text-[14px] font-semibold text-swiss-interactive-primary flex items-center gap-2 hover:underline mb-4"
          >
            {showOptional ? '− Hide optional activities' : `+ Show ${availableOptionalCount} optional activities for this engagement type`}
          </button>
          
          {showOptional && (
            <div className="grid grid-cols-1 gap-4">
              {activities
                .filter(a => optionalIds.includes(a.id) && !selectedActivities[a.id])
                .map(a => renderActivityCard(a, true))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityManifest;
