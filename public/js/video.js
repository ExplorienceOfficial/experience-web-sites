// ========================================
// VIDEO AUTOPLAY & TRANSITION LOGIC
// ========================================

function initVideoScroll() {
    const videos = document.querySelectorAll('video');
    const videoContainers = document.querySelectorAll('.video-scroll-container');

    // Intersection Observer for video playback
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log("Autoplay blocked:", e));
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Intersection Observer for transition effects
    const transitionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;

            if (entry.isIntersecting) {
                // Video is entering viewport
                container.classList.remove('fading', 'transitioning');
            } else {
                // Video is leaving viewport
                container.classList.add('fading');
            }
        });
    }, {
        threshold: [0.3, 0.7],
        rootMargin: '-10% 0px -10% 0px'
    });

    videoContainers.forEach(container => {
        transitionObserver.observe(container);
    });

    // Add scroll event for blur transition effect
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Add transitioning class during scroll
        videoContainers.forEach(container => {
            container.classList.add('transitioning');
        });

        // Remove transitioning class after scroll stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            videoContainers.forEach(container => {
                container.classList.remove('transitioning');
            });
        }, 150);
    }, { passive: true });

    // Hide scroll indicator when user scrolls
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 100) {
                hasScrolled = true;
                scrollIndicator.style.transition = 'opacity 0.5s ease';
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 500);
            }
        }, { passive: true });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoScroll);
} else {
    initVideoScroll();
}
