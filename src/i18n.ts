// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonHE from '/src/locales/he/common.json';
import validationHE from './locales/he/validation.json';
import relationsHE from './locales/he/relations.json';

const resources = {
  en: {
    translation: {
      welcome_message: 'Welcome to React',
    },
  },
  he: {
    common: commonHE,
    validation: validationHE,
    relations: relationsHE,
  },
};

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'he', // default language
    fallbackLng: 'he', // default language to use
    ns: ['common', 'validation', 'relations'],
    defaultNS: 'common', // Set the default namespace to 'common'
    returnObjects: false,
    react: {
      useSuspense: false,
    },
    debug: false, // toggle this to see logs for debugging
    parseMissingKeyHandler(key) {
      return key;
    },
  });
export default i18next;
