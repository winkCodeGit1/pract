import { Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFAutoComplete, RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { useForm } from 'react-hook-form';
// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import RHFDatePicker, { RHFTimePicker } from 'components/hook-form/RHFDatePicker';
// import { toast } from 'react-toastify';
// import FormWrapper from 'components/FormWrapper';
// import RHFTimePicker from 'components/hook-form/RHFDatePicker';

const certificates = [
  { value: 'leave', label: 'Certificate for Leave' },
  { value: 'leave Extension', label: 'Certificate for Leave Extension' },
  { value: 'fitness', label: 'Certificate of Fitness to return duty' },
  { value: 'death', label: 'Certificate of cause of death' },
  { value: 'refer', label: 'Refer Letter' },
];

const defaultValues = {
  certificate: '',
  leaveFromDate: '',
  leaveAbscence: '',
  leaveExtensionsFromDate: '',
  leaveExtensionsPrdOfAbscence: '',
  fitnessFromDate: '',
  fitnessday: '',
  deathDate: '',
  startTime: '',
  causeOfDeath: '',
  ImmediateCause: '',
  AntecedentCause: '',
  OtherSignificantCause: '',
  deathManner: '',
  fitnessWasPregnancy: '',
  fitnessesDelivery: '',
  referedStream: '',
  referedHospital: '',
  referedDepartment: '',
};

export default function MedicalCertificate() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const getSchema = () => {
    switch (selectedCertificate) {
      case 'leave':
        return yup.object().shape({
          leaveFromDate: yup
            .date()
            .typeError('Invalid Date')
            .required('Leave From Date is required'),
          leaveAbscence: yup.string().trim().required('Required'),
        });
      case 'leave Extension':
        return yup.object().shape({
          leaveExtensionsFromDate: yup
            .date()
            .typeError('Invalid Date')
            .required('leave Extensions From Date is required'),
          leaveExtensionsPrdOfAbscence: yup.string().trim().required('Required'),
        });
      case 'fitness':
        return yup.object().shape({
          fitnessFromDate: yup
            .date()
            .typeError('Invalid Date')
            .required('fitness From Date is required'),
        });
      case 'death':
        return yup.object().shape({
          deathDate: yup.date().typeError('Invalid Date').required('death Date is required'),
          startTime: yup.date().typeError('Invalid Date').required('start Time is required'),
          deathManner: yup.object().typeError('Required').nullable().required('Required'),
        });
      case 'refer':
        return yup.object().shape({
          referedStream: yup.object().typeError('Required').nullable().required('Required'),
          referedHospital: yup.object().typeError('Required').nullable().required('Required'),
          referedDepartment: yup.object().typeError('Required').nullable().required('Required'),
        });
      default:
        return yup.object(); // Default schema for other certificates
    }
  };

  const schema = getSchema();
  const [loading] = useState(false);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    console.log(data, '----medicale certificate');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ border: '1px solid', borderColor: 'divider' }}
      >
        <Grid item xs={6} md={6} sx={{ width: '50%' }}>
          <RHFAutoComplete
            name='certificate'
            label='Type of Medical Certificate'
            options={certificates}
            control={control}
            onInputChange={(e) => {
              if (e && e.value) {
                setSelectedCertificate(e.value);
              }
            }}
          />
        </Grid>

        {selectedCertificate === 'leave' && <LeaveForm />}

        {selectedCertificate === 'leave Extension' && <LeaveExtensionForm />}

        {selectedCertificate === 'fitness' && <FitnessForm />}

        {selectedCertificate === 'death' && <DeathForm />}

        {selectedCertificate === 'refer' && <ReferForm />}

        <Grid container alignItems='center' justifyContent={'flex-end'}>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={loading}
            sx={{ margin: '12px' }}
          >
            Preview
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function LeaveForm() {
  return (
    <>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFDatePicker name='leaveFromDate' label='From Date' format='dd-MM-yyyy' disableFuture />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField
          name='leaveAbscence'
          label='Period of Absence'
          InputProps={{
            endAdornment: (
              <Typography variant='body2' color='text.secondary'>
                Days
              </Typography>
            ),
          }}
        />
      </Grid>
    </>
  );
}

function LeaveExtensionForm() {
  return (
    <>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFDatePicker
          name='leaveExtensionsFromDate'
          label='From Date'
          format='dd-MM-yyyy'
          disableFuture
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField
          name='leaveExtensionsPrdOfAbscence'
          label='Period of Absence'
          InputProps={{
            endAdornment: (
              <Typography variant='body2' color='text.secondary'>
                Days
              </Typography>
            ),
          }}
        />
      </Grid>
    </>
  );
}

function FitnessForm() {
  const [fitnessOption] = useState(['AM', 'PM']);
  return (
    <>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFDatePicker name='fitnessFromDate' label='From Date' format='dd-MM-yyyy' disableFuture />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFRadioGroup
          label='Select AM/PM'
          name='fitnessday'
          options={fitnessOption}
          sx={{
            '& .MuiFormControlLabel-root': { mr: 4 },
          }}
          required
        />
      </Grid>
    </>
  );
}

function DeathForm() {
  const [pregnancyOption] = useState(['No', 'Yes']);

  return (
    <>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFDatePicker name='deathDate' label='Date' format='dd-MM-yyyy' disableFuture />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTimePicker name='startTime' label='Time' format='hh:mm:ss A/P' />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField name='causeOfDeath' label='Cause of Death' />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField name='ImmediateCause' label='Immediate Cause' />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField name='AntecedentCause' label='Antecedent Cause' />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFTextField name='OtherSignificantCause' label='Other Significant Cause' />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFAutoComplete
          name='deathManner'
          placeholder='Select manner of Death'
          label='Manner of Death'
          required
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFRadioGroup
          label='Was Pregnancy Case'
          name='fitnessWasPregnancy'
          options={pregnancyOption}
          sx={{
            '& .MuiFormControlLabel-root': { mr: 4 },
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFRadioGroup
          label='Was Delivery'
          name='fitnessesDelivery'
          options={pregnancyOption}
          sx={{
            '& .MuiFormControlLabel-root': { mr: 4 },
          }}
          required
        />
      </Grid>
    </>
  );
}

function ReferForm() {
  return (
    <>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFAutoComplete name='referedStream' placeholder='Select Stream' label='Stream' required />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFAutoComplete
          name='referedHospital'
          placeholder='Search Hospital'
          label='Hospital'
          required
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '50%' }}>
        <RHFAutoComplete
          name='referedDepartment'
          placeholder='Search Hospital'
          label='Department'
          required
        />
      </Grid>
    </>
  );
}
