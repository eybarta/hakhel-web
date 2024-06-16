import { Options } from '@type/options';
import { useTranslation } from 'react-i18next';

export const useSelectOptions = () => {
  const { t } = useTranslation();
  const genderOptions: Options = [
    { label: t('Male'), value: 'male' },
    { label: t('Female'), value: 'female' },
  ];

  return {
    genderOptions,
  };
};

export default useSelectOptions;
