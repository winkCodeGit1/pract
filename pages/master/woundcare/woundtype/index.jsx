import { Button } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import Label from 'components/Label';
import AddWoundType from './AddWoundType';
import { useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from 'assets/EditIcon';
import { fetchWoundType } from 'pages/api/master';
import { useQuery } from '@tanstack/react-query';
export default function WoundType({ path }) {
  const [openType, setType] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const theme = useTheme();
  const columnsDef = [
    {
      header: 'Wound Type',
      accessorKey: 'typeName',
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
  const { data: typeName, isPending } = useQuery({
    queryKey: ['getPaymentModeGetallPaymentModes'],
    queryFn: fetchWoundType,
  });
  return (
    <>
      {openType && (
        <AddWoundType
          onClose={() => {
            setSelectedRow(null);
            setIsEditMode(false);
            setType(false);
          }}
          isEditMode={isEditMode}
          row={selectedRow}
          WoundTypeDetail={typeName}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={typeName || []}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowActions
        enableRowVirtualization
        layoutMode='grid'
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setType((ps) => !ps)}
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
              color='primary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setType(true);
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
