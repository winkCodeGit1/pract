import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Divider,
  Typography,
  ListSubheader,
  Stack,
  Alert,
  IconButton,
} from '@mui/material';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { Check, MarkChatRead } from '@mui/icons-material';
//
import NotificationsIconIcon from 'assets/notoficationIcon';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
//

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // const handleMarkAllAsRead = () => {};
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } = useNotificationCenter();
  const [showUnreadOnly] = useState(false);

  // const toggleFilter = () => {
  //   setShowUnreadOnly(!showUnreadOnly);
  // };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={unreadCount} color='error'>
          <NotificationsIconIcon />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Notifications</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {unreadCount} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
          sx={{ maxHeight: 500, overflowY: 'auto' }}
        >
          {(showUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map(
            (notification, i) => {
              return (
                <Alert
                  key={i}
                  severity={notification.type || 'info'}
                  action={
                    notification.read ? (
                      <Check />
                    ) : (
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='span'
                        onClick={() => markAsRead(notification.id)}
                      >
                        <MarkChatRead />
                      </IconButton>
                    )
                  }
                >
                  {notification.content}
                </Alert>
              );
            }
          )}
          {unreadCount === 0 && (
            <Typography variant='body2' paddingLeft={5} color='primary'>
              No New messages.
            </Typography>
          )}
        </List>

        {/* <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              Before that
            </ListSubheader>
          }
        >
          {(!showUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map(
            (notification, i) => {
              return (
                <Alert
                  key={i}
                  severity={notification.type || 'info'}
                  action={
                    notification.read ? (
                      <Check />
                    ) : (
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='span'
                        onClick={() => markAsRead(notification.id)}
                      >
                        <MarkChatRead />
                      </IconButton>
                    )
                  }
                >
                  {notification.content}
                </Alert>
              );
            }
          )}
          <Typography variant='body2' paddingLeft={5} color='primary'>
            No Old messages.
          </Typography>
        </List> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction='row' justifyContent='space-around'>
          <Button disableRipple>View All</Button>
          <Button onClick={clear} color='error'>
            Clear All
          </Button>
          <Button onClick={markAllAsRead} color='secondary'>
            Mark all as read
          </Button>
        </Stack>
        <Box></Box>
      </MenuPopover>
    </>
  );
}
