import { Add } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';

//local imports
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';

//api
import { garbageCollectionGetAll } from 'pages/api/master';
import AddgarbageCollection from './AddgarbageCollection';

function GarbageCollection({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'Clean Date',
      accessorKey: 'cleanDateStr',
    },
    {
      header: 'Category Name',
      accessorKey: 'categoryName',
    },
  ];

  const { data: garbageCollectionsfetch, isPending } = useQuery(
    {
      queryKey: ['garbageCollectionGetAll'],
      queryFn: garbageCollectionGetAll,
    }
    // { enabled: !!id }
  );

  return (
    <>
      {openAdd && (
        <AddgarbageCollection
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
        data={garbageCollectionsfetch || []}
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
                console.log('------------------------', row.original);
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
export default GarbageCollection;
