import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

import AddDrainageType from './AddDrainageType';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { drainageTypeFetchDrainageType } from 'pages/api/master';

export default function DrainageType({ path }) {
  const theme = useTheme();
  const [openStatus, setStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    {
      header: 'Drainage Type',
      accessorKey: 'typeName',
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

  const { data: drainageType, isPending } = useQuery({
    queryKey: ['drainageTypeFetchDrainageType'],
    queryFn: drainageTypeFetchDrainageType,
  });

  return (
    <>
      {openStatus && (
        <AddDrainageType
          onClose={() => {
            setStatus(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          drainageTypeDetails={drainageType}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={drainageType || []}
        enableStickyHeader
        enableColumnResizing
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
                onClick={() => {
                  setStatus((ps) => !ps);
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
                setStatus(true);
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
