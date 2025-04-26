// JavaScript para o projeto Paixão na Veia

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Contador regressivo para o próximo evento
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Definir a data do próximo evento (3 meses a partir de agora)
        const now = new Date();
        let nextEventDate = new Date(now.getFullYear(), now.getMonth() + 3, 1);
        
        // Atualizar o contador a cada segundo
        function updateCountdown() {
            const currentDate = new Date();
            const diff = nextEventDate - currentDate;
            
            // Se a data já passou, definir a próxima data (mais 3 meses)
            if (diff < 0) {
                nextEventDate = new Date(nextEventDate.getFullYear(), nextEventDate.getMonth() + 3, 1);
                updateCountdown();
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = hours;
            document.getElementById('countdown-minutes').textContent = minutes;
            document.getElementById('countdown-seconds').textContent = seconds;
        }
        
        // Atualizar a data do próximo evento no HTML
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('next-event-date').textContent = nextEventDate.toLocaleDateString('pt-BR', options);
        
        // Iniciar o contador
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Animação para os contadores de doações
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200;
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }
        
        // Iniciar animação quando os elementos estiverem visíveis
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por enquanto, apenas mostraremos uma mensagem de sucesso
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formMessage.style.color = 'green';
            
            // Limpar o formulário
            contactForm.reset();
            
            // Limpar a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }
});
