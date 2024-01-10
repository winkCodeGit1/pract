/** @format */
// form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//@mui
import { Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFRadioGroup, RHFSwitch } from 'components/hook-form';

import {
  buildingFloorGetFloorByBuildingId,
  buildingGetAllBuildingsByOrgId,
  getStaffsByOrgId,
  sanitationManpowerSave,
} from 'pages/api/master';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const defaultValues = {
  isMultipleStaff: false,
  staffId: '',
  buildingFloorMappingId: '',
  active: true,
};

const Schema = yup.object().shape({
  isMultipleStaff: yup.boolean(),
  staffId: yup
    .object()
    .required('Required')
    .typeError('required')
    .when('isMultipleStaff', {
      is: true,
      then: () => {
        return yup.array().required('Required').typeError('required');
      },
    }),
  buildingFloorMappingId: yup
    .array()
    .required('Required')
    .typeError('required')
    .when('isMultipleStaff', {
      is: true,
      then: () => {
        return yup.object().required('Required').typeError('required');
      },
    }),
  active: yup.boolean().required('Required'),
});

const statusOption = [true, false];

export default function AddManpower({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit, watch, setValue, getValues } = methods;
  const buildId = watch('buildingName')?.id;
  const orgId = 1;

  const { data: buildingType } = useQuery({
    queryKey: ['buildingGetAllBuildingsByOrgId'],
    queryFn: buildingGetAllBuildingsByOrgId,
  });
  const { data: floorList } = useQuery({
    queryKey: ['buildingFloorGetFloorByBuildingId', buildId],
    queryFn: buildingFloorGetFloorByBuildingId,
    enabled: !!buildId,
  });

  const { data: staffs } = useQuery({
    queryKey: ['getStaffsByOrgId', orgId],
    queryFn: getStaffsByOrgId,
    staleTime: Infinity,
    gcTime: Infinity,
    placeholderData: [],
  });

  const staffList = staffs.map((el) => ({ ...el, label: el.staffName }));

  const mutation = useMutation({
    mutationFn: (req) => sanitationManpowerSave({ req, isEditMode }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['allSanitationManpower'] });
      toast.success(data || saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const [checked, setChecked] = useState(false);
  const onSubmit = (data) => {
    // console.log(data);
    // let staffExists;
    // if (isEditMode) {
    //   staffExists =
    //     (row.staffId && row.buildingFloorMappingId) ===
    //     (data.staffId && data.buildingFloorMappingId);
    // } else {
    //   staffExists = manpowerDetails?.findIndex(
    //     (e) => (e.staffId && e.buildingFloorMappingId) === (e.staffId && e.buildingFloorMappingId)
    //   );
    //   if (staffExists !== -1) {
    //     toast.error('Staff Id or BuildingFloorMappingId Already Exists');
    //     return;
    //   }
    // }

    const req = {
      id: data?.id || 1,
      staffId: data?.staffId?.id,
      buildingFloorMappingId: data?.buildingFloorMappingId?.refId,
      active: data['active'],
    };
    mutation.mutate(req);
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);

  useEffect(() => {
    reset({ ...getValues(), staffId: '', buildingFloorMappingId: '' });
    setChecked(!checked);
  }, [watch('isMultipleStaff')]);
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Manpower`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={12} spacing={2} direction={'column'}>
          <Grid item xs={12}>
            For Multiple Staff
            <RHFSwitch name='isMultipleStaff' inputProps={{ 'aria-label': 'controlled' }} />
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              multiple={!checked}
              name='staffId'
              options={staffList}
              placeholder={checked ? 'Select Staff Name' : 'Select Staff Multiple'}
              label='Staff Name'
              required
            />
          </Grid>

          <Grid item xs={12}>
            <RHFAutoComplete
              name='buildingName'
              options={buildingType || []}
              placeholder='Select Building'
              label='Building'
              onInputChange={() => {
                setValue('buildingFloorMappingId', '');
              }}
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12}>
            <RHFAutoComplete
              multiple={checked}
              name='buildingFloorMappingId'
              options={floorList}
              placeholder={!checked ? 'Select Floor' : 'Select Multiple Floors'}
              label='Floor'
              required
            />
          </Grid>
          <Grid item xs={12}></Grid>
          {isEditMode ? (
            <Grid item xs={12}>
              <RHFRadioGroup
                label=''
                name='active'
                options={statusOption}
                getOptionLabel={['Active', 'Inactive']}
              />
            </Grid>
          ) : null}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
