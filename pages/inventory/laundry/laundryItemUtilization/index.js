import { useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import { useQuery } from '@tanstack/react-query';
import { laundryItemUtilizationGetAll } from 'pages/api/laundry';
import AddLaundryItemUtilization from './AddLaundryItemUtilization';

export default function LaundryItemUtilization({ path }) {
  const [openLaundryItemUtilization, setOpenLaundryItemUtilization] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['laundryItemUtilizationGetAll'],
    queryFn: laundryItemUtilizationGetAll,
  });

  const columns = [
    {
      header: 'Laundry Item Name',
      accessorKey: 'laundryItemName',
    },
    {
      header: 'Consumption Date',
      accessorKey: 'consumptionDate',
    },
    {
      header: 'Consumption Qty',
      accessorKey: 'consumptionQty',
    },
  ];
  return (
    <>
      {openLaundryItemUtilization && (
        <AddLaundryItemUtilization
          onClose={() => {
            setOpenLaundryItemUtilization(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Table
            title={path}
            columns={columns}
            exportData
            data={data || []}
            enableStickyHeader
            enableColumnResizing
            enableColumnFilters
            enableRowVirtualization
            loading={isPending}
            layoutMode='grid'
            renderTopToolbarCustomActions={() => (
              <Button
                color='primary'
                endIcon={<Add />}
                onClick={() => setOpenLaundryItemUtilization((ps) => !ps)}
                variant='contained'
              >
                Add New
              </Button>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
