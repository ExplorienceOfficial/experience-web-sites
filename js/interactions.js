// ========================================
// USER INTERACTIONS
// ========================================
function initInteractions() {
    // Always init custom cursor JS
    // We handle visibility via CSS media queries in theme.css
    initCustomCursor();
    init3DTilt();
}

// Detect if device is touch-enabled (mobile/tablet)
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursorDot) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows with a tiny bit of smooth interp via CSS transitions if needed, 
        // but JS update is immediate for precision.
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .progress-label, input, textarea, select, .social-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
}

// 3D Tilt Effect (Generic for any .tilt-container if we add one in future)
function init3DTilt() {
    // Currently no hero section, keeping this empty wrapper to prevent errors
}
