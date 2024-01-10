/** @format */

import { Button, Grid } from '@mui/material';
import Table from 'components/table';
import AddRadiologyBodyPart from './AddRadiologyBodyPart';
import { useState } from 'react';

export default function RadiologyBodyPart({ path }) {
  const [openRadiologyBodyPart, setOpenRadiologyBodyPart] = useState(false);
  const columnsDef = [
    {
      header: 'Radiology Body Part Name',
      accessorKey: 'id',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      id: 'status',
    },

    {
      header: 'Actions',
      accessorKey: 'actions',
      id: 'action',
    },
  ];

  return (
    <>
      {openRadiologyBodyPart && (
        <AddRadiologyBodyPart onClose={() => setOpenRadiologyBodyPart(false)} />
      )}
      <Grid container spacing={0}>
        <Grid item xs={12} textAlign='right' sx={{ mb: 2 }}>
          <Button
            variant='contained'
            size='medium'
            onClick={() => setOpenRadiologyBodyPart((ps) => !ps)}
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
