import { useState } from 'react';

import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';
import FuelDetails from './FuelDetails';
import Label from 'components/Label';
import { useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

import { fuelTypeGetAllFuelType } from 'pages/api/transport';

export default function AddFuel({ path }) {
  const [openfuel, setOpenFuel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const theme = useTheme();
  const columnsDef = [
    {
      header: 'Fuel Type',
      accessorKey: 'type',
    },

    {
      header: 'Status',
      accessorKey: 'active',
      Cell: ({ row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.active && 'success') || 'error'}
        >
          {row.original.active ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  const { data: fuelType, isPending } = useQuery({
    queryKey: ['fuelTypeGetAllFuelType'],
    queryFn: fuelTypeGetAllFuelType,
  });
  return (
    <>
      {openfuel && (
        <FuelDetails
          onClose={() => {
            setOpenFuel(false);
            setSelectedRow(null);
            setIsEditMode(false);
          }}
          isEditMode={isEditMode}
          fuelDetails={fuelType}
          row={selectedRow}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={fuelType || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowActions
        enableActionColumn
        enableRowVirtualization
        layoutMode='grid'
        exportData
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenFuel((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
            </div>
          );
        }}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='primary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenFuel(true);
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
