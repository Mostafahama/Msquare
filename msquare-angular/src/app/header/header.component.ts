import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticButtonDirective } from '../shared/button-fx.directive';
import { SmoothScrollService } from '../shared/smooth-scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menuOverlay') menuOverlay!: ElementRef<HTMLElement>;

  isMenuOpen = false;
  isScrolled = false;
  activeSection = '';

  private menuTl: gsap.core.Timeline | null = null;
  private observer!: IntersectionObserver;

  constructor(private smoothScroll: SmoothScrollService) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.menuTl?.kill();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    if (window.scrollY < 180) {
      this.activeSection = '';
    }
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
    if (typeof window === 'undefined') return;

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
  }

  closeMenu() {
    if (!this.isMenuOpen) return;
    this.isMenuOpen = false;
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
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (window.scrollY < 200) {
        this.activeSection = '';
        return;
      }
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
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

