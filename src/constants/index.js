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