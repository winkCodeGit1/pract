/** @format */

import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormLabel, TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({
  name,
  label,
  required,
  onInputChange,
  formControl,
  toUpperCase,
  disabled,
  login,
  size = 'small',
  ...other
}) {
  const { control } = useFormContext();

  return (
    <>
      {label && (
        <FormLabel sx={{ fontWeight: login ? 600 : 400, lineHeight: login ? '0.5rem' : 'inherit' }} disabled={disabled} required={required}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={formControl || control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            size={size}
            value={field.value || ''}
            onChange={(e) => {
              if (toUpperCase) {
                field.onChange(e.target.value?.toUpperCase());
              } else {
                field.onChange(e.target.value);
              }

              if (onInputChange) {
                onInputChange(e);
              }
            }}
            disabled={disabled}
            fullWidth
            {...other}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </>
  );
}
