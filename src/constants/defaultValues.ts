import { AddressInterface } from '@type/addressInterface';
import { CemeteryInterface } from '../types/cemeteriesInterface';
import { DeceasedPersonInterface } from '@type/deceasedInterface';
import { ContactInterface } from '@type/contactsInterface';

export const defaultAddressValues: AddressInterface = {
  line1: '',
  line2: '',
  city: '',
  country: '',
  postal_code: '',
};

export const defaultContactValues: ContactInterface = {
  id: null,
  first_name: '',
  last_name: '',
  gender: '',
  email: '',
  phone: '',
  address_attributes: defaultAddressValues,
  relations_attributes: [],
};

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
  relations_attributes: [],
};

export const defaultCemeteryValues: CemeteryInterface = {
  id: null,
  name: '',
  description: '',
  address_attributes: defaultAddressValues,
};
