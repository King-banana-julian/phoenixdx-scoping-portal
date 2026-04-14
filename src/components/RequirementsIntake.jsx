import React, { useRef, useState } from 'react';

export default function RequirementsIntake({
  reqText,
  setReqText,
  parsedReqs,
  setParsedReqs
}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleStructure = () => {
    if (!reqText) return;
    const lines = reqText.split(/\n|\./);
    const filtered = lines.filter((line) => line.trim().length > 10).slice(0, 12);
    
    const parsed = filtered.map((line, index) => {
      const lowerLine = line.toLowerCase();
      return {
        id: `req_${index}`,
        text: line.trim(),
        type: lowerLine.includes("must") || lowerLine.includes("shall") ? "Functional" : "Non-Functional",
        priority: index < 3 ? "High" : index < 7 ? "Medium" : "Low",
        flagged: lowerLine.includes("integrat") || lowerLine.includes("migrat")
      };
    });
    
    setParsedReqs(parsed);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const highCount = parsedReqs?.filter(r => r.priority === 'High').length || 0;
  const mediumCount = parsedReqs?.filter(r => r.priority === 'Medium').length || 0;
  const lowCount = parsedReqs?.filter(r => r.priority === 'Low').length || 0;
  const flaggedCount = parsedReqs?.filter(r => r.flagged).length || 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Input Section */}
      <div className="swiss-card">
        <h2 className="swiss-label">Project Requirements & Brief</h2>
        
        <textarea
          value={reqText || ''}
          onChange={(e) => setReqText(e.target.value)}
          placeholder="Paste project requirements here... e.g. The system must support SSO via Azure AD."
          className="swiss-input w-full min-h-[160px] resize-y mb-6"
        />
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleStructure}
            className="bg-swiss-interactive-primary hover:bg-swiss-interactive-primary-hover active:bg-[#042C53] active:scale-95 text-white rounded-md px-5 h-10 text-sm font-semibold transition-all duration-150 ease-in-out"
          >
            Structure Requirements
          </button>
          
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white hover:bg-[#F7F6F3] border border-swiss-border-default hover:border-swiss-text-tertiary text-swiss-text-primary rounded-md px-4 h-10 text-sm font-semibold transition-all active:scale-95 duration-150 ease-in-out"
            >
              Upload Brief
            </button>
          </div>
          
          {fileName && (
            <span className="text-swiss-text-success text-xs font-semibold tabular-nums">
              {fileName}
            </span>
          )}
        </div>
        
        <div className="mt-6 bg-swiss-bg-warning border border-swiss-border-warning/30 rounded-md px-4 py-3">
          <p className="text-[10px] font-bold text-swiss-text-warning uppercase tracking-widest mb-1">⚡ Phase 2 — Anthropic Integration Pending</p>
          <p className="text-[11px] text-swiss-text-warning font-normal italic leading-normal">Currently structures local text via pattern matching. Real-time AI extraction and risk mapping is planned for the next release.</p>
        </div>
      </div>

      {/* Results Section */}
      {parsedReqs && parsedReqs.length > 0 && (
        <div className="swiss-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="swiss-label mb-0">
              Structured Requirements ({parsedReqs.length})
            </h2>
            <div className="flex gap-2">
              {highCount > 0 && <span className="text-[10px] font-semibold bg-swiss-bg-danger/10 text-swiss-text-danger border border-swiss-border-danger/20 px-2 py-0.5 rounded-sm tabular-nums">High: {highCount}</span>}
              {flaggedCount > 0 && <span className="text-[10px] font-semibold bg-swiss-bg-warning/10 text-swiss-text-warning border border-swiss-border-warning/30 px-2 py-0.5 rounded-sm tabular-nums">Flagged: {flaggedCount}</span>}
            </div>
          </div>

          <div className="space-y-2">
            {parsedReqs.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-md border transition-all hover:border-swiss-text-tertiary ${
                  req.flagged
                    ? 'bg-swiss-bg-warning/5 border-swiss-border-warning/20'
                    : 'bg-swiss-bg-secondary border-swiss-border-subtle'
                }`}
              >
                <div className="text-swiss-text-primary text-sm font-normal mb-3 leading-normal">{req.text || "—"}</div>
                <div className="flex gap-2 items-center">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                    req.type === 'Functional'
                      ? 'bg-swiss-bg-info text-swiss-text-info border border-swiss-border-accent/20'
                      : 'bg-swiss-bg-tertiary text-swiss-text-tertiary border border-swiss-border-default'
                  }`}>
                    {req.type}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                    req.priority === 'High' ? 'bg-swiss-bg-danger text-white' :
                    req.priority === 'Medium' ? 'bg-swiss-bg-warning text-swiss-text-warning' :
                    'bg-swiss-bg-success text-swiss-text-success'
                  }`}>
                    {req.priority}
                  </span>
                </div>
                {req.flagged && (
                  <div className="text-swiss-text-warning text-[11px] mt-2 font-semibold italic">
                    Requires technical validation — potential integration risk detected.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

