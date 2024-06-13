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
import * as Yup from 'yup';
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

// FROM STATE (Recoil)
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cemeteriesAtom, cemeteriesDataSelector } from '@services/state';
import { DeceasedPersonInterface } from '@type/deceased';
import { HebrewDateParts } from '@type/hebrewCalendarTypes';

interface FormEditDeceasedProps {
  closeDialog: () => void;
  submit: (response: DeceasedPersonInterface) => void;
  propValues?: DeceasedPersonInterface | null; // Assuming it's optional and can be null
}

const FormEditDeceased: React.FC<FormEditDeceasedProps> = ({
  closeDialog,
  propValues = null,
  submit,
}: FormEditDeceasedProps) => {
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const [cemeteriesOptions, setCemeteries] = useRecoilState(cemeteriesAtom);
  useEffect(() => {
    if (cemeteriesLoadable.state === 'hasValue') {
      setCemeteries(cemeteriesLoadable.contents);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents, setCemeteries]);
  const { t } = useTranslation();
  const genders = [
    { label: t('Male'), value: 'male' },
    { label: t('Female'), value: 'female' },
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string().required(t('First name is required')),
    last_name: Yup.string().required(t('Last name is required')),
    gender: Yup.string().required(t('Gender is required')),
    cemetery_id: Yup.string().required(t('Cemetery is required')),
    hebrew_year_of_death: Yup.string().required(
      t('Hebrew date of death is required')
    ),
    hebrew_month_of_death: Yup.string().required(
      t('Hebrew date of death is required')
    ),
    hebrew_day_of_death: Yup.string().required(
      t('Hebrew date of death is required')
    ),
  });

  const initialValues = propValues || defaultDeceasedValues;

  const parseAndsetHebrewDates = (
    hebrewDateParts: HebrewDateParts,
    setFieldValue: FormikHelpers<any>['setFieldValue']
  ) => {
    if (hebrewDateParts && setFieldValue) {
      const { d, m, y } = hebrewDateParts;
      setFieldValue('hebrew_year_of_death', y);
      setFieldValue('hebrew_month_of_death', m);
      setFieldValue('hebrew_day_of_death', d);
    }
  };

  const submitHandler = async (
    values: DeceasedPersonInterface,
    { setSubmitting }: { setSubmitting: FormikHelpers<any>['setSubmitting'] }
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
    console.log('touched: ', touched);
    console.log('errors: ', errors);
    return !!touched[field.name] && !!errors[field.name];
  }

  type FieldPropsInterface = {
    field: FieldInputProps<string>;
    form: FormikProps<{ [key: string]: string }>;
  };
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
          {({ values, handleSubmit, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <TabView>
                <TabPanel header={t('Deceased information')}>
                  <div className='flex flex-col gap-2.5'>
                    <div className='flex items-start justify-between gap-5'>
                      <Field name='first_name'>
                        {({ field }: FieldPropsInterface) => (
                          <div className='flex-1'>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='firstName'
                            >
                              {t('First name')}
                            </label>
                            <InputText
                              id='firstName'
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
                              name='first_name'
                              component='div'
                              className='p-error leading-none'
                            />
                          </div>
                        )}
                      </Field>
                      <Field name='last_name'>
                        {({ field }: FieldPropsInterface) => (
                          <div className='flex-1'>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='lastName'
                            >
                              {t('Last name')}
                            </label>

                            <InputText
                              id='lastName'
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
                              name='last_name'
                              component='div'
                              className='p-error leading-none'
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className='flex items-start justify-between gap-5'>
                      <Field name='gender'>
                        {({ field, form }: FieldPropsInterface) => (
                          <div>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='gender'
                            >
                              {t('Select gender')}
                            </label>
                            <Dropdown
                              pt={{ root: { className: 'w-full' } }}
                              appendTo={'self'}
                              inputId='gender'
                              {...field}
                              options={genders}
                              placeholder={t('Select gender')}
                              className={classNames({
                                'p-invalid': isFieldInvalid(
                                  field,
                                  form?.errors || {},
                                  form?.touched || {}
                                ),
                              })}
                              onChange={e => {
                                // for debugging
                                if (form) {
                                  form.setFieldValue(field.name, e.value);
                                }
                              }}
                            />

                            <ErrorMessage
                              name='gender'
                              component='div'
                              className='p-error leading-none'
                            />
                          </div>
                        )}
                      </Field>
                      <Field className='flex-1' name='hebrew_date_of_death'>
                        {({ field, form }: FieldPropsInterface) => (
                          <div className='w-full'>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='hebrewDate'
                            >
                              {t('Date of Death')}
                            </label>
                            <HebrewCalendar
                              inputId='hebrewDate'
                              {...field}
                              value={getInitialDateValue(values.date_of_death)}
                              onChange={hebrewDateParts =>
                                parseAndsetHebrewDates(
                                  hebrewDateParts,
                                  form.setFieldValue
                                )
                              }
                            />
                            <ErrorMessage
                              name='hebrew_year_of_death'
                              component='div'
                              className='p-error'
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header={t('Cemetery information')}>
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
                            onChange={e => {
                              // for debugging
                              form.setFieldValue(field.name, e.value);
                            }}
                          />
                          <ErrorMessage
                            name='cemetery'
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

              <Button
                type='submit'
                label={t('Save')}
                className='w-full mt-5'
                severity='info'
                loading={isSubmitting}
                loadingIcon={<i className='pi pi-spin pi-spinner'></i>}
              />

              {/* <Button severity='success' type="submit" label={t('Save')} className="mt-4" loading={isSubmitting} /> */}
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default FormEditDeceased;
