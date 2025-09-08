// ===================================
// SERVICES PAGE SPECIFIC JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Trigger background text animation
    setTimeout(() => {
        const servicesUniverse = document.querySelector('.services-universe');
        if (servicesUniverse) {
            servicesUniverse.classList.add('animate');
        }
    }, 500);
    
    // Initialize service constellation animations on scroll
    initServiceConstellations();
});

function initServiceConstellations() {
    const constellations = document.querySelectorAll('.service-constellation');
    
    if (constellations.length === 0) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    constellations.forEach(constellation => {
        observer.observe(constellation);
    });
}
