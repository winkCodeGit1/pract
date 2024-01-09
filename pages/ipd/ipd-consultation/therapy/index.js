import { Edit } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
// import Button from '@mui/material/Button';
// import Label from 'components/Label';
import Table from 'components/table';
// import { useState } from 'react';
// import TherapyAdd from './TherapyAdd';

const path = 'nursing-care-nurse-record';

export default function Therapy() {
  // const [openAdd, setOpenAdd] = useState(false);
  // const [selectedRow, setSelectedRow] = useState();

  const columnsDef = [
    {
      header: 'Date Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Therapy Name',
      accessorKey: 'nursingCareGiven',
    },
    {
      header: 'Therapist Name',
      accessorKey: 'nursingCareGiven',
    },
    {
      header: 'Package Name',
      accessorKey: 'nursingCareGiven',
    },
    {
      header: 'Selected Date',
      accessorKey: 'nursingCareGiven',
    },
    {
      header: 'Duration (Type) ',
      accessorKey: 'nursingCareGiven',
    },

    {
      header: 'Remarks',
      accessorKey: 'staffName',
    },
    {
      header: 'Staff Name',
      accessorKey: 'staffName',
    },
    {
      header: 'Status',
      accessorKey: 'staffName',
    },
  ];

  return (
    <>
      {/* {openAdd && (
        <TherapyAdd
          selectedRow={selectedRow}
          onClose={() => {
            setOpenAdd(false);
            setSelectedRow();
          }}
        />
      )} */}
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
          // enableRowActions
          // renderTopToolbarCustomActions={() => (
          //   <Button
          //     endIcon={<Add />}
          //     color='primary'
          //     // onClick={() => setOpenAdd((ps) => !ps)}
          //     variant='contained'
          //   >
          //     Add
          //   </Button>
          // )}
          renderRowActions={() => (
            <IconButton
              onClick={() => {
                // setOpenAdd(true);
                // setSelectedRow(row);
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
