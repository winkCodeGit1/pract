import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';
import Label from 'components/Label';
import OrderBulkMeal from './OrderBulkMeal';
import { useQuery } from '@tanstack/react-query';
import { BulkMealOrderGetAll } from 'pages/api/diet-kitchen';
import EditIcon from 'assets/EditIcon';

export default function BulkMealOrder({ path }) {
  const [openAdd, setOpenAdd] = useState(false);
  const { data } = useQuery({ queryKey: ['BulkMealOrderGetAll'], queryFn: BulkMealOrderGetAll });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const columnsDef = [
    {
      header: 'Tracking Id',
      accessorKey: 'trackingId',
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },

    {
      header: 'Ward',
      accessorKey: 'ward',
    },
    {
      header: 'Order Set',
      accessorKey: 'orderset',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      Cell: ({ row }) => (
        <Label
          sx={{ minWidth: 120 }}
          variant={'ghost'}
          color={row.original.status ? 'success' : 'error'}
        >
          {row.original.status ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  console.log(data);
  return (
    <>
      {openAdd && (
        <OrderBulkMeal
          onClose={() => {
            setOpenAdd(false);
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
        data={data}
        enableStickHeader
        enableColumnResizing
        rowNumberMode='original'
        enableRowNumbers
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        LayoutMode='grid'
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setOpenAdd((ps) => !ps)}
            variant='contained'
          >
            Order Meal
          </Button>
        )}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setIsEditMode(true);
                setSelectedRow(row.original);
                setOpenAdd(true);
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
