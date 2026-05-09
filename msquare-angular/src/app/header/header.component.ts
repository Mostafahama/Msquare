import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" id="navbar" [class.scrolled]="isScrolled">
      <div class="nav-inner">
        <a href="#" class="nav-brand">
          <img src="assets/M SQUARE_Icon with background.png" alt="M Square Logo" class="brand-logo">
          <span class="brand-text">MSQUARE</span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" (click)="toggleMenu()">
          <span [style.transform]="isMenuOpen ? 'rotate(45deg) translate(5px,5px)' : ''"></span>
          <span [style.opacity]="isMenuOpen ? '0' : ''"></span>
          <span [style.transform]="isMenuOpen ? 'rotate(-45deg) translate(5px,-5px)' : ''"></span>
        </button>
        <ul class="nav-links" id="navMenu" [class.active]="isMenuOpen">
          <li><a href="#services" (click)="closeMenu()">SERVICES</a></li>
          <li><a href="#internships" (click)="closeMenu()">INTERNSHIPS</a></li>
          <li><a href="#events" (click)="closeMenu()">EVENTS</a></li>
          <li><a href="#partners" (click)="closeMenu()">PARTNERS</a></li>
          <li><a href="#contact" (click)="closeMenu()">CONTACT</a></li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 60;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
