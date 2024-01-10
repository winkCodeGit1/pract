/** @format */

import { Button } from '@mui/material';
import Table from 'components/table';
import AddGroupTestName from './AddGroupTestName';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

export default function GroupTestName({ path }) {
  const [openGroupTestName, setOpenGroupTestName] = useState(false);
  const columnsDef = [
    {
      header: 'Group Test Name',
      accessorKey: 'id',
    },
    {
      header: 'Department Type',
      accessorKey: 'departmentType',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      id: 'status',
    },

    {
      header: 'Actions',
      accessorKey: 'actions',
      id: 'action',
    },
  ];

  return (
    <>
      {openGroupTestName && <AddGroupTestName onClose={() => setOpenGroupTestName(false)} />}

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
                onClick={() => setOpenGroupTestName((ps) => !ps)}
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
