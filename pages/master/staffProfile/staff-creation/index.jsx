import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Add, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import Table from 'components/table';
import AddStaffType from './AddStaffCreation';
import { getStaffsByOrgId } from 'pages/api/master';
import Label from 'components/Label';
const orgId = 1;

export default function StaffCreation({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Staff Name',
      accessorKey: 'staffName',
    },
    {
      header: 'Role',
      accessorKey: 'roleId',
    },

    {
      header: 'Staff ID',
      accessorKey: 'staffId',
    },

    {
      header: 'DOB',
      accessorKey: 'dobStr',
    },

    {
      header: 'Relation Name',
      accessorKey: 'relationshipName',
    },

    {
      header: 'Mobile No.',
      accessorKey: 'mobile',
    },
    {
      header: 'Status',
      accessorKey: 'activeStatus',
      Cell: ({ renderedCellValue, row }) => (
        <Label variant='ghost' color={(row.original.active && 'success') || 'error'}>
          {renderedCellValue}
        </Label>
      ),
    },
  ];

  const { data: staffs, isPending } = useQuery({
    queryKey: ['getStaffsByOrgId', orgId],
    queryFn: getStaffsByOrgId,
  });

  return (
    <>
      {openAdd && (
        <AddStaffType
          onClose={() => {
            setAddOpen(false);
          }}
          isEditMode={isEditMode}
          selectedRow={selectedRow}
        />
      )}
      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={staffs}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        // muiTableContainerProps={{
        //   sx: { maxHeight: '500px' },
        // }}
        layoutMode='grid'
        renderTopToolbarCustomActions={() => (
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
        )}
        renderRowActions={({ row }) => (
          <IconButton
            color='secondary'
            onClick={() => {
              setSelectedRow(row.original);
              setIsEditMode(true);
              setAddOpen(true);
            }}
          >
            <Edit />
          </IconButton>
        )}
      />
    </>
  );
}
