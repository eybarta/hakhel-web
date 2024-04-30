import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { FloatLabel } from 'primereact/floatlabel';
import HebrewCalendar from '/src/components/HebrewCalendar.tsx';
import { Message } from 'primereact/message';
import { saveDeceasedPerson } from '/src/services/api/deceasedPeople';

import { TabView, TabPanel } from 'primereact/tabview';

// FROM STATE (Recoil)
import { useRecoilValueLoadable } from 'recoil';
import { cemeteriesDataSelector } from '../../services/state/selectors';

const DeceasedForm = ({ closeDialog, propValues = null }) => {
  console.log('closeDialog: ', closeDialog);
  const cemeteriesLoadable = useRecoilValueLoadable(cemeteriesDataSelector);
  const [cemeteriesOptions, updateCemeteriesOptions] = useState([]);
  const [loadingCemeteries, setLoadingCemeteries] = useState(false);
  const [errorLoadingCemeteries, setError] = useState(false);
  useEffect(() => {
    switch (cemeteriesLoadable.state) {
      case 'hasValue':
        setLoadingCemeteries(false);
        updateCemeteriesOptions(cemeteriesLoadable.contents);
        break;
      case 'loading':
        setLoadingCemeteries(true);
        break;
      case 'hasError':
        setError(cemeteriesLoadable.contents.message);
        break;
      default:
        setLoadingCemeteries(false);
    }
  }, [cemeteriesLoadable.state, cemeteriesLoadable.contents]);

  const { t } = useTranslation();
  // const [formValues, setFormValues] = useState();
  const genders = [
    { label: t('Male'), value: t('male') },
    { label: t('Female'), value: t('female') },
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

  const defaultValues = {
    id: null,
    first_name: '',
    last_name: '',
    gender: '',
    father_first_name: '',
    mother_first_name: '',
    hebrew_year_of_death: '',
    hebrew_month_of_death: '',
    hebrew_day_of_death: '',
    cemetery_id: null,
    cemetery_region: '',
    cemetery_parcel: '',
  };

  const initialValues = propValues || defaultValues;

  const parseAndsetHebrewDates = (hebrewDateParts, setFieldValue) => {
    if (hebrewDateParts && setFieldValue) {
      const { d, m, y } = hebrewDateParts;
      setFieldValue('hebrew_year_of_death', y);
      setFieldValue('hebrew_month_of_death', m);
      setFieldValue('hebrew_day_of_death', d);
    }
  };
  const submitHandler = async (values, { setSubmitting }) => {
    console.log('values: ', values);
    setSubmitting(false);
    const data = { deceased_person: values };
    const response = await saveDeceasedPerson(data);
    console.log('SAVE DECEASED response: ', response);
  };
  console.log('initialValues > ', initialValues);

  const renderCardTitle = () => {
    return (
      <div className='flex items-center justify-between'>
        <span>
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

  return (
    <div className='flex justify-center items-center'>
      <Card
        pt={{ title: 'text-base' }}
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
                    <div className='flex items-center justify-between gap-5'>
                      <Field name='first_name'>
                        {({ field }) => (
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
                        {({ field }) => (
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
                    <div className='flex items-center justify-between gap-5'>
                      <Field name='gender'>
                        {({ field, form }) => (
                          <div>
                            <label
                              className='block mb-1 font-semibold'
                              htmlFor='gender'
                            >
                              {t('Select gender')}
                            </label>
                            <Dropdown
                              pt={{ root: 'w-full' }}
                              appendTo={'self'}
                              inputId='gender'
                              {...field}
                              options={genders}
                              placeholder={t('Select gender')}
                              className={classNames({
                                'p-invalid': isFieldInvalid(
                                  field,
                                  form.errors,
                                  form.touched
                                ),
                              })}
                              onChange={e => {
                                console.log(e.value); // for debugging
                                form.setFieldValue(field.name, e.value);
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
                        {({ field, form }) => (
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
                              onChange={hebrewDateParts =>
                                parseAndsetHebrewDates(
                                  hebrewDateParts,
                                  form.setFieldValue
                                )
                              }
                              className={classNames({
                                'p-invalid': isFieldInvalid(
                                  field,
                                  errors,
                                  touched
                                ),
                              })}
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
                      {({ field, form }) => (
                        <div>
                          <label
                            className='block mb-1 font-semibold'
                            htmlFor='cemeteryId'
                          >
                            {t('Select cemetery')}
                          </label>
                          <Dropdown
                            pt={{ root: 'w-full' }}
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
                              console.log(e.value); // for debugging
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
                        {({ field, form }) => (
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
                        {({ field, form }) => (
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
                loading={isSubmitting}
              />

              {/* <Button severity='success' type="submit" label={t('Save')} className="mt-4" loading={isSubmitting} /> */}
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

function isFieldInvalid(field, errors, touched) {
  return touched[field.name] && errors[field.name];
}

export default DeceasedForm;
