import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, Badge, IconButton } from '@mui/material';
// routes
// hooks
import useSettings from 'hooks/useSettings';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
// import { IconButtonAnimate } from '../../../components/animate';
// config
import { defaultSettings } from 'config.js';
import Profile from './Profile';
import About from './About';
import useSettingStore from 'stores/useSettingStore';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'About',
    linkTo: 'about',
  },
  {
    label: 'Profile',
    linkTo: 'Profile',
  },
  {
    label: 'Settings',
    linkTo: 'setting',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const { themeMode, themeColorPresets, themeLayout } = useSettings();
  const { toggleSettingDrawer } = useSettingStore();

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeColorPresets !== defaultSettings.themeColorPresets ||
    themeLayout !== defaultSettings.themeLayout;

  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [openAbout, setOpenAbout] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (linkTo) => {
    setOpen(null);
    console.log(linkTo);
    switch (linkTo) {
      case 'setting':
        toggleSettingDrawer();
        break;
      case 'about':
        setOpenAbout(true);
        break;
      case 'Profile':
        setOpenProfile(true);
        break;

      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {openProfile && <Profile onClose={() => setOpenProfile(false)} />}
      {openAbout && <About onClose={() => setOpenAbout(false)} />}

      <IconButton onClick={handleOpen}>
        <Badge color='error' overlap='circular' variant='dot' invisible={!notDefault}>
          <MyAvatar />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          // mt: '16px',
          // ml: '31px',
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user?.username}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.roles[0]}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClose(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1, color: 'red !important' }}>
          <b>Logout</b>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
