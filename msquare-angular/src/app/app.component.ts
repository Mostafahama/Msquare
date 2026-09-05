import { Component, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { IdentityComponent } from './identity/identity.component';
import { WipePanelsComponent } from './wipe-panels/wipe-panels.component';
import { EventsComponent } from './events/events.component';
import { PartnersComponent } from './partners/partners.component';
import { FooterComponent } from './footer/footer.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, IdentityComponent, WipePanelsComponent, EventsComponent, PartnersComponent, FooterComponent],
  template: `
    <!-- ═══ APP LAYOUT ═══ -->
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-identity></app-identity>
      <app-wipe-panels></app-wipe-panels>
      <app-events></app-events>
      <app-partners></app-partners>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;
  private motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit() {
    this.applyReducedMotion(this.motionMediaQuery.matches);
    this.motionMediaQuery.addEventListener('change', (e) => this.applyReducedMotion(e.matches));

    this.ctx = gsap.context(() => {
      document.body.classList.add('gsap-ready');
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }

  private applyReducedMotion(reduced: boolean) {
    if (reduced) {
      this.document.documentElement.classList.add('reduced-motion');
    } else {
      this.document.documentElement.classList.remove('reduced-motion');
    }
  }
}
