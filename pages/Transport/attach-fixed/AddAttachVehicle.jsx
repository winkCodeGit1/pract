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
import { getStaffsByOrgId } from 'pages/api/master';
import { AttachedOrFixedVehicleSaveAttachedorFixedVehicle } from 'pages/api/transport';

const defaultValues = {
  dateOfAttachment: '',
  attachedUpto: '',
  remarks: '',
  vehicleMasterId: '',
  createdDatetime: '',
  registrationNumber: '',
  staffId: '',
  staffName: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
  dateOfAttachment: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
  attachedUpto: yup
    .date('Invalid')
    .nullable()
    .required('This Field is Required')
    .typeError('Required'),
});

export default function AddAttachFixed({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const orgId = 1;
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

  const { data: staffs } = useQuery({
    queryKey: ['getStaffsByOrgId', orgId],
    queryFn: getStaffsByOrgId,
  });

  const staffList = staffs?.map((el) => ({ ...el, label: el.staffName }));

  const mutation = useMutation({
    mutationFn: (req) => AttachedOrFixedVehicleSaveAttachedorFixedVehicle({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['AttachedOrFixedVehicleGetAllAttachedorFixedVehicle'],
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
      staffId: data?.staffId?.id,
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
        dateOfAttachment: new Date(row.dateOfAttachment),
        attachedUpto: new Date(row.attachedUpto),
        staffId: staffList?.find((el) => el.id === +row.staffId),
        vehicleMasterId: registrationNumberData?.find(
          (el) => el.vehicleMasterId === +row.vehicleMasterId
        ),
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData, staffs]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Attached/Fixed Vehicle`}
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
            <RHFAutoComplete
              placeholder='Attached/Fixed With (Emp.Code)'
              label='Attached/Fixed With (Emp.Code)'
              name='staffId'
              options={staffList || []}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker name='dateOfAttachment' label='Date Of Attachment' required />
          </Grid>
          <Grid item xs={12}>
            <RHFDatePicker
              placeholder='Attached Upto'
              name='attachedUpto'
              label='Attached Upto'
              minDate={watch('dateOfAttachment')}
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
