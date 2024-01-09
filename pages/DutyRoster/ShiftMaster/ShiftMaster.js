import { yupResolver } from '@hookform/resolvers/yup';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, RHFTable, RHFTextField } from 'components/hook-form';
import { getAllShifts } from 'pages/api/DutyRoster';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosInstance from 'utils/axios';
import * as Yup from 'yup';
const defaultValues = {
  shiftName: '',
  startTime: '',
  endTime: '',
};

function ShiftMaster() {
  const NewUserSchema = Yup.object().shape({
    shiftName: Yup.string().required('Shift Name is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
  });
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const validateRequired = (value) => !!value.length;
  const [validationErrors, setValidationErrors] = useState('');
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      console.log(cell, 'cell');
      return {
        error: !!validationErrors[cell.column.id],
        helperText: validationErrors[cell.column.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.column.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.column.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };
  const columnsDef = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        header: 'Shift Name',
        accessorKey: 'shiftName',
        id: 'shiftName',
        muiTableBodyCellEditTextFieldProps: (cell) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
      {
        header: 'Start Time',
        accessorKey: 'startTime',
        muiTableBodyCellEditTextFieldProps: (cell) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'time',
          required: true,
        }),
      },
      {
        header: 'End Time',
        accessorKey: 'endTime',
        muiTableBodyCellEditTextFieldProps: (cell) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'time',
          required: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: shiftDetails = [], refetch } = useQuery({
    queryKey: ['dutyroster'],
    queryFn: getAllShifts,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (!shiftDetails) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setData(shiftDetails);
    }
  }, [shiftDetails]);

  let pageSize = 5;

  const onSubmit = async (data) => {
    var newobj = {
      ...data,
      organizationId: 2,
      activeStatus: 'active',
    };
    axiosInstance
      .post('hmis-master-services/shiftDetails/saveShiftDetails', newobj)
      .then(() => {
        toast.success('Saved Succesfully..');
        refetch();
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleSaveRowEdits = ({ exitEditingMode, values }) => {
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      exitEditingMode();
    } else {
      toast.warning('Fill Required Fields..');
    }
  };

  const handelDeleteRow = (row) => {
    // console.log(row.original.id);
    if (row.original.id != '') {
      axiosInstance
        .get('hmis-master-services/shiftDetails/delete/' + row.original.id)
        .then(() => {
          toast.success('Delete Succesfully..');
          refetch();
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid item xs={12} md={12}>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Shift Master
                </Typography>
                <Grid container xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <RHFTextField
                      label='Shift Name'
                      name='shiftName'
                      placeholder='Shift Name'
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <RHFTextField
                      label='Start Time'
                      name='startTime'
                      placeholder='Start Time'
                      type='time'
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <RHFTextField
                      label='End Time'
                      name='endTime'
                      placeholder='End Time'
                      type='time'
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack alignItems='center' sx={{ mt: 3 }}>
                      <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Save
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} md={12}>
              <RHFTable
                columns={columnsDef}
                columnData={data}
                enableStickyHeader
                enableColumnResizing
                enableColumnFilters
                enableRowVirtualization
                muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
                state={{ isLoading: isLoading }}
                layoutMode='grid'
                initialState={{
                  showGlobalFilter: true,
                  pagination: {
                    pageSize: pageSize,
                    pageIndex: 0,
                  },
                }}
                muiTablePaginationProps={{
                  rowsPerPageOptions: [5, 10, 20, { value: data.length, label: 'All' }],
                  showFirstButton: false,
                  showLastButton: false,
                  SelectProps: {
                    native: true,
                  },
                  labelRowsPerPage: 'Number of rows visible',
                }}
                enableRowActions
                enableRowNumbers
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                positionActionsColumn='last'
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                    <IconButton
                      color='secondary'
                      onClick={() => {
                        table.setEditingRow(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => {
                        // data.splice(row.index, 1);
                        // setData([...data]);
                        handelDeleteRow(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
                _
              />
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

export default ShiftMaster;
