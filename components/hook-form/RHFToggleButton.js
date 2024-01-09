import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
import { ToggleButtonGroup, FormLabel } from '@mui/material';

RHFToggleButton.propTypes = {
  name: PropTypes.string,
};

export default function RHFToggleButton({
  name,
  label,
  required,
  children,
  formControl,
  // onInputChange,
  disabled,
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
        render={({ field }) => (
          <>
            <ToggleButtonGroup
              {...other}
              disabled={disabled}
              value={field.value}
              onChange={(_, v) => {
                field.onChange(v);
              }}
            >
              {children}
            </ToggleButtonGroup>
          </>
        )}
      />
    </>
  );
}
