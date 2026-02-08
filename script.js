/* ========================================
   PREMIUM PORTFOLIO - JAVASCRIPT
   GSAP + Particles + Premium Interactions
   ======================================== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initParticles();
    initCustomCursor();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initCounterAnimation();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initMagneticButtons();
    initTiltEffect();
});

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';

            // Trigger entrance animations
            initEntranceAnimations();
        }, 2500);
    });
}

function initEntranceAnimations() {
    // Animate hero elements with GSAP
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();

        tl.from('.availability-badge', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        })
            .from('.hero-title .title-line', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-title .title-name', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-subtitle', {
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-description', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-cta .btn', {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.stat-item', {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.profile-wrapper', {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            }, '-=1')
            .from('.float-icon', {
                opacity: 0,
                scale: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.5');
    }
}

/* ========================================
   PARTICLES.JS
   ======================================== */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#6366F1', '#8B5CF6', '#06B6D4']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366F1',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has lag
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        followerX += dx * 0.15;
        followerY += dy * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hovering');
        });
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
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

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        'Data Analyst',
        'ML Engineer',
        'Dashboard Creator',
        'Business Intelligence Expert',
        'Data Storyteller'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ========================================
   SCROLL ANIMATIONS (AOS-like)
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // GSAP ScrollTrigger for advanced animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate skill bars
        gsap.utils.toArray('.stack-fill').forEach(bar => {
            const width = bar.dataset.width;
            gsap.to(bar, {
                width: width + '%',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Parallax for gradient orbs
        gsap.utils.toArray('.gradient-orb').forEach(orb => {
            gsap.to(orb, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // Section reveals
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                opacity: 0.5,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-item');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const numberEl = counter.querySelector('.stat-number');

                animateCount(numberEl, 0, target, 2000);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   PROJECT FILTERS
   ======================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter projects with animation
            projects.forEach(project => {
                const category = project.dataset.category;

                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    gsap.fromTo(project,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
                    );
                } else {
                    gsap.to(project, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: 'power3.in',
                        onComplete: () => {
                            project.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Check if returning from successful submission (redirect from Web3Forms)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showNotification('Thanks for your message! I\'ll get back to you soon.', 'success');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        // Loading state
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            // Actually submit the form to Web3Forms
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                // Success state
                btnText.textContent = 'Message Sent!';
                btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                showNotification('Thanks for your message! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // If AJAX fails, fall back to standard form submission
            console.log('AJAX submission failed, falling back to form submission');
            form.submit();
            return;
        }

        // Reset button after delay
        setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }, 3000);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22C55E, #16A34A)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

/* ========================================
   BACK TO TOP
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ========================================
   TILT EFFECT (for cards)
   ======================================== */
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ========================================
   CONSOLE SIGNATURE
   ======================================== */
console.log(`
%c╔═══════════════════════════════════════╗
%c║     HAMZA KHATAB - DATA ANALYST       ║
%c║     Portfolio v2.0 - Premium Edition  ║
%c╠═══════════════════════════════════════╣
%c║  🚀 Transforming Data into Insights   ║
%c║  📊 ML • Dashboards • BI • Analytics  ║
%c║  📧 hamzakhatabbaal@gmail.com         ║
%c╚═══════════════════════════════════════╝
`,
    'color: #6366F1; font-weight: bold;',
    'color: #8B5CF6; font-weight: bold;',
    'color: #06B6D4; font-weight: bold;',
    'color: #6366F1; font-weight: bold;',
    'color: #22C55E;',
    'color: #F59E0B;',
    'color: #94A3B8;',
    'color: #6366F1; font-weight: bold;'
);
