import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface Event {
  id: string;
  title: string;
  date: string;
  category: 'medical' | 'career' | 'community';
  description: string;
  images: string[];
  status: 'past' | 'upcoming';
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('eventsSec') eventsSec!: ElementRef<HTMLElement>;
  @ViewChild('evTitle') evTitle!: ElementRef<HTMLElement>;
  @ViewChild('cinematicStage') cinematicStage!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  activeFilter: 'medical' | 'career' | 'community' = 'medical';
  activeEventIndex: number = 0;
  activeImageIndex: number = 0;
  previousImage: string = '';

  readonly events: Event[] = [
    // ── Medical & Scientific Conferences ─────────────────────────
    {
      id: 'pulmo-2025',
      title: 'Pulmo PortSaid Conference',
      date: '18 April 2025',
      category: 'medical',
      description: 'A premier pulmonology conference bringing together leading respiratory specialists for clinical updates, masterclasses, and hands-on diagnostic sessions.',
      images: [
        'assets/pulmo event/Pulmo event-10.webp',
        'assets/pulmo event/Pulmo event-23.webp',
        'assets/pulmo event/Pulmo event-46.webp',
        'assets/pulmo event/Pulmo event-48.webp',
        'assets/pulmo event/Pulmo event-52.webp',
      ],
      status: 'past',
    },
    {
      id: 'pulmo-2026',
      title: 'Pulmo PortSaid II',
      date: '23–24 April 2026',
      category: 'medical',
      description: 'The second edition of the acclaimed pulmonology conference, featuring expanded multidisciplinary sessions, international keynotes, and clinical workshops.',
      images: [
        'assets/pulmo event/Pulmo event-46.webp',
        'assets/pulmo event/Pulmo event-48.webp'
      ],
      status: 'past',
    },
    {
      id: 'ent-2024',
      title: 'PortSaid Otolaryngology Conference',
      date: '5 September 2024',
      category: 'medical',
      description: 'A specialist ENT conference addressing the latest advances in otolaryngology, surgical interventions, and head and neck clinical care.',
      images: [
        'assets/pulmo event/Pulmo event-23.webp'
      ],
      status: 'past',
    },
    {
      id: 'sleep-2024',
      title: 'Sleep Apnea Scientific Day',
      date: '27 June 2024',
      category: 'medical',
      description: '"Understanding Sleep Apnea: A Multidisciplinary Approach" — an expert-led scientific gathering exploring diagnosis, ventilatory support, and therapy protocols.',
      images: [
        'assets/pulmo event/Pulmo event-52.webp'
      ],
      status: 'past',
    },
    // ── Career, Internship & Job Fairs ────────────────────────────
    {
      id: 'pharmacy-career-2',
      title: 'Pharmacy Career Spot II',
      date: '11 April 2025',
      category: 'career',
      description: 'Connecting future clinical pharmacists with top multinational pharmaceutical manufacturers, regulatory leaders, and clinical training directors.',
      images: [
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-16.webp',
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-127.webp',
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-139.webp',
      ],
      status: 'past',
    },
    {
      id: 'pharmacy-career-1',
      title: 'Pharmacy Career Spot I',
      date: '1 March 2024',
      category: 'career',
      description: 'The inaugural Pharmacy Career Spot convening students and pharmacy leaders to map emerging career pathways in healthcare.',
      images: [
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-127.webp',
      ],
      status: 'past',
    },
    {
      id: 'galala-fair-2026',
      title: '4th Career Fair, Galala University',
      date: '5 May 2026',
      category: 'career',
      description: "The 4th annual career fair at Galala University, connecting university graduates with leading regional healthcare and pharma organizations.",
      images: [
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-139.webp',
      ],
      status: 'past',
    },
    {
      id: 'hue-fair-2022',
      title: 'HUE Job Fair',
      date: '2022',
      category: 'career',
      description: 'A major university job fair bringing together Horus University students and corporate recruitment leaders in medical industries.',
      images: [
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-16.webp',
      ],
      status: 'past',
    },
    // ── Community, Youth & CSR Initiatives ───────────────────────
    {
      id: 'engaz-2025',
      title: 'ENGAZ PortSaid Celebrations',
      date: '26–27 December 2025',
      category: 'community',
      description: 'A benchmark civic celebration honoring regional milestones and youth initiatives through interactive assemblies and community networking.',
      images: [
        'assets/engaz event/Engaz Events 3-253.webp',
        'assets/engaz event/Engaz Events 3.1-12.webp',
        'assets/engaz event/Engaz Events 3.1-27.webp',
        'assets/engaz event/Engaz Events 3.1-53.webp',
        'assets/engaz event/Engaz Events 3.1-6.webp',
      ],
      status: 'past',
    },
    {
      id: 'ai-learning-2025',
      title: 'نتعلم إيه وإزاي — AI Learning Exhibition',
      date: '13 June 2025',
      category: 'community',
      description: 'An educational exhibition investigating AI-era learning paradigms and digital health applications for emerging talents.',
      images: [
        'assets/engaz event/Engaz Events 3.1-12.webp',
      ],
      status: 'past',
    },
    {
      id: 'street-science-2023',
      title: 'عرض شارع العلوم (Street of Science)',
      date: '2023',
      category: 'community',
      description: 'An open-air science engagement fair translating complex medical and scientific principles into interactive demonstrations for the community.',
      images: [
        'assets/engaz event/Engaz Events 3.1-27.webp',
      ],
      status: 'past',
    },
    {
      id: 'tekno-anniversary-2024',
      title: 'Tekno Square Academy Anniversary',
      date: '2024',
      category: 'community',
      description: "Marking one year of educational impact with Tekno Square Academy in medical sciences, technology, and applied learning.",
      images: [
        'assets/engaz event/Engaz Events 3.1-53.webp',
      ],
      status: 'past',
    },
    {
      id: 'skating-day-2023',
      title: 'PortSaid Skating Day',
      date: '2023',
      category: 'community',
      description: 'A civic youth wellness initiative promoting active lifestyles, preventative health habits, and sports participation across Port Said.',
      images: [
        'assets/engaz event/Engaz Events 3.1-6.webp',
      ],
      status: 'past',
    },
  ];

  get filteredEvents(): Event[] {
    return this.events.filter(e => e.category === this.activeFilter);
  }

  get activeEvent(): Event {
    return this.filteredEvents[this.activeEventIndex] || this.filteredEvents[0];
  }

  get currentImage(): string {
    const images = this.activeEvent?.images;
    if (!images || images.length === 0) return 'assets/Comprehensive.Services.webp';
    return images[this.activeImageIndex] || images[0];
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.previousImage = this.currentImage;
  }

  filterBy(cat: 'medical' | 'career' | 'community') {
    if (this.activeFilter === cat) return;
    this.activeFilter = cat;
    this.activeEventIndex = 0;
    this.activeImageIndex = 0;
    this.triggerStageWipe();
  }

  selectEvent(index: number) {
    if (this.activeEventIndex === index) return;
    this.previousImage = this.currentImage;
    this.activeEventIndex = index;
    this.activeImageIndex = 0;
    this.triggerStageWipe();
  }

  switchImage(imgIndex: number) {
    if (this.activeImageIndex === imgIndex) return;
    this.previousImage = this.currentImage;
    this.activeImageIndex = imgIndex;
    this.triggerStageWipe();
  }

  nextEvent() {
    const nextIdx = (this.activeEventIndex + 1) % this.filteredEvents.length;
    this.selectEvent(nextIdx);
  }

  prevEvent() {
    const prevIdx = (this.activeEventIndex - 1 + this.filteredEvents.length) % this.filteredEvents.length;
    this.selectEvent(prevIdx);
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
          this.nextEvent();
        } else {
          this.prevEvent();
        }
      }
    }
  }

  /**
   * Signature Diagonal-Wipe Image Transition Motif (~25° polygon sweep)
   */
  private triggerStageWipe() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !this.cinematicStage?.nativeElement) return;

    const stage = this.cinematicStage.nativeElement;
    const wipingImg = stage.querySelector<HTMLElement>('.cin-top-img');
    const infoPanel = stage.querySelector<HTMLElement>('.cin-meta-panel');

    if (wipingImg) {
      gsap.fromTo(wipingImg,
        { clipPath: 'polygon(0 0, 0 0, -25% 100%, 0 100%)', opacity: 1 },
        {
          clipPath: 'polygon(0 0, 125% 0, 100% 100%, 0 100%)',
          duration: 0.65,
          ease: 'power3.inOut'
        }
      );
    }

    if (infoPanel) {
      gsap.fromTo(infoPanel.children,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }

  ngAfterViewInit() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // SplitText heading reveal
      if (this.evTitle?.nativeElement) {
        const split = new SplitText(this.evTitle.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.evTitle.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // Initial stage reveal
      gsap.from('.cinematic-events-stage', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cinematic-events-stage',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });
    }, this.eventsSec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
