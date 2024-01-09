import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'components/hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FamilyHistory from 'pages/Consultation/history/FamilyHistory';

export default function FamilyHistoryIpd() {
  const methods = useForm({});
  const [loading] = useState(false);
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '----FamilyHistory');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <FamilyHistory stateName={'patientHistory'} />
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
