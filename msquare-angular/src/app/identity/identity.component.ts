import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('identitySec') identitySec!: ElementRef<HTMLElement>;
  @ViewChild('leftCol')     leftCol!: ElementRef<HTMLElement>;
  @ViewChildren('valueItem') valueItems!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // VM header fade-up (not horizontal slide — brief says "confident and quiet")
        gsap.from(this.leftCol.nativeElement, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.identitySec.nativeElement,
            start: 'top 78%',
            toggleActions: 'play none none none',
          }
        });

        // Value items stagger up
        const items = this.valueItems.toArray().map(r => r.nativeElement);
        gsap.from(items, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        });
      }

      // GSAP hover: gold number — works regardless of reduced-motion preference
      const items = this.valueItems.toArray().map(r => r.nativeElement);
      items.forEach(item => {
        const num = item.querySelector<HTMLElement>('.val-num');
        if (!num) return;
        item.addEventListener('mouseenter', () => gsap.to(num, { color: 'var(--gold)', duration: 0.25 }));
        item.addEventListener('mouseleave', () => gsap.to(num, { color: 'var(--border)', duration: 0.25 }));
      });

    }, this.identitySec?.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
