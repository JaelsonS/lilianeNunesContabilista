# Plano de evolução — pré-produção

## Estado actual
Site HTML estático em `site/` com design premium, PT/EN (bandeiras), WhatsApp, formulário, SEO básico.

## Pode fazer commit agora?
**Sim, commit sim** — para guardar o progresso.

## Pode fazer deploy em produção agora?
**Deploy “soft launch” sim; produção “oficial” ainda não sem estes checks:**

### Bloqueantes antes de produção oficial
1. **Formspree (ou endpoint real)** em `assets/js/config.js` — hoje o formulário abre WhatsApp
2. **Domínio + HTTPS** e NAP idêntico (morada/telefone/email) em Google Business
3. **Teste real mobile** (iPhone + Android) no menu, formulário e bandeiras
4. **GA4** (opcional mas recomendado) + cookies alinhados com política
5. **Legal**: rever textos de privacidade/termos com a Liliana
6. **Sitemap/robots** com URL final do domínio
7. **Hard refresh / cache** no hosting após deploy

### Evolução recomendada (após 1.º deploy)
**Fase A — Conversão (1–2 semanas)**
- Formspree + email da Liliana
- Página de obrigado / confirmação
- CTA IRS sazonal reforçado

**Fase B — Confiança (2–4 semanas)**
- 3–5 testemunhos reais (com autorização)
- Secção “como começamos a trabalhar”
- FAQ expandida com pesquisas reais de clientes

**Fase C — SEO local (1 mês)**
- Google Business Profile optimizado
- Schema Review / FAQ completo
- Landing Coimbra + “trabalhador independente”

**Fase D — Integrações (quando houver volume)**
- Teglion / CRM de leads
- Calendly ou agenda embutida
- Automações WhatsApp Business

**Fase E — Template multi-escritório**
- Extrair `config.js` + tokens CSS para clonar o site para outros gabinetes
