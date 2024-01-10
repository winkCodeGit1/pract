import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { restrict } from 'utils/restrict';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';

//api
import {
  buildingGetAllBuildingsByOrgId,
  buildingFloorGetFloorByBuildingId,
  wardTypeFetchAllWardType,
} from 'pages/api/master';
import { wardSaveWard } from 'pages/api/master';

//local
import { RHFTextField, RHFAutoComplete, RHFRadioGroup } from 'components/hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';

const defaultValues = {
  floorNo: '',
  floorName: '',
  buildingName: null,
  buildingId: '',
  active: true,
  floorId: '',
  noOfFloors: '',
  wardTypeId: '',
  name: '',
  wardTypeName: '',
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
  wardTypeId: yup
    .object()
    .typeError('Ward Type is Required')
    .nullable()
    .required('Ward Type is Required'),

  name: yup.string().required('Ward Name is Required'),
});

export default function AddWardMap({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit, watch, getValues } = methods;
  const { errors } = methods;

  console.log(errors);
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

  const { data: wardType } = useQuery({
    queryKey: ['wardTypeFetchAllWardType'],
    queryFn: wardTypeFetchAllWardType,
  });
  console.log(getValues());

  console.log('buildId:', buildId);
  console.log('floorOptions:', floorOptions);
  console.log('wardType:', wardType);

  const mutation = useMutation({
    mutationFn: (req) => wardSaveWard({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wardFetchWardbyOrgId'] });
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
      id: data?.id ?? 0,
      // ...data,
      buildingId: data?.buildingName?.id,
      name: data?.name,
      floorId: data?.floorName.refId,
      // floorNo: data?.floorItm?.length,
      active: data['active'],
      // buildingName: data?.buildingName?.buildingName,
      // floorName: data?.floorName?.floorName,
      wardTypeId: data?.wardTypeId?.id,
    };
    console.log(data, '----data');
    mutation.mutate(req);
  };
  console.log(row, '----row');

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        buildingName: building?.[0] || null,
        floorName: floorOptions?.[0] || null,
        wardTypeId: wardType?.find((el) => el.id === +row.wardTypeId),
      };
      reset({ ...obj });
    }
  }, [isEditMode, building, row, floorOptions, wardType]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} WardMapping`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
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
            <RHFAutoComplete
              name='wardTypeId'
              options={wardType || []}
              placeholder='Select Ward Type'
              label='Ward Type'
              required
            ></RHFAutoComplete>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='name'
              placeholder='Ward Name'
              label='Ward Name'
              onInput={(e) => {
                restrict.cplName(e);
              }}
              required
            />
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
