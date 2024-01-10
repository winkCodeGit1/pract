import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import AddOil from './AddOil';

//api
import { oilGetAll } from 'pages/api/transport';

function OilVehicle({ path }) {
  const [openOilFile, setOpenFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  //   const [openDelete, setDeleteOpen] = useState(false);

  const { data: tyreFile, isPending } = useQuery({
    queryKey: ['oilGetAll'],
    queryFn: oilGetAll,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Type of oil',
      accessorKey: 'typeOfOil',
    },
    {
      header: 'Date Of Change Or Filling',
      accessorKey: 'dateOfChangeOrFilling',
    },

    {
      header: 'Bill Number',
      accessorKey: 'billNumber',
    },

    {
      header: 'Petrol Pump Address',
      accessorKey: 'dealerOrPetrolPumpAddress',
    },
    {
      header: 'meter Reading',
      accessorKey: 'meterReading',
    },
    {
      header: 'Amount(In Rs)',
      accessorKey: 'amount',
    },
    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openOilFile && (
        <AddOil
          onClose={() => {
            setOpenFile(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={tyreFile || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
        enableColumnFilters
        enableRowVirtualization
        enableActionColumn
        enableRowActions
        layoutMode='grid'
        exportData
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenFile((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
            </div>
          );
        }}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenFile(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}

export default OilVehicle;
