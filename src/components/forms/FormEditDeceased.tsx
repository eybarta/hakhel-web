import React, { useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikHelpers,
} from 'formik';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import HebrewCalendar from '@components/HebrewCalendar.tsx';
import { saveDeceasedPerson } from '@services/api/deceasedPeople';
import { TabView, TabPanel } from 'primereact/tabview';
import { defaultDeceasedValues } from '@constants/defaultValues';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cemeteriesAtom, cemeteriesDataSelector } from '@services/state';
import { DeceasedPersonInterface } from '@type/deceased';
import AddressFields from '@components/fields/AddressFields.tsx';
import useHasErrors from '@utils/useHasErrors';
import { addressFields } from '@constants/addressFields';
import { burialFields } from '@constants/cemeteryFields';
import { deceasedFields } from '@constants/deceasedFields';
import useDeceasedValidation from '@validations/useDeceasedValidation';
import InputField from '@components/fields/InputField';
import SelectField from '@components/fields/SelectField';
import useSelectOptions from '@constants/selectOptions';
import FormError from './FormError';
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
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const [cemeteriesOptions, setCemeteries] = useRecoilState(cemeteriesAtom);
  const { t } = useTranslation();
  const { genderOptions } = useSelectOptions();

  const initialValues = propValues || defaultDeceasedValues;
  const validationSchema = useDeceasedValidation();
  useEffect(() => {
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents, setCemeteries]);

  const submitHandler = async (
    values: DeceasedPersonInterface,
    {
      setSubmitting,
    }: {
      setSubmitting: FormikHelpers<any>['setSubmitting'];
    }
  ) => {
    const data = { deceased_person: values };
    const response: DeceasedPersonInterface = await saveDeceasedPerson(data);
    setSubmitting(false);
    submit(response);
    closeDialog();
  };

  const renderCardTitle = () => {
    return (
      <div className='flex items-center justify-between'>
        <span className='text-xl'>
          {`${initialValues.id ? t('Edit') : t('Add')} ` + t('deceased person')}
        </span>
        <Button
          icon='pi pi-times'
          rounded
          text
          severity='secondary'
          aria-label='Cancel'
          onClick={closeDialog}
        />
      </div>
    );
  };

  const getInitialDateValue = (date: string | null) =>
    date ? new Date(date) : null;

  function isFieldInvalid(
    field: FieldInputProps<string>,
    errors: FormikErrors<{ [key: string]: string }>,
    touched: FormikTouched<{ [key: string]: boolean }>
  ): boolean {
    return !!touched[field.name] && !!errors[field.name];
  }

  type FieldPropsInterface = {
    field: FieldInputProps<string>;
    form: FormikProps<{ [key: string]: string }>;
  };

  const hasErrors = useHasErrors();
  return (
    <div className='flex justify-center items-center'>
      <Card
        pt={{ title: { className: 'text-base' } }}
        title={renderCardTitle}
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
                  header={t('Deceased information')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, deceasedFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <div className='flex flex-col gap-2.5'>
                    <div className='flex items-start justify-between gap-5'>
                      <InputField
                        name='first_name'
                        label='First name'
                      ></InputField>
                      <InputField
                        name='last_name'
                        label='Last name'
                      ></InputField>
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
                  header={t('Cemetery information')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, burialFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <div className='flex flex-col gap-2.5'>
                    <Field name='cemetery_id'>
                      {({ field, form }: FieldPropsInterface) => (
                        <div>
                          <label
                            className='block mb-1 font-semibold'
                            htmlFor='cemeteryId'
                          >
                            {t('Select cemetery')}
                          </label>
                          <Dropdown
                            pt={{ root: { className: 'w-full' } }}
                            appendTo={'self'}
                            inputId='cemeteryId'
                            {...field}
                            options={cemeteriesOptions}
                            className={classNames({
                              'p-invalid': isFieldInvalid(
                                field,
                                form.errors,
                                form.touched
                              ),
                            })}
                            optionLabel='name'
                            optionValue='id'
                            onChange={e =>
                              form.setFieldValue(field.name, e.value)
                            }
                          />
                          <ErrorMessage
                            name='cemetery_id'
                            component='div'
                            className='p-error leading-none'
                          />
                        </div>
                      )}
                    </Field>
                    <div className='flex flex-wrap items-center gap-5'>
                      <Field name='cemetery_region'>
                        {({ field }: FieldPropsInterface) => (
                          <div className='flex-1'>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='cemeteryRegion'
                            >
                              {t('Cemetery region')}
                            </label>
                            <InputText
                              id='cemeteryRegion'
                              {...field}
                              className={classNames({
                                'p-invalid': isFieldInvalid(
                                  field,
                                  errors,
                                  touched
                                ),
                              })}
                            />
                            <ErrorMessage
                              name='cemetery_region'
                              component='div'
                              className='p-error leading-none'
                            />
                          </div>
                        )}
                      </Field>
                      <Field name='cemetery_parcel'>
                        {({ field }: FieldPropsInterface) => (
                          <div className='flex-1'>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='cemeteryParcel'
                            >
                              {t('Cemetery parcel')}
                            </label>
                            <InputText
                              id='cemeteryParcel'
                              {...field}
                              className={classNames({
                                'p-invalid': isFieldInvalid(
                                  field,
                                  errors,
                                  touched
                                ),
                              })}
                            />
                            <ErrorMessage
                              name='cemetery_parcel'
                              component='div'
                              className='p-error leading-none'
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
              <div className='px-5'>
                <FormError errors={errors}></FormError>
                <Button
                  type='submit'
                  label={t('Save')}
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
