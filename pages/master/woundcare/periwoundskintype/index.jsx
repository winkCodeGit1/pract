import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local
import AddPeriwoundSkinType from './AddPeriwoundSkin';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { fetchPeriWoundSkinType } from 'pages/api/master';

export default function PeriwoundSkinType({ path }) {
  const theme = useTheme();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    {
      header: 'Periwound Skin Type',
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

  const { data: periWound, isPending } = useQuery({
    queryKey: ['fetchPeriWoundSkinType'],
    queryFn: fetchPeriWoundSkinType,
  });

  return (
    <>
      {openAdd && (
        <AddPeriwoundSkinType
          onClose={() => {
            setOpenAdd(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          periWoundDetails={periWound}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={periWound || []}
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
