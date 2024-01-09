import { useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';

import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { locationMasterGetAll } from 'pages/api/laundry';
import AddLocation from './AddLocation';

export default function Location({ path }) {
  const theme = useTheme();
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['locationMasterGetAll'],
    queryFn: locationMasterGetAll,
  });

  const columns = [
    {
      header: 'Location Name',
      accessorKey: 'locationName',
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
      {openLocation && (
        <AddLocation
          onClose={() => {
            setOpenLocation(false);
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
                    setOpenLocation(true);
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
                onClick={() => setOpenLocation((ps) => !ps)}
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
