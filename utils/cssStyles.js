/** @format */

import { alpha, styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Paper, Typography } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

// ----------------------------------------------------------------------

function getDirection(value = 'bottom') {
  return {
    top: 'to top',
    right: 'to right',
    bottom: 'to bottom',
    left: 'to left',
  }[value];
}

// ----------------------------------------------------------------------

export default function cssStyles(theme) {
  return {
    bgBlur: (props) => {
      const color = props?.color || theme?.palette.background.default || '#000000';
      const mode = theme.palette.mode;

      const blur = props?.blur || 6;
      const opacity = mode === 'dark' ? props?.opacity || 0.3 : props?.opacity || 0.2;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
    bgGradient: (props) => {
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || `${alpha('#000000', 0)} 0%`;
      const endColor = props?.endColor || '#000000 75%';

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      };
    },
    bgImage: (props) => {
      const url = props?.url;
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || alpha(theme?.palette.grey[900] || '#000000', 0.88);
      const endColor = props?.endColor || alpha(theme?.palette.grey[900] || '#000000', 0.88);

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      };
    },
  };
}

// export const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.primary.light}`,
//   margin: '10px 0px',
//   // "&:not(:last-child)": {
//   //   borderBottom: 0,
//   // },
//   '&:before': {
//     display: 'none',
//   },
// }));

// export const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.875rem' }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : theme.palette.primary.lighter,
//   color: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[700],
//   flexDirection: 'row-reverse',
//   minHeight: '40px',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(90deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     margin: '8px',
//     marginLeft: theme.spacing(1),
//   },
// }));

// export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: `1px solid ${theme.palette.primary.light}`,
// }));

export const toggleButtonStyle = {
  backgroundColor: (theme) =>
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  maxWidth: '200px',
  wordBreak: 'break-all',
  width: '100%',
  margin: '0px !important',
  marginRight: '4px !important',
  color: (theme) =>
    theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[700],
  fontSize: '0.875rem',
  fontWeight: '500',
  '&.Mui-selected': {
    background: (theme) => theme.palette.primary.lighter,
    color: (theme) => (theme.palette.mode === 'dark' ? 'black' : theme.palette.grey[700]),
    // marginLeft: '4px !important',
  },
  '&.Mui-selected:hover': {
    background: (theme) => theme.palette.primary.light,
  },
};
export const toggleButtonGroupStyle = {
  flexWrap: 'wrap',
  border: 'unset',
  fontSize: '0.875rem',
  '& .MuiButtonBase-root': { minWidth: '200px' },
  gap: '8px',
  justifyContent: 'center',
  '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    // marginLeft: 'unset',
    margin: '0px',
  },
};

export const toggleButtonStyleChip = {
  // '&.MuiToggleButton-root': {
  //   borderColor: (theme) => `${theme.palette.grey[300]} !important`,
  // },
  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[700] : 'white'),
  maxWidth: '300px',
  minWidth: '60px',
  wordBreak: 'unset',
  width: 'fit-content',

  // margin: '0px !important',
  // marginRight: '4px !important',
  color: (theme) =>
    theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[700],
  fontSize: '0.875rem',
  fontWeight: '500',
};

export function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align='center' variant='subtitle1'>
        Not found
      </Typography>
      <Typography variant='body2' align='center'>
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <Typography variant='body2'> Please enter keywords</Typography>
  );
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  // '&.MuiToggleButtonGroup-root': {
  //   // border: 0,
  // },
  '& .MuiToggleButtonGroup-grouped': {
    minWidth: 75,
    padding: '4px',
    // margin: 0,
    // '&.Mui-disabled': {
    // border: 0,
    // },
    // '&:not(:first-of-type)': {
    //   borderRadius: theme.shape.borderRadius,
    //   borderLeft: 'inherit',
    // },
    // '&:first-of-type': {
    //   borderRadius: theme.shape.borderRadius,
    // },
  },
}));
