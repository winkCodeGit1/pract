/** @format */

import { Grid } from '@mui/material';
import { RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const defaultValues = {};
const Schema = yup.object().shape({
  bodyPartName: yup.string().trim().required('Required'),
  radiologyView: yup.string().trim().required('Required'),
});

export default function AddRadiologyViewAssociBodyPart({ onClose }) {
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
      title='Add Radiology View - Body Part'
      maxWidth='lg'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='bodyPartName'
              placeholder='Select Body Part Name'
              label='Body Part Name'
              required
            ></RHFAutoComplete>
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='radiologyView'
              placeholder='Select Radiology View Name'
              label='Radiology View Name'
              required
            ></RHFAutoComplete>
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
