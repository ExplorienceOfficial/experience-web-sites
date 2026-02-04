// ========================================
// INITIALIZATION & SETUP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize features that exist
    initVideoScroll();
    initInteractions();
    initNavbarScroll(); // Navbar logic
    if (typeof initSolutions === 'function') initSolutions();

    // Optional: Hero animations if elements exist
    if (document.querySelector('.reveal-text')) {
        initHeroAnimations();
    }
});

// ========================================
// HERO ANIMATIONS (Optional Support)
// ========================================
function initHeroAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text');
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('active'));
    }, 100);
}

// ========================================
// NAVBAR SCROLL
// ========================================
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ========================================
// INTERACTIONS
// ========================================
function initInteractions() {
    // Placeholder for random interaction logic if needed
    // Currently relying on video.js for main scroll logic
    console.log("Interactions initialized");
}
