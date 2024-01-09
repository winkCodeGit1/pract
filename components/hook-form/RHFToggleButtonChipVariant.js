import { FormLabel, Paper } from '@mui/material';
import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
import { StyledToggleButtonGroup } from 'utils/cssStyles';

RHFToggleButtonChipVariant.propTypes = {
  name: PropTypes.string,
};

export default function RHFToggleButtonChipVariant({
  name,
  label,
  required,
  children,
  formControl,
  minimumOne,
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

      <Paper
        elevation={1}
        sx={{
          // border: (theme) => `1px solid ${theme.palette.divider}`,
          width: 'max-content',
          // padding: '4px',
          // borderRadius: '4px',
        }}
      >
        <Controller
          name={name}
          control={formControl || control}
          render={({ field }) => (
            <StyledToggleButtonGroup
              {...other}
              disabled={disabled}
              value={field.value}
              onChange={(_, v) => {
                if (minimumOne) {
                  if (v !== null) {
                    field.onChange(v);
                  }
                } else {
                  field.onChange(v);
                }
              }}
            >
              {children}
            </StyledToggleButtonGroup>
          )}
        />
      </Paper>
    </>
  );
}
