import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-cursor-wrap" *ngIf="isEnabled">
      <div class="cursor-dot" #dot></div>
      <div class="cursor-outline" #outline>
        <span class="cursor-text" #cursorText></span>
      </div>
    </div>
  `,
  styles: [`
    .custom-cursor-wrap {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 99990;
    }

    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px;
      height: 6px;
      background: var(--gold, #d4a853);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99992;
      transform: translate(-50%, -50%);
      will-change: transform;
    }

    .cursor-outline {
      position: fixed;
      top: 0; left: 0;
      width: 32px;
      height: 32px;
      border: 1.5px solid rgba(212, 168, 83, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99991;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.25s var(--ease, ease-out),
                  height 0.25s var(--ease, ease-out),
                  border-color 0.25s var(--ease, ease-out),
                  background-color 0.25s var(--ease, ease-out),
                  box-shadow 0.25s var(--ease, ease-out);
      will-change: transform;
    }

    .cursor-text {
      font-family: var(--fb, 'Open Sauce One', sans-serif);
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #0b0f19;
      opacity: 0;
      transform: scale(0.6);
      transition: opacity 0.2s ease, transform 0.2s ease;
      text-transform: uppercase;
      user-select: none;
    }

    /* State: Hover regular link / button */
    .cursor-outline.hover-link {
      width: 48px;
      height: 48px;
      border-color: var(--gold, #d4a853);
      background-color: rgba(212, 168, 83, 0.08);
    }

    /* State: Hover image */
    .cursor-outline.hover-image {
      width: 64px;
      height: 64px;
      background: var(--gold, #d4a853);
      border-color: var(--gold, #d4a853);
      box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);

      .cursor-text {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* State: Hover interactive vertical timeline */
    .cursor-outline.hover-drag {
      width: 68px;
      height: 68px;
      background: rgba(15, 23, 42, 0.85);
      border: 1.5px solid var(--gold, #d4a853);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);

      .cursor-text {
        opacity: 1;
        color: #ffffff;
        transform: scale(1);
      }
    }

    /* State: Hover Primary CTA */
    .cursor-outline.hover-primary {
      width: 54px;
      height: 54px;
      border-color: var(--gold, #d4a853);
      background: rgba(212, 168, 83, 0.15);
      box-shadow: 0 0 20px rgba(212, 168, 83, 0.45);
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('dot') dot!: ElementRef<HTMLElement>;
  @ViewChild('outline') outline!: ElementRef<HTMLElement>;
  @ViewChild('cursorText') cursorText!: ElementRef<HTMLElement>;

  isEnabled = false;

  private xToDot: any;
  private yToDot: any;
  private xToOutline: any;
  private yToOutline: any;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseOverListener: ((e: MouseEvent) => void) | null = null;

  ngOnInit() {
    if (typeof window === 'undefined') return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFinePointer && isDesktop && !prefersReducedMotion) {
      this.isEnabled = true;
      setTimeout(() => this.setupCursor(), 10);
    }
  }

  private setupCursor() {
    if (!this.dot || !this.outline) return;

    this.xToDot = gsap.quickTo(this.dot.nativeElement, 'x', { duration: 0.1, ease: 'power3.out' });
    this.yToDot = gsap.quickTo(this.dot.nativeElement, 'y', { duration: 0.1, ease: 'power3.out' });

    this.xToOutline = gsap.quickTo(this.outline.nativeElement, 'x', { duration: 0.25, ease: 'power3.out' });
    this.yToOutline = gsap.quickTo(this.outline.nativeElement, 'y', { duration: 0.25, ease: 'power3.out' });

    // Track mouse position
    this.mouseMoveListener = (e: MouseEvent) => {
      this.xToDot(e.clientX);
      this.yToDot(e.clientY);
      this.xToOutline(e.clientX);
      this.yToOutline(e.clientY);
    };
    window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });

    // Track hover targets
    this.mouseOverListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !this.outline) return;

      const outEl = this.outline.nativeElement;
      const textEl = this.cursorText?.nativeElement;

      // Check for primary CTA
      if (target.closest('.btn-primary, .nav-cta')) {
        outEl.className = 'cursor-outline hover-primary';
        if (textEl) textEl.textContent = '';
        return;
      }

      // Check for image gallery
      if (target.closest('.mo-item, .ev-photo-wrap, .in-organic-wrap, .logo-tile')) {
        outEl.className = 'cursor-outline hover-image';
        if (textEl) textEl.textContent = 'VIEW';
        return;
      }

      // Check for interactive timeline
      if (target.closest('.timeline-node, .ev-timeline-card, .timeline-spine')) {
        outEl.className = 'cursor-outline hover-drag';
        if (textEl) textEl.textContent = 'SCROLL';
        return;
      }

      // Check for generic link / button / interactive pill
      if (target.closest('a, button, .pill-btn, .sv2-badge, .value-item')) {
        outEl.className = 'cursor-outline hover-link';
        if (textEl) textEl.textContent = '';
        return;
      }

      // Resting state
      outEl.className = 'cursor-outline';
      if (textEl) textEl.textContent = '';
    };

    document.addEventListener('mouseover', this.mouseOverListener, { passive: true });
  }

  ngOnDestroy() {
    if (this.mouseMoveListener && typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseOverListener && typeof document !== 'undefined') {
      document.removeEventListener('mouseover', this.mouseOverListener);
    }
  }
}
