import { UiTranslations } from './translations.interface';

export const TRANSLATIONS_AR: UiTranslations = {
  nav: {
    identity: 'هويتنا',
    services: 'خدماتنا',
    portfolio: 'أعمالنا',
    partners: 'شركاؤنا',
    cta: 'تواصل معنا',
    menu: 'القائمة',
    close: 'إغلاق',
    menuItems: {
      identityTitle: 'الهوية والرسالة',
      identitySub: 'الرؤية والقيم الجوهرية',
      servicesTitle: 'الخدمات الطبية والرعاية',
      servicesSub: '12 حلاً تخصصياً متكاملاً',
      portfolioTitle: 'أبرز الفعاليات',
      portfolioSub: 'المؤتمرات والملتقيات الرائدة',
      partnersTitle: 'الشركاء الأكاديميون والصناعيون',
      partnersSub: 'الشركات العالمية والجامعات',
      contactTitle: 'التواصل والمقر الرئيسي',
      contactSub: 'القاهرة — حي القطامية'
    },
    menuFooter: {
      inquiries: 'الاستفسارات المباشرة',
      telephone: 'الهاتف المباشر',
      location: 'الموقع الجغرافي',
      locationValue: 'القاهرة، مصر — القطامية، 36 أرض المروة'
    }
  },
  hero: {
    eyebrow: 'تنظيم المؤتمرات الطبية وتصميم الفعاليات',
    titleLine1: 'نحو تحويل',
    titleLine2: 'الفعاليات الطبية',
    titleLine3: 'إلى أثر ملموس ومستدام',
    subtitle: 'حلول متكاملة للمؤتمرات الطبية، واعتماد برامج التعليم الطبي المستمر (CME)، وملتقيات التوظيف الصيدلاني، والتدريب الإكلينيكي المعتمد في مصر.',
    ctaPrimary: 'استكشف خدماتنا',
    ctaSecondary: 'شاهد أبرز الفعاليات',
    scrollCue: 'مرر لأسفل للاكتشاف'
  },
  identity: {
    eyebrow: 'من نحن',
    headingMain: 'أسس راسخة من الوضوح.',
    headingHighlight: 'رسالة هادفة.',
    visionLabel: 'رؤيتنا',
    visionText: 'أن نكون المنصة الرائدة لتبادل المعرفة الطبية، وواضعي أعلى المعايير في تنظيم المؤتمرات الصحية، وبناء مجتمع علمي رائد للأطباء والمتخصصين.',
    missionLabel: 'مهمتنا',
    missionText: 'الالتزام بالتنفيذ المتقن والابتكار المستمر في صياغة محتوى علمي وتفاعلي يربط بين العلوم الأكاديمية والممارسة الإكلينيكية عبر القطاع الصحي المصري.',
    valuesEyebrow: 'قيمنا الجوهرية'
  },
  wipePanels: {
    eyebrow: 'حلول تخصصية متكاملة',
    titleMain: 'إدارة متكاملة للفعاليات',
    titleHighlight: 'الطبية والأكاديمية',
    subtitle: 'مصممة خصيصاً لشركات الأدوية العالمية، والمؤتمرات التخصصية، والمؤسسات الصحية، وطلاب العلوم الطبية الطموحين.',
    tabServices: 'الخدمات الطبية (12)',
    tabInternships: 'برامج التدريب الطلابي (12)'
  },
  servicesUi: {
    exploreLabel: 'استكشف مجالات خدماتنا',
    overviewLabel: 'نظرة شاملة على الخدمة',
    solutionCount: 'حلول رعاية صحية تخصصية',
    prev: 'الخدمة السابقة',
    next: 'الخدمة التالية',
    photoBadge: 'معرض الإمكانات والقدرات',
    executiveServiceTag: 'خدمة رعاية صحية تنفيذية',
    inquireBtn: 'طلب استشارة لهذه الخدمة',
    directInquiry: 'استفسار مباشر'
  },
  internshipsUi: {
    exploreLabel: 'استكشف برامج التدريب',
    overviewLabel: 'تفاصيل البرنامج التدريبي',
    programCount: 'مسارات تدريبية إكلينيكية معتمدة',
    prev: 'المسار السابق',
    next: 'المسار التالي',
    photoBadge: 'المسار الإكلينيكي',
    studentInternshipTag: 'برنامج تدريب إكلينيكي',
    applyBtn: 'التقديم في هذا المسار التدريبي'
  },
  events: {
    eyebrow: 'سجل إنجازاتنا الرائد',
    titleMain: 'أبرز',
    titleHighlight: 'الفعاليات',
    subtitle: 'توثيق حي لأهم المؤتمرات العلمية، ومنتديات التطوير المهني، والمبادرات الصحية في مختلف محافظات مصر.',
    filterMedical: 'المؤتمرات الطبية (4)',
    filterCareer: 'ملتقيات التوظيف والمهن (4)',
    filterCommunity: 'المبادرات المجتمعية (5)',
    photoOf: (current: number, total: number) => `صورة ${current} من ${total}`,
    prevEvent: 'الفعالية السابقة',
    nextEvent: 'الفعالية التالية',
    portfolioIndex: 'فهرس الفعاليات',
    upcoming: 'قريباً',
    catMedical: 'مؤتمر طبي تخصصي',
    catCareer: 'ملتقى توظيف وتأهيل',
    catCommunity: 'مبادرة مجتمعية وتنموية'
  },
  partners: {
    eyebrow: 'شركاء النجاح',
    titleMain: 'محل ثقة كبرى',
    titleHighlight: 'المؤسسات الصحية والأكاديمية',
    subtitle: 'نتعاون مع كبرى شركات الأدوية متعددة الجنسيات، والجامعات، والجمعيات الطبية المهنية في مصر والشرق الأوسط.'
  },
  contact: {
    eyebrow: 'الاستفسارات والمقر الرئيسي',
    titleMain: 'لنصنع معاً محطتكم',
    titleHighlight: 'الصحية القادمة',
    subtitle: 'سواء كنتم تخططون لإطلاق مؤتمر طبي على مستوى الجمهورية، أو برنامج تعليم طبي معتمد، أو تدريب دفعات طبية — فريقنا المتخصص مستعد لدعمكم.',
    scheduleCall: 'طلب استشارة مباشرة',
    cards: {
      hqTitle: 'المقر الرئيسي',
      hqAddress: '36 أرض المروة، حي القطامية، القاهرة، جمهورية مصر العربية',
      phoneTitle: 'الاتصال المباشر',
      inquiriesTitle: 'المراسلات الرسمية',
      hoursTitle: 'مواعيد العمل الرسمية',
      hoursValue: 'الأحد – الخميس: 9:00 صباحاً – 6:00 مساءً (بتوقيت القاهرة)'
    }
  },
  footer: {
    tagline: 'نحول الفعاليات الطبية إلى أثر ملموس ومستدام.',
    rights: '© 2026 إم سكوير (مجموعة إم تك سكوير). جميع الحقوق محفوظة.',
    subline: 'صُمم للريادة والتميز في الرعاية الصحية بمصر والشرق الأوسط.',
    servicesHeader: 'خدماتنا',
    servicesList: {
      confPlanning: 'تخطيط وتنظيم المؤتمرات',
      cme: 'الاعتماد الطبي والتعليم المستمر',
      hybrid: 'الفعاليات الهجينة والافتراضية',
      logistics: 'اللوجستيات والعمليات الميدانية',
      media: 'الإنتاج الإعلامي والتوثيق'
    },
    programsHeader: 'برامج التدريب',
    programsList: {
      clinicalPharmacy: 'الصيدلة الإكلينيكية',
      medicalResearch: 'البحث الطبي والنشر الدولي',
      drugSafety: 'اليقظة وسلامة المرضى',
      qualityAssurance: 'توكيد الجودة والمعايير'
    },
    copyright: 'إم سكوير — إحدى شركات مجموعة إم تك سكوير. جميع الحقوق محفوظة.',
    nav: {
      identity: 'الهوية والقيم',
      services: 'الخدمات التخصصية',
      events: 'أبرز المؤتمرات',
      partners: 'الشركاء والجامعات',
      contact: 'المقر والتواصل'
    }
  },
  cursor: {
    open: 'فتح',
    explore: 'استكشف',
    view: 'عرض',
    drag: 'سحب'
  },
  langSwitcher: {
    toggleAria: 'تبديل اللغة بين العربية والإنجليزية',
    enLabel: 'EN',
    arLabel: 'عربي'
  }
};
