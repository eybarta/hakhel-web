import React from 'react';
import { FormikProps } from 'formik';
import InputTextField from './InputTextField';
import { AddressInterface } from '@type/addressInterface';
// import { defaultAddressValues } from '@constants/defaultValues';

interface AddressFieldsProps {
  prefix: string; // Use prefix to handle nested object keys
  errors: FormikProps<any>['errors'];
  value?: AddressInterface;
  touched: FormikProps<any>['touched'];
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  prefix,
  // value = defaultAddressValues,
}) => {
  // const { line1, line2, city, country, postal_code } = value;
  return (
    <div className='flex flex-col gap-2.5'>
      <InputTextField name={`${prefix}.line1`} label='Line 1'></InputTextField>
      <InputTextField name={`${prefix}.line2`} label='Line 2'></InputTextField>
      <InputTextField name={`${prefix}.city`} label='City'></InputTextField>
      <InputTextField
        name={`${prefix}.country`}
        label='Country'
      ></InputTextField>
      <InputTextField
        name={`${prefix}.postal_code`}
        label='Postal code'
      ></InputTextField>
    </div>
  );
};

export default AddressFields;
