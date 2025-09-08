// ===================================
// MODERN INTERIOR DESIGN WEBSITE JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Skip intro animation - start directly with main content
  initProjectSlideshow(); // Start slideshow immediately

  // Initialize logo click functionality
  initLogoClick();

  // Initialize other website functionalities.
  initNavigation();
  initHamburgerMenu();
  initAdaptiveNavigation(); // Add adaptive navigation
  if (document.querySelector('.hero-slider')) initHeroSlider();
  if (document.querySelector('.portfolio-filter')) initPortfolioFilter();
  if (document.querySelector('.contact-form-fields')) initContactForm();
  initSmoothScrolling();
  initScrollEffects();
  
  // Initialize custom cursor only for the main project page
  if (window.location.pathname === '/' || 
      window.location.pathname.includes('index.html') || 
      window.location.pathname === '' || 
      window.location.pathname.endsWith('/')) {
    initCustomCursor();
    initServicePanels();
  }
  
  preloadImages(); // Preload images after DOM is ready
  manageFocus(); // Set up accessibility focus management
  initScrollAnimations(); // Initialize scroll animations
});

// --- LOGO CLICK: go to homepage ---
function initLogoClick() {
  const logoIcon = document.querySelector('.nav-logo-icon');
  if (!logoIcon) return;

  logoIcon.addEventListener('click', function(e) {
    e.preventDefault();
    
    // If we're on the main page, reload to reset slideshow
    if (window.location.pathname === '/' || 
        window.location.pathname.includes('index.html') || 
        window.location.pathname === '' || 
        window.location.pathname.endsWith('/')) {
      window.location.reload();
    } else {
      // If we're on another page, go back to home
      window.location.href = 'index.html';
    }
  });
}

// --- INTRO REMOVED FOR BETTER PERFORMANCE ---
// Logo intro animation removed - slideshow starts immediately on page load

// --- PROJECT SLIDESHOW ---
function initProjectSlideshow() {
  const slides = document.querySelectorAll('.project-slide');
  const navItems = document.querySelectorAll('.nav-item');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active', 'animate');
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      const progressFill = item.querySelector('.progress-fill');
      if (progressFill) progressFill.style.animation = 'none';
    });

    slides[index].classList.add('active');
    
    // Trigger animation after a brief delay
    setTimeout(() => {
      slides[index].classList.add('animate');
    }, 100);
    
    if (navItems[index]) {
      navItems[index].classList.add('active');
      const progressFill = navItems[index].querySelector('.progress-fill');
      if (progressFill) {
        setTimeout(() => { progressFill.style.animation = 'progressFill 6.5s linear'; }, 50);
      }
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideshow() { slideInterval = setInterval(nextSlide, 6500); }
  function stopSlideshow() { clearInterval(slideInterval); }

  navItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      stopSlideshow();
      currentSlide = index;
      showSlide(currentSlide);
      setTimeout(startSlideshow, 100);
    });
  });

  showSlide(0);
  startSlideshow();
}

// --- HAMBURGER ---
function initHamburgerMenu() {
  const hamburger = document.querySelector('.modern-hamburger');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  if (!hamburger) return;

  hamburger.addEventListener('click', function() {
    // Toggle mobile menu only
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileMenuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });
  
  // Close menu when clicking outside or on links
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function(e) {
      if (e.target === mobileMenuOverlay || e.target.classList.contains('mobile-nav-link')) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close menu button functionality
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// --- NAV ---
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const header = document.getElementById('header');

  if (hamburger && mobileMenuOverlay) {
    hamburger.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileMenuClose && mobileMenuOverlay) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
      header.style.padding = '1rem 0';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.9)';
      header.style.padding = '1.5rem 0';
    }
    lastScroll = currentScroll;
  });
}

// --- HERO SLIDER ---
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
  }
  function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
  function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }
  function startSlideShow() { slideInterval = setInterval(nextSlide, 5000); }
  function stopSlideShow() { clearInterval(slideInterval); }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopSlideShow(); nextSlide(); startSlideShow(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopSlideShow(); prevSlide(); startSlideShow(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { stopSlideShow(); currentSlide = index; showSlide(currentSlide); startSlideShow(); });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { stopSlideShow(); prevSlide(); startSlideShow(); }
    if (e.key === 'ArrowRight') { stopSlideShow(); nextSlide(); startSlideShow(); }
  });

  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
  }

  startSlideShow();
}

