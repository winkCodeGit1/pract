import { Add, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Label from 'components/Label';
import Table from 'components/table';
import { useState } from 'react';
import NurseRecordAdd from './NurseRecordAdd';

const path = 'nursing-care-nurse-record';

export default function NurseRecord() {
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const columnsDef = [
    {
      header: 'Date and Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Nursing Care Given',
      accessorKey: 'nursingCareGiven',
    },

    {
      header: 'Staff Name',
      accessorKey: 'staffName',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      Cell: ({ row }) => (
        <Label sx={{ minWidth: 120 }} variant={'ghost'} color={row.original.status}>
          {row.original.status.label}
        </Label>
      ),
    },
  ];

  return (
    <>
      {openAdd && (
        <NurseRecordAdd
          selectedRow={selectedRow}
          onClose={() => {
            setOpenAdd(false);
            setSelectedRow();
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
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setOpenAdd((ps) => !ps)}
            variant='contained'
          >
            Add
          </Button>
        )}
        renderRowActions={({ row }) => (
          <IconButton
            onClick={() => {
              setOpenAdd(true);
              setSelectedRow(row);
            }}
          >
            <Edit />
          </IconButton>
        )}
      />
    </>
  );
}
