/* eslint-disable no-unused-vars */
import React from 'react';
import { CONTEXT_MULTIPLIERS } from '../constants';
import { BookOpen, Users } from 'lucide-react';

const ToggleOption = ({ option, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-4 rounded-md border text-left transition-all group relative ${
      isSelected
        ? 'bg-swiss-interactive-primary border-swiss-interactive-primary text-white'
        : 'bg-white border-swiss-interactive-primary text-swiss-interactive-primary hover:bg-swiss-interactive-primary-inactive'
    }`}
  >
    <div className="flex justify-between items-start mb-2">
      <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-swiss-interactive-primary'}`}>
        {option.label}
      </span>
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm tabular-nums ${
        option.multiplier > 1
          ? 'bg-swiss-bg-warning border border-swiss-border-warning/20 text-swiss-text-warning'
          : 'bg-swiss-bg-success border border-swiss-border-success/20 text-swiss-text-success'
      }`}>
        {option.tag}
      </span>
    </div>
    <p className={`text-xs font-normal leading-normal ${isSelected ? 'text-white/80' : 'text-swiss-text-tertiary'}`}>
      {option.description}
    </p>
  </button>
);

const ToggleSection = ({ icon: Icon, title, subtitle, options, selectedId, onSelect }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-swiss-text-tertiary" />
      <div className="leading-tight">
        <h3 className="font-semibold text-swiss-text-primary text-sm">{title}</h3>
        <p className="text-[10px] text-swiss-text-tertiary uppercase tracking-widest font-semibold">{subtitle}</p>
      </div>
    </div>
    <div className="flex gap-3">
      {Object.values(options).map(option => (
        <ToggleOption
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  </div>
);

const ContextToggles = ({ infoMaturity, onInfoMaturityChange, governance, onGovernanceChange }) => {
  return (
    <div className="space-y-4">
      <div className="swiss-card">
        <ToggleSection
          icon={BookOpen}
          title="Information Readiness"
          subtitle="Documentation Maturity"
          options={CONTEXT_MULTIPLIERS.infoMaturity}
          selectedId={infoMaturity}
          onSelect={onInfoMaturityChange}
        />
      </div>

      <div className="swiss-card">
        <ToggleSection
          icon={Users}
          title="Decision Governance"
          subtitle="Stakeholder Model"
          options={CONTEXT_MULTIPLIERS.governance}
          selectedId={governance}
          onSelect={onGovernanceChange}
        />
      </div>

      {/* Live Multiplier Preview */}
      <div className="bg-swiss-bg-secondary rounded-md p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-swiss-text-tertiary uppercase tracking-widest text-left">Combined Multiplier</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-swiss-text-tertiary font-semibold tabular-nums">
            {CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.tag} × {CONTEXT_MULTIPLIERS.governance[governance]?.tag}
          </span>
          <span className="text-base font-semibold text-swiss-interactive-primary tabular-nums">
            = {(
              (CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.multiplier || 1) *
              (CONTEXT_MULTIPLIERS.governance[governance]?.multiplier || 1)
            ).toFixed(2)}×
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContextToggles;

