import React, { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputRef } from './ui/Input/Input';
import { InputProps } from './ui/Input/Input.types';

interface FormFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur' | 'errorMessage'> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

function FormFieldInner<T extends FieldValues>(
  { control, name, label, ...inputProps }: FormFieldProps<T>,
  ref: React.ForwardedRef<InputRef>
) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          ref={ref}
          label={label}
          value={value == null ? '' : String(value)}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error?.message}
          accessibilityLabel={label}
          {...inputProps}
        />
      )}
    />
  );
}

export const FormField = forwardRef(FormFieldInner) as <T extends FieldValues>(
  props: FormFieldProps<T> & { ref?: React.ForwardedRef<InputRef> }
) => React.ReactElement;
