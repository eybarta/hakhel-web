import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAddressFieldsValidation from './useAddressValidation';
import useRelationToDeceasedValidation from './useRelationToDeceasedValidation';
const useContactValidation = () => {
  const { t } = useTranslation();
  const addressFieldsValidation = useAddressFieldsValidation();
  const relationToDeceasedValidation = useRelationToDeceasedValidation();
  return Yup.object({
    first_name: Yup.string().required(t('first name is required')),
    last_name: Yup.string().required(t('last name is required')),
    phone: Yup.string().required(t('phone is required', { ns: 'validation' })),
    gender: Yup.string().required(t('gender is required')),
    address_attributes: addressFieldsValidation,
    relations_attributes: relationToDeceasedValidation,
  });
};

export default useContactValidation;
