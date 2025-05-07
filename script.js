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

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);

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
        messageElement.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    } else {
        messageElement.style.color = '#2ecc71';
        messageElement.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
    }
    
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.marginTop = '15px';
    messageElement.style.textAlign = 'center';
    
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
            // Keep the default behavior for links with actual URLs
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Get project details
                const projectItem = this.closest('.project-item');
                const projectTitle = projectItem.querySelector('.project-title h3').textContent;
                
                // Create modal or redirect to project details page
                alert(`Details for: ${projectTitle}\n\nProject details page coming soon!`);
            }
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

// SINGLE DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS 
    emailjs.init("Zw1Y5j4eAPfmJ_oFT");
    
    // Set initial state for animated elements
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
    
    // Set up the contact form - ONLY ONE handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
            
            // Get form values for validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Add detailed console logs to debug
            console.log('Form fields:', { name, email, subject, message });
            
            // Check if any required field is empty
            if (!name || !email || !subject || !message) {
                // Identify which fields are empty
                const emptyFields = [];
                if (!name) emptyFields.push('Name');
                if (!email) emptyFields.push('Email');
                if (!subject) emptyFields.push('Subject');
                if (!message) emptyFields.push('Message');
                
                console.log('Empty fields:', emptyFields);
                showFormMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`, 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Send the email using EmailJS
            emailjs.sendForm('service_9p2f37j', 'template_wdxhcxc', contactForm)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Clear the form
                    contactForm.reset();
                    
                    // Show success message
                    showFormMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    showFormMessage('Sorry, there was a problem sending your message. Please try again.', 'error');
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // Fix CV download button path
    const downloadCvButton = document.querySelector('a[href="Grace Wambui Resume.pdf"]');
    if (downloadCvButton) {
        // No need to add event listener, the download attribute handles it
        console.log('CV download button found and ready');
    }
});