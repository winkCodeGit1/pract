/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import EditIcon from 'assets/EditIcon';
import { ContentCopy } from '@mui/icons-material';
import Table from 'components/table';
// import VehicleTransportSecond from '../vehicleMaster/VehicleTransport2';
import AddVehicleRegistration from './AddVehicleRegister';
import { vehicleRegistrationGetAll } from 'pages/api/transport';

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function VehicleRegistration({ path }) {
  const [vehicleRegOpen, setVehicleRegOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data, isPending } = useQuery({
    queryKey: ['vehicleRegistrationGetAll'],
    queryFn: vehicleRegistrationGetAll,
  });

  const columns = [
    {
      header: 'Registration No.',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Registration Date',
      accessorKey: 'registrationDate',
    },
    {
      header: 'Registration Validity',
      accessorKey: 'registrationValidUpto',
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: 'flex-start' },
      },
    },
    {
      header: 'Remark',
      accessorKey: 'remarks',
    },
  ];

  return (
    <>
      {vehicleRegOpen && (
        <AddVehicleRegistration
          onClose={() => {
            setVehicleRegOpen(false);
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
                    setVehicleRegOpen(true);
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
                onClick={() => setVehicleRegOpen((ps) => !ps)}
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
