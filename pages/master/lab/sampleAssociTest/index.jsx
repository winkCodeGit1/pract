/** @format */

import { Button, Grid } from '@mui/material';
import Table from 'components/table';
import AddSampleAssociTest from './AddSampleAssociTest';
import { useState } from 'react';

export default function SampleAssociTest({ path }) {
  const [openSampleAssociTest, setOpenSampleAssociTest] = useState(false);
  const columnsDef = [
    {
      header: 'Sample Type',
      accessorKey: 'id',
    },
    {
      header: 'Test Name ( Group Test Name )',
      accessorKey: 'id',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      id: 'action',
    },
  ];

  return (
    <>
      {openSampleAssociTest && (
        <AddSampleAssociTest onClose={() => setOpenSampleAssociTest(false)} />
      )}
      <Grid container spacing={0}>
        <Grid item xs={12} textAlign='right' sx={{ mb: 2 }}>
          <Button
            variant='contained'
            size='medium'
            onClick={() => setOpenSampleAssociTest((ps) => !ps)}
          >
            Add +
          </Button>
        </Grid>
      </Grid>
      <Table
        title={path}
        columns={columnsDef}
        data={[]}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
      />
    </>
  );
}
