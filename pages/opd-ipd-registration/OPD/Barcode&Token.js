/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Box, IconButton } from '@mui/material';
import { Print } from '@mui/icons-material';

import Table from 'components/table';
import { billGetTodayBillByOrgId } from 'pages/api/dashboard';
import PrintBarCodeAndToken from '../PrintBarCodeAndToken';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const patientCategory = 1; //OPD
export default function BarcodeToken({ path }) {
  const [openPrint, setOpenPrint] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: todaysBill, isPending } = useQuery({
    queryKey: ['billGetTodayBillByOrgId', patientCategory],
    queryFn: billGetTodayBillByOrgId,
  });
  const columns = [
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },
    {
      header: 'CR No.',
      accessorKey: 'patientMrn',
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
      header: 'Department',
      accessorKey: 'deptName',
    },
  ];

  return (
    <>
      {openPrint && (
        <PrintBarCodeAndToken
          data={selectedRow}
          barcodePrint
          onClose={() => {
            setOpenPrint(false);
            setSelectedRow(null);
          }}
        />
      )}
      <Table
        title={path}
        columns={columns}
        data={todaysBill || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        loading={isPending}
        layoutMode='grid'
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex' }}>
            <IconButton
              color='secondary'
              onClick={() => {
                setOpenPrint(true);
                setSelectedRow(row.original);
              }}
              size='small'
            >
              <Print />
            </IconButton>
          </Box>
        )}
        _
      />
    </>
  );
}
