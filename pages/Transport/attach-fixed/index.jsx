import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import AddAttachFixed from './AddAttachVehicle';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { AttachedOrFixedVehicleGetAllAttachedorFixedVehicle } from 'pages/api/transport';

function AttachFixedVehicle({ path }) {
  const [openFixed, setOpenFixed] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: attachFixedFile, isPending } = useQuery({
    queryKey: ['AttachedOrFixedVehicleGetAllAttachedorFixedVehicle'],
    queryFn: AttachedOrFixedVehicleGetAllAttachedorFixedVehicle,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Attached/Fixed With (Emp. Code)',
      accessorKey: 'staffName',
    },
    {
      header: 'Date Of Attachment',
      accessorKey: 'dateOfAttachment',
    },
    {
      header: 'Attached Upto',
      accessorKey: 'attachedUpto',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openFixed && (
        <AddAttachFixed
          onClose={() => {
            setOpenFixed(false);
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
        data={attachFixedFile || []}
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
                onClick={() => setOpenFixed((ps) => !ps)}
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
                setOpenFixed(true);
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

export default AttachFixedVehicle;
