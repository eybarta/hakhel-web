// FormEditContactList.tsx
import React from 'react';
import { FieldArray } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FormEditContact from './FormEditContact';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const FormEditContactList = ({ values, errors, touched }) => {
  const { t } = useTranslation();
  return (
    <FieldArray name='relations_attributes'>
      {({ push, remove }) => (
        <div>
          <Accordion>
            {values.relations_attributes.map((_, index) => (
              <AccordionTab
                key={index}
                header={`${t('contact person')} ${index + 1}`}
              >
                <FormEditContact
                  scope={`relations_attributes.${index}.contact_person_attributes.`}
                  removeContact={() => remove(index)}
                />
              </AccordionTab>
            ))}
          </Accordion>
          <Button
            label={t('add contact person')}
            icon='pi pi-plus'
            severity='secondary'
            className='mt-2'
            size='small'
            onClick={() =>
              push({
                relation_of_deceased_to_contact: '',
                contact_person_attributes: {
                  first_name: '',
                  last_name: '',
                  email: '',
                  phone: '',
                  gender: '',
                },
              })
            }
          />
        </div>
      )}
    </FieldArray>
  );
};

export default FormEditContactList;
