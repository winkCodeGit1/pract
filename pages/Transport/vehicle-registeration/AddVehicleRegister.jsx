/** @format */

import { FormLabel, Grid, ToggleButton } from '@mui/material';
import {
  RHFAutoComplete,
  RHFTextField,
  RHFTextarea,
  RHFToggleButtonChipVariant,
} from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
// import { useFormContext } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  vehicleMasterGetAllActiveRegistrationNum,
  vehicleRegistrationSave,
} from 'pages/api/transport';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

const defaultValues = {
  vehicleMasterId: null,
  registrationDate: null,
  registrationValidity: null,
  taxPaid: '',
  chequeOrCash: 'Cheque',
  amountOfChequeOrCash: '',
  chequeNo: '',
  chequeDate: null,
  bankName: '',
  issuedBy: '',
  roadTaxValidity: '',
  remark: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
});

export default function AddVehicleRegistration({ onClose, row }) {
  // const { watch } = useFormContext();
  const queryClient = useQueryClient();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit, watch } = methods;

  let paymentMode = watch('chequeOrCash') === 'Cheque' ?? true;

  const { data: registrationNumberData } = useQuery({
    queryKey: ['vehicleMasterGetAllActiveRegistrationNum'],
    queryFn: vehicleMasterGetAllActiveRegistrationNum,
  });

  const mutation = useMutation({
    mutationFn: (req) => vehicleRegistrationSave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleRegistrationGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  // console.log(mutation);

  const onSubmit = (data) => {
    console.log(data);

    const req = {
      registrationDate: data?.registrationDate,
      registrationValidUpto: data?.registrationValidity,
      taxPaid: data?.taxPaid,
      chequeOrCash: data?.chequeOrCash,
      amountOfChequeOrCash: data?.amountOfChequeOrCash,
      chequeNumber: paymentMode ? data?.chequeNo : 0,
      chequeDate: data?.chequeDate,
      bankName: data?.bankName,
      issuedBy: data?.issuedBy,
      roadTaxValidUpto: data?.roadTaxValidity,
      remarks: data?.remark,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };

    if (row) {
      req.id = data?.id;
    }

    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      paymentMode = row.chequeOrCash === 'Cheque' ?? true;
      let obj = {
        ...row,
        chequeDate: new Date(row.chequeDate),
        chequeNo: row.chequeNumber,
        createdDatetime: new Date(row.createdDatetime),
        registrationDate: new Date(row.registrationDate),
        registrationValidity: new Date(row.registrationValidUpto),
        roadTaxValidity: new Date(row.roadTaxValidUpto),
        remark: row.remarks,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el?.vehicleMasterId === +row?.vehicleMasterId
        ),
      };
      reset(obj);
    }
  }, [row, registrationNumberData]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${row ? 'Edit' : 'Add'} Vehicle Registration`}
      maxWidth='lg'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      // onReset={() => reset(defaultValues)}
      // loading={mutation.isPending}
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
            <RHFDatePicker
              name='registrationDate'
              label='Registration Date'
              format='dd-MM-yyyy'
              disableFuture
              required
            />
          </Grid>
          <Grid item xs={3}>
            <RHFDatePicker
              placeholder='Registration Valid'
              name='registrationValidity'
              label='Registration Valid Upto'
              minDate={watch('registrationDate')}
              format='dd-MM-yyyy'
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField placeholder='Tax paid' label='Tax paid' name='taxPaid' />
          </Grid>
          <Grid item xs={3} align='left'>
            <FormLabel>Select Cheque or Cash</FormLabel>
            <RHFToggleButtonChipVariant minimumOne name='chequeOrCash' exclusive>
              <ToggleButton value='Cheque' color='primary' size='small'>
                Cheque
              </ToggleButton>
              <ToggleButton value='Cash' color='primary' size='small'>
                Cash
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              placeholder=' Amount of Cheque/Cash'
              label=' Amount of Cheque/Cash'
              name='amountOfChequeOrCash'
            />
          </Grid>
          {paymentMode && (
            <Grid item xs={3}>
              <RHFTextField
                placeholder='Cheque Number'
                label='Cheque Number'
                name='chequeNo'
                onInput={(e) => {
                  restrict.number(e);
                }}
              />
            </Grid>
          )}

          <Grid item xs={3}>
            <RHFDatePicker placeholder='Cheque date' label='Cheque date' name='chequeDate' />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField placeholder='Bank name' label='Bank name' name='bankName' />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField placeholder='Issued By' label='Issued By' name='issuedBy' />
          </Grid>
          <Grid item xs={3}>
            <RHFDatePicker
              name='roadTaxValidity'
              placeholder='Road tax valid upto'
              label='Road tax valid upto'
            />
          </Grid>
          <Grid item xs={12}>
            Remarks
            <RHFTextarea name='remark' placeholder='Remarks' multiline minRows={3} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
