// FormEditDeceasedList.tsx
import React from 'react';
import { FieldArray } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { RelationToDeceasedClientInterface } from '@type/relationshipsInterface';
import { useConfirm } from '@components/context/ConfirmContext';
import DeceasedFields from '@components/fields/DeceasedFields';

const FormEditDeceasedList = ({ values, errors, touched }) => {
  const { t } = useTranslation();
  console.log('values > ', values);
  const { confirmPopup } = useConfirm();

  const confirmRemoveDeceased = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    remove: (index: number) => void | undefined
  ) => {
    confirmPopup({
      target: e.currentTarget,
      message: t('confirm_remove_deceased'),
      defaultFocus: 'accept',
      icon: 'pi pi-exclamation-triangle text-red-400',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      accept: async () => await remove(index),
      reject: () => console.log('Rejected'),
    });
    // if (window.confirm('Are you sure you want to delete this deceased?')) {
    //   remove(index);
    // }
  };
  const tabHeaderTemplate = ({
    relation,
    name,
    index,
    remove,
  }: {
    relation: string;
    name: string;
    index: number;
    remove: (index: number) => void | undefined;
  }) => {
    console.log('relation: ', relation);
    const label = `${name || `${t('deceased person')} ${index + 1}`}${
      relation ? ` - (${t(relation, { ns: 'relations' })})` : ''
    }`;

    return (
      <div className='flex items-center justify-between gap-2'>
        <span>{label}</span>

        <Button
          icon='pi pi-times'
          severity='danger'
          size='small'
          type='button'
          rounded
          text
          onClick={event => {
            event.stopPropagation();
            name ? confirmRemoveDeceased(event, index, remove) : remove(index);
          }}
        />
      </div>
    );
  };

  const addDeceased = (push: <X = any>(obj: X) => void) => {
    push({
      relation_of_deceased_to_contact: '',
      deceased_person_attributes: {
        first_name: '',
        last_name: '',
        gender: '',
        cemetery_id: null,
        date_of_death: '',
        hebrew_day_of_death: '',
        hebrew_month_of_death: '',
        hebrew_year_of_death: '',
      },
    });
  };
  return (
    <FieldArray name='relations_attributes'>
      {({ push, remove }) => (
        <div>
          {values.relations_attributes?.length ? (
            <Accordion expandIcon='pi pi-chevron-left'>
              {values.relations_attributes.map(
                (
                  relation: RelationToDeceasedClientInterface,
                  index: number
                ) => {
                  const {
                    relation_of_deceased_to_contact,
                    deceased_person_attributes: deceased,
                  } = relation;
                  const name =
                    `${deceased.first_name} ${deceased.last_name}`.trim();
                  return (
                    <AccordionTab
                      key={index}
                      header={() =>
                        tabHeaderTemplate({
                          relation: relation_of_deceased_to_contact,
                          name,
                          index,
                          remove,
                        })
                      }
                    >
                      <DeceasedFields
                        scope={`relations_attributes.${index}.deceased_person_attributes.`}
                        relationScope={`relations_attributes.${index}.`}
                        values={values}
                      />
                    </AccordionTab>
                  );
                }
              )}
            </Accordion>
          ) : (
            <h3>{t('no_deceased_available')}</h3>
          )}

          <Button
            label={t('add')}
            icon='pi pi-plus'
            severity='secondary'
            className='mt-2'
            size='small'
            type='button'
            onClick={() => addDeceased(push)}
          />
        </div>
      )}
    </FieldArray>
  );
};

export default FormEditDeceasedList;
