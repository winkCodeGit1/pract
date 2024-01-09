import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFDatePicker({
  name,
  label,
  required,
  onInputChange,
  formControl,
  disabled,
  size = 'small',
  variant,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <>
      {label && (
        <FormLabel disabled={disabled} required={required}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={formControl || control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            value={field.value || null}
            disabled={disabled}
            onChange={(newValue) => {
              field.onChange(newValue);
              if (onInputChange) {
                onInputChange(newValue);
              }
            }}
            {...other}
            slotProps={{
              textField: {
                variant: variant || 'outlined',
                size,
                helperText: error?.message,
                error: !!error,
                fullWidth: true,
              },
            }}

            // viewRenderers={}
            // renderInput={(params) => (
            //   <TextField size={size} {...params} error={!!error} helperText={error?.message} fullWidth />
            // )}
          />
        )}
      />
    </>
  );
}
// ----------------------------------------------------------------------

export function RHFTimePicker({
  name,
  label,
  required,
  onInputChange,
  formControl,
  disabled,
  timeFormat,
  size = 'small',
  ampm,
  ...other
}) {
  const { control } = useFormContext();
  const defaultTimeFormat = 'HH:mm';

  return (
    <>
      {label && (
        <FormLabel disabled={disabled} required={required}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={formControl || control}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            sx={{ width: 1 }}
            value={field.value}
            disabled={disabled}
            onChange={(newValue) => {
              field.onChange(newValue);
              if (onInputChange) {
                onInputChange(newValue);
              }
            }}
            format={timeFormat || defaultTimeFormat}
            ampm={ampm || false}
            {...other}
            slotProps={{
              textField: { variant: 'outlined', size, helperText: error?.message, error: !!error },
            }}
          />
        )}
      />
    </>
  );
}

export function RHFDateTimePicker({
  name,
  label,
  required,
  onInputChange,
  formControl,
  disabled,
  size = 'small',
  ...other
}) {
  const { control } = useFormContext();

  return (
    <>
      {label && (
        <FormLabel disabled={disabled} required={required}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={formControl || control}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            sx={{ width: 1 }}
            value={field.value}
            disabled={disabled}
            onChange={(newValue) => {
              field.onChange(newValue);
              if (onInputChange) {
                onInputChange(newValue);
              }
            }}
            {...other}
            slotProps={{
              textField: { variant: 'outlined', size, helperText: error?.message, error: !!error },
            }}
          />
        )}
      />
    </>
  );
}
