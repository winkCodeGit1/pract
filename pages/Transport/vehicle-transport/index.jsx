/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

import Table from 'components/table';
import AddVehicleTransports from './AddVehicleTransport';
import DeleteIcon from 'assets/DeleteIcon';
import EditIcon from 'assets/EditIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { vehicleMasterGetAllVehicleMasterByOrgId } from 'pages/api/transport';

export default function VehicleTransport({ path }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: transport, isPending } = useQuery({
    queryKey: ['vehicleMasterGetAllVehicleMasterByOrgId'],
    queryFn: vehicleMasterGetAllVehicleMasterByOrgId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const columns = [
    {
      header: 'Registration No.',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Class of Vehicle',
      accessorKey: 'className',
    },
    {
      header: 'Model Number',
      accessorKey: 'model',
    },
    {
      header: 'Year of Manufacture',
      accessorKey: 'yearOfManufacture',
    },
  ];
  return (
    <>
      {vehicleOpen && (
        <AddVehicleTransports
          onClose={() => {
            setVehicleOpen(false);
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
        data={transport || []}
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
                onClick={() => {
                  setVehicleOpen((ps) => !ps);
                  setSelectedRow(null);
                }}
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
                setVehicleOpen(true);
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
