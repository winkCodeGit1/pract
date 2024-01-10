/** @format */

import { Grid } from '@mui/material';
import { RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const defaultValues = {};
const Schema = yup.object().shape({
  sampleType: yup.string().trim().required('Required'),
  singleTestName: yup.string().trim().required('Required'),
  groupTestName: yup.string().trim().required('Required'),
});
export default function AddSampleAssociTest({ onClose }) {
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
      title='Add Sample Association with Test'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='sampleType'
              placeholder='Select Sample Type'
              label='Sample Type'
              required
            ></RHFAutoComplete>
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='singleTestName'
              placeholder='Select Single Test Name'
              label='Single Test Name'
              required
            ></RHFAutoComplete>
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='groupTestName'
              placeholder='Select Group Test Name'
              label='Group Test Name'
              required
            ></RHFAutoComplete>
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
