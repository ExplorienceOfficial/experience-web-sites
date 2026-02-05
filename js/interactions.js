// ========================================
// USER INTERACTIONS
// ========================================
function initInteractions() {
    // Only init custom cursor on non-touch devices
    if (!isTouchDevice()) {
        initCustomCursor();
    } else {
        // Hide cursor elements on mobile
        const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-outline');
        cursorElements.forEach(el => el.style.display = 'none');
    }
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
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight delay (using animate for smoother performance)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .progress-label, input, textarea, select');

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
