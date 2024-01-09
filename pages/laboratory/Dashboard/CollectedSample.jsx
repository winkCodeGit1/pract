import { FormControlLabel, IconButton, Paper, Radio, RadioGroup } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';

import BiotechIcon from '@mui/icons-material/Biotech';
import LabEntry from '../labResultEntry/LabEntry';
import CollectSample from '../collectSample';
import { collectedLabOrderAllDetail } from 'pages/api/lab';
import { useQuery } from '@tanstack/react-query';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export default function CollectedSample({ isLabEntry }) {
  const [selectedType, setSelectedType] = useState('today');
  const [openCollectSample, setOpenCollectSample] = useState(false);
  const [openSampleCollection, setOpenSampleCollection] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const column = [
    {
      header: 'Requisition',
      accessorKey: 'requisition',
    },
    {
      header: 'Patient Id',
      accessorKey: 'patientId',
      size: 120,
    },
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },

    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Total',
      accessorKey: 'totalTest',
      size: 120,
    },
    {
      header: 'Collected Sample',
      accessorKey: 'totalCollectedSample',
      size: 120,
    },
    {
      header: 'Pending Sample',
      accessorKey: 'totalPendingSample',
      size: 120,
    },

    {
      header: 'Collected Date',
      accessorKey: 'collectedDate',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      size: 120,
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['collectedLabOrderAllDetail', selectedType === 'today' ? '0' : '1'],
    queryFn: collectedLabOrderAllDetail,
    enabled: !!selectedType,
  });

  return (
    <>
      {openCollectSample && (
        <LabEntry onClose={() => setOpenCollectSample(false)} selectedPatient={selectedRow} />
      )}
      {openSampleCollection && (
        <CollectSample
          onClose={() => setOpenSampleCollection(false)}
          selectedPatient={selectedRow}
          isEditMode={isEditMode}
        />
      )}
      <Table
        columns={column}
        data={data || []}
        enableStickHeader
        //   enableColumnResizing
        enableColumnFilters
        loading={isLoading}
        enableRowVirtualization
        enableRowActions
        LayoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <Paper
              elevation={1}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                width: 'max-content',
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                }}
              >
                <FormControlLabel value='today' control={<Radio size='small' />} label='Todays' />
                <FormControlLabel
                  value='backlog'
                  control={<Radio size='small' />}
                  label='Backlog'
                />
              </RadioGroup>
            </Paper>
          );
        }}
        renderRowActions={({ row }) => (
          <>
            {isLabEntry ? (
              <IconButton
                // variant='text'
                size='small'
                onClick={() => {
                  setOpenCollectSample(true);
                  console.log(row);
                  setSelectedRow(row.original);
                }}
                color='secondary'
              >
                <BiotechIcon />
              </IconButton>
            ) : (
              <IconButton
                // variant='text'
                size='small'
                onClick={() => {
                  setOpenSampleCollection(true);
                  setIsEditMode(true);
                  setSelectedRow(row.original);
                }}
              >
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
            )}
          </>
        )}
      />
    </>
  );
}
