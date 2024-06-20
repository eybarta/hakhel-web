import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useRelationToDeceasedValidation = () => {
  const { t } = useTranslation();
  return Yup.array().of(
    Yup.object({
      relation_of_deceased_to_contact: Yup.string().required(
        t('relation is required', { ns: 'validation' })
      ),
      deceased_person_attributes: Yup.object({
        first_name: Yup.string().required(
          t('first name is required', { ns: 'validation' })
        ),
        last_name: Yup.string().required(
          t('last name is required', { ns: 'validation' })
        ),
        gender: Yup.string().required(t('gender is required')),
        cemetery_id: Yup.string().required(t('cemetery is required')),
        date_of_death: Yup.string().required(
          t('hebrew date of death is required')
        ),
      }),
    })
  );
};

export default useRelationToDeceasedValidation;
