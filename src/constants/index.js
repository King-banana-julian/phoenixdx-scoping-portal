export const MQM_TIERS = [
  {
    tier: 1,
    name: "Absent",
    multiplier: 1.8,
    scoreRange: [0, 1.5],
    friction: "High Resistance. UX is ignored or seen as an obstacle. Significant education and overhead required.",
    color: "bg-red-500",
    textColor: "text-red-500",
    borderColor: "border-red-500/50"
  },
  {
    tier: 2,
    name: "Limited",
    multiplier: 1.5,
    scoreRange: [1.6, 2.5],
    friction: "Tactical & Siloed. UX is a 'last-minute' addition. High friction in handoffs and decision-making.",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/50"
  },
  {
    tier: 3,
    name: "Emergent",
    multiplier: 1.3,
    scoreRange: [2.6, 3.5],
    friction: "Functional but Inconsistent. Team understands UX but lacks standardized processes.",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-500/50"
  },
  {
    tier: 4,
    name: "Structured",
    multiplier: 1.1,
    scoreRange: [3.6, 4.5],
    friction: "Linked to Strategy. Documented processes exist. Resistance is low, but alignment can improve.",
    color: "bg-lime-500",
    textColor: "text-lime-500",
    borderColor: "border-lime-500/50"
  },
  {
    tier: 5,
    name: "Integrated",
    multiplier: 1.0,
    scoreRange: [4.6, 5.0],
    friction: "User-Driven Baseline. UX is core to strategy. Highly efficient sync and collaboration.",
    color: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500/50"
  }
];

