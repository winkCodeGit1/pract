import { Add } from '@mui/icons-material';
import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AddFoodItem from './AddFoodItems';
import { foodItemGetAll } from 'pages/api/diet-kitchen';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function FoodItem({ path }) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const columnsDef = [
    {
      header: 'Food Item Name',
      accessorKey: 'foodItemName',
    },
    {
      header: 'Food Item Price',
      accessorKey: 'foodItemPrice',
    },
    {
      header: 'Status',
      accessorKey: 'active',
      Cell: ({ row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.status && 'success') || 'error'}
        >
          {row.original.status ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  const { data } = useQuery({ queryKey: ['FoodItemAll'], queryFn: foodItemGetAll });

  // console.log(data, '----data');

  return (
    <>
      {openAdd && (
        <AddFoodItem
          onClose={() => {
            setAddOpen(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={data || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        enableActionColumn
        enableRowActions
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setAddOpen(true);
                queryClient.invalidateQueries(['getFoodItem', row?.original?.foodId]);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => {
                  setAddOpen((ps) => !ps);
                  setSelectedRow(null);
                }}
                variant='contained'
              >
                Add
              </Button>
            </div>
          );
        }}
      />
    </>
  );
}
