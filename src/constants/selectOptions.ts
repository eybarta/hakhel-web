import { Options } from '@type/options';
import { useTranslation } from 'react-i18next';

export const useSelectOptions = () => {
  const { t } = useTranslation();
  const genderOptions: Options = [
    { label: t('Male'), value: 'male' },
    { label: t('Female'), value: 'female' },
  ];
  const relationOptions: Options = [
    { label: t('Father'), value: 'father' },
    { label: t('Mother'), value: 'mother' },
    { label: t('Son'), value: 'son' },
    { label: t('Daughter'), value: 'daughter' },
    { label: t('Brother'), value: 'brother' },
    { label: t('Sister'), value: 'sister' },
    { label: t('Husband'), value: 'husband' },
    { label: t('Wife'), value: 'wife' },
    { label: t('Uncle'), value: 'uncle' },
    { label: t('Aunt'), value: 'aunt' },
    { label: t('Nephew'), value: 'nephew' },
    { label: t('Niece'), value: 'niece' },
    { label: t('Cousin'), value: 'cousin' },
    { label: t('Grandfather'), value: 'grandfather' },
    { label: t('Grandmother'), value: 'grandmother' },
    { label: t('Grandson'), value: 'grandson' },
    { label: t('Granddaughter'), value: 'granddaughter' },
    { label: t('Father-in-law'), value: 'father-in-law' },
    { label: t('Mother-in-law'), value: 'mother-in-law' },
    { label: t('Son-in-law'), value: 'son-in-law' },
    { label: t('Daughter-in-law'), value: 'daughter-in-law' },
    { label: t('Brother-in-law'), value: 'brother-in-law' },
    { label: t('Sister-in-law'), value: 'sister-in-law' },
    { label: t('Stepfather'), value: 'stepfather' },
    { label: t('Stepmother'), value: 'stepmother' },
    { label: t('Stepson'), value: 'stepson' },
    { label: t('Stepdaughter'), value: 'stepdaughter' },
    { label: t('Half-brother'), value: 'half-brother' },
    { label: t('Half-sister'), value: 'half-sister' },
    { label: t('Godfather'), value: 'godfather' },
    { label: t('Godmother'), value: 'godmother' },
    { label: t('Godson'), value: 'godson' },
    { label: t('Goddaughter'), value: 'goddaughter' },
  ];
  return {
    genderOptions,
    relationOptions,
  };
};

export default useSelectOptions;
