import { useState } from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import PastHistory from 'pages/Consultation/history/PastHistory';

export default function PastHistoryIpd() {
  const methods = useForm({});
  const [loading] = useState(false);
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '---pasthistorydata');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <PastHistory stateName={'patientHistory'} />
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
