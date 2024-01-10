import { Add } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import AddMealType from './AddMealType';
import { useQuery } from '@tanstack/react-query';
import { mealTypeGetAll } from 'pages/api/diet-kitchen';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function MealType({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const columnsDef = [
    {
      header: 'Mean Type',
      accessorKey: 'mealname',
    },
    {
      header: 'Start Time',
      accessorKey: 'starttime',
    },
    {
      header: 'End Time',
      accessorKey: 'endtime',
    },
    {
      header: 'Status',
      accessorKey: 'active',
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
  const { data } = useQuery({ queryKey: ['mealTypeAll'], queryFn: mealTypeGetAll });
  return (
    <>
      {openAdd && (
        <AddMealType
          onClose={() => {
            setAddOpen(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
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
        enableActionColumn
        enableRowActions
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setAddOpen(true);
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
      />
    </>
  );
}
