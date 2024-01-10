/** @format */

import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

//local
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
//api
import { vehicleMasterGetAllActiveRegistrationNum } from 'pages/api/transport';
import { workOrderSaveWorkOrder } from 'pages/api/transport';
import { restrict } from 'utils/restrict';

const defaultValues = {
  workOrderNumber: '',
  defect: '',
  partsReplaced: '',
  serviceDoneBy: '',
  dateWorkshopIn: '',
  dateWorkshopOut: '',
  billNumber: '',
  remarks: '',
  amount: '',
  vehicleMasterId: '',
  registrationNumber: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  dateWorkshopIn: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
  dateWorkshopOut: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddWorkOrder({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit, watch } = methods;
  const { data: registrationNumberData } = useQuery({
    queryKey: ['vehicleMasterGetAllActiveRegistrationNum'],
    queryFn: vehicleMasterGetAllActiveRegistrationNum,
  });

  console.log('registrationNumberData', registrationNumberData);

  const mutation = useMutation({
    mutationFn: (req) => workOrderSaveWorkOrder({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workOrderGetAllWorkOrder'],
      });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  console.log(mutation);

  const onSubmit = (data) => {
    console.log(data, '-----data');
    const req = {
      ...data,
      id: data?.id ?? 0,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };

    // if (row) {
    //   req.id = data?.id;
    // }
    console.log(req, '--req');
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        dateWorkshopIn: new Date(row.dateWorkshopIn),
        dateWorkshopOut: new Date(row.dateWorkshopOut),
        vehicleMasterId: registrationNumberData?.find(
          (el) => el.vehicleMasterId === +row.vehicleMasterId
        ),
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Work Order`}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      maxWidth='md'
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              required
              options={registrationNumberData || []}
            />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name='workOrderNumber' label='Work Order Number' />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name='defect' label='Defect' />
          </Grid>

          <Grid item xs={4}>
            <RHFTextField name='partsReplaced' label='Part(s) Replaced' />
          </Grid>

          <Grid item xs={4}>
            <RHFTextField name='serviceDoneBy' label='Service Done By' />
          </Grid>

          <Grid item xs={4}>
            <RHFTextField name='billNumber' label='Bill Number' />
          </Grid>

          <Grid item xs={4}>
            <RHFDatePicker
              placeholder='Date (Workshop In)'
              name='dateWorkshopIn'
              label='Date (Workshop In)'
              required
            />
          </Grid>

          <Grid item xs={4}>
            <RHFDatePicker
              placeholder='Date (Workshop Out)'
              name='dateWorkshopOut'
              label='Date (Workshop Out)'
              minDate={watch('dateWorkshopIn')}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField
              placeholder='Amount'
              label='Amount (In Rs)'
              name='amount'
              //   inputProps={{ maxLength: 8 }}
              onInput={(e) => {
                restrict.decimal(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            Remarks
            <RHFTextField
              name='remarks'
              placeholder='Remarks'
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{ maxLength: 600 }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
