import { useState } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { Add } from '@mui/icons-material';

//local imports
import { useQuery } from '@tanstack/react-query';

import AddIpType from './AddIpType';
import DeleteDialog from '../../DeleteUI';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
//api

import { departmentGetAllDeptByOrgIdTypeId } from 'pages/api/master';

const orgId = 1;
const typeId = 2;

export default function IpType({ path }) {
  const theme = useTheme();
  const [openAdd, setAddButton] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnsDef = [
    {
      header: 'IP Type',
      accessorKey: 'deptName',
    },
    {
      header: 'Short Name',
      accessorKey: 'shortName',
      id: 'shortName',
    },

    {
      header: 'Status',
      accessorKey: 'activeStatus',
      Cell: ({ renderedCellValue, row }) => (
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(row.original.active && 'success') || 'error'}
        >
          {renderedCellValue}
        </Label>
      ),
    },
  ];

  const { data: ipType, isPending } = useQuery({
    queryKey: ['departmentGetAllDeptByOrgIdTypeId', orgId, typeId],
    queryFn: departmentGetAllDeptByOrgIdTypeId,
    placeholderData: [],
  });

  return (
    <>
      {openAdd && (
        <AddIpType
          selectedRow={selectedRow}
          isEditMode={isEditMode}
          ipDetail={ipType}
          onClose={() => {
            setAddButton(false);
            setIsEditMode(false);
          }}
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
        data={ipType}
        enableStickHeader
        enableColumnResizing
        rowNumberMode='original'
        enableRowNumbers
        enableColumnFilters
        enableRowVirtualization
        enableRowActions
        LayoutMode='grid'
        exportData
        renderTopToolbarCustomActions={() => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => setAddButton((ps) => !ps)}
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
                setAddButton(true);
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              onClick={() => {
                setSelectedRow(row.original);
                setDeleteOpen(true);
              }}
              size='small'
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      />
    </>
  );
}
