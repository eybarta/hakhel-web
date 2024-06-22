import { Options } from '@type/options';
import { useTranslation } from 'react-i18next';

export const useSelectOptions = () => {
  const { t } = useTranslation();
  const genderOptions: Options = [
    { label: t('male'), value: 'male' },
    { label: t('female'), value: 'female' },
  ];
  const relationOptions: Options = [
    { label: t('father', { ns: 'relations' }), value: 'father' },
    { label: t('mother', { ns: 'relations' }), value: 'mother' },
    { label: t('son', { ns: 'relations' }), value: 'son' },
    { label: t('daughter', { ns: 'relations' }), value: 'daughter' },
    { label: t('brother', { ns: 'relations' }), value: 'brother' },
    { label: t('sister', { ns: 'relations' }), value: 'sister' },
    { label: t('husband', { ns: 'relations' }), value: 'husband' },
    { label: t('wife', { ns: 'relations' }), value: 'wife' },
    { label: t('uncle', { ns: 'relations' }), value: 'uncle' },
    { label: t('aunt', { ns: 'relations' }), value: 'aunt' },
    { label: t('nephew', { ns: 'relations' }), value: 'nephew' },
    { label: t('niece', { ns: 'relations' }), value: 'niece' },
    { label: t('cousin', { ns: 'relations' }), value: 'cousin' },
    { label: t('grandfather', { ns: 'relations' }), value: 'grandfather' },
    { label: t('grandmother', { ns: 'relations' }), value: 'grandmother' },
    { label: t('grandson', { ns: 'relations' }), value: 'grandson' },
    { label: t('granddaughter', { ns: 'relations' }), value: 'granddaughter' },
    { label: t('father-in-law', { ns: 'relations' }), value: 'father-in-law' },
    { label: t('mother-in-law', { ns: 'relations' }), value: 'mother-in-law' },
    { label: t('son-in-law', { ns: 'relations' }), value: 'son-in-law' },
    {
      label: t('daughter-in-law', { ns: 'relations' }),
      value: 'daughter-in-law',
    },
    {
      label: t('brother-in-law', { ns: 'relations' }),
      value: 'brother-in-law',
    },
    { label: t('sister-in-law', { ns: 'relations' }), value: 'sister-in-law' },
    { label: t('stepfather', { ns: 'relations' }), value: 'stepfather' },
    { label: t('stepmother', { ns: 'relations' }), value: 'stepmother' },
    { label: t('stepson', { ns: 'relations' }), value: 'stepson' },
    { label: t('stepdaughter', { ns: 'relations' }), value: 'stepdaughter' },
    { label: t('half-brother', { ns: 'relations' }), value: 'half-brother' },
    { label: t('half-sister', { ns: 'relations' }), value: 'half-sister' },
    { label: t('godfather', { ns: 'relations' }), value: 'godfather' },
    { label: t('godmother', { ns: 'relations' }), value: 'godmother' },
    { label: t('godson', { ns: 'relations' }), value: 'godson' },
    { label: t('goddaughter', { ns: 'relations' }), value: 'goddaughter' },
  ];
  return {
    genderOptions,
    relationOptions,
  };
};

export default useSelectOptions;
