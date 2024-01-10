import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import AddPolutionFile from './AddPolutionFile';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { pollutionFileGetAllPollutionFile } from 'pages/api/transport';

function PolutionFile({ path }) {
  const [openPolutionFile, setOpenPolutionFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: pollutionFile, isPending } = useQuery({
    queryKey: ['pollutionFileGetAllPollutionFile'],
    queryFn: pollutionFileGetAllPollutionFile,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },

    {
      header: 'Checked On',
      accessorKey: 'checkedOn',
    },
    {
      header: 'Registration Valid Upto',
      accessorKey: 'validUpto',
    },
    {
      header: 'Bill No.',
      accessorKey: 'billNumber',
    },
    {
      header: 'Paid Amount',
      accessorKey: 'amountPaid',
    },
    {
      header: 'Issued By',
      accessorKey: 'doneByCompany',
    },
    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openPolutionFile && (
        <AddPolutionFile
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
        data={pollutionFile || []}
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

export default PolutionFile;
