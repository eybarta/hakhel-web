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
          'Address information': 'כתובת',
          'Line 1': 'שורה 1',
          'Line 2': 'שורה 2',
          City: 'עיר',
          Country: 'מדינה',
          'Postal code': 'מיקוד',
          Address: 'כתובת',
          'Address is required': 'כתובת זה שדה חובה',
          'City is required': 'עיר זה שדה חובה',
          'Country is required': 'מדינה זה שדה חובה',
          'Postal code is required': 'מיקוד זה שדה חובה',
          'Add cemetery': 'הוספת בית עלמין',
          'Add deceased person': 'הוספת נפטר',
          'Please correct the errors in the form': 'יש שדות לא תקינים בטופס',
          'Cemetery information': 'פרטי בית עלמין',
          'Cemetery is required': 'בית עלמין זה שדה חובה',
          'Cemeteries information': 'פרטי בתי עלמין',
          // 'Cemetery information': 'פרטי קבורה',
          'Name is required': 'שם זה שדה חובה',
          'Cemetery parcel': 'מספר חלקה',
          'Cemetery region': 'מספר גוש',
          'Date of Birth': 'תאריך לידה',
          'Date of Death': 'תאריך פטירה',
          'Deceased information': 'פרטי נפטר',
          'Deceased people': 'פרטי נפטרים',
          'deceased person': 'נפטר',
          'First name is required': 'שם פרטי זה שדה חובה',
          'First name': 'שם פרטי',
          'Gender is required': 'מין זה שדה חובה',
          'Hebrew date of death is required': 'תאריך פטירה בעברית זה שדה חובה',
          'Last name is required': 'שם משפחה זה שדה חובה',
          'Last name': 'שם משפחה',
          'No data available': 'אין נתונים',
          'Select cemetery': 'מקום קבורה',
          'Select gender': 'מין',
          'Sign in': 'כניסה',
          Add: 'הוספת',
          Cemeteries: 'בתי עלמין',
          cemetery: 'מקום קבורה',
          Description: 'תיאור',
          Edit: 'עריכת',
          Email: 'אימייל',
          Female: 'נקבה',
          female: 'נקבה',
          Male: 'זכר',
          male: 'זכר',
          Name: 'שם',
          Password: 'סיסמה',
          Save: 'שמור',
          Search: 'חיפוש',
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
    missingKeyHandler: key => {
      return key; // This ensures that the key itself is returned if the translation is missing
    },
  });

export default i18n;
