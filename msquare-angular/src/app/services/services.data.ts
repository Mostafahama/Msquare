export interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  image: string;
  metric?: string;
  metricLabel?: string;
}

export const SERVICES_DATA: CapabilityItem[] = [
  {
    id: 'srv-1',
    num: '01',
    title: 'Conference Planning',
    category: 'Strategic Execution',
    description: 'Turnkey organization of premier medical congresses, scientific symposia, and academic forums with meticulous logistical choreography from inception to completion.',
    deliverables: ['Agenda Curation', 'Faculty Management', 'Venue Contracting', 'Protocol Handling'],
    image: 'assets/comprehensive-services.webp',
    metric: 'A to Z',
    metricLabel: 'Full Execution'
  },
  {
    id: 'srv-2',
    num: '02',
    title: 'CME Accreditation',
    category: 'Academic Compliance',
    description: 'Securing certified Continuing Medical Education credits through recognized Egyptian and international regulatory councils for attending clinicians.',
    deliverables: ['Accreditation Filings', 'Attendance Auditing', 'Credit Issuance', 'Regulatory Compliance'],
    image: 'assets/pulmo-event/pulmo-event-10.webp',
    metric: '100%',
    metricLabel: 'Accredited Credits'
  },
  {
    id: 'srv-3',
    num: '03',
    title: 'Speaker Coordination',
    category: 'Faculty Relations',
    description: 'End-to-end hospitality, travel coordination, and presentation briefing for top international keynotes and regional healthcare leaders.',
    deliverables: ['VIP Hospitality', 'Travel & Flights', 'Speaker Portals', 'Session Rehearsals'],
    image: 'assets/pulmo-event/pulmo-event-23.webp',
    metric: 'Global',
    metricLabel: 'Faculty Network'
  },
  {
    id: 'srv-4',
    num: '04',
    title: 'Registration Mgmt',
    category: 'Guest Operations',
    description: 'Digital pre-registration, automated confirmation flows, on-site barcode badge printing, and real-time delegate attendance reporting.',
    deliverables: ['Online Delegate Portal', 'Fast Barcode Check-in', 'Smart Badges', 'Real-time Analytics'],
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
    metric: 'Instant',
    metricLabel: 'Badge Issuance'
  },
  {
    id: 'srv-5',
    num: '05',
    title: 'Event Branding',
    category: 'Visual Identity',
    description: 'Architectural stage design, high-impact clinical signage, scientific poster layouts, and tailored physical exhibition collateral.',
    deliverables: ['Stage Architecture', 'Poster Design', 'Signage Systems', 'Print & Merchandise'],
    image: 'assets/comprehensive-services.webp',
    metric: 'Bespoke',
    metricLabel: 'Creative Design'
  },
  {
    id: 'srv-6',
    num: '06',
    title: 'Sponsorship Handling',
    category: 'Pharma Relations',
    description: 'Connecting conference committees with leading multinational pharmaceutical and medical equipment sponsors under strict compliance standards.',
    deliverables: ['Sponsor Prospectus', 'Exhibition Booths', 'Compliance Audits', 'Sponsor ROI Reports'],
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-127.webp',
    metric: 'Top Tier',
    metricLabel: 'Pharma Sponsors'
  },
  {
    id: 'srv-7',
    num: '07',
    title: 'Virtual & Hybrid Events',
    category: 'Digital Infrastructure',
    description: 'Multi-camera scientific live streams, synchronized slide broadcasts, interactive remote Q&A, and virtual exhibition halls for remote delegates.',
    deliverables: ['Live Multi-Cam Streaming', 'Interactive Q&A', 'Virtual Booths', 'HD On-Demand Replay'],
    image: 'assets/pulmo-event/pulmo-event-46.webp',
    metric: 'Seamless',
    metricLabel: 'Hybrid Streaming'
  },
  {
    id: 'srv-8',
    num: '08',
    title: 'Digital Marketing',
    category: 'Audience Acquisition',
    description: 'Data-driven promotion targeted to verified specialist medical practitioners, university professors, and pharmaceutical sector professionals.',
    deliverables: ['Medical Email Outreach', 'Targeted Campaigns', 'Social Management', 'Conversion Analytics'],
    image: 'assets/engaz-event/engaz-events-3-253.webp',
    metric: 'High ROI',
    metricLabel: 'Targeted Outreach'
  },
  {
    id: 'srv-9',
    num: '09',
    title: 'Post-Event Reporting',
    category: 'Analytics & Audits',
    description: 'Comprehensive evaluation dossiers covering attendance breakdowns, session ratings, delegate surveys, and executive financial summaries.',
    deliverables: ['Attendance Metrics', 'Delegate Surveys', 'CME Audit Logs', 'Executive Summaries'],
    image: 'assets/comprehensive-services.webp',
    metric: 'Exhaustive',
    metricLabel: 'Data Insights'
  },
  {
    id: 'srv-10',
    num: '10',
    title: 'IT Solutions',
    category: 'Technology Platforms',
    description: 'Custom mobile conference apps, digital abstract submission tools, electronic poster displays, and physician networking platforms.',
    deliverables: ['Custom Event Apps', 'Abstract Portals', 'Digital e-Posters', 'Lead Retrieval'],
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
    metric: 'Native',
    metricLabel: 'Custom Software'
  },
  {
    id: 'srv-11',
    num: '11',
    title: 'On-site Logistics',
    category: 'Venue Operations',
    description: 'Rigorous management of venue flow, technical audiovisual control, catering schedules, VIP transportation, and emergency protocols.',
    deliverables: ['AV Sound & Projection', 'Catering Logistics', 'VIP Transportation', 'Hall Marshalling'],
    image: 'assets/pulmo-event/pulmo-event-48.webp',
    metric: 'Flawless',
    metricLabel: 'On-Site Ops'
  },
  {
    id: 'srv-12',
    num: '12',
    title: 'Media Production',
    category: 'Scientific Media',
    description: 'High-definition video recording, medical interview segments, scientific highlights recap reels, and post-production archival.',
    deliverables: ['4K Camera Recording', 'Doctor Interviews', 'Highlights Reel', 'Full Session Archive'],
    image: 'assets/pulmo-event/pulmo-event-52.webp',
    metric: '4K Ultra',
    metricLabel: 'Broadcast Quality'
  }
];
