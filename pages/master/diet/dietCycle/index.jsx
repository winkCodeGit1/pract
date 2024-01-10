import { Add } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import AddDietCycle from './AddDietCycle';
import { useQuery } from '@tanstack/react-query';
import { dietCycleGetAll } from 'pages/api/diet-kitchen';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function DietCycle({ path }) {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openAdd, setAddOpen] = useState(false);
  const columnsDef = [
    {
      header: 'Diet Cycle Name',
      accessorKey: 'dietCycleName',
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

  const { data } = useQuery({ queryKey: ['dietCycleAll'], queryFn: dietCycleGetAll });

  return (
    <>
      {openAdd && (
        <AddDietCycle
          onClose={() => {
            setAddOpen(false);
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
        layoutMode='grid'
        enableActionColumn
        enableRowActions
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
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setAddOpen((ps) => !ps)}
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
