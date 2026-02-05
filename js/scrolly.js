
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.fullscreen-text-slide, .scrolly-card');
    const progressBar = document.querySelector('.scroll-progress-bar');
    const timelineContainer = document.querySelector('.scroll-progress-container');
    const footer = document.querySelector('footer');
    const labels = document.querySelectorAll('.progress-label');

    // Smooth Scroll Click Handling
    labels.forEach(label => {
        label.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = label.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll to element
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.scrollHeight;

        // 1. Update Progress Bar
        const totalHeight = bodyHeight - windowHeight;
        let progress = (scrollY / totalHeight) * 100;
        progress = Math.max(0, Math.min(100, progress));

        if (progressBar) {
            progressBar.style.height = `${progress}%`;
        }

        // 2. Footer Collision
        if (footer && timelineContainer) {
            const footerRect = footer.getBoundingClientRect();
            const threshold = windowHeight * 0.8;

            if (footerRect.top < threshold) {
                timelineContainer.classList.add('hide-timeline');
            } else {
                timelineContainer.classList.remove('hide-timeline');
            }
        }

        // 3. Update Active Label - Last Passed Logic (Robust for Gaps)
        const viewportCenter = windowHeight / 2;
        let activeLabel = null;
        let maxTop = -Infinity; // Track the lowest "top" value (closest to center from above)

        labels.forEach(label => {
            const targetId = label.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                // Ignore hash-only if it slipped through, but we fixed IDs so it should be fine.
                // If targetId is just '#', querySelector throws.
                if (targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    const rect = targetEl.getBoundingClientRect();

                    // Logic: Find all sections where the Header (Top) has passed the Center Line.
                    // From those, pick the one that is "most recent" (i.e. highest Top coordinate value, closer to center).
                    // In DOM coordinates, moving down increases Top. 
                    // Sections above viewport have negative Top. Sections in viewport have positive Top.
                    // Passed sections have rect.top <= center.
                    // The "latest" passed section will have the LARGEST rect.top (closest to center).
                    // Example: Section A (Top -500), Section B (Top 100). Center 500.
                    // Both passed ( -500 < 500, 100 < 500).
                    // 100 > -500. So Section B is the active one. Correct.

                    if (rect.top <= viewportCenter + 50) { // +50 px buffer
                        if (rect.top > maxTop) {
                            maxTop = rect.top;
                            activeLabel = label;
                        }
                    }
                }
            }
        });

        // Fallback: If nothing passed center (e.g. at very top), highlight the first one
        if (!activeLabel && labels.length > 0 && window.scrollY < windowHeight) {
            activeLabel = labels[0];
        }

        labels.forEach(l => l.classList.remove('active'));
        if (activeLabel) activeLabel.classList.add('active');


        // 4. Cinematic Animation
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const screenCenter = windowHeight / 2;

            const dist = Math.abs(cardCenter - screenCenter);
            const maxDist = windowHeight * 0.5;

            let opacity = 1 - (dist / maxDist);
            opacity = Math.max(0, Math.min(1, opacity));

            let scale = 0.8 + (0.3 * opacity);

            card.style.opacity = opacity;
            card.style.transform = `scale(${scale})`;

            if (opacity < 0.5) {
                card.style.filter = `blur(${(1 - opacity) * 10}px)`;
            } else {
                card.style.filter = 'none';
            }
        });
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScroll);
    });

    handleScroll();
});
