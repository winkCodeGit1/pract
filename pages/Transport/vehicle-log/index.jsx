import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import AddVehicleLog from './AddVehicleLog';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { vehicleLogBookGetAllVehicleLogBook } from 'pages/api/transport';

function VehicleLog({ path }) {
  const [openLog, setOpenLog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: logBookFle, isPending } = useQuery({
    queryKey: ['vehicleLogBookGetAllVehicleLogBook'],
    queryFn: vehicleLogBookGetAllVehicleLogBook,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Employee Code',
      accessorKey: 'staffName',
    },
    {
      header: 'Date & Time–From',
      accessorKey: 'fromDateTime',
    },
    {
      header: 'Date & Time –To',
      accessorKey: 'toDateTime',
    },
    {
      header: 'Place Visited',
      accessorKey: 'placeVisited',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openLog && (
        <AddVehicleLog
          onClose={() => {
            setOpenLog(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}
      {openDelete && (
        <DeleteDialog
          name={selectedRow.typeName}
          url={'someUrl'}
          onClose={() => {
            setDeleteOpen(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={logBookFle || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
        enableColumnFilters
        enableRowVirtualization
        enableActionColumn
        enableRowActions
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setOpenLog((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
            </div>
          );
        }}
        // renderRowActions={() => (
        //   <>
        //     <IconButton
        //       color='secondary'
        //       sx={{ mr: 1 }}
        //       // size='small'
        //     >
        //       <EditIcon />
        //     </IconButton>
        //     <IconButton color='error' size='small'>
        //       <DeleteIcon />
        //     </IconButton>
        //   </>
        // )}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenLog(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setSelectedRow(row.original);
                setDeleteOpen(true);
              }}
              size='small'
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}

export default VehicleLog;
