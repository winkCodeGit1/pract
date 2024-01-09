/* eslint-disable no-unused-vars */
import { Box, Button, Checkbox, Grid, MenuItem, Paper, Typography } from '@mui/material';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useForm, useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getAllGender } from 'pages/api/dashboard';
import { useState } from 'react';
import { viewDateFormat } from 'utils/date';

const schema = yup.object().shape({});

export default function EmergencyRegistration() {
  const methods = useForm({
    // resolver: yupResolver(schema),
    mode: 'onChange',
    // defaultValues,
  });

  const {
    watch,
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const [checked, setChecked] = useState(false);

  function onSubmit(params) {
    console.log(params);
  }

  const { data: gender = [] } = useQuery({
    queryKey: ['getAllGender'],
    queryFn: getAllGender,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const dobHandler = () => {
    let yearAge = getValues('year');
    let monthAge = getValues('month') || 0;
    let dayAge = getValues('days') || 0;
    if (checked) {
      if (yearAge) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        yearAge = currentYear - yearAge;
        monthAge = currentMonth - monthAge;
        dayAge = currentDay - dayAge;
        console.log(yearAge, monthAge, dayAge, 'age');
        const formattedDate = new Date(`${yearAge}-'${monthAge}-${dayAge}`);
        setValue('dob', formattedDate);
      } else {
        setValue('dob', null);
      }
    } else {
      if (yearAge) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        yearAge = currentYear - yearAge;
        monthAge = currentMonth - monthAge;
        dayAge = currentDay - dayAge;
        const formattedDate = new Date(`${yearAge}-'${monthAge}-${dayAge}`);
        console.log(formattedDate);
        setValue('dob', formattedDate);
      } else {
        setValue('dob', null);
      }
    }
  };

  const handleChangeYear = (date) => {
    if (date) {
      const DateSplit = viewDateFormat(date).split('-');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      let yearAge = currentYear - DateSplit[2] || 0;
      let monthAge = currentMonth - 0;
      let dayAge = currentDay - 0;

      if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
        yearAge--;
        monthAge += 12;
      }

      if (dayAge < 0) {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        monthAge--;
        dayAge = lastMonthDate - DateSplit[0] + currentDay;
      }
      setValue('year', yearAge);
      setValue('month', 0);
      setValue('days', 0);
    } else {
      setValue('year', '');
      setValue('month', '');
      setValue('days', '');
    }
  };

  const generateDateOfBirth = (year, month, day) => {
    let yearAge, monthAge, dayAge;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if (year && month && day) {
      yearAge = currentYear - year || 0;
      monthAge = currentMonth - month || 0;
      dayAge = currentDay - day || 0;

      if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
        yearAge--;
        monthAge += 12;
      }

      if (dayAge < 0) {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        monthAge--;
        dayAge = lastMonthDate - day + currentDay;
      }
    }
    setValue('year', yearAge);
    setValue('month', monthAge);
    setValue('days', dayAge);
  };

  const handleDateOfBirthChange = (date) => {
    if (date) {
      const DateSplit = viewDateFormat(date).split('-');
      generateDateOfBirth(+DateSplit[2], +DateSplit[1], +DateSplit[0]);
    } else {
      setValue('year', '');
      setValue('month', '');
      setValue('days', '');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {' '}
          <Typography
            variant='subtitle1'
            sx={{ backgroundColor: 'divider', p: 1, color: 'primary.darker' }}
          >
            Admission Details
          </Typography>{' '}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {' '}
          <RHFDatePicker name='admissionDate' label='Admission Date' />{' '}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RHFTextField
            name='firstName'
            label='First Name'
            placeholder='First Name'
            required
            toUpperCase
            inputProps={{ maxLength: 100 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RHFTextField
            label='Last Name'
            name='lastName'
            placeholder='Last Name'
            inputProps={{ maxLength: 100 }}
            toUpperCase
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RHFSelect name='genderId' label='Gender' placeholder='Gender' required>
            <MenuItem value=''>Select Gender</MenuItem>
            {gender.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {checked ? (
            <RHFDatePicker
              name='dob'
              label='Date of Birth'
              views={['year']}
              required
              disableFuture
              onInputChange={(event) => {
                handleChangeYear(event);
              }}
              sx={{ width: '100%' }}
            />
          ) : (
            <RHFDatePicker
              name='dob'
              label='Date of Birth'
              format='dd-MM-yyyy'
              required
              disableFuture
              onInputChange={(date) => {
                handleDateOfBirthChange(date);
              }}
              sx={{ width: '100%' }}
            />
          )}

          <Typography variant='caption' style={{ marginTop: '8px', marginBottom: '4px' }}>
            <Checkbox
              size='small'
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.checked);
                setValue('dob', null);
                setValue('year', '');
                setValue('month', '');
                setValue('days', '');
              }}
            />
            Only year of birth
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant='subtitle2' fontWeight={400}>
            Age
          </Typography>
          <div style={{ display: 'flex', gap: 10 }}>
            <RHFTextField
              name='year'
              placeholder='Year'
              inputProps={{ maxLength: 3 }}
              toUpperCase
              onInputChange={(event) => {
                dobHandler(event);
                setValue('month', 0);
                setValue('days', 0);
              }}
            />
            <RHFTextField
              name='month'
              placeholder='Month'
              type='number'
              disabled
              inputProps={{ maxLength: 2, min: 1, max: 12 }}
              onInputChange={(event) => {
                dobHandler(event);
              }}
            />
            <RHFTextField
              name='days'
              placeholder='days'
              type='number'
              disabled
              inputProps={{ maxLength: 2, min: 1, max: 31 }}
              onInputChange={(event) => {
                dobHandler(event);
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RHFSelect name='clinicOrDepartment' label='Clinic/Department'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RHFSelect name='admittingDoctor' label='Admitting Doctor'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            sx={{ backgroundColor: 'divider', p: 1, color: 'primary.darker' }}
          >
            Kin Details(Optional)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RHFSelect name='kinRelation' label='Kin Relation'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RHFSelect name='kinName' label='Kin Name'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RHFTextField name='address' label='Address' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RHFTextField name='pincode' label='Post Code' />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RHFTextField name='kinMobileNo' label='kinMobileNo' />
        </Grid>

        <Grid item xs={12}>
          {' '}
          <Typography
            variant='subtitle1'
            sx={{ backgroundColor: 'divider', p: 1, color: 'primary.darker' }}
          >
            Payer Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {' '}
          <RHFSelect name='payer' label='Payer'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {' '}
          <RHFSelect name='sponsor' label='Sponsor'>
            <MenuItem value=''>Select option</MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={12} align='right'>
          <Button variant='contained' onClick={() => handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EmergencyRegistration;
