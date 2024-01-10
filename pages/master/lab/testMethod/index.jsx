/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import AddTestMethod from './AddTestMethod';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import { labTestMethodAll } from 'pages/api/lab';

export default function TestMethod({ path }) {
  const theme = useTheme();
  const [openTestMethod, setOpenTestMethod] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const columnsDef = [
    {
      header: 'Test Method',
      accessorKey: 'methodName',
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
    queryKey: ['labTestMethodAll'],
    queryFn: labTestMethodAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  return (
    <>
      {openTestMethod && (
        <AddTestMethod
          onClose={() => {
            setOpenTestMethod(false);
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
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenTestMethod((ps) => !ps)}
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
                setOpenTestMethod(true);
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
