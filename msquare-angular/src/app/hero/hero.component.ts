import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="hero" #heroSection>
      <div class="hero-bg">
        <img src="assets/Hero section.webp" alt="M Square Healthcare" class="hero-bg-img" #heroBgImg>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content" #heroContent>
        <h1 class="hero-title">
          <span class="hw hw1"><span class="hw-inner" #hwInner>Transform</span></span>
          <span class="hw hw2"><span class="hw-inner" #hwInner>Healthcare Events</span></span>
          <span class="hw hw3"><span class="hw-inner" #hwInner>Into Impact</span></span>
        </h1>
        <p class="hero-sub" #heroSub>Expert-driven conferences, seamless CME accreditation, and cutting-edge event solutions for the pharmaceutical and medical industries.</p>
      </div>
      <div class="hero-scroll"><p>Scroll to explore</p><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('heroBgImg') heroBgImg!: ElementRef;
  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('heroSub') heroSub!: ElementRef;
  @ViewChildren('hwInner') hwInners!: QueryList<ElementRef>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const inners = this.hwInners.toArray().map(el => el.nativeElement);

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Skip all animation — show final state immediately
        gsap.set(inners, { yPercent: 0, rotation: 0 });
        gsap.set(this.heroSub.nativeElement, { opacity: 0.9, y: 0 });
        gsap.set(this.heroBgImg.nativeElement, { scale: 1 });
        return;
      }

      // Initial states
      gsap.set(inners, { yPercent: 120, rotation: 2 });
      gsap.set(this.heroSub.nativeElement, { opacity: 0, y: 20 });

      const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background slow zoom out
      heroTL.to(this.heroBgImg.nativeElement, { scale: 1, duration: 4, ease: 'power2.out' }, 0);

      // Cinematic word-by-word reveal with letter-spacing settle-in
      heroTL
        .to(inners, { yPercent: 0, rotation: 0, duration: 1.2, stagger: 0.15 }, 0.2)
        .to(this.heroSub.nativeElement, { opacity: 0.9, y: 0, duration: 1.2, ease: 'power2.out' }, 0.8);

      // Parallax scroll — content drifts up as hero leaves viewport
      gsap.to(this.heroContent.nativeElement, {
        scrollTrigger: {
          trigger: this.heroSection.nativeElement,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 80, opacity: 0.3, ease: 'none'
      });

    }, this.heroSection.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
