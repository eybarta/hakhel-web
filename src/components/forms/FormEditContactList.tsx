import { useTranslation } from 'react-i18next';
import { FieldArray, FormikProps, FormikValues } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { RelationToContactClientInterface } from '@type/relationshipsInterface';
import { defaultRelationToContact } from '@constants/defaultValues';
import ContactFields from '@components/fields/ContactFields';
import TabHeader from '@components/TabHeader';

const FormEditContactList = ({ values }: FormikProps<FormikValues>) => {
  const { t } = useTranslation();
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
                      header={() => (
                        <TabHeader
                          relation={relation}
                          name={name}
                          index={index}
                          remove={remove}
                          form={form}
                        />
                      )}
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
            onClick={() => push(defaultRelationToContact)}
          />
        </div>
      )}
    </FieldArray>
  );
};

export default FormEditContactList;
