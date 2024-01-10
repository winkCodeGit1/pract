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
import { tyresSaveTyres } from 'pages/api/transport';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: '',
  makeOfTyre: '',
  dateOfIssue: '',
  dateOfReplacement: '',
  billNumber: '',
  amount: '',
  remarks: '',
  registrationNumber: '',
  tyreNumber: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  makeOfTyre: yup.string().required('Make Of Tyre is Required '),
  dateOfIssue: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddTyres({ onClose, isEditMode, row }) {
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
    mutationFn: (req) => tyresSaveTyres({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tyresGetAllTyres'] });
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
        dateOfIssue: new Date(row.dateOfIssue),
        dateOfReplacement: new Date(row.dateOfReplacement),
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
      title={`${isEditMode ? 'Edit' : 'Add'} Tyres`}
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
            <RHFTextField
              name='makeOfTyre'
              placeholder='Make Of Tyre'
              label='Make Of Tyre'
              inputProps={{ maxLength: 40 }}
              options={registrationNumberData || []}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='tyreNumber'
              placeholder='Tyre Number'
              label='Tyre Number'
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          <Grid item xs={6}>
            <RHFDatePicker name='dateOfIssue' label='Date Of Issue' required />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker
              placeholder='Date Of Replacement'
              name='dateOfReplacement'
              label='Date Of Replacement'
              minDate={watch('dateOfIssue')}
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
              placeholder='Amount'
              label='Amount(In Rs)'
              name='amount'
              // inputProps={{ maxLength: 3 }}
              onInput={(e) => {
                restrict.number(e);
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
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
