/** @format */

import { Grid, FormLabel, ToggleButton } from '@mui/material';
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
  vehicleRequestSaveVehicleRequest,
} from 'pages/api/transport';
import { vehClassGetAllActiveVehClass } from 'pages/api/transport';
import { getStaffsByOrgId } from 'pages/api/master';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

const defaultValues = {
  dateOfRequest: '',
  requestNumber: '',
  vehicleClassId: '',
  vehicleMasterId: '',
  demandForDatetime: '',
  purpose: '',
  fromLocation: '',
  toLocation: '',
  requestAccepted: 'Y',
  remarks: '',
  registrationNumber: '',
  staffId: '',
  staffName: '',
  vehicleClassName: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  vehicleClassId: yup
    .object()
    .typeError('Vehicle Class is Required')
    .nullable()
    .required('Vehicle Class is Required'),
});

export default function AddRequestFile({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const orgId = 1;
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { data: classVehicle } = useQuery({
    queryKey: ['vehClassGetAllActiveVehClass'],
    queryFn: vehClassGetAllActiveVehClass,
  });

  const { data: registrationNumberData } = useQuery({
    queryKey: ['vehicleMasterGetAllActiveRegistrationNum'],
    queryFn: vehicleMasterGetAllActiveRegistrationNum,
  });

  const { data: staffs } = useQuery({
    queryKey: ['getStaffsByOrgId', orgId],
    queryFn: getStaffsByOrgId,
  });

  const staffList = staffs?.map((el) => ({ ...el, label: el.staffName }));

  const mutation = useMutation({
    mutationFn: (req) => vehicleRequestSaveVehicleRequest({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleRequestGetAllVehicleRequest'] });
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
      staffId: data?.staffId?.id,
      vehicleClassId: data?.vehicleClassId?.id,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };
    console.log(req, '---req');
    mutation.mutate(req);
  };
  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        dateOfRequest: new Date(row.dateOfRequest),
        demandForDatetime: new Date(row.demandForDatetime),
        vehicleClassId: classVehicle?.find((el) => el.id === +row.vehicleClassId),
        vehicleMasterId: registrationNumberData?.find(
          (el) => el.vehicleMasterId === +row.vehicleMasterId
        ),
        staffId: staffList?.find((el) => el.id === +row.staffId),
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData, staffs, classVehicle]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Vehicle Request`}
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
              name='staffId'
              placeholder='Employee Code'
              label='Employee Code'
              options={staffList || []}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFDatePicker
              name='dateOfRequest'
              placeholder='Date Of Request'
              label='Date Of Request'
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='requestNumber'
              placeholder='Request Number'
              label='Request Number'
              inputProps={{ maxLength: 150 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFAutoComplete
              name='vehicleClassId'
              placeholder='Vehicle Class'
              label='Vehicle Class'
              options={classVehicle || []}
              required
            />
          </Grid>

          <Grid item xs={3}>
            <RHFDatePicker
              name='demandForDatetime'
              placeholder='Demand For(Date & Time)'
              label='Demand For(Date & Time)'
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='purpose'
              label='Purpose'
              placeholder='Purpose'
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={3}>
            <RHFTextField
              placeholder='Location (From)'
              name='fromLocation'
              label='Location (From)'
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField
              name='toLocation'
              placeholder='Location (To)'
              label='Location (To)'
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormLabel>Request Accepted</FormLabel>
            <RHFToggleButtonChipVariant minimumOne name='requestAccepted' exclusive>
              <ToggleButton value='Y' color='primary' size='small'>
                Yes
              </ToggleButton>
              <ToggleButton value='N' color='primary' size='small'>
                No
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>

          <Grid item xs={3}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              required
              options={registrationNumberData || []}
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
