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
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { failedSaveMessage, saveMessage } from 'utils/constants';

//api
import { vehicleMasterGetAllActiveRegistrationNum } from 'pages/api/transport';
import { pollutionFileSavePollutionFile } from 'pages/api/transport';

const defaultValues = {
  vehicleMasterId: '',
  checkedOn: '',
  validUpto: '',
  billNumber: '',
  amountPaid: '',
  doneByCompany: '',
  remarks: '',
  registrationNumber: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  doneByCompany: yup.string().required('Done By Company is Required '),
  checkedOn: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddPolutionFile({ onClose, isEditMode, row }) {
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
    mutationFn: (req) => pollutionFileSavePollutionFile({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pollutionFileGetAllPollutionFile'] });
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
    console.log(data, '----data');
    const req = {
      ...data,
      id: data?.id ?? 0,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };
    console.log(req, '--req');
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        checkedOn: new Date(row.checkedOn),
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
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      title={`${isEditMode ? 'Edit' : 'Add'} Pollution File`}
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
              inputProps={{ maxLength: 11 }}
              options={registrationNumberData || []}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker name='checkedOn' label='Checked On' required />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker
              placeholder='Registration Valid'
              name='validUpto'
              label='Valid Upto'
              minDate={watch('checkedOn')}
            />
          </Grid>
          <Grid item xs={8}>
            <RHFTextField
              placeholder='Enter Bill No.'
              label='Bill No.'
              name='billNumber'
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField
              placeholder='Amount Paid'
              label='Amount Paid'
              name='amountPaid'
              // inputProps={{ maxLength: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              placeholder='Done By'
              label='Done By '
              name='doneByCompany'
              inputProps={{ maxLength: 40 }}
              required
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
