import { Grid, MenuItem, Typography } from '@mui/material';
import { RHFSelect, RHFTextField } from 'components/hook-form';

export default function DispositionTab({ stateName }) {
  return (
    <>
      <Grid container spacing={2} alignItems='center' sx={{ marginBottom: '10px' }}>
        <Grid item>
          <Typography variant='body2'>Disposition Type:</Typography>
        </Grid>
        <Grid item sx={{ maxWidth: '250px', width: '100%' }}>
          <RHFSelect name={stateName + '.dispositionType'}>
            <MenuItem value='' selected>
              Select
            </MenuItem>
            <MenuItem value='Admit Patient'>Admit Patient</MenuItem>
          </RHFSelect>
        </Grid>
      </Grid>

      <Typography sx={{ marginBottom: '4px' }} variant='body2'>
        Disposition Notes:
      </Typography>
      <RHFTextField
        name={stateName + '.textArea'}
        multiline
        fullWidth
        size='small'
        maxRows={3}
        minRows={3}
      />
    </>
  );
}
