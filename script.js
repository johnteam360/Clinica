document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const animatedBackground = document.getElementById('animated-background');
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const skillElements = document.querySelectorAll('.skill');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const backToTopContainer = document.querySelector('.back-to-top');

    // ===== NAVEGACIÓN MÓVIL =====
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== NAVEGACIÓN FIJA AL HACER SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            // Mostrar el botón de volver arriba
            backToTopContainer.classList.add('visible');
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
            // Ocultar el botón de volver arriba
            backToTopContainer.classList.remove('visible');
        }
        
        // Llamar a la función para comprobar las animaciones de entrada
        handleScrollAnimations();
    });

    // ===== SUAVIZAR NAVEGACIÓN POR ANCLAJES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Solo prevenir el comportamiento predeterminado si no es el botón de volver arriba
            // o si tiene un destino específico
            if (targetId !== '#' || this.id !== 'back-to-top-btn') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else if (this.id === 'back-to-top-btn') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Funcionalidad del botón de volver arriba
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== ANIMACIONES AL HACER SCROLL =====
    function handleScrollAnimations() {
        const triggerBottom = window.innerHeight * 0.85;
        
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    // Ejecutar una vez al cargar para mostrar elementos visibles
    handleScrollAnimations();
    
    // ===== FONDO ANIMADO =====
    function createAnimatedBackground() {
        const numParticles = 20;
        const colors = [
            'rgba(69, 39, 139, 0.7)',
            'rgba(0, 108, 103, 0.7)',
            'rgba(42, 59, 76, 0.7)'
        ];
        
        // Limpiar el contenedor
        animatedBackground.innerHTML = '';
        
        // Crear partículas
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Estilo aleatorio para cada partícula
            const size = Math.random() * 100 + 50;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.filter = 'blur(40px)';
            particle.style.opacity = '0.2';
            
            // Posición aleatoria
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            // Animación
            particle.style.animation = `float ${Math.random() * 10 + 15}s ease-in-out infinite alternate`;
            particle.style.transformOrigin = 'center';
            
            animatedBackground.appendChild(particle);
        }
        
        // Estilo de la animación
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) scale(1);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.3 + 0.8});
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Iniciar el fondo animado
    createAnimatedBackground();
    
    // Volver a crear el fondo cuando la ventana cambia de tamaño
    window.addEventListener('resize', createAnimatedBackground);
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de envío del formulario
            // Por ahora solo simulamos una respuesta exitosa
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Temporizador de cuenta regresiva para la promoción
    function startCountdown() {
        // Establecer una fecha final específica (15 de Julio de 2024 a las 23:59:59)
        const endDate = new Date('July 15, 2024 23:59:59').getTime();
        
        // Actualizar el contador cada segundo
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            // Cálculos para días, horas, minutos y segundos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Mostrar el resultado
            document.getElementById("days").innerHTML = String(days).padStart(2, '0');
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
            
            // Si la cuenta regresiva ha terminado
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById("countdown").innerHTML = "¡La oferta ha expirado!";
            }
        }, 1000);
    }

    // Iniciar el temporizador cuando se carga la página
    startCountdown();
}); 