import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import AddRequestFile from './AddVehicleRequest';
import DeleteDialog from 'pages/master/DeleteUI';
import Label from 'components/Label';

//api
import { vehicleRequestGetAllVehicleRequest } from 'pages/api/transport';

function RequestFile({ path }) {
  const theme = useTheme();
  const [openRequestedFile, setOpenRequestedFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: requestedFile, isPending } = useQuery({
    queryKey: ['vehicleRequestGetAllVehicleRequest'],
    queryFn: vehicleRequestGetAllVehicleRequest,
  });

  const columns = [
    {
      header: 'Employee Code',
      accessorKey: 'staffName',
    },
    {
      header: 'Request Number',
      accessorKey: 'requestNumber',
    },
    {
      header: 'Vehicle Class',
      accessorKey: 'className',
    },
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },

    {
      header: 'Request Accepted',
      accessorKey: 'requestAccepted',
      Cell: ({ row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.requestAccepted === 'Y' && 'success') || 'error'}
        >
          {row.original.requestAccepted === 'Y' ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];
  return (
    <>
      {openRequestedFile && (
        <AddRequestFile
          onClose={() => {
            setOpenRequestedFile(false);
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
        data={requestedFile || []}
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
                onClick={() => setOpenRequestedFile((ps) => !ps)}
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
                setOpenRequestedFile(true);
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

export default RequestFile;
