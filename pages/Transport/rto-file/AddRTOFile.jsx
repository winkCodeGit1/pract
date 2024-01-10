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
import { rtoFileSaveRtoFile } from 'pages/api/transport';

const defaultValues = {
  passedOnDate: '',
  validUpto: '',
  color: '',
  vehicleMasterId: '',
  remarks: '',
  registrationNumber: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  passedOnDate: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddRTOFile({ onClose, isEditMode, row }) {
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
    mutationFn: (req) => rtoFileSaveRtoFile({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rtoFileGetAllRtoFile'] });
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
        passedOnDate: new Date(row.passedOnDate),
        validUpto: new Date(row.validUpto),
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
      title={`${isEditMode ? 'Edit' : 'Add'} RTO File`}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      maxWidth='xs'
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              required
              options={registrationNumberData || []}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker name='passedOnDate' label='Passed On' required />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker
              placeholder='Registration Valid'
              name='validUpto'
              label='Registration Valid Upto'
              minDate={watch('passedOnDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              placeholder='Enter Color'
              label='color'
              name='color'
              inputProps={{ maxLength: 20 }}
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
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
