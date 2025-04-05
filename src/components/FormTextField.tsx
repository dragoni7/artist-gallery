import { TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export default function FormTextField<T extends Record<string, any>>(
  field: keyof T,
  label: string,
  control: Control<T>,
  errors: FieldErrors<T>,
  rows?: number,
  defaultValue?: string
) {
  return (
    <Controller
      name={field as any}
      control={control}
      render={({ field: renderField }) => (
        <TextField
          {...renderField}
          label={label}
          fullWidth
          margin="normal"
          multiline={rows ? true : false}
          rows={rows ? rows : 1}
          defaultValue={defaultValue ? defaultValue : ''}
          error={!!errors[field as string]}
          helperText={errors[field as string]?.message as string}
          variant="filled"
          size="small"
        />
      )}
    />
  );
}
