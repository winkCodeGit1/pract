// ----------------------------------------------------------------------

export default function ControlLabel(theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(0),
          marginLeft: theme.spacing(0),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontSize: theme.typography.body2.fontSize,
        },
        asterisk: {
          color: theme.palette.error.main,
        },
      },
    },
  };
}
