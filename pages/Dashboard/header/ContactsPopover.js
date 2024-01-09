import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';
// import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
// import { fToNow } from '../../../utils/formatTime';
// _mock_
// components
// import Iconify from '../../../components/Iconify';
// import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
// import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        {/* <Iconify icon={'eva:people-fill'} width={20} height={20} /> */}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant='h6' sx={{ p: 1.5 }}>
          Contacts <Typography component='span'>(fds)</Typography>
        </Typography>
      </MenuPopover>
    </>
  );
}
