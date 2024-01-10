import { Button } from '@mui/material';
import Table from 'components/table';
import AddProcedure from './AddProcedure';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import DeleteDialog from '../DeleteUI';
import DeleteIcon from 'assets/DeleteIcon';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';
import { useTheme } from '@emotion/react';
import { surgicalProceduresGetAll } from 'pages/api/master';

function ProcedureDetails({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const theme = useTheme();
  const columnsDef = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Procedures',
      accessorKey: 'isParaSurgical',
    },
    {
      header: 'Comments',
      accessorKey: 'comments',
    },
    {
      header: 'Status',
      accessorKey: 'activeStatus',
      Cell: ({ row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.active && 'success') || 'error'}
        >
          {row.original.active ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];
  const { data: paraSurgical, isPending } = useQuery({
    queryKey: ['surgicalProceduresGetAll'],
    queryFn: surgicalProceduresGetAll,
    placeholderData: [],
  });
  return (
    <>
      {openAdd && (
        <AddProcedure
          isEditMode={isEditMode}
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
          }}
          selectedRow={selectedRow}
        />
      )}
      {openDelete && (
        <DeleteDialog
          name={selectedRow.name}
          url={'url'}
          onClose={() => {
            setDeleteOpen(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={paraSurgical}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setAddOpen((ps) => !ps)}
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
              color='primary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setAddOpen(true);
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setSelectedRow(row.original);
                setDeleteOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}

export default ProcedureDetails;
