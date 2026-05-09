import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    <!-- ═══ CUSTOM CURSOR ═══ -->
    <div class="cursor-dot"></div>
    <div class="cursor-outline">
      <span class="cursor-text"></span>
    </div>

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

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      document.body.classList.add('gsap-ready');

      const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
      const cursorOutline = document.querySelector('.cursor-outline') as HTMLElement;
      const cursorText = document.querySelector('.cursor-text') as HTMLElement;

      if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50 });
        
        const xToDot = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3"});
        const yToDot = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3"});
        
        const xToOutline = gsap.quickTo(cursorOutline, "x", {duration: 0.3, ease: "power3"});
        const yToOutline = gsap.quickTo(cursorOutline, "y", {duration: 0.3, ease: "power3"});

        window.addEventListener("mousemove", (e: MouseEvent) => {
          xToDot(e.clientX);
          yToDot(e.clientY);
          xToOutline(e.clientX);
          yToOutline(e.clientY);
        });

        // Event delegation for hover states
        document.body.addEventListener('mouseover', (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          
          if (target.closest('a, button, .sv2-badge')) {
            cursorOutline.classList.add('hover-link');
          }
          if (target.closest('.ev-mosaic, .in-organic-shape, .placeholder-image')) {
            cursorOutline.classList.add('hover-image');
            if (cursorText) cursorText.textContent = "VIEW";
          }
        });

        document.body.addEventListener('mouseout', (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          
          if (target.closest('a, button, .sv2-badge')) {
            cursorOutline.classList.remove('hover-link');
          }
          if (target.closest('.ev-mosaic, .in-organic-shape, .placeholder-image')) {
            cursorOutline.classList.remove('hover-image');
            if (cursorText) cursorText.textContent = "";
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
