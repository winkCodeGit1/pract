import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { Box, alpha } from '@mui/material';

export default function MyContainer({ children }) {
  const location = useLocation();

  let title = location.pathname.split('/').slice(-1)[0];
  if (title.includes('-')) {
    title = title
      .split('-')
      .map((subTitle) => subTitle.charAt(0).toUpperCase() + subTitle.slice(1))
      .join(' ');
  } else {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  }

  return (
    <Box
      sx={{
        maxWidth: 1600,
        margin: 'auto',
        // textAlign: 'center',
        border: '2px solid',
        backgroundColor: (theme) => theme.palette.background.default,
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.lighter, 0.2)
            : alpha(theme.palette.primary.lighter, 0.4),
      }}
    >
      <Typography
        sx={{
          py: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.lighter, 0.1)
              : alpha(theme.palette.primary.lighter, 0.3),
        }}
        textAlign='center'
        variant='h5'
        color={'text.primary'}
        title='Page Title'
      >
        {title}
      </Typography>
      <div style={{ height: '100%' }}>{children}</div>
    </Box>
  );
}
