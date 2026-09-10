const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
};

const closeNavigation = () => {
  if (!navToggle || !nav) return;

  navToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
};

const openNavigation = () => {
  if (!navToggle || !nav) return;

  navToggle.setAttribute('aria-expanded', 'true');
  nav.classList.add('is-open');
  document.body.classList.add('nav-open');
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeNavigation();
    else openNavigation();
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavigation();
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) closeNavigation();
  });
}

requestAnimationFrame(() => {
  document.body.classList.add('is-ready');
});
