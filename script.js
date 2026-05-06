/* ═══ M Square — Core Script ═══ */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu || !nav) return;
  const spans = toggle.querySelectorAll('span');

  // Navbar scroll
  const checkScroll = () => nav.classList.toggle('scrolled', scrollY > 60);
  addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  // Mobile menu
  const closeMenu = () => {
    menu.classList.remove('active');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  };
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('active');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  addEventListener('scroll', () => {
    const y = scrollY + 140;
    sections.forEach(s => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        links.forEach(l => l.style.color = l.getAttribute('href') === '#' + s.id ? '#D4AF37' : '');
      }
    });
  }, { passive: true });
});
