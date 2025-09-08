/* ===================================
   ABOUT PAGE JAVASCRIPT
   Spectacular Animations & Interactivity
   ================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initAboutAnimations();
    initScrollAnimations();
    initParticleSystem();
    initInteractiveElements();
    initVideoBackground();
    
});

// Initialize video background with smooth controls
function initVideoBackground() {
    const video = document.getElementById('heroVideo');
    if (video) {
        
        // Set slower playback speed (0.7 = 70% of normal speed)
        video.playbackRate = 0.7;
        
        // Ensure video plays and handle any autoplay restrictions
        const playVideo = () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
                // If autoplay fails, try again when user interacts with page
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        };
        
        // Play video when loaded
        if (video.readyState >= 2) {
            playVideo();
        } else {
            video.addEventListener('loadeddata', playVideo);
        }
        
        // Create seamless loop by rewinding slightly before the end
        video.addEventListener('timeupdate', function() {
            // When video is 0.5 seconds from the end, smoothly restart
            if (video.currentTime >= video.duration - 0.5) {
                video.currentTime = 0.2; // Start slightly after beginning to avoid any black frames
            }
        });
        
        // Ensure video quality and smooth playback
        video.addEventListener('loadstart', function() {
            video.style.opacity = '0';
        });
        
        video.addEventListener('canplaythrough', function() {
            video.style.opacity = '1';
            video.style.transition = 'opacity 1s ease-in-out';
        });
    }
}

// Initialize about page animations
function initAboutAnimations() {
    
    // Animate hero section on load
    setTimeout(() => {
        const hero = document.querySelector('.about-hero');
        if (hero) {
            hero.classList.add('animate');
        }
    }, 800);
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.about-float-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${3 + index * 0.5}s`;
    });
    
    // Stagger letter animations
    const letters = document.querySelectorAll('.hero-letter');
    letters.forEach((letter, index) => {
        letter.style.transitionDelay = `${0.5 + index * 0.1}s`;
    });
    
    // Philosophy letters animation
    const philosophyLetters = document.querySelectorAll('.philosophy-letter');
    philosophyLetters.forEach((letter, index) => {
        letter.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Team letters animation
    const teamLetters = document.querySelectorAll('.team-letter');
    teamLetters.forEach((letter, index) => {
        letter.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    
    // Create intersection observer with enhanced options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for different sections
                if (entry.target.classList.contains('philosophy-section')) {
                    animatePhilosophySection(entry.target);
                } else if (entry.target.classList.contains('about-team-section')) {
                    animateTeamSection(entry.target);
                } else if (entry.target.classList.contains('our-story')) {
                    animateStorySection(entry.target);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all major sections
    const sections = document.querySelectorAll('.about-hero, .our-story, .philosophy-section, .about-team-section, .about-cta-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual elements for staggered animations
    const staggeredElements = document.querySelectorAll('.principle-item, .team-member, .story-content, .story-image');
    staggeredElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        observer.observe(element);
    });
}

// Animate philosophy section
function animatePhilosophySection(section) {
    const principles = section.querySelectorAll('.principle-item');
    principles.forEach((principle, index) => {
        setTimeout(() => {
            principle.classList.add('slide-up');
        }, index * 200);
    });
}

// Animate team section
function animateTeamSection(section) {
    const teamMembers = section.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('fade-in-up');
        }, index * 150);
    });
}

// Animate story section
function animateStorySection(section) {
    const storyContent = section.querySelector('.story-content');
    const storyImage = section.querySelector('.story-image');
    
    if (storyContent) {
        storyContent.classList.add('slide-from-left');
    }
    
    if (storyImage) {
        setTimeout(() => {
            storyImage.classList.add('slide-from-right');
        }, 300);
    }
}

// Enhanced particle system
function initParticleSystem() {
    const particles = document.querySelectorAll('.about-particle');
    
    // Add random properties to particles
    particles.forEach(particle => {
        const randomSize = Math.random() * 5 + 2;
        const randomOpacity = Math.random() * 0.8 + 0.2;
        const randomSpeed = Math.random() * 8 + 12;
        
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        particle.style.opacity = randomOpacity;
        particle.style.animationDuration = randomSpeed + 's';
    });
    
    // Mouse interaction with particles
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index % 4 + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 15;
            const y = (mouseY - 0.5) * speed * 15;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Floating elements mouse interaction
    const floatingElements = document.querySelectorAll('.about-float-element');
    document.addEventListener('mousemove', (e) => {
        floatingElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX}deg)`;
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    
    // Image container hover effects
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mouseenter', () => {
            imageContainer.classList.add('hovered');
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.classList.remove('hovered');
        });
    }
    
    // Principle items interactive effects
    const principleItems = document.querySelectorAll('.principle-item');
    principleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Add ripple effect
            createRippleEffect(e, ctaButton);
        });
    }
}

// Create ripple effect
function createRippleEffect(event, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.about-morph-shape, .about-float-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add CSS keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .slide-up {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .slide-from-left {
        animation: slideFromLeft 1s ease forwards;
    }
    
    .slide-from-right {
        animation: slideFromRight 1s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .principle-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .team-member {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .story-content,
    .story-image {
        opacity: 0;
    }
    
    /* Enhanced hover states */
    .principle-item:hover {
        transform: translateY(-15px) scale(1.05) !important;
    }
    
    .team-member {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .image-container.hovered {
        transform: translateY(-8px) scale(1.02);
    }
`;

document.head.appendChild(style);

// Initialize parallax effect
initParallaxEffect();

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(initParallaxEffect, 16));

// Preload animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading states
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .loaded .about-hero {
            animation: heroFadeIn 1.5s ease forwards;
        }
        
        @keyframes heroFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
`);
