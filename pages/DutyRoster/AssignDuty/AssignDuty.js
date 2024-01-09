/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormProvider } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import Table from 'components/table';
import { getAllShifts, getDepartment, getRole, getStaff } from 'pages/api/DutyRoster';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import axiosInstance from 'utils/axios';
import * as yup from 'yup';
import RHFSelect from '../../../components/hook-form/RHFSelect';
import { viewDateFormat } from 'utils/date';

// let pageSize = 5;
const defaultValues = {
  roleName: '',
  staffName: '',
  departmentName: '',
  shiftName: '',
  startDate: null,
};

const NewUserSchema = yup.object().shape({
  roleId: yup.string().required('Role is required'),
  staffName: yup.string().required('This field is required'),
  shortName: yup.string().required('This field is required'),
  range: yup.string().required('This field is required'),
  shiftName: yup.string().required('This field is required'),
  // date: Yup.string().required('This field is required'),
  startDate: yup.string().required('This field is required'),
});

function AssignDuty({ path }) {
  // const classes= useStyles();
  const [data, setData] = useState([]);
  const [isPending, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const validateRequired = (value) => !!value.length;
  const [validationErrors, setValidationErrors] = useState('');
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
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

  const { data: departmentDetails } = useQuery({
    queryKey: ['dutyroster', 'department'],
    queryFn: getDepartment,
    placeholderData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: roleList } = useQuery({
    queryKey: ['dutyroster', 'role'],
    queryFn: getRole,
    placeholderData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: staffList } = useQuery({
    queryKey: ['dutyroster', 'staff'],
    queryFn: getStaff,
    placeholderData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: shiftList } = useQuery({
    queryKey: ['dutyroster', 'shift'],
    queryFn: getAllShifts,
    placeholderData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (!departmentDetails && !roleList && !staffList && !shiftList) {
      setIsLoading(true);
    } else {
      setIsLoading(false);

      setData(departmentDetails);
      setData(roleList);
      setData(staffList);
      setData(shiftList);
    }
  }, [departmentDetails, roleList, staffList, shiftList]);

  const onSubmit = async (data) => {
    var newData = {
      ...data,
      roleId: 2,
      staffId: 1,
      duration: 12,
      durationTypeId: 1,
      shiftId: 1,
      Time: '',
      startTime: '',
      endTime: '',
      endDate: '',
      weekDuration: '',
      startDate: viewDateFormat(data.startDate),
    };
    console.log(newData);
    // axiosInstance
    //   .post('hmis-master-services/dutyRoster/saveDutyRoster', newData)
    //   .then((res) => {
    //     console.log('jdhgjfd', res);
    //     toast.success('Saved Succesfully..');
    //     reset();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error(error.message);
    //   });
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };
  const columnsDef = [
    // {
    //   header: 'Id',
    //   accessorKey: 'id',
    //   enableColumnOrdering: false,
    //   enableEditing: false, //disable editing on this column
    //   enableSorting: false,
    // },
    {
      header: 'Staff Name',
      accessorKey: 'staffName',
      id: 'staffName',
      muiTableBodyCellEditTextFieldProps: (cell) => ({
        ...getCommonEditTextFieldProps(cell),
        required: true,
      }),
    },
    {
      header: 'Department',
      accessorKey: 'shortName',
      id: 'shortName',
      muiTableBodyCellEditTextFieldProps: (cell) => ({
        ...getCommonEditTextFieldProps(cell),
        required: true,
      }),
    },
    {
      header: 'Created Date Time',
      accessorKey: 'time',
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
    },
  ];

  const handleSaveRowEdits = ({ exitEditingMode, values }) => {
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      exitEditingMode();
    } else {
      toast.warning('Fill Required Fields..');
    }
  };

  return (
    <>
      <div>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Assign Duty
                </Typography>
                <Typography padding={2}>
                  <span style={{ color: 'red' }}>*</span> before adding any element please see table
                </Typography>
                <Grid
                  container
                  xs={12}
                  padding={2}
                  spacing={2}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Grid
                    item
                    container
                    xs={12}
                    alignItems='center'
                    justifyContent='center'
                    spacing={2}
                  >
                    <Grid item xs={4}>
                      <RHFSelect name='roleId' label='Role' placeholder='Role' required>
                        <MenuItem value=''>Select Role</MenuItem>
                        {roleList.map((option) => (
                          <MenuItem key={option.value} value={option.roleName}>
                            {option.roleName}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                    <Grid item xs={4}>
                      <RHFSelect
                        name='staffName'
                        label='StaffName'
                        placeholder='StaffName'
                        required
                      >
                        <MenuItem value=''>Select StaffName</MenuItem>
                        {[
                          { label: 'Dr.Suhas', value: 1 },
                          { label: 'Seshadri', value: 2 },
                          { label: 'Sudharsana', value: 3 },
                        ].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                    <Grid item xs={4}>
                      <RHFSelect
                        name='shortName'
                        label='Department'
                        placeholder='Department'
                        required
                      >
                        <MenuItem value=''>Select Department</MenuItem>
                        {departmentDetails.map((option) => (
                          <MenuItem key={option.value} value={option.shortName}>
                            {option.shortName}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} spacing={2}>
                    <Grid item xs={4}>
                      <RHFSelect name='range' label='Range' placeholder='Range' required>
                        <MenuItem value=''>Select Range</MenuItem>
                        {[
                          { label: 'Day', value: 1 },
                          { label: 'Week', value: 2 },
                          { label: 'Month', value: 3 },
                        ].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                    <Grid item xs={4}>
                      <RHFSelect name='shiftName' label='Shift' placeholder='Shift' required>
                        <MenuItem value=''>Select Shift</MenuItem>
                        {shiftList.map((option) => (
                          <MenuItem key={option.shiftId} value={option.shiftName}>
                            {option.shiftName}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                    {/* <Grid item xs={4} >
                      <RHFDatePicker
                        name='date'
                        label='Date'
                        format='dd-MM-yyyy'
                        required
                      />
                    </Grid> */}
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                      <RHFDatePicker
                        name='startDate'
                        label='Date'
                        format='dd-MM-yyyy'
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent='center' spacing={2} sx={{ m: 1 }}>
                  <Grid item>
                    <Button
                      align='center'
                      type='submit'
                      color='primary'
                      variant='contained'
                      loading={isSubmitting}
                    >
                      Apply DutyRoster
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      align='center'
                      color='primary'
                      type='submit'
                      variant='contained'
                      loading={isSubmitting}
                    // onClick={handleSubmit(executeSubmit)}
                    >
                      Add Shift
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <Grid container sx={12} spacing={10}>
                  <Grid item xs={12}>
                    {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Table
                          title={path}
                          columns={columnsDef}
                          data={data}
                          enableStickyHeader
                          enableColumnResizing
                          enableColumnFilters
                          enableRowVirtualization
                          onEditingRowSave={handleSaveRowEdits}
                          onEditingRowCancel={handleCancelRowEdits}
                          loading={isPending}
                          layoutMode='grid'
                          enableRowActions
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
                                  // handelDeleteRow(row);
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
                    {/* </FormProvider> */}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </div>
    </>
  );
}

export default AssignDuty;
