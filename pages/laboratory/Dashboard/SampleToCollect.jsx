import { Button, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import CollectSample from '../collectSample';
import { useQuery } from '@tanstack/react-query';
import { labOrderGetBacklogLabOrderDetail } from 'pages/api/lab';
import { Search } from '@mui/icons-material';
import AdvanceSearch from 'components/AdvanceSearch';
import { getPaymentModeGetallPaymentModes } from 'api';

const advanceSearchParams = [
  { label: 'Patient Name', type: 'text', required: true },
  { label: 'Mobile No.', type: 'text', required: true },
  { label: 'Department', type: 'select', required: true },
  { label: 'Date', type: 'dateRange', required: true },
];
export default function SampleToCollect({ path }) {
  const [selectedType, setSelectedType] = useState('today');
  const [openCollectSample, setOpenCollectSample] = useState(false);
  const [openAdvance, setOpenAdvance] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const column = [
    {
      header: 'Patient ID',
      accessorKey: 'patientId',
    },
    {
      header: 'Patient Name',
      accessorKey: 'patientName',
    },
    // {
    //   header: 'Source',
    //   accessorKey: 'source',
    // },
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Total Tests',
      accessorKey: 'totalTests',
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['labOrderGetBacklogLabOrderDetail', selectedType],
    queryFn: labOrderGetBacklogLabOrderDetail,
    enabled: !!selectedType,
  });
  return (
    <>
      {openCollectSample && (
        <CollectSample onClose={() => setOpenCollectSample(false)} selectedPatient={selectedRow} />
      )}
      {openAdvance && (
        <AdvanceSearch
          formFields={advanceSearchParams}
          onClose={() => {
            setOpenAdvance(false);
          }}
          queryFn={getPaymentModeGetallPaymentModes}
        />
      )}
      <Table
        title={path}
        columns={column}
        data={data || []}
        enableStickHeader
        //   enableColumnResizing
        loading={isLoading}
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        LayoutMode='grid'
        displayColumnDefOptions={{
          'mrt-row-actions': {
            size: 100, //set custom width
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
        }}
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Paper
                elevation={1}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,

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
              <Button
                variant='outlined'
                color='primary'
                startIcon={<Search />}
                onClick={() => {
                  setOpenAdvance(true);
                }}
              >
                Advance Search
              </Button>
            </div>
          );
        }}
        renderRowActions={({ row }) => (
          <Button
            // variant='text'
            size='small'
            onClick={() => {
              setOpenCollectSample(true);
              setSelectedRow(row.original);
            }}
          >
            Collect Sample
          </Button>
        )}
      />
    </>
  );
}
