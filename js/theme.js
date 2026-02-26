const themeManager = {
    currentTheme: localStorage.getItem('theme') || 'dark',

    init() {
        this.applyTheme(this.currentTheme);
        this.createToggle();
    },

    applyTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        // Remove existing theme link if any
        const oldLink = document.getElementById('theme-link');
        if (oldLink) oldLink.remove();

        // Create new theme link
        const link = document.createElement('link');
        link.id = 'theme-link';
        link.rel = 'stylesheet';
        link.href = `themeLightDark/${theme}Theme.css`;
        document.head.appendChild(link);

        // Update body class for specific overrides
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${theme}`);

        // Update toggle state
        const track = document.querySelector('.theme-toggle-track');
        if (track) {
            track.classList.toggle('is-light', theme === 'light');
        }
    },

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    },

    createToggle() {
        const controls = document.querySelector('.nav-controls');
        if (!controls) return;

        const container = document.createElement('div');
        container.className = 'theme-switcher-container';

        // Create animated toggle
        const track = document.createElement('div');
        track.className = 'theme-toggle-track' + (this.currentTheme === 'light' ? ' is-light' : '');
        track.setAttribute('role', 'button');
        track.setAttribute('aria-label', 'Toggle theme');
        track.tabIndex = 0;

        // Stars (visible in dark mode)
        track.innerHTML = `
            <div class="toggle-stars">
                <span class="star" style="top:8px;left:12px;width:2px;height:2px;animation-delay:0s;"></span>
                <span class="star" style="top:14px;left:6px;width:1.5px;height:1.5px;animation-delay:0.4s;"></span>
                <span class="star" style="top:5px;left:22px;width:1px;height:1px;animation-delay:0.8s;"></span>
                <span class="star" style="top:18px;left:18px;width:1.5px;height:1.5px;animation-delay:1.2s;"></span>
            </div>
            <div class="toggle-clouds">
                <span class="cloud" style="top:7px;left:8px;"></span>
                <span class="cloud" style="top:14px;left:16px;"></span>
            </div>
            <div class="toggle-thumb">
                <div class="crater" style="top:5px;left:8px;width:4px;height:4px;"></div>
                <div class="crater" style="top:10px;left:14px;width:3px;height:3px;"></div>
                <div class="crater" style="top:12px;left:6px;width:2px;height:2px;"></div>
            </div>
        `;

        track.addEventListener('click', () => this.toggleTheme());
        track.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        container.appendChild(track);
        controls.appendChild(container);
    }
};

window.addEventListener('DOMContentLoaded', () => themeManager.init());
