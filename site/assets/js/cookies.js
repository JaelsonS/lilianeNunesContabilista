const STORAGE_KEY = 'lnunes_cookie_consent_v1';

export function initCookies() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  function save(consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('lnunes:consent', { detail: consent }));
    banner.hidden = true;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    banner.hidden = false;
  } else {
    try {
      window.dispatchEvent(
        new CustomEvent('lnunes:consent', { detail: JSON.parse(stored) }),
      );
    } catch {
      banner.hidden = false;
    }
  }

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    save({ essential: true, analytics: true, marketing: false, ts: Date.now() });
  });

  document.getElementById('cookie-reject')?.addEventListener('click', () => {
    save({ essential: true, analytics: false, marketing: false, ts: Date.now() });
  });
}
