import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('identitySec') identitySec!: ElementRef<HTMLElement>;
  @ViewChild('leftCol') leftCol!: ElementRef<HTMLElement>;
  @ViewChild('vmHeading') vmHeading!: ElementRef<HTMLElement>;
  @ViewChild('vmLine') vmLine!: ElementRef<HTMLElement>;
  @ViewChild('valuesSpineFill') valuesSpineFill!: ElementRef<HTMLElement>;
  @ViewChildren('valueItem') valueItems!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([this.vmLine?.nativeElement, this.valuesSpineFill?.nativeElement], { scaleY: 1 });
        return;
      }

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

      // ── Section 3 Storytelling: Desktop scrubbed rules ───────
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
        const items = this.valueItems.toArray().map(r => r.nativeElement);
        items.forEach(item => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 75%',
            end: 'bottom 35%',
            toggleClass: 'val-active',
          });
        });
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile fallback: simple static presentation
        if (this.valuesSpineFill?.nativeElement) {
          gsap.set(this.valuesSpineFill.nativeElement, { scaleY: 1 });
        }
      });

      // Value items initial entrance stagger
      const items = this.valueItems.toArray().map(r => r.nativeElement);
      gsap.from(items, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

    }, this.identitySec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
