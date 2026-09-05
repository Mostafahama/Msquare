import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface Partner {
  name: string;
  abbr?: string;
  logoPath?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ptTitle') ptTitle!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  isPaused = false;

  readonly partners: Partner[] = [
    // Pharmaceutical Companies
    { name: 'Novo Nordisk', abbr: 'NN' },
    { name: 'PHARCO Pharmaceuticals', abbr: 'PHARCO' },
    { name: 'Sanofi Egypt', abbr: 'SANOFI' },
    { name: 'Pfizer Egypt', abbr: 'PFIZER' },
    { name: 'AstraZeneca Egypt', abbr: 'AZ' },
    { name: 'Novartis Egypt', abbr: 'NOVARTIS' },
    { name: 'Abbott Egypt', abbr: 'ABBOTT' },
    { name: 'Amoun Pharmaceutical', abbr: 'AMOUN' },
    { name: 'EIPICO', abbr: 'EIPICO' },
    { name: 'Hikma Pharmaceuticals', abbr: 'HIKMA' },
    // Universities & Academic
    { name: 'Port Said University', abbr: 'PSU' },
    { name: 'Galala University', abbr: 'GU' },
    { name: 'Horus University', abbr: 'HUE' },
    { name: 'Suez Canal University', abbr: 'SCU' },
    // Professional Bodies & CME
    { name: 'Egyptian Medical Syndicate', abbr: 'EMS' },
    { name: 'Egyptian Chest Society', abbr: 'ECS' },
    { name: 'Egyptian Society of Otolaryngology', abbr: 'ESOO' },
    // Events & Media
    { name: 'Tekno Square Academy', abbr: 'TSA' },
    { name: 'ENGAZ Initiative', abbr: 'ENGAZ' },
  ];

  get marqueeRow1(): Partner[] {
    return [...this.partners.slice(0, 10), ...this.partners.slice(0, 10)];
  }

  get marqueeRow2(): Partner[] {
    return [...this.partners.slice(9), ...this.partners.slice(9)];
  }

  pauseMarquee() { this.isPaused = true; }
  resumeMarquee() { this.isPaused = false; }

  ngAfterViewInit() {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // ── Font Effect (a): SplitText line reveal on Partners heading
      if (this.ptTitle?.nativeElement) {
        const splitPt = new SplitText(this.ptTitle.nativeElement, { type: 'lines', mask: 'lines' });
        gsap.from(splitPt.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.ptTitle.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // Subtitle fade-up
      gsap.from('.partners-sub', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partners-sub',
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
