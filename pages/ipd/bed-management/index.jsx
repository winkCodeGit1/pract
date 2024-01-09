/* eslint-disable no-unused-vars */
import { Grid, MenuItem, Button, Typography, Stack, Box } from '@mui/material';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import BedList from './bedList';
import Transfer from './Transfer';
import { useState } from 'react';
import Discharge from './Discharge';
import useBedManagementStore from 'stores/useBedManagementStore';
import { Circle } from '@mui/icons-material';

export default function BedManagement() {
  const { isTransferOpen, isDischargeOpen, toggleTransfer, toggleDischarge } =
    useBedManagementStore();

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

  function onSubmit(params) {
    console.log(params);
  }

  return (
    <>
      {isTransferOpen && <Transfer onClose={() => toggleTransfer(false)} bedInfo />}
      {isDischargeOpen && <Discharge onClose={() => toggleDischarge(false)} bedInfo />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} px={2} py={1}>
          <Grid item xs={12} sm={6} md={4}>
            <RHFSelect name='building' label='Building' required>
              <MenuItem value=''>Select option</MenuItem>
              {[].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFSelect name='Ward' label='ward' required>
              <MenuItem value=''>Select option</MenuItem>
              {[].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ backgroundColor: 'divider', maxWidth: 400, margin: 'auto' }}>
              <Stack direction='row' gap={2} justifyContent='space-around'>
                <Typography>
                  <Circle fontSize='small' color='error' sx={{ mb: '-4px' }} /> In Use
                </Typography>
                <Typography>
                  <Circle fontSize='small' color='warning' sx={{ mb: '-4px' }} /> Reserved
                </Typography>
                <Typography>
                  <Circle fontSize='small' color='info' sx={{ mb: '-4px' }} /> Empty
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <BedList />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
