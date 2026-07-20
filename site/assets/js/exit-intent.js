const MODAL_KEY = 'lnunes_exit_intent_shown';

export function initExitIntent() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;

  const close = () => backdrop.classList.remove('open');

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', close);
  });
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const open = () => {
    if (sessionStorage.getItem(MODAL_KEY)) return;
    backdrop.classList.add('open');
    sessionStorage.setItem(MODAL_KEY, '1');
  };

  let maxScrollY = 0;

  window.addEventListener(
    'scroll',
    () => {
      maxScrollY = Math.max(maxScrollY, window.scrollY || 0);
    },
    { passive: true },
  );

  const onMouseOut = (e) => {
    if (e.clientY > 0) return;
    if (maxScrollY < 280) return;
    open();
    document.removeEventListener('mouseout', onMouseOut);
  };

  window.addEventListener('load', () => {
    setTimeout(() => document.addEventListener('mouseout', onMouseOut), 8000);
  });
}
