/** @format */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Typography, IconButton, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { ContentCopy } from '@mui/icons-material';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getCountries,
  getDepartment,
  getPatientByMRNId,
  getStaffListByDeptId,
} from 'pages/api/dashboard';
import { FormProvider, RHFTextField, RHFAutoComplete, RHFCheckbox } from 'components/hook-form';
import Table from 'components/table';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RHFDatePicker from 'components/hook-form/RHFDatePicker';

import { toast } from 'react-toastify';
import { registrationCreateOfflineAppointment } from 'pages/api/common';
import DepartmentChange from './DepartmentChange';
import SearchWithPatientId from './SearchWithPatientId';

const defaultValues = {
  patientName: '',
  occupation: '',
  DateOfBirth: null,
  relationName: '',
  phone: '',
  email: '',
  genderName: '',
  selectedIdOption: '',
  selectedDepartment: '',
  doctor: '',
  department: '',
  isEmergency: false,
};

const schema = Yup.object().shape({
  department: Yup.object().typeError('Required').nullable().required('Required'),
  doctor: Yup.object().typeError('Required').nullable().required('Required'),
});
export default function OPDRenewal({ path }) {
  const [data, setData] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);

  const [mrnId, setMrnId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [OpenDepartmentChange, setOpenDepartmentChange] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const departmentId = watch('department')?.id;

  const mutation = useMutation({
    mutationFn: (req) => registrationCreateOfflineAppointment({ req }),
    onSuccess: (result) => {
      toast.success(result.data);
      reset(defaultValues);
      setMrnId('');
    },
    onError: (error) => {
      if (Array?.isArray(error)) {
        error.forEach((element) => {
          toast.error(element);
        });
      } else {
        toast.error(error);
      }
    },
  });
  const onSubmit = async (data) => {
    const req = {
      deptId: data.department.id,
      organizationId: 1,
      patientId: patientData.id,
      doctorId: data.doctor.id,
      registrationDate: new Date(),
      patientName: data.patientName,
      patientTypeId: 1,
      lastUpdatedBy: 1,
      medicineStreamId: 1,
      isTransferred: false,
      isEmergency: data.isEmergency,
    };
    mutation.mutate(req);
  };

  const { data: country, isLoading: loadingData } = useQuery({
    queryKey: ['getCountries'],
    queryFn: getCountries,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: department } = useQuery({
    queryKey: ['opdRenewal', 'department', 1],
    queryFn: getDepartment,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: doctorList, isLoading } = useQuery({
    queryKey: ['getStaffListByDeptId', departmentId],
    queryFn: getStaffListByDeptId,

    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!departmentId,
  });

  const columns = [
    {
      header: 'Ayush ID',
      accessorKey: 'id',
    },
    {
      header: 'Short Name',
      accessorKey: 'shortName',
    },
    {
      header: 'country Name',
      accessorKey: 'countryName',
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: 'flex-start' },
      },
    },
    {
      header: 'Created Date Time',
      accessorKey: 'time',
    },
  ];

  const habdleGetPatient = async () => {
    try {
      if (mrnId.trim()) {
        setPatientLoading(true);
        const data = await getPatientByMRNId(mrnId);
        console.log(data, 'data');
        reset({ ...data, DateOfBirth: new Date(data.dob) });
        setPatientData(data);
      } else {
        toast.error('Please Enter CR No.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to get Patient Data');
    }
    setPatientLoading(false);
  };
  console.log(patientData, 'patientData');
  return (
    <>
      {OpenDepartmentChange && (
        <DepartmentChange
          onClose={() => {
            setOpenDepartmentChange(false);
          }}
          selectedPatient={patientData}
        />
      )}
      {openSearch && (
        <SearchWithPatientId
          onClose={() => {
            setOpenSearch(false);
          }}
          setPatientData={setPatientData}
          reset={(item) => {
            reset({ ...item, DateOfBirth: new Date(data.dob) });
          }}
        />
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 2, mb: 2 }}>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item display={'flex'}>
              <TextField
                placeholder='Enter CR No.'
                size='small'
                value={mrnId}
                onChange={(e) => setMrnId(e.target.value)}
              />
              <LoadingButton
                variant='contained'
                onClick={habdleGetPatient}
                loading={patientLoading}
              >
                Submit
              </LoadingButton>
            </Grid>

            <Grid item align='right'>
              <LoadingButton
                variant='contained'
                color='warning'
                onClick={() => {
                  setOpenSearch(true);
                }}
              >
                Search Patient Details
              </LoadingButton>
            </Grid>
          </Grid>
          <Typography variant='h6' sx={{ mb: 1, mt: 1, textDecoration: 'underline' }}>
            Patient Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField
                label='Patient Name'
                name='patientName'
                placeholder='First Name'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField
                label='Occupation'
                name='occupation'
                placeholder='occupation'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField label='Mobile No.' name='phone' placeholder='Mobile No.' disabled />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField label='Email' name='email' placeholder='Email' disabled />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <RHFDatePicker
                name='DateOfBirth'
                label='Date of Birth'
                format='dd-MM-yyyy'
                disableFuture
                sx={{ width: '100%' }}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField
                label='Nationality'
                name='nationality'
                placeholder='Nationality'
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <RHFTextField label='Gender' name='genderName' placeholder='Gender' disabled />
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ p: 1.8, mb: 2, mt: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={12} md={2}>
              <RHFAutoComplete
                name='department'
                placeholder='Select Department'
                options={department || []}
                onInputChange={() => {
                  setValue('doctor', '');
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <RHFAutoComplete
                name='doctor'
                placeholder='Select Doctor'
                options={doctorList || []}
                loading={isLoading}
              />
            </Grid>
            <Grid item>
              <RHFCheckbox name='isEmergency' label='Emergency' />
            </Grid>
            <Grid item>
              <LoadingButton
                variant='contained'
                onClick={handleSubmit(onSubmit)}
                disabled={!patientData}
                loading={mutation.isPending}
              >
                Proceed
              </LoadingButton>
            </Grid>
            <Grid item sx={{ marginLeft: 'auto' }}>
              <LoadingButton
                variant='contained'
                onClick={() => {
                  setOpenDepartmentChange(true);
                }}
                color='secondary'
                disabled={!patientData || !patientData.registrationId}
              >
                Department Change
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
        <Table
          columns={columns}
          data={country || []}
          title={path}
          enableStickyHeader
          enableColumnResizing
          enableColumnFilters
          enableRowVirtualization
          loading={loadingData}
          // layoutMode='grid'
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
                  data.splice(row.index, 1);
                  setData([...data]);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          renderTopToolbarCustomActions={() => {
            return <Typography variant='subtitle1'>Transferred Patient List</Typography>;
          }}
        />
      </FormProvider>
    </>
  );
}