// --- PORTFOLIO FILTER ---
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 100);
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// --- CONTACT FORM ---
function initContactForm() {
  const form = document.querySelector('.contact-form-fields');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e74c3c';
        field.addEventListener('input', function() { this.style.borderColor = '#ddd'; }, { once: true });
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#e74c3c';
        emailField.addEventListener('input', function() { this.style.borderColor = '#ddd'; }, { once: true });
      }
    }

    if (isValid) {
      showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
      form.reset();
    } else {
      showFormMessage('Please fill in all required fields correctly.', 'error');
    }
  });

  function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem; margin-bottom: 1rem; border-radius: 4px; font-size: 0.9rem;
      ${type === 'success'
        ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
        : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;
    form.parentNode.insertBefore(messageDiv, form);
    setTimeout(() => { if (messageDiv) messageDiv.remove(); }, 5000);
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// --- SMOOTH SCROLL ---
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = (document.getElementById('header') || { offsetHeight: 0 }).offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// --- SCROLL EFFECTS ---
function initScrollEffects() {
  const heroBackgrounds = document.querySelectorAll('.hero-background, .slide-background');
  function updateParallax() {
    const scrolled = window.pageYOffset;
    heroBackgrounds.forEach(bg => {
      const rate = scrolled * -0.5;
      bg.style.transform = `translateY(${rate}px)`;
    });
  }
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() { updateParallax(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.service-item, .portfolio-item, .team-member, .award-item, .principle');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// --- UTILS ---
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() { timeout = null; if (!immediate) func.apply(context, args); };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

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

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (rect.top >= 0 && rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}

// Preload critical images (use actual slide backgrounds)
function preloadImages() {
  const criticalImages = [
    'images/MASTER BEDROOM IMG 01 061925.jpg',
    'images/STAIRCASE IMG 02 052825.jpg',
    'images/STUDY ROOM 070725 IMG01.jpg'
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.onload = function() {
      // loaded silently
    };
    img.onerror = function() {
      // prevent console error spam
    };
    img.src = src;
  });
}

// --- ACCESSIBILITY ---
function manageFocus() {
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      setTimeout(() => { if (mobileMenuClose) mobileMenuClose.focus(); }, 100);
    });
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
      if (hamburger) hamburger.focus();
    });
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
}
  if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) e.target.click();
});

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('[data-scroll-animate]');
  
  if (animateElements.length === 0) {
    console.log('No scroll animate elements found');
    return;
  }
  
  console.log(`Found ${animateElements.length} elements to animate`);
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-scroll-delay') || 0;
        
        console.log(`Animating element with delay: ${delay}ms`);
        
        setTimeout(() => {
          element.classList.add('animate');
        }, parseInt(delay));
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    // Reset any existing animation classes
    element.classList.remove('animate');
    observer.observe(element);
  });
  
  // Snake border animation for about section
  initSnakeBorderAnimation();
  
  // Initialize background text animations for team section
  initTeamBackgroundAnimation();
  
  // Initialize ABOUT background text animation
  initAboutBackgroundAnimation();
}

