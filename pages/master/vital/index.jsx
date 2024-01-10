/** @format */

import { useState } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';

//
import { useQuery } from '@tanstack/react-query';
//Local imports
import AddVital from './AddVital';
import Table from 'components/table';
import DeleteDialog from '../DeleteUI';
import Label from 'components/Label';
import DeleteIcon from 'assets/DeleteIcon';
import EditIcon from 'assets/EditIcon';
//api
import { vitalSignTypeGetAllVitalSignTypeInDto } from 'pages/api/master';

export default function VitalSign({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Type Name',
      accessorKey: 'typeName',
    },
    {
      header: 'UoM',
      accessorKey: 'uom',
    },

    {
      header: 'Min Value',
      accessorKey: 'minVal',
    },
    {
      header: 'Max Value',
      accessorKey: 'maxVal',
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

  const { data: vitalSignType, isPending } = useQuery({
    queryKey: ['vitalSignTypeGetAllVitalSignTypeInDto'],
    queryFn: vitalSignTypeGetAllVitalSignTypeInDto,
    placeholderData: [],
  });

  return (
    <>
      {openAdd && (
        <AddVital
          selectedRow={selectedRow}
          isEditMode={isEditMode}
          vitalDetail={vitalSignType}
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
          }}
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
        columns={columnsDef}
        loading={isPending}
        data={vitalSignType}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
        enableRowNumbers
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
