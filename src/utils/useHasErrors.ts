import { get } from 'lodash';

const useHasErrors = () => {
  const hasErrors = (errors: any, touched: any, fields: string[]): boolean =>
    fields.some(field => {
      if (Array.isArray(field)) {
        // For array fields, recursively check each item
        return field.some(
          (subField, index) =>
            get(touched, `${field}[${index}].${subField}`) &&
            get(errors, `${field}[${index}].${subField}`)
        );
      }
      return get(touched, field) && get(errors, field);
    });
  return hasErrors;
};

export default useHasErrors;
