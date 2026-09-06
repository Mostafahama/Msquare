import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export interface ValueItem {
  num: string;
  title: string;
  description: string;
}

export const VALUES_DATA: ValueItem[] = [
  {
    num: '01',
    title: 'Excellence',
    description: 'Top-quality, detail-driven events that exceed expectations every time.'
  },
  {
    num: '02',
    title: 'Integrity',
    description: 'Honesty and full transparency in every relationship and decision.'
  },
  {
    num: '03',
    title: 'Innovation',
    description: 'Fresh ideas and smart technology applied to healthcare event design.'
  },
  {
    num: '04',
    title: 'Collaboration',
    description: 'Stronger outcomes through meaningful partnerships and real teamwork.'
  },
  {
    num: '05',
    title: 'Impact',
    description: 'Making a measurable difference in the healthcare and pharma industries.'
  },
  {
    num: '06',
    title: 'Lifelong Learning',
    description: 'We support continuous growth and knowledge sharing at every career stage.'
  }
];

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('identitySec') identitySec!: ElementRef<HTMLElement>;
  @ViewChild('leftCol') leftCol!: ElementRef<HTMLElement>;
  @ViewChild('vmHeading') vmHeading!: ElementRef<HTMLElement>;
  @ViewChild('vmLine') vmLine!: ElementRef<HTMLElement>;
  @ViewChild('valuesSpineFill') valuesSpineFill!: ElementRef<HTMLElement>;

  readonly values: ValueItem[] = VALUES_DATA;
  private ctx!: gsap.Context;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.set([this.vmLine?.nativeElement, this.valuesSpineFill?.nativeElement], { scaleY: 1 });
          return;
        }

        const secEl = this.identitySec.nativeElement;
        const items = Array.from(secEl.querySelectorAll<HTMLElement>('.value-item'));

        // ── Font Effect (a): SplitText line reveal on heading ─────
        if (this.vmHeading?.nativeElement) {
          const split = new SplitText(this.vmHeading.nativeElement, { type: 'lines', mask: 'lines' });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.vmHeading.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        }

        // ── Value Items Hover Micro-Animations ──────────────────
        items.forEach(item => {
          const num = item.querySelector<HTMLElement>('.val-num');
          if (num) {
            item.addEventListener('mouseenter', () => {
              gsap.to(num, { color: '#B8860B', scale: 1.12, duration: 0.25, overwrite: 'auto' });
            });
            item.addEventListener('mouseleave', () => {
              if (!item.classList.contains('val-active')) {
                gsap.to(num, { color: '#E8E8E8', scale: 1, duration: 0.25, overwrite: 'auto' });
              }
            });
          }
        });

        // ── Section 3 Storytelling: Responsive scrubbed rules ───
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
          // Storytelling moment 1: VM connector rule draws downward
          if (this.vmLine?.nativeElement) {
            gsap.fromTo(this.vmLine.nativeElement,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.vm-cards',
                  start: 'top 75%',
                  end: 'bottom 60%',
                  scrub: 1,
                }
              }
            );
          }

          // Storytelling moment 2: Values spine fills downward as user scrolls through values
          if (this.valuesSpineFill?.nativeElement) {
            gsap.fromTo(this.valuesSpineFill.nativeElement,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.values-grid',
                  start: 'top 80%',
                  end: 'bottom 55%',
                  scrub: 1,
                }
              }
            );
          }

          // Active state toggles on each value item
          items.forEach(item => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 78%',
              end: 'bottom 30%',
              toggleClass: 'val-active',
            });
          });
        });

        mm.add('(max-width: 1023px)', () => {
          // Values spine fills downward on mobile
          if (this.valuesSpineFill?.nativeElement) {
            gsap.fromTo(this.valuesSpineFill.nativeElement,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.values-grid',
                  start: 'top 75%',
                  end: 'bottom 50%',
                  scrub: 1,
                }
              }
            );
          }

          // Active state toggles on mobile
          items.forEach(item => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleClass: 'val-active',
            });
          });
        });

        // Value items initial entrance stagger safely
        if (items.length > 0) {
          gsap.fromTo(items,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.values-grid',
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
              },
              clearProps: 'all'
            }
          );
        }

        ScrollTrigger.refresh();
      }, this.identitySec.nativeElement);
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