export const PILLARS = [
  { 
    id: 'strategy', 
    label: 'Strategy', 
    description: 'Is UX tied to business KPIs and ROI?',
    levels: [
      { score: 1, label: 'Absent', color: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/50', hover: 'hover:border-red-500', desc: 'UX is entirely excluded from business strategy planning.' },
      { score: 2, label: 'Aware', color: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/50', hover: 'hover:border-orange-500', desc: 'Leadership acknowledges UX but treats it as a tactical afterthought.' },
      { score: 3, label: 'Partial', color: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/50', hover: 'hover:border-yellow-500', desc: 'UX metrics are tracked but do not consistently drive product decisions.' },
      { score: 4, label: 'Integrated', color: 'bg-lime-500', text: 'text-lime-500', border: 'border-lime-500/50', hover: 'hover:border-lime-500', desc: 'UX research and KPIs actively shape the product roadmap.' },
      { score: 5, label: 'Core Driver', color: 'bg-green-500', text: 'text-green-500', border: 'border-green-500/50', hover: 'hover:border-green-500', desc: 'UX is a core driver of business strategy and value creation.' }
    ]
  },
  { 
    id: 'culture', 
    label: 'Culture', 
    description: 'Do stakeholders respect design process and timelines?',
    levels: [
      { score: 1, label: 'No Buy-in', color: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/50', hover: 'hover:border-red-500', desc: 'Design is viewed as mere decoration. Timelines ignore discovery.' },
      { score: 2, label: 'Limited', color: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/50', hover: 'hover:border-orange-500', desc: 'Some stakeholders value UX, but it is easily overridden by engineering or sales.' },
      { score: 3, label: 'Mixed', color: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/50', hover: 'hover:border-yellow-500', desc: 'Support varies by team. Pockets of good UX culture exist but aren\'t systemic.' },
      { score: 4, label: 'Strong', color: 'bg-lime-500', text: 'text-lime-500', border: 'border-lime-500/50', hover: 'hover:border-lime-500', desc: 'Cross-functional teams respect UX processes and allocate time for research.' },
      { score: 5, label: 'Embedded', color: 'bg-green-500', text: 'text-green-500', border: 'border-green-500/50', hover: 'hover:border-green-500', desc: 'User-centricity is embedded in the company culture from the top down.' }
    ]
  },
  { 
    id: 'process', 
    label: 'Process', 
    description: 'Is there a documented design system or research methodology?',
    levels: [
      { score: 1, label: 'None', color: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/50', hover: 'hover:border-red-500', desc: 'No standardized design methodologies. Every project starts from scratch.' },
      { score: 2, label: 'Ad Hoc', color: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/50', hover: 'hover:border-orange-500', desc: 'Processes exist but are inconsistently applied or poorly documented.' },
      { score: 3, label: 'Defined', color: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/50', hover: 'hover:border-yellow-500', desc: 'Design systems and research methods are documented but struggle with adoption.' },
      { score: 4, label: 'Standard', color: 'bg-lime-500', text: 'text-lime-500', border: 'border-lime-500/50', hover: 'hover:border-lime-500', desc: 'Standardized, repeatable UX processes are widely adopted across teams.' },
      { score: 5, label: 'Optimized', color: 'bg-green-500', text: 'text-green-500', border: 'border-green-500/50', hover: 'hover:border-green-500', desc: 'Processes are continuously optimized, automated, and strictly governed.' }
    ]
  },
  { 
    id: 'outcomes', 
    label: 'Outcomes', 
    description: 'Are product decisions driven by user data vs assumptions?',
    levels: [
      { score: 1, label: 'Assumptions', color: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/50', hover: 'hover:border-red-500', desc: 'Product decisions are entirely intuition-based or executive fiat.' },
      { score: 2, label: 'Minimal', color: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/50', hover: 'hover:border-orange-500', desc: 'Data is occasionally consulted, but assumptions often win out.' },
      { score: 3, label: 'Inconsistent', color: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/50', hover: 'hover:border-yellow-500', desc: 'Analytics exist but are used reactively rather than proactively.' },
      { score: 4, label: 'Data-Driven', color: 'bg-lime-500', text: 'text-lime-500', border: 'border-lime-500/50', hover: 'hover:border-lime-500', desc: 'Quantitative and qualitative user data consistently drive feature prioritization.' },
      { score: 5, label: 'Insight-Led', color: 'bg-green-500', text: 'text-green-500', border: 'border-green-500/50', hover: 'hover:border-green-500', desc: 'Deep user insights predict market needs and validate all major decisions.' }
    ]
  }
];

export const RISK_FACTORS = [
  { id: 'no_po', label: 'Client lacks dedicated Product Owner', impact: 0.10, description: 'Increases decision-making friction and project overhead.' },
  { id: 'missing_specs', label: 'No technical specifications provided', impact: 0.10, description: 'High risk of discovery expansion during production.' },
  { id: 'third_party', label: 'Dependency on third-party vendors', impact: 0.05, description: 'Added sync time for external integration.' },
  { id: 'siloed_teams', label: 'Development and Design teams are siloed', impact: 0.10, description: 'Requires additional alignment sessions and handoffs.' }
];

export const UNKNOWN_TAX = 0.20; // 20% "Vibe-time"

export const UX_ACTIVITIES = [
  {
    id: 'heuristic_evaluation',
    stage: 'Discover',
    label: 'Heuristic Evaluation',
    outcome: 'Identified usability gaps in legacy/current system.',
    baseEffort: 8, // up to 8 days
    unit: 'days'
  },
  {
    id: 'competitor_analysis',
    stage: 'Discover',
    label: 'Competitor Analysis',
    outcome: 'Market differentiation and feature parity roadmap.',
    baseEffort: 5,
    unit: 'days'
  },
  {
    id: 'contextual_inquiry',
    stage: 'Discover',
    label: 'Contextual Inquiry',
    outcome: 'Real-world user pain points and workflow constraints.',
    baseEffort: 3,
    unit: 'days',
    synthesisRatio: 1 // 1:1 Mandatory Synthesis
  },
  {
    id: 'jtbd_personas',
    stage: 'Define',
    label: 'JTBD & Personas',
    outcome: 'Targeted requirement prioritization and user-need alignment.',
    baseEffort: 5,
    unit: 'days'
  },
  {
    id: 'journey_mapping',
    stage: 'Define',
    label: 'Journey Mapping',
    outcome: 'Visualized end-to-end experience and friction points.',
    baseEffort: 4,
    unit: 'days'
  },
  {
    id: 'wireframing',
    stage: 'Develop',
    label: 'Wireframing (Low-Mid)',
    outcome: 'Validated functional structure before high-fidelity effort.',
    baseEffort: 0.5, // per complex screen
    unit: 'days/screen',
    buffer: 0.2 // 20% Iteration Buffer
  },
  {
    id: 'ia_flow_mapping',
    stage: 'Develop',
    label: 'IA & Flow Mapping',
    outcome: 'Logical product architecture and findability.',
    baseEffort: 2,
    unit: 'days'
  },
  {
    id: 'usability_testing',
    stage: 'Deliver',
    label: 'Usability Testing',
    outcome: 'Documented proof of task success and user satisfaction.',
    baseEffort: 10, // 2 weeks
    unit: 'days',
    synthesisRatio: 0.5 // 1:0.5 Synthesis
  },
  {
    id: 'ab_testing',
    stage: 'Deliver',
    label: 'A/B Testing',
    outcome: 'Data-backed decision between two design directions.',
    baseEffort: 5,
    unit: 'days'
  }
];

export const STRATEGIC_INTENTS = [
  {
    id: 'legacy_modernization',
    label: 'Legacy Modernization',
    coreValue: 'Reduced tech debt & training time',
    description: 'Modernizing an existing, complex legacy system. High risk of reverse-engineering and undocumented technical debt.',
    mandatoryActivities: ['heuristic_evaluation', 'contextual_inquiry'],
    legacyMultiplier: 1.3,
    riskBuffer: 0.15,
    wmbt: [
      'Access to legacy system architects and documentation is granted.',
      'Stakeholders accept that a "lift and shift" ignores strategic value.',
      'Technical debt is recognized as a measurable blocker to user flow.'
    ],
    color: 'text-purple-400',
    borderColor: 'border-purple-500/50',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'digital_experience',
    label: 'Digital Experience',
    coreValue: 'Task success rate & NPS',
    description: 'Elevating the user interface and interactions to drastically improve satisfaction and task completion rates.',
    mandatoryActivities: ['journey_mapping', 'usability_testing'],
    legacyMultiplier: 1.0,
    riskBuffer: 0.05,
    wmbt: [
      'User research is prioritized over internal assumptions.',
      'Design System adoption is mandated across all digital channels.',
      'Post-launch tracking for NPS and Task Success is implemented.'
    ],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'product_innovation',
    label: 'Product Innovation',
    coreValue: 'Feature adoption & differentiation',
    description: 'Creating net-new features or products that capture new market segments or differentiate from competitors.',
    mandatoryActivities: ['competitor_analysis', 'jtbd_personas'],
    legacyMultiplier: 1.0,
    riskBuffer: 0.10,
    wmbt: [
      'Market differentiation is valued higher than feature parity.',
      'The team is empowered to pivot based on user discovery findings.',
      'The business accepts "fast failure" as a learning outcome.'
    ],
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'internal_tooling',
    label: 'Internal Tooling',
    coreValue: 'Process efficiency & error reduction',
    description: 'Optimizing tools used by employees to streamline workflows, reduce manual errors, and increase output.',
    mandatoryActivities: ['contextual_inquiry', 'ia_flow_mapping'],
    legacyMultiplier: 1.1,
    riskBuffer: 0.05,
    wmbt: [
      'Actual end-users (employees) are available for contextual research.',
      'Efficiency metrics are clearly defined and measurable.',
      'Leadership supports process changes resulting from research.'
    ],
    color: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'self_service',
    label: 'Self-Service',
    coreValue: 'Support ticket deflection',
    description: 'Enabling users to independently resolve issues or complete tasks without contacting support.',
    mandatoryActivities: ['ia_flow_mapping', 'usability_testing'],
    legacyMultiplier: 1.0,
    riskBuffer: 0.05,
    wmbt: [
      'Knowledge base content is accurate and technically accessible.',
      'AI/Chatbot training data is representative of user queries.',
      'Users prefer autonomy over human contact for Tier 1 issues.'
    ],
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-500/10'
  },
  {
    id: 'accessibility_risk',
    label: 'Accessibility & Risk',
    coreValue: 'WCAG compliance & lowered risk',
    description: 'Ensuring the product meets strict accessibility standards to avoid legal repercussions and serve all users.',
    mandatoryActivities: ['heuristic_evaluation', 'usability_testing'],
    legacyMultiplier: 1.0,
    riskBuffer: 0.10,
    wmbt: [
      'WCAG 2.2 AA is the non-negotiable project baseline.',
      'Legal teams are aligned on accessibility risk thresholds.',
      'Accessibility is integrated into the SDLC, not as an afterthought.'
    ],
    color: 'text-rose-400',
    borderColor: 'border-rose-500/50',
    bgColor: 'bg-rose-500/10'
  }
];

// From STRATEGIC_REQUIREMENTS_MATRIX.md — Section 1: Global Multipliers
export const CONTEXT_MULTIPLIERS = {
  infoMaturity: {
    high: { id: 'high', label: 'High', description: 'Docs, personas & specs exist', multiplier: 1.0, tag: '1.0×', color: 'text-emerald-400' },
    low:  { id: 'low',  label: 'Low',  description: 'No docs, verbal only — +25% Discovery Buffer', multiplier: 1.25, tag: '+25%', color: 'text-orange-400' }
  },
  governance: {
    direct:    { id: 'direct',    label: 'Direct',    description: 'Single PM/PO — fast decisions', multiplier: 1.0, tag: '1.0×', color: 'text-emerald-400' },
    committee: { id: 'committee', label: 'Committee', description: 'Group consensus — +20% Synthesis Buffer', multiplier: 1.2, tag: '+20%', color: 'text-orange-400' }
  }
};

// From STRATEGIC_REQUIREMENTS_MATRIX.md — Section 2: Goal → Tech Requirement Mapping
export const TECH_REQUIREMENTS = {
  legacy_modernization: [
    { id: 'api_integration',    label: 'API Integration',     description: 'Map, test & migrate legacy API contracts.' },
    { id: 'data_migration',     label: 'Data Migration',      description: 'ETL strategy for existing structured/unstructured data.' },
    { id: 'arch_audit',         label: 'Architecture Audit',  description: 'Reverse-engineer current system to expose undocumented debt.' },
  ],
  digital_experience: [
    { id: 'design_tokens',      label: 'Design System Tokens', description: 'Establish consistent token library for multi-channel consistency.' },
    { id: 'multichannel_sync',  label: 'Multi-channel Sync',   description: 'Ensure parity of experience across web, mobile, and tablet.' },
    { id: 'sso',                label: 'SSO / Auth Layer',      description: 'Streamlined single sign-on across platforms.' },
  ],
  product_innovation: [
    { id: 'scalable_backend',   label: 'Scalable Backend',    description: 'Architecture supports rapid feature iteration without rework.' },
    { id: 'realtime_data',      label: 'Real-time Data',      description: 'Live data feeds required for dynamic product decisions.' },
    { id: 'mvp_logic',          label: 'MVP Scoping Logic',   description: 'Explicit must-have vs. nice-to-have feature triage.' },
  ],
  internal_tooling: [
    { id: 'rbac',               label: 'RBAC (Roles)',         description: 'Role-based access control for internal permission tiers.' },
    { id: 'complex_grids',      label: 'Complex Data Grids',   description: 'Dense tabular data display and manipulation patterns.' },
    { id: 'offline_mode',       label: 'Offline Mode',         description: 'Progressive capability when connectivity is unavailable.' },
  ],
  self_service: [
    { id: 'knowledge_base',     label: 'Knowledge Base',       description: 'Structured, searchable documentation layer for self-help.' },
    { id: 'ai_chatbot',         label: 'AI Chatbot',           description: 'Conversational layer to deflect Tier 1 support queries.' },
    { id: 'findability',        label: 'Findability Logic',    description: 'IA, search, and filtering to surface correct content fast.' },
  ],
  accessibility_risk: [
    { id: 'wcag',               label: 'WCAG 2.2 AA',          description: 'Full compliance audit against WCAG 2.2 Level AA criteria.' },
    { id: 'screen_reader',      label: 'Screen Reader Logic',  description: 'ARIA labelling, focus management, and semantic HTML review.' },
    { id: 'vpat',               label: 'VPAT Audit',           description: 'Voluntary Product Accessibility Template for procurement compliance.' },
  ]
};
export const ENGAGEMENT_MODES = [
    {
        id: "ux_only",
        label: "Design Sprint",
        sub: "UX & Design only — no development",
        color: "#8b5cf6",
        description: "Research, journey mapping, wireframes, prototype and design system handover. Typically 6–12 weeks.",
        phases: ["Discovery", "Define", "Design", "Validate", "Handover"],
    },
    {
        id: "design_to_dev",
        label: "Design to Delivery",
        sub: "UX through to OutSystems build",
        color: "#0ea5e9",
        description: "Full engagement from research through build and UAT. Phased releases, 3–6 months.",
        phases: ["Discovery", "Design", "Initiation", "Build", "UAT", "Deployment", "Warranty"],
    },
    {
        id: "full_delivery",
        label: "Full Delivery",
        sub: "Complex multi-stream delivery",
        color: "#6366f1",
        description: "Large-scale delivery with multiple squads, functional and non-functional streams, 6–12+ months.",
        phases: ["Initiation", "Discovery", "Design", "Build Sprints", "SIT", "UAT", "Deployment", "Warranty"],
    },
];

export const INDUSTRIES = [
    { id: "healthcare", label: "Healthcare & Insurance", example: "e-Credentialing platform · Full delivery · 9 months · 8-person squad" },
    { id: "govt", label: "Government & Public Sector", example: "Law enforcement case management · Full delivery · 12 months · 12-person squad" },
    { id: "property", label: "Property & Real Estate", example: "Payment portal & design system · Design Sprint · 10 weeks · 3-person squad" },
    { id: "financial", label: "Financial Services", example: "Customer portal & mobile app · Design to Delivery · 6 months · 7-person squad" },
    { id: "research", label: "Research & Professional Services", example: "Business operations platform · Design to Delivery · 5 months · 6-person squad" },
    { id: "logistics", label: "Logistics & Field Services", example: "Field services mobile app · Full delivery · 8 months · 10-person squad" },
    { id: "tech", label: "Technology & Software", example: "SaaS product MVP · Design to Delivery · 4 months · 5-person squad" },
    { id: "other", label: "Other", example: "Describe your industry" },
];

export const SQUAD_ROLE_TEMPLATES = {
    ux_only: [
        { id: "lead_designer", label: "Lead Designer", days: 0, rate: "" },
        { id: "senior_designer", label: "Senior Designer", days: 0, rate: "" },
        { id: "em_light", label: "Engagement Manager", days: 0, rate: "" },
    ],
    design_to_dev: [
        { id: "em", label: "Senior Engagement Manager", days: 0, rate: "" },
        { id: "sa", label: "Solution Architect", days: 0, rate: "" },
        { id: "tl", label: "Senior Technical Lead", days: 0, rate: "" },
        { id: "ux", label: "Senior UX Designer", days: 0, rate: "" },
        { id: "dev_sr", label: "Senior Developer", days: 0, rate: "" },
        { id: "dev_ns", label: "Developer (Nearshore)", days: 0, rate: "" },
        { id: "ba", label: "Business Analyst", days: 0, rate: "" },
    ],
    full_delivery: [
        { id: "em", label: "Senior Engagement Manager", days: 0, rate: "" },
        { id: "sa", label: "Senior Solution Architect", days: 0, rate: "" },
        { id: "ptl", label: "Principal Technical Lead", days: 0, rate: "" },
        { id: "tl", label: "Senior Technical Lead", days: 0, rate: "" },
        { id: "dev_sr1", label: "Senior Developer", days: 0, rate: "" },
        { id: "dev_sr2", label: "Senior Developer", days: 0, rate: "" },
        { id: "dev_ns", label: "Developer (Nearshore)", days: 0, rate: "" },
        { id: "sec", label: "Security Lead", days: 0, rate: "" },
        { id: "ux", label: "Senior UX Designer", days: 0, rate: "" },
        { id: "ba_sr", label: "Senior OutSystems BA / QA", days: 0, rate: "" },
        { id: "ba_ns", label: "OutSystems BA / QA (Nearshore)", days: 0, rate: "" },
    ],
};

export const STANDARD_ASSUMPTIONS = [
    { id: "a1", text: "Client will provide a dedicated Product Owner with authority to sign off requirements.", checked: true },
    { id: "a2", text: "All third-party licensing (e.g. OutSystems, SMS gateway) is the client's responsibility.", checked: true },
    { id: "a3", text: "A steering committee will be established with executive sponsor and key stakeholders.", checked: true },
    { id: "a4", text: "Penetration and independent security reviews are excluded from this engagement.", checked: true },
    { id: "a5", text: "Managed services post go-live are excluded and will be covered in a separate SOW.", checked: true },
    { id: "a6", text: "Maximum 5-day turnaround time for client feedback and approvals.", checked: true },
    { id: "a7", text: "All integrations with source systems will be available at the start of implementation.", checked: false },
    { id: "a8", text: "Client is responsible for Organisation Change Management (OCM) and user training delivery.", checked: true },
    { id: "a9", text: "Data migration scope is limited to in-flight records — historical data is excluded unless agreed.", checked: false },
    { id: "a10", text: "Vendor reserves the right to conduct some activities remotely.", checked: true },
];