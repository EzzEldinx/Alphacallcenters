// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800, 
        easing: 'ease-out-cubic',
        once: true,
        offset: 100 
    });
    
    // Initialize the micro waterfall effect
    createWaterfall();
    
    // Initialize World Class 3D Tilt effect for Cards
    init3DTilt();
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if(navLinks.classList.contains('active')){
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// ==========================================
// Floating Navbar & Hero 3D Logo Animation
// ==========================================
const navbar = document.querySelector('.navbar');
const floatingLogo = document.getElementById('floating-logo');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    // Navbar Effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 3D Parallax Main Logo Animation
    if (floatingLogo) {
        if (scrollY > 10) {
            floatingLogo.style.animation = 'none';
        } else {
            floatingLogo.style.animation = 'floatLogoPulse 4s ease-in-out infinite alternate';
        }

        let translateY = scrollY * 0.5; 
        let rotateX = scrollY * 0.1;   
        let rotateY = scrollY * 0.05;   
        let scale = Math.max(0.6, 1 - (scrollY * 0.001)); 

        floatingLogo.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        
        if (scrollY > 600) {
            floatingLogo.style.opacity = 0;
        } else {
            floatingLogo.style.opacity = 1 - (scrollY / 600);
        }
    }
});

// ==========================================
// WORLD CLASS 3D TILT EFFECT (For Cards)
// ==========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        let glowColor = 'rgba(211, 0, 0, 0.15)'; 
        if (card.classList.contains('theme-hover-orange') || card.classList.contains('theme-border-orange')) {
            glowColor = 'rgba(255, 115, 0, 0.15)';
        } else if (card.classList.contains('theme-hover-green') || card.classList.contains('theme-border-green')) {
            glowColor = 'rgba(57, 255, 20, 0.15)';
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            let shadowColor = 'rgba(211, 0, 0, 0.2)';
            if (card.classList.contains('theme-hover-orange') || card.classList.contains('theme-border-orange')) shadowColor = 'rgba(255, 115, 0, 0.2)';
            if (card.classList.contains('theme-hover-green') || card.classList.contains('theme-border-green')) shadowColor = 'rgba(57, 255, 20, 0.2)';
            
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px ${shadowColor}`;
            
            if(glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor.replace('0.15', '0.25')} 0%, transparent 60%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = `none`;
            if(glow) glow.style.background = `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 60%)`;
        });
    });
}

// ==========================================
// MICRO WATERFALL EFFECT
// ==========================================
function createWaterfall() {
    const container = document.getElementById('waterfall-container');
    const numberOfItems = 35; 

    for (let i = 0; i < numberOfItems; i++) {
        let img = document.createElement('img');
        img.src = 'logo1.png'; 
        img.className = 'waterfall-item';
        
        let size = Math.random() * 15 + 15; 
        let left = Math.random() * 100; 
        let duration = Math.random() * 15 + 10; 
        let delay = Math.random() * 10; 
        
        img.style.width = `${size}px`;
        img.style.left = `${left}vw`;
        img.style.animation = `fallDown ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(img);
    }
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fallDown {
    0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.15; }
    90% { opacity: 0.15; }
    100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);