import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
//local
import AddDrainageIntensity from './AddDrainageIntensity';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { drainageIntensityFetchDrainageIntensity } from 'pages/api/master';

export default function DraiangeIntensity({ path }) {
  const theme = useTheme();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    {
      header: 'Drainage Intensity',
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
  const { data: drainageIntensity, isPending } = useQuery({
    queryKey: ['drainageIntensityFetchDrainageIntensity'],
    queryFn: drainageIntensityFetchDrainageIntensity,
  });

  return (
    <>
      {openAdd && (
        <AddDrainageIntensity
          onClose={() => {
            setOpenAdd(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          drainageIntensityDetails={drainageIntensity}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={drainageIntensity || []}
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
                  setOpenAdd((ps) => !ps);
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
                setOpenAdd(true);
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
