/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
//
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import cssStyles from '../../../utils/cssStyles';
import { HEADER, NAVBAR } from '../../../config';
//
import AccountPopover from './AccountPopover';
import { Menu } from '@mui/icons-material';
import Searchbar from './Searchbar';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset',
})(({ isCollapse, isOffset, theme }) => ({
  ...cssStyles(theme).bgBlur({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[100],
  }),
  // boxShadow: theme.shadows[4],
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isOffset && {
    height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT - 20,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT - 20,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT);

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
        }}
      >
        {!isDesktop && (
          <IconButton size='large' onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Menu sx={{ fontSize: { xs: 22, sm: 28, md: 32 } }} />
          </IconButton>
        )}
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
