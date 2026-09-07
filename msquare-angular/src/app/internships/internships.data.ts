import { CapabilityItem } from '../services/services.data';

export const INTERNSHIPS_DATA: CapabilityItem[] = [
  {
    id: 'int-1',
    num: '01',
    title: { en: 'Clinical Pharmacy', ar: 'الصيدلة الإكلينيكية' },
    category: { en: 'Hospital Practice', ar: 'الممارسة الإكلينيكية والمستشفيات' },
    description: {
      en: 'Comprehensive ward rotations focusing on therapeutic drug monitoring, clinical protocol adherence, and patient counseling alongside hospital consultants.',
      ar: 'تدريب سريري شامل داخل الأقسام العلاجية يركز على المراقبة الدوائية العلاجية، وتطبيق البروتوكولات السريرية، واستشارات المرضى تحت إشراف استشاريي المستشفيات.'
    },
    deliverables: {
      en: ['Bedside Rounding', 'Drug Interaction Checks', 'Dose Regimens', 'Case Presentations'],
      ar: ['المرور السريري الميداني', 'فحص التفاعلات الدوائية', 'تعديل وحساب الجرعات', 'مناقشة الحالات الطبية']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
    metric: 'Hospital',
    metricLabel: { en: 'Clinical Wards', ar: 'أقسام سريرية' }
  },
  {
    id: 'int-2',
    num: '02',
    title: { en: 'Industrial Pharmacy', ar: 'الصيدلة الصناعية والإنتاج' },
    category: { en: 'Manufacturing', ar: 'التصنيع الدوائي' },
    description: {
      en: 'Factory-floor training in pharmaceutical manufacturing units, solid dosage formulation, sterile production lines, and cleanroom protocols.',
      ar: 'تدريب عملي ميداني داخل خطوط تصنيع الأدوية، وصياغة الأشكال الصيدلانية الصلبة، ووحدات الإنتاج المعقمة، وتطبيق معايير الغرف النظيفة.'
    },
    deliverables: {
      en: ['Tablet Compression', 'Sterile Filling Lines', 'Cleanroom Standards', 'Scale-up Science'],
      ar: ['كبس وضغط الأقراص', 'خطوط التعبئة المعقمة', 'معايير الغرف النظيفة', 'علوم التوسع الإنتاجي']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
    metric: 'GMP',
    metricLabel: { en: 'Certified Facility', ar: 'منشأة معتمدة' }
  },
  {
    id: 'int-3',
    num: '03',
    title: { en: 'Medical Research', ar: 'البحث الطبي والأدلة الإكلينيكية' },
    category: { en: 'Evidence-Based Medicine', ar: 'الطب المبني على الدليل' },
    description: {
      en: 'Mentorship in clinical study design, systematic reviews, statistical methodology, and manuscript preparation for scientific journals.',
      ar: 'إشراف علمي متقدم على تصميم الدراسات السريرية، والمراجعات المنهجية، والتحليل الإحصائي، وصياغة الأوراق البحثية للنشر في المجلات الدولية المحكمة.'
    },
    deliverables: {
      en: ['Clinical Study Design', 'Systematic Reviews', 'Protocol Drafting', 'Manuscript Writing'],
      ar: ['تصميم الدراسات السريرية', 'المراجعات المنهجية الشاملة', 'صياغة بروتوكول البحث', 'كتابة المقالات العلمية']
    },
    image: 'assets/pulmo-event/pulmo-event-10.webp',
    metric: 'Peer-Reviewed',
    metricLabel: { en: 'Publication Track', ar: 'مسار نشر دولي' }
  },
  {
    id: 'int-4',
    num: '04',
    title: { en: 'Laboratory Science', ar: 'التحاليل والعلوم المعملية' },
    category: { en: 'Diagnostic Testing', ar: 'الفحوصات التشخيصية' },
    description: {
      en: 'Advanced hematology, clinical biochemistry assays, automated diagnostic analyzers, and sample quality control protocols.',
      ar: 'تدريب متقدم على فحوصات أمراض الدم، والكيمياء الحيوية السريرية، وتشغيل أجهزة التحليل الآلية، وتطبيق بروتوكولات ضبط جودة العينات.'
    },
    deliverables: {
      en: ['Automated Analyzers', 'Biochemical Assays', 'Calibration Testing', 'Pathology Reviews'],
      ar: ['أجهزة التحليل المؤتمتة', 'المقايسات البيوكيميائية', 'اختبارات المعايرة والجودة', 'مراجعة نتائج الفحوصات']
    },
    image: 'assets/pulmo-event/pulmo-event-23.webp',
    metric: 'Hands-on',
    metricLabel: { en: 'Lab Rotations', ar: 'تدريب معملي مكثف' }
  },
  {
    id: 'int-5',
    num: '05',
    title: { en: 'Sales & Marketing', ar: 'المبيعات والتسويق الدوائي' },
    category: { en: 'Commercial Pharma', ar: 'القطاع التجاري والتسويق' },
    description: {
      en: 'Strategic healthcare commercial detailing, physician communication techniques, territory market research, and ethical medical marketing.',
      ar: 'مهارات العرض الترويجي العلمي التخصصي، وتقنيات التواصل الطبي الفعال مع الأطباء، ودراسة الأسواق الإقليمية، وأخلاقيات التسويق الدوائي.'
    },
    deliverables: {
      en: ['Physician Detailing', 'Market Analytics', 'Product Launches', 'Scientific Messaging'],
      ar: ['التواصل العلمي مع الأطباء', 'تحليلات السوق الدوائي', 'إطلاق المنتجات الطبية', 'صياغة الرسائل العلمية']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-127.webp',
    metric: 'Strategic',
    metricLabel: { en: 'Industry Detailing', ar: 'تمثيل علمي استراتيجي' }
  },
  {
    id: 'int-6',
    num: '06',
    title: { en: 'Regulatory Affairs', ar: 'الشؤون التنظيمية والتسجيل الدوائي' },
    category: { en: 'Health Authorities', ar: 'الهيئات الصحية والتنظيمية' },
    description: {
      en: 'Navigating national health authority filings, generic dossier registration (CTD format), and pharmaceutical compliance guidelines.',
      ar: 'دراسة إجراءات هيئات الدواء والاشتراطات الرسمية، وتجهيز ملفات تسجيل الأدوية بالصيغة الدولية الموحدة (CTD)، والامتثال للوائح المنظمة.'
    },
    deliverables: {
      en: ['CTD Dossier Assembly', 'Registration Files', 'Health Authority Liaison', 'Label Compliance'],
      ar: ['إعداد ملفات CTD الفنية', 'إجراءات التسجيل الدوائي', 'التنسيق مع هيئة الدواء', 'مطابقة النشرات والعبوات']
    },
    image: 'assets/comprehensive-services.webp',
    metric: 'National',
    metricLabel: { en: 'Authority Filings', ar: 'ملفات تسجيل معتمدة' }
  },
  {
    id: 'int-7',
    num: '07',
    title: { en: 'Quality Assurance', ar: 'توكيد الجودة والرقابة' },
    category: { en: 'Standards & Audits', ar: 'معايير التصنيع والتدقيق' },
    description: {
      en: 'Good Manufacturing Practice (GMP) validation, standard operating procedures (SOPs), deviations handling, and facility inspection readiness.',
      ar: 'تطبيق معايير التصنيع الجيد (GMP)، وإعداد ومراجعة إجراءات التشغيل القياسية (SOPs)، وإدارة الانحرافات التشغيلية، والجاهزية للتفتيش الدوري.'
    },
    deliverables: {
      en: ['SOP Verification', 'Batch Auditing', 'Deviation Controls', 'Validation Tests'],
      ar: ['تدقيق إجراءات التشغيل SOP', 'مراجعة سجلات التشغيلات', 'إدارة الانحرافات وضبطها', 'اختبارات التحقق والتأهيل']
    },
    image: 'assets/pulmo-event/pulmo-event-23.webp',
    metric: 'Standard',
    metricLabel: { en: 'GMP Verification', ar: 'مطابقة معايير GMP' }
  },
  {
    id: 'int-8',
    num: '08',
    title: { en: 'Pharmacovigilance', ar: 'اليقظة الدوائية وسلامة المرضى' },
    category: { en: 'Patient Safety', ar: 'سلامة المرضى ومأمونية الدواء' },
    description: {
      en: 'Systematic adverse drug reaction reporting, global safety database entry, signal detection, and risk-benefit evaluation.',
      ar: 'رصد وتوثيق الآثار الجانبية للأدوية، وإدخال بيانات السلامة في المنظومات العالمية، واكتشاف الإشارات التحذيرية، وتقييم المنافع والمخاطر.'
    },
    deliverables: {
      en: ['ADR Case Intake', 'Periodic Safety Reports', 'Signal Detection', 'Risk Plans'],
      ar: ['استقبال بلاغات الآثار الجانبية', 'تقارير السلامة الدورية', 'اكتشاف الإشارات الدوائية', 'خطط إدارة المخاطر']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
    metric: 'Safety',
    metricLabel: { en: 'Global Standards', ar: 'معايير سلامة عالمية' }
  },
  {
    id: 'int-9',
    num: '09',
    title: { en: 'Health Economics', ar: 'اقتصاديات الصحة وتقييم العلاج' },
    category: { en: 'Outcomes Research', ar: 'أبحاث المخرجات الصحية' },
    description: {
      en: 'Cost-effectiveness modeling, healthcare resource allocation models, and pharmacoeconomic value proposition documentation.',
      ar: 'نماذج قياس الفعالية مقابل التكلفة، وتوزيع الموارد الصحية، وصياغة ملفات القيمة الاقتصادية للأدوية والعلاجات الحديثة.'
    },
    deliverables: {
      en: ['Cost-Utility Models', 'Budget Impact Tools', 'Pricing Submissions', 'Reimbursement Filings'],
      ar: ['نماذج المنفعة والتكلفة', 'تحليل الأثر على الميزانية', 'ملفات التسعير الدوائي', 'متطلبات التغطية والتأمين']
    },
    image: 'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
    metric: 'Outcomes',
    metricLabel: { en: 'Value Modeling', ar: 'نماذج القيمة الاقتصادية' }
  },
  {
    id: 'int-10',
    num: '10',
    title: { en: 'Medical Training', ar: 'التدريب الطبي والمحاكاة' },
    category: { en: 'Educational Sim', ar: 'المحاكاة والتعليم الطبي' },
    description: {
      en: 'Practical training workshops, clinical skill simulations, and continuing medical education delivery under expert supervision.',
      ar: 'ورش عمل تدريبية تفاعلية، ومحاكاة المهارات السريرية، والمشاركة في تقديم برامج التعليم الطبي المستمر بإشراف نخبة من الأكاديميين.'
    },
    deliverables: {
      en: ['Simulation Practice', 'Clinical Workshops', 'Objective Skills Testing', 'Trainer Mentorship'],
      ar: ['تدريبات المحاكاة السريرية', 'ورش العمل الإكلينيكية', 'اختبارات قياس المهارات', 'إشراف وتوجيه المدربين']
    },
    image: 'assets/pulmo-event/pulmo-event-46.webp',
    metric: 'Accredited',
    metricLabel: { en: 'Skill Workshops', ar: 'ورش تدريبية معتمدة' }
  },
  {
    id: 'int-11',
    num: '11',
    title: { en: 'Pharmaceutical Chemistry', ar: 'الكيمياء الصيدلية والتحليلية' },
    category: { en: 'Analytical Testing', ar: 'الفحوصات والتحاليل الدوائية' },
    description: {
      en: 'Hands-on HPLC chromatography, spectrophotometry assays, dissolution testing, and raw material active ingredient identification.',
      ar: 'تدريب عملي على أجهزة الفصل الكروماتوجرافي HPLC، والقياس الطيفي الضوئي، واختبارات الذوبان، وتحليل المواد الخام الفعالة.'
    },
    deliverables: {
      en: ['HPLC Chromatography', 'Dissolution Profiles', 'UV-Vis Spectroscopy', 'Raw Material Assay'],
      ar: ['كروماتوجرافيا السائل HPLC', 'دراسات معدلات الذوبان', 'مطيافية الأشعة UV-Vis', 'تحليل نقاوة المواد الخام']
    },
    image: 'assets/pulmo-event/pulmo-event-48.webp',
    metric: 'Analytical',
    metricLabel: { en: 'HPLC Testing', ar: 'تحاليل HPLC متقدمة' }
  },
  {
    id: 'int-12',
    num: '12',
    title: { en: 'Statistical Analysis', ar: 'التحليل الإحصائي الحيوي' },
    category: { en: 'Biostatistics', ar: 'الإحصاء الحيوي الطبي' },
    description: {
      en: 'Clinical trial statistical programming, epidemiological dataset management, regression models, and survival curves in SPSS/R.',
      ar: 'البرمجة الإحصائية لنتائج التجارب السريرية، وإدارة قواعد بيانات الأوبئة، ونماذج الانحدار، وتحليلات البقاء عبر حزم SPSS و R.'
    },
    deliverables: {
      en: ['SPSS & R Modeling', 'Survival Analyses', 'Epidemiology Datasets', 'Hypothesis Testing'],
      ar: ['التحليل عبر SPSS و R', 'منحنيات تحليل البقاء', 'قواعد بيانات الأوبئة', 'اختبار الفرضيات الإحصائية']
    },
    image: 'assets/engaz-event/engaz-events-3-253.webp',
    metric: 'Rigorous',
    metricLabel: { en: 'Bio-Statistics', ar: 'إحصاء حيوي متقدم' }
  }
];
