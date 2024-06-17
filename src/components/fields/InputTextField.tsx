import React from 'react';
import { Field, FieldProps } from 'formik';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

interface InputTextFieldProps {
  label?: string;
  name: string;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ label, name }) => {
  const { t } = useTranslation();
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps<string>) => (
        <div className='flex-1'>
          {label && (
            <label className='block mb-1 font-semibold' htmlFor={name}>
              {t(label)}
            </label>
          )}
          <InputText
            id={name}
            className={meta.touched && meta.error ? 'p-invalid' : ''}
            {...field}
            onChange={e => {
              console.log('form: ', form);
              console.log('e.target.value: ', e.target.value);
              form.setFieldValue(field.name, e.target.value);
              form.setFieldTouched(field.name, true, false);
            }}
            onBlur={() => form.setFieldTouched(field.name, true, false)}
          />
          {meta.touched && meta.error ? (
            <div className='p-error leading-none'>{meta.error}</div>
          ) : null}
        </div>
      )}
    </Field>
  );
};

export default InputTextField;
