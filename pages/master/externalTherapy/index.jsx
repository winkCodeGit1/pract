import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local
import AddExternal from './AddTherapy';

import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { externalTherapyFetchExternalTherapyByOrgId } from 'pages/api/master';

export default function ExternalTherapy({ path }) {
  const theme = useTheme();
  const [openExternal, setExternal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    {
      header: 'External Therapy',
      accessorKey: 'therapy_name',
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

  const { data: externalTherapy, isPending } = useQuery({
    queryKey: ['externalTherapyFetchExternalTherapyByOrgId'],
    queryFn: externalTherapyFetchExternalTherapyByOrgId,
  });

  return (
    <>
      {openExternal && (
        <AddExternal
          onClose={() => {
            setExternal(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          externalDetails={externalTherapy}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={externalTherapy || []}
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
                  setExternal((ps) => !ps);
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
                setExternal(true);
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
