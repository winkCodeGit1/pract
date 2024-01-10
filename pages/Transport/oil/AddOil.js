/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFTextField } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
// import useAuth from 'hooks/useAuth';
import { oilSave, vehicleMasterGetAllActiveRegistrationNum } from 'pages/api/transport';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';
import * as yup from 'yup';

const defaultValues = {
  vehicleMasterId: null,
  dateOfChangeOrFilling: '',
  typeOfOil: '',
  amount: '',
  amountUsed: '',
  billNumber: '',
  dealerOrPetrolPumpAddress: '',
  meterReading: '',
  remark: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
});

export default function AddOil({ onClose, row }) {
  const queryClient = useQueryClient();
  // const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { data: registrationNumberData } = useQuery({
    queryKey: ['vehicleMasterGetAllActiveRegistrationNum'],
    queryFn: vehicleMasterGetAllActiveRegistrationNum,
  });

  const mutation = useMutation({
    mutationFn: (req) => oilSave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['oilGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const req = {
      ...data,
      remarks: data?.remark,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
      id: row ? data?.id : 0,
    };

    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      let obj = {
        ...row,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el?.vehicleMasterId === +row?.vehicleMasterId
        ),
        remark: row?.remarks,
        availabilityStatus: row?.availabilityStatus,
        dateOfChangeOrFilling: new Date(row.dateOfChangeOrFilling),
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData]);

  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Oil`}
      maxWidth='md'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              options={registrationNumberData || []}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField name='typeOfOil' placeholder='Type Of Oil' label='Type Of Oil' />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='amountUsed'
              placeholder='Amount Used'
              label='Amount Used'
              onInput={(e) => {
                restrict.decimal(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              name='amount'
              placeholder='Amount'
              label='Amount'
              onInput={(e) => {
                restrict.decimal(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField placeholder='Enter Bill No.' label='Bill No.' name='billNumber' />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              placeholder='Meter Reading'
              label='Meter Reading'
              name='meterReading'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            Date Of Change Or Filling
            <RHFDatePicker name='dateOfChangeOrFilling' placeholder='Date Of Change Or Filling' />
          </Grid>
          <Grid item xs={6}>
            Petrol Pump Address
            <RHFTextField
              name='dealerOrPetrolPumpAddress'
              placeholder='Petrol Pump Address'
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>

          <Grid item xs={12}>
            Remarks
            <RHFTextField
              name='remark'
              placeholder='Remarks'
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
