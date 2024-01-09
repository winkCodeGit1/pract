import { Avatar, Card, Grid, Typography } from '@mui/material';

export default function PatientInfo({ row }) {
  return (
    <Card
      sx={{
        p: 1.2,
        mb: 2,
        borderRadius: '8px',
        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
      }}
    >
      <Grid container spacing={0} alignItems='center'>
        <Grid item xs={12} sm={12} md={1}>
          <Avatar sx={{ width: 50, height: 50 }}>T</Avatar>
        </Grid>
        <Grid item xs={12} sm={12} md={11}>
          <Grid container spacing={0} alignItems='center'>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[400],
                }}
                component='span'
              >
                CR. No. :&nbsp;
              </Typography>
              {row?.patient}
            </Grid>
            <Grid item xs={12} sm={3} lg={3}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[400],
                }}
                component='span'
              >
                Patient Name :&nbsp; {row?.patientName}
              </Typography>
              {row?.patient}
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[400],
                }}
                component='span'
              >
                Age :&nbsp;
              </Typography>
              26
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[400],
                }}
                component='span'
              >
                Gender :&nbsp;
              </Typography>
              Male
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[700]
                      : theme.palette.grey[400],
                }}
                component='span'
              >
                Refered By :&nbsp;
              </Typography>
              Dr. Doctor
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
