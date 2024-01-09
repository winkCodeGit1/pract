// ----------------------------------------------------------------------

export default function Accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            boxShadow: theme.shadows[2],
            borderRadius: theme.shape.borderRadius,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          backgroundColor: theme.palette.divider,
          '&.Mui-expanded': {
            minHeight: 49,
          },
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
