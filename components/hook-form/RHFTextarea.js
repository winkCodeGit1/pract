// import * as React from 'react';
import { FormLabel, TextareaAutosize, alpha, styled } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width:100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 0;
  background:transparent;
  border: 1px solid ${
    theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
  };
color:${theme.palette.mode === 'light' ? 'black' : 'white'};
&:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function RHFTextarea({ name, label, required, formControl, disabled, ...other }) {
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
          <StyledTextarea
            disabled={disabled}
            aria-label='minimum height'
            onChange={field.onChange}
            value={field.value}
            placeholder=''
            maxRows={4}
            onResize={() => console.log('resize')}
            // error={error}
            {...other}
          />
        )}
      />
    </>
  );
}
