import {
  RemoveRelationEventProps,
  RemoveRelationProps,
} from '@type/eventsInterface';
import { confirmPopup } from 'primereact/confirmpopup';
import { useTranslation } from 'react-i18next';

const confirmRemove = async ({
  index,
  relation,
  remove,
  form,
}: RemoveRelationProps) => {
  if (relation.id) {
    form.setFieldValue(`relations_attributes.${index}._destroy`, 1);
  } else {
    remove(index);
  }
};

const useRemoveRelation = () => {
  const { t } = useTranslation();
  console.log('confirmPopup: ', confirmPopup);
  const removeRelation = ({
    event,
    index,
    relation,
    remove,
    form,
  }: RemoveRelationEventProps) => {
    confirmPopup({
      target: event?.currentTarget,
      message: t('confirm_remove_contact'),
      defaultFocus: 'accept',
      icon: 'pi pi-exclamation-triangle text-red-400',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      accept: async () =>
        await confirmRemove({ index, relation, remove, form }),
      reject: () => console.log('Rejected'),
    });
  };
  return removeRelation;
};

export default useRemoveRelation;
