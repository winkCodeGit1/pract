/** @format */

import { FormLabel, Grid, ToggleButton } from '@mui/material';
import { RHFAutoComplete, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { useEffect } from 'react';
import {
  vehicleAvailabilitySave,
  vehicleCategoryGetAllList,
  vehicleMasterGetAllActiveRegistrationNum,
} from 'pages/api/transport';

const defaultValues = {
  vehicleMasterId: null,
  vehCategoryId: null,
  availabilityStatus: 'Y',
  remark: '',
};

const Schema = yup.object().shape({
  vehicleMasterId: yup
    .object()
    .typeError('Registration Number is Required')
    .nullable()
    .required('Registration Number is Required'),
});

export default function AddVehicleAvail({ onClose, row }) {
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

  const { data: categoryList } = useQuery({
    queryKey: ['vehicleCategoryGetAllList'],
    queryFn: vehicleCategoryGetAllList,
  });

  const mutation = useMutation({
    mutationFn: (req) => vehicleAvailabilitySave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleAvailabilityGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const req = {
      ...data,
      remarks: data?.remark,
      vehCategoryId: data?.vehCategoryId?.id,
      vehicleMasterId: data?.vehicleMasterId?.vehicleMasterId,
    };
    if (row) {
      req.id = data?.id;
    }

    console.log(req, '----req');
    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      let obj = {
        ...row,
        vehicleMasterId: registrationNumberData?.find(
          (el) => el?.vehicleMasterId === +row?.vehicleMasterId
        ),
        vehCategoryId: categoryList?.find((el) => el?.id === +row?.vehCategoryId),
        remark: row?.remarks,
        availabilityStatus: row?.availabilityStatus,
      };
      reset({ ...obj });
    }
  }, [row, registrationNumberData, categoryList]);

  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Vehicle Availability`}
      maxWidth='md'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <RHFAutoComplete
              name='vehicleMasterId'
              placeholder='Registration Number'
              label='Registration Number'
              options={registrationNumberData || []}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <RHFAutoComplete
              placeholder='Category'
              label='Category'
              name='vehCategoryId'
              options={categoryList || []}
              inputProps={{ maxLength: 20 }}
            />
          </Grid>

          <Grid item xs={4} align='center'>
            <FormLabel>Availability Status</FormLabel>
            <RHFToggleButtonChipVariant minimumOne name='availabilityStatus' exclusive>
              <ToggleButton value='Y' color='primary' size='small'>
                Yes
              </ToggleButton>
              <ToggleButton value='N' color='primary' size='small'>
                No
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>

          <Grid item xs={4}>
            Remarks
            <RHFTextField
              name='remark'
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
