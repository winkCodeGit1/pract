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
import { damageSaveDamage } from 'pages/api/transport';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: '',
  partName: '',
  partCost: '',
  repairCost: '',
  advancePayment: '',
  refundfromInsuranceCompany: '',
  dateOfRefund: '',
  remarks: '',
  registrationNumber: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  partName: yup.string().required('Make Of Tyre is Required '),
  refundfromInsuranceCompany: yup.string().required('Refund From Company is Required '),
  dateOfRefund: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddDamage({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

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

  console.log('registrationNumberData', registrationNumberData);

  const mutation = useMutation({
    mutationFn: (req) => damageSaveDamage({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['damageGetAllDamage'] });
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
        dateOfRefund: new Date(row.dateOfRefund),
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
      title={`${isEditMode ? 'Edit' : 'Add'} Damage File`}
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

          <Grid item xs={6}>
            <RHFTextField
              name='partName'
              placeholder='Parts Name'
              label='Part(s) Name'
              inputProps={{ maxLength: 150 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='partCost'
              placeholder='Part Cost'
              label='Part Cost'
              inputProps={{ maxLength: 15 }}
              required
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              placeholder='Repair Cost'
              name='repairCost'
              label='Repair Cost'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              name='advancePayment'
              label='Advance Payment'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              placeholder='Refund From Insurance Company'
              label='Refund From Insurance Company'
              name='refundfromInsuranceCompany'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker
              placeholder='Date of Refund'
              label='Date of Refund'
              name='dateOfRefund'
              // inputProps={{ maxLength: 3 }}
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
