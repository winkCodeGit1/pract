import { Edit } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
// import Button from '@mui/material/Button';
// import Label from 'components/Label';
import Table from 'components/table';
// import { useState } from 'react';
// import NurseRecordAdd from './NurseRecordAdd';

const path = 'nursing-care-nurse-record';

export default function NurseQueries() {
  // const [openAdd, setOpenAdd] = useState(false);
  // const [selectedRow, setSelectedRow] = useState();

  const nurseQueryDef = [
    {
      header: 'Query',
      accessorKey: 'dateTime',
    },
    {
      header: 'Nurse',
      accessorKey: 'dateTime',
    },
    {
      header: 'Date Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Reply',
      accessorKey: 'nursingCareGiven',
    },
  ];
  const columnsDef = [
    {
      header: 'Query',
      accessorKey: 'dateTime',
    },
    {
      header: 'Nurse',
      accessorKey: 'dateTime',
    },
    {
      header: 'Generated Date Time',
      accessorKey: 'dateTime',
    },
    {
      header: 'Approval Status',
      accessorKey: 'dateTime',
    },
    {
      header: 'Approved By',
      accessorKey: 'dateTime',
    },
    {
      header: 'Approved Date Time',
      accessorKey: 'nursingCareGiven',
    },

    {
      header: 'Reply',
      accessorKey: 'staffName',
    },
  ];

  return (
    <>
      {/* {openAdd && (
        <NurseRecordAdd
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
          columns={nurseQueryDef}
          // loading={}
          data={[]}
          enableStickyHeader
          enableColumnResizing
          rowNumberMode='original'
          enableRowNumbers
          enableRowVirtualization
          enableRowActions
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
            // onClick={() => {
            //   setOpenAdd(true);
            //   setSelectedRow(row);
            // }}
            >
              <Edit />
            </IconButton>
          )}
        />
      </Box>
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
            // onClick={() => {
            //   setOpenAdd(true);
            //   setSelectedRow(row);
            // }}
            >
              <Edit />
            </IconButton>
          )}
        />
      </Box>
    </>
  );
}
