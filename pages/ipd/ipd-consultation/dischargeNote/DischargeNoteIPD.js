import { Grid } from '@mui/material';
import { RHFAutoComplete, RHFTextField } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { LoadingButton } from '@mui/lab';

const defaultValues = {
  name: '',
  DateOfAdmission: '',
  DateOfDischarge: '',
  DischargeNote: '',
  TreatmentGiven: '',
  DischargeSummary: '',
  FollowUpDate: '',
};
const schema = yup.object().shape({
  DischargeNote: yup
    .object()
    .typeError('Discharge Note is required')
    .required('Discharge Note is required'),
  TreatmentGiven: yup.string().required('Treatment Given Field is required'),
  DischargeSummary: yup.string().required('Discharge Summary Field is required'),
  FollowUpDate: yup.date().typeError('Invalid Date').required('Follow Update Field  is required'),
});
export default function DischargeNoteIPD() {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const {
    // watch,
    // control,
    // getValues,
    // setValue,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justifyContent={'flex-end'}>
        <Grid item xs={12} md={6}>
          <RHFTextField name='name' placeholder='Name' label='Name ' />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name='DateOfAdmission'
            placeholder='Enter Date Of Admission'
            label=' Date Of Admission'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name='DateOfDischarge'
            placeholder='Date Of Discharge'
            label='Date Of Discharge '
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutoComplete
            name='DischargeNote'
            options={null}
            label='Discharge Note'
            placeholder='Discharge Note'
            // onInputChange={(event) => {
            //   setValue('feesTypeId', event.target.value?.id);
            // }}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField
            multiline
            minRows={2}
            label='Treatment Given'
            placeholder='Enter Treatment Given'
            name='TreatmentGiven'
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField
            multiline
            minRows={2}
            label='Discharge Summary'
            placeholder='Enter Discharge Summary Note'
            name='DischargeSummary'
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFDatePicker
            name='FollowUpDate'
            label='Follow Up Date'
            format='dd-MM-yyyy'
            minDate={new Date()}
            required
          />
        </Grid>
        <Grid container justifyContent={'flex-end'} mt={2}>
          <LoadingButton type='submit' variant='contained'>
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
