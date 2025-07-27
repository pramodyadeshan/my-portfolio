// ==========================================
// PORTFOLIO JAVASCRIPT - OPTIMIZED VERSION
// ==========================================

document.getElementById('current-year').textContent = new Date().getFullYear();

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    setupNavbarEffects();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupContactForm();
    setupActiveNavigation();
    setupProjectCardEffects();
    setupParticleEffect();
    initializeSkillsAnimation();

    // Initialize typing animation after page loads
    window.addEventListener('load', initializeTypingAnimation);
}

// ==========================================
// NAVBAR EFFECTS
// ==========================================
function setupNavbarEffects() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function setupSmoothScrolling() {
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
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            // Form validation
            if (validateContactForm(formData)) {
                // Here you would typically send the data to your server
                showFormSuccess();
                this.reset();
            } else {
                showFormError('Please fill in all fields.');
            }
        });
    }
}

function validateContactForm(data) {
    return data.name && data.email && data.subject && data.message;
}

function showFormSuccess() {
    alert('Thank you for your message! I\'ll get back to you soon.');
}

function showFormError(message) {
    alert(message);
}

// ==========================================
// TYPING ANIMATION
// ==========================================
function initializeTypingAnimation() {
    const changingTextElement = document.getElementById('changing-text');
    if (changingTextElement) {
        typeWriterChanging();
    }
}

function typeWriterChanging() {
    const changingTextElement = document.getElementById('changing-text');
    const texts = ['Pramodya', 'Full-Stack Developer', 'Web Developer', 'Freelance Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            changingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            changingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new text
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
function setupActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// SKILLS SECTION ANIMATIONS
// ==========================================
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');

    if (skillsSection) {
        // Setup observer for skills section
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if we have circular progress or regular progress bars
                    const hasCircularProgress = document.querySelector('.progress-circle');

                    if (hasCircularProgress) {
                        setTimeout(animateCircularProgress, 500);
                    } else {
                        animateProgressBars();
                    }

                    skillsObserver.unobserve(entry.target);
                }
            });
        });

        skillsObserver.observe(skillsSection);
        setupSkillCardEffects();
    }
}

// Skills Section Animation with Progress Bars
function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateProgressBars, 500);
                    skillsObserver.unobserve(entry.target);
                }
            });
        });

        skillsObserver.observe(skillsSection);
        setupSkillCardEffects();
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Skill Card Hover Effects
function setupSkillCardEffects() {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Skill card hover effects
function setupSkillCardEffects() {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// PROJECT CARD EFFECTS
// ==========================================
function setupProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// PARTICLE EFFECT
// ==========================================
function setupParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createParticles();
        addFloatingAnimationStyles();
    }
}

function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.pointerEvents = 'none';

        heroSection.appendChild(particle);
    }
}

function addFloatingAnimationStyles() {
    // Check if styles already exist
    if (document.getElementById('floating-animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'floating-animation-styles';
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
            100% { transform: translateY(0px) rotate(360deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
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
    };
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function() {
    // Handle navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Handle active navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
}, 16); // ~60fps

// Replace existing scroll listeners with optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Portfolio JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

console.log('Portfolio JavaScript loaded successfully!');