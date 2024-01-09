/** @format */

import { useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';

import Table from 'components/table';

import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';

import LabTestResults from './LabTestResults';

export default function BloodInventoryTable({ data, title, isLoading }) {

  const [selectedRow, setSelectedRow] = useState(null);
  const [openLabTestResults, setLabTestResults] = useState(false); (false);

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
        <Grid item xs={openLabTestResults ? 9 : 12}>
          <Table
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
            renderTopToolbarCustomActions={() => {
              return (
                <Typography variant='h6' fontWeight={600}>
                  {'Blood Group ' + title}
                </Typography>
              );
            }}
            renderRowActions={({ row }) => (
              <>
                <IconButton
                  onClick={() => {
                    setSelectedRow(row.original);
                    setLabTestResults(true);
                  }}
                >
                  {row.original === selectedRow && openLabTestResults ?
                    <KeyboardArrowLeftRounded color='primary' /> : <KeyboardArrowRightRounded />}
                </IconButton>
              </>
            )}
          />
        </Grid>
        {openLabTestResults && (
          <Grid item xs={3}  >
            <LabTestResults
              data={selectedRow}
              onClose={() => {
                setLabTestResults(false);
              }} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
