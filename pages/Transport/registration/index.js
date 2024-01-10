/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add } from '@mui/icons-material';
import { ContentCopy } from '@mui/icons-material';
import { getCountries } from 'pages/api/dashboard';
import Table from 'components/table';
import VehicleTransportSecond from '../vehicleMaster/VehicleTransport2';
import FormWrapper from 'components/FormWrapper';

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function VehicleRegistration({ path }) {
  const [data, setData] = useState([]);
  const [vehicleOpen, setVehicleOpen] = useState(false);

  const { data: country, isPending } = useQuery({
    queryKey: ['getCountries'],
    queryFn: getCountries,
    staleTime: Infinity,
    gcTime: Infinity,
    placeholderData: [],
  });

  const columns = [
    {
      header: 'Registration No.',
      accessorKey: 'id',
    },
    {
      header: 'Registration Date',
      accessorKey: 'shortName',
    },
    {
      header: 'Registration Validity',
      accessorKey: 'countryName',
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: 'flex-start' },
      },
    },
    {
      header: 'Remark',
      accessorKey: 'time',
    },
  ];

  return (
    <>
      {vehicleOpen && (
        <FormWrapper onClose={() => setVehicleOpen(false)} title='Vehicle Registration'>
          <VehicleTransportSecond />
        </FormWrapper>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Table
            title={path}
            columns={columns}
            data={country}
            enableStickyHeader
            enableColumnResizing
            enableColumnFilters
            enableRowVirtualization
            loading={isPending}
            layoutMode='grid'
            enableRowActions
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    table.setEditingRow(row);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={() => {
                    data.splice(row.index, 1);
                    setData([...data]);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color='primary'
                endIcon={<Add />}
                onClick={() => setVehicleOpen(true)}
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
