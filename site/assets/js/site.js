import { loadIncludes } from './includes.js';
import { initMain } from './main.js';
import { initForms } from './forms.js';

async function boot() {
  await loadIncludes();
  initMain();
  initForms();

  // Marca o que já está no ecrã antes de activar o hide/show
  document.querySelectorAll('.reveal').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) el.classList.add('visible');
  });
  document.documentElement.classList.add('has-js');

  // Diferir cookies / analytics / exit-intent (não bloqueiam LCP)
  const defer = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
  defer(async () => {
    const [{ initCookies }, { initAnalytics }, { initExitIntent }] = await Promise.all([
      import('./cookies.js'),
      import('./analytics.js'),
      import('./exit-intent.js'),
    ]);
    initCookies();
    initAnalytics();
    initExitIntent();
  });
}

boot().catch((err) => {
  console.error(err);
  document.documentElement.classList.remove('has-js');
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
});
