import { Button } from '@mui/material';
import Table from 'components/table';
import AddUserType from './AddUsersCreation';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

export default function UserCreation({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const columnsDef = [
    {
      header: 'Login Id',
      accessorKey: 'id',
    },

    {
      header: 'Staff Name',
      accessorKey: 'staffName',
      id: 'staffName',
    },
    {
      header: 'Staff Id',
      accessorKey: 'staffId',
      id: 'staffId',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      id: 'status',
    },
  ];

  return (
    <>
      {openAdd && (
        <AddUserType
          onClose={() => {
            setAddOpen(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={[]}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
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
