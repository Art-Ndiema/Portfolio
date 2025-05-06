// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contactForm');
const profilePhotoContainer = document.getElementById('profile-photo-container');

// Sticky header
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

// Animate elements on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.experience-item, .project-item, .education-item, .certification-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.experience-item, .project-item, .education-item, .certification-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Trigger animation for elements in view on page load
    animateOnScroll();

    // Setup project detail buttons
    setupProjectButtons();

    // Add typing animation to hero content
    addTypingAnimation();
    
    // Uncomment the next line to enable profile photo
    // enableProfilePhoto();
});

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For this demo, we'll just show a success message
        
        // Clear the form
        contactForm.reset();
        
        // Show success message
        showFormMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
    });
}

// Show form message
function showFormMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message');
    messageElement.textContent = message;
    
    if (type === 'error') {
        messageElement.style.color = '#e74c3c';
    } else {
        messageElement.style.color = '#2ecc71';
    }
    
    // Add message to form
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Function to enable profile photo
function enableProfilePhoto() {
    // Create profile photo container if you decide to use it
    if (profilePhotoContainer) {
        profilePhotoContainer.style.display = 'block';
        profilePhotoContainer.innerHTML = `
            <div class="profile-photo-placeholder">
                <div class="photo-icon">
                    <i class="fas fa-user"></i>
                </div>
                <p>Professional headshot or illustration can go here</p>
            </div>
        `;
        
        // Style the placeholder
        const placeholder = profilePhotoContainer.querySelector('.profile-photo-placeholder');
        placeholder.style.height = '100%';
        placeholder.style.display = 'flex';
        placeholder.style.flexDirection = 'column';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.backgroundColor = '#f5f5f5';
        placeholder.style.borderRadius = '10px';
        placeholder.style.padding = '20px';
        placeholder.style.textAlign = 'center';
        
        const photoIcon = placeholder.querySelector('.photo-icon');
        photoIcon.style.fontSize = '4rem';
        photoIcon.style.color = '#ccc';
        photoIcon.style.marginBottom = '10px';
    }
}

// Setup project detail buttons
function setupProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-buttons .btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project details
            const projectItem = this.closest('.project-item');
            const projectTitle = projectItem.querySelector('.project-title h3').textContent;
            
            // Create modal or redirect to project details page
            alert(`Details for: ${projectTitle}\n\nProject details page coming soon!`);
        });
    });
}

// Typing animation for hero content
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        // Create typing animation for title
        let titleIndex = 0;
        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                // Start subtitle animation after title is complete
                setTimeout(() => {
                    typeSubtitle();
                }, 500);
            }
        }
        
        // Create typing animation for subtitle
        let subtitleIndex = 0;
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 50);
            }
        }
        
        // Start the typing animations
        setTimeout(() => {
            typeTitle();
        }, 500);
    }
}

// Make download CV button functional
const downloadCvButton = document.querySelector('a[href="resume.pdf"]');
if (downloadCvButton) {
    downloadCvButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Alert that this would download your CV in a real implementation
        alert('This button would download your CV. In a real implementation, create a PDF version of your CV and link it here.');
    });
}