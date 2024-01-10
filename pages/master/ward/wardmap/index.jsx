/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local imports
import Table from 'components/table';
import AddWardMap from './AddWardMap';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { wardFetchWardbyOrgId } from 'pages/api/master';

export default function WardMap({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    {
      header: 'Building Name',
      accessorKey: 'buildingName',
    },
    {
      header: 'Floor',
      accessorKey: 'floorName',
    },
    {
      header: 'Ward Type',
      accessorKey: 'wardTypeName',
    },
    {
      header: 'Ward Name',
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

  const { data: wardMap, isPending } = useQuery({
    queryKey: ['wardFetchWardbyOrgId'],
    queryFn: wardFetchWardbyOrgId,
  });

  return (
    <>
      {openAdd && (
        <AddWardMap
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}
      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={wardMap || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
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
