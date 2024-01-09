/** @format */

import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
//import { getCountries } from 'pages/api/dashboard';
import Table from 'components/table';
import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import BloodBagTimeline from './BloodBagTimeline/BloodBagTimeline';
// import Label from 'components/Label';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const donorId = 1;
export default function DonorTable({ isLoading, data, AddDonorButton }) {
  // const [data, setData] = useState([]);
  // const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openBloodTimeline, setBloodTimelineOpen] = useState(false);
  //const [openView, setOpenView] = useState(false);

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'donorRegistrationNumber',
    },
    {
      header: 'Donor Name',
      accessorKey: 'donorName',
    },
    // {
    //     header: 'Barcode Number',
    //     accessorKey: 'barCode',
    // },
    // {
    //     header: 'Created Date Time',
    //     accessorKey: 'createdDatetime',
    // },
    {
      header: 'Mobile No',
      accessorKey: 'contactNo',
    },
    // {
    //     header: 'Status',
    //     accessorKey: 'activeStatus',

    //     Cell: ({ renderedCellValue, row }) => (
    //         <Label
    //             variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
    //             color={(row.original.active && 'success') || 'error'}
    //         >
    //             {renderedCellValue}
    //         </Label>
    //     ),
    // },
  ];

  return (
    <>
      <Grid container spacing={3} >
        <Grid item xs={openBloodTimeline ? 9 : 12}>
          {/* {openView && (
            <BarcodeViewer
              data={selectedRow}
              onClose={() => {
                setOpenView(false);
              }}
            />
          )} */}
          <Table
            // title={path}
            columns={columns}
            loading={isLoading}
            data={data || []}
            // data1={byIdList}
            enableStickyHeader
            enableColumnResizing
            enableColumnFilters
            enableRowVirtualization
            layoutMode='grid'
            enableRowActions
            renderTopToolbarCustomActions={AddDonorButton}
            renderRowActions={({ row }) => (
              <>
                {/* <IconButton
                  color='primary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    setOpenView(true);
                  }}
                >
                  <RemoveRedEyeOutlined />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSelectedRow(row.original);
                  }}
                >
                  <EditIcon />
                </IconButton> */}
                <IconButton
                  onClick={() => {
                    setSelectedRow(row.original);
                    setBloodTimelineOpen(true);
                  }}
                >
                  {row.original === selectedRow && openBloodTimeline ?
                    <KeyboardArrowLeftRounded color='primary' /> : <KeyboardArrowRightRounded />}
                </IconButton>
              </>
            )}
          />
        </Grid>
        {openBloodTimeline && (
          <Grid item xs={3}  >
            <BloodBagTimeline
              data={selectedRow}
              onClose={() => {
                setBloodTimelineOpen(false);
              }} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
