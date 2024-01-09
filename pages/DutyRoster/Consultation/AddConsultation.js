import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'components/hook-form';
import * as yup from 'yup';

//Local
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { RHFAutoComplete, RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';

//api
import {
  consultationRoomSaveConsultationRoom,
  buildingGetAllBuildingsByOrgId,
  buildingFloorGetFloorByBuildingId,
} from 'pages/api/master';

const defaultValues = {
  roomName: '',
  buildingName: null,
  buildingId: '',
  floorNo: '',
  floorName: '',
  floorId: '',
  active: true,
  noOfFloors: '',
};

const Schema = yup.object().shape({
  floorName: yup
    .object()
    .shape()
    .nullable()
    .typeError('Floor Name is Required')
    .required('Floor Name is Required'),
  buildingName: yup
    .object()
    .typeError('Building Name is Required')
    .nullable()
    .required('Building Name is Required'),

  active: yup.boolean(),
  roomName: yup.string().required('Room Name is Required'),
});

export default function AddConsultationType({ onClose, floorDetail, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit, watch } = methods;
  const { errors } = methods;

  console.log(errors);

  const mutation = useMutation({
    mutationFn: (req) => consultationRoomSaveConsultationRoom({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationRoomGetAllConsultationRoomByOrg'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const buildId = watch('buildingName')?.id;

  const { data: building } = useQuery({
    queryKey: ['buildingGetAllBuildingsByOrgId'],
    queryFn: buildingGetAllBuildingsByOrgId,
  });
  const { data: floorOptions } = useQuery({
    queryKey: ['buildingFloorGetFloorByBuildingId', buildId],
    queryFn: buildingFloorGetFloorByBuildingId,
    enabled: !!buildId,
  });

  console.log('buildId:', buildId);
  console.log('floorOptions:', floorOptions);

  const onSubmit = (data) => {
    console.log(data, '----data');
    console.log(row, '----row');
    console.log(floorDetail, '----floorDetail');
    let isRoomNameExists;
    console.log(isRoomNameExists, '---isRoomNameExists');

    if (isEditMode) {
      isRoomNameExists = row.roomName === data.roomName;
    } else {
      isRoomNameExists = floorDetail?.findIndex((e) => e.roomName === data.roomName);
      if (isRoomNameExists !== -1) {
        toast.error('Room Name already exists');
        return;
      }
    }

    const req = {
      id: data?.id ?? 0,
      buildingId: data?.buildingName?.id,
      roomName: data?.roomName,
      floorId: data?.floorName.refId,
      active: data['active'],
      buildingName: data?.buildingName?.buildingName,
      floorName: data?.floorName?.floorName,
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        buildingName: building?.[0] || null,
        // floorId: row?.floorName?.find((el) => el.floorName === +row.floorName),
        floorName: floorOptions?.[0] || null,
      };
      reset(obj);
    }
  }, [isEditMode, building, row, floorOptions]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Consultation Room`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='buildingName'
              options={building || []}
              placeholder='Select Building'
              label='Building'
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12}>
            <RHFAutoComplete
              name='floorName'
              options={floorOptions || []}
              placeholder='Select Floor'
              label='Floor'
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='roomName' placeholder='Room Name' label='Room Name' required />
          </Grid>
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
