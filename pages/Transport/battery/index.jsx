import { useState } from 'react';

import { Box, Button, Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';
import { batteryGetAllBattery } from 'pages/api/transport';
import AddBatteryDetails from './AddBattery';

function BatteryDetails({ path }) {
  const [openBatteryDetails, setopenBatteryDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: batteryFile, isPending } = useQuery({
    queryKey: ['batteryGetAllBattery'],
    queryFn: batteryGetAllBattery,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Battery Number',
      accessorKey: 'batteryNumber',
    },
    {
      header: 'Date Of Change/ Recharge',
      accessorKey: 'dateOfChangeRecharge',
    },
    {
      header: 'Voltage',
      accessorKey: 'voltage',
    },
    {
      header: 'Bill Number',
      accessorKey: 'billNumber',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openBatteryDetails && (
        <AddBatteryDetails
          onClose={() => {
            setopenBatteryDetails(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Table
            title={path}
            columns={columns}
            loading={isPending}
            data={batteryFile || []}
            enableStickyHeader
            enableColumnResizing
            enableColumnFilters
            enableRowVirtualization
            layoutMode='grid'
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                  color='secondary'
                  onClick={() => {
                    setSelectedRow(row.original);
                    setopenBatteryDetails(true);
                    setIsEditMode(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                {/* <IconButton
                  color='error'
                  onClick={() => {
                    data.splice(row.index, 1);
                  }}
                >
                  <DeleteIcon />
                </IconButton> */}
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color='primary'
                endIcon={<Add />}
                onClick={() => setopenBatteryDetails((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BatteryDetails;
