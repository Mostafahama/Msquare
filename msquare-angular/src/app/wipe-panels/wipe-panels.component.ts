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
  @ViewChildren('servicesSec') servicesSec!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('badge')       badges!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('internSec')   internSec!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('inLeft')      inLeft!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('inRight')     inRight!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {

      /* ─── SERVICES: title + subtitle fade up ─── */
      gsap.from('.sv2-title, .sv2-sub', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-v2',
          start: 'top 78%',
          toggleActions: 'play none none none',
        }
      });

      /* ─── SERVICES: badges stagger in ─── */
      const badgeEls = this.badges.toArray().map(b => b.nativeElement);
      gsap.from(badgeEls, {
        y: 30,
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        stagger: 0.07,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.sv2-grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });

      /* ─── INTERNSHIPS: left image col slide in ─── */
      const inLeftEl = this.inLeft.first?.nativeElement;
      if (inLeftEl) {
        gsap.from(inLeftEl, {
          x: -60,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top 78%',
            toggleActions: 'play none none none',
          }
        });
      }

      /* ─── INTERNSHIPS: right text col slide in ─── */
      const inRightEl = this.inRight.first?.nativeElement;
      if (inRightEl) {
        gsap.from(inRightEl, {
          x: 60,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.internships-new',
            start: 'top 78%',
            toggleActions: 'play none none none',
          }
        });
      }

      /* ─── INTERNSHIPS: grid spans stagger in ─── */
      gsap.from('.in-grid span', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.in-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
