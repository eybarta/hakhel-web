import { Formik, Form, Field } from 'formik';
import type {
  FieldProps,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { classNames } from 'primereact/utils';
import type { AxiosError } from 'axios';
import { login, type LoginResponse } from '@services/authService';
import { useTranslation } from 'react-i18next';

interface loginInterface {
  email: string;
  password: string;
}
// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const getFormErrorMessage = (
    name: keyof loginInterface,
    touched: FormikTouched<loginInterface>,
    errors: FormikErrors<loginInterface>
  ) => {
    return touched[name] && errors[name] ? (
      <small className='p-error'>{errors[name]}</small>
    ) : (
      <small />
    );
  };

  const getServerErrorMessage = (status?: { server?: string }) =>
    status?.server ? <small className='p-error'>{status.server}</small> : <small />;
  const submitHandler = async (
    data: loginInterface,
    { setSubmitting, setStatus }: FormikHelpers<loginInterface>
  ) => {
    setSubmitting(true);
    // Simulate submitting the data

    try {
      const { email, password } = data;
      const response: LoginResponse = await login(email, password);

      if (response.error) {
        setStatus({ server: 'Failed to login. Please check your credentials.' });
      }
      // Redirect to homepage or dashboard after successful login
      window.location.href = '/';
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const errorMessage =
        axiosError.response?.data?.error ||
        'Failed to login. Please check your credentials.';

      setStatus({ server: errorMessage });
    }
    setSubmitting(false);
  };

  return (
    <div className='flex justify-center items-center h-screen login-page'>
      <Card className='w-96 max-w-xl'>
        <div className='text-center mb-4'>
          <h1 className='text-xl font-semibold'>כניסה למערכת הקהל</h1>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors, touched, isSubmitting, status }) => (
            <Form className='flex flex-col gap-3.5' onSubmit={handleSubmit}>
              <div>
                <Field name='email'>
                  {({ field, form }: FieldProps<string>) => (
                    <IconField iconPosition='right'>
                      <InputIcon className='pi pi-user'> </InputIcon>
                      <InputText
                        {...field}
                        id={field.name}
                        type='email'
                        placeholder={t('email')}
                        className={classNames({
                          'p-invalid': isFieldInvalid(form, field.name),
                        })}
                      />
                    </IconField>
                  )}
                </Field>
                {getFormErrorMessage('email', touched, errors)}
              </div>
              <div>
                <Field name='password'>
                  {({ field }: FieldProps<string>) => (
                    <IconField iconPosition='right'>
                      <InputIcon className='pi pi-lock'> </InputIcon>
                      <InputText
                        {...field}
                        id={field.name}
                        type='password'
                        placeholder={t('password')}
                      />
                    </IconField>
                  )}
                </Field>
                {getFormErrorMessage('password', touched, errors)}
              </div>
              {getServerErrorMessage(status as { server?: string } | undefined)}

              <Button
                type='submit'
                label={t('sign in')}
                className='w-full mt-5'
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

function isFieldInvalid(form: FormikValues, field: string) {
  return Boolean(form.touched?.[field] && form.errors?.[field]);
}

export default LoginForm;
