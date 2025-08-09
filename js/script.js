/* ==========================================
   Portfolio Website - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Loading Animation
    // ==========================================
    window.addEventListener('load', function() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.classList.add('fade-out');
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 1000);
        }
    });

    // ==========================================
    // Smooth Scrolling for Navigation Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(37, 99, 235, 0.15)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
        }
    });

    // ==========================================
    // Active Navigation Link
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // Scroll Animation for Elements
    // ==========================================
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

    // Add fade-in-up class to elements that should animate (excluding About Me card)
    const animateElements = document.querySelectorAll('.card:not(#about .card), .experience-item, .project-item, .certification-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
    
    // Separate observer for skill categories with enhanced animations
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(el => {
        el.style.animationPlayState = 'paused';
        skillObserver.observe(el);
    });

    // ==========================================
    // About Me Color Transition Effect
    // ==========================================
    const aboutSection = document.querySelector('#about');
    const heroSection = document.querySelector('.hero-section');
    
    if (aboutSection && heroSection) {
        const colorTransitionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const aboutRect = aboutSection.getBoundingClientRect();
                const heroRect = heroSection.getBoundingClientRect();
                
                // Check if About Me section overlaps with hero section (dark background)
                const isInDarkZone = aboutRect.top < heroRect.bottom && aboutRect.bottom > heroRect.top;
                
                if (isInDarkZone) {
                    aboutSection.classList.add('in-dark-zone');
                } else {
                    aboutSection.classList.remove('in-dark-zone');
                }
            });
        }, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: '0px'
        });
        
        colorTransitionObserver.observe(aboutSection);
        
        // Also trigger on scroll for more responsive updates
        window.addEventListener('scroll', function() {
            const aboutRect = aboutSection.getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();
            
            const isInDarkZone = aboutRect.top < heroRect.bottom && aboutRect.bottom > heroRect.top;
            
            if (isInDarkZone) {
                aboutSection.classList.add('in-dark-zone');
            } else {
                aboutSection.classList.remove('in-dark-zone');
            }
        });
    }

    // ==========================================
    // Enhanced Hero Animations
    // ==========================================
    
    // Trigger name underline animation
    setTimeout(() => {
        const nameHeading = document.querySelector('.profile-text h1');
        if (nameHeading) {
            nameHeading.classList.add('animate');
        }
    }, 2000);
    
    // Enhanced typing animation with better timing
    const typingText = document.querySelector('.lead');
    if (typingText) {
        const originalText = typingText.textContent;
        typingText.textContent = '';
        typingText.style.opacity = '1'; // Ensure it's visible for typing
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                typingText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Faster typing
            }
        }
        
        setTimeout(typeWriter, 1200); // Start typing earlier
    }

    // ==========================================
    // Parallax Effect for Hero Section
    // ==========================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ==========================================
    // Dynamic Skill Progress Animation
    // ==========================================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // ==========================================
    // Counter Animation
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // ==========================================
    // Modal for Project Details
    // ==========================================
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                // Add modal functionality here if needed
                console.log('Project clicked:', this);
            }
        });
    });

    // ==========================================
    // Form Validation (if contact form exists)
    // ==========================================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Valid email is required');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid, handle submission
                showSuccess('Message sent successfully!');
                this.reset();
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger small mt-1';
        errorDiv.textContent = message;
        
        // Remove existing error
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('is-invalid');
        
        setTimeout(() => {
            errorDiv.remove();
            input.classList.remove('is-invalid');
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.insertBefore(successDiv, document.body.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // ==========================================
    // Theme Toggle (Dark/Light Mode)
    // ==========================================
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // ==========================================
    // Mobile Menu Enhancement
    // ==========================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // ==========================================
    // Preloader for Images
    // ==========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // ==========================================
    // Performance Optimization
    // ==========================================
    let ticking = false;
    
    function updateOnScroll() {
        // Batch scroll-based updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // ==========================================
    // Easter Egg - Konami Code
    // ==========================================
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        userInput = userInput.slice(-konamiCode.length);
        
        if (userInput.join(',') === konamiCode.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // ==========================================
    // Initialize Everything
    // ==========================================
    console.log('Portfolio website loaded successfully! 🚀');
    
    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
