/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import Table from 'components/table';
import IpdConsultation from './ipd-consultation';
import Label from 'components/Label';
import IPDRegistration from './ipdRegistration';

const data = [
  {
    trackingId: '123456',
    patientName: 'John Doe',
    department: '30/Male',
    dateReceived: 'B001',
    remarks: 'Regular checkup',
    type: 'Referred',
    status: 'Admitted',
  },
  {
    trackingId: '789012',
    patientName: 'Jane Smith',
    department: '25/Female',
    dateReceived: 'B002',
    remarks: 'Emergency admission',
    type: 'Emergency',
    status: 'To Be Admitted',
  },
  {
    trackingId: '789012',
    patientName: 'Jane Smith',
    department: '25/Female',
    dateReceived: 'B002',
    remarks: 'Emergency admission',
    type: 'OPD to IPD',
    status: 'To Be Discharge',
  },
];
const columnsDef = [
  {
    header: 'Reg. No.',
    accessorKey: 'trackingId',
  },
  {
    header: 'Patient Name',
    accessorKey: 'patientName',
  },
  {
    header: 'Age/Gender',
    accessorKey: 'department',
  },

  {
    header: 'Bed No.',
    accessorKey: 'dateReceived',
  },
  {
    header: 'Remarks',
    accessorKey: 'remarks',
  },
  {
    header: 'Patient Type',
    accessorKey: 'type',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    Cell: ({ row }) => (
      <Label
        variant='ghost'
        color={
          row.original.status === 'Admitted'
            ? 'success'
            : row.original.status === 'To Be Admitted'
            ? 'error'
            : 'info'
        }
      >
        {row.original.status}
      </Label>
    ),
  },
];

const PatientListIPD = ({ path }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openRegistration, setOpenRegistration] = useState(false);

  return (
    <>
      {selectedPatient && <IpdConsultation onClose={() => setSelectedPatient(false)} />}
      {openRegistration && <IPDRegistration onClose={() => setOpenRegistration(false)} />}
      <Table
        title={path}
        columns={columnsDef}
        data={data}
        enableStickyHeader
        rowNumberMode='original'
        enableRowNumbers
        enableRowActions
        muiTableBodyRowProps={({ row }) => {
          if (row.original.type === 'Emergency') {
            return {
              style: {
                fontWeight: 'bold',
                color: 'tomato',
              },
            };
          }
        }}
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            variant='contained'
            onClick={() => setOpenRegistration(true)}
          >
            Registration (IPD)
          </Button>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            sx={{ fontStyle: 'unset !important', color: 'unset !important', m: 0 }}
            key={0}
            onClick={() => {
              setSelectedPatient(row.original);
              closeMenu();
            }}
          >
            Start Ipd Consultation
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            View Details
          </MenuItem>,
        ]}
      />
    </>
  );
};

export default PatientListIPD;
