import React from 'react';
import { Formik, Form } from 'formik';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import HebrewCalendar from '@components/HebrewCalendar.tsx';
import { saveDeceased } from '@services/api/deceasedApi';
import { TabView, TabPanel } from 'primereact/tabview';
import { defaultDeceasedValues } from '@constants/defaultValues';
import { useRecoilValue } from 'recoil';
import { cemeteryOptionsSelector } from '@services/state';
import { DeceasedPersonInterface } from '@type/deceasedInterface';
import useHasErrors from '@utils/useHasErrors';
import { burialFields } from '@constants/cemeteryFields';
import { deceasedFields } from '@constants/deceasedFields';
import useDeceasedValidation from '@validations/useDeceasedValidation';
import InputTextField from '@components/fields/InputTextField';
import SelectField from '@components/fields/SelectField';
import useSelectOptions from '@constants/selectOptions';
import FormError from './FormError';
import DialogHeader from '@components/DialogHeader';
import useSubmitForm from '@hooks/useSubmitForm';
import useFormatDeceased from '@services/formatters/useFormatDeceased';
import FormEditContactList from './FormEditContactList';
interface FormEditDeceasedProps {
  closeDialog: () => void;
  submit: (response: DeceasedPersonInterface) => void;
  propValues?: DeceasedPersonInterface | null;
}

const parseInitialValues = (initialValues: DeceasedPersonInterface | null) => {
  const values = initialValues || defaultDeceasedValues;
  const { relations, ...restData } = values;

  const relations_attributes =
    relations?.map(relation => {
      const { contact_person, ...restContact } = relation;
      return {
        ...restContact,
        contact_person_attributes: contact_person,
      };
    }) || [];

  return {
    ...restData,
    relations_attributes,
  };
};

const FormEditDeceased: React.FC<FormEditDeceasedProps> = ({
  closeDialog,
  propValues = null,
  submit,
}: FormEditDeceasedProps) => {
  const { t } = useTranslation();
  const cemeteriesOptions = useRecoilValue(cemeteryOptionsSelector);
  const { genderOptions } = useSelectOptions();

  const initialValues = parseInitialValues(propValues);

  const validationSchema = useDeceasedValidation();

  const submitHandler = useSubmitForm({
    formatData: useFormatDeceased,
    saveFunction: saveDeceased,
    submit,
    callback: closeDialog,
  });

  const getInitialDateValue = (date: string | null) =>
    date ? new Date(date) : null;

  const hasErrors = useHasErrors();

  const dialogTitle =
    `${initialValues.id ? t('edit') : t('add')} ` + t('deceased person');
  return (
    <div className='flex justify-center items-center'>
      <Card
        pt={{ title: { className: 'text-base' } }}
        title={() => (
          <DialogHeader
            title={dialogTitle}
            closeDialog={closeDialog}
          ></DialogHeader>
        )}
        className='w-[96vw] max-w-4xl'
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({
            values,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            setTouched,
          }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                setTouched({}, true);
                handleSubmit(e);
              }}
            >
              {/* <div className='break-words w-full'>{JSON.stringify(values)}</div> */}
              <TabView panelContainerClassName='max-h-[60vh] overflow-auto'>
                <TabPanel
                  header={t('deceased information')}
                  leftIcon='pi pi-user ml-2'
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, deceasedFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  {/* <div className='break-words ltr text-left'>
                    {JSON.stringify(errors)}
                  </div>
                  <div className='break-words ltr text-left'>
                    {JSON.stringify(values)}
                  </div> */}
                  <div className='flex flex-col gap-3.5'>
                    <div className='flex items-start justify-between gap-5'>
                      <InputTextField
                        name='first_name'
                        label='first name'
                      ></InputTextField>
                      <InputTextField
                        name='last_name'
                        label='last name'
                      ></InputTextField>
                    </div>
                    <div className='flex items-start justify-between gap-5'>
                      <div className='flex-1 max-w-48'>
                        <SelectField
                          name='gender'
                          label='select gender'
                          options={genderOptions}
                        ></SelectField>
                      </div>
                      <HebrewCalendar
                        inputId='hebrewDate'
                        label='date of death'
                        name='date_of_death'
                        validationProp='date_of_death'
                        value={getInitialDateValue(values.date_of_death)}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  header={t('cemetery information')}
                  leftIcon='pi pi-map-marker ml-2'
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, burialFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <div className='flex flex-col gap-3.5'>
                    <SelectField
                      name='cemetery_id'
                      label='select cemetery'
                      options={cemeteriesOptions}
                    ></SelectField>

                    <div className='flex flex-wrap items-center gap-5'>
                      <InputTextField
                        name='cemetery_region'
                        label='cemetery region'
                      ></InputTextField>
                      <InputTextField
                        name='cemetery_parcel'
                        label='cemetery parcel'
                      ></InputTextField>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  header={t('contacts')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, [
                        'relations_attributes',
                      ])
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                  leftIcon='pi pi-users ml-2'
                >
                  <FormEditContactList
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </TabPanel>
              </TabView>
              <div className='px-5'>
                <FormError errors={errors} isSubmitting={isSubmitting} />
                <Button
                  type='submit'
                  label={t('save')}
                  className='w-full mt-5'
                  severity='info'
                  loading={isSubmitting}
                  loadingIcon={<i className='pi pi-spin pi-spinner'></i>}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default FormEditDeceased;
