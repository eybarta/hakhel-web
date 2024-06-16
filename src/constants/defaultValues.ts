import { CemeteryInterface } from './../types/cemeteries';
import { DeceasedPersonInterface } from '@type/deceased';

export const defaultDeceasedValues: DeceasedPersonInterface = {
  id: null,
  first_name: '',
  last_name: '',
  gender: '',
  father_first_name: '',
  mother_first_name: '',
  hebrew_year_of_death: '',
  hebrew_month_of_death: '',
  hebrew_day_of_death: '',
  date_of_death: '',
  cemetery_id: null,
  cemetery_region: '',
  cemetery_parcel: '',
};

export const defaultCemeteryValues: CemeteryInterface = {
  id: null,
  name: '',
  description: '',
  address_attributes: {
    city: '',
    country: '',
    line1: '',
    line2: '',
    postal_code: '',
  },
};
