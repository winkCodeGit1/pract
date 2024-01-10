/** @format */

import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import AddSingleTestNormalValue from './AddSingleTestNormalValue';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import { labTestAll } from 'pages/api/lab';
import EditIcon from 'assets/EditIcon';

export default function SingleTestNormalValue({ path }) {
  const [openSingleTestNormalValue, setOpenSingleTestNormalValue] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const columnsDef = [
    {
      header: 'Category/Department',
      accessorKey: 'labTestCategoryName',
    },
    {
      header: 'Test Name',
      accessorKey: 'testName',
    },
    {
      header: 'Short Name',
      accessorKey: 'shortCode',
    },
    {
      header: 'Remark',
      accessorKey: 'comments',
    },

    {
      header: 'Status',
      accessorKey: 'status',

      Cell: ({ row }) => (
        <Label variant={'ghost'} color={(row.original.status && 'success') || 'error'}>
          {row.original.status ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  const { data, isPending } = useQuery({
    queryKey: ['labTestAll'],
    queryFn: labTestAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  return (
    <>
      {openSingleTestNormalValue && (
        <AddSingleTestNormalValue
          onClose={() => {
            setOpenSingleTestNormalValue(false);
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
        loading={isPending}
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        enableActionColumn
        enableRowActions
        rowNumberMode='original'
        enableRowNumbers
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenSingleTestNormalValue((ps) => !ps)}
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
                setOpenSingleTestNormalValue(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
