export interface UiTranslations {
  nav: {
    identity: string;
    services: string;
    portfolio: string;
    partners: string;
    cta: string;
    menu: string;
    close: string;
    menuItems: {
      identityTitle: string;
      identitySub: string;
      servicesTitle: string;
      servicesSub: string;
      portfolioTitle: string;
      portfolioSub: string;
      partnersTitle: string;
      partnersSub: string;
      contactTitle: string;
      contactSub: string;
    };
    menuFooter: {
      inquiries: string;
      telephone: string;
      location: string;
      locationValue: string;
    };
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollCue: string;
  };
  identity: {
    eyebrow: string;
    headingMain: string;
    headingHighlight: string;
    visionLabel: string;
    visionText: string;
    missionLabel: string;
    missionText: string;
    valuesEyebrow: string;
  };
  wipePanels: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    tabServices: string;
    tabInternships: string;
  };
  servicesUi: {
    exploreLabel: string;
    overviewLabel: string;
    solutionCount: string;
    prev: string;
    next: string;
    photoBadge: string;
    executiveServiceTag: string;
    inquireBtn: string;
    directInquiry: string;
  };
  internshipsUi: {
    exploreLabel: string;
    overviewLabel: string;
    programCount: string;
    prev: string;
    next: string;
    photoBadge: string;
    studentInternshipTag: string;
    applyBtn: string;
  };
  events: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    filterMedical: string;
    filterCareer: string;
    filterCommunity: string;
    photoOf: (current: number, total: number) => string;
    prevEvent: string;
    nextEvent: string;
    portfolioIndex: string;
    upcoming: string;
    catMedical: string;
    catCareer: string;
    catCommunity: string;
  };
  partners: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  contact: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    scheduleCall: string;
    cards: {
      hqTitle: string;
      hqAddress: string;
      phoneTitle: string;
      inquiriesTitle: string;
      hoursTitle: string;
      hoursValue: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    subline: string;
    servicesHeader: string;
    servicesList: {
      confPlanning: string;
      cme: string;
      hybrid: string;
      logistics: string;
      media: string;
    };
    programsHeader: string;
    programsList: {
      clinicalPharmacy: string;
      medicalResearch: string;
      drugSafety: string;
      qualityAssurance: string;
    };
    copyright: string;
    nav: {
      identity: string;
      services: string;
      events: string;
      partners: string;
      contact: string;
    };
  };
  cursor: {
    open: string;
    explore: string;
    view: string;
    drag: string;
  };
  langSwitcher: {
    toggleAria: string;
    enLabel: string;
    arLabel: string;
  };
}
