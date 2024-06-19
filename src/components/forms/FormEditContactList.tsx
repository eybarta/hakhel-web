// FormEditContactList.tsx
import React from 'react';
import { FieldArray } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FormEditContact from './FormEditContact';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { RelationToContactClientInterface } from '@type/relationshipsInterface';
import { useConfirm } from '@components/context/ConfirmContext';

const FormEditContactList = ({ values, errors, touched }) => {
  const { t } = useTranslation();
  console.log('values > ', values);
  const { confirmPopup } = useConfirm();

  const confirmRemoveContact = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    remove: (index: number) => void | undefined
  ) => {
    confirmPopup({
      target: e.currentTarget,
      message: t('confirm_remove_contact'),
      defaultFocus: 'accept',
      icon: 'pi pi-exclamation-triangle text-red-400',
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      accept: async () => await remove(index),
      reject: () => console.log('Rejected'),
    });
    // if (window.confirm('Are you sure you want to delete this contact?')) {
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
    const label = `${name || `${t('contact person')} ${index + 1}`}${
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
            name ? confirmRemoveContact(event, index, remove) : remove(index);
          }}
        />
      </div>
    );
  };

  const addContact = (push: <X = any>(obj: X) => void) => {
    push({
      relation_of_deceased_to_contact: '',
      contact_person_attributes: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
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
                (relation: RelationToContactClientInterface, index: number) => {
                  const {
                    relation_of_deceased_to_contact,
                    contact_person_attributes: contact,
                  } = relation;
                  const name =
                    `${contact.first_name} ${contact.last_name}`.trim();
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
                      <FormEditContact
                        scope={`relations_attributes.${index}.contact_person_attributes.`}
                        relationScope={`relations_attributes.${index}.`}
                        removeContact={() => remove(index)}
                      />
                    </AccordionTab>
                  );
                }
              )}
            </Accordion>
          ) : (
            <h3>{t('no_contacts_available')}</h3>
          )}

          <Button
            label={t('add')}
            icon='pi pi-plus'
            severity='secondary'
            className='mt-2'
            size='small'
            type='button'
            onClick={() => addContact(push)}
          />
        </div>
      )}
    </FieldArray>
  );
};

export default FormEditContactList;
