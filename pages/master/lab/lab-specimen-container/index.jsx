/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import AddTestMethod from './AddContainer';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import { labSpecimenContainerAll } from 'pages/api/lab';

export default function SpecimenContainer({ path }) {
  const theme = useTheme();
  const [openSpecimencontainer, setOpenSpecimencontainer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const columnsDef = [
    {
      header: 'Container Name',
      accessorKey: 'specimenContainerName',
    },
    {
      header: 'Status',
      accessorKey: 'status',

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
  const { data, isPending } = useQuery({
    queryKey: ['labSpecimenContainerAll'],
    queryFn: labSpecimenContainerAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  return (
    <>
      {openSpecimencontainer && (
        <AddTestMethod
          onClose={() => {
            setOpenSpecimencontainer(false);
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
                onClick={() => setOpenSpecimencontainer((ps) => !ps)}
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
                setOpenSpecimencontainer(true);
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
