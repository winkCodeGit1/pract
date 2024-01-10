import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import AddMajorChange from './AddMajor';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { majorChangeGetAllMajorChange } from 'pages/api/transport';
import { generatePdf } from 'utils/dataExport';

function ChangesFile({ path }) {
  const [openMajorFile, setOpenMajorFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: majorFile, isPending } = useQuery({
    queryKey: ['majorChangeGetAllMajorChange'],
    queryFn: majorChangeGetAllMajorChange,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },

    {
      header: 'Old Part Number',
      accessorKey: 'oldPartNumber',
    },
    {
      header: 'New Part Number',
      accessorKey: 'newPartNumber',
    },

    {
      header: 'Date(Workshop In)',
      accessorKey: 'dateWorkshopIn',
    },
    {
      header: 'Date(Workshop Out)',
      accessorKey: 'dateWorkshopOut',
    },

    {
      header: 'Bill No.',
      accessorKey: 'billNumber',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openMajorFile && (
        <AddMajorChange
          onClose={() => {
            setOpenMajorFile(false);
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
        data={majorFile || []}
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
                onClick={() => setOpenMajorFile((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => {
                  generatePdf(majorFile, columns);
                }}
                variant='contained'
              >
                Export Data
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
                setOpenMajorFile(true);
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

export default ChangesFile;
