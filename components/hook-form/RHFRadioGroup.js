import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { RadioGroup, FormHelperText, FormLabel, FormControlLabel, Radio } from '@mui/material';

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  getOptionLabel: PropTypes.arrayOf(PropTypes.string),
};

export default function RHFRadioGroup({
  name,
  label,
  options,
  required,
  getOptionLabel,
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
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <RadioGroup {...field} row {...other}>
              {!!options.length &&
                options.map((option, index) => (
                  <FormControlLabel
                    disabled={disabled}
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={getOptionLabel?.length ? getOptionLabel[index] : option}
                  />
                ))}
            </RadioGroup>
            {!!error && (
              <FormHelperText error sx={{ px: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        )}
      />
    </>
  );
}
