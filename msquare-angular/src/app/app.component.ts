import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { IdentityComponent } from './identity/identity.component';
import { WipePanelsComponent } from './wipe-panels/wipe-panels.component';
import { EventsComponent } from './events/events.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';
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
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;
  private motionMediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private smoothScroll: SmoothScrollService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.smoothScroll.init();
  }

  ngAfterViewInit() {
    if (this.motionMediaQuery) {
      this.applyReducedMotion(this.motionMediaQuery.matches);
      this.motionMediaQuery.addEventListener('change', (e) => this.applyReducedMotion(e.matches));
    }

    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        document.body.classList.add('gsap-ready');
      });
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

