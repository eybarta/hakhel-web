// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome_message: 'Welcome to React',
        },
      },
      he: {
        translation: {
          'Sign in': 'כניסה',
          Email: 'אימייל',
          Password: 'סיסמה',
          'First name': 'שם פרטי',
          'Last name': 'שם משפחה',
          'Select gender': 'מין',
          'Select cemetery': 'מקום קבורה',
          Male: 'זכר',
          Female: 'נקבה',
          male: 'זכר',
          female: 'נקבה',
          'Date of Birth': 'תאריך לידה',
          'Date of Death': 'תאריך פטירה',
          Save: 'שמור',
          'First name is required': 'שם פרטי זה שדה חובה',
          'Last name is required': 'שם משפחה זה שדה חובה',
          'Gender is required': 'מין זה שדה חובה',
          'Hebrew date of death is required': 'תאריך פטירה בעברית זה שדה חובה',
          Edit: 'עריכת',
          Add: 'הוספת',
          'deceased person': 'נפטר',
          'Deceased people': 'פרטי נפטרים',
          'Add deceased person': 'הוספת נפטר',
          'Add cemetery': 'הוספת בית עלמין',
          cemetery: 'מקום קבורה',
          'Cemetery information': 'פרטי קבורה',
          'Cemeteries information': 'פרטי בתי עלמין',
          'Deceased information': 'פרטי נפטר',
          'Cemetery parcel': 'מספר חלקה',
          'Cemetery region': 'מספר גוש',
          'No data available': 'אין נתונים',
          Search: 'חיפוש',
          Name: 'שם',
          Description: 'תיאור',
        },
      },
    },
    lng: 'he', // default language
    fallbackLng: 'he', // default language to use
    returnObjects: true,
    keySeparator: false, // setting keySeparator to false means that dots in keys are not treated as path separators
    react: {
      useSuspense: false,
    },
    debug: false, // toggle this to see logs for debugging
    saveMissing: true, // saves new keys to the translation file (useful during development)
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      return key; // This ensures that the key itself is returned if the translation is missing
    },
  });

export default i18n;
