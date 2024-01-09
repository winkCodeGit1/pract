// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function EditIcon({ width = 19, height = 19 }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const THEME_MODE = theme.palette.mode;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.99994 5H2.99996C2.46954 5 1.96084 5.21071 1.58577 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58577 17.4142C1.96084 17.7893 2.46954 18 2.99996 18H11.9998C12.5302 18 13.0389 17.7893 13.414 17.4142C13.789 17.0391 13.9997 16.5304 13.9997 16V15'
        stroke={THEME_MODE === 'light' ? PRIMARY_DARK : PRIMARY_LIGHT}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.9999 3.00011L15.9998 6.00011M17.3848 4.58511C17.7786 4.19126 17.9999 3.65709 17.9999 3.10011C17.9999 2.54312 17.7786 2.00895 17.3848 1.61511C16.9909 1.22126 16.4568 1 15.8998 1C15.3428 1 14.8087 1.22126 14.4148 1.61511L6 10.0001V13.0001H8.99994L17.3848 4.58511Z'
        stroke={THEME_MODE === 'light' ? PRIMARY_DARK : PRIMARY_LIGHT}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
