import { useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';

import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { equipmentGetAll } from 'pages/api/laundry';
import AddEquipment from './AddEquipment';

export default function Equipment({ path }) {
  const theme = useTheme();
  const [openEquipment, setOpenEquipment] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['equipmentGetAll'],
    queryFn: equipmentGetAll,
  });

  const columns = [
    {
      header: 'Machine Name',
      accessorKey: 'machineName',
    },
    {
      header: 'Capacity',
      accessorKey: 'capacity',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
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
  return (
    <>
      {openEquipment && (
        <AddEquipment
          onClose={() => {
            setOpenEquipment(false);
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
                    setOpenEquipment(true);
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
                onClick={() => setOpenEquipment((ps) => !ps)}
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
