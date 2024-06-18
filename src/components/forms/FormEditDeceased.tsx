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
import useSubmitForm from '@utils/useSubmitForm';
import useFormatDeceased from '@services/formatters/useFormatDeceased';
interface FormEditDeceasedProps {
  closeDialog: () => void;
  submit: (response: DeceasedPersonInterface) => void;
  propValues?: DeceasedPersonInterface | null;
}

const FormEditDeceased: React.FC<FormEditDeceasedProps> = ({
  closeDialog,
  propValues = null,
  submit,
}: FormEditDeceasedProps) => {
  const { t } = useTranslation();
  const cemeteriesOptions = useRecoilValue(cemeteryOptionsSelector);
  const { genderOptions } = useSelectOptions();

  const initialValues = propValues || defaultDeceasedValues;
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
        className='w-full max-w-3xl min-w-[580px]'
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
              <TabView>
                <TabPanel
                  header={t('deceased information')}
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
                  <div className='flex flex-col gap-2.5'>
                    <div className='flex items-start justify-between gap-5'>
                      <InputTextField
                        name='first_name'
                        label='First name'
                      ></InputTextField>
                      <InputTextField
                        name='last_name'
                        label='Last name'
                      ></InputTextField>
                    </div>
                    <div className='flex items-start justify-between gap-5'>
                      <SelectField
                        name='gender'
                        label='Select gender'
                        options={genderOptions}
                      ></SelectField>
                      <HebrewCalendar
                        inputId='hebrewDate'
                        label='Date of Death'
                        name='date_of_death'
                        validationProp='date_of_death'
                        value={getInitialDateValue(values.date_of_death)}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  header={t('cemetery information')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, burialFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <div className='flex flex-col gap-2.5'>
                    <SelectField
                      name='cemetery_id'
                      label='Select cemetery'
                      options={cemeteriesOptions}
                    ></SelectField>

                    <div className='flex flex-wrap items-center gap-5'>
                      <InputTextField
                        name='cemetery_region'
                        label='Cemetery region'
                      ></InputTextField>
                      <InputTextField
                        name='cemetery_parcel'
                        label='Cemetery parcel'
                      ></InputTextField>
                    </div>
                  </div>
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
