import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('eventsSec') eventsSec!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      // Simple fade-in entrance for the section title — no pinning, no horizontal hijacking.
      gsap.from('.ev-main-title, .ev-main-sub', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.eventsSec.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Stagger each event card in as they scroll into view
      gsap.from('.ev-block', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.events-scroll-container',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

    }, this.eventsSec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
