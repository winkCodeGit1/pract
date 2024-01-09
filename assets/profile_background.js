// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProfileBackground({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;
  // const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1440 320'>
        <path
          fill={PRIMARY_MAIN}
          fillOpacity='1'
          d='M0,0L48,37.3C96,75,192,149,288,165.3C384,181,480,139,576,138.7C672,139,768,181,864,176C960,171,1056,117,1152,133.3C1248,149,1344,235,1392,277.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        ></path>
      </svg>
    </Box>
  );
}
