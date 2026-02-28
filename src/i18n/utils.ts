import tr from './tr.json';
import en from './en.json';

const translations: Record<string, typeof tr> = { tr, en };

export const languages = {
    tr: 'Türkçe',
    en: 'English',
};

export const defaultLang = 'tr';

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split('/');
    if (lang in languages) return lang as Lang;
    return defaultLang;
}

export function useTranslations(lang: Lang) {
    return translations[lang] || translations[defaultLang];
}

/**
 * Generate localized path.
 * getLocalizedPath('/tr/', 'en') => '/en/'
 * getLocalizedPath('/tr/about', 'en') => '/en/about'
 */
export function getLocalizedPath(path: string, targetLang: Lang): string {
    const segments = path.split('/').filter(Boolean);
    // Remove current language prefix if it exists
    if (segments[0] in languages) {
        segments.shift();
    }
    return `/${targetLang}/${segments.join('/')}`;
}

/**
 * Get alternate language links for hreflang tags.
 */
export function getAlternateLinks(currentPath: string): { lang: string; href: string }[] {
    return Object.keys(languages).map((lang) => ({
        lang,
        href: `https://www.explorience.com.tr${getLocalizedPath(currentPath, lang as Lang)}`,
    }));
}
