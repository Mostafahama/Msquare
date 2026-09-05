import { Component, AfterViewInit, OnDestroy, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-wipe-panels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wipe-panels.component.html',
  styleUrls: ['./wipe-panels.component.scss']
})
export class WipePanelsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('servicesSec') servicesSec!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('badge') badges!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('internSec') internSec!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('inLeft') inLeft!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('inRight') inRight!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('svTitle') svTitle!: ElementRef<HTMLElement>;
  @ViewChild('inTitle') inTitle!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        return;
      }

      // ── Font Effect (a): SplitText line reveal on Services heading
      if (this.svTitle?.nativeElement) {
        const splitSv = new SplitText(this.svTitle.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(splitSv.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.svTitle.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // ── Font Effect (a): SplitText line reveal on Internships heading
      if (this.inTitle?.nativeElement) {
        const splitIn = new SplitText(this.inTitle.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(splitIn.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.inTitle.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // ── Section 3 Storytelling: Internships Two-Speed Parallax (Desktop)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Organic shape photo moves slightly slower
        gsap.to('.in-organic-shape', {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Top glass card floats downward
        gsap.to('.in-glass-top', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Bottom glass card floats upward
        gsap.to('.in-glass-bottom', {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set(['.in-organic-shape', '.in-glass-top', '.in-glass-bottom'], { clearProps: 'all' });
      });

      /* ─── SERVICES: subtitle fade up ─── */
      gsap.from('.sv2-sub', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sv2-sub',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      /* ─── SERVICES: badges stagger in ─── */
      const badgeEls = this.badges.toArray().map(b => b.nativeElement);
      gsap.from(badgeEls, {
        y: 28,
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: '.sv2-grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });

      /* ─── INTERNSHIPS: left & right columns entrance ─── */
      const inLeftEl = this.inLeft.first?.nativeElement;
      if (inLeftEl) {
        gsap.from(inLeftEl, {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      }

      const inRightEl = this.inRight.first?.nativeElement;
      if (inRightEl) {
        gsap.from(inRightEl, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      }

      /* ─── INTERNSHIPS: discipline badges stagger in ─── */
      gsap.from('.in-grid span', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.in-grid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      });

    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
