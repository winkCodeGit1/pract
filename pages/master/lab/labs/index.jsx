/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import AddNewLab from './AddNewLab';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { labAll } from 'pages/api/lab';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function LabName({ path }) {
  const theme = useTheme();
  const [openLab, setOpenLab] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const columnsDef = [
    {
      header: 'Lab Name',
      accessorKey: 'labName',
    },
    {
      header: 'Department Type',
      accessorKey: 'departmentType',
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
  const { data, isLoading } = useQuery({
    queryKey: ['labAll'],
    queryFn: labAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });
  return (
    <>
      {openLab && (
        <AddNewLab
          onClose={() => {
            setOpenLab(false);
            setSelectedRow(null);
            setIsEditMode(false);
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
        layoutMode='grid'
        loading={isLoading}
        enableActionColumn
        enableRowActions
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenLab((ps) => !ps)}
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
                setOpenLab(true);
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
