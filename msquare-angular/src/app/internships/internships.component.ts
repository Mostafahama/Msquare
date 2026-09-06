import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { CapabilityItem } from '../services/services.data';
import { INTERNSHIPS_DATA } from './internships.data';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './internships.component.html',
  styleUrls: ['../services/services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternshipsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stageVisual') stageVisual!: ElementRef<HTMLElement>;

  readonly items: CapabilityItem[] = INTERNSHIPS_DATA;
  activeIndex = 0;
  previousImage = INTERNSHIPS_DATA[0].image;

  private ctx!: gsap.Context;
  private touchStartX = 0;
  private touchStartY = 0;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  get activeItem(): CapabilityItem {
    return this.items[this.activeIndex] || this.items[0];
  }

  selectItem(index: number) {
    if (this.activeIndex === index) return;
    this.previousImage = this.activeItem.image;
    this.activeIndex = index;
    this.cdr.markForCheck();
    this.triggerStageTransition();
  }

  prevItem() {
    const len = this.items.length;
    const newIdx = (this.activeIndex - 1 + len) % len;
    this.selectItem(newIdx);
  }

  nextItem() {
    const len = this.items.length;
    const newIdx = (this.activeIndex + 1) % len;
    this.selectItem(newIdx);
  }

  onTouchStart(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }

  onTouchEnd(e: TouchEvent) {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - this.touchStartX;
      const diffY = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          this.nextItem();
        } else {
          this.prevItem();
        }
      }
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/placeholder.webp';
    }
  }

  private triggerStageTransition() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !this.stageVisual?.nativeElement) return;

      const stage = this.stageVisual.nativeElement;
      const topImg = stage.querySelector<HTMLElement>('.stage-top-img');
      const contentBox = stage.querySelector<HTMLElement>('.stage-content-box');

      if (topImg) {
        gsap.fromTo(topImg,
          { clipPath: 'polygon(0 0, 0 0, -25% 100%, 0 100%)', opacity: 1 },
          {
            clipPath: 'polygon(0 0, 125% 0, 100% 100%, 0 100%)',
            duration: 0.65,
            ease: 'power3.inOut'
          }
        );
      }

      if (contentBox) {
        gsap.fromTo(contentBox.children,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
        );
      }
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      this.ctx = gsap.context(() => {
        const listItems = this.el.nativeElement.querySelectorAll('.sv-explore-item');
        if (listItems && listItems.length > 0) {
          gsap.fromTo(listItems,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.03,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: this.el.nativeElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
              },
              clearProps: 'all'
            }
          );
        }
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
