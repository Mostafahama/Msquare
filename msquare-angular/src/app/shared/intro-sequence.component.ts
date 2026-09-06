import { Component, OnInit, OnDestroy, EventEmitter, Output, ElementRef, ViewChild, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-intro-sequence',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="intro-curtain" #curtain *ngIf="isVisible" (click)="skipIntro()">
      <div class="intro-center" #centerWrap>
        <div class="intro-logo-wrap" #logoWrap>
          <img src="assets/m-square-icon.png" alt="M Square" class="intro-logo" width="84" height="84">
        </div>
        <div class="intro-brand-name" #brandName>
          <span>M</span><span>S</span><span>Q</span><span>U</span><span>A</span><span>R</span><span>E</span>
        </div>
        <p class="intro-tagline" #tagline>HEALTHCARE EVENTS &amp; MEDICAL EXCELLENCE</p>
      </div>
      <div class="intro-skip-hint">Click or scroll to skip</div>
    </div>
  `,
  styles: [`
    .intro-curtain {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: var(--navy-deep, #0b0f19);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      overflow: hidden;
    }

    .intro-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .intro-logo-wrap {
      width: 84px;
      height: 84px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 0 35px rgba(212, 168, 83, 0.35);
      border: 1px solid rgba(212, 168, 83, 0.4);
    }

    .intro-logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .intro-brand-name {
      font-family: var(--fd, 'Poppins', sans-serif);
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: 6px;
      color: #ffffff;
      display: flex;
      gap: 2px;
    }

    .intro-tagline {
      font-family: var(--fb, 'Open Sauce One', sans-serif);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 3px;
      color: var(--gold, #d4a853);
      margin: 0;
    }

    .intro-skip-hint {
      position: absolute;
      bottom: 24px;
      font-family: var(--fb, 'Open Sauce One', sans-serif);
      font-size: 0.68rem;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.4);
      text-transform: uppercase;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroSequenceComponent implements OnInit, OnDestroy {
  @Output() introComplete = new EventEmitter<void>();
  @ViewChild('curtain') curtain!: ElementRef<HTMLElement>;
  @ViewChild('logoWrap') logoWrap!: ElementRef<HTMLElement>;
  @ViewChild('brandName') brandName!: ElementRef<HTMLElement>;
  @ViewChild('tagline') tagline!: ElementRef<HTMLElement>;

  isVisible = true;
  private introTimeline: gsap.core.Timeline | null = null;
  private isSkipped = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      this.isVisible = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('msquare_intro_shown') === 'true';

    if (prefersReducedMotion || hasSeenIntro) {
      this.isVisible = false;
      this.introComplete.emit();
      return;
    }

    // Run opening sequence
    setTimeout(() => this.runSequence(), 20);
  }

  @HostListener('window:keydown')
  @HostListener('window:wheel', ['$event'])
  onUserInteraction() {
    this.skipIntro();
  }

  private runSequence() {
    if (!this.curtain || this.isSkipped) return;

    sessionStorage.setItem('msquare_intro_shown', 'true');

    this.ngZone.runOutsideAngular(() => {
      gsap.set(this.logoWrap.nativeElement, { scale: 0.85, opacity: 0, y: 15 });
      gsap.set(this.brandName.nativeElement.children, { opacity: 0, y: 10 });
      gsap.set(this.tagline.nativeElement, { opacity: 0 });

      this.introTimeline = gsap.timeline({
        onComplete: () => this.finish()
      });

      this.introTimeline
        .to(this.logoWrap.nativeElement, { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.1)
        .to(this.brandName.nativeElement.children, { opacity: 1, y: 0, stagger: 0.03, duration: 0.45, ease: 'power2.out' }, 0.35)
        .to(this.tagline.nativeElement, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.5)
        .to(this.curtain.nativeElement, {
          yPercent: -100,
          duration: 0.65,
          ease: 'power4.inOut',
          delay: 0.25
        });
    });
  }

  skipIntro() {
    if (this.isSkipped || !this.isVisible) return;
    this.isSkipped = true;
    sessionStorage.setItem('msquare_intro_shown', 'true');

    if (this.introTimeline) {
      this.introTimeline.kill();
    }

    if (this.curtain?.nativeElement) {
      this.ngZone.runOutsideAngular(() => {
        gsap.to(this.curtain.nativeElement, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => this.finish()
        });
      });
    } else {
      this.finish();
    }
  }

  private finish() {
    this.ngZone.run(() => {
      this.isVisible = false;
      this.cdr.markForCheck();
      this.introComplete.emit();
    });
  }

  ngOnDestroy() {
    this.introTimeline?.kill();
  }
}
