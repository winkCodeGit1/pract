import { IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';

import LabEntry from '../labResultEntry/LabEntry';
import { Print, Verified } from '@mui/icons-material';
import Report from './Report';
export default function LabtestVerification() {
  const [openCollectSample, setOpenCollectSample] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const column = [
    {
      header: 'Requisition',
      accessorKey: 'PatientId',
    },
    {
      header: 'Patient Id',
      accessorKey: 'patient',
    },
    {
      header: 'Patient Name',
      accessorKey: 'source',
    },

    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Total',
      accessorKey: 'totalTest',
    },

    {
      header: 'Remarks/Notes',
      accessorKey: 'remarks',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
  ];
  const data = [
    {
      PatientId: 'ABC12345',
      patient: 'Name 1',
      source: 'Source',
      department: 'department',
      totalTest: '10',
      remarks: 'Remark',
    },
  ];
  return (
    <>
      {openCollectSample && (
        <LabEntry
          onClose={() => setOpenCollectSample(false)}
          selectedPatient={selectedRow}
          isVerify
        />
      )}
      {openReport && (
        <Report
          onClose={() => setOpenReport(false)}
          selectedPatient={selectedRow}
          row={{ consultationId: 1 }}
        />
      )}
      <Table
        columns={column}
        data={data || []}
        enableStickHeader
        //   enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        LayoutMode='grid'
        renderRowActions={({ row }) => (
          <>
            <IconButton
              // variant='text'
              size='small'
              onClick={() => {
                setOpenCollectSample(true);
                console.log(row);
                setSelectedRow(row.original);
              }}
              color='success'
            >
              <Verified />
            </IconButton>
            <IconButton
              // variant='text'
              size='small'
              onClick={() => {
                setOpenReport(true);
                console.log(row);
                setSelectedRow(row.original);
              }}
              color='info'
            >
              <Print />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
