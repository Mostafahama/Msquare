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
    this.ctx = gsap.context(() => {
      const inners = this.hwInners.toArray().map(el => el.nativeElement);
      
      // Initial states
      gsap.set(inners, { yPercent: 120, rotation: 2 });
      gsap.set(this.heroSub.nativeElement, { opacity: 0, y: 20 });

      const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      // Background slow zoom out
      heroTL.to(this.heroBgImg.nativeElement, { scale: 1, duration: 4, ease: 'power2.out' }, 0);

      // Text reveal
      heroTL.to(inners, { yPercent: 0, rotation: 0, duration: 1.2, stagger: 0.15 }, 0.2)
            .to(this.heroSub.nativeElement, { opacity: 0.9, y: 0, duration: 1.2, ease: 'power2.out' }, 0.8);

      // Parallax scroll effect
      gsap.to(this.heroContent.nativeElement, {
        scrollTrigger: { 
          trigger: this.heroSection.nativeElement, 
          start: 'top top', 
          end: 'bottom top', 
          scrub: 1 
        },
        y: 80, opacity: 0.3, ease: 'none'
      });

      // Navbar visual transition logic based on hero scrolling
      ScrollTrigger.create({
        trigger: this.heroSection.nativeElement,
        start: 'top top',
        end: '60px top',
        onLeave: () => {
          // This ensures if there are global navbar tweens we can still trigger them, 
          // but we handled navbar state natively in Angular @HostListener. 
          // So this GSAP ScrollTrigger might be redundant, but keeping it for 1:1 migration.
          const nav = document.querySelector('.navbar');
          if (nav) gsap.to(nav, { background: 'rgba(255,255,255,0.98)', borderBottom: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', padding: '6px 0', duration: 0.3 });
        },
        onEnterBack: () => {
          const nav = document.querySelector('.navbar');
          if (nav) gsap.to(nav, { background: 'transparent', borderBottom: '1px solid transparent', boxShadow: 'none', padding: '10px 0', duration: 0.3 });
        }
      });

    }, this.heroSection.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
