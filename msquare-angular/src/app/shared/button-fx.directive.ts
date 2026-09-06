import { Directive, ElementRef, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appMagnetic], .btn-magnetic',
  standalone: true
})
export class MagneticButtonDirective implements OnInit, OnDestroy {
  @Input() magneticStrength = 0.35;

  private isFinePointer = false;
  private prefersReducedMotion = false;
  private unlistenMouseMove?: () => void;
  private unlistenMouseLeave?: () => void;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.isFinePointer || this.prefersReducedMotion) return;

    this.ngZone.runOutsideAngular(() => {
      const btn = this.el.nativeElement;

      const onMove = (e: MouseEvent) => {
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
      };

      const onLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto'
        });
      };

      btn.addEventListener('mousemove', onMove, { passive: true });
      btn.addEventListener('mouseleave', onLeave, { passive: true });

      this.unlistenMouseMove = () => btn.removeEventListener('mousemove', onMove);
      this.unlistenMouseLeave = () => btn.removeEventListener('mouseleave', onLeave);
    });
  }

  ngOnDestroy() {
    if (this.unlistenMouseMove) this.unlistenMouseMove();
    if (this.unlistenMouseLeave) this.unlistenMouseLeave();
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
  private unlistenMouseEnter?: () => void;
  private unlistenMouseLeave?: () => void;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pathEl = this.el.nativeElement.querySelector('.draw-path');
    if (!this.pathEl || this.prefersReducedMotion) return;

    this.ngZone.runOutsideAngular(() => {
      const btn = this.el.nativeElement;
      gsap.set(this.pathEl, { drawSVG: '0% 0%' });

      const onEnter = () => {
        if (!this.pathEl) return;
        gsap.fromTo(this.pathEl,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.45,
            ease: 'power2.inOut',
            overwrite: 'auto'
          }
        );
      };

      const onLeave = () => {
        if (!this.pathEl) return;
        gsap.to(this.pathEl, {
          drawSVG: '100% 100%',
          duration: 0.35,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: () => {
            if (this.pathEl) gsap.set(this.pathEl, { drawSVG: '0% 0%' });
          }
        });
      };

      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);

      this.unlistenMouseEnter = () => btn.removeEventListener('mouseenter', onEnter);
      this.unlistenMouseLeave = () => btn.removeEventListener('mouseleave', onLeave);
    });
  }

  ngOnDestroy() {
    if (this.unlistenMouseEnter) this.unlistenMouseEnter();
    if (this.unlistenMouseLeave) this.unlistenMouseLeave();
    if (this.pathEl) gsap.killTweensOf(this.pathEl);
  }
}
