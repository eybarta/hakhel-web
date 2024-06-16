export interface HebrewCalendarProps {
  inputId: string;
  value: Date | null;
  name: string;
  label: string;
  validationProp?: string;
  // onChange: (hebrewDateParts: HebrewDateParts) => void;
}

export interface HebrewDateParts {
  d: string;
  m: string;
  y: string;
}
export interface HebrewDate {
  events?: string[];
  hd: number;
  heDateParts?: HebrewDateParts;
  hebrew: string;
  hm: string;
  hy: number;
}
export interface HebrewDates {
  [key: string]: HebrewDate;
}

export type DateLike = Date | { year: number; month: number; day: number };
