import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import useResponsive from 'hooks/useResponsive';
import NavbarVertical from './navbar/NavbarVertical';
import DashboardHeader from './header';
import MyContainer from 'components/Container';
import LoadingScreen from 'components/LoadingScreen';
import ScrollToTop from 'components/ScrollToTop';

// ----------------------------------------------------------------------

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  height: '100%',
  paddingTop: HEADER.MOBILE_HEIGHT,
  paddingBottom: HEADER.MOBILE_HEIGHT,
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `radial-gradient(${theme.palette.mode === 'dark' ? theme.palette.primary.darker : theme.palette.primary.lighter
    } 0.9px, ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.common.white
    } 2px)`,
  backgroundSize: '18px 18px',
  [theme.breakpoints.up('lg')]: {
    // paddingLeft: 16,
    // paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 16,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    marginLeft: NAVBAR.DASHBOARD_WIDTH,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick } = useCollapseDrawer();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!isDesktop);
  }, [isDesktop]);

  return (
    <Box
      sx={{
        // display: { lg: 'flex' },
        height: '100%',
        // minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader
        // isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>
        <MyContainer>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
          <ScrollToTop />
        </MyContainer>
      </MainStyle>
    </Box>
  );
}
