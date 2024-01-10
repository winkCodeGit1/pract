import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
//local
import AddWoundOdour from './AddWoundOdour';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { fetchWoundOdour } from 'pages/api/master';

export default function WoundOdour({ path }) {
  const theme = useTheme();
  const [openOdour, setOdour] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Wound Odour',
      accessorKey: 'name',
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
  const { data: woundOdour, isPending } = useQuery({
    queryKey: ['fetchWoundOdour'],
    queryFn: fetchWoundOdour,
  });

  return (
    <>
      {openOdour && (
        <AddWoundOdour
          onClose={() => {
            setOdour(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          woundOdourDetails={woundOdour}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={woundOdour || []}
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
                onClick={() => setOdour((ps) => !ps)}
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
                setOdour(true);
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
