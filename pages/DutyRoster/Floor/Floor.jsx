import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import AddFloorType from './AddFloor';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Add } from '@mui/icons-material';
// import Label from 'components/Label';
import DeleteDialog from 'pages/master/DeleteUI';
import EditIcon from 'assets/EditIcon';
// import DeleteIcon from 'assets/DeleteIcon';

//api
import { getAllBuildingList } from 'pages/api/master';

export default function FloorType({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Building',
      accessorKey: 'buildingName',
    },
    {
      header: 'Floors',
      accessorKey: 'floorNamesList',
    },
  ];

  const { data: floorType, isPending } = useQuery(
    {
      queryKey: ['getAllBuildingList'],
      queryFn: getAllBuildingList,
    }
    // { enabled: !!id }
  );

  return (
    <>
      {openAdd && (
        <AddFloorType
          onClose={() => {
            setAddOpen(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
          FloorTypeList={floorType}
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
        columns={columnsDef}
        loading={isPending}
        data={floorType || []}
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
