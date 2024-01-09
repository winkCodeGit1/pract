/* eslint-disable react/no-unescaped-entities */
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import DiagnosisTab from 'pages/Consultation/Diagnosis/DiagnosisTab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DiagnosisIPD() {
  const methods = useForm({});
  const [loading] = useState(false);

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '----doanddont');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ border: '1px solid', borderColor: 'divider', padding: '5px' }}>
        <Grid container>
          <DiagnosisTab stateName={'diagnosis'} isIpd={true} />
          <Grid container alignItems='center' justifyContent={'flex-end'}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={loading}
              sx={{ margin: '12px' }}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
