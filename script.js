// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initProficiencyBars();
    initProjectFilters();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Mobile menu functionality - No longer needed with horizontal layout
function initMobileMenu() {
    // Mobile menu functionality removed - using horizontal layout on all devices
    console.log('Mobile menu functionality disabled - using horizontal navigation');
}

// Animation functionality
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.skill-card, .project-card, .contact-option, .hero-content, .hero-image'
    );

    animateElements.forEach((el, index) => {
        // Add different animation classes based on element type and position
        if (el.classList.contains('hero-content')) {
            el.classList.add('slide-in-left');
        } else if (el.classList.contains('hero-image')) {
            el.classList.add('slide-in-right');
        } else {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
        }
        
        observer.observe(el);
    });
}

// Proficiency bars animation
function initProficiencyBars() {
    const proficiencyBars = document.querySelectorAll('.proficiency-fill, .proficiency-bar-fill');
    
    const barObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const proficiency = bar.getAttribute('data-proficiency') || bar.getAttribute('data-width');
                
                if (proficiency) {
                    setTimeout(() => {
                        bar.style.width = proficiency + '%';
                    }, 500);
                }
                
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    proficiencyBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter project cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="spinner"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });

        // Form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Remove previous error states
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Required field validation
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.75rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

// Scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar background on scroll
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-image');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Import and initialize smooth scroll polyfill
        console.log('Adding smooth scroll polyfill for older browsers');
    }
}

// Initialize smooth scroll polyfill
smoothScrollPolyfill();

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation for interactive elements
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('filter-btn') || 
            focusedElement.classList.contains('project-link') ||
            focusedElement.classList.contains('nav-link')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
}, true);

// Console welcome message
console.log(`
🚀 Welcome to Hamza Khatab's Portfolio!
📊 Data Analyst & ML Enthusiast
💼 Transforming data into actionable insights

Feel free to explore the code and get in touch!
📧 hamzakhatabbaal@gmail.com
`);
