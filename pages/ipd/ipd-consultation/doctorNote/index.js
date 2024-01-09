import { Add, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
// import Label from 'components/Label';
import Table from 'components/table';
import { useState } from 'react';
import DoctorNotedAdd from './DoctorNotedAdd';
import { Box } from '@mui/system';

const path = 'doctor-note-record';

export default function DoctorNote() {
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const columnsDef = [
    {
      header: 'Date Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Observation',
      accessorKey: 'nursingCareGiven',
    },

    {
      header: 'Prognosis Note',
      accessorKey: 'staffName',
    },
    {
      header: 'Treatment Plan',
      accessorKey: 'staffName',
    },
    {
      header: 'Created By',
      accessorKey: 'staffName',
    },
    // {
    //   header: 'Status',
    //   accessorKey: 'status',
    //   Cell: ({ row }) => (
    //     <Label sx={{ minWidth: 120 }} variant={'ghost'} color={row.original.status}>
    //       {row.original.status.label}
    //     </Label>
    //   ),
    // },
  ];

  return (
    <>
      {openAdd && (
        <DoctorNotedAdd
          selectedRow={selectedRow}
          onClose={() => {
            setOpenAdd(false);
            setSelectedRow();
          }}
        />
      )}

      <Box sx={{ border: '1px solid', borderColor: 'divider' }}>
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
      </Box>
    </>
  );
}
