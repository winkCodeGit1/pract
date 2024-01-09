/* eslint-disable no-unused-vars */
/** @format */

// ----------------------------------------------------------------------

import { alpha } from '@mui/material';
import { pxToRem } from 'utils/getFontValue';

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          fontSize: pxToRem(14),
          lineHeight: 1.5,
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
            // fontSize: '0.775rem',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        notched: false,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              boxShadow: ownerState.error
                ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`
                : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
              borderWidth: 1,
            },
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        }),
      },
    },
  };
}
