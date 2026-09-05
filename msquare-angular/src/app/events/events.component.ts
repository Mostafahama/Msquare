import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

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
  @ViewChild('spineLine') spineLine!: ElementRef<SVGLineElement>;

  private ctx!: gsap.Context;
  private mm!: gsap.MatchMedia;

  activeFilter: 'medical' | 'career' | 'community' = 'medical';

  // Photo switching state map for diagonal-wipe transitions
  activeImageMap: { [eventId: string]: { current: number; previous: number; isTransitioning: boolean } } = {};

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
      images: [],
      status: 'past',
    },
    {
      id: 'ent-2024',
      title: 'PortSaid Otolaryngology Conference',
      date: '5 September 2024',
      category: 'medical',
      description: 'A specialist ENT conference addressing the latest advances in otolaryngology, surgical interventions, and head and neck clinical care.',
      images: [],
      status: 'past',
    },
    {
      id: 'sleep-2024',
      title: 'Sleep Apnea Scientific Day',
      date: '27 June 2024',
      category: 'medical',
      description: '"Understanding Sleep Apnea: A Multidisciplinary Approach" — an expert-led scientific gathering exploring diagnosis, ventilatory support, and therapy protocols.',
      images: [],
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
      images: [],
      status: 'past',
    },
    {
      id: 'galala-fair-2026',
      title: '4th Career Fair, Galala University',
      date: '5 May 2026',
      category: 'career',
      description: "The 4th annual career fair at Galala University, connecting university graduates with leading regional healthcare and pharma organizations.",
      images: [],
      status: 'past',
    },
    {
      id: 'hue-fair-2022',
      title: 'HUE Job Fair',
      date: '2022',
      category: 'career',
      description: 'A major university job fair bringing together Horus University students and corporate recruitment leaders in medical industries.',
      images: [],
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
      images: [],
      status: 'past',
    },
    {
      id: 'street-science-2023',
      title: 'عرض شارع العلوم (Street of Science)',
      date: '2023',
      category: 'community',
      description: 'An open-air science engagement fair translating complex medical and scientific principles into interactive demonstrations for the community.',
      images: [],
      status: 'past',
    },
    {
      id: 'tekno-anniversary-2024',
      title: 'Tekno Square Academy Anniversary',
      date: '2024',
      category: 'community',
      description: "Marking one year of educational impact with Tekno Square Academy in medical sciences, technology, and applied learning.",
      images: [],
      status: 'past',
    },
    {
      id: 'skating-day-2023',
      title: 'PortSaid Skating Day',
      date: '2023',
      category: 'community',
      description: 'A civic youth wellness initiative promoting active lifestyles, preventative health habits, and sports participation across Port Said.',
      images: [],
      status: 'past',
    },
  ];

  get filteredEvents(): Event[] {
    return this.events.filter(e => e.category === this.activeFilter);
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Initialize photo switching state
    this.events.forEach(e => {
      this.activeImageMap[e.id] = { current: 0, previous: 0, isTransitioning: false };
    });
  }

  filterBy(cat: 'medical' | 'career' | 'community') {
    this.activeFilter = cat;
    // Reset image indices for this filter
    this.filteredEvents.forEach(e => {
      this.activeImageMap[e.id] = { current: 0, previous: 0, isTransitioning: false };
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
      this.setupTimelineScroll();
    }, 60);
  }

  /**
   * Signature Diagonal-Wipe Image Transition Motif (§7)
   * Shallow ~25° diagonal polygon wipe revealing the new image smoothly over the previous one.
   */
  switchImage(event: Event, targetIndex: number, stageEl?: HTMLElement) {
    const state = this.activeImageMap[event.id];
    if (!state || state.current === targetIndex || state.isTransitioning) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prevIndex = state.current;
    state.previous = prevIndex;
    state.current = targetIndex;
    state.isTransitioning = true;

    const container = stageEl || document.getElementById(`wipe-stage-${event.id}`);
    const wipingImg = container?.querySelector<HTMLElement>('.ev-wiping-img');

    if (!wipingImg || prefersReduced) {
      state.previous = targetIndex;
      state.isTransitioning = false;
      return;
    }

    // Diagonal polygon wipe ~25°: polygon(0 0, 0 0, -25% 100%, 0 100%) -> polygon(0 0, 125% 0, 100% 100%, 0 100%)
    gsap.fromTo(wipingImg,
      {
        clipPath: 'polygon(0 0, 0 0, -25% 100%, 0 100%)',
        opacity: 1
      },
      {
        clipPath: 'polygon(0 0, 125% 0, 100% 100%, 0 100%)',
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          state.previous = targetIndex;
          state.isTransitioning = false;
        }
      }
    );
  }

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Heading SplitText Line Reveal (Font Effect 1)
      if (this.evTitle?.nativeElement) {
        const splitEv = new SplitText(this.evTitle.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(splitEv.lines, {
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

      this.setupTimelineScroll();

    }, this.eventsSec.nativeElement);
  }

  private setupTimelineScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.mm?.revert();
    this.mm = gsap.matchMedia();

    // Desktop: center spine scrubbed with DrawSVG / scaleY
    this.mm.add('(min-width: 992px)', () => {
      if (this.spineLine?.nativeElement) {
        gsap.fromTo(this.spineLine.nativeElement,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.ev-timeline-wrap',
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5,
            }
          }
        );
      }

      // Date nodes active trigger on scroll
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      nodes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 65%',
          onEnter: () => node.classList.add('node-active'),
          onLeaveBack: () => node.classList.remove('node-active'),
        });
      });

      // Subtle card entrance (opacity 1 immediately for photos, translating card wrapper only)
      const cards = gsap.utils.toArray<HTMLElement>('.ev-timeline-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 35,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });
    });

    // Mobile fallback: simplified non-scrubbed vertical flow
    this.mm.add('(max-width: 991px)', () => {
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      nodes.forEach((node) => {
        node.classList.add('node-active');
      });
    });
  }

  ngOnDestroy() {
    this.mm?.revert();
    this.ctx?.revert();
  }
}

