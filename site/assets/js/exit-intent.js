const MODAL_KEY = 'lnunes_exit_intent_shown';

/**
 * Exit-intent em todos os dispositivos:
 * - Desktop/tablet com rato: cursor a sair pelo topo
 * - Telemóvel/tablet: botão "voltar" do browser
 * - Todos: depois de interação, se mudar de separador e voltar (opcional leve)
 */
export function initExitIntent() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (!backdrop) return;

  const params = new URLSearchParams(location.search);
  if (params.get('exit') === 'reset') {
    sessionStorage.removeItem(MODAL_KEY);
  }

  let shown = sessionStorage.getItem(MODAL_KEY) === '1';
  let armed = false;
  let engaged = false;

  const close = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  const open = (reason = 'exit') => {
    if (shown || !armed) return false;
    shown = true;
    sessionStorage.setItem(MODAL_KEY, '1');
    backdrop.classList.add('open');
    backdrop.dataset.reason = reason;
    document.body.style.overflow = 'hidden';
    return true;
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

  // Marca que a pessoa já interagiu com a página
  const markEngaged = () => {
    engaged = true;
  };
  window.addEventListener('scroll', markEngaged, { passive: true, once: true });
  document.addEventListener('click', markEngaged, { once: true });
  document.addEventListener('touchstart', markEngaged, { passive: true, once: true });

  // ——— Desktop / trackpad: sair com o rato pelo topo ———
  const tryDesktopExit = (e) => {
    if (!armed || shown) return;
    // Se ainda está dentro de um elemento da página, ignorar
    if (e.relatedTarget || e.toElement) return;
    const y = e.clientY;
    // Topo da janela (barra de separadores) ou sair completamente
    if (typeof y === 'number' && y > 40) return;
    open('mouse');
  };

  document.addEventListener('mouseout', tryDesktopExit, true);
  document.documentElement.addEventListener('mouseleave', tryDesktopExit);

  // Reforço: movimento rápido para cima junto ao topo
  let lastY = null;
  document.addEventListener(
    'mousemove',
    (e) => {
      if (!armed || shown) return;
      const y = e.clientY;
      if (lastY !== null && y < 12 && lastY - y > 8) {
        open('mouse-fast');
      }
      lastY = y;
    },
    { passive: true },
  );

  // ——— Telemóvel / tablet: botão voltar ———
  const setupBackTrap = () => {
    if (shown) return;
    try {
      history.pushState({ lnExitGuard: 1 }, '', location.href);
    } catch {
      return;
    }
    window.addEventListener('popstate', () => {
      if (shown) return;
      // Re-empilha para não sair já; mostra o modal
      try {
        history.pushState({ lnExitGuard: 1 }, '', location.href);
      } catch {
        /* ignore */
      }
      open('back');
    });
  };

  // ——— Tablet/mobile: após scroll, se tentar sair (pagehide não permite UI) ———
  // Quando regressa ao separador depois de ter estado fora (engajou antes)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    if (!armed || !engaged || shown) return;
    // Só uma vez se já esteve fora > 8s com a página engajada
    const leftAt = Number(sessionStorage.getItem('lnunes_exit_hidden_at') || 0);
    if (leftAt && Date.now() - leftAt > 8000) {
      open('return');
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && engaged) {
      sessionStorage.setItem('lnunes_exit_hidden_at', String(Date.now()));
    }
  });

  // Armar após 1.5s (rápido o suficiente para demo, sem assustar no 1.º segundo)
  setTimeout(() => {
    armed = true;
    setupBackTrap();
  }, 1500);

  // Demo forçada
  if (params.get('exit') === '1') {
    sessionStorage.removeItem(MODAL_KEY);
    shown = false;
    armed = true;
    setTimeout(() => open('force'), 400);
  }
}
