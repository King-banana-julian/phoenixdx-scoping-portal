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
      {/* Section 1 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-4">
          Project Requirements & Brief
        </h2>
        
        <textarea
          value={reqText || ''}
          onChange={(e) => setReqText(e.target.value)}
          placeholder="Paste project requirements here — e.g. the system must support SSO via Azure AD for all internal users. The platform shall allow bulk upload of clinician records via CSV..."
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-y min-h-[180px]"
        />
        
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleStructure}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
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
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              Upload Brief
            </button>
          </div>
          
          {fileName && (
            <span className="text-emerald-600 text-sm font-semibold ml-2">
              {fileName}
            </span>
          )}
        </div>
        
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-amber-700 mb-1">⚡ Phase 2 — AI-Assisted Parsing Coming Soon</p>
          <p className="text-xs text-amber-600">Currently this tool structures plain-text input locally using pattern matching. In Phase 2, pasting a client brief will automatically extract requirements, flag integration risks, map to PhoenixDX delivery activities, and suggest assumption coverage — powered by the Anthropic API.</p>
        </div>
      </div>

      {/* Section 2 */}
      {parsedReqs && parsedReqs.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
              Structured Requirements ({parsedReqs.length})
            </h2>
            <div className="flex gap-2 flex-wrap">
              {highCount > 0 && <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded">High: {highCount}</span>}
              {mediumCount > 0 && <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded">Med: {mediumCount}</span>}
              {lowCount > 0 && <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded">Low: {lowCount}</span>}
              {flaggedCount > 0 && <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded border border-red-200">Flagged: {flaggedCount}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {parsedReqs.map((req) => (
              <div
                key={req.id}
                className={`rounded-xl p-3 border ${
                  req.flagged
                    ? 'bg-red-50 border-red-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-slate-800 text-sm font-medium mb-3">{req.text}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.type === 'Functional'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {req.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.priority === 'High' ? 'bg-red-50 text-red-600' :
                    req.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {req.priority}
                  </span>
                </div>
                {req.flagged && (
                  <div className="text-red-500 text-xs mt-2 font-semibold">
                    May involve integration or migration — validate assumption coverage before scoping.
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
