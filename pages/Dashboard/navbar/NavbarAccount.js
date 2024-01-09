import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Menu, Stack, Toolbar, Typography } from '@mui/material';
// hooks
// import useAuth from '../../../hooks/useAuth';
// routes
// components
import useResponsive from '../../../hooks/useResponsive';
import AccountPopover from '../header/AccountPopover';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  // transition: theme.transitions.create('opacity', {
  //   duration: theme.transitions.duration.shorter,
  // }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

const PopoverNavBar = ({ onOpenSidebar }) => {
  const isDesktop = useResponsive('up', 'lg');

  const handleClick = (event) => {
    event.stopPropagation();
    console.log('Child element clicked!');
  };

  return (
    <>
      <div onClick={handleClick} style={{ pointerEvents: 'auto', padding: '0px' }}>
        <Toolbar
          sx={{
            minHeight: '100% !important',
            padding: '0 0 !important',
          }}
        >
          {!isDesktop && (
            <IconButton size='large' onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
              <Menu sx={{ fontSize: { xs: 22, sm: 28, md: 32 } }} />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
            <AccountPopover />
          </Stack>
        </Toolbar>
      </div>
    </>
  );
};

export default function NavbarAccount({ isCollapse }) {
  // const { user } = useAuth();
  const [, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    setOpen(!isDesktop);
  }, [isDesktop]);

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: 'transparent',
        }),
      }}
    >
      <PopoverNavBar isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      <Box
        sx={{
          ml: 2,
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(isCollapse && {
            ml: 0,
            width: 0,
          }),
        }}
      >
        <Typography variant='subtitle2' noWrap>
          Hospital
        </Typography>
        <Typography variant='body2' noWrap sx={{ color: 'text.secondary' }}>
          Admin
        </Typography>
      </Box>
    </RootStyle>
    // </Link>
  );
}
