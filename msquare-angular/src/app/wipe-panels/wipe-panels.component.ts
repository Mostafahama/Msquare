import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ServicesComponent } from '../services/services.component';
import { InternshipsComponent } from '../internships/internships.component';

@Component({
  selector: 'app-wipe-panels',
  standalone: true,
  imports: [CommonModule, ServicesComponent, InternshipsComponent],
  templateUrl: './wipe-panels.component.html',
  styleUrls: ['./wipe-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WipePanelsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('explorerSec') explorerSec!: ElementRef<HTMLElement>;
  @ViewChild('secTitle') secTitle!: ElementRef<HTMLElement>;

  activeMode: 'services' | 'internships' = 'services';
  private ctx!: gsap.Context;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  setMode(mode: 'services' | 'internships') {
    if (this.activeMode === mode) return;
    this.activeMode = mode;
    this.cdr.markForCheck();
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      this.ctx = gsap.context(() => {
        if (this.secTitle?.nativeElement) {
          gsap.fromTo(this.secTitle.nativeElement,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: this.secTitle.nativeElement,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
              },
              clearProps: 'all'
            }
          );
        }
      }, this.explorerSec?.nativeElement ?? undefined);
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}


