/* ===================================
   CONTACT PAGE JAVASCRIPT
   Amazing Animations & Interactivity
   ================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initContactAnimations();
    initFormInteractions();
    initScrollAnimations();
    initParticleSystem();
    
});

// Initialize contact page animations
function initContactAnimations() {
    
    // Animate hero section on load
    setTimeout(() => {
        const hero = document.querySelector('.contact-hero');
        if (hero) {
            hero.classList.add('animate');
        }
    }, 500);
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${2 + index}s`;
    });
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const formSection = document.querySelector('.contact-form-section');
            if (formSection) {
                formSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Form interactions and animations
function initFormInteractions() {
    
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.floating-label input, .textarea-group textarea');
    const selects = document.querySelectorAll('.select-group select');
    const submitButton = document.querySelector('.luxury-submit-btn');
    
    // Floating label animations
    inputs.forEach(input => {
        
        // Handle input focus/blur for floating labels
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Handle input changes for proper label positioning
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.parentElement.classList.add('focused');
            } else {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value && input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
        
        // Special handling for phone field
        if (input.type === 'tel') {
            // Add placeholder attribute to trigger :not(:placeholder-shown)
            input.setAttribute('placeholder', ' ');
        }
    });
    
    // Select dropdown animations
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Form submission with ripple effect
    if (form && submitButton) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            createRippleEffect(submitButton);
            
            // Simulate form submission
            setTimeout(() => {
                showSuccessMessage();
            }, 1500);
        });
    }
}

// Create ripple effect on button click
function createRippleEffect(button) {
    const ripple = button.querySelector('.btn-ripple');
    if (ripple) {
        // Reset ripple
        ripple.style.width = '0';
        ripple.style.height = '0';
        
        // Trigger ripple animation
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
        }, 10);
    }
    
    // Add loading state
    button.classList.add('loading');
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('.btn-icon i');
    
    if (btnText) btnText.textContent = 'Sending...';
    if (btnIcon) {
        btnIcon.className = 'fas fa-spinner';
        btnIcon.style.animation = 'spin 1s linear infinite';
    }
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const submitButton = document.querySelector('.luxury-submit-btn');
    
    if (form && submitButton) {
        // Remove loading state
        submitButton.classList.remove('loading');
        const btnText = submitButton.querySelector('.btn-text');
        const btnIcon = submitButton.querySelector('.btn-icon i');
        
        if (btnText) btnText.textContent = 'Message Sent!';
        if (btnIcon) {
            btnIcon.className = 'fas fa-check';
            btnIcon.style.animation = 'none';
        }
        
        // Reset form
        setTimeout(() => {
            form.reset();
            
            // Reset button
            if (btnText) btnText.textContent = 'Send Message';
            if (btnIcon) btnIcon.className = 'fas fa-paper-plane';
            
            // Remove focused classes
            const focusedElements = document.querySelectorAll('.focused, .has-value');
            focusedElements.forEach(element => {
                element.classList.remove('focused', 'has-value');
            });
            
        }, 2000);
    }
}

// Scroll animations for form and info cards
function initScrollAnimations() {
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe form elements
    const formElements = document.querySelectorAll('.form-header, .luxury-form, .info-card');
    formElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    // Add random properties to particles
    particles.forEach(particle => {
        const randomSize = Math.random() * 6 + 2;
        const randomOpacity = Math.random() * 0.7 + 0.3;
        const randomSpeed = Math.random() * 5 + 10;
        
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        particle.style.opacity = randomOpacity;
        particle.style.animationDuration = randomSpeed + 's';
    });
    
    // Mouse interaction with particles
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Utility function for smooth scrolling
function smoothScrollTo(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add CSS animation classes when elements come into view
const style = document.createElement('style');
style.textContent = `
    .form-header {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .form-header.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .luxury-form {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s ease 0.2s;
    }
    
    .luxury-form.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .info-card {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.6s ease;
    }
    
    .info-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-group {
        opacity: 0;
        transform: translateX(-20px);
        animation: slideInLeft 0.6s ease forwards;
    }
    
    @keyframes slideInLeft {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .luxury-submit-btn.loading {
        pointer-events: none;
        opacity: 0.8;
    }
`;

document.head.appendChild(style);

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearValidationError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease;
    `;
    
    field.parentElement.appendChild(errorDiv);
    field.parentElement.classList.add('error');
}

function clearFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.parentElement.classList.remove('error');
}

function clearValidationError(e) {
    clearFieldError(e.target);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', initFormValidation);
