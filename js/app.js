// ========================================
// INITIALIZATION & SETUP
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize features that exist
    initVideoScroll();
    initInteractions();
    initNavbarScroll(); // Navbar logic


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

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 1. Logic for background style (transparency vs solid)
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // 2. Logic for Hide/Show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling DOWN -> Hide
            nav.classList.add('hidden');
        } else {
            // Scrolling UP -> Show
            nav.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });
}


