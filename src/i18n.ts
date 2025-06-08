import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import viTranslation from './locales/vi/translation.json';

// Định nghĩa kiểu cho các bản dịch
interface TranslationResources {
    welcome: string;
    description: string;
}

const resources = {
    en: {
        translation: enTranslation as TranslationResources,
    },
    vi: {
        translation: viTranslation as TranslationResources,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;