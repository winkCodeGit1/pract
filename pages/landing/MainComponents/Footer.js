import { Grid, Typography } from '@mui/material/';

export default function Footer() {
  return (
    <Grid item xs={12} align='center' style={{ backgroundColor: '#DDEAF3', padding: 4 }}>
      <Typography style={{ color: '#265266', fontSize: '0.75rem' }}>
        This website is maintained by BEL Hospital, Bengaluru - Designed &amp; Developed by{' '}
        <a
          style={{ textDecoration: 'none' }}
          target='_blank'
          href='https://bel-india.in/'
          rel='noreferrer'
        >
          <span style={{ color: '#67793F' }}>Bharat Electronics Limited (Software SBU)</span>
        </a>
      </Typography>
    </Grid>
  );
}
