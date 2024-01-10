/** @format */

import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import AddGroupTestNormalValue from './AddGroupTestNormalValue';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { labGroupTestAll } from 'pages/api/lab';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function GroupTestNormalValue({ path }) {
  const [openGroupTestNormalValue, setOpenGroupTestNormalValue] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const columnsDef = [
    {
      header: 'Group Test Name',
      accessorKey: 'groupName',
    },
    {
      header: 'Status',
      accessorKey: 'activeStatus',

      Cell: ({ row }) => (
        <Label variant={'ghost'} color={(row.original.active && 'success') || 'error'}>
          {row.original.active ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  const { data, isPending } = useQuery({
    queryKey: ['labGroupTestAll'],
    queryFn: labGroupTestAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  return (
    <>
      {openGroupTestNormalValue && (
        <AddGroupTestNormalValue
          onClose={() => {
            setOpenGroupTestNormalValue(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
          isEditMode={isEditMode}
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
        loading={isPending}
        enableActionColumn
        enableRowActions
        rowNumberMode='original'
        layoutMode='grid'
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenGroupTestNormalValue(true);
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
                onClick={() => setOpenGroupTestNormalValue((ps) => !ps)}
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
