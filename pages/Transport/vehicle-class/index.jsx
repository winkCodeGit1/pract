import { useState } from 'react';
import { Button, useTheme, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

//local
import AddVehicleClass from './AddVehicleClass';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { vehClassGetAllVehClass } from 'pages/api/transport';

export default function VehicleClass({ path }) {
  const theme = useTheme();
  const [openfuel, setOpenFuel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Vehicle Category',
      accessorKey: 'className',
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

  const { data: vehicleClassType, isPending } = useQuery({
    queryKey: ['vehClassGetAllVehClass'],
    queryFn: vehClassGetAllVehClass,
  });

  return (
    <>
      {openfuel && (
        <AddVehicleClass
          onClose={() => {
            setOpenFuel(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={vehicleClassType || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        enableActionColumn
        enableRowActions
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
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenFuel(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
