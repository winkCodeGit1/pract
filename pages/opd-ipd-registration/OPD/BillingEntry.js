/** @format */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, IconButton, TextField, InputAdornment, Autocomplete } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { AddCircleOutline } from '@mui/icons-material';
import { billGetTodayBillByOrgId, getUnbilledPatients } from 'pages/api/dashboard';
import Table from 'components/table';

import FeeSelection from './FeeSelection';
import DeleteIcon from 'assets/DeleteIcon';
const orgId = 1;
const patientCategory = 1; //OPD
export default function BillingEntry({ path }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openFeeDialog, setOpenFeeDialog] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const { data: unBilledPatientList = [] } = useQuery({
    queryKey: ['getUnbilledPatients', orgId, patientCategory],
    queryFn: getUnbilledPatients,
  });

  const { data: todaysBill, isPending: loadingBillingData } = useQuery({
    queryKey: ['billGetTodayBillByOrgId', patientCategory],
    queryFn: billGetTodayBillByOrgId,
  });
  const columns = [
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },
    {
      header: 'Bill No.',
      accessorKey: 'billNo',
    },
    {
      header: 'Date',
      accessorKey: 'createdDatetime',
    },
    {
      header: 'CR No.',
      accessorKey: 'patientMrn',
    },
    {
      header: 'Payment Mode',
      accessorKey: 'paymentModeName',
    },

    {
      header: 'Department',
      accessorKey: 'deptName',
    },
    {
      header: 'Amount',
      accessorKey: 'billAmount',
      Cell: ({ renderedCellValue }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <TextField
            value={renderedCellValue}
            sx={{
              maxWidth: '100px',
              padding: '0px',
              textAlign: 'right',
              pointerEvents: 'none',
              '& .MuiInputBase-root': { padding: 0, maxWidth: 300 },
              '& .MuiInputBase-input': {
                padding: '4px',
                pointerEvents: 'none',
              },
            }}
            inputProps={{ readOnly: true }}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CurrencyRupeeIcon fontSize='50px' />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Autocomplete
        options={unBilledPatientList}
        size='small'
        value={selectedPatient}
        onChange={(event, v) => {
          setIsEditMode(false);
          setSelectedPatient(v);
          if (v) {
            setOpenFeeDialog(true);
          }
        }}
        sx={{ maxWidth: 500, mb: 3 }}
        getOptionLabel={(option) => option?.label || ''}
        renderInput={(params) => <TextField {...params} placeholder='Select Patient' />}
        isOptionEqualToValue={(option, value) => option?.label === value?.label}
      />

      {openFeeDialog && (
        <FeeSelection
          onClose={() => {
            setSelectedPatient(null);
            setIsEditMode(false);
            setOpenFeeDialog(false);
            setIsCancel(false);
          }}
          isEditMode={isEditMode}
          patientDetail={selectedPatient}
          isCancel={isCancel}
        />
      )}
      <Table
        title={path}
        columns={columns}
        data={todaysBill || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowNumbers
        rowNumberMode='original'
        enableRowVirtualization
        loading={loadingBillingData}
        // layoutMode='grid'
        enableRowActions
        renderRowActions={({ row }) => (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
              <IconButton
                color='primary'
                onClick={() => {
                  setSelectedPatient(row?.original);
                  setOpenFeeDialog(true);
                  setIsEditMode(true);
                }}
                size='small'
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                color='error'
                size='small'
                onClick={() => {
                  setSelectedPatient(row?.original);
                  setOpenFeeDialog(true);
                  setIsEditMode(true);
                  setIsCancel(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      />
    </>
  );
}
