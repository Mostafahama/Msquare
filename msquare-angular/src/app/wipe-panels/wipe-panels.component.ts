import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

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

@Component({
  selector: 'app-wipe-panels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wipe-panels.component.html',
  styleUrls: ['./wipe-panels.component.scss']
})
export class WipePanelsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('explorerSec') explorerSec!: ElementRef<HTMLElement>;
  @ViewChild('secTitle') secTitle!: ElementRef<HTMLElement>;
  @ViewChild('stageVisual') stageVisual!: ElementRef<HTMLElement>;

  activeMode: 'services' | 'internships' = 'services';
  activeIndex: number = 0;
  previousImage: string = 'assets/Comprehensive.Services.webp';

  readonly services: CapabilityItem[] = [
    {
      id: 'srv-1',
      num: '01',
      title: 'Conference Planning',
      category: 'Strategic Execution',
      description: 'Turnkey organization of premier medical congresses, scientific symposia, and academic forums with meticulous logistical choreography from inception to completion.',
      deliverables: ['Agenda Curation', 'Faculty Management', 'Venue Contracting', 'Protocol Handling'],
      image: 'assets/Comprehensive.Services.webp',
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
      image: 'assets/pulmo event/Pulmo event-10.webp',
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
      image: 'assets/pulmo event/Pulmo event-23.webp',
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
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-16.webp',
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
      image: 'assets/Comprehensive.Services.webp',
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
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-127.webp',
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
      image: 'assets/pulmo event/Pulmo event-46.webp',
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
      image: 'assets/engaz event/Engaz Events 3-253.webp',
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
      image: 'assets/Comprehensive.Services.webp',
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
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-139.webp',
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
      image: 'assets/pulmo event/Pulmo event-48.webp',
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
      image: 'assets/pulmo event/Pulmo event-52.webp',
      metric: '4K Ultra',
      metricLabel: 'Broadcast Quality'
    },
  ];

  readonly internships: CapabilityItem[] = [
    {
      id: 'int-1',
      num: '01',
      title: 'Clinical Pharmacy',
      category: 'Hospital Practice',
      description: 'Comprehensive ward rotations focusing on therapeutic drug monitoring, clinical protocol adherence, and patient counseling alongside hospital consultants.',
      deliverables: ['Bedside Rounding', 'Drug Interaction Checks', 'Dose Regimens', 'Case Presentations'],
      image: 'assets/images/service-4.jpg',
      metric: 'Hospital',
      metricLabel: 'Clinical Wards'
    },
    {
      id: 'int-2',
      num: '02',
      title: 'Industrial Pharmacy',
      category: 'Manufacturing',
      description: 'Factory-floor training in pharmaceutical manufacturing units, solid dosage formulation, sterile production lines, and cleanroom protocols.',
      deliverables: ['Tablet Compression', 'Sterile Filling Lines', 'Cleanroom Standards', 'Scale-up Science'],
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-16.webp',
      metric: 'GMP',
      metricLabel: 'Certified Facility'
    },
    {
      id: 'int-3',
      num: '03',
      title: 'Medical Research',
      category: 'Evidence-Based Medicine',
      description: 'Mentorship in clinical study design, systematic reviews, statistical methodology, and manuscript preparation for scientific journals.',
      deliverables: ['Clinical Study Design', 'Systematic Reviews', 'Protocol Drafting', 'Manuscript Writing'],
      image: 'assets/pulmo event/Pulmo event-10.webp',
      metric: 'Peer-Reviewed',
      metricLabel: 'Publication Track'
    },
    {
      id: 'int-4',
      num: '04',
      title: 'Laboratory Science',
      category: 'Diagnostic Testing',
      description: 'Advanced hematology, clinical biochemistry assays, automated diagnostic analyzers, and sample quality control protocols.',
      deliverables: ['Automated Analyzers', 'Biochemical Assays', 'Calibration Testing', 'Pathology Reviews'],
      image: 'assets/images/service-4.jpg',
      metric: 'Hands-on',
      metricLabel: 'Lab Rotations'
    },
    {
      id: 'int-5',
      num: '05',
      title: 'Sales & Marketing',
      category: 'Commercial Pharma',
      description: 'Strategic healthcare commercial detailing, physician communication techniques, territory market research, and ethical medical marketing.',
      deliverables: ['Physician Detailing', 'Market Analytics', 'Product Launches', 'Scientific Messaging'],
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-127.webp',
      metric: 'Strategic',
      metricLabel: 'Industry Detailing'
    },
    {
      id: 'int-6',
      num: '06',
      title: 'Regulatory Affairs',
      category: 'Health Authorities',
      description: 'Navigating national health authority filings, generic dossier registration (CTD format), and pharmaceutical compliance guidelines.',
      deliverables: ['CTD Dossier Assembly', 'Registration Files', 'Health Authority Liaison', 'Label Compliance'],
      image: 'assets/Comprehensive.Services.webp',
      metric: 'National',
      metricLabel: 'Authority Filings'
    },
    {
      id: 'int-7',
      num: '07',
      title: 'Quality Assurance',
      category: 'Standards & Audits',
      description: 'Good Manufacturing Practice (GMP) validation, standard operating procedures (SOPs), deviations handling, and facility inspection readiness.',
      deliverables: ['SOP Verification', 'Batch Auditing', 'Deviation Controls', 'Validation Tests'],
      image: 'assets/pulmo event/Pulmo event-23.webp',
      metric: 'Standard',
      metricLabel: 'GMP Verification'
    },
    {
      id: 'int-8',
      num: '08',
      title: 'Pharmacovigilance',
      category: 'Patient Safety',
      description: 'Systematic adverse drug reaction reporting, global safety database entry, signal detection, and risk-benefit evaluation.',
      deliverables: ['ADR Case Intake', 'Periodic Safety Reports', 'Signal Detection', 'Risk Plans'],
      image: 'assets/images/service-4.jpg',
      metric: 'Safety',
      metricLabel: 'Global Standards'
    },
    {
      id: 'int-9',
      num: '09',
      title: 'Health Economics',
      category: 'Outcomes Research',
      description: 'Cost-effectiveness modeling, healthcare resource allocation models, and pharmacoeconomic value proposition documentation.',
      deliverables: ['Cost-Utility Models', 'Budget Impact Tools', 'Pricing Submissions', 'Reimbursement Filings'],
      image: 'assets/Pharmacy Career Spot/Pharmacy Career Spot-139.webp',
      metric: 'Outcomes',
      metricLabel: 'Value Modeling'
    },
    {
      id: 'int-10',
      num: '10',
      title: 'Medical Training',
      category: 'Educational Sim',
      description: 'Practical training workshops, clinical skill simulations, and continuing medical education delivery under expert supervision.',
      deliverables: ['Simulation Practice', 'Clinical Workshops', 'Objective Skills Testing', 'Trainer Mentorship'],
      image: 'assets/pulmo event/Pulmo event-46.webp',
      metric: 'Accredited',
      metricLabel: 'Skill Workshops'
    },
    {
      id: 'int-11',
      num: '11',
      title: 'Pharmaceutical Chemistry',
      category: 'Analytical Testing',
      description: 'Hands-on HPLC chromatography, spectrophotometry assays, dissolution testing, and raw material active ingredient identification.',
      deliverables: ['HPLC Chromatography', 'Dissolution Profiles', 'UV-Vis Spectroscopy', 'Raw Material Assay'],
      image: 'assets/images/service-4.jpg',
      metric: 'Analytical',
      metricLabel: 'HPLC Testing'
    },
    {
      id: 'int-12',
      num: '12',
      title: 'Statistical Analysis',
      category: 'Biostatistics',
      description: 'Clinical trial statistical programming, epidemiological dataset management, regression models, and survival curves in SPSS/R.',
      deliverables: ['SPSS & R Modeling', 'Survival Analyses', 'Epidemiology Datasets', 'Hypothesis Testing'],
      image: 'assets/engaz event/Engaz Events 3-253.webp',
      metric: 'Rigorous',
      metricLabel: 'Bio-Statistics'
    },
  ];

  get currentItems(): CapabilityItem[] {
    return this.activeMode === 'services' ? this.services : this.internships;
  }

  get activeItem(): CapabilityItem {
    return this.currentItems[this.activeIndex] || this.currentItems[0];
  }

  private ctx!: gsap.Context;

  setMode(mode: 'services' | 'internships') {
    if (this.activeMode === mode) return;
    this.activeMode = mode;
    this.previousImage = this.activeItem.image;
    this.activeIndex = 0;
    this.triggerStageTransition();
  }

  selectItem(index: number) {
    if (this.activeIndex === index) return;
    this.previousImage = this.activeItem.image;
    this.activeIndex = index;
    this.triggerStageTransition();
  }

  prevItem() {
    const len = this.currentItems.length;
    const newIdx = (this.activeIndex - 1 + len) % len;
    this.selectItem(newIdx);
  }

  nextItem() {
    const len = this.currentItems.length;
    const newIdx = (this.activeIndex + 1) % len;
    this.selectItem(newIdx);
  }

  private touchStartX = 0;
  private touchStartY = 0;

  onTouchStart(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }

  onTouchEnd(e: TouchEvent) {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - this.touchStartX;
      const diffY = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          this.nextItem();
        } else {
          this.prevItem();
        }
      }
    }
  }

  private triggerStageTransition() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !this.stageVisual?.nativeElement) return;

    const stage = this.stageVisual.nativeElement;
    const topImg = stage.querySelector<HTMLElement>('.stage-top-img');
    const contentBox = stage.querySelector<HTMLElement>('.stage-content-box');

    if (topImg) {
      // Signature ~25° diagonal wipe transition motif
      gsap.fromTo(topImg,
        { clipPath: 'polygon(0 0, 0 0, -25% 100%, 0 100%)', opacity: 1 },
        {
          clipPath: 'polygon(0 0, 125% 0, 100% 100%, 0 100%)',
          duration: 0.65,
          ease: 'power3.inOut'
        }
      );
    }

    if (contentBox) {
      gsap.fromTo(contentBox.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }

  ngAfterViewInit() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Section title reveal safely
      if (this.secTitle?.nativeElement) {
        gsap.fromTo(this.secTitle.nativeElement,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.secTitle.nativeElement,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            },
            clearProps: 'all'
          }
        );
      }

      // Stagger in selector list items on initial entrance safely
      const listItems = this.explorerSec?.nativeElement.querySelectorAll('.sv-explore-item');
      if (listItems && listItems.length > 0) {
        gsap.fromTo(listItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.explorerSec.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            clearProps: 'all'
          }
        );
      }
    }, this.explorerSec?.nativeElement ?? undefined);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}

