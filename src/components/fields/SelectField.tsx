import React from 'react';
import { Field, FieldProps, FieldHookConfig } from 'formik';
import { InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { Options } from '@type/options';
import { Dropdown } from 'primereact/dropdown';

interface SelectFieldProps extends InputTextProps {
  label?: string;
  options: Options;
}

const SelectField: React.FC<SelectFieldProps & FieldHookConfig<string>> = ({
  label,
  options,
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
          <Dropdown
            pt={{ root: { className: 'w-full' } }}
            appendTo={'self'}
            inputId='gender'
            {...field}
            options={options}
            placeholder={t('Select gender')}
            className={classNames(props.className, {
              'p-invalid': meta.touched && meta.error,
            })}
            onChange={e => {
              form.setFieldValue(field.name, e.value);
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
