import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription, asyncScheduler } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { MagneticButtonDirective } from '../shared/button-fx.directive';
import { SmoothScrollService } from '../shared/smooth-scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menuOverlay') menuOverlay!: ElementRef<HTMLElement>;

  isMenuOpen = false;
  isScrolled = false;
  activeSection = '';

  private menuTl: gsap.core.Timeline | null = null;
  private observer!: IntersectionObserver;
  private scrollSub?: Subscription;

  constructor(
    private smoothScroll: SmoothScrollService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setupScrollListener();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.scrollSub?.unsubscribe();
    this.observer?.disconnect();
    this.menuTl?.kill();
  }

  private setupScrollListener() {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollSub = fromEvent(window, 'scroll', { passive: true })
        .pipe(throttleTime(50, asyncScheduler, { leading: true, trailing: true }))
        .subscribe(() => {
          const scrolled = window.scrollY > 50;
          let changed = false;

          if (this.isScrolled !== scrolled) {
            this.isScrolled = scrolled;
            changed = true;
          }

          if (window.scrollY < 180 && this.activeSection !== '') {
            this.activeSection = '';
            changed = true;
          }

          if (changed) {
            this.cdr.markForCheck();
          }
        });
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.cdr.markForCheck();
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      if (!this.menuTl) {
        this.menuTl = gsap.timeline({ paused: true });

        this.menuTl
          .fromTo('.fs-menu-overlay',
            { opacity: 0, pointerEvents: 'none' },
            { opacity: 1, pointerEvents: 'all', duration: 0.35, ease: 'power2.out' }
          )
          .fromTo('.fs-menu-content',
            { yPercent: -15, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
            '-=0.2'
          )
          .fromTo('.fs-nav-item',
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
            '-=0.25'
          )
          .fromTo('.fs-menu-footer .fs-meta-col',
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
            '-=0.2'
          );
      }

      this.menuTl.play();
    });
  }

  closeMenu() {
    if (!this.isMenuOpen) return;
    this.isMenuOpen = false;
    this.cdr.markForCheck();
    if (this.menuTl) {
      this.menuTl.reverse();
    }
  }

  navigateTo(targetId: string, event?: Event) {
    if (event) event.preventDefault();
    this.closeMenu();

    setTimeout(() => {
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.getElementById(targetId);
        if (target) {
          this.smoothScroll.scrollTo(target, { offset: -70 });
        }
      }
    }, 150);
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined') return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (window.scrollY < 200) {
        if (this.activeSection !== '') {
          this.activeSection = '';
          this.cdr.markForCheck();
        }
        return;
      }
      entries.forEach(entry => {
        if (entry.isIntersecting && this.activeSection !== entry.target.id) {
          this.activeSection = entry.target.id;
          this.cdr.markForCheck();
        }
      });
    }, options);

    requestAnimationFrame(() => {
      ['about', 'services', 'events', 'partners', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      });
    });
  }
}


