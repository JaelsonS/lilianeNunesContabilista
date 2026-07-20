import { loadIncludes } from './includes.js';
import { initMain } from './main.js';
import { initForms } from './forms.js';
import { initCookies } from './cookies.js';
import { initAnalytics } from './analytics.js';
import { initExitIntent } from './exit-intent.js';

async function boot() {
  await loadIncludes();
  initMain();
  initForms();
  initCookies();
  initAnalytics();
  initExitIntent();

  // Marca o que já está no ecrã antes de activar o hide/show
  document.querySelectorAll('.reveal').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) el.classList.add('visible');
  });
  document.documentElement.classList.add('has-js');
}

boot().catch((err) => {
  console.error(err);
  document.documentElement.classList.remove('has-js');
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
});
