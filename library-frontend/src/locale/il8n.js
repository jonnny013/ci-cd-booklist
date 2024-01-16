import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enTranslation from './english.json';
import zwTranslation from './chinese.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zw: {
        translation: zwTranslation,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'zw', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
