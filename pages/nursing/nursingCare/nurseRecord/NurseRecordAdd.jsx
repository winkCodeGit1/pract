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
  dateTime: yup.date().typeError('Required'),
  nurseCareGiven: yup.string().required(),
  status: yup.boolean().required(),
});

const defaultValues = {
  dateTime: null,
  nurseCareGiven: '',
  status: true,
};

export default function NurseRecordAdd({ onClose, selectedRow }) {
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
      title='Add Nurse Record'
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFDateTimePicker name='dateTime' label='DateTime' />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='nurseCareGiven' label='Nursing Care Given' multiline maxRows={4} />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>Is Active</FormLabel>
            <RHFToggleButtonChipVariant minimumOne name='status' exclusive>
              <ToggleButton value={true} color='success' size='small'>
                Active
              </ToggleButton>
              <ToggleButton value={false} color='error' size='small'>
                In-Active
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
