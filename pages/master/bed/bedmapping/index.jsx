import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
// import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import AddBedMapType from './AddBedMap';

//api
import { bedFetchAllBedByOrgId } from 'pages/api/master';
import { useQuery } from '@tanstack/react-query';

export default function BedMap({ path }) {
  // const theme = useTheme();
  const [openBed, setBed] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Building',
      accessorKey: 'buildingName',
    },
    {
      header: 'Ward Type',
      accessorKey: 'wardType',
    },
    {
      header: 'Ward',
      accessorKey: 'wardName',
    },
    {
      header: 'Bed Type',
      accessorKey: 'bedTypeName',
      // Cell: ({ row }) => (
      //   <Label
      //     variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
      //     color={(row.original.status && 'success') || 'error'}
      //   >
      //     {row.original.status ? 'Active' : 'Inactive'}
      //   </Label>
      // ),
    },
  ];

  const { data } = useQuery({
    queryKey: ['bedFetchAllBedByOrgId'],
    queryFn: bedFetchAllBedByOrgId,
  });

  return (
    <>
      {openBed && (
        <AddBedMapType
          onClose={() => {
            setBed(false);
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
        // loading={isPending}
        data={data || []}
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
