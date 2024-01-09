// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
// import { UploadIllustration } from '../../assets/Images/';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      justifyContent='center'
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      {/* <UploadIllustration sx={{ width: 220 }} /> */}

      <Box sx={{ p: 1 }}>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          Drop files here or click&nbsp;
          <Typography
            variant='body2'
            component='span'
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            browse
          </Typography>
          &nbsp;thorough your machine
        </Typography>
      </Box>
    </Stack>
  );
}
