// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.querySelector('form[name="contact"]');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const customCursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');
const cursorGlow = document.getElementById('cursor-glow');

// Interactive elements for cursor effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-tag');

// DOM Elements for animations
const sectionTitles = document.querySelectorAll('.section-title');
const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');
const skillTags = document.querySelectorAll('.skill-tag');
const experienceItems = document.querySelectorAll('.experience-item');
const projectItems = document.querySelectorAll('.project-item');
const educationItems = document.querySelectorAll('.education-item');
const certificationItems = document.querySelectorAll('.certification-item');
const contactInfo = document.querySelector('.contact-info');
const contactFormElement = document.querySelector('.contact-form');
const socialLinks = document.querySelectorAll('.social-link');
const footerText = document.querySelector('.footer-text');

// Particles array and settings
let particlesArray = [];
let grain = [];

// Mouse position
let mouse = {
    x: null,
    y: null,
    radius: 120,
    active: false
};

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recreate particles when canvas resizes
    initParticles();
    initGrain();
}

window.addEventListener('resize', resizeCanvas);

// Track mouse position
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    
    // Update custom cursor position - simplified to just one cursor element
    if (customCursor) {
        customCursor.style.left = `${event.clientX}px`;
        customCursor.style.top = `${event.clientY}px`;
        customCursor.style.opacity = '1';
    }
});

// Mouse events for cursor effects
window.addEventListener('mousedown', function() {
    mouse.active = true;
    if (customCursor) customCursor.classList.add('active');
});

window.addEventListener('mouseup', function() {
    mouse.active = false;
    if (customCursor) customCursor.classList.remove('active');
});

// Mouse hover events for interactive elements
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        if (customCursor) customCursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', function() {
        if (customCursor) customCursor.classList.remove('hover');
    });
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', function() {
    if (customCursor) customCursor.style.opacity = '0';
});

document.addEventListener('mouseenter', function() {
    if (customCursor) customCursor.style.opacity = '1';
});

// Page loading animation
window.addEventListener('load', function() {
    setTimeout(() => {
        loader.classList.add('finished');
        
        // Trigger initial animations after loader disappears
        setTimeout(() => {
            animateOnScroll();
        }, 500);
    }, 2500);
});

// Sticky header
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    // Animate section titles
    sectionTitles.forEach(title => {
        const elementTop = title.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            title.classList.add('visible');
        }
    });
    
    // Animate about section
    if (aboutText && aboutImage) {
        const aboutTextTop = aboutText.getBoundingClientRect().top;
        const aboutImageTop = aboutImage.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (aboutTextTop < windowHeight - 100) {
            aboutText.classList.add('visible');
        }
        
        if (aboutImageTop < windowHeight - 100) {
            aboutImage.classList.add('visible');
        }
    }
    
    // Animate skill tags
    skillTags.forEach((tag, index) => {
        const tagTop = tag.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (tagTop < windowHeight - 50) {
            setTimeout(() => {
                tag.classList.add('visible');
            }, 50 * index);
        }
    });
    
    // Animate experience items
    experienceItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 * index);
        }
    });
    
    // Animate project items
    projectItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 * index);
        }
    });
    
    // Animate education items
    educationItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 * index);
        }
    });
    
    // Animate certification items
    certificationItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 * index);
        }
    });
    
    // Animate contact section
    if (contactInfo && contactFormElement) {
        const contactInfoTop = contactInfo.getBoundingClientRect().top;
        const contactFormTop = contactFormElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (contactInfoTop < windowHeight - 100) {
            contactInfo.classList.add('visible');
        }
        
        if (contactFormTop < windowHeight - 100) {
            contactFormElement.classList.add('visible');
        }
    }
    
    // Animate footer elements
    socialLinks.forEach((link, index) => {
        const linkTop = link.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (linkTop < windowHeight - 50) {
            setTimeout(() => {
                link.classList.add('visible');
            }, 100 * index);
        }
    });
    
    if (footerText) {
        const textTop = footerText.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (textTop < windowHeight - 50) {
            footerText.classList.add('visible');
        }
    }
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1.5;  // Larger size
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.distance = 0;
        this.color = this.getRandomColor();
        this.vel = {
            x: (Math.random() - 0.5) * 1.2,  // Faster movement
            y: (Math.random() - 0.5) * 1.2   // Faster movement
        };
        this.connectDistance = 180;  // Increased connection distance
        this.opacity = Math.random() * 0.7 + 0.3;  // Brighter particles
    }
    
    getRandomColor() {
        // Brighter colors
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
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            if (mouse.active) {
                // When mouse is pressed, particles are pushed away more strongly
                this.x -= directionX * 2;
                this.y -= directionY * 2;
            } else {
                this.x -= directionX;
                this.y -= directionY;
            }
            
            // Increase opacity when mouse is near
            this.opacity = Math.min(1, this.opacity + 0.05);
        } else {
            // Return to original opacity
            if (this.opacity > 0.2) {
                this.opacity -= 0.01;
            }
            
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
        
        // Gentle movement
        this.x += this.vel.x;
        this.y += this.vel.y;
        
        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.vel.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vel.y *= -1;
        
        this.draw();
    }
}

// Grain class - for smaller, more numerous particles
class Grain {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8;  // Larger grain size
        this.color = this.getRandomColor();
        this.vel = {
            x: (Math.random() - 0.5) * 0.8,  // Faster movement
            y: (Math.random() - 0.5) * 0.8   // Faster movement
        };
        this.opacity = Math.random() * 0.6 + 0.2;  // Brighter grains
        this.baseOpacity = this.opacity;
    }
    
    getRandomColor() {
        // Brighter colors
        const colors = [
            'rgba(121, 40, 202, 0.5)',
            'rgba(255, 0, 128, 0.5)',
            'rgba(0, 112, 243, 0.5)',
            'rgba(255, 255, 255, 0.4)'
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
        // Mouse interaction - subtle reaction to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius / 2) {
            // Increase opacity when mouse is near
            this.opacity = Math.min(1, this.baseOpacity + 0.2);
            
            // Slight movement away from cursor
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 0.3;
            this.y -= Math.sin(angle) * 0.3;
        } else {
            // Return to original opacity
            if (this.opacity > this.baseOpacity) {
                this.opacity -= 0.01;
            }
        }
        
        // Gentle movement
        this.x += this.vel.x;
        this.y += this.vel.y;
        
        // Boundary behavior - wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150);  // More particles
    
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

// Initialize grain particles
function initGrain() {
    grain = [];
    const numberOfGrains = Math.min(Math.floor((canvas.width * canvas.height) / 1500), 800);  // More grain particles
    
    for (let i = 0; i < numberOfGrains; i++) {
        grain.push(new Grain());
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
                
                // Create gradient line
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

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw grain particles
    for (let i = 0; i < grain.length; i++) {
        grain[i].update();
    }
    
    // Update and draw main particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    
    // Connect particles with lines
    connectParticles();
    
    requestAnimationFrame(animate);
}

// Initialize animation
function initAnimation() {
    resizeCanvas();
    animate();
}

// Set up form validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Check if any required field is empty
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
    });
}

// Show form message
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message');
    if (type === 'error') messageElement.classList.add('error');
    else messageElement.classList.add('success');
    
    messageElement.textContent = message;
    
    contactForm.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Initialize everything
initAnimation();