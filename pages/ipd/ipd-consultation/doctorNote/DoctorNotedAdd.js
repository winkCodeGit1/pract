/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel, Grid, ToggleButton } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import {
  FormProvider,
  RHFTextField,
  RHFDateTimePicker,
  RHFToggleButtonChipVariant,
} from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  ObservationDoctorNotes: yup.string().required(),
  Prognosisnote: yup.string().required(),
  TreatmentPlan: yup.string().required(),
});

const defaultValues = {
  ObservationDoctorNotes: '',
  Prognosisnote: '',
  TreatmentPlan: '',
};

export default function DoctorNotedAdd({ onClose, selectedRow }) {
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
      title='Add Doctor Note'
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFTextField name='dateTime' label='Observations/ Doctor Notes' />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='dateTime' label='Prognosis Note' />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='dateTime' label='Treatment Plan' />
          </Grid>


        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
