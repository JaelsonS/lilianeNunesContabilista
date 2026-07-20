# `site/` — guia de desenvolvimento

Pasta publicada em produção. Tudo o que corre no browser está aqui.

## Arranque

```bash
cd site
npx --yes serve .
```

Servidor local obrigatório (`fetch` dos partials). Exemplo: `http://localhost:3000`.

## Mapa de pastas

```
site/
├── *.html                 # rotas / páginas
├── partials/
│   ├── header.html        # nav + bandeiras PT/EN + menu mobile
│   ├── footer.html
│   ├── contact-form.html  # formulário sticky (orçamento)
│   └── overlays.html      # WhatsApp float, exit-intent, cookies
├── assets/
│   ├── css/
│   │   ├── styles.css     # design system
│   │   └── icons.css      # ícones SVG (sem Font Awesome)
│   ├── js/
│   │   ├── config.js      # dados do negócio (editar aqui)
│   │   ├── site.js        # entrypoint (ES module)
│   │   ├── includes.js    # carrega partials
│   │   ├── main.js        # header, nav, i18n apply, WhatsApp
│   │   ├── i18n.js        # dicionário PT/EN
│   │   ├── forms.js       # submit Formspree ou WhatsApp
│   │   ├── cookies.js
│   │   ├── analytics.js
│   │   └── exit-intent.js
│   └── img/               # retrato + variantes WebP/JPEG
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Fluxo de boot

1. `config.js` define `window.SITE`
2. `site.js` (module) → `loadIncludes()` injeta partials
3. `initMain()` liga navegação, idioma, WhatsApp, ano IRS
4. `initForms()` trata o formulário
5. Cookies / GA4 arrancam em idle (não bloqueiam LCP)
6. Exit-intent activa-se cedo (desktop + mobile)

## Idiomas

- UI curta: chaves em `i18n.js` + atributos `data-i18n`
- Textos longos: blocos `data-lang="pt"` / `data-lang="en"`
- Preferência guardada em `localStorage` (`lnunes_lang`)

## Formulário

| `formspreeUrl` | Comportamento |
|----------------|---------------|
| `''` (vazio) | Abre WhatsApp com o pedido formatado |
| URL Formspree | POST JSON + opção de abrir WhatsApp a seguir |

## Exit-intent (testes)

| URL | Efeito |
|-----|--------|
| `/?exit=1` | Força abrir o modal |
| `/?exit=reset` | Limpa `sessionStorage` para voltar a testar |

## Checklist antes de entregar a um cliente

- [ ] Dados em `config.js` (telefone, email, WhatsApp, morada)
- [ ] `formspreeUrl` ou confirmação de fluxo só WhatsApp
- [ ] `sitemap.xml` / `robots.txt` com domínio final
- [ ] Canonicals / OG image com domínio final
- [ ] Teste mobile real (menu, bandeiras, formulário, WhatsApp)
- [ ] Página legal revista com a cliente
