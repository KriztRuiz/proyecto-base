import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
  });
export default i18n;
// This file initializes i18next for internationalization in a React application.
// It uses the i18next-browser-languagedetector for detecting user language and i18next-http-backend for loading translation files.