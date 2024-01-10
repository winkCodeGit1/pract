/** @format */

import { Button, Grid } from '@mui/material';
import Table from 'components/table';
import AddRadiologyViewAssociBodyPart from './AddRadiologyViewAssociBodyPart';
import { useState } from 'react';

export default function RadiologyViewAssociBodyPart({ path }) {
  const [openAssociation, setOpenAssociation] = useState(false);
  const columnsDef = [
    {
      header: 'Body Part Name',
      accessorKey: 'id',
    },
    {
      header: 'Radiology Views',
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
      {openAssociation && (
        <AddRadiologyViewAssociBodyPart onClose={() => setOpenAssociation(false)} />
      )}
      <Grid container spacing={0}>
        <Grid item xs={12} textAlign='right' sx={{ mb: 2 }}>
          <Button variant='contained' size='medium' onClick={() => setOpenAssociation((ps) => !ps)}>
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
