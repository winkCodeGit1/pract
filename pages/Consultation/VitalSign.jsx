// import React from 'react';

import { Box, Button, Grid, InputAdornment, LinearProgress, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFTextField } from 'components/hook-form';
import { vitalSignSaveVitalSignValues } from 'pages/api/common';
import { vitalSignTypeGetAllActiveVitalSignType } from 'pages/api/master';
import { useState } from 'react';
// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

export default function VitalSign({ onClose, selectedPatient }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const defaultValues = {};

  const {
    data: vitalSignData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['vitalSignTypeGetAllActiveVitalSignType'],
    queryFn: vitalSignTypeGetAllActiveVitalSignType,
  });

  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    reset,

    // formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: (req) => vitalSignSaveVitalSignValues({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vitalSignGetByRegistrationId'] });
      toast.success('Vital Sign Added');
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });
  const addVitals = async (data) => {
    try {
      setLoading(true);
      // const req = [];
      const vitalSign = [];
      const req = {
        registrationId: selectedPatient?.registrationId,
        staffId: 1,
        vitalSignValuesDtos: [],
      };

      for (const [key, value] of Object.entries(data)) {
        const vitalSignTypeId = key.split('_')[1];
        const obj = {
          vitalSignTypeId: vitalSignTypeId,
          vitalSignValue: value,
        };
        vitalSign.push(obj);
      }
      req.vitalSignValuesDtos = vitalSign.filter(
        (item) => !(item.vitalSignValue === undefined || item.vitalSignValue === '')
      );

      if (req.vitalSignValuesDtos.length > 0) {
        mutation.mutate(req);
      } else {
        toast.info('Fill At-least one vital');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Something Went Wrong');
      setLoading(false);
    }

    // reset();
  };

  const handleTryAgain = () => {
    queryClient.invalidateQueries({ queryKey: ['vitalSignTypeGetAllActiveVitalSignType'] });
  };
  console.log(selectedPatient, 'selectedPatient');
  return (
    <FormWrapper
      onClose={onClose}
      title='Vital Sign'
      maxWidth='md'
      fullWidth
      onSubmit={handleSubmit(addVitals)}
      onReset={() => {
        reset();
      }}
      loading={loading || mutation.isPending}
    >
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {isError && (
        <Typography>
          Something Went Wrong
          <Button
            variant='text'
            onClick={() => {
              handleTryAgain();
            }}
          >
            Try Again
          </Button>
        </Typography>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(addVitals)}>
        <Grid container spacing={2}>
          {vitalSignData &&
            vitalSignData?.map((el, index) => (
              <Grid item xs={4} key={index}>
                <RHFTextField
                  name={el.typeName.replace(/\s+/g, '') + '_' + el.id}
                  label={el.typeName}
                  formControl={control}
                  placeholder={'Enter Value'}
                  onInput={restrict.number}
                  //   required
                  InputProps={{
                    endAdornment: (
                      <Typography variant='caption' color='text.secondary'>
                        {el.uom}
                      </Typography>
                    ),
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Typography variant='body2' color='text.secondary'>
                          {el.minVal && el.maxVal ? <>({el.minVal + '-' + el.maxVal})</> : null}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            ))}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
