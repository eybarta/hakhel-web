import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useCemeteryValidation = () => {
  const { t } = useTranslation();

  const isDirtyAddress = (addressProp: string) => {
    return addressProp && Object.values(addressProp).some(value => value);
  };

  const addressFieldValidation = (message: string) => {
    return Yup.string().when(([], sch, props) => {
      return isDirtyAddress(props?.context?.address_attributes)
        ? sch.required(t(message))
        : sch.notRequired();
    });
  };

  return Yup.object({
    name: Yup.string().required(t('name is required')),
    description: Yup.string(),
    address_attributes: Yup.object({
      line1: addressFieldValidation('Line 1 is required'),
      line2: Yup.string(),
      city: addressFieldValidation('City is required'),
      country: addressFieldValidation('Country is required'),
      postal_code: addressFieldValidation('Postal code is required'),
    }),
  });
};

export default useCemeteryValidation;
