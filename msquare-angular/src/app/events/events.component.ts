import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { LanguageService } from '../core/services/language.service';

export interface Event {
  id: string;
  title: { en: string; ar: string };
  date: { en: string; ar: string };
  category: 'medical' | 'career' | 'community';
  description: { en: string; ar: string };
  images: string[];
  status: 'past' | 'upcoming';
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
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
      title: {
        en: 'Pulmo PortSaid Conference',
        ar: 'مؤتمر بورسعيد للأمراض الصدرية الأول'
      },
      date: {
        en: '18 April 2025',
        ar: '18 أبريل 2025'
      },
      category: 'medical',
      description: {
        en: 'A premier pulmonology conference bringing together leading respiratory specialists for clinical updates, masterclasses, and hands-on diagnostic sessions.',
        ar: 'مؤتمر رائد في طب الأمراض الصدرية يجمع كبار استشاريي الجهاز التنفسي لتقديم المستجدات الإكلينيكية، والمحاضرات التخصصية، وجلسات التشخيص العملي.'
      },
      images: [
        'assets/pulmo-event/pulmo-event-10.webp',
        'assets/pulmo-event/pulmo-event-23.webp',
        'assets/pulmo-event/pulmo-event-46.webp',
        'assets/pulmo-event/pulmo-event-48.webp',
        'assets/pulmo-event/pulmo-event-52.webp',
      ],
      status: 'past',
    },
    {
      id: 'pulmo-2026',
      title: {
        en: 'Pulmo PortSaid II',
        ar: 'مؤتمر بورسعيد للأمراض الصدرية الثاني'
      },
      date: {
        en: '23–24 April 2026',
        ar: '23–24 أبريل 2026'
      },
      category: 'medical',
      description: {
        en: 'The second edition of the acclaimed pulmonology conference, featuring expanded multidisciplinary sessions, international keynotes, and clinical workshops.',
        ar: 'النسخة الثانية من المؤتمر الرئوي المتميز، تتضمن جلسات متعددة التخصصات، ومتحدثين دوليين، وورش عمل إكلينيكية متطورة.'
      },
      images: [
        'assets/pulmo-event/pulmo-event-46.webp',
        'assets/pulmo-event/pulmo-event-48.webp'
      ],
      status: 'past',
    },
    {
      id: 'ent-2024',
      title: {
        en: 'PortSaid Otolaryngology Conference',
        ar: 'مؤتمر بورسعيد للأنف والأذن والحنجرة'
      },
      date: {
        en: '5 September 2024',
        ar: '5 سبتمبر 2024'
      },
      category: 'medical',
      description: {
        en: 'A specialist ENT conference addressing the latest advances in otolaryngology, surgical interventions, and head and neck clinical care.',
        ar: 'مؤتمر تخصصي في طب وجراحة الأنف والأذن والحنجرة يناقش أحدث التقنيات والتدخلات الجراحية ورعاية أورام الرأس والرقبة.'
      },
      images: [
        'assets/pulmo-event/pulmo-event-23.webp'
      ],
      status: 'past',
    },
    {
      id: 'sleep-2024',
      title: {
        en: 'Sleep Apnea Scientific Day',
        ar: 'اليوم العلمي لانقطاع التنفس أثناء النوم'
      },
      date: {
        en: '27 June 2024',
        ar: '27 يونيو 2024'
      },
      category: 'medical',
      description: {
        en: '"Understanding Sleep Apnea: A Multidisciplinary Approach" — an expert-led scientific gathering exploring diagnosis, ventilatory support, and therapy protocols.',
        ar: '"فهم انقطاع التنفس النومي: نهج متعدد التخصصات" — لقاء علمي بقيادة نخبة من الاستشاريين لبحث بروتوكولات التشخيص والدعم التنفسي.'
      },
      images: [
        'assets/pulmo-event/pulmo-event-52.webp'
      ],
      status: 'past',
    },
    // ── Career, Internship & Job Fairs ────────────────────────────
    {
      id: 'pharmacy-career-2',
      title: {
        en: 'Pharmacy Career Spot II',
        ar: 'ملتقى التوظيف الصيدلي الثاني'
      },
      date: {
        en: '11 April 2025',
        ar: '11 أبريل 2025'
      },
      category: 'career',
      description: {
        en: 'Connecting future clinical pharmacists with top multinational pharmaceutical manufacturers, regulatory leaders, and clinical training directors.',
        ar: 'ربط صيادلة المستقبل بكبرى شركات الأدوية العالمية، ومسؤولي الهيئات التنظيمية، ومديري برامج التدريب الإكلينيكي.'
      },
      images: [
        'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
        'assets/pharmacy-career-spot/pharmacy-career-spot-127.webp',
        'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
      ],
      status: 'past',
    },
    {
      id: 'pharmacy-career-1',
      title: {
        en: 'Pharmacy Career Spot I',
        ar: 'ملتقى التوظيف الصيدلي الأول'
      },
      date: {
        en: '1 March 2024',
        ar: '1 مارس 2024'
      },
      category: 'career',
      description: {
        en: 'The inaugural Pharmacy Career Spot convening students and pharmacy leaders to map emerging career pathways in healthcare.',
        ar: 'الملتقى الافتتاحي للتوظيف الصيدلي الذي جمع الطلاب وقادة قطاع الدواء لرسم المسارات المهنية الحديثة في الرعاية الصحية.'
      },
      images: [
        'assets/pharmacy-career-spot/pharmacy-career-spot-127.webp',
      ],
      status: 'past',
    },
    {
      id: 'galala-fair-2026',
      title: {
        en: '4th Career Fair, Galala University',
        ar: 'ملتقى التوظيف الرابع بجامعة الجلالة'
      },
      date: {
        en: '5 May 2026',
        ar: '5 مايو 2026'
      },
      category: 'career',
      description: {
        en: 'The 4th annual career fair at Galala University, connecting university graduates with leading regional healthcare and pharma organizations.',
        ar: 'ملتقى التوظيف السنوي الرابع بجامعة الجلالة، لتوفير فرص تدريب وتوظيف واعدة للخريجين بالتعاون مع كبرى المؤسسات الطبية والدوائية.'
      },
      images: [
        'assets/pharmacy-career-spot/pharmacy-career-spot-139.webp',
      ],
      status: 'past',
    },
    {
      id: 'hue-fair-2022',
      title: {
        en: 'HUE Job Fair',
        ar: 'ملتقى التوظيف بجامعة حورس'
      },
      date: {
        en: '2022',
        ar: '2022'
      },
      category: 'career',
      description: {
        en: 'A major university job fair bringing together Horus University students and corporate recruitment leaders in medical industries.',
        ar: 'ملتقى توظيف جامعي بارز جمع طلاب جامعة حورس بمسؤولي التوظيف في كبرى الشركات الطبية والصيدلانية.'
      },
      images: [
        'assets/pharmacy-career-spot/pharmacy-career-spot-16.webp',
      ],
      status: 'past',
    },
    // ── Community, Youth & CSR Initiatives ───────────────────────
    {
      id: 'engaz-2025',
      title: {
        en: 'ENGAZ PortSaid Celebrations',
        ar: 'احتفاليات إنجاز بورسعيد'
      },
      date: {
        en: '26–27 December 2025',
        ar: '26–27 ديسمبر 2025'
      },
      category: 'community',
      description: {
        en: 'A benchmark civic celebration honoring regional milestones and youth initiatives through interactive assemblies and community networking.',
        ar: 'احتفالية مجتمعية كبرى لتكريم الإنجازات والمبادرات الشبابية الرائدة من خلال فعاليات تفاعلية وتواصل مجتمعي واسع.'
      },
      images: [
        'assets/engaz-event/engaz-events-3-253.webp',
        'assets/engaz-event/engaz-events-3.1-12.webp',
        'assets/engaz-event/engaz-events-3.1-27.webp',
        'assets/engaz-event/engaz-events-3.1-53.webp',
        'assets/engaz-event/engaz-events-3.1-6.webp',
      ],
      status: 'past',
    },
    {
      id: 'ai-learning-2025',
      title: {
        en: 'What & How to Learn — AI Learning Exhibition',
        ar: 'نتعلم إيه وإزاي — معرض التعلم بالذكاء الاصطناعي'
      },
      date: {
        en: '13 June 2025',
        ar: '13 يونيو 2025'
      },
      category: 'community',
      description: {
        en: 'An educational exhibition investigating AI-era learning paradigms and digital health applications for emerging talents.',
        ar: 'معرض تعليمي يستعرض مفاهيم وأساليب التعلم في عصر الذكاء الاصطناعي وتطبيقات الرعاية الصحية الرقمية للمواهب الصاعدة.'
      },
      images: [
        'assets/engaz-event/engaz-events-3.1-12.webp',
      ],
      status: 'past',
    },
    {
      id: 'street-science-2023',
      title: {
        en: 'Street of Science Exhibition',
        ar: 'معرض شارع العلوم'
      },
      date: {
        en: '2023',
        ar: '2023'
      },
      category: 'community',
      description: {
        en: 'An open-air science engagement fair translating complex medical and scientific principles into interactive demonstrations for the community.',
        ar: 'معرض علمي تفاعلي في الهواء الطلق يبسط المفاهيم الطبية والعلمية المعقدة عبر تجارب ومحاكاة ممتعة للجمهور والمجتمع.'
      },
      images: [
        'assets/engaz-event/engaz-events-3.1-27.webp',
      ],
      status: 'past',
    },
    {
      id: 'tekno-anniversary-2024',
      title: {
        en: 'Tekno Square Academy Anniversary',
        ar: 'الذكرى السنوية لأكاديمية تكنوسكوير'
      },
      date: {
        en: '2024',
        ar: '2024'
      },
      category: 'community',
      description: {
        en: 'Marking one year of educational impact with Tekno Square Academy in medical sciences, technology, and applied learning.',
        ar: 'الاحتفال بعام كامل من الأثر التعليمي المتميز لأكاديمية تكنوسكوير في مجالات العلوم الطبية والتقنية والتعليم التطبيقي.'
      },
      images: [
        'assets/engaz-event/engaz-events-3.1-53.webp',
      ],
      status: 'past',
    },
    {
      id: 'skating-day-2023',
      title: {
        en: 'PortSaid Skating Day',
        ar: 'يوم التزلج ببورسعيد'
      },
      date: {
        en: '2023',
        ar: '2023'
      },
      category: 'community',
      description: {
        en: 'A civic youth wellness initiative promoting active lifestyles, preventative health habits, and sports participation across Port Said.',
        ar: 'مبادرة صحية ومجتمعية شبابية لتعزيز أسلوب الحياة النشط، والعادات الصحية الوقائية، والرياضة المجتمعية في بورسعيد.'
      },
      images: [
        'assets/engaz-event/engaz-events-3.1-6.webp',
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
    if (!images || images.length === 0) return 'assets/comprehensive-services.webp';
    return images[this.activeImageIndex] || images[0];
  }

  constructor(
    public lang: LanguageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.previousImage = this.currentImage;
  }

  ngOnInit() {
    this.preloadEventImages();
  }

  private preloadEventImages() {
    if (typeof window === 'undefined') return;
    this.ngZone.runOutsideAngular(() => {
      const allUrls = new Set<string>();
      for (const ev of this.events) {
        if (ev.images) {
          for (const img of ev.images) {
            allUrls.add(img);
          }
        }
      }
      allUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  }

  filterBy(cat: 'medical' | 'career' | 'community') {
    if (this.activeFilter === cat) return;
    this.activeFilter = cat;
    this.activeEventIndex = 0;
    this.activeImageIndex = 0;
    this.cdr.markForCheck();
    this.triggerStageWipe();
  }

  selectEvent(index: number) {
    if (this.activeEventIndex === index) return;
    this.previousImage = this.currentImage;
    this.activeEventIndex = index;
    this.activeImageIndex = 0;
    this.cdr.markForCheck();
    this.triggerStageWipe();
  }

  switchImage(imgIndex: number) {
    if (this.activeImageIndex === imgIndex) return;
    this.previousImage = this.currentImage;
    this.activeImageIndex = imgIndex;
    this.cdr.markForCheck();
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

  onImageError(event: globalThis.Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/placeholder.webp';
    }
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
    this.ngZone.runOutsideAngular(() => {
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
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
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
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
