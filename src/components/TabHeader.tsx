import useRemoveRelation from '@hooks/useRemoveRelation';
import { TabHeaderProps } from '@type/eventsInterface';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const TabHeader: React.FC<TabHeaderProps> = ({
  relation,
  name,
  index,
  remove,
  form,
}) => {
  const { t } = useTranslation();
  const removeRelation = useRemoveRelation();
  const { relation_of_deceased_to_contact: rt } = relation;
  console.log('relation: ', relation);
  const label = `${name || `${t('contact person')} ${index + 1}`}${
    rt ? ` - (${t(rt, { ns: 'relations' })})` : ''
  }`;

  return (
    <div className='flex items-center justify-between gap-2'>
      <span>{label}</span>

      {relation._destroy ? (
        <span className='text-red-400 font-light flex items-center gap-2'>
          <i className='pi pi-exclamation-triangle'></i>
          {t('deleted_on_save')}
        </span>
      ) : (
        <Button
          icon='pi pi-times'
          severity='danger'
          size='small'
          type='button'
          rounded
          text
          onClick={event => {
            event.stopPropagation();
            name
              ? removeRelation({ event, relation, index, remove, form })
              : remove(index);
          }}
        />
      )}
    </div>
  );
};

export default TabHeader;
