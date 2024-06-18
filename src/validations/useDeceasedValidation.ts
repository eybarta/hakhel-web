import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useDeceasedValidation = () => {
  const { t } = useTranslation();

  return Yup.object({
    first_name: Yup.string().required(t('first name is required')),
    last_name: Yup.string().required(t('last name is required')),
    gender: Yup.string().required(t('gender is required')),
    cemetery_id: Yup.string().required(t('cemetery is required')),
    date_of_death: Yup.string().required(t('hebrew date of death is required')),
  });
};

export default useDeceasedValidation;
