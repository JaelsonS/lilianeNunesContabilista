/**
 * Carrega partials via fetch (caminhos relativos à página).
 * Aceita: data-include="partials/header.html" ou data-include="header"
 */
export async function loadIncludes() {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all(
    Array.from(slots).map(async (slot) => {
      const raw = (slot.getAttribute('data-include') || '').trim();
      if (!raw) return;

      let url = raw;
      if (!raw.includes('/') && !raw.endsWith('.html')) {
        url = `partials/${raw}.html`;
      }
      // remove leading slash so relative resolution works from /site/ or file://
      if (url.startsWith('/')) url = url.slice(1);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${url}`);
        const html = await res.text();
        slot.insertAdjacentHTML('afterend', html);
        slot.remove();
      } catch (err) {
        console.warn('Partial não carregado:', url, err);
        slot.innerHTML = `<!-- falha ao carregar ${url} -->`;
      }
    }),
  );
}
