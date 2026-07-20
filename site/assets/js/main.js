export function whatsappUrl(message) {
  const cfg = window.SITE;
  if (!cfg?.whatsapp) return '#';
  const q = encodeURIComponent(message || cfg.whatsappMessage || '');
  return `https://api.whatsapp.com/send/?phone=${cfg.whatsapp}&text=${q}`;
}

function bindWhatsApp() {
  const cfg = window.SITE;
  const lang = cfg?._lang === 'en' ? 'en' : 'pt';
  const defaultMsg = cfg?.whatsappMessage || '';

  document.querySelectorAll('[data-wa]').forEach((el) => {
    const kind = el.getAttribute('data-wa');
    let msg = defaultMsg;
    if (kind === 'irs') {
      msg =
        lang === 'en'
          ? `Hello Liliana! I would like to request a personal tax estimate for ${new Date().getFullYear()}.`
          : `Olá Liliana! Gostaria de pedir uma simulação de IRS ${new Date().getFullYear()}.`;
    } else if (kind === 'exit') {
      msg =
        lang === 'en'
          ? 'Hello Liliana! I have a quick question about accounting.'
          : 'Olá Liliana! Tenho uma dúvida rápida sobre contabilidade.';
    }
    const custom = el.getAttribute('data-wa-message');
    if (custom) msg = custom;

    el.setAttribute('href', whatsappUrl(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

function bindSiteData() {
  const s = window.SITE;
  if (!s) return;

  document.querySelectorAll('[data-bind="address"]').forEach((el) => {
    el.textContent = s.address;
  });
  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = s.phone;
  });
  document.querySelectorAll('[data-bind="phone-link"]').forEach((el) => {
    el.setAttribute('href', `tel:${s.phoneE164}`);
  });
  document.querySelectorAll('[data-bind="email"]').forEach((el) => {
    el.textContent = s.email;
  });
  document.querySelectorAll('[data-bind="email-link"]').forEach((el) => {
    el.setAttribute('href', `mailto:${s.email}`);
  });
  document.querySelectorAll('[data-bind="wa-display"]').forEach((el) => {
    el.textContent = s.whatsappDisplay || `+${s.whatsapp}`;
  });
  document.querySelectorAll('[data-bind="hours"]').forEach((el) => {
    el.textContent = s.hours || '';
  });
}

function initIrsYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year], [data-irs-year]').forEach((el) => {
    el.textContent = year;
  });
}

function currentPageKey() {
  const file = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  if (!file || file === 'index' || file === '') return 'index';
  return file;
}

function initHomeClass() {
  if (currentPageKey() === 'index') {
    document.body.classList.add('is-home');
  }
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 12);
  update();
  let raf = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    },
    { passive: true },
  );
}

function initMobileNav() {
  const drawer = document.querySelector('.mobile-nav');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!drawer) return;

  const openBtns = document.querySelectorAll('[data-open-nav]');

  const open = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
    openBtns.forEach((b) => b.setAttribute('aria-expanded', 'true'));
  };

  const close = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
    openBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };

  openBtns.forEach((btn) => btn.addEventListener('click', open));
  document.querySelectorAll('[data-close-nav]').forEach((btn) => {
    btn.addEventListener('click', close);
  });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function initActiveNav() {
  const key = currentPageKey();
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.getAttribute('data-nav') === key) a.classList.add('active');
  });
}

import { applyI18n } from './i18n.js';

function initLangSwitch() {
  const stored = localStorage.getItem('lnunes_lang');
  const initial = stored === 'en' ? 'en' : 'pt';
  applyI18n(initial);
  bindWhatsApp();

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-set-lang') === 'en' ? 'en' : 'pt';
      localStorage.setItem('lnunes_lang', lang);
      applyI18n(lang);
      bindWhatsApp();
    });
  });
}

export function initMain() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initHomeClass();
  bindSiteData();
  initIrsYear();
  initHeaderScroll();
  initMobileNav();
  initReveal();
  initActiveNav();
  initLangSwitch();
}
