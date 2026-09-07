import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageService } from '../core/services/language.service';

export interface Partner {
  name: string;
  nameAr?: string;
  abbr?: string;
  logoPath?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ptTitle') ptTitle!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  isPaused = false;
  activePartner: string | null = null;

  readonly partners: Partner[] = [
    // Pharmaceutical Companies
    { name: 'Novo Nordisk', nameAr: 'Novo Nordisk', abbr: 'NN' },
    { name: 'PHARCO Pharmaceuticals', nameAr: 'فاركو للأدوية', abbr: 'PHARCO' },
    { name: 'Sanofi Egypt', nameAr: 'Sanofi Egypt', abbr: 'SANOFI' },
    { name: 'Pfizer Egypt', nameAr: 'Pfizer Egypt', abbr: 'PFIZER' },
    { name: 'AstraZeneca Egypt', nameAr: 'AstraZeneca Egypt', abbr: 'AZ' },
    { name: 'Novartis Egypt', nameAr: 'Novartis Egypt', abbr: 'NOVARTIS' },
    { name: 'Abbott Egypt', nameAr: 'Abbott Egypt', abbr: 'ABBOTT' },
    { name: 'Amoun Pharmaceutical', nameAr: 'أمون للأدوية', abbr: 'AMOUN' },
    { name: 'EIPICO', nameAr: 'إيبيكو للأدوية', abbr: 'EIPICO' },
    { name: 'Hikma Pharmaceuticals', nameAr: 'حكمة للأدوية', abbr: 'HIKMA' },
    // Universities & Academic
    { name: 'Port Said University', nameAr: 'جامعة بورسعيد', abbr: 'PSU' },
    { name: 'Galala University', nameAr: 'جامعة الجلالة', abbr: 'GU' },
    { name: 'Horus University', nameAr: 'جامعة حورس', abbr: 'HUE' },
    { name: 'Suez Canal University', nameAr: 'جامعة قناة السويس', abbr: 'SCU' },
    // Professional Bodies & CME
    { name: 'Egyptian Medical Syndicate', nameAr: 'نقابة أطباء مصر', abbr: 'EMS' },
    { name: 'Egyptian Chest Society', nameAr: 'الجمعية المصرية لأمراض الصدر', abbr: 'ECS' },
    { name: 'Egyptian Society of Otolaryngology', nameAr: 'الجمعية المصرية للأنف والأذن والحنجرة', abbr: 'ESOO' },
    // Events & Media
    { name: 'Tekno Square Academy', nameAr: 'أكاديمية تكنوسكوير', abbr: 'TSA' },
    { name: 'ENGAZ Initiative', nameAr: 'مبادرة إنجاز', abbr: 'ENGAZ' },
  ];

  constructor(
    public lang: LanguageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  get marqueeRow1(): Partner[] {
    return [...this.partners, ...this.partners];
  }

  get marqueeRow2(): Partner[] {
    const reversed = [...this.partners].reverse();
    return [...reversed, ...reversed];
  }

  pauseMarquee() {
    this.isPaused = true;
    this.cdr.markForCheck();
  }

  resumeMarquee() {
    this.isPaused = false;
    this.cdr.markForCheck();
  }

  selectPartner(name: string) {
    this.activePartner = this.activePartner === name ? null : name;
    this.cdr.markForCheck();
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.ctx = gsap.context(() => {
        if (prefersReducedMotion) return;

        // Heading reveal without DOM-mutilating SplitText
        if (this.ptTitle?.nativeElement) {
          gsap.from(this.ptTitle.nativeElement, {
            y: 30,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.ptTitle.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        }

        // Subtitle fade-up
        gsap.from('.partners-sub', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.partners-sub',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });

        // Subtle scroll velocity reaction on marquee tracks
        ScrollTrigger.create({
          trigger: '#partners',
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = self.getVelocity();
            const skew = gsap.utils.clamp(-3, 3, v / 500);
            gsap.to('.marquee-track', {
              skewX: skew,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
