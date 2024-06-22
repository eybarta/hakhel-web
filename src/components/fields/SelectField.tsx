import React, { useRef } from 'react';
import { Field, FieldProps, FieldHookConfig } from 'formik';
import { useTranslation } from 'react-i18next';
import { Options } from '@type/options';
import { Dropdown } from 'primereact/dropdown';

interface SelectFieldProps {
  label?: string;
  name?: string;
  value?: string | number | undefined;
  options: Options;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  // ...props
}) => {
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
          <Dropdown
            pt={{ root: { className: 'w-full' } }}
            inputId={name}
            options={options}
            dataKey={name}
            {...field}
            placeholder={t(label || 'Select')}
            className={meta.touched && meta.error ? 'p-invalid' : ''}
            onChange={e => {
              form.setFieldValue(field.name, e.value ?? '');
            }}
            onBlur={() => {
              form.setFieldTouched(field.name, true);
            }}
          />

          {meta.touched && meta.error ? (
            <div className='p-error leading-none'>{meta.error}</div>
          ) : null}
        </div>
      )}
    </Field>
  );
};

export default SelectField;
