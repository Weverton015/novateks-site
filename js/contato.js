document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const WHATSAPP_NUMBER = '5596984272834';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const negocio = form.negocio.value.trim();
    const tipo = form.tipo.value;
    const mensagem = form.mensagem.value.trim();

    let text = `Olá! Meu nome é ${nome}.`;
    if (negocio) text += ` Represento: ${negocio}.`;
    if (tipo) text += ` Tenho interesse em: ${tipo}.`;
    if (mensagem) text += ` ${mensagem}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
});
