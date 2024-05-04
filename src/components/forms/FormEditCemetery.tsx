import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { saveCemetery } from '/src/services/api/cemeteries';
import { CemeteryInterface } from '../../types/cemeteries';
interface FormEditCemeteryProps {
  closeDialog: () => void;
  submit: (response: { cemetery: CemeteryInterface }) => void;
  propValues?: CemeteryInterface | null; // Assuming it's optional and can be null
}

const FormEditCemetery = ({
  closeDialog,
  submit,
  propValues = null,
}: FormEditCemeteryProps) => {
  const { t } = useTranslation();
  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(t('Name is required')),
    description: Yup.string().required(t('Description is required')),
  });

  const defaultValues = {
    id: null,
    name: '',
    description: '',
  };

  const initialValues = propValues || defaultValues;

  const submitHandler = async (
    values: CemeteryInterface,
    { setSubmitting }
  ) => {
    setSubmitting(false);
    const data = { cemetery: values };
    const response = await saveCemetery(data);
    submit(response);
    closeDialog();
  };
  const renderCardTitle = () => {
    return (
      <div className='flex items-center justify-between'>
        <span>
          {`${initialValues.id ? t('Edit') : t('Add')} ` + t('cemetery')}
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
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2.5'>
                <Field name='name'>
                  {({ field }) => (
                    <div className='flex-1'>
                      <label
                        className='block mb-1 font-semibold'
                        htmlFor='name'
                      >
                        {t('Name')}
                      </label>
                      <InputText
                        id='name'
                        {...field}
                        className={classNames({
                          'p-invalid': isFieldInvalid(field, errors, touched),
                        })}
                      />
                      <ErrorMessage
                        name='name'
                        component='div'
                        className='p-error leading-none'
                      />
                    </div>
                  )}
                </Field>
                <Field name='description'>
                  {({ field }) => (
                    <div className='flex-1'>
                      <label
                        className='block mb-1 font-semibold'
                        htmlFor='description'
                      >
                        {t('Description')}
                      </label>

                      <InputText
                        id='description'
                        {...field}
                        className={classNames({
                          'p-invalid': isFieldInvalid(field, errors, touched),
                        })}
                      />
                      <ErrorMessage
                        name='description'
                        component='div'
                        className='p-error leading-none'
                      />
                    </div>
                  )}
                </Field>
              </div>
              <Button
                type='submit'
                label={t('Save')}
                className='w-full mt-5'
                severity='info'
                loading={isSubmitting}
              />
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

export default FormEditCemetery;
