import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, FormLabel, Select } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export default function RHFSelect({
  name,
  children,
  label,
  required,
  formControl,
  disabled,
  size = 'small',
  onInputChange,
  ...other
}) {
  const { control } = useFormContext();
  // const theme = useTheme();
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              size={size}
              value={value || ''}
              fullWidth
              onChange={(v) => {
                onChange(v);
                if (onInputChange) {
                  onInputChange(v);
                }
              }}
              error={!!error}
              disabled={disabled}
              {...other}
              MenuProps={{
                PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, top: 10 } },
              }}
            >
              {children}
            </Select>
            {!!error && (
              <FormHelperText color='red' variant='body2' error>
                {error?.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </>
  );
}
