import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { MessageInterface } from '@type/messagesInterface';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import DialogHeader from '@components/DialogHeader';
import InputTextField from '@components/fields/InputTextField';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import FormError from './FormError';

interface FormEditMessageProps {
  propValues: MessageInterface | null;
  closeDialog: () => void;
  submit: (data: MessageInterface) => void;
}

const defaultValues: Partial<MessageInterface> = {
  full_message: '',
  delivery_method: 'sms',
  phone: '',
  email: null,
  send_date: '',
  messageable_type: 'Hke::Relation',
  message_type: null,
  metadata: null,
};

const deliveryMethodOptions = [
  { label: 'SMS', value: 'sms' },
  { label: 'Email', value: 'email' },
];

const FormEditMessage: React.FC<FormEditMessageProps> = ({
  propValues,
  closeDialog,
  submit,
}) => {
  const { t } = useTranslation();
  const initialValues = propValues || defaultValues;

  const dialogTitle = `${propValues ? t('edit') : t('add')} ${t('message')}`;

  return (
    <div className='flex justify-center items-center'>
      <Card
        pt={{ title: { className: 'text-base' } }}
        title={() => (
          <DialogHeader title={dialogTitle} closeDialog={closeDialog} />
        )}
        className='w-[96vw] max-w-4xl'
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await submit(values as MessageInterface);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleSubmit, errors, touched, isSubmitting, setFieldValue }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className='flex flex-col gap-4 p-4'>
                <div className='field'>
                  <label htmlFor='delivery_method' className='block mb-2'>
                    {t('delivery method')}
                  </label>
                  <Dropdown
                    id='delivery_method'
                    value={values.delivery_method}
                    onChange={(e) => setFieldValue('delivery_method', e.value)}
                    options={deliveryMethodOptions}
                    className='w-full'
                  />
                </div>

                {values.delivery_method === 'sms' && (
                  <InputTextField
                    name='phone'
                    label='phone'
                  />
                )}

                {values.delivery_method === 'email' && (
                  <InputTextField
                    name='email'
                    label='email'
                  />
                )}

                <InputTextField
                  name='full_message'
                  label='message'
                />

                <div className='field'>
                  <label htmlFor='send_date' className='block mb-2'>
                    {t('send date')}
                  </label>
                  <Calendar
                    id='send_date'
                    value={values.send_date ? new Date(values.send_date) : null}
                    onChange={(e) => setFieldValue('send_date', e.value?.toISOString())}
                    showTime
                    hourFormat='24'
                    className={errors.send_date && touched.send_date ? 'p-invalid w-full' : 'w-full'}
                  />
                  {errors.send_date && touched.send_date && (
                    <small className='p-error'>{errors.send_date}</small>
                  )}
                </div>

                <div className='flex justify-end gap-2 mt-4'>
                  <Button
                    type='button'
                    label={t('cancel')}
                    severity='secondary'
                    onClick={closeDialog}
                  />
                  <Button
                    type='submit'
                    label={t('save')}
                    loading={isSubmitting}
                    loadingIcon={<i className='pi pi-spin pi-spinner'></i>}
                  />
                </div>
              </div>
              <FormError errors={errors} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default FormEditMessage; 