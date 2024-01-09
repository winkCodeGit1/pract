import { Link as RouterLink } from 'react-router-dom';
// @mui
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
//
import belLogo from 'assets/Images/belLogo.png';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  padding: '0 20px',
  height: { md: HEADER.MAIN_DESKTOP_HEIGHT, xs: HEADER.MOBILE_HEIGHT + 60 },
  justifyContent: 'space-between',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // ...mediaQuerytoolbarStyle,
}));

// ----------------------------------------------------------------------

export default function MainHeader({ isStaffLoginVal }) {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const [isStaffLogin, setisStaffLogin] = useState(true);
  const theme = useTheme();

  // const { pathname } = useLocation();

  // const isDesktop = useResponsive('up', 'md');
  // const isHome = pathname === '/';


  useEffect(() => {
    setisStaffLogin(isStaffLoginVal);
  }, [isStaffLoginVal]);

  return (
    <AppBar
      component='nav'
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        marginTop: theme.spacing(0),
      }}
    >
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
          }),
        }}
      >
        <Link underline='none' color='inherit' component={RouterLink} to={'/'}>
          <Box
            component='img'
            src={belLogo}
            sx={{
              height: { xs: '35px', md: '55px', lg: '65px' },
            }}
            alt='Logo'
          />
        </Link>

        <Typography
          variant='h4'
          sx={{
            color: '#103A4D',
            flexGrow: 1,
            textAlign: 'center',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          BEL Hospital Management Information System (BEL-HMIS)
        </Typography>

        {isStaffLogin ? (
          <Button variant='contained' LinkComponent={RouterLink} to='/login'>
            Staff Login
          </Button>
        ) : (
          ''
        )}
      </ToolbarStyle>
    </AppBar>
  );
}
