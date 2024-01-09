/** @format */

import { Button, useTheme, IconButton } from '@mui/material';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import EditIcon from 'assets/EditIcon';
import Label from 'components/Label';

//local imports
import { useQuery } from '@tanstack/react-query';
import Table from 'components/table';
import AddConsultationType from './AddConsultation';

//api
import { consultationRoomGetAllConsultationRoomByOrg } from 'pages/api/master';

export default function ConsultationType({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Room Name',
      accessorKey: 'roomName',
    },
    {
      header: 'Building Name',
      accessorKey: 'buildingName',
    },
    {
      header: 'Status',
      accessorKey: 'active',

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

  const { data: RoomType, isLoading } = useQuery({
    queryKey: ['consultationRoomGetAllConsultationRoomByOrg'],
    queryFn: consultationRoomGetAllConsultationRoomByOrg,
  });
  console.log(RoomType);

  return (
    <>
      {openAdd && (
        <AddConsultationType
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          floorDetail={RoomType}
        />
      )}
      <Table
        title={path}
        columns={columnsDef}
        loading={isLoading}
        data={RoomType || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
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
                onClick={() => {
                  setAddOpen((ps) => !ps);
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
                setAddOpen(true);
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
