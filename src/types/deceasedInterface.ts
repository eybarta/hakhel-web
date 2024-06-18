import {
  RelationToContactClientInterface,
  RelationToContactServerInterface,
} from './relationshipsInterface';

export interface DeceasedPersonInterface {
  id?: null | number;
  updated_at?: string;
  created_at?: string;
  occupation?: null | string;
  organization?: null | string;
  time_of_death?: null | string;
  religion?: string;
  location_of_death?: string;
  cemetery_id: null | number;
  cemetery_parcel: null | string;
  cemetery_region: null | string;
  date_of_death: null | string;
  father_first_name: string;
  first_name: string;
  gender: 'male' | 'female' | '';
  hebrew_day_of_death: string;
  hebrew_month_of_death: string;
  hebrew_year_of_death: string;
  last_name: string;
  mother_first_name: string;
  relations_attributes?: RelationToContactClientInterface[];
  relations?: RelationToContactServerInterface[];
}

export type DeceasedPersonServerInterface = {
  deceased_person: DeceasedPersonInterface;
};
