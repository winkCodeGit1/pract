import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import AddTyres from './AddTyres';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { tyresGetAllTyres } from 'pages/api/transport';
import { generatePdf } from 'utils/dataExport';

function TyresFile({ path }) {
  const [openPolutionFile, setOpenPolutionFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: tyreFile, isPending } = useQuery({
    queryKey: ['tyresGetAllTyres'],
    queryFn: tyresGetAllTyres,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Make Of Tyre',
      accessorKey: 'makeOfTyre',
    },

    {
      header: 'Date Of Issue',
      accessorKey: 'dateOfIssue',
    },

    {
      header: 'Date Of Replacement',
      accessorKey: 'dateOfReplacement',
    },
    {
      header: 'Bill No.',
      accessorKey: 'billNumber',
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
      {openPolutionFile && (
        <AddTyres
          onClose={() => {
            setOpenPolutionFile(false);
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
        data={tyreFile || []}
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
                onClick={() => setOpenPolutionFile((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => {
                  generatePdf(tyreFile, columns);
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
                setOpenPolutionFile(true);
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

export default TyresFile;
