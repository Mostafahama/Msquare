export interface CapabilityItem {
  id: string;
  num: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  deliverables: { en: string[]; ar: string[] };
  image: string;
  metric?: string;
  metricLabel?: { en: string; ar: string };
}

export const SERVICES_DATA: CapabilityItem[] = [
  {
    id: 'srv-1',
    num: '01',
    title: { en: 'Conference Planning', ar: 'التخطيط الشامل للمؤتمرات' },
    category: { en: 'Strategic Execution', ar: 'التنفيذ الاستراتيجي' },
    description: {
      en: 'Turnkey organization of premier medical congresses, scientific symposia, and academic forums with meticulous logistical choreography from inception to completion.',
      ar: 'تنظيم متكامل وشامل لأرقى المؤتمرات الطبية والندوات العلمية والملتقيات الأكاديمية مع إدارة لوجستية دقيقة من التخطيط حتى الختام.'
    },
    deliverables: {
      en: ['Agenda Curation', 'Faculty Management', 'Venue Contracting', 'Protocol Handling'],
      ar: ['إعداد الأجندة العلمية', 'إدارة هيئة المتحدثين', 'التعاقد مع مقرات الفعاليات', 'إدارة المراسم والبروتوكول']
    },
    image: 'assets/comprehensive-services.webp',
    metric: 'A to Z',
    metricLabel: { en: 'Full Execution', ar: 'تنفيذ متكامل' }
  },
  {
    id: 'srv-2',
    num: '02',
    title: { en: 'CME Accreditation', ar: 'الاعتماد الطبي المستمر' },
    category: { en: 'Academic Compliance', ar: 'الامتثال الأكاديمي' },
    description: {
      en: 'Securing certified Continuing Medical Education credits through recognized Egyptian and international regulatory councils for attending clinicians.',
      ar: 'اعتماد ساعات التعليم الطبي المستمر عبر المجالس والهيئات التنظيمية والطبية المصرية والدولية للأطباء المشاركين.'
    },
    deliverables: {
      en: ['Accreditation Filings', 'Attendance Auditing', 'Credit Issuance', 'Regulatory Compliance'],
      ar: ['ملفات الاعتماد الرسمي', 'تدقيق حضور الجلسات', 'إصدار شهادات الساعات', 'الامتثال للوائح التنظيمية']
    },
    image: 'assets/pulmo-event/pulmo-event-10.webp',
    metric: '100%',
    metricLabel: { en: 'Accredited Credits', ar: 'ساعات معتمدة' }
  },
  {
    id: 'srv-3',
    num: '03',
    title: { en: 'Speaker Coordination', ar: 'تنسيق المتحدثين والخبراء' },
    category: { en: 'Faculty Relations', ar: 'علاقات المتحدثين والخبراء' },
    description: {
      en: 'End-to-end hospitality, travel coordination, and presentation briefing for top international keynotes and regional healthcare leaders.',
      ar: 'إدارة شاملة لبروتوكول الضيافة وحجوزات السفر والتنسيق العلمي لكبار المتحدثين الدوليين وقادة الرعاية الصحية إقليمياً.'
    },
    deliverables: {
      en: ['VIP Hospitality', 'Travel & Flights', 'Speaker Portals', 'Session Rehearsals'],
      ar: ['ضيافة كبار الشخصيات', 'حجوزات السفر والطيران', 'بوابة إلكترونية للمتحدثين', 'بروفات الجلسات العلمية']
    },
    image: 'assets/pulmo-event/pulmo-event-23.webp',
    metric: 'Global',
    metricLabel: { en: 'Faculty Network', ar: 'شبكة خبراء عالمية' }
  },
  {
    id: 'srv-4',
    num: '04',
    title: { en: 'Registration Mgmt', ar: 'إدارة التسجيل والحضور' },
    category: { en: 'Guest Operations', ar: 'عمليات الحضور والضيوف' },
    description: {
      en: 'Digital pre-registration, automated confirmation flows, on-site barcode badge printing, and real-time delegate attendance reporting.',
      ar: 'منظومة تسجيل رقمي مسبق، وتأكيد آلي فوري، وطباعة بطاقات الحضور بالباركود الذكي في الموقع، مع تقارير حضور فورية.'
    },
    deliverables: {
      en: ['Online Delegate Portal', 'Fast Barcode Check-in', 'Smart Badges', 'Real-time Analytics'],
      ar: ['بوابة تسجيل المشاركين', 'تسجيل وصول سريع بالباركود', 'بطاقات تعريف ذكية', 'تحليلات حضور حية']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
    metric: 'Instant',
    metricLabel: { en: 'Badge Issuance', ar: 'طباعة فورية للبطاقات' }
  },
  {
    id: 'srv-5',
    num: '05',
    title: { en: 'Event Branding', ar: 'الهوية البصرية والديكور' },
    category: { en: 'Visual Identity', ar: 'الهوية البصرية والمعمارية' },
    description: {
      en: 'Architectural stage design, high-impact clinical signage, scientific poster layouts, and tailored physical exhibition collateral.',
      ar: 'تصميم هندسي لمنصات المؤتمرات، ولافتات إرشادية طبية عالية الوضوح، وقوالب البوسترات العلمية، ومطبوعات المعارض المتخصصة.'
    },
    deliverables: {
      en: ['Stage Architecture', 'Poster Design', 'Signage Systems', 'Print & Merchandise'],
      ar: ['هندسة وتصميم المسرح', 'تصميم البوسترات البحثية', 'أنظمة الإرشاد واللافتات', 'المطبوعات والمواد الدعائية']
    },
    image: 'assets/comprehensive-services.webp',
    metric: 'Bespoke',
    metricLabel: { en: 'Creative Design', ar: 'تصاميم مبتكرة وخاصة' }
  },
  {
    id: 'srv-6',
    num: '06',
    title: { en: 'Sponsorship Handling', ar: 'إدارة الرعايات والشراكات' },
    category: { en: 'Pharma Relations', ar: 'علاقات شركات الأدوية' },
    description: {
      en: 'Connecting conference committees with leading multinational pharmaceutical and medical equipment sponsors under strict compliance standards.',
      ar: 'ربط اللجان المنظمة بأكبر شركات الأدوية والمستلزمات الطبية العالمية والإقليمية وفق أعلى معايير الحوكمة والامتثال المهني.'
    },
    deliverables: {
      en: ['Sponsor Prospectus', 'Exhibition Booths', 'Compliance Audits', 'Sponsor ROI Reports'],
      ar: ['كتيب باقات الرعاية', 'أجنحة المعرض المتخصصة', 'تدقيق معايير الامتثال', 'تقارير العائد على الاستثمار']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-127.webp',
    metric: 'Top Tier',
    metricLabel: { en: 'Pharma Sponsors', ar: 'كبرى شركات الأدوية' }
  },
  {
    id: 'srv-7',
    num: '07',
    title: { en: 'Virtual & Hybrid Events', ar: 'الفعاليات الهجينة والافتراضية' },
    category: { en: 'Digital Infrastructure', ar: 'البنية التحتية الرقمية' },
    description: {
      en: 'Multi-camera scientific live streams, synchronized slide broadcasts, interactive remote Q&A, and virtual exhibition halls for remote delegates.',
      ar: 'بث مباشر متعدد الكاميرات للجلسات العلمية، وتزامن الشرائح التفاعلي، وإدارة الأسئلة عن بعد، ومعارض افتراضية متطورة.'
    },
    deliverables: {
      en: ['Live Multi-Cam Streaming', 'Interactive Q&A', 'Virtual Booths', 'HD On-Demand Replay'],
      ar: ['بث مباشر متعدد الزوايا', 'حلقات نقاش وأسئلة تفاعلية', 'أجنحة عرض افتراضية', 'مكتبة تسجيلات عالية الدقة']
    },
    image: 'assets/pulmo-event/pulmo-event-46.webp',
    metric: 'Seamless',
    metricLabel: { en: 'Hybrid Streaming', ar: 'بث هجين فائق الانسيابية' }
  },
  {
    id: 'srv-8',
    num: '08',
    title: { en: 'Digital Marketing', ar: 'التسويق الرقمي التخصصي' },
    category: { en: 'Audience Acquisition', ar: 'استقطاب الكوادر والجمهور' },
    description: {
      en: 'Data-driven promotion targeted to verified specialist medical practitioners, university professors, and pharmaceutical sector professionals.',
      ar: 'حملات تسويق رقمي مبنية على البيانات وموجهة للأطباء الأخصائيين، والأساتذة الأكاديميين، ومسؤولي قطاع الدواء.'
    },
    deliverables: {
      en: ['Medical Email Outreach', 'Targeted Campaigns', 'Social Management', 'Conversion Analytics'],
      ar: ['نشرات بريدية طبية متخصصة', 'حملات إعلانية موجهة', 'إدارة منصات التواصل', 'تحليلات قياس التحويل']
    },
    image: 'assets/engaz-event/engaz-events-3-253.webp',
    metric: 'High ROI',
    metricLabel: { en: 'Targeted Outreach', ar: 'وصول تخصصي دقيق' }
  },
  {
    id: 'srv-9',
    num: '09',
    title: { en: 'Post-Event Reporting', ar: 'تقارير وتقييم ما بعد الفعالية' },
    category: { en: 'Analytics & Audits', ar: 'التحليلات والتدقيق' },
    description: {
      en: 'Comprehensive evaluation dossiers covering attendance breakdowns, session ratings, delegate surveys, and executive financial summaries.',
      ar: 'ملفات تقييم شاملة تتضمن تفاصيل الحضور، وتقييمات الجلسات العلمية، واستطلاعات رأي المشاركين، وتقارير الأداء المالي.'
    },
    deliverables: {
      en: ['Attendance Metrics', 'Delegate Surveys', 'CME Audit Logs', 'Executive Summaries'],
      ar: ['إحصائيات الحضور الدقيقة', 'استبيانات قياس الرضا', 'سجلات تدقيق الساعات الطبية', 'التقارير التنفيذية الختامية']
    },
    image: 'assets/comprehensive-services.webp',
    metric: 'Exhaustive',
    metricLabel: { en: 'Data Insights', ar: 'رؤى بيانية متكاملة' }
  },
  {
    id: 'srv-10',
    num: '10',
    title: { en: 'IT Solutions', ar: 'الحلول البرمجية والتقنية' },
    category: { en: 'Technology Platforms', ar: 'المنصات التقنية الذكية' },
    description: {
      en: 'Custom mobile conference apps, digital abstract submission tools, electronic poster displays, and physician networking platforms.',
      ar: 'تطبيقات هواتف مخصصة للمؤتمرات، ومنظومة استقبال وتحكيم الأبحاث إلكترونياً، وشاشات عرض البوسترات الرقمية، ومنصات التواصل الطبي.'
    },
    deliverables: {
      en: ['Custom Event Apps', 'Abstract Portals', 'Digital e-Posters', 'Lead Retrieval'],
      ar: ['تطبيقات مؤتمرات مخصصة', 'بوابات تحكيم الأبحاث', 'شاشات بوسترات رقمية', 'أدوات جمع واسترجاع البيانات']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
    metric: 'Native',
    metricLabel: { en: 'Custom Software', ar: 'برمجيات مخصصة' }
  },
  {
    id: 'srv-11',
    num: '11',
    title: { en: 'On-site Logistics', ar: 'اللوجستيات والتشغيل الميداني' },
    category: { en: 'Venue Operations', ar: 'إدارة العمليات الميدانية' },
    description: {
      en: 'Rigorous management of venue flow, technical audiovisual control, catering schedules, VIP transportation, and emergency protocols.',
      ar: 'إدارة تشغيلية حازمة لمسارات القاعات، والأنظمة الصوتية والمرئية، وجداول الضيافة، ونقل كبار الضيوف، وبروتوكولات الطوارئ.'
    },
    deliverables: {
      en: ['AV Sound & Projection', 'Catering Logistics', 'VIP Transportation', 'Hall Marshalling'],
      ar: ['أنظمة الصوت وشاشات العرض', 'إدارة الضيافة والبوفيهات', 'خدمات تنقل كبار الضيوف', 'تنظيم وانسيابية القاعات']
    },
    image: 'assets/pulmo-event/pulmo-event-48.webp',
    metric: 'Flawless',
    metricLabel: { en: 'On-Site Ops', ar: 'تشغيل ميداني دقيق' }
  },
  {
    id: 'srv-12',
    num: '12',
    title: { en: 'Media Production', ar: 'الإنتاج الإعلامي والتوثيق' },
    category: { en: 'Scientific Media', ar: 'التوثيق والإعلام العلمي' },
    description: {
      en: 'High-definition video recording, medical interview segments, scientific highlights recap reels, and post-production archival.',
      ar: 'توثيق مرئي فائق الدقة، ولقاءات إعلامية مع كبار الأطباء، وتلخيصات سينمائية لأبرز المحطات العلمية، وأرشفة رقمية متكاملة.'
    },
    deliverables: {
      en: ['4K Camera Recording', 'Doctor Interviews', 'Highlights Reel', 'Full Session Archive'],
      ar: ['تصوير سينمائي بدقة 4K', 'مقابلات مع الأطباء والخبراء', 'فيديو ختامي لأبرز اللقطات', 'أرشيف رقمي كامل للجلسات']
    },
    image: 'assets/pulmo-event/pulmo-event-52.webp',
    metric: '4K Ultra',
    metricLabel: { en: 'Broadcast Quality', ar: 'جودة بث تلفزيوني' }
  }
];
