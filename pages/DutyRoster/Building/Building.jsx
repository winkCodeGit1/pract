import { Button, useTheme, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

//local imports
import AddBuildingType from './AddBuilding';
import { useQuery } from '@tanstack/react-query';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

//api
import { buildingGetAllBuildingsByOrgId } from 'pages/api/master';

export default function BuildingType({ path }) {
  const theme = useTheme();
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Building Name',
      accessorKey: 'buildingName',
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

  const { data: buildingType, isPending } = useQuery(
    {
      queryKey: ['buildingGetAllBuildingsByOrgId'],
      queryFn: buildingGetAllBuildingsByOrgId,
    }
    // { enabled: !!id }
  );
  console.log(buildingType);

  return (
    <>
      {openAdd && (
        <AddBuildingType
          onClose={() => {
            setAddOpen(false);
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
        data={buildingType || []}
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
        // enableRowActions
        // renderRowActions={({ row, table }) => (
        //   <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        //     <IconButton
        //       color='secondary'
        //       onClick={() => {
        //         table.setEditingRow(row);
        //       }}
        //     >
        //       <EditIcon />
        //     </IconButton>
        //     <IconButton
        //       color='error'
        //       onClick={() => {
        //         handelDeleteRow(row);
        //       }}
        //     >
        //       <DeleteIcon />
        //     </IconButton>
        //   </Box>
        // )}
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
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
