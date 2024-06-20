import { FieldArray, FormikProps, FormikValues } from 'formik';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { RelationToDeceasedClientInterface } from '@type/relationshipsInterface';
import DeceasedFields from '@components/fields/DeceasedFields';
import { defaultRelationToDeceased } from '@constants/defaultValues';
import TabHeader from '@components/TabHeader';
const FormEditDeceasedList = ({ values }: FormikProps<FormikValues>) => {
  const { t } = useTranslation();
  return (
    <FieldArray name='relations_attributes'>
      {({ push, remove, form }) => (
        <div>
          {values.relations_attributes?.length ? (
            <Accordion expandIcon='pi pi-chevron-left'>
              {values.relations_attributes.map(
                (
                  relation: RelationToDeceasedClientInterface,
                  index: number
                ) => {
                  const { deceased_person_attributes: deceased } = relation;
                  const name =
                    `${deceased.first_name} ${deceased.last_name}`.trim();
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
            onClick={() => push(defaultRelationToDeceased)}
          />
        </div>
      )}
    </FieldArray>
  );
};

export default FormEditDeceasedList;
