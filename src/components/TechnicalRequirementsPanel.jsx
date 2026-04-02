import React from 'react';
import { TECH_REQUIREMENTS } from '../constants';
import { Code2, ShieldCheck } from 'lucide-react';

const TechnicalRequirementsPanel = ({ selectedIntentId }) => {
  const requirements = TECH_REQUIREMENTS[selectedIntentId] || [];

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <Code2 size={48} className="mx-auto text-violet-600 mb-4 opacity-80" />
        <h2 className="text-3xl font-black text-gray-900 mb-2">Technical Scope</h2>
        <p className="text-gray-500 text-lg">
          Based on your Strategic Intent, the following technical requirements are implied. These inform the discovery activities in the next phase.
        </p>
      </div>

      {requirements.length === 0 ? (
        <div className="text-center p-12 text-gray-500 border border-dashed border-gray-300 rounded-2xl">
          No strategic intent selected. Return to Step 1 to choose a goal.
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {requirements.map((req, idx) => (
            <div
              key={req.id}
              className="flex items-start gap-5 p-5 bg-white border border-gray-200 rounded-2xl group hover:border-violet-300 shadow-sm transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center mt-0.5">
                <ShieldCheck size={16} className="text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-900">{req.label}</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                    REQ-{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{req.description}</p>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Traceability note:</strong> These technical requirements trace directly from your chosen Strategic Goal and will be visible in the final project quote.
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalRequirementsPanel;
