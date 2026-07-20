# Liliana Nunes — Contabilista Certificada (Coimbra)

Website estático profissional em **HTML + CSS + JavaScript** na pasta [`site/`](site/).

## Ver o site localmente

```bash
cd site
npx serve .
```

## Deploy na Vercel (recomendado para apresentação)

1. Importe este repositório na Vercel
2. Em **Root Directory** escolha: `site`
3. Framework Preset: **Other**
4. Deploy

URL de preview fica pronta para mostrar à cliente. Depois ligue o domínio nela.

Plano pré-produção: [`docs/PLANO-EVOLUCAO-PRE-PRODUCAO.md`](docs/PLANO-EVOLUCAO-PRE-PRODUCAO.md).

## Estrutura

| Pasta / ficheiro | Função |
|------------------|--------|
| `site/partials/` | Header, footer, formulário, overlays |
| `site/assets/css/styles.css` | Design system |
| `site/assets/js/config.js` | Contactos, WhatsApp, Formspree, GA4 |
| `site/assets/js/i18n.js` | PT / EN |
| `docs/` | Planos e proposta |

## Depois do domínio

1. Actualizar `url` em `site/assets/js/config.js`
2. Confirmar `robots.txt` + `sitemap.xml`
3. Google Search Console + Google Business Profile
4. Colocar `formspreeUrl` quando o formulário passar a email
