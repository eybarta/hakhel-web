import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useDeceasedValidation = () => {
  const { t } = useTranslation();

  return Yup.object({
    first_name: Yup.string().required(t('First name is required')),
    last_name: Yup.string().required(t('Last name is required')),
    gender: Yup.string().required(t('Gender is required')),
    cemetery_id: Yup.string().required(t('Cemetery is required')),
    date_of_death: Yup.string().required(t('Hebrew date of death is required')),
  });
};

export default useDeceasedValidation;