// --- SNAKE BORDER ANIMATION ---
function initSnakeBorderAnimation() {
  const aboutSection = document.querySelector('.about-section');
  const snakeButton = document.querySelector('.snake-border-btn');
  const borderSegments = document.querySelectorAll('.border-segment');
  const letters = document.querySelectorAll('.about-background-text .letter');
  
  console.log('=== SNAKE ANIMATION DEBUG ===');
  console.log('About section found:', !!aboutSection);
  console.log('Snake button found:', !!snakeButton);
  console.log('Border segments found:', borderSegments.length);
  console.log('Letters found:', letters.length);
  
  if (snakeButton) {
    console.log('Snake button HTML:', snakeButton.outerHTML.substring(0, 200));
  }
  
  if (!aboutSection) {
    console.log('About section not found - aborting');
    return;
  }
  
  // Force trigger for testing (remove this later)
  console.log('Force triggering animation for testing...');
  setTimeout(() => {
    aboutSection.classList.add('animate');
    console.log('Animation class added manually for testing');
  }, 2000);
  
  const observerOptions = {
    threshold: 0.1,  // Lower threshold for easier triggering
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Intersection entry:', {
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        target: entry.target.className
      });
      
      if (entry.isIntersecting) {
        console.log('🎯 About section in view - triggering animation!');
        entry.target.classList.add('animate');
        
        setTimeout(() => {
          console.log('✅ Animation class confirmed:', entry.target.classList.contains('animate'));
          const animatedSegments = document.querySelectorAll('.about-section.animate .border-segment');
          console.log('Animated border segments:', animatedSegments.length);
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observer.observe(aboutSection);
}

// --- TEAM BACKGROUND ANIMATION ---
function initTeamBackgroundAnimation() {
  const teamSection = document.querySelector('.team-section');
  const letters = document.querySelectorAll('.team-section .team-letter');
  
  console.log('=== TEAM ANIMATION DEBUG ===');
  console.log('Team section found:', !!teamSection);
  console.log('Team letters found:', letters.length);
  
  if (!teamSection) {
    console.log('Team section not found - aborting');
    return;
  }
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Team section intersection:', {
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio
      });
      
      if (entry.isIntersecting) {
        console.log('🎯 Team section in view - triggering animation!');
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observer.observe(teamSection);
}

// --- ABOUT BACKGROUND ANIMATION ---
function initAboutBackgroundAnimation() {
  const aboutSection = document.querySelector('.about-section');
  const letters = document.querySelectorAll('.about-background-text .letter');
  
  console.log('=== ABOUT BACKGROUND ANIMATION DEBUG ===');
  console.log('About section found:', !!aboutSection);
  console.log('About letters found:', letters.length);
  
  if (!aboutSection || letters.length === 0) {
    console.log('About section or letters not found - aborting');
    return;
  }
  
  // Force trigger the animation immediately for testing
  setTimeout(() => {
    console.log('🎯 Force triggering ABOUT background text animation!');
    aboutSection.classList.add('animate');
    
    // Verify letters are animating
    setTimeout(() => {
      letters.forEach((letter, index) => {
        const style = window.getComputedStyle(letter);
        console.log(`Letter ${index + 1}: opacity=${style.opacity}, transform=${style.transform}`);
      });
    }, 200);
  }, 1000);
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('About section background text intersection:', {
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio
      });
      
      if (entry.isIntersecting) {
        console.log('🎯 About section background in view - triggering animation!');
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observer.observe(aboutSection);
}

// --- ADAPTIVE NAVIGATION COLORS ---
function initAdaptiveNavigation() {
  const minimalNav = document.querySelector('.minimal-nav');
  if (!minimalNav) return;
  
  // Define light background sections/elements
  const lightSections = [
    '.services-cosmos', 
    '.about-story-section', 
    '.about-team-section',
    '.team-section',
    '.about-section',
    '.portfolio-content',
    '.portfolio-header',
    '.category-nav',
    '.portfolio-showcase',
    '.contact-form-section',
    '.contact-info-section',
    '[data-nav-theme="light"]'
  ];
  
  function updateNavColor() {
    const navRect = minimalNav.getBoundingClientRect();
    const navCenter = {
      x: navRect.left + navRect.width / 2,
      y: navRect.top + navRect.height / 2
    };
    
    let shouldBeDark = false;
    
    // Check if nav is over any light section
    lightSections.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (
          navCenter.x >= rect.left && 
          navCenter.x <= rect.right &&
          navCenter.y >= rect.top && 
          navCenter.y <= rect.bottom
        ) {
          shouldBeDark = true;
        }
      });
    });
    
    // Apply the appropriate class
    if (shouldBeDark) {
      minimalNav.classList.add('nav-dark');
    } else {
      minimalNav.classList.remove('nav-dark');
    }
  }
  
  // Update on scroll and resize
  let ticking = false;
  function handleNavUpdate() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNavColor();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', handleNavUpdate, { passive: true });
  window.addEventListener('resize', handleNavUpdate, { passive: true });
  
  // Initial update
  setTimeout(updateNavColor, 100);
}

