import { useState } from 'react';

import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import Table from 'components/table';

import AddLinenWashingAndDryCleaning from './AddLinenWashingAndDryCleaning';
import { useQuery } from '@tanstack/react-query';
import { washingDryCleaningLinenGetAll } from 'pages/api/laundry';

export default function LinenWashingAndDryCleaning({ path }) {
  const [openLinenWashingDryCleaning, setOpenLinenWashingDryCleaning] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['washingDryCleaningLinenGetAll'],
    queryFn: washingDryCleaningLinenGetAll,
  });

  const columns = [
    {
      header: 'Linen Item Name',
      accessorKey: 'linenItemName',
      size: 200,
    },
    {
      header: 'Linen Process Name',
      accessorKey: 'linenProcessName',
      size: 230,
    },
    {
      header: 'Operator Employee Name',
      accessorKey: 'operatorEmployeeName',
      size: 300,
    },
    {
      header: 'Quantity Loaded',
      accessorKey: 'quantityLoaded',
    },
    {
      header: 'Equipment Name',
      accessorKey: 'equipmentName',
    },
    {
      header: 'Loading time',
      accessorKey: 'loadingDatetime',
    },
    {
      header: 'Unloading Time',
      accessorKey: 'unloadingDatetime',
    },
  ];

  return (
    <>
      {openLinenWashingDryCleaning && (
        <AddLinenWashingAndDryCleaning
          onClose={() => {
            setOpenLinenWashingDryCleaning(false);
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
            data={data || []}
            enableStickyHeader
            enableColumnResizing
            enableResizing={true}
            enableColumnFilters
            enableRowVirtualization
            loading={isPending}
            layoutMode='grid'
            renderTopToolbarCustomActions={() => (
              <Button
                color='primary'
                endIcon={<Add />}
                onClick={() => setOpenLinenWashingDryCleaning((ps) => !ps)}
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
