import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import AddWorkOrder from './AddWork';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { workOrderGetAllWorkOrder } from 'pages/api/transport';

function WorkOrder({ path }) {
  const [openOrder, setOpenOrder] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: workOrderFile, isPending } = useQuery({
    queryKey: ['workOrderGetAllWorkOrder'],
    queryFn: workOrderGetAllWorkOrder,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Work Order Number',
      accessorKey: 'workOrderNumber',
    },
    {
      header: 'Date (Workshop In)',
      accessorKey: 'dateWorkshopIn',
    },
    {
      header: 'Date (Workshop Out)',
      accessorKey: 'dateWorkshopOut',
    },
    {
      header: 'Bill Number',
      accessorKey: 'billNumber',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openOrder && (
        <AddWorkOrder
          onClose={() => {
            setOpenOrder(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}
      {openDelete && (
        <DeleteDialog
          name={selectedRow.typeName}
          url={'someUrl'}
          onClose={() => {
            setDeleteOpen(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={workOrderFile || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
        enableColumnFilters
        enableRowVirtualization
        enableActionColumn
        enableRowActions
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenOrder((ps) => !ps)}
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
                setOpenOrder(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setSelectedRow(row.original);
                setDeleteOpen(true);
              }}
              size='small'
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}

export default WorkOrder;
