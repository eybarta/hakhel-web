import { get } from 'lodash';

const useHasErrors = () => {
  const hasErrors = (errors: any, touched: any, fields: string[]): boolean =>
    fields.some(field => get(touched, field) && get(errors, field));
  return hasErrors;
};

export default useHasErrors;
