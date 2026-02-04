// ========================================
// SOLUTIONS SECTION INTERACTION (CARDS)
// ========================================

function initSolutions() {
    const categories = document.querySelectorAll('.solution-category');
    const cards = document.querySelectorAll('.solution-card');

    if (!categories.length || !cards.length) return;

    // Intersection Observer for category fade-in animation
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all categories
    categories.forEach(category => {
        categoryObserver.observe(category);
    });

    // Enhanced mouse tracking for glow and 3D tilt effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate position as percentage
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            // Set CSS variables for glow effect
            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);

            // Calculate 3D tilt angles (subtle effect)
            const xRotation = ((yPercent - 50) / 50) * 8; // -8 to 8 degrees
            const yRotation = ((xPercent - 50) / 50) * -8; // -8 to 8 degrees

            // Apply 3D transform
            card.style.transform = `
                translateY(-15px) 
                scale(1.05) 
                rotateX(${xRotation}deg) 
                rotateY(${yRotation}deg)
            `;
        });

        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Add click handler with ripple effect
        card.addEventListener('click', (e) => {
            createRipple(card, e);

            // Optional: Add a subtle shake animation
            card.style.animation = 'cardShake 0.5s ease';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });

        // Add entrance animation with stagger
        const categoryIndex = Array.from(categories).indexOf(card.closest('.solution-category'));
        const cardIndex = Array.from(card.parentElement.children).indexOf(card);
        const delay = (categoryIndex * 300) + (cardIndex * 100);

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);
    });
}

// Create ripple effect on card click
function createRipple(card, event) {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 245, 255, 0.4), transparent);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.8s ease-out;
        z-index: 1000;
    `;

    card.style.position = 'relative';
    card.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }

    @keyframes cardShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    /* Smooth transition for all card transforms */
    .solution-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease !important;
    }

    /* Preserve 3D transforms during hover */
    .solution-card:hover {
        transition: transform 0.1s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolutions);
} else {
    initSolutions();
}
