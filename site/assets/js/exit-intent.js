const MODAL_KEY = 'lnunes_exit_intent_shown';

export function initExitIntent() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;

  let armed = false;
  let opened = false;

  const close = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  const open = () => {
    if (opened) return;
    if (sessionStorage.getItem(MODAL_KEY)) return;
    opened = true;
    sessionStorage.setItem(MODAL_KEY, '1');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', close);
  });
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Desktop: rato a sair pelo topo da janela
  const onMouseLeave = (e) => {
    if (!armed || opened) return;
    // Só quando o cursor sai da página (não para um filho)
    if (e.relatedTarget || e.toElement) return;
    if (e.clientY > 8) return;
    open();
  };

  // Fallback: mouseout no document (alguns browsers)
  const onMouseOut = (e) => {
    if (!armed || opened) return;
    if (e.clientY > 0) return;
    if (e.relatedTarget || e.toElement) return;
    open();
  };

  const arm = () => {
    armed = true;
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseout', onMouseOut);
  };

  // Não depender de window "load" (módulos + fetch já passaram o load)
  // Armar após 2.5s — tempo mínimo para a pessoa ver a página
  setTimeout(arm, 2500);

  // Em mobile não há exit-intent por rato; opcionalmente após scroll profundo
  let maxScrollY = 0;
  window.addEventListener(
    'scroll',
    () => {
      maxScrollY = Math.max(maxScrollY, window.scrollY || 0);
    },
    { passive: true },
  );

  // Botão de teste: ?exit=1 na URL (útil para demo à cliente)
  const params = new URLSearchParams(location.search);
  if (params.get('exit') === '1') {
    sessionStorage.removeItem(MODAL_KEY);
    setTimeout(open, 600);
  }
  if (params.get('exit') === 'reset') {
    sessionStorage.removeItem(MODAL_KEY);
  }
}
