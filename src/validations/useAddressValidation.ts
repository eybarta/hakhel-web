import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const isDirtyAddress = (addressProp: string) => {
  return addressProp && Object.values(addressProp).some(value => value);
};

const useAddressFieldsValidation = () => {
  const { t } = useTranslation();

  const addressFieldValidate = (message: string) => {
    return Yup.string().when(([], sch, props) => {
      return isDirtyAddress(props?.context?.address_attributes)
        ? sch.required(t(message, { ns: 'validation' }))
        : sch.notRequired();
    });
  };
  return Yup.object({
    line1: addressFieldValidate('line 1 is required'),
    line2: Yup.string(),
    city: addressFieldValidate('city is required'),
    country: addressFieldValidate('country is required'),
    postal_code: addressFieldValidate('postal code is required'),
  });
};

export default useAddressFieldsValidation;
