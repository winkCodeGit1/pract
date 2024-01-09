// @mui
import { Box, Stack, Typography } from '@mui/material';
import Logo from 'components/Logo';
import LoginForm from './sections/LoginForm';
import imageOne from 'assets/Images/Image1.jpg';

export default function Login() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Stack
        component='header'
        sx={{
          p: 2,
          backgroundColor: 'primary.lighter',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Typography
          variant='h4'
          sx={{
            color: '#103A4D',
            flexGrow: 1,
            textAlign: 'center',
            display: { xs: 'none', md: 'block' },
          }}
        >
          BEL Hospital Management Information System (BEL-HMIS)
        </Typography>
      </Stack>
      <Box
        sx={{
          background: `url(${imageOne}) center/cover no-repeat`,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box maxWidth={500} sx={{ width: '100%', marginLeft: { md: -4, } }}>
          <LoginForm />
        </Box>
      </Box>
    </div>
  );
}
