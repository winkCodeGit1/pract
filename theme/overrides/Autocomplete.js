// ----------------------------------------------------------------------
import RedBlur from 'assets/Images/red-blur.png';
import Blue from 'assets/Images/cyan-blur.png';
import { AutoCompleteSelect } from './CustomIcons';
import { pxToRem } from 'utils/getFontValue';

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: AutoCompleteSelect(),
      },
      styleOverrides: {
        paper: {
          outline: '0px',
          backdropFilter: 'blur(20px)',
          backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(33, 43, 54, 0.9)',
          backgroundImage: `url(${Blue}), url(${RedBlur})`,
          backgroundRepeat: ' no-repeat, no-repeat',
          backgroundPosition: 'right top, left bottom',
          backgroundSize: '50%, 50%',
          // borderRadius:" 10px",
          maxHeight: 'calc(100% - 96px)',
          boxShadow: theme.customShadows.dropdown,
        },
        listbox: {
          padding: theme.spacing(0, 1),
          '& .MuiAutocomplete-option': {
            // padding: theme.spacing(1),
            margin: theme.spacing(0),
            fontSize: pxToRem(14),
            // borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
