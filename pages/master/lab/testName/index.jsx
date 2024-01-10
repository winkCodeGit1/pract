/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import AddTestName from './AddTestName';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { labTestAll } from 'pages/api/lab';
import EditIcon from 'assets/EditIcon';
// import DeleteIcon from 'assets/DeleteIcon';
import { Add } from '@mui/icons-material';
import Label from 'components/Label';

export default function TestName({ path }) {
  const theme = useTheme();
  const [openTestName, setOpenTestName] = useState(false);
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
      accessorKey: 'activeStatus',

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

  const { data, isPending } = useQuery({
    queryKey: ['labTestAll'],
    queryFn: labTestAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  return (
    <>
      {openTestName && (
        <AddTestName
          onClose={() => {
            setOpenTestName(false);
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
        data={data || []}
        loading={isPending}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        enableActionColumn
        enableRowActions
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => {
                  setOpenTestName((ps) => !ps);
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
                setOpenTestName(true);
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
