import { Directive, ElementRef, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

@Directive({
  selector: '[appMagnetic], .btn-magnetic',
  standalone: true
})
export class MagneticButtonDirective implements OnInit, OnDestroy {
  @Input() magneticStrength = 0.35;

  private isFinePointer = false;
  private prefersReducedMotion = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isFinePointer || this.prefersReducedMotion) return;

    const btn = this.el.nativeElement;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * this.magneticStrength;
    const y = (e.clientY - r.top - r.height / 2) * this.magneticStrength;

    gsap.to(btn, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isFinePointer || this.prefersReducedMotion) return;

    const btn = this.el.nativeElement;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    });
  }

  ngOnDestroy() {
    gsap.killTweensOf(this.el.nativeElement);
  }
}

@Directive({
  selector: '[appDrawSvg], .btn-drawsvg',
  standalone: true
})
export class DrawSvgButtonDirective implements OnInit, OnDestroy {
  private prefersReducedMotion = false;
  private pathEl: SVGElement | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pathEl = this.el.nativeElement.querySelector('.draw-path');
    if (this.pathEl && !this.prefersReducedMotion) {
      gsap.set(this.pathEl, { drawSVG: '0% 0%' });
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.pathEl || this.prefersReducedMotion) return;

    gsap.fromTo(this.pathEl,
      { drawSVG: '0% 0%' },
      {
        drawSVG: '0% 100%',
        duration: 0.45,
        ease: 'power2.inOut',
        overwrite: 'auto'
      }
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.pathEl || this.prefersReducedMotion) return;

    gsap.to(this.pathEl, {
      drawSVG: '100% 100%',
      duration: 0.35,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        if (this.pathEl) gsap.set(this.pathEl, { drawSVG: '0% 0%' });
      }
    });
  }

  ngOnDestroy() {
    if (this.pathEl) gsap.killTweensOf(this.pathEl);
  }
}
