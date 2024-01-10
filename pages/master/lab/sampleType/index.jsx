/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import AddSampleType from './AddSampleType';
import { useState } from 'react';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import { labSampleTypeAll } from 'pages/api/lab';
import { Add } from '@mui/icons-material';
import EditIcon from 'assets/EditIcon';

export default function SampleType({ path }) {
  const [openSampleType, setOpenSampleType] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const theme = useTheme();

  const columnsDef = [
    {
      header: 'Sample Type',
      accessorKey: 'sampleName',
    },
    {
      header: 'Test Unit',
      accessorKey: 'labTestUnitName',
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

  const { data, isPending } = useQuery({
    queryKey: ['labSampleTypeAll'],
    queryFn: labSampleTypeAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return (
    <>
      {openSampleType && (
        <AddSampleType
          onClose={() => {
            setOpenSampleType(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
          isEditMode={isEditMode}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={data || []}
        loading={isPending}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        enableActionColumn
        enableRowActions
        renderTopToolbarCustomActions={() => {
          return (
            <Button
              endIcon={<Add />}
              color='primary'
              onClick={() => {
                setSelectedRow(null);
                setOpenSampleType(true);
              }}
              variant='contained'
            >
              Add
            </Button>
          );
        }}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenSampleType(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
