/** @format */

import { Grid } from '@mui/material';
import { RHFAutoComplete, RHFTextField, RHFTextarea } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
// import { useFormContext } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  vehicleMasterGetAllActiveRegistrationNum,
  majorChangeSaveMajorChange,
} from 'pages/api/transport';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: '',
  defect: '',
  partName: '',
  oldPartNumber: '',
  newPartNumber: '',
  dateWorkshopIn: '',
  dateWorkshopOut: '',
  billNumber: '',
  amount: '',
  remarks: '',
  registrationNumber: '',
  changedBy: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
});

export default function AddMajorChange({ onClose, isEditMode, row }) {
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

  const mutation = useMutation({
    mutationFn: (req) => majorChangeSaveMajorChange({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['majorChangeGetAllMajorChange'] });
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
    console.log(data);
    const req = {
      ...data,
      id: data?.id ?? 0,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };
    console.log(req, '---req');
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
      title={`${isEditMode ? 'Edit' : 'Add'} Major Change`}
      maxWidth='lg'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              options={registrationNumberData || []}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField name='defect' placeholder='Defect' label='Defect' />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='partName'
              placeholder='Part Name'
              label='Part Name'
              inputProps={{ maxLength: 150 }}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='oldPartNumber'
              placeholder='Old Part Number'
              label='Old Part Number'
            />
          </Grid>

          <Grid item xs={3}>
            <RHFTextField
              name='newPartNumber'
              placeholder='New Part Number'
              label='New Part Number'
            />
          </Grid>
          <Grid item xs={3}>
            <RHFDatePicker name='dateWorkshopIn' label='Date(Workshop In)' format='dd-MM-yyyy' />
          </Grid>
          <Grid item xs={3}>
            <RHFDatePicker
              placeholder='Date(Workshop Out)'
              name='dateWorkshopOut'
              label='Date(Workshop Out)'
              minDate={watch('dateWorkshopIn')}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='changedBy'
              placeholder='Changed By'
              label='Changed By'
              inputProps={{ maxLength: 40 }}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='billNumber'
              placeholder='Bill Number'
              label='Bill Number'
              inputProps={{ maxLength: 20 }}
            />
          </Grid>

          <Grid item xs={3}>
            <RHFTextField
              name='amount'
              placeholder='Amount'
              label='Amount'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            Remarks
            <RHFTextarea
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
