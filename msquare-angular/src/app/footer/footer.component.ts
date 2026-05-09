import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ═══ CONTACT (Split) ═══ -->
    <section class="contact" id="contact" #contactSec>
      <div class="container">
        <div class="ct-grid" data-anim>
          <div class="ct-left">
            <h2>Connect<br>With Us</h2>
            <p class="ct-intro">Our team is ready to assist you with inquiries regarding event partnerships, accreditation, or internship opportunities.</p>
            <div class="ct-items">
              <div class="ct-item"><div class="ct-icon">📍</div><div><p class="ct-label">Headquarters</p><p class="ct-val">Cairo — AlQattamia District, 36 AlMarwa Land</p></div></div>
              <div class="ct-item"><div class="ct-icon">✉️</div><div><p class="ct-label">General Inquiries</p><p class="ct-val"><a href="mailto:admin&#64;mtechsquare.com">admin&#64;mtechsquare.com</a></p></div></div>
              <div class="ct-item"><div class="ct-icon">📞</div><div><p class="ct-label">Direct Lines</p><p class="ct-val"><a href="tel:+201002906884">+20 100 290 6884</a><br><a href="tel:+201064731374">+20 106 473 1374</a></p></div></div>
            </div>
          </div>
          <div class="ct-right">
            <div class="ct-visual">
              <div class="ct-shape ct-s1"></div>
              <div class="ct-shape ct-s2"></div>
              <div class="ct-shape ct-s3"></div>
              <img src="assets/M SQUARE_Icon with background.png" alt="M Square" class="ct-logo-img">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer class="footer" #footerSec>
      <div class="container">
        <div class="ft-grid">
          <div class="ft-col ft-main">
            <div class="ft-logo">M²</div>
            <p class="ft-tag">Transforming Healthcare Events Into Impact</p>
            <p class="ft-info"><strong>Email:</strong> <a href="mailto:admin&#64;mtechsquare.com">admin&#64;mtechsquare.com</a></p>
            <p class="ft-info"><strong>Phone:</strong> <a href="tel:+201002906884">01002906884</a> | <a href="tel:+201064731374">01064731374</a></p>
          </div>
          <div class="ft-col"><h4>Services</h4><ul><li><a href="#services">Conference Planning</a></li><li><a href="#services">CME Accreditation</a></li><li><a href="#services">Virtual Events</a></li><li><a href="#services">Media Production</a></li></ul></div>
          <div class="ft-col"><h4>Internships</h4><ul><li><a href="#internships">Clinical Pharmacy</a></li><li><a href="#internships">Drug Safety</a></li><li><a href="#internships">Medical Research</a></li><li><a href="#internships">Quality Control</a></li></ul></div>
        </div>
        <div class="ft-bottom"><p>&copy; 2025 M Square. All rights reserved. Part of MTech Square Group.</p></div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      // Animations removed per user request to prevent elements from sliding in from the sides or middle.
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
