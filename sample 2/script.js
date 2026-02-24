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
});

// Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling
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
// Floating Navbar & 3D Logo Code Animation
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

        let translateY = scrollY * 0.6; // Moves down faster
        let rotateX = scrollY * 0.15;   
        let rotateY = scrollY * 0.08;   
        let scale = Math.max(0.3, 1 - (scrollY * 0.0015)); // Shrinks as it falls

        floatingLogo.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        
        if (scrollY > 500) {
            floatingLogo.style.opacity = 0;
        } else {
            floatingLogo.style.opacity = 1 - (scrollY / 500);
        }
    }
});

// ==========================================
// MICRO WATERFALL EFFECT (Small Items)
// ==========================================
function createWaterfall() {
    const container = document.getElementById('waterfall-container');
    const numberOfItems = 35; // Increased amount for smaller items

    for (let i = 0; i < numberOfItems; i++) {
        let img = document.createElement('img');
        img.src = 'logo1.png'; // Using the icon only
        img.className = 'waterfall-item';
        
        // Randomize size to be very small (10px to 25px)
        let size = Math.random() * 15 + 10; 
        let left = Math.random() * 100; // Random horizontal position
        let duration = Math.random() * 15 + 8; // Slow fall (8s to 23s)
        let delay = Math.random() * 10; // Staggered start
        
        img.style.width = `${size}px`;
        img.style.left = `${left}vw`;
        img.style.animation = `fallDown ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(img);
    }
}

// Inject keyframes dynamically for waterfall
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fallDown {
    0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.2; }
    90% { opacity: 0.2; }
    100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);


// ==========================================
// Neural Network Background (Hero ONLY)
// ==========================================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
const heroSection = document.getElementById('home');

let particlesArray;
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y - canvas.getBoundingClientRect().top; 
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight; 
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

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
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; 
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * 1.5;
            this.y -= forceDirectionY * force * 1.5;
        }

        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000; 
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5; 
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
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
            
            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                opacityValue = 1 - (distance / 15000);
                ctx.strokeStyle = particlesArray[a].color.replace('rgb', 'rgba').replace(')', `, ${opacityValue * 0.2})`); 
                ctx.lineWidth = 0.5; 
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
    ctx.clearRect(0, 0, innerWidth, canvas.height);

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