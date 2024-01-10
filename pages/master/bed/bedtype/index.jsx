import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//loacl
import AddBedType from './AddBedType';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { bedTypeFetchBedType } from 'pages/api/master';

export default function BedType({ path }) {
  const theme = useTheme();
  const [openBed, setBed] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const columns = [
    {
      header: 'Bed Type',
      accessorKey: 'bedType',
    },
    {
      header: 'Bed Charge',
      accessorKey: 'charge',
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

  const { data: bedTypes, isPending } = useQuery({
    queryKey: ['bedTypeFetchBedType'],
    queryFn: bedTypeFetchBedType,
  });

  return (
    <>
      {openBed && (
        <AddBedType
          onClose={() => {
            setBed(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          bedTypeDetails={bedTypes}
        />
      )}

      <Table
        title={path}
        columns={columns}
        loading={isPending}
        data={bedTypes || []}
        enableStickyHeader
        enableColumnResizing
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
                onClick={() => {
                  setBed((ps) => !ps);
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
                setBed(true);
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
