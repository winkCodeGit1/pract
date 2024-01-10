import { Button, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local
import Table from 'components/table';
import AddPackage from './AddPackage';
import Label from 'components/Label';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { fetchPackageDetailsByOrgId } from 'pages/api/master';

export default function PackageDetails({ path }) {
  const theme = useTheme();
  const [openAddPackage, setAddPackage] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Therapy Details',
      accessorKey: 'therapyName',
    },
    {
      header: 'Package Details',
      accessorKey: 'name',
    },
    {
      header: 'Duration',
      accessorKey: 'duration',
    },
    {
      header: 'Units',
      accessorKey: 'durationTypeName',
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
  const { data: packageDetails, isPending } = useQuery({
    queryKey: ['fetchPackageDetailsByOrgId'],
    queryFn: fetchPackageDetailsByOrgId,
  });

  return (
    <>
      {openAddPackage && (
        <AddPackage
          onClose={() => {
            setAddPackage(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
        />
      )}
      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={packageDetails || []}
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
                onClick={() => {
                  setAddPackage((ps) => !ps);
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
                setAddPackage(true);
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
