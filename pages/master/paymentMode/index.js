import React, { useState } from 'react';

import { Button, useTheme } from '@mui/material';
import Table from 'components/table';
import AddPaymentMode from './AddPaymentMode';
import { useQuery } from '@tanstack/react-query';
import { getPaymentModeGetallPaymentModes } from 'api';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import DeleteDialog from '../DeleteUI';
import DeleteIcon from 'assets/DeleteIcon';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';

// const orgId = 1;
function PaymentDetails() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const paymentColumns = [
    {
      header: 'Payment Mode',
      accessorKey: 'name',
    },

    // {
    //   header: 'Action',
    //   accessorKey: 'id',
    // },
    {
      header: 'Status',
      accessorKey: 'activeStatus',
      Cell: ({ renderedCellValue, row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.active && 'success') || 'error'}
        >
          {renderedCellValue}
        </Label>
      ),
    },
  ];

  const { data: paymentMode, isPending } = useQuery({
    queryKey: ['getPaymentModeGetallPaymentModes'],
    queryFn: getPaymentModeGetallPaymentModes,
    placeholderData: [],
  });

  return (
    <>
      {open && (
        <AddPaymentMode
          selectedRow={selectedRow}
          isEditMode={isEditMode}
          paymentDetail={paymentMode}
          onClose={() => {
            setOpen(false);
            setIsEditMode(false);
          }}
        />
      )}
      {openDelete && (
        <DeleteDialog
          name={selectedRow.name}
          url={'url'}
          onClose={() => {
            setDeleteOpen(false);
          }}
        />
      )}

      <Table
        columns={paymentColumns}
        loading={isPending}
        data={paymentMode}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpen((ps) => !ps)}
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
                setOpen(true);
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setSelectedRow(row.original);
                setDeleteOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}

export default PaymentDetails;
