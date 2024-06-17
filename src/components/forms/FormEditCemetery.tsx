import { Formik, Form, FormikHelpers } from 'formik';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { saveCemetery } from '@services/api/cemeteries';
import { CemeteryInterface } from '@type//cemeteries';
import AddressFields from '@components/fields/AddressFields';
import useHasErrors from '@utils/useHasErrors';
import { addressFields } from '@constants/addressFields';
import { cemeteryFields } from '@constants/cemeteryFields';
import { defaultCemeteryValues } from '@constants/defaultValues';
import useCemeteryValidation from '@validations/useCemeteryValidation';
import InputTextField from '@components/fields/InputTextField';
import FormError from './FormError';
interface FormEditCemeteryProps {
  closeDialog: () => void;
  submit: (response: CemeteryInterface) => void;
  propValues?: CemeteryInterface | null; // Assuming it's optional and can be null
}

const FormEditCemetery = ({
  closeDialog,
  submit,
  propValues = null,
}: FormEditCemeteryProps) => {
  const { t } = useTranslation();
  // Form validation schema
  const validationSchema = useCemeteryValidation();

  const initialValues = propValues || defaultCemeteryValues;
  const hasErrors = useHasErrors();
  const submitHandler = async (
    values: CemeteryInterface,
    { setSubmitting }: FormikHelpers<CemeteryInterface>
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
        pt={{ title: { className: 'text-base' } }}
        title={renderCardTitle}
        className='w-full max-w-3xl min-w-[580px]'
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors, touched, setTouched, isSubmitting }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                setTouched({}, true);
                handleSubmit(e);
              }}
            >
              <TabView>
                <TabPanel
                  header={t('Cemetery information')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, cemeteryFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <div className='flex flex-col gap-2.5'>
                    <InputTextField name='name' label='Name'></InputTextField>
                    <InputTextField
                      name='description'
                      label='Description'
                    ></InputTextField>
                  </div>
                </TabPanel>
                <TabPanel
                  contentClassName='max-h-96 overflow-auto'
                  header={t('Address')}
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, addressFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <AddressFields
                    prefix='address_attributes'
                    errors={errors}
                    touched={touched}
                  />
                </TabPanel>
              </TabView>

              <div className='px-5'>
                <FormError
                  errors={errors}
                  isSubmitting={isSubmitting}
                ></FormError>
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

export default FormEditCemetery;
