/**
 * Grace of Lord Infant School - Dynamic JavaScript
 */

// ============================================
// CHANGED: Mobile Navigation Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// ============================================
// CHANGED: Age Calculator from Date of Birth
// ============================================
const dobInput = document.getElementById('dob');
const ageDisplay = document.getElementById('ageDisplay');

if (dobInput && ageDisplay) {
    dobInput.addEventListener('change', function() {
        const dob = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age >= 0 && age <= 18) {
            ageDisplay.textContent = `Age: ${age} years old`;
            ageDisplay.style.color = '#28a745';
        } else if (age < 0) {
            ageDisplay.textContent = 'Invalid date - date cannot be in the future';
            ageDisplay.style.color = '#dc3545';
        } else {
            ageDisplay.textContent = 'Please enter a valid date of birth';
            ageDisplay.style.color = '#dc3545';
        }
    });
}

// ============================================
// CHANGED: Form Validation with Visual Feedback
// ============================================
const admissionForm = document.getElementById('admissionForm');

if (admissionForm) {
    // Add real-time validation to required fields
    const requiredInputs = admissionForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        if (field.checkValidity()) {
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
        }
    }
    
    // Form submission handler
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        requiredInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // Reset form after successful submission
            setTimeout(() => {
                admissionForm.reset();
                document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
            }, 1000);
        } else {
            // Scroll to first invalid field
            const firstInvalid = admissionForm.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });
}

// ============================================
// CHANGED: Success Message Display
// ============================================
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        
        // Add animation to the success content
        const successContent = successMessage.querySelector('.success-content');
        if (successContent) {
            successContent.classList.add('animate__animated', 'animate__bounceIn');
        }
    }
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('show');
    }
}

// Close success message when clicking outside
const successMessage = document.getElementById('successMessage');
if (successMessage) {
    successMessage.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessMessage();
        }
    });
}

// ============================================
// CHANGED: Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// CHANGED: Sticky Navigation on Scroll
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.classList.add('scroll-up');
        } else {
            // Scrolling up
            header.classList.remove('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// CHANGED: Form Field Focus Effects
// ============================================
const formInputs = document.querySelectorAll('.admission-form input, .admission-form select, .admission-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// ============================================
// CHANGED: File Upload Preview (Optional Enhancement)
// ============================================
const fileInputs = document.querySelectorAll('input[type="file"]');

fileInputs.forEach(input => {
    input.addEventListener('change', function() {
        const fileName = this.files[0]?.name;
        if (fileName) {
            // Show file name (you could add a visual indicator)
            console.log('File selected: ' + fileName);
        }
    });
});

// ============================================
// CHANGED: Contact Form Validation (for contactus.html)
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Basic validation
        let isValid = true;
        
        if (name && !name.value.trim()) {
            isValid = false;
            name.classList.add('invalid');
        }
        
        if (email && !email.value.trim()) {
            isValid = false;
            email.classList.add('invalid');
        }
        
        if (message && !message.value.trim()) {
            isValid = false;
            message.classList.add('invalid');
        }
        
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// ============================================
// CHANGED: Scroll Animation System
// ============================================

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on data attribute
                const animationType = entry.target.getAttribute('data-animation') || 'fade-up';
                entry.target.classList.add('animate-' + animationType);
                entry.target.classList.add('animated'); // Mark as animated
                
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Also observe sections and cards that should animate
    const sections = document.querySelectorAll('section, .mission-vision > div, .highlight-box, .testimonial, .academic-card, .gallery-item, .req-card');
    sections.forEach(el => {
        if (!el.hasAttribute('data-animate')) {
            el.setAttribute('data-animate', 'fade-up');
            observer.observe(el);
        }
    });
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add scroll-based parallax effect to hero sections (optional enhancement)
function initParallax() {
    const heroSections = document.querySelectorAll('.header-bg, .header-contact, .header-admission, .header-academics');
    
    if (heroSections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSections.forEach(section => {
                const speed = 0.3;
                section.style.backgroundPositionY = (scrolled * speed) + 'px';
            });
        });
    }
}

// Add number counter animation for stats (if needed)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Initialize parallax if enabled
initParallax();

// Initialize counters if they exist
animateCounters();

console.log('Grace of Lord Infant School - JavaScript Loaded Successfully!');
console.log('Scroll animations initialized!');
