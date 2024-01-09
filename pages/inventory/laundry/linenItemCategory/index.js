import { useState } from 'react';

import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';
import Label from 'components/Label';
import { laundryItemCategoryGetAll } from 'pages/api/laundry';
import AddLinenItemCategory from './AddLinenItemCategory';

export default function LinenItemCategory({ path }) {
  const theme = useTheme();
  const [openLinenItemCategory, setOpenLinenItemCategory] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['laundryItemCategoryGetAll'],
    queryFn: laundryItemCategoryGetAll,
  });

  const columns = [
    {
      header: 'category Name',
      accessorKey: 'categoryName',
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
      {openLinenItemCategory && (
        <AddLinenItemCategory
          onClose={() => {
            setOpenLinenItemCategory(false);
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
                    setOpenLinenItemCategory(true);
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
                onClick={() => setOpenLinenItemCategory((ps) => !ps)}
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
