/** @format */

// @mui
import { styled } from '@mui/material/styles';
import { ListItemText, ListItemButton, ListItemIcon, alpha } from '@mui/material';
// config
import { ICON, NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})(({ activeRoot, activeSub, subItem, theme }) => ({
  position: 'relative',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  // marginBottom: theme.spacing(0.5),
  // paddingBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
  // borderRadius: theme.shape.borderRadius,
  borderRadius: '8px',
  transition: '0.2s',
  '&:hover': {
    // color: theme.palette.,
    backgroundColor: alpha(theme.palette.primary.light, 0.3),
  },
  // activeRoot
  ...(activeRoot && {
    // ...theme.typography.body1,
    fontWeight: 800,
    color:
      theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
    backgroundColor: alpha(theme.palette.primary.light, 0.2),
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.light, 0.3),
    },
  }),

  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
  }),
}));

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  textOverflow: 'ellipsis',
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
});
