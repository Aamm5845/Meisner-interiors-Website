// ===================================
// MODERN INTERIOR DESIGN WEBSITE JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize other website functionalities first
  initLogoClick();
  initNavigation();
  initHamburgerMenu();
  initAdaptiveNavigation(); // Add adaptive navigation
  if (document.querySelector('.hero-slider')) initHeroSlider();
  if (document.querySelector('.portfolio-filter')) initPortfolioFilter();
  if (document.querySelector('.contact-form-fields')) initContactForm();
  initSmoothScrolling();
  initScrollEffects();
  
  initServicePanels();
  
  preloadImages(); // Preload images after DOM is ready
  manageFocus(); // Set up accessibility focus management
  initScrollAnimations(); // Initialize scroll animations
});

// Wait for all resources to load before starting slideshow
// This ensures consistent behavior between local and hosted versions
window.addEventListener('load', () => {
  // Start slideshow after everything is loaded
  setTimeout(() => {
    initProjectSlideshow();
  }, 100);
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
    }, 200);
    
    if (navItems[index]) {
      navItems[index].classList.add('active');
      const progressFill = navItems[index].querySelector('.progress-fill');
      if (progressFill) {
        setTimeout(() => { progressFill.style.animation = 'progressFill 6.5s linear'; }, 150);
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

// Global observers to prevent multiple instances
let scrollAnimationObserver = null;
let aboutAnimationObserver = null;
let teamAnimationObserver = null;

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  // Clear any existing observers first
  if (scrollAnimationObserver) {
    scrollAnimationObserver.disconnect();
  }
  if (aboutAnimationObserver) {
    aboutAnimationObserver.disconnect();
  }
  if (teamAnimationObserver) {
    teamAnimationObserver.disconnect();
  }
  
  const animateElements = document.querySelectorAll('[data-scroll-animate]');
  
  if (animateElements.length === 0) {
    return;
  }
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-scroll-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animate');
        }, parseInt(delay));
        
        scrollAnimationObserver.unobserve(element);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    // Reset any existing animation classes
    element.classList.remove('animate');
    scrollAnimationObserver.observe(element);
  });
  
  // Initialize background text animations
  initSnakeBorderAnimation();
  initTeamBackgroundAnimation();
  initAboutBackgroundAnimation();
}

// --- SNAKE BORDER ANIMATION ---
function initSnakeBorderAnimation() {
  const aboutSection = document.querySelector('.about-section');
  
  if (!aboutSection) {
    return;
  }
  
  // Reset animation state
  aboutSection.classList.remove('animate');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  aboutAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        aboutAnimationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  aboutAnimationObserver.observe(aboutSection);
}

// --- TEAM BACKGROUND ANIMATION ---
function initTeamBackgroundAnimation() {
  const teamSection = document.querySelector('.team-section');
  
  if (!teamSection) {
    return;
  }
  
  // Reset animation state
  teamSection.classList.remove('animate');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  teamAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        teamAnimationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  teamAnimationObserver.observe(teamSection);
}

// --- ABOUT BACKGROUND ANIMATION ---
function initAboutBackgroundAnimation() {
  // This function is now handled by initSnakeBorderAnimation()
  // to prevent duplicate observers on the same element
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

// --- CUSTOM CURSOR (SIMPLIFIED) ---
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const projectShowcase = document.querySelector('.project-showcase');
  const hoverElements = document.querySelectorAll('.project-cta, .nav-item, .modern-hamburger');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  if (!cursor) return;

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
  }

  if (projectShowcase) {
    projectShowcase.addEventListener('mouseenter', () => {
      // Only show cursor if mobile menu is not active
      if (!isMobileMenuActive()) {
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
      }
    });

    projectShowcase.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursor.style.visibility = 'hidden';
    });

    projectShowcase.addEventListener('mousemove', updateCursor);
  }

  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Global mouse movement to handle cursor positioning
  document.addEventListener('mousemove', updateCursor);
  
  // Hide cursor when mobile menu opens
  if (mobileMenuOverlay) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (isMobileMenuActive()) {
            cursor.style.opacity = '0';
            cursor.style.visibility = 'hidden';
          }
        }
      });
    });
    observer.observe(mobileMenuOverlay, { attributes: true });
  }
}

// --- PORTFOLIO PANEL CLICKS ---
function initServicePanels() {
  const portfolioPanels = document.querySelectorAll('.portfolio-panel');
  
  portfolioPanels.forEach(panel => {
    panel.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category === 'residential' || category === 'commercial' || category === 'communal') {
        // Navigate to portfolio page with category filter
        window.location.href = `portfolio.html?filter=${category}`;
      }
    });
  });
}
