// Canvas setup for success page
const canvas = document.getElementById('successCanvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1.5;  // Larger size
        this.color = this.getRandomColor();
        this.vel = {
            x: (Math.random() - 0.5) * 1.2,  // Faster movement
            y: (Math.random() - 0.5) * 1.2   // Faster movement
        };
        this.opacity = Math.random() * 0.7 + 0.3;  // Brighter particles
        this.connectDistance = 180;  // Increased connection distance
    }
    
    getRandomColor() {
        const colors = [
            'rgba(121, 40, 202, 0.9)',
            'rgba(255, 0, 128, 0.9)',
            'rgba(0, 112, 243, 0.9)',
            'rgba(255, 255, 255, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    draw() {
        ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    
    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        
        if (this.x < 0 || this.x > canvas.width) this.vel.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vel.y *= -1;
        
        this.draw();
    }
}

// Connect particles with more visible lines
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < particlesArray[a].connectDistance) {
                const opacity = 1 - (distance / particlesArray[a].connectDistance);
                
                const gradient = ctx.createLinearGradient(
                    particlesArray[a].x, 
                    particlesArray[a].y, 
                    particlesArray[b].x, 
                    particlesArray[b].y
                );
                
                gradient.addColorStop(0, particlesArray[a].color.replace(/[\d\.]+\)$/, (opacity * 0.7) + ')')); // Brighter lines
                gradient.addColorStop(1, particlesArray[b].color.replace(/[\d\.]+\)$/, (opacity * 0.7) + ')')); // Brighter lines
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.2; // Thicker lines
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150);  // More particles
    
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    
    connectParticles();
    
    requestAnimationFrame(animate);
}

// Initialize
initParticles();
animate();