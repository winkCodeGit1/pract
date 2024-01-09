import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, FormLabel, TextField } from '@mui/material';

export default function RHFAutoComplete({
  name,
  label,
  required,
  options,
  onInputChange,
  formControl,
  disabled,
  multiple,
  size = 'small',
  placeholder = 'Select an option',
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
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <Autocomplete
              multiple={multiple}
              size={size}
              options={options || []}
              value={value || (multiple ? [] : null)}
              filterSelectedOptions
              onChange={(_, d) => {
                onChange(d);
                if (onInputChange) {
                  onInputChange(d);
                }
              }}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              disabled={disabled}
              getOptionLabel={(option) => option.label || ''}
              {...other}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={error?.message}
                  error={!!error}
                  placeholder={placeholder}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  variant={variant || 'outlined'}
                />
              )}
            />
          );
        }}
      />
    </>
  );
}
