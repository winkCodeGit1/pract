import { useState } from 'react';

import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import BatteryDetails from './BatteryDetails';
import { useQuery } from '@tanstack/react-query';
import { getBatteryType } from 'pages/api/transport';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { useTheme } from '@emotion/react';

function AddBattery({ path }) {
  const [openBattery, setOpenBattery] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const theme = useTheme();
  const columnsDef = [
    {
      header: 'Battery Type',
      accessorKey: 'type',
    },

    {
      header: 'Status',
      accessorKey: 'id',
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
  const { data: BatteryType, isPending } = useQuery({
    queryKey: ['getBatteryType'],
    queryFn: getBatteryType,
  });
  return (
    <>
      {openBattery && (
        <BatteryDetails
          onClose={() => {
            setOpenBattery(false);
            setSelectedRow(null);
            setIsEditMode(false);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          BatteryTypeDetails={BatteryType}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={BatteryType || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowActions
        enableRowVirtualization
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenBattery((ps) => !ps)}
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
                setOpenBattery(true);
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

export default AddBattery;
