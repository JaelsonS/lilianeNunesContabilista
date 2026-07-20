# Site Liliana Nunes (HTML estático)

## Arranque local

```bash
cd site
npx --yes serve .
```

Abra o URL indicado (ex.: `http://localhost:3000`). **Não** abra os HTML via `file://` — os partials precisam de `fetch`.

## Estrutura

```
site/
  index.html, sobre.html, servicos.html, contacto.html, faq.html
  politica-de-privacidade.html, termos-de-uso.html, livro-de-reclamacoes.html
  partials/          # header, footer, contact-form, overlays
  assets/css/        # styles.css
  assets/js/         # config + site.js (módulo que arranca tudo)
  assets/img/        # retrato e fotos do gabinete
```

## Dados reais

Edite apenas `assets/js/config.js` (telefone, WhatsApp, email, Formspree, GA4).

## Formulário

Sem `formspreeUrl`, o envio abre o WhatsApp com o pedido preenchido. Com URL Formspree, envia por email e pode abrir WhatsApp a seguir.
