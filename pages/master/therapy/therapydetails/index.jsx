import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local
import AddTherapyDetails from './AddTherapy';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import { useQuery } from '@tanstack/react-query';

//api
import { therapyDetailsFetchTherapyDetailsByOrgId } from 'pages/api/master';

export default function TherapyDetails({ path }) {
  const theme = useTheme();
  const [openTherapy, setTherapy] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Therapy Details',
      accessorKey: 'name',
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

  const { data: therapydetail, isPending } = useQuery({
    queryKey: ['therapyDetailsFetchTherapyDetailsByOrgId'],
    queryFn: therapyDetailsFetchTherapyDetailsByOrgId,
  });

  return (
    <>
      {openTherapy && (
        <AddTherapyDetails
          onClose={() => {
            setTherapy(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          therapyDetails={therapydetail}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={therapydetail || []}
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
                onClick={() => setTherapy((ps) => !ps)}
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
                setTherapy(true);
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
