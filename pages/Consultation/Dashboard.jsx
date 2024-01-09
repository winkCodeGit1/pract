/* eslint-disable no-unused-vars */
// import React from 'react';

import { ArrowRight } from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Table, { tableOption } from 'components/table';
import { useMaterialReactTable } from 'material-react-table';
import { billGetTodayBillByOrgId } from 'pages/api/dashboard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useConsultationStore from 'stores/useConsulatationStore';
import { calculateAge } from 'utils/date';

const patientCategory = 1; //OPD
export default function ConsultationDashboard() {
  const navigate = useNavigate();

  const setSelectedPatient = useConsultationStore((store) => store.setSelectedPatient);

  const columns = [
    {
      header: 'Token No.',
      accessorKey: 'tokenNumber',
    },
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },
    {
      header: 'Department',
      accessorKey: 'deptName',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
  ];
  const [showMsg, setShowMsg] = useState(false);
  const { data: todaysBill, isLoading } = useQuery({
    queryKey: ['billGetTodayBillByOrgId', patientCategory],
    queryFn: billGetTodayBillByOrgId,
  });

  const tableRef = useMaterialReactTable({
    ...tableOption,
    columns,
    data: todaysBill || [],
    state: {
      showSkeletons: isLoading,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableRowActions: true,
    renderTopToolbarCustomActions: () => {
      return <Typography variant='subtitle1'>Todays Consultant Patient</Typography>;
    },
    muiTableBodyRowProps:
      todaysBill?.length > 0
        ? ({ row }) => ({
            //add onClick to row to select upon clicking anywhere in the row
            onClick: row.getToggleSelectedHandler(),
            sx: { cursor: 'pointer' },
          })
        : undefined,
  });

  const selectedRows = tableRef.getSelectedRowModel()?.rows;
  console.log(selectedRows);
  function checkAndShowWelcome() {
    // Get the current date
    var currentDate = new Date().toLocaleDateString();

    // Check if the last login date is the same as the current date
    var lastLoginDate = localStorage.getItem('lastLoginDate');
    if (lastLoginDate !== currentDate) {
      // Show the welcome message
      setShowMsg(true);

      // Update the last login date in local storage
      localStorage.setItem('lastLoginDate', currentDate);
    }
  }
  useEffect(() => {
    checkAndShowWelcome();
  }, []);

  return (
    <>
      <Typography sx={{ mt: 1, pl: 2 }}>
        {showMsg && (
          <>
            Welcome <b>Dr. Preethi Suresh</b>, you have <b>24</b> appointments for today!
          </>
        )}
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} md={8} sx={{ p: 2, pl: 2 }}>
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            gap={2}
            flexWrap='wrap'
            sx={{
              '.MuiCardContent-root': {
                width: '180px',
                padding: '10px 0px',
                paddingBottom: '10px',
              },
              marginBottom: '30px',
            }}
          >
            <Card>
              <CardContent
                sx={{
                  textAlign: 'center',

                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <Typography variant='h3'>100</Typography>
                <Typography variant='body2'>Today Registered Patient</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography align='center' variant='h3'>
                  100
                </Typography>
                <Typography align='center' variant='body2'>
                  Old Renewal
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography align='center' variant='h3'>
                  100
                </Typography>
                <Typography align='center' variant='body2'>
                  New Patient
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography align='center' variant='h3'>
                  10
                </Typography>
                <Typography align='center' variant='body2'>
                  Pending Consultation
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography align='center' variant='h3'>
                  90
                </Typography>
                <Typography align='center' variant='body2'>
                  Completed Consultation
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <Table tableRef={tableRef} />
        </Grid>
        <Grid item md={4}>
          <Card sx={{ mt: 2, p: 1 }}>
            <CardContent>
              <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
                {selectedRows[0]?.original?.patientName[0] || 'N/A'}
              </Avatar>
              <Typography align='center'>
                <b>{selectedRows[0]?.original?.patientName || 'N/A'}</b>
                <br /> {selectedRows[0]?.original?.deptName || 'N/A'}
              </Typography>
              <Divider sx={{ mt: 1, mb: 0.3 }} />
              <Stack flexDirection='row' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='body1'>CR. No.</Typography>
                <Typography variant='subtitle1'>
                  {selectedRows[0]?.original?.patientMrn || 'N/A'}
                </Typography>
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='body1'>Gender</Typography>
                <Typography variant='subtitle1'>
                  {selectedRows[0]?.original?.gender || 'N/A'}
                </Typography>
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='body1'>Age</Typography>
                <Typography variant='subtitle1'>
                  {calculateAge(selectedRows[0]?.original?.dob)}
                </Typography>
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='body1'>Blood Group</Typography>
                <Typography variant='subtitle1'>
                  {selectedRows[0]?.original?.bloodGroup || 'N/A'}
                </Typography>
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='body1'>Mobile No.</Typography>
                <Typography variant='subtitle1'>
                  {selectedRows[0]?.original?.phone || 'N/A'}
                </Typography>
              </Stack>
              <Divider />
              <Button
                fullWidth
                variant='contained'
                sx={{ mb: 2, mt: 2, justifyContent: 'space-between' }}
                endIcon={<ArrowRight />}
                disabled={selectedRows.length === 0}
                onClick={() => {
                  setSelectedPatient(selectedRows[0]?.original);

                  navigate('/opd-consultation/consultation');
                }}
              >
                Start New Consultation
              </Button>
              <Button
                fullWidth
                variant='contained'
                sx={{
                  mb: 2,
                  backgroundColor: 'secondary.lighter',
                  color: 'secondary.dark',
                  boxShadow: 'none',
                  justifyContent: 'space-between',
                  '&:hover': { backgroundColor: 'secondary.lighter', color: 'secondary.dark' },
                }}
                endIcon={<ArrowRight />}
                disabled={selectedRows.length === 0}
              >
                Previous Consultation
              </Button>
              <Button
                fullWidth
                variant='contained'
                sx={{
                  mb: 2,
                  backgroundColor: 'warning.lighter',
                  color: 'warning.dark',
                  boxShadow: 'none',
                  justifyContent: 'space-between',
                  '&:hover': { backgroundColor: 'warning.lighter', color: 'warning.dark' },
                }}
                endIcon={<ArrowRight />}
                disabled={selectedRows.length === 0}
              >
                Transfer To IPD
              </Button>
              <Button
                fullWidth
                variant='contained'
                sx={{
                  mb: 2,
                  backgroundColor: 'info.lighter',
                  color: 'info.dark',
                  boxShadow: 'none',
                  justifyContent: 'space-between',
                  '&:hover': { backgroundColor: 'info.lighter', color: 'info.dark' },
                }}
                endIcon={<ArrowRight />}
                disabled={selectedRows.length === 0}
              >
                Patient History
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
