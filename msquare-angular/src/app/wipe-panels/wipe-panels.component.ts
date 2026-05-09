import { Component, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
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
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChildren('panel') panels!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;
  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      const panelElements = this.panels.toArray().map(p => p.nativeElement);

      // Initially set all panels (except the first) to be pushed down exactly 100%
      gsap.set(panelElements.slice(1), { yPercent: 100 });

      // Create the main timeline for the wipe effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.container.nativeElement,
          start: "top top",
          end: () => `+=${panelElements.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      // Build the stacking sequences
      panelElements.forEach((panel, i) => {
        if (i === 0) return;

        const prevPanel = panelElements[i - 1];

        // Scale down, fade, and blur the PREVIOUS panel
        tl.to(prevPanel, {
          scale: 0.85,
          opacity: 0.3,
          filter: "blur(5px)",
          ease: "none"
        });

        // Slide the NEW panel up simultaneously
        tl.to(panel, {
          yPercent: 0,
          ease: "none"
        }, "<");
      });

    }, this.container.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
