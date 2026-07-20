# Arquitectura técnica

## Visão geral

Site **estático multi-página** com partials partilhados via `fetch`, JavaScript em **ES Modules** e CSS próprio (design system).

```
Browser
  │
  ├─ HTML da página (conteúdo + SEO)
  ├─ assets/css/styles.css + icons.css
  ├─ assets/js/config.js          (dados)
  └─ assets/js/site.js            (boot)
        ├─ includes.js            → partials/*.html
        ├─ main.js + i18n.js
        ├─ forms.js
        ├─ exit-intent.js
        └─ (idle) cookies.js + analytics.js
```

## Decisões de desenho

### Partials em vez de duplicar header/footer

Cada página tem um placeholder:

```html
<div data-include="partials/header.html"></div>
```

`includes.js` substitui o nó pelo HTML do partial.  
**Trade-off:** precisa de HTTP server; ganho: uma única fonte de verdade para navegação e CTAs.

### Config centralizada

`config.js` evita hardcode de telefone/WhatsApp em dezenas de sítios.  
Útil para clonar o projecto para outro gabinete (template freelance).

### i18n híbrido

- Strings de interface → dicionário `i18n.js`
- Parágrafos longos → markup `data-lang`

Evita um framework i18n e mantém o HTML legível para a cliente rever textos.

### Performance

- Sem Font Awesome (ícones SVG locais em `icons.css`)
- Fontes Google com `preload` + `display=swap` e poucos pesos
- Hero em `<picture>` + WebP responsivo
- Scripts não críticos em `requestIdleCallback`

### SEO

- Canonical e Open Graph absolutos
- JSON-LD `AccountingService` na home
- FAQ com schema na página FAQ
- `sitemap.xml` + `robots.txt`
- `vercel.json` com clean URLs (`/sobre` em vez de `/sobre.html`)

## Extensões naturais

| Necessidade | Caminho sugerido |
|-------------|------------------|
| Blog / conteúdo frequente | Migrar para Astro mantendo o CSS |
| CMS para a cliente editar | Sanity / Decapage + build estático |
| Leads no CRM | Webhook Formspree → Make/Zapier → Teglion |
| Multi-cliente (white-label) | Extrair tokens CSS + `config.js` por tenant |

## Convenções

- Português de Portugal no copy da cliente
- Classes CSS semânticas (BEM leve / utilitários pontuais)
- Sem jQuery; APIs nativas (`IntersectionObserver`, `sessionStorage`, etc.)
