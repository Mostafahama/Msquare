import { UiTranslations } from './translations.interface';

export const TRANSLATIONS_EN: UiTranslations = {
  nav: {
    identity: 'Identity',
    services: 'Services',
    portfolio: 'Portfolio',
    partners: 'Partners',
    cta: 'Partner With Us',
    menu: 'MENU',
    close: 'CLOSE',
    menuItems: {
      identityTitle: 'Identity & Purpose',
      identitySub: 'Manifesto & Values',
      servicesTitle: 'Healthcare Services',
      servicesSub: '12 Specialized Solutions',
      portfolioTitle: 'Featured Portfolio',
      portfolioSub: 'Congresses & Forums',
      partnersTitle: 'Academic & Industry',
      partnersSub: 'Multinationals & Universities',
      contactTitle: 'Contact & Headquarters',
      contactSub: 'Cairo AlQattamia District'
    },
    menuFooter: {
      inquiries: 'DIRECT INQUIRIES',
      telephone: 'TELEPHONE',
      location: 'LOCATION',
      locationValue: 'Cairo, Egypt — AlQattamia 36 AlMarwa'
    }
  },
  hero: {
    eyebrow: 'MEDICAL CONGRESSES & EVENT DESIGN',
    titleLine1: 'Transforming',
    titleLine2: 'Healthcare Events',
    titleLine3: 'Into Measured Impact',
    subtitle: 'Turnkey medical congresses, certified CME accreditation, pharmaceutical career fairs, and accredited clinical rotations across Egypt.',
    ctaPrimary: 'Explore Services',
    ctaSecondary: 'View Flagship Events',
    scrollCue: 'SCROLL TO DISCOVER'
  },
  identity: {
    eyebrow: 'Who We Are',
    headingMain: 'Built on clarity.',
    headingHighlight: 'purpose.',
    visionLabel: 'OUR VISION',
    visionText: 'To be the leading platform for knowledge exchange, setting the highest standards in medical event planning and fostering a global community of healthcare professionals.',
    missionLabel: 'OUR MISSION',
    missionText: "Committed to delivering flawless execution, innovative formats, and impactful content that bridges academic theory and clinical practice across Egypt's healthcare sector.",
    valuesEyebrow: 'Core Values'
  },
  wipePanels: {
    eyebrow: 'Specialized Solutions',
    titleMain: 'Complete Healthcare & Academic',
    titleHighlight: 'Event Management',
    subtitle: 'Designed for pharmaceutical corporations, medical congresses, healthcare institutions, and ambitious medical students.',
    tabServices: 'Healthcare Services (12)',
    tabInternships: 'Student Internships (12)'
  },
  servicesUi: {
    exploreLabel: 'EXPLORE CAPABILITIES',
    overviewLabel: 'CAPABILITY OVERVIEW',
    solutionCount: 'SPECIALIZED HEALTHCARE SOLUTIONS',
    prev: 'Previous Capability',
    next: 'Next Capability',
    photoBadge: 'CAPABILITY SHOWCASE',
    executiveServiceTag: 'Executive Healthcare Service',
    inquireBtn: 'Inquire About This Service',
    directInquiry: 'Direct Inquiry'
  },
  internshipsUi: {
    exploreLabel: 'EXPLORE PROGRAMS',
    overviewLabel: 'PROGRAM OVERVIEW',
    programCount: 'ACCREDITED ROTATION DOMAINS',
    prev: 'Previous Domain',
    next: 'Next Domain',
    photoBadge: 'ROTATION TRACK',
    studentInternshipTag: 'Clinical Rotation Program',
    applyBtn: 'Apply for Internship Track'
  },
  events: {
    eyebrow: 'Curated Flagship Portfolio',
    titleMain: 'Featured',
    titleHighlight: 'Events',
    subtitle: 'A visual record of medical congresses, student career forums, and healthcare initiatives across Egypt.',
    filterMedical: 'Medical Conferences (4)',
    filterCareer: 'Career & Talent Fairs (4)',
    filterCommunity: 'Community Initiatives (5)',
    photoOf: (current: number, total: number) => `PHOTO ${current} OF ${total}`,
    prevEvent: 'Previous Event',
    nextEvent: 'Next Event',
    portfolioIndex: 'PORTFOLIO INDEX',
    upcoming: 'Upcoming',
    catMedical: 'Medical Congress',
    catCareer: 'Career & Talent',
    catCommunity: 'Civic & CSR'
  },
  partners: {
    eyebrow: 'Our Partners',
    titleMain: 'Trusted By Leading',
    titleHighlight: 'Healthcare Organizations',
    subtitle: 'We collaborate with pharmaceutical companies, universities, professional medical societies, and industry bodies across Egypt.'
  },
  contact: {
    eyebrow: 'Inquiries & Headquarters',
    titleMain: "Let's Build Your Next",
    titleHighlight: 'Healthcare Landmark',
    subtitle: 'Whether launching a nationwide medical congress, accredited CME program, or clinical training cohort — our specialized team is ready.',
    scheduleCall: 'Schedule a Direct Consultation',
    cards: {
      hqTitle: 'HEADQUARTERS',
      hqAddress: '36 AlMarwa Land, AlQattamia District, Cairo, Egypt',
      phoneTitle: 'DIRECT TELEPHONE',
      inquiriesTitle: 'OFFICIAL INQUIRIES',
      hoursTitle: 'WORKING HOURS',
      hoursValue: 'Sunday – Thursday: 9:00 AM – 6:00 PM (Cairo Time)'
    }
  },
  footer: {
    tagline: 'Transform Healthcare Events Into Impact.',
    rights: '© 2026 M Square (MTech Square Group). All rights reserved.',
    subline: 'Built for Healthcare Excellence across Egypt & the Middle East.',
    servicesHeader: 'Services',
    servicesList: {
      confPlanning: 'Conference Planning',
      cme: 'CME Accreditation',
      hybrid: 'Virtual & Hybrid Events',
      logistics: 'On-site Logistics',
      media: 'Media Production'
    },
    programsHeader: 'Programs',
    programsList: {
      clinicalPharmacy: 'Clinical Pharmacy',
      medicalResearch: 'Medical Research',
      drugSafety: 'Pharmacovigilance',
      qualityAssurance: 'Quality Assurance'
    },
    copyright: 'M Square — Part of MTech Square Group. All rights reserved.',
    nav: {
      identity: 'Identity & Values',
      services: 'Specialized Services',
      events: 'Flagship Events',
      partners: 'Partners & Academic',
      contact: 'Headquarters & Contact'
    }
  },
  cursor: {
    open: 'OPEN',
    explore: 'EXPLORE',
    view: 'VIEW',
    drag: 'DRAG'
  },
  langSwitcher: {
    toggleAria: 'Switch language between English and Arabic',
    enLabel: 'EN',
    arLabel: 'عربي'
  }
};
