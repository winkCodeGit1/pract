import { useState } from 'react';

import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import AddVehicleAvail from './AddVehicleAvail';
import { useQuery } from '@tanstack/react-query';
import { vehicleAvailabilityGetAll } from 'pages/api/transport';
import Label from 'components/Label';

function VehicleAvailability({ path }) {
  const theme = useTheme();

  const [openVehicle, setOpenVehicle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['vehicleAvailabilityGetAll'],
    queryFn: vehicleAvailabilityGetAll,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },

    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'remark',
      accessorKey: 'remarks',
    },
    {
      header: 'Availability Status',
      accessorKey: 'availabilityStatus',
      Cell: ({ row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.availabilityStatus === 'Y' && 'success') || 'error'}
        >
          {row.original.availabilityStatus === 'Y' ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];
  return (
    <>
      {openVehicle && (
        <AddVehicleAvail
          onClose={() => {
            setOpenVehicle(false);
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
                    setOpenVehicle(true);
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
                onClick={() => setOpenVehicle((ps) => !ps)}
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

export default VehicleAvailability;
