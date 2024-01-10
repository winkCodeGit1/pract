import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

//Local
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import { failedSaveMessage, saveMessage } from 'utils/constants';

//api
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import {
  buildingFloorGetFloorByBuildingId,
  buildingGetAllBuildingsByOrgId,
  garbageCollectionSave,
  garbageCollectionSelectedStaffs,
  getStaffsByBuldingFloorMappingId,
  sanitationAllActiveCategories,
} from 'pages/api/master';
import { generateDateFormat } from 'utils/date';

const defaultValues = {
  id: 0,
  category: '',
  cleanDate: '',
  manPower: '',
  buildingFloorMapping: '',
  building: '',
};

const Schema = yup.object().shape({
  category: yup.object().required('Required').typeError('Required'),
  cleanDate: yup.date().required('Required').typeError('Required'),
  building: yup.object().required('Required').typeError('Required'),
  buildingFloorMapping: yup.object().required('Required').typeError('Required'),
  manPower: yup.array().required('Required').typeError('Required'),
});

function AddgarbageCollection({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit, watch, setValue } = methods;

  const buildId = watch('building')?.id;
  const buildingFloormappingId = watch('buildingFloorMapping')?.refId;

  const mutation = useMutation({
    mutationFn: (req) => garbageCollectionSave({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garbageCollectionGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const { data: sanitationCategories = [] } = useQuery({
    queryKey: ['sanitationAllActiveCategories'],
    queryFn: sanitationAllActiveCategories,
  });

  const { data: buildingList } = useQuery({
    queryKey: ['buildingGetAllBuildingsByOrgId'],
    queryFn: buildingGetAllBuildingsByOrgId,
  });
  const { data: floorList } = useQuery({
    queryKey: ['buildingFloorGetFloorByBuildingId', buildId],
    queryFn: buildingFloorGetFloorByBuildingId,
    enabled: !!buildId,
  });

  const { data: manpowerStaffs = [] } = useQuery({
    queryKey: ['getStaffsByBuldingFloorMappingId', buildingFloormappingId],
    queryFn: getStaffsByBuldingFloorMappingId,
    enabled: !!buildingFloormappingId,
  });
  const manpowerStaffList = manpowerStaffs?.map((el) => ({
    ...el,
    label: el.staffName,
  }));

  const onSubmit = async (data) => {
    const req = {
      cleanDate: data.cleanDate,
      categoryId: +data?.category?.id,
      manPowerIds: data?.manPower?.map((obj) => parseInt(obj.manpowerId)),
    };
    mutation.mutate(req);
    console.log(row, 'row');
  };

  var formatedDate = generateDateFormat(new Date(row?.cleanDate)) ?? null;
  console.log(formatedDate);
  const { data: selectedStaff = [] } = useQuery({
    queryKey: ['garbageCollectionSelectedStaffs', formatedDate, row?.category?.id],
    queryFn: garbageCollectionSelectedStaffs,
    enabled: isEditMode,
  });

  useEffect(() => {
    if (isEditMode) {
      if (selectedStaff.length > 0) {
        let obj = {
          ...row,
          cleanDate: new Date(row.cleanDate),
          buildingFloorMapping: row.manPower.buildingFloorMapping,
          building: row.manPower.buildingFloorMapping.building,
          manPower: selectedStaff,
        };
        reset({ ...obj });
      }
    }
  }, [isEditMode, selectedStaff]);

  return (
    <>
      <FormWrapper
        onClose={onClose}
        title={`${isEditMode ? 'Edit' : 'Add'} Garbage Collection`}
        maxWidth='sm'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset(defaultValues)}
        loading={mutation.isPending}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <RHFDatePicker
                  name='cleanDate'
                  placeholder='Clean Date'
                  label='Clean Date'
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <RHFAutoComplete
                  name='category'
                  options={sanitationCategories || []}
                  getOptionLabel={(option) => option.categoryName}
                  required
                  label='Category Name'
                  placeholder='Select Category'
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <RHFAutoComplete
                  name='building'
                  options={buildingList || []}
                  getOptionLabel={(option) => option.buildingName}
                  placeholder='Select Building'
                  label='Building'
                  onInputChange={() => {
                    setValue('buildingFloorMapping', '');
                    setValue('manPower', '');
                  }}
                  required
                ></RHFAutoComplete>
              </Grid>

              <Grid item xs={6}>
                <RHFAutoComplete
                  name='buildingFloorMapping'
                  options={floorList || []}
                  getOptionLabel={(option) => option.floorName}
                  placeholder='Select Floor'
                  label='Floor'
                  required
                  onInputChange={() => {
                    setValue('manPower', '');
                  }}
                ></RHFAutoComplete>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <RHFAutoComplete
                multiple
                name='manPower'
                getOptionLabel={(option) => option.staffName}
                options={manpowerStaffList || []}
                required
                label='Man Power'
                placeholder='Select manpower'
              />
            </Grid>
          </Grid>
        </FormProvider>
      </FormWrapper>
    </>
  );
}

export default AddgarbageCollection;
