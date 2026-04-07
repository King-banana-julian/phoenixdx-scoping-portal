/* eslint-disable no-unused-vars */
import React from 'react';
import { CONTEXT_MULTIPLIERS } from '../constants';
import { BookOpen, Users } from 'lucide-react';

const ToggleOption = ({ option, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-5 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-500 group relative ${
      isSelected
        ? 'bg-white border-violet-600 shadow-sm'
        : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300'
    }`}
  >
    <div className="flex justify-between items-start mb-2">
      <span className={`font-black text-base ${isSelected ? 'text-violet-900' : 'text-gray-600'}`}>
        {option.label}
      </span>
      <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded-md ${
        option.multiplier > 1
          ? 'bg-orange-50 text-orange-600'
          : 'bg-emerald-50 text-emerald-600'
      }`}>
        {option.tag}
      </span>
    </div>
    <p className={`text-xs leading-relaxed ${isSelected ? 'text-gray-600' : 'text-gray-500'}`}>
      {option.description}
    </p>
  </button>
);

const ToggleSection = ({ icon: Icon, title, subtitle, options, selectedId, onSelect }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <Icon size={18} className="text-violet-600" />
      </div>
      <div>
        <h3 className="font-black text-gray-900 text-base">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
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
    <div className="space-y-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Project Context</h2>
        <p className="text-gray-500 text-lg">
          These global multipliers adjust the effort model based on your project's information environment and decision-making structure.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <ToggleSection
            icon={BookOpen}
            title="Information Maturity"
            subtitle="Is discovery documentation available?"
            options={CONTEXT_MULTIPLIERS.infoMaturity}
            selectedId={infoMaturity}
            onSelect={onInfoMaturityChange}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <ToggleSection
            icon={Users}
            title="Decision Governance"
            subtitle="Who has final say on product decisions?"
            options={CONTEXT_MULTIPLIERS.governance}
            selectedId={governance}
            onSelect={onGovernanceChange}
          />
        </div>

        {/* Live Multiplier Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <span className="text-sm font-medium text-gray-500">Combined Context Multiplier</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">
              {CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.tag} × {CONTEXT_MULTIPLIERS.governance[governance]?.tag}
            </span>
            <span className="text-lg font-mono font-black text-violet-700">
              = {(
                (CONTEXT_MULTIPLIERS.infoMaturity[infoMaturity]?.multiplier || 1) *
                (CONTEXT_MULTIPLIERS.governance[governance]?.multiplier || 1)
              ).toFixed(2)}×
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextToggles;
