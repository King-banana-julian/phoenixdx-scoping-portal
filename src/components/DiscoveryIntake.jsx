import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, Info, Zap, X } from 'lucide-react';
import IntakeForm from './IntakeForm';
import IntakeSummary from './IntakeSummary';
import ConfidenceScore from './ConfidenceScore';
import RecommendationSet from './RecommendationSet';

const DiscoveryIntake = ({ 
  state, 
  setState, 
  showSummary, 
  setShowSummary, 
  showRecommendations, 
  setShowRecommendations,
  lastSaved,
  onContinue,
  activities,
  getRecommendations,
  applyRecommendations
}) => {
  const summaryRef = useRef(null);
  const recommendationsRef = useRef(null);

  const recs = getRecommendations(state);

  const handleSubmitForm = () => {
    setShowSummary(true);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleGenerateScope = () => {
    applyRecommendations(recs);
    setShowRecommendations(true);
    setTimeout(() => {
      recommendationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-swiss-text-primary">Discovery Intake</h1>
          {lastSaved && (
            <div className="text-[10px] font-bold uppercase tracking-widest text-swiss-text-tertiary animate-pulse">
              Draft saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
        <p className="text-lg text-swiss-text-secondary max-w-2xl leading-relaxed">
          Start by capturing the plain-language context from your client meeting. 
          The portal will recommend a starting scope based on these signals.
        </p>
      </div>

      {/* PART 1: THE INTAKE FORM */}
      <section id="intake-form" className="bg-white border border-swiss-border-default rounded-sm p-10 space-y-12">
        <IntakeForm state={state} setState={setState} onSubmit={handleSubmitForm} />
      </section>

      {/* PART 2: THE INTAKE SUMMARY */}
      {showSummary && (
        <div ref={summaryRef} className="pt-12 border-t-2 border-swiss-border-default space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-swiss-text-primary">Here is what we captured from your meeting</h2>
            <p className="text-swiss-text-secondary">Review this before we generate your recommended scope. Edit any section if something looks wrong.</p>
          </div>
          
          <IntakeSummary state={state} />

          <div className="flex flex-col items-center gap-6 py-8">
            <button 
              onClick={handleGenerateScope}
              className="px-12 h-14 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover text-white rounded-sm font-bold text-lg transition-all flex items-center gap-3 group shadow-lg shadow-blue-900/10"
            >
              Generate recommended scope <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setShowSummary(false)}
              className="text-sm font-bold text-swiss-text-tertiary uppercase tracking-widest hover:text-swiss-text-primary transition-colors"
            >
              Go back and edit
            </button>
          </div>
        </div>
      )}

      {/* PART 3 & 4: CONFIDENCE & RECOMMENDATIONS */}
      {showRecommendations && (
        <div ref={recommendationsRef} className="pt-12 border-t-2 border-swiss-border-default space-y-12">
          <ConfidenceScore state={state} />
          
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-swiss-text-primary">Recommended starting scope</h2>
              <p className="text-swiss-text-secondary">Based on what you've shared. You can adjust this in the next step.</p>
            </div>
            
            <RecommendationSet 
              recs={recs} 
              activities={activities}
            />
          </div>

          <div className="flex justify-center pt-8">
            <button 
              onClick={onContinue}
              className="px-12 h-14 bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover text-white rounded-sm font-bold text-lg transition-all flex items-center gap-3 group shadow-lg shadow-blue-900/10"
            >
              Continue to Engagement Setup <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryIntake;
