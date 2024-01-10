/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//Local imports
import AddSpecializationType from './AddSpecialization';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

// api
import { specializationGetAll } from 'pages/api/master';

export default function Specialization({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Specialization',
      accessorKey: 'specName',
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

  const { data: specializationType, isPending } = useQuery({
    queryKey: ['specializationGetAll'],
    queryFn: specializationGetAll,
  });

  return (
    <>
      {openAdd && (
        <AddSpecializationType
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          specializationDetail={specializationType}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={specializationType || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
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
                  setAddOpen((ps) => !ps);
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
                setAddOpen(true);
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
