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
              {/* {field && <div>FIELD: {JSON.stringify(field)}</div>}
              {form && <div>FORM: {JSON.stringify(form)}</div>}
              {meta && <div>META: {JSON.stringify(meta)}</div>} */}
            </label>
          )}
          <InputText
            id={name}
            className={meta.touched && meta.error ? 'p-invalid' : ''}
            {...field}
            value={field.value || ''} // Ensure the value is never null or undefined
            onChange={e => {
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
