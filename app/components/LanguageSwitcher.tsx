'use client'

import { useTranslation } from '../../lib/context/TranslationContext';
import { locales } from '../../lib/translations';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useTranslation();

  const languageNames = {
    uk: 'УКР',
    en: 'ENG',
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg p-1 backdrop-blur-sm">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            locale === lang
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;