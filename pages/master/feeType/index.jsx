import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

//local imports
import AddFeeType from './AddFeeType';

import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from '../DeleteUI';

//api
import { feesGetFeesByOrg } from 'pages/api/master';

const orgId = 1;

export default function FeeType({ path }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Fee Code',
      accessorKey: 'feeCode',
    },
    {
      header: 'Fee Name',
      accessorKey: 'feeName',
    },
    {
      header: 'Fee Type',
      accessorKey: 'feesTypeName',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: 'Effect From',
      accessorKey: 'effect_from',
    },
    {
      header: 'Active Status',
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

  const { data: feeType, isPending } = useQuery({
    queryKey: ['feesGetFeesByOrg', orgId],
    queryFn: feesGetFeesByOrg,
    placeholderData: [],
  });

  // console.log('feeType-----123---', feeType);

  return (
    <>
      {open && (
        <AddFeeType
          onClose={() => {
            setOpen(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          feeDetail={feeType}
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
        columns={columnsDef}
        loading={isPending}
        data={feeType || []}
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
                onClick={() => {
                  setOpen((ps) => !ps);
                  setSelectedRow(null);
                }}
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
                setOpen(true);
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
