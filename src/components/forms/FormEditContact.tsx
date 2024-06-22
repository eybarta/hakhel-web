import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { ContactInterface } from '@type/contactsInterface';
import { defaultContactValues } from '@constants/defaultValues';
import useSubmitForm from '@hooks/useSubmitForm';
import { saveContact } from '@services/api/contactsApi';
import useFormatContact from '@services/formatters/useFormatContact';
import ContactFields from '@components/fields/ContactFields';
import useContactValidation from '@validations/useContactValidation';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import DialogHeader from '@components/DialogHeader';
import { Card } from 'primereact/card';
import useHasErrors from '@utils/useHasErrors';
import { contactFields } from '@constants/contactFields';
import { addressFields } from '@constants/addressFields';
import AddressFields from '@components/fields/AddressFields';
import FormError from './FormError';
import FormEditDeceasedList from './FormEditDeceasedList';

interface FormEditContactProps {
  propValues?: ContactInterface | null;
  submit: (response: ContactInterface) => void;
  closeDialog: () => void;
}

const parseInitialValues = (initialValues: ContactInterface | null) => {
  const values = initialValues || defaultContactValues;
  const { relations, ...restData } = values;

  const relations_attributes =
    relations?.map(relation => {
      const { deceased_person, ...restContact } = relation;
      return {
        ...restContact,
        deceased_person_attributes: deceased_person,
      };
    }) || [];

  return {
    ...restData,
    relations_attributes,
  };
};

const FormEditContact: React.FC<FormEditContactProps> = ({
  propValues = null,
  submit,
  closeDialog,
}) => {
  const { t } = useTranslation();
  const submitHandler = useSubmitForm({
    formatData: useFormatContact,
    saveFunction: saveContact,
    submit,
    callback: closeDialog,
  });
  const initialValues = parseInitialValues(propValues);
  const validationSchema = useContactValidation();
  const hasErrors = useHasErrors();

  const dialogTitle = `${initialValues.first_name ? t('edit') : t('add')} ${t(
    'contact person'
  )}`;

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
              <TabView panelContainerClassName='max-h-[60vh] overflow-auto'>
                <TabPanel
                  header={t('contact information')}
                  leftIcon='pi pi-user ml-2'
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, contactFields)
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <ContactFields scope='' />
                </TabPanel>
                <TabPanel
                  contentClassName='max-h-96 overflow-auto'
                  header={t('address')}
                  leftIcon='pi pi-map-marker ml-2'
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
                <TabPanel
                  header={t('related deceased')}
                  leftIcon='pi pi-users ml-2'
                  pt={{
                    headerAction: {
                      className: hasErrors(errors, touched, [
                        'relations_attributes',
                      ])
                        ? 'text-red-500'
                        : '',
                    },
                  }}
                >
                  <FormEditDeceasedList
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

export default FormEditContact;
