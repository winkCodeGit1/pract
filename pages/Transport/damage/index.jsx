import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import AddDamage from './AddDamage';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { damageGetAllDamage } from 'pages/api/transport';

function DamageFiles({ path }) {
  const [openDamageFile, setOpenDamageFile] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: damageFile, isPending } = useQuery({
    queryKey: ['damageGetAllDamage'],
    queryFn: damageGetAllDamage,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },
    {
      header: 'Part(s) Name',
      accessorKey: 'partName',
    },

    {
      header: 'Part Cost',
      accessorKey: 'partCost',
    },

    {
      header: 'Refund From Insurance Company',
      accessorKey: 'refundfromInsuranceCompany',
    },

    {
      header: 'Remarks',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openDamageFile && (
        <AddDamage
          onClose={() => {
            setOpenDamageFile(false);
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
        data={damageFile || []}
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
                onClick={() => setOpenDamageFile((ps) => !ps)}
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
                setOpenDamageFile(true);
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

export default DamageFiles;
