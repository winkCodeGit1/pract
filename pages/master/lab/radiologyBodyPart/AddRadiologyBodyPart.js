/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid } from '@mui/material';
import { RHFTextField } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';

const defaultValues = {};
const Schema = yup.object().shape({
  radiologyBodyPartName: yup.string().trim().required('Required'),
});
export default function AddRadiologyBodyPart({ onClose }) {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title='Add Radiology Body Part Name'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='radiologyBodyPartName'
              placeholder='Radiology Body Part Name'
              label='Radiology Body Part Name'
              required
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
