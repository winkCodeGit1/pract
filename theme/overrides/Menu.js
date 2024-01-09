import RedBlur from 'assets/Images/red-blur.png';
import Blue from 'assets/Images/cyan-blur.png';
// ----------------------------------------------------------------------

export default function Menu(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:first-of-type': {
            fontStyle: 'italic',
            color: theme.palette.text.secondary,
          },
          marginInline: '4px',
          borderRadius: '4px',
          fontSize: theme.typography.body2.fontSize,
          color: theme.palette.text.primary,
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          outline: '0px',
          backdropFilter: 'blur(20px)',
          backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(33, 43, 54, 0.9)',
          backgroundImage: `url(${Blue}), url(${RedBlur})`,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'right top, left bottom',
          backgroundSize: '50%, 50%',
          padding: '2px',
          boxShadow:
            'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
          borderRadius: '10px',
          maxHeight: 'calc(100% - 96px)',
        },
      },
    },
  };
}
