import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useCemeteryValidation = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string().required(t('Name is required')),
    description: Yup.string(),
    address_attributes: Yup.object({
      line1: Yup.string().required(t('Address is required')),
      line2: Yup.string(),
      city: Yup.string().required(t('City is required')),
      country: Yup.string().required(t('Country is required')),
      postal_code: Yup.string().required(t('Postal בode is required')),
    }),
  });
};

export default useCemeteryValidation;
