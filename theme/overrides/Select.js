//
import { InputSelectIcon } from './CustomIcons';
import RedBlur from 'assets/Images/red-blur.png';
import Blue from 'assets/Images/cyan-blur.png';
// ----------------------------------------------------------------------

export default function Select(theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
      MuiPaper: {
        root: {
          MuiPopover: {
            paper: {
              MuiMenu: {
                paper: {
                  outline: '0px',
                  backdropFilter: 'blur(20px)',
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(33, 43, 54, 0.9)',
                  backgroundImage: `url(${Blue}), url(${RedBlur})`,
                  backgroundRepeat: ' no-repeat, no-repeat',
                  backgroundPosition: 'right top, left bottom',
                  backgroundSize: '50%, 50%',
                  padding: '2px',
                  boxShadow:
                    'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
                  borderRadius: ' 10px',
                  maxHeight: 'calc(100% - 96px)',
                },
              },
            },
          },
        },
      },
    },
  };
}
