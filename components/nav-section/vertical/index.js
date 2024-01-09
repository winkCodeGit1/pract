/** @format */

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginBlock: theme.spacing(0.5),
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  // transition: theme.transitions.create('opacity', {
  //   duration: theme.transitions.duration.shorter,
  // }),
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }) {
  return (
    <Box sx={{ overflowX: 'hidden' }} {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <Box>
            {group.subheader && <ListSubheaderStyle>{group.subheader}</ListSubheaderStyle>}

            {group.items.map((list) => (
              <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
            ))}
          </Box>
        </List>
      ))}
    </Box>
  );
}
