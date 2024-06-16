import React from 'react';
import { Field, FieldProps, FieldHookConfig } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';

interface InputFieldProps extends InputTextProps {
  label?: string;
}

const InputField: React.FC<InputFieldProps & FieldHookConfig<string>> = ({
  label,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Field name={props.name}>
      {({ field, form, meta }: FieldProps<string>) => (
        <div className='flex-1'>
          {label && (
            <label
              className='block mb-1 font-semibold'
              htmlFor={props.id || props.name}
            >
              {t(label)}
            </label>
          )}
          <InputText
            id={props.id || props.name}
            className={classNames(props.className, {
              'p-invalid': meta.touched && meta.error,
            })}
            value={props.value || ''}
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

export default InputField;
