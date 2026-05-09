import { Component, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-wipe-panels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wipe-panels.component.html',
  styleUrls: ['./wipe-panels.component.scss']
})
export class WipePanelsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      // Simple, natural scroll-triggered entrance animations — no pinning, no hijacking.
      this.sections.toArray().forEach((sec) => {
        const el = sec.nativeElement;

        // Fade + slide up on scroll into view
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
