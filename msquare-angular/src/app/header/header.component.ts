import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticButtonDirective } from '../shared/button-fx.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  activeSection = '';

  // Canonical section IDs in page order
  private sectionIds = ['services', 'internships', 'events', 'partners', 'contact'];
  private observer!: IntersectionObserver;

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 60;
    if (window.scrollY < 200) {
      this.activeSection = '';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  private setupIntersectionObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      // Fire when section occupies the center third of the viewport
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

    // Observe sections after DOM is ready
    requestAnimationFrame(() => {
      this.sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      });
    });
  }
}
