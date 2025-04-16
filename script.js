
document.addEventListener('DOMContentLoaded', function() {
    
    window.toggleMenu = function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
    };

    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const revealElements = document.querySelectorAll('.section-container');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    
    window.addEventListener('load', checkReveal);
    
    
    window.addEventListener('scroll', checkReveal);

    
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
            this.querySelector('p').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('p').style.transform = 'translateY(100%)';
        });
    });

    
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('O trailer estará disponível em breve!');
        });
    }

    
    const hero = document.querySelector('.hero');
    
    if (hero) {
       
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        
        hero.appendChild(canvas);
        
        
        const ctx = canvas.getContext('2d');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = this.getRandomColor();
            }
            
            getRandomColor() {
                const colors = [
                    'rgba(78, 42, 132, 0.7)',  
                    'rgba(138, 79, 255, 0.7)', 
                    'rgba(255, 140, 0, 0.7)',  
                    'rgba(255, 188, 66, 0.7)' 
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) this.size -= 0.01;
                
                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
            }
        }
        
        
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                
                if (particles[i].size <= 0.2) {
                    particles[i] = new Particle();
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        
        window.addEventListener('resize', function() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        });
    }

    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
           
            
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            
            setTimeout(function() {
                
                
            }, 1000);
            
            
            return true;
        });
    }

    
    const notifyButton = document.querySelector('#jogar .cta-button');
    
    if (notifyButton) {
        notifyButton.addEventListener('click', function() {
            
            
            alert('Obrigado pelo interesse! Quando o jogo estiver disponível, enviaremos uma notificação.');
        });
    }

    
    const personagemCards = document.querySelectorAll('.personagem-card');
    
    personagemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.boxShadow = '0 0 20px rgba(138, 79, 255, 0.8)';
            
            
            personagemCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            
            this.style.transform = '';
            this.style.boxShadow = '';
            
            
            personagemCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
});