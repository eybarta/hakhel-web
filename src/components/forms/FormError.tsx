import React from 'react';
import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';

interface FormErrorProps {
  errors: FormikErrors<{ [key: string]: any }>;
  submitCount: number;
}

const FormError: React.FC<FormErrorProps> = ({ errors, submitCount }) => {
  const { t } = useTranslation();

  const hasErrors = Object.keys(errors).length > 0;
  const hasSubmitted = submitCount > 0;

  return (
    hasSubmitted &&
    hasErrors && (
      <div className='p-error pt-1.5'>
        {/* {JSON.stringify(errors)} */}
        {t('please correct the errors in the form')}
      </div>
    )
  );
};

export default FormError;
