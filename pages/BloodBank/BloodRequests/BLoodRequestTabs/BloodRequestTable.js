/** @format */

import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from 'assets/EditIcon';
//import { getCountries } from 'pages/api/dashboard';
import Table from 'components/table';
import CrossMatchingForm from '../Forms/CrossMatchingForm';
import { RemoveRedEyeOutlined, KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
// import BarcodeViewer from './BarcodeViewer';
import BloodRequestsTimeline from './BloodRequestsTimeline/BloodRequestsTimeline';
// import Label from 'components/Label';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const donorId = 1;
export default function BloodRequestTable({ isLoading, data, AddDonorButton }) {
  // const [data, setData] = useState([]);
  // const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectRow, setSelectRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [openView, setOpenView] = useState(false);
  const [openBloodRequestsTimeline, setBloodRequestsTimeline] = useState(false);

  const columns = [
    {
      header: 'Booking ID',
      accessorKey: 'bookingId',
    },
    {
      header: 'Procedure Name',
      accessorKey: 'procedureName',
    },

    // {
    //   header: 'Barcode Number',
    //   accessorKey: 'barCode',
    // },
    // {
    //   header: 'Created Date Time',
    //   accessorKey: 'createdDatetime',
    // },

    {
      header: 'Platelet',
      accessorKey: 'platelet',
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
      <Grid container spacing={3}  >
        <Grid item xs={openBloodRequestsTimeline ? 9 : 12}>
          {isEditMode && (
            <CrossMatchingForm
              selectedRow={selectedRow}
              isEditMode={isEditMode}
              onClose={() => {
                setIsEditMode(false);
              }}
            />
          )}

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
                <IconButton
                  color='primary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    // setOpenView(true);
                  }}
                >
                  <RemoveRedEyeOutlined />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    setIsEditMode(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setSelectedRow(row.original);
                    setBloodRequestsTimeline(true);
                  }}
                >
                  {row.original === selectedRow && openBloodRequestsTimeline ?
                    <KeyboardArrowLeftRounded color='primary' /> : <KeyboardArrowRightRounded />}
                </IconButton>
              </>
            )}
          />
        </Grid>
        {openBloodRequestsTimeline && (
          <Grid item xs={3}  >
            <BloodRequestsTimeline
              data={selectedRow}
              onClose={() => {
                setBloodRequestsTimeline(false);
                // setIsEditMode(false);
              }}
            />
          </Grid>
        )}

      </Grid>
    </>
  );
}
