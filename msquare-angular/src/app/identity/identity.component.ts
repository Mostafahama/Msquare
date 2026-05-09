import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('identitySec') identitySec!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      // Left column: Vision & Mission fade up
      gsap.from('.identity-left', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.identitySec.nativeElement,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      // Right column: Values stagger in
      gsap.from('.value-item', {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.identity-right',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Value number color on hover — pure CSS handles this,
      // but add a subtle GSAP pulse on each item hover for premium feel
      document.querySelectorAll<HTMLElement>('.value-item').forEach(item => {
        const num = item.querySelector<HTMLElement>('.val-num');
        item.addEventListener('mouseenter', () => {
          if (num) gsap.to(num, { color: 'var(--gold)', duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
          if (num) gsap.to(num, { color: 'var(--border)', duration: 0.3 });
        });
      });

    }, this.identitySec.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
