import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAddressFieldsValidation from './useAddressValidation';

const useCemeteryValidation = () => {
  const { t } = useTranslation();
  const addressFieldsValidation = useAddressFieldsValidation();

  return Yup.object({
    name: Yup.string().required(t('name is required')),
    description: Yup.string(),
    address_attributes: addressFieldsValidation,
  });
};

export default useCemeteryValidation;
