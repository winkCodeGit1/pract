import { useState } from 'react';

import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import AddLocationDepartmentMapping from './AddLocationDepartmentMapping';
import { useQuery } from '@tanstack/react-query';
import { LocationDeptMappingGetAll } from 'pages/api/laundry';

export default function LocationDepartmentMapping({ path }) {
  const theme = useTheme();
  const [openLocationDepartmentMapping, setOpenLocationDepartmentMapping] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['LocationDeptMappingGetAll'],
    queryFn: LocationDeptMappingGetAll,
  });

  const columns = [
    {
      header: 'Department Name',
      accessorKey: 'departmentName',
    },
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
      {openLocationDepartmentMapping && (
        <AddLocationDepartmentMapping
          onClose={() => {
            setOpenLocationDepartmentMapping(false);
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
                    setOpenLocationDepartmentMapping(true);
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
                onClick={() => setOpenLocationDepartmentMapping((ps) => !ps)}
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
