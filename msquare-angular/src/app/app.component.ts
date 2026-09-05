import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { IdentityComponent } from './identity/identity.component';
import { WipePanelsComponent } from './wipe-panels/wipe-panels.component';
import { EventsComponent } from './events/events.component';
import { PartnersComponent } from './partners/partners.component';
import { FooterComponent } from './footer/footer.component';
import { IntroSequenceComponent } from './shared/intro-sequence.component';
import { CustomCursorComponent } from './shared/custom-cursor.component';
import { SmoothScrollService } from './shared/smooth-scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IntroSequenceComponent,
    CustomCursorComponent,
    HeaderComponent,
    HeroComponent,
    IdentityComponent,
    WipePanelsComponent,
    EventsComponent,
    PartnersComponent,
    FooterComponent
  ],
  template: `
    <!-- ═══ GLOBAL EXPERIENCE LAYER ═══ -->
    <app-intro-sequence></app-intro-sequence>
    <app-custom-cursor></app-custom-cursor>

    <!-- ═══ APP LAYOUT ═══ -->
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-identity></app-identity>
      <div class="section-seam"></div>
      <app-wipe-panels></app-wipe-panels>
      <div class="section-seam"></div>
      <app-events></app-events>
      <div class="section-seam"></div>
      <app-partners></app-partners>
    </main>
    <div class="section-seam"></div>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;
  private motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private smoothScroll: SmoothScrollService
  ) {}

  ngOnInit() {
    this.smoothScroll.init();
  }

  ngAfterViewInit() {
    this.applyReducedMotion(this.motionMediaQuery.matches);
    this.motionMediaQuery.addEventListener('change', (e) => this.applyReducedMotion(e.matches));

    this.ctx = gsap.context(() => {
      document.body.classList.add('gsap-ready');
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.smoothScroll.destroy();
  }

  private applyReducedMotion(reduced: boolean) {
    if (reduced) {
      this.document.documentElement.classList.add('reduced-motion');
    } else {
      this.document.documentElement.classList.remove('reduced-motion');
    }
  }
}
