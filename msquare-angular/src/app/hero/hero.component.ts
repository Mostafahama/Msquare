import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone, ChangeDetectorRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButtonDirective, DrawSvgButtonDirective } from '../shared/button-fx.directive';
import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective, DrawSvgButtonDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroBgWrap') heroBgWrap!: ElementRef<HTMLElement>;
  @ViewChild('heroBgImg') heroBgImg!: ElementRef<HTMLElement>;
  @ViewChild('heroOverlay') heroOverlay!: ElementRef<HTMLElement>;
  @ViewChild('heroContent') heroContent!: ElementRef<HTMLElement>;
  @ViewChild('heroTitle') heroTitle!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('heroActions') heroActions!: ElementRef<HTMLElement>;
  @ViewChild('heroScroll') heroScroll!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  private currentSplit: SplitText | null = null;
  private isInitialized = false;

  constructor(
    public lang: LanguageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      // Re-trigger text reveal smoothly when language changes
      const current = this.lang.currentLang();
      if (this.isInitialized) {
        this.cdr.detectChanges();
        this.animateTextOnLanguageChange();
      }
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(this.heroContent.nativeElement, { opacity: 1, y: 0 });
        gsap.set(this.heroSub.nativeElement, { opacity: 0.92, y: 0, filter: 'blur(0px)' });
        gsap.set(this.heroActions.nativeElement, { opacity: 1, y: 0 });
        gsap.set(this.heroBgImg.nativeElement, { scale: 1 });
        return;
      }

      // ── New 2026 Luxury Ethereal Blur-Up Reveal for Hero Title ─
      this.currentSplit = new SplitText(this.heroTitle.nativeElement.querySelectorAll('.hero-line'), {
        type: 'words'
      });
      const split = this.currentSplit;

      gsap.set(split.words, {
        y: 45,
        opacity: 0,
        filter: 'blur(16px)',
        scale: 1.05,
        transformOrigin: '50% 100%'
      });

      gsap.set(this.heroSub.nativeElement, {
        opacity: 0,
        y: 25,
        filter: 'blur(12px)'
      });

      gsap.set(this.heroActions.nativeElement, {
        opacity: 0,
        y: 20
      });

      const heroTL = gsap.timeline();

      // Background slow subtle settle
      heroTL.to(this.heroBgImg.nativeElement, {
        scale: 1,
        duration: 3,
        ease: 'power2.out'
      }, 0);

      // Words cinematic focus-in
      heroTL.to(split.words, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.15,
        stagger: 0.08,
        ease: 'power3.out'
      }, 0.15);

      // Subtitle soft focus-in
      heroTL.to(this.heroSub.nativeElement, {
        y: 0,
        opacity: 0.92,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out'
      }, 0.55);

      // Action buttons smooth entrance
      heroTL.to(this.heroActions.nativeElement, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 0.85);

      // ── Contained Hero Scroll Scale-Down (Desktop Only, Never bleeds into next section)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Hero image shrinks cleanly into a rounded frame WITHIN the hero section as user scrolls
        gsap.to(this.heroBgWrap.nativeElement, {
          scale: 0.88,
          borderRadius: '32px',
          boxShadow: '0 28px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 168, 83, 0.25)',
          ease: 'none',
          scrollTrigger: {
            trigger: this.heroSection.nativeElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Content fades and drifts up smoothly as hero scrolls
        gsap.to(this.heroContent.nativeElement, {
          yPercent: -40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: this.heroSection.nativeElement,
            start: 'top top',
            end: '70% top',
            scrub: 1,
          }
        });

        // Scroll prompt fades quickly
        gsap.to(this.heroScroll.nativeElement, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: this.heroSection.nativeElement,
            start: 'top top',
            end: '25% top',
            scrub: 1,
          }
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set([this.heroBgWrap.nativeElement, this.heroContent.nativeElement, this.heroBgImg.nativeElement], {
          clearProps: 'all'
        });
      });

      this.isInitialized = true;
    }, this.heroSection.nativeElement);
    });
  }

  private animateTextOnLanguageChange() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.currentSplit) {
        this.currentSplit.revert();
        this.currentSplit = null;
      }

      const lines = this.heroTitle.nativeElement.querySelectorAll('.hero-line');
      if (prefersReducedMotion) {
        gsap.set(lines, { opacity: 1, y: 0, filter: 'none' });
        return;
      }

      this.currentSplit = new SplitText(lines, { type: 'words' });
      gsap.fromTo(this.currentSplit.words, 
        { y: 24, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, stagger: 0.035, ease: 'power3.out' }
      );
    });
  }

  ngOnDestroy() {
    this.currentSplit?.revert();
    this.ctx?.revert();
  }
}

