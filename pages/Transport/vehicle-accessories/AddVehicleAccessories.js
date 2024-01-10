/** @format */

import { Grid } from '@mui/material';
import { RHFAutoComplete, RHFTextField } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { useEffect } from 'react';
// import useAuth from 'hooks/useAuth';
import {
  vehicleAccessoriesDataSave,
  vehicleMasterGetAllActiveRegistrationNum,
} from 'pages/api/transport';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: null,
  dateOfChange: null,
  itemCode: '',
  quantity: '',
  billNumber: '',
  amount: '',
  remark: '',
};

export default function AddVehicleAccessories({ onClose, row }) {
  const queryClient = useQueryClient();
  // const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const { data: registrationNumberData } = useQuery({
    queryKey: ['vehicleMasterGetAllActiveRegistrationNum'],
    queryFn: vehicleMasterGetAllActiveRegistrationNum,
  });

  const mutation = useMutation({
    mutationFn: (req) => vehicleAccessoriesDataSave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleAccessoriesGetAll'] });
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
      id: row ? data?.id : 0,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
      remarks: data?.remark,
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    console.log(row);
    if (row) {
      let obj = {
        ...row,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el?.vehicleMasterId === +row?.vehicleMasterId
        ),
        dateOfChange: new Date(row?.dateOfChange),
        remark: row?.remarks,
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
      title={`${row ? 'Edit' : 'Add'} Vehicle Accessories`}
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
            />
          </Grid>
          <Grid item xs={6}>
            Item Code
            <RHFTextField name='itemCode' placeholder='Item Code' />
          </Grid>
          <Grid item xs={6}>
            Quantity
            <RHFTextField
              name='quantity'
              placeholder='Quantity'
              onInput={(e) => {
                restrict.decimal(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            Bill Number
            <RHFTextField name='billNumber' placeholder='Bill Number' />
          </Grid>
          <Grid item xs={6}>
            Amount
            <RHFTextField
              name='amount'
              placeholder='Amount'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker
              name='dateOfChange'
              placeholder='Date Of Change'
              label='Date Of Change'
              format='dd-MM-yyyy'
            />
          </Grid>
          <Grid item xs={6}>
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
