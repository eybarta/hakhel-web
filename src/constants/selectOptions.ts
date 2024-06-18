import { Options } from '@type/options';
import { useTranslation } from 'react-i18next';

export const useSelectOptions = () => {
  const { t } = useTranslation();
  const genderOptions: Options = [
    { label: t('male'), value: 'male' },
    { label: t('female'), value: 'female' },
  ];
  const relationOptions: Options = [
    { label: t('father'), value: 'father' },
    { label: t('mother'), value: 'mother' },
    { label: t('son'), value: 'son' },
    { label: t('daughter'), value: 'daughter' },
    { label: t('brother'), value: 'brother' },
    { label: t('sister'), value: 'sister' },
    { label: t('husband'), value: 'husband' },
    { label: t('wife'), value: 'wife' },
    { label: t('uncle'), value: 'uncle' },
    { label: t('aunt'), value: 'aunt' },
    { label: t('nephew'), value: 'nephew' },
    { label: t('niece'), value: 'niece' },
    { label: t('cousin'), value: 'cousin' },
    { label: t('grandfather'), value: 'grandfather' },
    { label: t('grandmother'), value: 'grandmother' },
    { label: t('grandson'), value: 'grandson' },
    { label: t('granddaughter'), value: 'granddaughter' },
    { label: t('father-in-law'), value: 'father-in-law' },
    { label: t('mother-in-law'), value: 'mother-in-law' },
    { label: t('son-in-law'), value: 'son-in-law' },
    { label: t('daughter-in-law'), value: 'daughter-in-law' },
    { label: t('brother-in-law'), value: 'brother-in-law' },
    { label: t('sister-in-law'), value: 'sister-in-law' },
    { label: t('stepfather'), value: 'stepfather' },
    { label: t('stepmother'), value: 'stepmother' },
    { label: t('stepson'), value: 'stepson' },
    { label: t('stepdaughter'), value: 'stepdaughter' },
    { label: t('half-brother'), value: 'half-brother' },
    { label: t('half-sister'), value: 'half-sister' },
    { label: t('godfather'), value: 'godfather' },
    { label: t('godmother'), value: 'godmother' },
    { label: t('godson'), value: 'godson' },
    { label: t('goddaughter'), value: 'goddaughter' },
  ];
  return {
    genderOptions,
    relationOptions,
  };
};

export default useSelectOptions;
