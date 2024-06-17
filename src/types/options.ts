export interface OptionInterface {
  label: string | number;
  value: string | number;
  [key: string]: string | number;
}

export type Options = OptionInterface[];
