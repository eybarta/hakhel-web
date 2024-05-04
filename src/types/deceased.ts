export interface DeceasedPersonInterface {
  cemetery_id: number;
  cemetery_parcel: null | string;
  cemetery_region: null | string;
  created_at: string;
  date_of_death: null | string;
  father_first_name: string;
  first_name: string;
  gender: 'male' | 'female';
  hebrew_day_of_death: string;
  hebrew_month_of_death: string;
  hebrew_year_of_death: string;
  id: number;
  last_name: string;
  location_of_death: string;
  mother_first_name: string;
  occupation: null | string;
  organization: null | string;
  religion: string;
  time_of_death: null | string;
  updated_at: string;
}
