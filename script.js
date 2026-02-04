document.addEventListener('DOMContentLoaded', () => {

    // --- Initial Animations (Hero) ---
    const revealElements = document.querySelectorAll('.reveal-text');
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('active'));
    }, 100);

    // --- Variables ---
    const parallaxElements = document.querySelectorAll('.parallax');
    const heroSection = document.getElementById('hero');
    const scrollProgress = document.getElementById('scroll-progress');
    const nav = document.querySelector('.navbar');
    const storySections = document.querySelectorAll('.story-section');

    // --- Cinematic Scroll Story Trigger ---
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class when section comes into view
                entry.target.classList.add('active');

                // Optional: Remove active from previous sections for "video-like" feel
                // Uncomment below if you want only one section active at a time
                // storySections.forEach(section => {
                //     if (section !== entry.target) {
                //         section.classList.remove('active');
                //     }
                // });
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-100px'
    });

    // Observe all story sections
    storySections.forEach(section => {
        storyObserver.observe(section);
    });

    // --- Main Scroll Event ---
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const scrollY = window.scrollY;

        // 1. Update Scroll Progress Bar
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / maxScroll) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;

        // 2. Parallax Effect for Hero Shapes
        if (scrollY < window.innerHeight) {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed'));
                const yPos = scrollY * speed * 100;
                el.style.transform = `translateY(${yPos}px)`;
            });

            // Fade out hero content on scroll
            const heroContent = document.querySelector('.hero-content');
            const opacity = Math.max(0, 1 - (scrollY / 700));
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        // 3. Navbar Adaptive Style
        if (scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.boxShadow = 'none';
        }

        // 4. Story Sections - Progressive Reveal Based on Scroll Position
        storySections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the section is visible
            const visiblePercent = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (windowHeight + rect.height)
            ));

            // Apply progressive transformations
            if (visiblePercent > 0.2) {
                section.classList.add('active');

                // Scale and opacity based on scroll progress through section
                const content = section.querySelector('.story-content');
                const visual = section.querySelector('.story-visual');

                if (content && visual) {
                    const progress = Math.min(1, (visiblePercent - 0.2) / 0.6);

                    // Smooth entrance
                    content.style.opacity = progress;
                    visual.style.opacity = progress;
                }
            } else {
                section.classList.remove('active');
            }
        });
    }

    // --- Intersection Observer for Cards ---
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe Headers and Cards
    document.querySelectorAll('.features-section h2').forEach(el => cardObserver.observe(el));

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        cardObserver.observe(card);
    });

    // --- Smooth Scroll for Button ---
    document.getElementById('exploreBtn').addEventListener('click', () => {
        const firstStory = document.querySelector('.story-section');
        if (firstStory) {
            firstStory.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- 3D Tilt Effect on Hero (Mouse Movement) ---
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;

        const content = document.querySelector('.hero-content');
        content.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(${window.scrollY * 0.5}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        const content = document.querySelector('.hero-content');
        content.style.transform = `perspective(1000px) rotateY(0) rotateX(0) translateY(${window.scrollY * 0.5}px)`;
    });

    // --- Initial trigger for visible sections ---
    handleScroll();
});
