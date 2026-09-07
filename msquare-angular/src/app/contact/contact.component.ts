import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButtonDirective, DrawSvgButtonDirective } from '../shared/button-fx.directive';

import { LanguageService } from '../core/services/language.service';

export interface ContactItem {
  type: 'address' | 'email' | 'phone';
  label: { en: string; ar: string };
  value: { en: string; ar: string };
  href: string;
  isExternal?: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MagneticButtonDirective, DrawSvgButtonDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctHeading') ctHeading!: ElementRef<HTMLElement>;
  @ViewChild('contactSec') contactSec!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  readonly contactItems: ContactItem[] = [
    {
      type: 'address',
      label: { en: 'Headquarters', ar: 'المقر الرئيسي' },
      value: { en: 'Cairo — AlQattamia District, 36 AlMarwa Land', ar: 'القاهرة — حي القطامية، 36 أرض المروة' },
      href: 'https://maps.google.com/?q=AlQattamia+District+Cairo',
      isExternal: true
    },
    {
      type: 'email',
      label: { en: 'General Inquiries', ar: 'الاستفسارات العامة' },
      value: { en: 'admin@mtechsquare.com', ar: 'admin@mtechsquare.com' },
      href: 'mailto:admin@mtechsquare.com'
    },
    {
      type: 'phone',
      label: { en: 'Direct Line 1', ar: 'الخط المباشر 1' },
      value: { en: '+20 100 290 6884', ar: '+20 100 290 6884' },
      href: 'tel:+201002906884'
    },
    {
      type: 'phone',
      label: { en: 'Direct Line 2', ar: 'الخط المباشر 2' },
      value: { en: '+20 106 473 1374', ar: '+20 106 473 1374' },
      href: 'tel:+201064731374'
    }
  ];

  constructor(
    public lang: LanguageService,
    private el: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      this.ctx = gsap.context(() => {
        // Font Effect: SplitText line reveal on Contact heading
        if (this.ctHeading?.nativeElement) {
          const splitCt = new SplitText(this.ctHeading.nativeElement, { type: 'lines', mask: 'lines' });
          gsap.from(splitCt.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: this.ctHeading.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        }

        // Contact section entrance
        gsap.from('.ct-left, .ct-right', {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      }, this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
