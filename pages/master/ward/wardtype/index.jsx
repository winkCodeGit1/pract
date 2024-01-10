import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

import AddWardType from './AddWardTpe';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { wardTypeFetchAllWardType } from 'pages/api/master';

export default function WardType({ path }) {
  const theme = useTheme();
  const [openWard, setWard] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Ward Type',
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

  const { data: wardType, isPending } = useQuery({
    queryKey: ['wardTypeFetchAllWardType'],
    queryFn: wardTypeFetchAllWardType,
  });

  return (
    <>
      {openWard && (
        <AddWardType
          onClose={() => {
            setWard(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          wardDetail={wardType}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={wardType || []}
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
                  setWard((ps) => !ps);
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
                setWard(true);
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
