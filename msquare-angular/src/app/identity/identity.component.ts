import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
  @ViewChild('leftCol')     leftCol!: ElementRef<HTMLElement>;
  @ViewChildren('valueItem') valueItems!: QueryList<ElementRef<HTMLElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {

      // Left column slide in from left
      gsap.from(this.leftCol.nativeElement, {
        x: -60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.identitySec.nativeElement,
          start: 'top 78%',
          toggleActions: 'play none none none',
        }
      });

      // Value items stagger in from right
      const items = this.valueItems.toArray().map(r => r.nativeElement);
      gsap.from(items, {
        x: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.identitySec.nativeElement,
          start: 'top 78%',
          toggleActions: 'play none none none',
        }
      });

      // GSAP hover: gold number on hover
      items.forEach(item => {
        const num = item.querySelector<HTMLElement>('.val-num');
        if (!num) return;
        item.addEventListener('mouseenter', () => gsap.to(num, { color: 'var(--gold)', duration: 0.25 }));
        item.addEventListener('mouseleave', () => gsap.to(num, { color: 'var(--border)', duration: 0.25 }));
      });

    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
