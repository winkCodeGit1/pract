/* eslint-disable react/no-unescaped-entities */
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import DosAndDont from 'pages/Consultation/DosAndDont';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DosAndDontIPD() {
  const methods = useForm({});
  const [loading] = useState(false);

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '----doanddont');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <DosAndDont />
        <Grid container alignItems='center' justifyContent={'flex-end'}>
          <LoadingButton type='submit' variant='contained' loading={loading} sx={{ mt: 1 }}>
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
