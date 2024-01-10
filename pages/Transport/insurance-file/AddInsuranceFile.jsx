/** @format */

import { Grid, Typography } from '@mui/material';

import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//local
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { restrict } from 'utils/restrict';
import { mobileRegex } from 'utils/regex';

//api
import { insuranceFileSaveInsuranceFile } from 'pages/api/transport';
import { vehicleMasterGetAllActiveRegistrationNum } from 'pages/api/transport';

const defaultValues = {
  companyCode: '',
  companyName: '',
  companyAddress: '',
  companyCity: '',
  companyPhoneFaxNum: '',
  dateOfInsurance: null,
  validUpto: '',
  amountInsured: '',
  typesOfInsurance: '',
  ncbPercentage: '',
  premium: '',
  amountToBePaid: '',
  billNumber: '',
  remarks: '',
  vehicleMasterId: '',
  registrationNumber: '',
  createdDatetime: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  companyName: yup.string().required('Company Name is Required '),
  companyCode: yup.string().required('Company Code is Required '),
  companyPhoneFaxNum: yup
    .string()
    .required('Phone number is required')
    .matches(mobileRegex, 'Invalid Mobile No.'),
  dateOfInsurance: yup
    .date('Invalid')
    .nullable()
    .required('This field is required')
    .typeError('Required'),
  validUpto: yup
    .date('Invalid')
    .nullable()
    .required('This field is required')
    .typeError('Required'),
});

export default function AddInsuranceFile({ onClose, row }) {
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
    mutationFn: (req) => insuranceFileSaveInsuranceFile({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insuranceFileGetAllInsuranceFile'] });
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
      // id: data?.id ?? 0,
      companyCode: data?.companyCode,
      companyName: data?.companyName,
      companyAddress: data?.companyAddress,
      companyCity: data?.companyCity,
      companyPhoneFaxNum: data?.companyPhoneFaxNum,
      dateOfInsurance: data?.dateOfInsurance,
      validUpto: data?.validUpto?.toISOString(),
      amountInsured: +data?.amountInsured,
      typesOfInsurance: data?.typesOfInsurance,
      ncbPercentage: +data?.ncbPercentage,
      premium: +data?.premium,
      amountToBePaid: data?.amountToBePaid ? 0 : +data?.amountToBePaid,
      billNumber: data?.billNumber,
      remarks: data?.remarks,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };

    if (row) {
      req.id = data?.id;
    }
    mutation.mutate(req);
  };

  useEffect(() => {
    console.log(row, '--row');
    if (row) {
      let obj = {
        ...row,
        dateOfInsurance: new Date(row.dateOfInsurance),
        validUpto: new Date(row.validUpto),
        amountToBePaid: row.amountToBePaid,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el.vehicleMasterId === +row.vehicleMasterId
        ),
      };
      console.log(obj, '--obj');
      reset({ ...obj });
    }
  }, [row, registrationNumberData]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${row ? 'Edit' : 'Add'} Insurance File`}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              options={registrationNumberData || []}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name='companyCode'
              placeholder='Company Code'
              label='Company Code'
              required
              inputProps={{ maxLength: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name='companyName'
              placeholder='Company Name'
              label='Company Name'
              required
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name='companyAddress'
              placeholder='Company Address'
              label='Company Address'
              multiline
              maxRows={1}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name='companyCity'
              placeholder='Company City'
              label='Company City'
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name='companyPhoneFaxNum'
              placeholder='Company Phone/Fax Number'
              label='Company Phone/Fax Number'
              inputProps={{ maxLength: 12 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFDatePicker
              name='dateOfInsurance'
              placeholder='Date Of Insurance'
              label='Date Of Insurance'
              required
              format='dd-MM-yyyy'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <RHFDatePicker
              placeholder='Registration Valid'
              name='validUpto'
              label='Registration Valid Upto'
              minDate={watch('dateOfInsurance')}
              required
              format='dd-MM-yyyy'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='Amount Insured'
              label='Amount Insured'
              name='amountInsured'
              inputProps={{ maxLength: 7 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='Type Of Insurance'
              label='Type Of Insurance'
              name='typesOfInsurance'
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='NCB'
              label='NCB'
              name='ncbPercentage'
              onInput={(e) => {
                restrict.decimal(e);
              }}
              // inputProps={{ maxLength: 5 }}
              InputProps={{
                endAdornment: (
                  <Typography variant='body2' color='text.secondary'>
                    %
                  </Typography>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='Premium'
              label='Premium'
              name='premium'
              inputProps={{ maxLength: 6 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='Amount To be paid'
              label='Amount To be paid'
              name='amountToBePaid'
              // inputProps={{ maxLength: 6 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              placeholder='Bill Number'
              label='Bill Number'
              name='billNumber'
              inputProps={{ maxLength: 20 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
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
