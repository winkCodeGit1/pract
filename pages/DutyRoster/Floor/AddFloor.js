import { Grid, IconButton, Typography } from '@mui/material';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import * as yup from 'yup';

import { buildingFloorSaveBuildingFloor, buildingGetAllBuildingsByOrgId } from 'pages/api/master';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveMessage, failedSaveMessage } from 'utils/constants';
import { Add, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

const defaultFloorItemsArray = {
  NoOffloors: '',
};

const defaultValues = {
  floorItm: [defaultFloorItemsArray],
  buildingName: null,
  active: true,
};
const schema_Floor = yup.object().shape({
  NoOffloors: yup.string().required('Floor Name is required'),
});
const Schema = yup.object().shape({
  floorItm: yup.array().of(schema_Floor),
  buildingName: yup
    .object()
    .typeError('Building Name is Required')
    .nullable()
    .required('Building Name is Required'),
  active: yup.boolean(),
});
export default function AddFloorType({ onClose, isEditMode, row, FloorTypeList }) {
  console.log(row, '-----row');
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit, control, setValue } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'floorItm',
  });

  const mutation = useMutation({
    mutationFn: (req) => buildingFloorSaveBuildingFloor({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllBuildingList'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    if (isEditMode) {
      const isUpdateEntry = isSimilarUpdateValidation(data);
      if (isUpdateEntry) {
        toast.error('Floor already exists.');
        return;
      } else {
        setMutate(data);
      }
    } else {
      // const isSimilarEntry = isSimilarEntryValidation(data);
      // if (isSimilarEntry) {
      //   toast.error('Floor already exists.');
      //   return;
      // } else {
      setMutate(data);
      // }
    }
  };

  const isSimilarUpdateValidation = (data) => {
    const isSimilarbuildId = FloorTypeList?.findIndex((itm) => itm.buildingId === data.buildingId);
    const buildDetail = FloorTypeList[isSimilarbuildId]['floorNames'].map((itm) =>
      itm.toLowerCase()
    );
    const selectedFloors = data['floorItm'].map((itm) => itm.NoOffloors.toLowerCase());
    const element = selectedFloors.filter((itm) => !buildDetail.includes(itm));
    const deleteRow = selectedFloors.length === buildDetail.length;

    return element.length !== 0 && deleteRow
      ? element.length !== 0
        ? false
        : true
      : deleteRow
      ? true
      : false;
  };

  // const isSimilarEntryValidation = (data) => {
  //   // const selectedFloors = data['floorItm'].map((itm) => itm.NoOffloors.toLowerCase());
  //   // const isRepeated = FloorTypeList.map((floor) => {
  //   //   let check = floor['floorNames'].some((item) => selectedFloors.includes(item.toLowerCase()));
  //   //   return check;
  //   // });
  //   // const isSimilarFloor = isRepeated.some((itm) => itm === true);
  //   return data.floorItm.length !== 0;
  // };

  const setMutate = (data) => {
    const req = {
      buildingId: data?.buildingName?.id,
      buildingName: data?.buildingName?.buildingName,
      floorNo: data?.floorItm?.length,
      floorName: null,
      active: data['active'],
      floorNames: data['floorItm'].map((itm) => itm.NoOffloors),
      floorNos: data['floorItm'].map((itm, index) => index + 1),
    };
    console.log(req, '---req');
    mutation.mutate(req);
  };

  const { data: buildingType } = useQuery({
    queryKey: ['buildingGetAllBuildingsByOrgId'],
    queryFn: buildingGetAllBuildingsByOrgId,
  });

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        buildingName: buildingType?.find((el) => el.id === +row.buildingId),
        floorItm: row.floorNames.map((itm) => ({ NoOffloors: itm })),
      };
      reset(obj);
    }
  }, [isEditMode, buildingType, row]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Floor Name`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='buildingName'
              options={buildingType}
              placeholder='Select Building'
              label='Building'
              onInputChange={() => setValue('floorItm', [defaultFloorItemsArray])}
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={11}>
                <Typography variant='body1' style={{ fontWeight: 'normal', fontSize: '14px' }}>
                  No of Floor <span style={{ color: 'red' }}>*</span>
                </Typography>
              </Grid>

              <Grid item xs={12} md={1}>
                <IconButton
                  size='small'
                  color='secondary'
                  sx={{ mt: 'auto' }}
                  onClick={() => {
                    append(defaultFloorItemsArray);
                  }}
                >
                  <Add fontSize='13px' />
                </IconButton>
              </Grid>
            </Grid>

            {fields.map((item, index) => (
              <>
                <Grid item display={'flex'} sx={{ marginBottom: '10px' }} key={item.id}>
                  <RHFTextField name={`floorItm[${index}].NoOffloors`} placeholder='No of Floor' />

                  <IconButton
                    color='error'
                    size='small'
                    onClick={() => {
                      remove(index);
                    }}
                    disabled={index === 0}
                  >
                    <Delete fontSize='13px' />
                  </IconButton>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
