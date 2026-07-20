import { whatsappUrl } from './main.js';

function setStatus(form, message, ok) {
  const status = form.querySelector('.form-status');
  if (!status) return;
  status.textContent = message || '';
  status.classList.remove('success', 'error');
  if (!message) {
    status.style.display = 'none';
    return;
  }
  status.classList.add(ok ? 'success' : 'error');
}

function leadWhatsAppMessage(data) {
  const lines = [
    'Olá Liliana! Enviei um pedido pelo site:',
    `Serviço: ${data.service || '—'}`,
    `Nome: ${data.name}`,
    `Telefone: ${data.phone}`,
    `Email: ${data.email}`,
  ];
  if (data.message) lines.push(`Mensagem: ${data.message}`);
  return lines.join('\n');
}

export function initForms() {
  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const payload = {
        service: String(fd.get('service') || ''),
        name: String(fd.get('name') || ''),
        phone: String(fd.get('phone') || ''),
        email: String(fd.get('email') || ''),
        message: String(fd.get('message') || ''),
        _subject: 'Novo pedido — site Liliana Nunes',
      };

      const url = window.SITE?.formspreeUrl;
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        if (!url) {
          setStatus(
            form,
            'Obrigado! Vamos abrir o WhatsApp com a mensagem já preenchida.',
            true,
          );
          if (window.SITE?.openWhatsAppAfterLead !== false) {
            window.open(whatsappUrl(leadWhatsAppMessage(payload)), '_blank', 'noopener');
          }
          form.reset();
          return;
        }

        const res = await fetch(url, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Falha no envio');

        setStatus(form, 'Pedido enviado com sucesso. Obrigado!', true);
        form.reset();

        if (window.SITE?.openWhatsAppAfterLead) {
          setTimeout(() => {
            window.open(whatsappUrl(leadWhatsAppMessage(payload)), '_blank', 'noopener');
          }, 600);
        }
      } catch {
        setStatus(
          form,
          'Não foi possível enviar. Por favor use o WhatsApp ou telefone.',
          false,
        );
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
}
