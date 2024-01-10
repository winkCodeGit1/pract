import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import AddWoundStatus from './AddWoundStatus';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import { fetchWoundStatus } from 'pages/api/master';

export default function WoundStatus({ path }) {
  const [openStatus, setStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const theme = useTheme();
  const columnsDef = [
    {
      header: 'Wound Status',
      accessorKey: 'name',
    },
    {
      header: 'Status',
      accessorKey: 'active',
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
  const { data: WoundStatus, isPending } = useQuery({
    queryKey: ['getWoundStatus'],
    queryFn: fetchWoundStatus,
  });

  return (
    <>
      {openStatus && (
        <AddWoundStatus
          onClose={() => {
            setSelectedRow(null);
            setIsEditMode(false);
            setStatus(false);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          WoundStatusDetails={WoundStatus}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={WoundStatus || []}
        enableStickyHeader
        enableColumnResizing
        enableRowActions
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setStatus((ps) => !ps)}
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
              color='primary'
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
