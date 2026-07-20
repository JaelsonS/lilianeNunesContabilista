# Liliana Nunes — Contabilista Certificada

> Site institucional de demonstração desenvolvido sob encomenda (freelance) para um gabinete de contabilidade em Coimbra, Portugal.

**Demo online:** [lilianenunescontabilista.vercel.app](https://lilianenunescontabilista.vercel.app)

---

## O problema

Profissionais liberais e pequenos gabinetes precisam de presença digital **credível**, rápida de carregar e orientada a contacto — sem a complexidade (e o custo mensal) de um CMS pesado.

Este projecto responde a isso com um site estático, bilíngue (PT/EN), optimizado para telemóvel e preparado para gerar leads via WhatsApp e formulário.

## O que foi entregue

| Área | Implementação |
|------|----------------|
| Páginas | Home, Sobre, Serviços, FAQ, Contacto + páginas legais |
| Idiomas | Português e Inglês com selector por bandeiras |
| Conversão | CTAs WhatsApp, formulário sticky, exit-intent, cookies |
| SEO técnico | Meta tags, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` |
| Performance | Ícones SVG locais, fontes async, imagens WebP responsivas |
| Deploy | Vercel (HTML estático, root `site/`) |

## Stack (e porquê)

```
HTML5 · CSS3 · JavaScript (ES Modules)
```

Optei por **vanilla** de propósito:

- zero dependências de build para a cliente manter / eu iterar rápido
- hosting barato e previsível (Vercel / Netlify / qualquer estático)
- performance controlável sem bundle gigante
- código legível para handoff ou evolução futura (Astro, CMS, etc.)

> Decisão consciente: não usar React/Next só por hábito. Para um marketing site local, HTML bem estruturado ganha em tempo de entrega e Core Web Vitals.

## Como correr localmente

Pré-requisito: [Node.js](https://nodejs.org/) (para servir ficheiros com `npx`).

```bash
git clone https://github.com/JaelsonS/lilianeNunesContabilista.git
cd lilianeNunesContabilista/site
npx --yes serve .
```

Abra o URL que aparecer (ex.: `http://localhost:3000`).

> **Importante:** não abra os `.html` directamente com `file://`. Os partials (header/footer) carregam com `fetch` e precisam de um servidor HTTP.

## Estrutura do repositório

```
lilianeNunesContabilista/
├── README.md                 ← este ficheiro
├── docs/                     ← arquitectura e roadmap
└── site/                     ← aplicação (deploy root)
    ├── index.html            ← páginas
    ├── partials/             ← header, footer, form, overlays
    ├── assets/
    │   ├── css/              ← design system + ícones
    │   ├── js/               ← módulos ES (boot, i18n, forms…)
    │   └── img/              ← retrato e variantes WebP
    ├── robots.txt
    ├── sitemap.xml
    └── vercel.json           ← headers + clean URLs
```

Detalhe técnico: [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)

## Configuração rápida

Tudo o que é “dado de negócio” está centralizado:

```js
// site/assets/js/config.js
window.SITE = {
  email: '...',
  phone: '...',
  whatsapp: '3519...',
  formspreeUrl: '',   // vazio = envia via WhatsApp
  ga4Id: '',
  // ...
};
```

| Campo | Efeito |
|-------|--------|
| `whatsapp` | Links “Agendar” / float button |
| `formspreeUrl` | Endpoint real do formulário (opcional) |
| `ga4Id` | Analytics após consentimento de cookies |

## Deploy (Vercel)

1. Importar este repositório
2. **Root Directory:** `site`
3. Framework: **Other**
4. Deploy

Configuração em [`site/vercel.json`](site/vercel.json) (clean URLs + cache de assets + headers de segurança básicos).

## Roadmap / próximas fases

Documento de evolução pós-demo: [`docs/ROADMAP.md`](docs/ROADMAP.md)

Resumo: Formspree + domínio → Google Business / Search Console → testemunhos → CRM (ex. Teglion) → template reutilizável para outros gabinetes.

## O que este projecto demonstra (para recrutadores)

- Capacidade de **traduzir um brief de cliente** em produto navegável
- Critério de stack (simples quando basta; preparado para crescer)
- UI responsiva, i18n, SEO e performance tratados como requisitos — não “extras”
- Código organizado (partials, módulos ES, config única)
- Entrega freelance com **demo pública** e plano de evolução comercial

## Autor

**Jaelson Silva dos Santos** — desenvolvimento web / freelance  

- GitHub: [JaelsonS](https://github.com/JaelsonS)
- Demo deste projecto: [lilianenunescontabilista.vercel.app](https://lilianenunescontabilista.vercel.app)

Interessado num site parecido para o seu negócio ou numa colaboração em equipa? Abra uma issue neste repositório ou contacte-me pelo GitHub.

---

## Licença

Código disponibilizado para portfolio e demonstração.  
Conteúdos, marca e dados da cliente pertencem à respetiva titular — não reutilizar a identidade visual/comercial sem autorização.
