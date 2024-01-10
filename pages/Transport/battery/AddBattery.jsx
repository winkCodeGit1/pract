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
import { batterySaveBattery, vehicleMasterGetAllActiveRegistrationNum } from 'pages/api/transport';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: '',
  dateOfChangeRecharge: '',
  batteryNumber: '',
  voltage: '',
  billNumber: '',
  amount: '',
  remarks: '',
  registrationNumber: '',
};

export default function AddBatteryDetails({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  //   const { user } = useAuth();

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
    mutationFn: (req) => batterySaveBattery({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batteryGetAllBattery'] });
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
    };
    console.log(req, '--req');
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el.vehicleMasterId === +row.vehicleMasterId
        ),
        dateOfChangeRecharge: new Date(row.dateOfChangeRecharge),
        // remarks: row?.remarks,
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData]);

  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      title={`${isEditMode ? 'Edit' : 'Add'} Battery`}
      maxWidth='md'
      loading={mutation.isPending}
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
            Battery Number
            <RHFTextField name='batteryNumber' placeholder='Battery Number' />
          </Grid>
          <Grid item xs={6}>
            Date Of Change/ Recharge
            <RHFDatePicker
              name='dateOfChangeRecharge'
              format='dd-MM-yyyy'
              placeholder='Date Of Change/ Recharge'
            />
          </Grid>
          <Grid item xs={6}>
            Voltage
            <RHFTextField
              name='voltage'
              placeholder='Voltage'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name='billNumber' placeholder='Bill Number' label='Bill Number' />
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
            Remarks
            <RHFTextField
              name='remarks'
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
