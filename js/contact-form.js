// JavaScript para o formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Não precisamos prevenir o comportamento padrão, pois queremos que o formulário seja enviado
            
            // Mostrar mensagem de carregamento
            const formMessage = document.getElementById('form-message');
            if (formMessage) {
                formMessage.innerHTML = '<p class="sending-message">Enviando mensagem, por favor aguarde...</p>';
            }
            
            // O Formspree vai lidar com o envio do formulário e redirecionamento
            // Podemos adicionar um evento para quando o formulário for enviado com sucesso
            // Mas isso requer uma implementação mais complexa com AJAX
            
            // Não precisamos retornar false, pois queremos que o formulário seja enviado normalmente
        });
    }
});
