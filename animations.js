/* ═══════════════════════════════════════════════════
   M SQUARE — GSAP Animation Engine
   Smooth, minimal, no particles
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  let libsLoaded = false;
  const TIMEOUT = 6000;

  function waitForLibs(cb) {
    const start = Date.now();
    function check() {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        libsLoaded = true;
        cb();
      } else if (Date.now() - start > TIMEOUT) {
        console.warn('⚠️ GSAP CDN timeout — animations disabled, content visible.');
      } else {
        setTimeout(check, 100);
      }
    }
    check();
  }

  waitForLibs(() => {
    try {
      gsap.registerPlugin(ScrollTrigger);
      document.body.classList.add('gsap-ready');

      /* ─────────────────────────────────────
         0. CUSTOM CURSOR
         ───────────────────────────────────── */
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');
      const cursorText = document.querySelector('.cursor-text');

      if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50 });
        
        let xToDot = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3"});
        let yToDot = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3"});
        
        let xToOutline = gsap.quickTo(cursorOutline, "x", {duration: 0.3, ease: "power3"});
        let yToOutline = gsap.quickTo(cursorOutline, "y", {duration: 0.3, ease: "power3"});

        window.addEventListener("mousemove", e => {
          xToDot(e.clientX);
          yToDot(e.clientY);
          xToOutline(e.clientX);
          yToOutline(e.clientY);
        });

        // Hover states
        const links = document.querySelectorAll('a, button, .sv2-badge');
        links.forEach(el => {
          el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-link'));
          el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-link'));
        });

        const images = document.querySelectorAll('.ev-mosaic, .in-organic-shape, .placeholder-image');
        images.forEach(el => {
          el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover-image');
            if (cursorText) cursorText.textContent = "VIEW";
          });
          el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover-image');
          });
        });
      }

      /* ─────────────────────────────────────
         1. HERO TEXT & BG — Cinematic Reveal
         ───────────────────────────────────── */
      const hwInners = gsap.utils.toArray('.hw-inner');
      const heroSub = document.querySelector('.hero-sub');
      const heroBgImg = document.querySelector('.hero-bg-img');

      if (hwInners.length) {
        gsap.set(hwInners, { yPercent: 120, rotation: 2 });
        if (heroSub) gsap.set(heroSub, { opacity: 0, y: 20 });

        const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
        
        // Background slow zoom out
        if (heroBgImg) {
          heroTL.to(heroBgImg, { scale: 1, duration: 4, ease: 'power2.out' }, 0);
        }

        // Text reveal
        heroTL.to(hwInners, { yPercent: 0, rotation: 0, duration: 1.2, stagger: 0.15 }, 0.2)
              .to(heroSub, { opacity: 0.9, y: 0, duration: 1.2, ease: 'power2.out' }, 0.8);
      }

      /* ─────────────────────────────────────
         2. SCROLL-TRIGGERED ANIMATIONS
         ───────────────────────────────────── */
      
      // Global Section Reveal
      gsap.utils.toArray('section:not(#hero)').forEach(sec => {
        gsap.from(sec, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%'
          }
        });
      });

      function animateFrom(selector, config) {
        const el = document.querySelector(selector);
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          opacity: 0, duration: 0.8, ease: 'power3.out',
          ...config
        });
      }

      function animateEach(selector, config) {
        gsap.utils.toArray(selector).forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 88%' },
            opacity: 0, duration: 0.6, ease: 'power3.out',
            delay: i * 0.06,
            ...config
          });
        });
      }

      // About
      animateFrom('.identity-left', { x: -50, duration: 0.9 });
      animateEach('.value-item', { y: 30, duration: 0.7 });

      // Services
      animateFrom('.sv2-title', { y: 40, duration: 0.9 });
      animateFrom('.sv2-sub', { y: 30 });
      animateEach('.sv2-badge', { scale: 0.8, y: 25, ease: 'back.out(1.5)' });

      // Service badge hover
      document.querySelectorAll('.sv2-badge').forEach(b => {
        b.addEventListener('mouseenter', () => gsap.to(b, { scale: 1.06, duration: 0.3, ease: 'power2.out' }));
        b.addEventListener('mouseleave', () => gsap.to(b, { scale: 1, duration: 0.3, ease: 'power2.out' }));
      });

      // Internships
      animateFrom('.in-organic-shape', { scale: 0.85, rotation: -5, duration: 1 });
      animateFrom('.in-glass-top', { x: 40, delay: 0.3 });
      animateFrom('.in-glass-bottom', { x: -40, delay: 0.4 });
      animateFrom('.in-right', { x: 50, duration: 0.9 });
      animateEach('.in-grid span', { y: 15, duration: 0.5 });

      // Events
      animateFrom('.ev-main-title', { y: 40 });
      animateFrom('.ev-main-sub', { y: 25 });
      animateEach('.mo, .eg-item, .cin-frame', { scale: 0.92, duration: 0.6 });

      // Events Horizontal Scroll
      const eventsContainer = document.querySelector('.events-scroll-container');
      if (eventsContainer) {
        const getScrollAmount = () => eventsContainer.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
        
        const eventsScrollTween = gsap.to(eventsContainer, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.events',
            pin: true,
            start: 'bottom bottom',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        // Add 3D parallax to event mosaics and info within the horizontal scroll
        gsap.utils.toArray('.ev-block').forEach((block) => {
          const mosaic = block.querySelector('.ev-mosaic');
          const info = block.querySelector('.ev-info');

          if (mosaic) {
            gsap.from(mosaic, {
              x: 100, opacity: 0, rotationY: -15, transformPerspective: 1000,
              scrollTrigger: {
                trigger: block, containerAnimation: eventsScrollTween, start: 'left 80%', end: 'center center', scrub: 1
              }
            });
          }
          if (info) {
            gsap.from(info, {
              x: 50, opacity: 0,
              scrollTrigger: {
                trigger: block, containerAnimation: eventsScrollTween, start: 'left 85%', end: 'center center', scrub: 1
              }
            });
          }
        });
      }

      // Partners
      animateFrom('.ptr-title', { y: 30 });
      animateFrom('.ptr-ticker', { duration: 1 });

      // Contact
      animateFrom('.ct-left', { x: -40, duration: 0.9 });
      animateFrom('.ct-visual', { scale: 0.9, ease: 'back.out(1.4)' });
      animateEach('.ct-item', { x: -20 });

      // Footer
      animateFrom('.ft-grid', { y: 30 });

      /* ─────────────────────────────────────
         3. PARALLAX
         ───────────────────────────────────── */
      gsap.to('.hero-content', {
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: 80, opacity: 0.3, ease: 'none'
      });

      const organicShape = document.querySelector('.in-organic-shape');
      if (organicShape) {
        gsap.to(organicShape, {
          scrollTrigger: { trigger: '.internships-new', start: 'top bottom', end: 'bottom top', scrub: 1 },
          y: -30, ease: 'none'
        });
      }

      /* ─────────────────────────────────────
         4. NAVBAR TRANSITION
         ───────────────────────────────────── */
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: '60px top',
        onLeave: () => gsap.to('.navbar', { background: 'rgba(255,255,255,0.98)', borderBottom: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', padding: '6px 0', duration: 0.3 }),
        onEnterBack: () => gsap.to('.navbar', { background: 'transparent', borderBottom: '1px solid transparent', boxShadow: 'none', padding: '10px 0', duration: 0.3 })
      });

      console.log('✅ M Square Animation Engine loaded');

    } catch (err) {
      console.error('Animation engine error:', err);
      document.querySelectorAll('[data-anim], .hw, .hero-sub').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  });
})();
