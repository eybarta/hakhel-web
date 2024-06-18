// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
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
          'Contacts of the deceased': 'אנשי קשר של הנפטר',
          'Address information': 'כתובת',
          'Line 1 is required': 'שורה 1 זה שדה חובה',
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
          'Cemetery address': 'כתובת בית העלמין',
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
          'No address': 'אין כתובת',
          'Select cemetery': 'מקום קבורה',
          'Select gender': 'מין',
          'Sign in': 'כניסה',
          Add: 'הוספת',
          Cemeteries: 'בתי עלמין',
          Cemetery: 'מקום קבורה',
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
          // validations
          "can't be blank": 'שדה חובה',

          // Relations
          Father: 'אבא',
          Mother: 'אמא',
          Son: 'בן',
          Daughter: 'בת',
          Brother: 'אח',
          Sister: 'אחות',
          Husband: 'בעל',
          Wife: 'אישה',
          Uncle: 'דוד',
          Aunt: 'דודה',
          Nephew: 'אחיין',
          Niece: 'אחיינית',
          Cousin: 'בן דוד / בת דודה',
          Grandfather: 'סבא',
          Grandmother: 'סבתא',
          Grandson: 'נכד',
          Granddaughter: 'נכדה',
          'Father-in-law': 'חם',
          'Mother-in-law': 'חמות',
          'Son-in-law': 'חתן',
          'Daughter-in-law': 'כלה',
          'Brother-in-law': 'גיס',
          'Sister-in-law': 'גיסה',
          Stepfather: 'אב חורג',
          Stepmother: 'אם חורגת',
          Stepson: 'בן חורג',
          Stepdaughter: 'בת חורגת',
          'Half-brother': 'אח למחצה',
          'Half-sister': 'אחות למחצה',
          Godfather: 'סנדק',
          Godmother: 'סנדקית',
          Godson: 'בן סנדקות',
          Goddaughter: 'בת סנדקות',
        },
      },
    },
    lng: 'he', // default language
    fallbackLng: 'he', // default language to use
    returnObjects: false,
    react: {
      useSuspense: false,
    },
    debug: true, // toggle this to see logs for debugging
    missingKeyHandler: (
      lngs,
      ns,
      key,
      fallbackValue,
      updateMissing,
      options
    ) => {
      console.log('fallbackValue: ', fallbackValue);
      return 'test';
    },
    parseMissingKeyHandler(key, defaultValue, c, d, e) {
      console.log('c,d,e: ', c, d, e);
      console.log('key: ', key);
      console.log('defaultValue: ', defaultValue);
      return 'test';
    },
  });
export default i18next;
