import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import PersonalHistory from 'pages/Consultation/history/PersonalHistory';

export default function PersonalHistoryIpd() {
  const methods = useForm({});
  const [loading] = useState(false);
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '----PERSONALHISTORYdata');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <PersonalHistory stateName={'patientHistory'} />
          <Grid container alignItems='center' justifyContent={'flex-end'}>
            <LoadingButton type='submit' variant='contained' loading={loading} sx={{ mt: 1 }}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
