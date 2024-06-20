import React from 'react';
import { FieldArray, FormikProps, FormikValues } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { RelationToContactClientInterface } from '@type/relationshipsInterface';
import { useConfirm } from '@components/context/ConfirmContext';
import ContactFields from '@components/fields/ContactFields';
import { defaultRelationToContact } from '@constants/defaultValues';

interface RemoveContactProps {
  relation: RelationToContactClientInterface;
  index: number;
  remove: (index: number) => void | undefined;
  form: FormikProps<FormikValues>;
}

interface RemoveContactEventProps extends RemoveContactProps {
  event: React.MouseEvent<HTMLButtonElement>;
}

interface TabHeaderProps extends RemoveContactProps {
  name: string;
}

const FormEditContactList = ({ values }: FormikProps<FormikValues>) => {
  const { t } = useTranslation();
  console.log('values > ', values);
  const { confirmPopup } = useConfirm();

  const confirmRemove = async ({
    index,
    relation,
    remove,
    form,
  }: RemoveContactProps) => {
    if (relation.id) {
      form.setFieldValue(`relations_attributes.${index}._destroy`, 1);
    } else {
      remove(index);
    }
  };
  const removeContact = ({
    event,
    index,
    relation,
    remove,
    form,
  }: RemoveContactEventProps) => {
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
  const tabHeaderTemplate = ({
    relation,
    name,
    index,
    remove,
    form,
  }: TabHeaderProps) => {
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
                ? removeContact({ event, relation, index, remove, form })
                : remove(index);
            }}
          />
        )}
      </div>
    );
  };

  const addContact = (push: <X = any>(obj: X) => void) => {
    push(defaultRelationToContact);
  };
  return (
    <FieldArray name='relations_attributes'>
      {({ push, remove, form }) => (
        <div>
          {values.relations_attributes?.length ? (
            <Accordion expandIcon='pi pi-chevron-left'>
              {values.relations_attributes.map(
                (relation: RelationToContactClientInterface, index: number) => {
                  const { contact_person_attributes: contact } = relation;
                  const name =
                    `${contact.first_name} ${contact.last_name}`.trim();
                  return (
                    <AccordionTab
                      key={index}
                      header={() =>
                        tabHeaderTemplate({
                          relation,
                          name,
                          index,
                          remove,
                          form,
                        })
                      }
                      disabled={!!relation._destroy}
                    >
                      <ContactFields
                        scope={`relations_attributes.${index}.contact_person_attributes.`}
                        relationScope={`relations_attributes.${index}.`}
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
