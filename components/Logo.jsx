import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import belLogo from '../assets/Images/belLogo.png';
import Link from 'theme/overrides/Link';

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ height: 50, ...sx }}>
      <img alt='Bel-Logo' src={belLogo} width={180} />
    </Box>
  );

  if (disabledLink) {
    return <Link>{logo}</Link>;
  }

  return <RouterLink to='/'>{logo}</RouterLink>;
}
