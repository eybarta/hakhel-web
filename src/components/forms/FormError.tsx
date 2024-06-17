import React, { useEffect, useState } from 'react';
import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';

interface FormErrorProps {
  errors: FormikErrors<{ [key: string]: any }>;
  isSubmitting: boolean;
}

const FormError: React.FC<FormErrorProps> = ({ errors, isSubmitting }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { t } = useTranslation();

  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    isSubmitting && setHasSubmitted(true);
  }, [isSubmitting]);

  return (
    hasSubmitted &&
    hasErrors && (
      <div className='p-error pt-1.5'>
        {/* {JSON.stringify(errors)} */}
        {t('Please correct the errors in the form')}
      </div>
    )
  );
};

export default FormError;
