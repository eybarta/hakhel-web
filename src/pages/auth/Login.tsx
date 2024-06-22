import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { classNames } from 'primereact/utils';
import { login } from '/src/services/authService.ts';
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
  const { t, i18n } = useTranslation();
  const getFormErrorMessage = (name, touched, errors) => {
    return (name === 'server' || touched[name]) && errors[name] ? (
      <small className='p-error'>{errors[name]}</small>
    ) : (
      <small />
    );
  };
  const submitHandler = async (
    data: loginInterface,
    { setSubmitting, setErrors }
  ) => {
    setSubmitting(true);
    // Simulate submitting the data

    try {
      const { email, password } = data;
      const response = await login(email, password);

      if (response.error) {
        setErrors({
          server: 'Failed to login. Please check your credentials.',
        });
      }
      // Redirect to homepage or dashboard after successful login
      window.location.href = '/';
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        'Failed to login. Please check your credentials.';

      setErrors({ server: errorMessage });
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
          {({
            handleSubmit,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className='flex flex-col gap-3.5' onSubmit={handleSubmit}>
              <div>
                <Field name='email'>
                  {({ field, form }) => (
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
                  {({ field, form }) => (
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
              {getFormErrorMessage('server', touched, errors)}

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

function isFieldInvalid(form, field) {
  return form.touched[field] && form.errors[field];
}

export default LoginForm;
