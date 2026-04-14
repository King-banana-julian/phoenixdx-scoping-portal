export const calculateIntakeSignals = (state) => {
  let score = 0;
  const deltas = [];

  if (state.q1) score += 15;
  if (state.q2) score += 15;
  if (state.q7) score += 10;
  
  if (state.q3.length > 0) score += 10;
  else deltas.push("Client current situation not documented.");

  if (state.q4) score += 10;
  else deltas.push("Decision style unknown.");

  if (state.q5) score += 10;
  else deltas.push("Product scale not confirmed.");

  if (state.q6.length > 0) score += 8;
  else deltas.push("Expected deliverables not specified.");

  if (state.q8.length > 0) score += 5;
  else deltas.push("Project constraints not identified.");

  if (state.q9.type && state.q9.type !== 'Not yet discussed') score += 7;
  else deltas.push("Budget not provided.");

  if (state.q10) score += 5;
  else deltas.push("Client maturity not provided.");

  if (state.q12) score += 5;
  else deltas.push("Meeting context empty.");

  return { score, deltas };
};
