import {
  Grid,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import * as yup from 'yup';
// import { useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Add, Delete } from '@mui/icons-material';
import {
  buildingGetAllBuildingsByOrgId,
  wardFetchWardByBuildingId,
  bedTypeFetchBedTypeByOrgId,
  bedGetBedStatusByStatusId,
} from 'pages/api/master';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';

// api
import { bedSaveMultipleBed } from 'pages/api/master';
import { useEffect } from 'react';

const defaultBedItemsArray = {
  name: '',
  status: null,
  active: true,
};

const defaultValues = {
  bedTypeName: null,
  buildingName: null,
  buildingId: '',
  wardName: null,
  ward: '',
  status: '',
  active: true,
  bedNames: [defaultBedItemsArray],
};
// const schema_Bed = yup.object().shape({
//   bedType: yup.string().required('Floor Name is required'),
// });

const Schema = yup.object().shape({
  bedTypeName: yup.object().typeError('Bed Type is Required').nullable().required('Required'),
  buildingName: yup
    .object()
    .typeError('Building Name is Required')
    .nullable()
    .required('Building Name is Required'),
  wardName: yup.object().typeError('Ward is Required').nullable().required('Required'),
  bedNames: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Bed Name is required'),
        status: yup.object().typeError('Status is required').nullable().required('Required'),
        active: yup.boolean(),
      })
    )
    .min(1, 'Please Select at least one Bed Name.')
    .typeError('At least one bedName is required')
    .required('Please Select at least one Bed Name.'),
});

export default function AddBedMapType({ onClose, row, isEditMode }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit, control, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bedNames',
  });
  const mutation = useMutation({
    mutationFn: (req) => bedSaveMultipleBed({ req, isEditMode }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['bedFetchAllBedByOrgId'] });
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

  const { data: wardMaps } = useQuery({
    queryKey: ['wardFetchWardByBuildingId', buildId],
    queryFn: wardFetchWardByBuildingId,
    enabled: !!buildId,
  });

  const { data: bedTypes } = useQuery({
    queryKey: ['bedTypeFetchBedTypeByOrgId'],
    queryFn: bedTypeFetchBedTypeByOrgId,
  });

  const { data: statusOptions } = useQuery({
    queryKey: ['bedGetBedStatusByStatusId'],
    queryFn: bedGetBedStatusByStatusId,
  });

  const onSubmit = (data) => {
    console.log(data);
    let req = {
      bedTypeId: data.bedTypeName.id,
      wardId: data.wardName.id,
      buildingId: data.buildingName.id,
      bedNames: data.bedNames.map((e) => ({
        name: e.name,
        active: e.active,
        statusId: 5,
      })),
    };

    if (isEditMode) {
      req = {
        ...req,
        bedNames: data.bedNames.map((e) => ({
          id: e.id,
          name: e.name,
          active: e.active,
          statusId: 5,
        })),
      };
    }

    console.log(req, '-----req===');
    mutation.mutate({ ...req });
  };

  useEffect(() => {
    if (isEditMode) {
      reset({
        ...row,
        buildingName: building?.find((el) => el.id === +row.buildingId),
        wardName: wardMaps?.find((el) => el.id === +row.wardId),
        bedTypeName: bedTypes?.find((el) => el.id === +row.bedTypeId),
        bedNames: row.bedNames.map((el) => ({
          id: el.id,
          name: el.name,
          status: statusOptions?.find((e) => e.id === +el.statusTypeId),
          active: el.active,
        })),
      });
    }
  }, [isEditMode, building, wardMaps, bedTypes, row]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Bed Mapping`}
      maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <RHFAutoComplete
              name='buildingName'
              placeholder='Select Building'
              label='Building'
              options={building || []}
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12} md={4}>
            <RHFAutoComplete
              name='wardName'
              placeholder='Select ward'
              options={wardMaps || []}
              label='Ward'
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={12} md={4}>
            <RHFAutoComplete
              name='bedTypeName'
              placeholder='Select BedType'
              options={bedTypes || []}
              label='Bed Type'
              required
            ></RHFAutoComplete>
          </Grid>

          <TableContainer sx={{ pt: 2, margin: '2px' }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Bed Name <span style={{ color: 'red' }}>*</span>
                  </TableCell>
                  <TableCell>
                    Status <span style={{ color: 'red' }}>*</span>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size='small'
                      color='secondary'
                      sx={{
                        background: (theme) => theme.palette.primary.lighter,
                        color: (theme) => theme.palette.primary.dark,
                      }}
                      onClick={() => {
                        append(defaultBedItemsArray);
                      }}
                    >
                      <Add fontSize='10px' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <RHFTextField
                        name={`bedNames[${index}].name`}
                        placeholder='BedType no-1'
                        required
                        // sx={{ minWidth: '150px' }}
                      ></RHFTextField>
                    </TableCell>
                    <TableCell>
                      <RHFAutoComplete
                        name={`bedNames[${index}].status`}
                        options={statusOptions || []}
                        placeholder='Select'
                        required
                      />
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color='error'
                        size='small'
                        onClick={() => {
                          remove(index);
                        }}
                        // disabled={index === 0}
                      >
                        <Delete fontSize='13px' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
