import { Add, Edit } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
import Button from '@mui/material/Button';
// import Label from 'components/Label';
import Table from 'components/table';
import { useState } from 'react';
import ComplainDurationAdd from './ComplainDurationAdd';

const path = 'nursing-care-nurse-record';

export default function ComplainDuration() {
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const columnsDef = [
    {
      header: 'Date Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Chief Complaints',
      accessorKey: 'nursingCareGiven',
    },

    {
      header: 'Examination Notes',
      accessorKey: 'staffName',
    },
    {
      header: 'Sleep',
      accessorKey: 'staffName',
    },
    {
      header: 'Bowel',
      accessorKey: 'staffName',
    },
    {
      header: 'Appetite',
      accessorKey: 'staffName',
    },
    {
      header: 'Bladder',
      accessorKey: 'staffName',
    },
  ];

  return (
    <>
      {openAdd && (
        <ComplainDurationAdd
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
