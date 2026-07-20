export function initAnalytics() {
  const id = window.SITE?.ga4Id;
  if (!id) return;

  window.addEventListener('lnunes:consent', (ev) => {
    const consent = ev.detail;
    if (!consent?.analytics) return;
    if (document.getElementById('ga4-script')) return;

    const s = document.createElement('script');
    s.id = 'ga4-script';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
  });
}
