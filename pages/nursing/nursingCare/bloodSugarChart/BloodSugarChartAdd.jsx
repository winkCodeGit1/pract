/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel, Grid, ToggleButton } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import {
  FormProvider,
  RHFTextField,
  RHFToggleButtonChipVariant,
  RHFRadioGroup,
} from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const testTypes = ['FBS', 'PPBS', 'RBS', 'HbA1c'];

const schema = yup.object().shape({
  dateTime: yup.date().typeError('Required'),
  value: yup.string().required(),
  actionTaken: yup.string().required(),
});

const defaultValues = {
  testType: 'FBS',
  value: '',
  actionTaken: '',
};

export default function BloodSugarChartAdd({ onClose, selectedRow }) {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  function onSave(data) {
    console.log(data);
  }

  return (
    <FormWrapper
      maxWidth='xs'
      title='Add Blood Sugar Chart'
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFRadioGroup
              label=''
              name='testType'
              options={testTypes}
              getOptionLabel={testTypes}
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='value' label='Value' multiline maxRows={4} required />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              required
              name='actionTaken'
              label='Action Taken'
              multiline
              maxRows={4}
              minRows={2}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
