import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Event {
  id: string;
  title: string;
  date: string;
  category: 'medical' | 'career' | 'community';
  description: string;
  images: string[];
  galleryLayout: 'mosaic' | 'grid' | 'cinema';
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

  private ctx!: gsap.Context;

  activeFilter: 'medical' | 'career' | 'community' = 'medical';

  readonly events: Event[] = [
    // ── Medical & Scientific Conferences ─────────────────────────
    {
      id: 'pulmo-2025',
      title: 'Pulmo PortSaid Conference',
      date: '18 April 2025',
      category: 'medical',
      description: 'A premier pulmonology conference bringing together leading respiratory specialists for knowledge exchange and clinical updates.',
      images: [
        'assets/pulmo event/Pulmo event-10.webp',
        'assets/pulmo event/Pulmo event-23.webp',
        'assets/pulmo event/Pulmo event-46.webp',
        'assets/pulmo event/Pulmo event-48.webp',
        'assets/pulmo event/Pulmo event-52.webp',
      ],
      galleryLayout: 'mosaic',
      status: 'past',
    },
    {
      id: 'pulmo-2026',
      title: 'Pulmo PortSaid II',
      date: '23–24 April 2026',
      category: 'medical',
      description: 'The second edition of the acclaimed pulmonology conference, featuring expanded multidisciplinary sessions and international speakers.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'ent-2024',
      title: 'PortSaid Otolaryngology Conference',
      date: '5 September 2024',
      category: 'medical',
      description: 'A specialist ENT conference addressing the latest advances in otolaryngology, head and neck surgery.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'sleep-2024',
      title: 'Sleep Apnea Scientific Day',
      date: '27 June 2024',
      category: 'medical',
      description: '"Understanding Sleep Apnea: A Multidisciplinary Approach" — an expert-led scientific day exploring diagnosis, management, and innovation.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    // ── Career, Internship & Job Fairs ────────────────────────────
    {
      id: 'pharmacy-career-1',
      title: 'Pharmacy Career Spot I',
      date: '1 March 2024',
      category: 'career',
      description: 'The inaugural Pharmacy Career Spot, connecting pharmacy students with top pharmaceutical companies and industry professionals.',
      images: [],
      galleryLayout: 'cinema',
      status: 'past',
    },
    {
      id: 'pharmacy-career-2',
      title: 'Pharmacy Career Spot II',
      date: '11 April 2025',
      category: 'career',
      description: 'Connecting pharmacy students with top pharmaceutical companies and industry professionals for career development.',
      images: [
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-16.webp',
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-127.webp',
        'assets/Pharmacy Career Spot/Pharmacy Career Spot-139.webp',
      ],
      galleryLayout: 'cinema',
      status: 'past',
    },
    {
      id: 'galala-fair-2026',
      title: '4th Career Fair, Galala University',
      date: '5 May 2026',
      category: 'career',
      description: "The 4th edition of Galala University's annual career fair, connecting graduating students with Egypt's leading employers.",
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'hue-fair-2022',
      title: 'HUE Job Fair',
      date: '2022',
      category: 'career',
      description: 'A large-scale university job fair bringing together Horus University students and top industry recruiters.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    // ── Community, Youth & CSR Initiatives ───────────────────────
    {
      id: 'engaz-2025',
      title: 'ENGAZ PortSaid Celebrations',
      date: '26–27 December 2025',
      category: 'community',
      description: 'A grand celebration event marking achievements and milestones with interactive sessions and community networking.',
      images: [
        'assets/engaz event/Engaz Events 3-253.webp',
        'assets/engaz event/Engaz Events 3.1-12.webp',
        'assets/engaz event/Engaz Events 3.1-27.webp',
        'assets/engaz event/Engaz Events 3.1-53.webp',
        'assets/engaz event/Engaz Events 3.1-6.webp',
        'assets/engaz event/Engaz Events 3.1-8.webp',
      ],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'ai-learning-2025',
      title: 'نتعلم إيه وإزاي — AI Learning Exhibition',
      date: '13 June 2025',
      category: 'community',
      description: 'An educational exhibition exploring AI-era learning frameworks for Egyptian youth, fostering digital literacy and critical thinking.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'street-science-2023',
      title: 'عرض شارع العلوم (Street of Science)',
      date: '2023',
      category: 'community',
      description: 'An immersive outdoor science exhibition bringing interactive learning experiences to the Port Said community.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'tekno-anniversary-2024',
      title: 'Tekno Square Academy Anniversary',
      date: '2024',
      category: 'community',
      description: "Celebrating one year of Tekno Square Academy's impact in STEM and professional development education.",
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
    {
      id: 'skating-day-2023',
      title: 'PortSaid Skating Day',
      date: '2023',
      category: 'community',
      description: 'A community sports and recreation event fostering youth engagement and healthy lifestyle advocacy in Port Said.',
      images: [],
      galleryLayout: 'grid',
      status: 'past',
    },
  ];

  get filteredEvents(): Event[] {
    return this.events.filter(e => e.category === this.activeFilter);
  }

  filterBy(cat: 'medical' | 'career' | 'community') {
    this.activeFilter = cat;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Section heading fade-up — single, once
      gsap.from('.ev-main-title, .ev-main-sub, .filter-pills', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.eventsSec.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Stagger each event card wrapper — not individual images inside
      gsap.from('.ev-block', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.events-scroll-container',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

    }, this.eventsSec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
