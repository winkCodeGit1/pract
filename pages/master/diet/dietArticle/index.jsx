import { Add } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import AddDietArticle from './AddDietArticle';
import { useQuery } from '@tanstack/react-query';
import { dietArticleGetAll } from 'pages/api/diet-kitchen';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';

export default function DietArticle({ path }) {
  const [openAdd, setAddOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const columnsDef = [
    {
      header: 'Diet Article',
      accessorKey: 'dietArticleName',
    },
    {
      header: 'UoM',
      accessorKey: 'uomName',
    },
    {
      header: 'Status',
      accessorKey: 'active',
      Cell: ({ row }) => (
        <Label variant={'ghost'} color={(row.original.active && 'success') || 'error'}>
          {row.original.active ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['DietArticleGetAll'],
    queryFn: dietArticleGetAll,
  });

  return (
    <>
      {openAdd && (
        <AddDietArticle
          onClose={() => {
            setAddOpen(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={data || []}
        loading={isLoading}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
        enableActionColumn
        enableRowActions
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setAddOpen(true);
              }}
              sx={{ mr: 1 }}
              // size='small'
            >
              <EditIcon />
            </IconButton>
          </>
        )}
        renderTopToolbarCustomActions={() => {
          return (
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
          );
        }}
      />
    </>
  );
}
