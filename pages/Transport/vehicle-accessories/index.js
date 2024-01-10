import { useState } from 'react';

import { Box, Button, Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';
import { vehicleAccessoriesGetAll } from 'pages/api/transport';
import AddVehicleAccessories from './AddVehicleAccessories';

function VehicleAccessories({ path }) {
  const [openVehicleAccessories, setOpenVehicleAccessories] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['vehicleAccessoriesGetAll'],
    queryFn: vehicleAccessoriesGetAll,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Item Code',
      accessorKey: 'itemCode',
    },
    {
      header: 'Bill Number',
      accessorKey: 'billNumber',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Date Of Change',
      accessorKey: 'dateOfChange',
    },
    {
      header: 'remark',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openVehicleAccessories && (
        <AddVehicleAccessories
          onClose={() => {
            setOpenVehicleAccessories(false);
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
            data={data}
            enableStickyHeader
            enableColumnResizing
            enableColumnFilters
            enableRowVirtualization
            loading={isPending}
            layoutMode='grid'
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    setOpenVehicleAccessories(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                {/* <IconButton
                  color='error'
                  onClick={() => {
                    data.splice(row.index, 1);
                  }}
                >
                  <DeleteIcon />
                </IconButton> */}
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color='primary'
                endIcon={<Add />}
                onClick={() => setOpenVehicleAccessories((ps) => !ps)}
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

export default VehicleAccessories;
