/** @format */

import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, ListItemText, Typography } from '@mui/material';
//
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <ListItemTextStyle
        primary={
          <Typography variant='subtitle2' fontWeight='600'>
            {title}
          </Typography>
        }
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }
  return (
    <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

export function NavItemSub({ item, active = false, onOpen }) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {/* {children && <ArrowIcon open={open} />} */}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }
  return (
    <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
  // );
}

// ----------------------------------------------------------------------

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component='span'
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

const RotatableIcon = styled(KeyboardArrowRightIcon)(({ theme, rotate }) => ({
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
    easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  }),
  transform: rotate === 'true' ? 'rotate(90deg)' : 'rotate(0deg)',
}));

export function ArrowIcon({ open }) {
  return <RotatableIcon sx={{ width: 20, height: 20, ml: 1 }} rotate={open.toString()} />;
}
