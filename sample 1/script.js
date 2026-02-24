// Initialize AOS Animation Library 
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800, 
        easing: 'ease-out-quad',
        once: true,
        offset: 50 
    });
});

// Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for all Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if(navLinks.classList.contains('active')){
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// Navbar background adjust on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 2, 2, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// PROFESSIONAL NEURAL NETWORK BACKGROUND
// ==========================================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
let mouse = { x: null, y: null, radius: 200 }; // Increased radius for better interaction

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Professional Color Palette for the Network
const nodeColors = ['#ff003c', '#ff6a00', '#00ff73', '#00f3ff'];

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        // Subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; 
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Smooth slow movement
        this.x += this.directionX;
        this.y += this.directionY;

        // Mouse interaction (Repel effect for professional fluid feel)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
        }

        this.draw();
    }
}

function init() {
    particlesArray = [];
    // Fewer particles for a cleaner, more professional look
    let numberOfParticles = (canvas.height * canvas.width) / 15000; 
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5; // Smaller dots
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        
        // Slower movement
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        
        // Pick a random color from the palette
        let color = nodeColors[Math.floor(Math.random() * nodeColors.length)]; 

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                         + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // Connect lines if close enough
            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                opacityValue = 1 - (distance / 15000);
                // Thin, subtle, multi-colored lines
                ctx.strokeStyle = particlesArray[a].color.replace('rgb', 'rgba').replace(')', `, ${opacityValue * 0.2})`); 
                ctx.lineWidth = 0.5; // Very thin professional lines
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

init();
animate();

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});