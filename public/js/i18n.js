const i18n = {
    currentLang: localStorage.getItem('lang') || 'tr',

    init() {
        this.setLanguage(this.currentLang);
        this.createSwitcher();
        this.addEventListeners();
    },

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        const translations = lang === 'tr' ? translationsTr : translationsEn;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key];
                } else {
                    el.innerHTML = translations[key];
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update switcher active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    },

    createSwitcher() {
        const controls = document.querySelector('.nav-controls');
        if (!controls) return;

        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'tr' ? 'active' : ''}" data-lang="tr">TR</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        `;
        controls.appendChild(switcher);
    },

    addEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', () => i18n.init());
