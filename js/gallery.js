// JavaScript para a galeria com visualização em tela cheia e navegação por slides

document.addEventListener('DOMContentLoaded', function() {
    // Criar elementos para o lightbox
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <div class="lightbox-container">
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
            <button class="lightbox-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    document.body.appendChild(lightboxOverlay);

    // Selecionar elementos do lightbox
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Variáveis para controlar a galeria
    let currentIndex = 0;
    let galleryImages = [];

    // Inicializar a galeria
    function initGallery() {
        // Selecionar todas as imagens da galeria
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        // Se não houver imagens, adicionar algumas imagens de exemplo
        if (galleryItems.length === 0) {
            createSampleGallery();
            return;
        }
        
        // Armazenar informações das imagens
        galleryImages = Array.from(galleryItems).map((img, index) => {
            return {
                src: img.src,
                alt: img.alt || `Imagem ${index + 1}`,
                caption: img.dataset.caption || ''
            };
        });
        
        // Adicionar evento de clique para cada imagem
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
    }

    // Criar galeria de exemplo se não houver imagens
    function createSampleGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        if (!galleryContainer) return;
        
        // Imagens de exemplo relacionadas a doação de sangue
        const sampleImages = [
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Evento+de+Doação',
                alt: 'Evento de Doação',
                caption: 'Evento trimestral de doação de sangue'
            },
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Torcedores+Flamengo',
                alt: 'Torcedores do Flamengo',
                caption: 'Torcedores do Flamengo participando do evento'
            },
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Torcedores+Vasco',
                alt: 'Torcedores do Vasco',
                caption: 'Torcedores do Vasco participando do evento'
            },
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Hemorio',
                alt: 'Hemorio',
                caption: 'Fachada do Hemorio, local dos eventos'
            },
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Doadores',
                alt: 'Doadores',
                caption: 'Doadores recebendo certificados de participação'
            },
            {
                src: 'https://via.placeholder.com/800x600/a70000/ffffff?text=Premiação',
                alt: 'Premiação',
                caption: 'Premiação do time vencedor do último evento'
            }
        ];
        
        // Armazenar informações das imagens
        galleryImages = sampleImages;
        
        // Criar elementos da galeria
        sampleImages.forEach((img, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" data-caption="${img.caption}">
                <div class="gallery-caption">${img.caption}</div>
            `;
            galleryContainer.appendChild(galleryItem);
            
            // Adicionar evento de clique
            const imgElement = galleryItem.querySelector('img');
            imgElement.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
    }

    // Abrir o lightbox
    function openLightbox(index) {
        if (galleryImages.length === 0) return;
        
        currentIndex = index;
        updateLightboxContent();
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impedir rolagem da página
    }

    // Fechar o lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar rolagem da página
    }

    // Atualizar o conteúdo do lightbox
    function updateLightboxContent() {
        const image = galleryImages[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.caption;
        
        // Atualizar estado dos botões de navegação
        lightboxPrev.style.display = currentIndex > 0 ? 'block' : 'none';
        lightboxNext.style.display = currentIndex < galleryImages.length - 1 ? 'block' : 'none';
    }

    // Navegar para a imagem anterior
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent();
        }
    }

    // Navegar para a próxima imagem
    function nextImage() {
        if (currentIndex < galleryImages.length - 1) {
            currentIndex++;
            updateLightboxContent();
        }
    }

    // Adicionar eventos de clique para os botões
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Adicionar eventos de teclado
    document.addEventListener('keydown', function(e) {
        if (!lightboxOverlay.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Fechar o lightbox ao clicar fora da imagem
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Inicializar a galeria
    initGallery();
});
