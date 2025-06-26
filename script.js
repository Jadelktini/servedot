// Navigation function
function navigateToService() {
    // Add a subtle click animation
    const card = document.querySelector('.service-card');
    if (card) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            window.location.href = 'servedotlogistic.html';
        }, 150);
    }
}

// Initialize animations and interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fade-in animations
    initializeAnimations();
    
    // Add enhanced hover effects
    initializeHoverEffects();
    
    // Add keyboard navigation support
    initializeKeyboardNavigation();
});

// Animation initialization
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    
    // Use Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    const serviceCard = document.querySelector('.service-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Service card hover effect
    if (serviceCard) {
        serviceCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        serviceCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click ripple effect
        serviceCard.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 98, 65, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Contact items hover effect
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    const serviceCard = document.querySelector('.service-card');
    const contactLinks = document.querySelectorAll('.contact-link');
    
    // Make service card keyboard accessible
    if (serviceCard) {
        serviceCard.setAttribute('tabindex', '0');
        serviceCard.setAttribute('role', 'button');
        serviceCard.setAttribute('aria-label', 'Accéder à Servedot Logistic');
        
        serviceCard.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToService();
            }
        });
        
        // Focus styles
        serviceCard.addEventListener('focus', function() {
            this.style.outline = '3px solid #006241';
            this.style.outlineOffset = '2px';
        });
        
        serviceCard.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    }
    
    // Enhanced focus styles for contact links
    contactLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.style.outline = '2px solid #006241';
            this.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for any internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Debounced resize handler
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate any layout-dependent animations if needed
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
        animatedElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 150);
});

// Preload next page for better performance
if (document.querySelector('.service-card')) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'servedotlogistic.html';
    document.head.appendChild(link);
}
