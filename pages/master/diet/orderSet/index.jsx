import { Add } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import Table from 'components/table';
import { orderSetGetAll } from 'pages/api/diet-kitchen';
import { useState } from 'react';
import AddOrderSet from './AddOrderSet';

export default function OrderSet({ path }) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const columnsDef = [
    {
      header: 'Order Id',
      accessorKey: 'orderId',
    },

    {
      header: 'Order Set Name',
      accessorKey: 'orderSetname',
    },
    {
      header: 'General Ward Price',
      accessorKey: 'generalWardPrice',
    },
    {
      header: 'Private Ward Price',
      accessorKey: 'privateWardPrice',
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
  const { data } = useQuery({ queryKey: ['orderSetAll'], queryFn: orderSetGetAll });
  console.log(data);
  return (
    <>
      {openAdd && (
        <AddOrderSet
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
                queryClient.invalidateQueries(['getOrderSet', row?.original?.orderId]);
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
