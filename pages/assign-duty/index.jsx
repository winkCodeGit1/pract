import { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
//Local imports
import Table from 'components/table';
import ScheduleDuty from './ScheduleDuty';

export default function Laundry({ path }) {
  const [openAdd, setOpenLinen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columnsDef = [
    {
      header: 'Staff Id',
      accessorKey: 'staffId',
    },
    {
      header: 'Staff Name',
      accessorKey: 'staffName',
    },

    {
      header: 'Department',
      accessorKey: 'department',
    },

    {
      header: 'Building',
      accessorKey: 'building',
    },

    {
      header: 'Floor',
      accessorKey: 'floor',
    },
  ];

  return (
    <>
      {openAdd && (
        <ScheduleDuty
          selectedRow={selectedRow}
          onClose={() => {
            setOpenLinen(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        // loading={}
        data={[]}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
        enableRowNumbers
        enableRowVirtualization
        enableRowActions
        layoutMode='grid'
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setOpenLinen((ps) => !ps)}
            variant='contained'
          >
            Schedule Duty
          </Button>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            sx={{ fontStyle: 'unset !important', color: 'unset !important', m: 0 }}
            key={0}
            onClick={() => {
              setSelectedRow(row.original);
              closeMenu();
            }}
          >
            View Duty Roaster
          </MenuItem>,
        ]}
      />
    </>
  );
}
