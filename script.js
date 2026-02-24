/**
 * Alpha Call Centers - Main Interaction Script
 * Features: AOS, Mobile Menu, Smooth Scroll, 3D Parallax Logo, 
 * 3D Interactive Tilt Cards, and Micro Waterfall Effect.
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, 
            easing: 'ease-out-cubic',
            once: true,
            offset: 100 
        });
    }
    
    // 2. Start the Micro Waterfall Particles
    createWaterfall();
    
    // 3. Initialize the 3D Interactive Tilt effect for Services and Packages
    init3DTilt();
    
    // 4. Set up Navbar Scrollspy and Logo Parallax
    initNavbarAndScrollspy();
});

// --- Mobile Menu Toggle Functionality ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if(hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, 
                behavior: 'smooth'
            });
        }
    });
});

// --- Navbar Scrollspy & Hero Logo 3D Parallax ---
function initNavbarAndScrollspy() {
    const navbar = document.querySelector('.navbar');
    const floatingLogo = document.getElementById('floating-logo');
    const sections = document.querySelectorAll("section, header");
    const navLinksList = document.querySelectorAll(".nav-link");

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        // Navbar Styling on Scroll
        if (navbar) {
            if (scrollY > 50) { 
                navbar.classList.add('scrolled'); 
            } else { 
                navbar.classList.remove('scrolled'); 
            }
        }

        // Scrollspy Logic (Update active nav link)
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

        // 3D Main Logo "Falling & Rotating" Effect
        if (floatingLogo && scrollY < 700) {
            if (scrollY > 10) {
                floatingLogo.style.animation = 'none';
            } else {
                floatingLogo.style.animation = 'floatLogoPulse 4s ease-in-out infinite alternate';
            }
            let translateY = scrollY * 0.45; 
            let rotateX = scrollY * 0.12;    
            let scale = Math.max(0.5, 1 - (scrollY * 0.0012)); 

            floatingLogo.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
            floatingLogo.style.opacity = 1 - (scrollY / 600);
        }
    });
}

// --- WORLD CLASS 3D TILT EFFECT (Card Interaction) ---
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        // Dynamic Glow Color based on Card Theme
        let glowColor = 'rgba(211, 0, 0, 0.15)'; // Default Red
        if (card.classList.contains('theme-hover-orange') || card.classList.contains('theme-border-orange')) {
            glowColor = 'rgba(255, 115, 0, 0.15)';
        } else if (card.classList.contains('theme-hover-green') || card.classList.contains('theme-border-green')) {
            glowColor = 'rgba(57, 255, 20, 0.15)';
        } else if (card.classList.contains('theme-hover-violet')) {
            glowColor = 'rgba(217, 70, 239, 0.15)';
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            // Apply 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Apply Dynamic Shadow
            let shadowColor = 'rgba(211, 0, 0, 0.2)';
            if (card.classList.contains('theme-hover-orange') || card.classList.contains('theme-border-orange')) shadowColor = 'rgba(255, 115, 0, 0.2)';
            if (card.classList.contains('theme-hover-green') || card.classList.contains('theme-border-green')) shadowColor = 'rgba(57, 255, 20, 0.2)';
            if (card.classList.contains('theme-hover-violet')) shadowColor = 'rgba(217, 70, 239, 0.2)';
            
            card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 40px ${shadowColor}`;
            
            // Move glow spot following the mouse
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor.replace('0.15', '0.3')} 0%, transparent 60%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = `none`;
            if (glow) {
                glow.style.background = `transparent`;
            }
        });
    });
}

// --- MICRO WATERFALL (Particle Rain with logo1.png) ---
function createWaterfall() {
    const container = document.getElementById('waterfall-container');
    if (!container) return;

    const count = 40; // Total falling items

    for (let i = 0; i < count; i++) {
        let img = document.createElement('img');
        img.src = 'logo1.png'; // Using the micro-icon
        img.className = 'waterfall-item';
        
        let size = Math.random() * 20 + 12; // 12px to 32px
        let horizontalPos = Math.random() * 100; // 0 to 100vw
        let speed = Math.random() * 8 + 6; // 6s to 14s fall duration
        let delay = Math.random() * 10; // Staggered start
        
        img.style.width = `${size}px`;
        img.style.left = `${horizontalPos}vw`;
        img.style.animation = `fallDown ${speed}s linear ${delay}s infinite`;
        
        container.appendChild(img);
    }
}

// Injects the necessary CSS keyframes for the waterfall rain
const injectWaterfallStyles = () => {
    const style = document.createElement("style");
    style.innerText = `
    @keyframes fallDown {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
        15% { opacity: 0.2; }
        85% { opacity: 0.2; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
    `;
    document.head.appendChild(style);
};
injectWaterfallStyles();

//ezz codes