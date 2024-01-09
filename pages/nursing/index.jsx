/* eslint-disable no-unused-vars */
import { Add } from '@mui/icons-material';
import { Button, MenuItem } from '@mui/material';
import Label from 'components/Label';
import Table from 'components/table';
import { useState } from 'react';
import NursingCare from './nursingCare';

const fakePatients = [
  {
    trackingId: 'R12345',
    patientName: 'John Doe',
    department: '35/Male',
    dateReceived: 'B123',
    remarks: 'Fever and cough',
    status: 'Admitted',
  },
  {
    trackingId: 'R67890',
    patientName: 'Jane Smith',
    department: '45/Female',
    dateReceived: 'A456',
    remarks: 'Headache and fatigue',
    status: 'In Treatment',
  },
  // Add more fake patients as needed
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
    header: 'Status',
    accessorKey: 'status',
  },
];

const PatientList = ({ path, setSelectedPatient }) => {
  return (
    <Table
      title={path}
      columns={columnsDef}
      // loading={}
      data={fakePatients}
      enableStickyHeader
      enableColumnResizing
      rowNumberMode='original'
      enableRowNumbers
      enableRowVirtualization
      enableRowActions
      renderRowActionMenuItems={({ closeMenu, row }) => [
        <MenuItem
          sx={{ fontStyle: 'unset !important', color: 'unset !important', m: 0 }}
          key={0}
          onClick={() => {
            setSelectedPatient(true);
            closeMenu();
          }}
        >
          Start Nursing
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          Receive
        </MenuItem>,
      ]}
    />
  );
};

export default function NursingDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  return (
    <>
      {selectedPatient && <NursingCare onClose={() => setSelectedPatient(false)} />}

      <PatientList path='patient-list-nursing-module' setSelectedPatient={setSelectedPatient} />
    </>
  );
}
