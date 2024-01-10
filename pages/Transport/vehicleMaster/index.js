/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add } from '@mui/icons-material';
import { ContentCopy } from '@mui/icons-material';
import { getCountries } from 'pages/api/dashboard';
import Table from 'components/table';
import AlertDialogSlide from './FormDialog';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function VehicleMater({ path }) {
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
      header: 'Registration NO.',
      accessorKey: 'id',
    },
    {
      header: 'Class of Vehicle',
      accessorKey: 'shortName',
    },
    {
      header: 'Model Number',
      accessorKey: 'countryName',
      muiTableBodyCellCopyButtonProps: {
        fullWidth: true,
        startIcon: <ContentCopy />,
        sx: { justifyContent: 'flex-start' },
      },
    },
    {
      header: 'Year of Manufacture',
      accessorKey: 'time',
    },
  ];

  return (
    <>
      {vehicleOpen && <AlertDialogSlide onClose={() => setVehicleOpen(false)} />}

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
    </>
  );
}
