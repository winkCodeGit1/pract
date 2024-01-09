/** @format */

import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from 'assets/EditIcon';
//import { getCountries } from 'pages/api/dashboard';
import Table from 'components/table';
import PhysicalExamination from '../Forms/PhysicalExaminationForm';
import { RemoveRedEyeOutlined, KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import BarcodeViewer from './BarcodeViewer';
// import BloodBagTimeline from '../BloodBagTimeline/BloodBagTimeline';
import BloodScreenFrom from '../Forms/BloodScreeningForm';
// import Label from 'components/Label';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const donorId = 1;
export default function DonorTable({ isLoading, data, AddDonorButton }) {
  // const [data, setData] = useState([]);
  // const theme = useTheme();
  const [AddButton, setAddButton] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectRow, setSelectRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [openBloodTimeline, setBloodTimelineOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openBloodScreenFrom, setBloodScreenFrom] = useState(false);

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
      header: 'Mobile No...',
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
      <Grid container spacing={3}  >
        <Grid item xs={openBloodScreenFrom ? 4 : 12}>
          {AddButton && (
            <PhysicalExamination
              selectedRow={selectedRow}
              isEditMode={isEditMode}
              onClose={() => {
                setAddButton(false);
                setIsEditMode(false);
              }}
            />
          )}
          {openView && (
            <BarcodeViewer
              data={selectedRow}
              onClose={() => {
                setOpenView(false);
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
                    setOpenView(true);
                  }}
                >
                  <RemoveRedEyeOutlined />
                </IconButton>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    setIsEditMode(true);
                    setAddButton(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setSelectedRow(row.original);
                    setBloodScreenFrom(true);
                  }}
                >
                  {row.original === selectedRow && openBloodScreenFrom ?
                    <KeyboardArrowLeftRounded color='primary' /> : <KeyboardArrowRightRounded />}
                </IconButton>
              </>
            )}
          />
        </Grid>
        {openBloodScreenFrom && (
          <Grid item xs={8}  >
            <BloodScreenFrom
              data={selectedRow}
              // selectRow={selectRow}
              // isEditMode={isEditMode}
              onClose={() => {
                setBloodScreenFrom(false);
                // setIsEditMode(false);
              }}

            />
          </Grid>
        )}

      </Grid>
    </>
  );
}
