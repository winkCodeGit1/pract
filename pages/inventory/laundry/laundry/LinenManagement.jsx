import { Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import DeleteIcon from 'assets/DeleteIcon';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFTextField } from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import {
  LocationDeptGetAll,
  laundryItemGetAll,
  linenOrderById,
  linenProcessGetAll,
  locationMasterGetAll,
} from 'pages/api/laundry';
import { getStaffsByOrgId } from 'pages/api/master';
import { useEffect } from 'react';
import { restrict } from 'utils/restrict';
import * as yup from 'yup';

const defaultArrayObj = {
  LinenItemCode: null,
  Qty: '',
  Processed: null,
  SupplyQty: '',
};

const defaultValues = {
  linen: [defaultArrayObj],
  location: null,
  department: null,
  staff: null,
};

const commonSchema = {
  LinenItemCode: yup
    .object()
    .typeError('Linen Item Code is required')
    .nullable()
    .required('Linen Item Code is required'),
  Qty: yup.string().required('Quantity is required'),
  Processed: yup
    .object()
    .typeError('Process Status is required')
    .nullable()
    .required('Process Status is required'),
};

export default function LinenManagement({ onClose, row, type, onSubmitLinenOrder, loading }) {
  const { user } = useAuth();

  const Schema = yup.object().shape({
    linen: yup.array().of(
      yup.object().shape({
        ...(type === 'LinenSupply' && {
          SupplyQty: yup.string().required('Supply Quantity is required'),
        }),
        ...commonSchema,
      })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const TableHeads =
    type !== 'LinenSupply'
      ? ['Linen Item Code', 'Quantity', 'Process']
      : ['Linen Item Code', 'Quantity', 'Process', 'Supply Quantity'];
  const { control, handleSubmit, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'linen',
  });

  const linenItemCodeList = useQuery({
    queryKey: ['laundryItemGetAll'],
    queryFn: laundryItemGetAll,
  });

  const linenProcessList = useQuery({
    queryKey: ['linenProcessGetAll'],
    queryFn: linenProcessGetAll,
  });

  const locationMasterList = useQuery({
    queryKey: ['locationMasterGetAll'],
    queryFn: locationMasterGetAll,
  });

  const department = useQuery({
    queryKey: ['LocationDeptGetAll'],
    queryFn: LocationDeptGetAll,
  });

  const staffList = useQuery({
    queryKey: ['getStaffsByOrgId', user?.orgId],
    queryFn: getStaffsByOrgId,
  });

  const { data: getLinenOrderData } = useQuery({
    queryKey: ['linenOrderById', row?.id],
    queryFn: linenOrderById,
    enabled: !!row?.id,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (
      !linenItemCodeList.isPending &&
      !linenProcessList.isPending &&
      !locationMasterList.isPending &&
      !department.isPending &&
      !staffList.isPending
    ) {
      if (type === 'LinenOrder' && row) {
        reset({
          ...row,
          location: locationMasterList.data?.find((el) => el.id === row.collectionLocation),
          department: department.data?.find((el) => el.departId === row.deptCollectedFrom),
          staff: staffList.data?.find((el) => el.id === row.staffIdCollectedFrom),
          linen: getLinenOrderData?.map((el) => ({
            ...el,
            LinenItemCode: linenItemCodeList.data?.find((e) => e.id === el.LinenItemCode),
            Processed: linenProcessList.data?.find((e) => e.id === el.Processed),
          })),
        });
      }

      if (type === 'LinenSupply' && row) {
        reset({
          ...row,
          location: locationMasterList.data?.find((el) => el.id === row.collectionLocation),
          department: department.data?.find((el) => el.departId === row.deptCollectedFrom),
          staff: staffList.data?.find((el) => el.id === row.staffIdCollectedFrom),
          linen: getLinenOrderData?.map((el) => ({
            ...el,
            LinenItemCode: linenItemCodeList.data?.find((e) => e.id === el.LinenItemCode),
            Processed: linenProcessList.data?.find((e) => e.id === el.Processed),
          })),
        });
      }
    }
  }, [
    row,
    type,
    getLinenOrderData,
    linenItemCodeList?.data,
    linenProcessList?.data,
    locationMasterList?.data,
    department?.data,
    staffList?.data,
  ]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${!row ? 'Add' : 'Edit'} Linen ${type === 'LinenOrder' ? 'Order' : 'Supply'} `}
      maxWidth='md'
      loading={loading}
      onSubmit={handleSubmit(onSubmitLinenOrder)}
      submitText={type === 'LinenSupply' ? ' Submit' : 'Submit & Generate Receipt'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitLinenOrder)}>
        <Grid container spacing={1}>
          <Grid item xs={4} mb={2}>
            <RHFAutoComplete
              name='location'
              label='Select Location'
              options={locationMasterList.data}
              placeholder='Select Location'
            />
          </Grid>

          <Grid item xs={4} mb={2}>
            <RHFAutoComplete
              label='Select Department'
              name='department'
              options={department.data}
              placeholder='Select Department'
            />
          </Grid>

          <Grid item xs={4} mb={2}>
            <RHFAutoComplete
              label='Select Staff'
              name='staff'
              options={staffList.data}
              placeholder='Select Staff'
            />
          </Grid>
        </Grid>

        <Table size='small'>
          <TableHead>
            {TableHeads.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}

            {type !== 'LinenSupply' && (
              <TableCell>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={() => {
                    append(defaultArrayObj);
                  }}
                  variant='contained'
                >
                  <Add />
                </IconButton>
              </TableCell>
            )}
          </TableHead>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell style={{ maxWidth: 200 }}>
                  <RHFAutoComplete
                    name={`linen[${index}].LinenItemCode`}
                    options={linenItemCodeList.data}
                    placeholder='Select Linen Item Code'
                    disabled={type === 'LinenSupply' && true}
                  />
                </TableCell>

                <TableCell style={{ maxWidth: 150 }}>
                  <RHFTextField
                    name={`linen[${index}].Qty`}
                    disabled={type === 'LinenSupply' && true}
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                  />
                </TableCell>

                <TableCell style={{ maxWidth: 200 }}>
                  <RHFAutoComplete
                    name={`linen[${index}].Processed`}
                    options={linenProcessList.data}
                    placeholder='Select Processed Status'
                    disabled={type === 'LinenSupply' && true}
                  />
                </TableCell>

                {type === 'LinenSupply' && (
                  <TableCell style={{ maxWidth: 10 }}>
                    <RHFTextField
                      name={`linen[${index}].SupplyQty`}
                      onInput={(e) => {
                        restrict.number(e);
                      }}
                    />
                  </TableCell>
                )}

                {type !== 'LinenSupply' && (
                  <TableCell style={{ maxWidth: 60 }}>
                    <IconButton color='error' onClick={() => remove(index)} disabled={index === 0}>
                      <DeleteIcon disable={index === 0} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FormProvider>
    </FormWrapper>
  );
}
