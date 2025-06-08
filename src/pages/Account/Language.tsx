import React from 'react';
import { useTranslation } from 'react-i18next';

const Language: React.FC = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'vi', name: 'Tiếng Việt' },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        i18n.language === lang.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                    }`}
                    onClick={() => changeLanguage(lang.code)}
                >
                    {lang.name}
                </button>
            ))}
             <div>{t('welcome')}</div>
        </div>
    );
};

export default Language;