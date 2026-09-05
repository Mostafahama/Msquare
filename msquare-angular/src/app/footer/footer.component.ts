import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MagneticButtonDirective } from '../shared/button-fx.directive';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctHeading') ctHeading!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  readonly currentYear = new Date().getFullYear();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // ── Font Effect (a): SplitText line reveal on Contact heading
      if (this.ctHeading?.nativeElement) {
        const splitCt = new SplitText(this.ctHeading.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(splitCt.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.ctHeading.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // Contact section entrance
      gsap.from('.ct-left, .ct-right', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