// --- CUSTOM CURSOR ---
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const projectShowcase = document.querySelector('.project-showcase');
  const projectOverlays = document.querySelectorAll('.project-overlay');
  const hoverElements = document.querySelectorAll('.project-cta, .nav-item, .modern-hamburger');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  if (!cursor) return;
  cursor.style.opacity = '0';

  // Function to check if mobile menu is active
  function isMobileMenuActive() {
    return mobileMenuOverlay && mobileMenuOverlay.classList.contains('active');
  }

  function updateCursor(e) {
    // Hide cursor if mobile menu is open
    if (isMobileMenuActive()) {
      cursor.style.opacity = '0';
      return;
    }
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    if (projectShowcase) {
      const rect = projectShowcase.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const edgeDistance = Math.min(
        e.clientX - rect.left,
        rect.right - e.clientX,
        e.clientY - rect.top,
        rect.bottom - e.clientY
      );

      const fadeThreshold = 100;
      let spotlightSize = 200;
      if (edgeDistance < fadeThreshold) {
        const fadeRatio = Math.max(0.3, edgeDistance / fadeThreshold);
        spotlightSize = 200 * fadeRatio;
      }

      const gradient = `radial-gradient(circle ${spotlightSize}px at var(--cursor-x, 50%) var(--cursor-y, 50%),
        transparent 0px,
        rgba(0,0,0,0.01) ${spotlightSize * 0.1}px,
        rgba(0,0,0,0.02) ${spotlightSize * 0.17}px,
        rgba(0,0,0,0.05) ${spotlightSize * 0.23}px,
        rgba(0,0,0,0.08) ${spotlightSize * 0.3}px,
        rgba(0,0,0,0.12) ${spotlightSize * 0.37}px,
        rgba(0,0,0,0.18) ${spotlightSize * 0.43}px,
        rgba(0,0,0,0.25) ${spotlightSize * 0.5}px,
        rgba(0,0,0,0.35) ${spotlightSize * 0.57}px,
        rgba(0,0,0,0.45) ${spotlightSize * 0.63}px,
        rgba(0,0,0,0.55) ${spotlightSize * 0.7}px,
        rgba(0,0,0,0.65) ${spotlightSize * 0.77}px,
        rgba(0,0,0,0.75) ${spotlightSize * 0.83}px,
        rgba(0,0,0,0.85) ${spotlightSize * 0.9}px,
        rgba(0,0,0,0.95) ${spotlightSize * 0.97}px,
        black ${spotlightSize}px)`;

      projectOverlays.forEach(overlay => {
        overlay.style.setProperty('--cursor-x', x + '%');
        overlay.style.setProperty('--cursor-y', y + '%');
        overlay.style.mask = gradient;
        overlay.style.webkitMask = gradient;
      });
    }
  }

  if (projectShowcase) {
    projectShowcase.addEventListener('mouseenter', () => {
      // Only show cursor if mobile menu is not active
      if (!isMobileMenuActive()) {
        cursor.style.opacity = '1';
        document.body.style.cursor = 'none';
      }
      projectOverlays.forEach(overlay => {
        const gradient = `radial-gradient(circle 200px at var(--cursor-x, 50%) var(--cursor-y, 50%),
          transparent 0px,
          rgba(0,0,0,0.01) 20px,
          rgba(0,0,0,0.02) 35px,
          rgba(0,0,0,0.05) 45px,
          rgba(0,0,0,0.08) 60px,
          rgba(0,0,0,0.12) 75px,
          rgba(0,0,0,0.18) 85px,
          rgba(0,0,0,0.25) 100px,
          rgba(0,0,0,0.35) 115px,
          rgba(0,0,0,0.45) 125px,
          rgba(0,0,0,0.55) 140px,
          rgba(0,0,0,0.65) 155px,
          rgba(0,0,0,0.75) 165px,
          rgba(0,0,0,0.85) 180px,
          rgba(0,0,0,0.95) 195px,
          black 200px)`;
        overlay.style.mask = gradient;
        overlay.style.webkitMask = gradient;
      });
    });

    projectShowcase.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      document.body.style.cursor = 'default';
      projectOverlays.forEach(overlay => {
        overlay.style.mask = 'none';
        overlay.style.webkitMask = 'none';
      });
    });

    projectShowcase.addEventListener('mousemove', updateCursor);
  }

  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Global mouse movement to handle cursor and section detection
  document.addEventListener('mousemove', function(e) {
    updateCursor(e);
    
    // Check if we're over the project showcase
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    const isOverProjectShowcase = projectShowcase && (projectShowcase.contains(elementUnderCursor) || elementUnderCursor === projectShowcase);
    
    if (!isMobileMenuActive()) {
      if (isOverProjectShowcase) {
        document.body.style.cursor = 'none';
        if (cursor) cursor.style.opacity = '1';
      } else {
        document.body.style.cursor = 'default';
        if (cursor) cursor.style.opacity = '0';
      }
    }
  });
  
  // Hide cursor when mobile menu opens and show when it closes
  if (mobileMenuOverlay) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (isMobileMenuActive()) {
            cursor.style.opacity = '0';
            document.body.style.cursor = 'default';
          } else {
            // Keep default cursor behavior - let section-specific events handle it
            if (!document.body.style.cursor || document.body.style.cursor === 'default') {
              // Don't override if already set by section events
            }
          }
        }
      });
    });
    observer.observe(mobileMenuOverlay, { attributes: true });
  }
  
  // Set initial cursor state
  document.body.style.cursor = 'default';
}

// --- PORTFOLIO PANEL CLICKS ---
function initServicePanels() {
  const portfolioPanels = document.querySelectorAll('.portfolio-panel');
  
  portfolioPanels.forEach(panel => {
    panel.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category === 'residential' || category === 'commercial' || category === 'communal') {
        window.location.href = 'portfolio.html';
      }
    });
  });
}
