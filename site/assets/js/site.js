import { loadIncludes } from './includes.js';
import { initMain } from './main.js';
import { initForms } from './forms.js';
import { initExitIntent } from './exit-intent.js';

async function boot() {
  await loadIncludes();
  initMain();
  initForms();
  // Exit-intent cedo — precisa de listeners activos no desktop
  initExitIntent();

  document.querySelectorAll('.reveal').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) el.classList.add('visible');
  });
  document.documentElement.classList.add('has-js');

  // Cookies / analytics podem esperar
  const defer = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
  defer(async () => {
    const [{ initCookies }, { initAnalytics }] = await Promise.all([
      import('./cookies.js'),
      import('./analytics.js'),
    ]);
    initCookies();
    initAnalytics();
  });
}

boot().catch((err) => {
  console.error(err);
  document.documentElement.classList.remove('has-js');
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
});
