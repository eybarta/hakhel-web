import React from 'react';
import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';

interface FormErrorProps {
  errors: FormikErrors<{ [key: string]: any }>;
}

const FormError: React.FC<FormErrorProps> = ({ errors }) => {
  const { t } = useTranslation();
  return (
    Object.keys(errors).length > 0 && (
      <div className='p-error pt-1.5'>
        {t('Please correct the errors in the form')}
      </div>
    )
  );
};

export default FormError;
