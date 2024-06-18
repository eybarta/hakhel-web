import { Formik, Form, FormikHelpers } from 'formik';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { saveCemetery } from '@services/api/cemeteriesApi';
import { CemeteryInterface } from '@type/cemeteriesInterface';
import AddressFields from '@components/fields/AddressFields';
import useHasErrors from '@utils/useHasErrors';
import { addressFields } from '@constants/addressFields';
import { cemeteryFields } from '@constants/cemeteryFields';
import {
  defaultAddressValues,
  defaultCemeteryValues,
} from '@constants/defaultValues';
import useCemeteryValidation from '@validations/useCemeteryValidation';
import InputTextField from '@components/fields/InputTextField';
import FormError from './FormError';
import useSubmitForm from '@utils/useSubmitForm';
import useFormatCemetery from '@services/formatters/useFormatCemetery';
import DialogHeader from '@components/DialogHeader';
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
  const hasErrors = useHasErrors();

  const initialValues = propValues || defaultCemeteryValues;
  const isEdit = !!initialValues.id;

  const { address, ...restData } = initialValues;
  const transformedInitialValues = {
    ...restData,
    address_attributes: address || defaultAddressValues,
  };

  const submitHandler = useSubmitForm({
    formatData: useFormatCemetery,
    saveFunction: saveCemetery,
    submit,
    callback: closeDialog,
  });

  const dialogTitle =
    `${initialValues.id ? t('edit') : t('add')} ` + t('cemetery');
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
          initialValues={transformedInitialValues}
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
                  header={t('cemetery information')}
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
                  header={t('address')}
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

export default FormEditCemetery;
