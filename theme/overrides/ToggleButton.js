import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ToggleButton(theme) {
  const style = (color) => ({
    props: { color },
    style: {
      '&:hover': {
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
      },
      '&.Mui-selected': {
        borderColor: theme.palette[color].dark + '!important',
      },
    },
  });

  return {
    MuiToggleButton: {
      variants: [
        {
          props: { color: 'standard' },
          style: {
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
          },
        },
        style('primary'),
        style('secondary'),
        style('info'),
        style('success'),
        style('warning'),
        style('error'),
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${theme.palette.grey[500_12]}`,
          '& .MuiToggleButton-root': {
            margin: 2,
          },
        },
      },
    },
  };
}
