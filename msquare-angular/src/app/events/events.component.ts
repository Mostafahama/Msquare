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
  @ViewChild('scrollWrapper') scrollWrapper!: ElementRef<HTMLElement>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      const container = this.scrollContainer.nativeElement;
      const wrapper = this.scrollWrapper.nativeElement;

      // Calculate how far to scroll
      const getScrollAmount = () => -(container.scrollWidth - window.innerWidth + window.innerWidth * 0.1);

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top center", // Pin when the wrapper hits the center of the viewport
          end: () => `+=${container.scrollWidth}`, // Scroll distance based on container width
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

    }, this.eventsSec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
