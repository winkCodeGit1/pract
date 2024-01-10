import { useState } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
//

//Local imports
import AddOpType from './addOpType';
import DeleteDialog from '../../DeleteUI';
import Label from 'components/Label';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
//api
import { departmentGetAllDeptByOrgIdTypeId } from 'pages/api/master';

const orgId = 1;
const typeId = 1;

export default function OPType({ path }) {
  const theme = useTheme();
  const [openAdd, setAddButton] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const columnsDef = [
    {
      header: 'OP Type',
      accessorKey: 'deptName',
    },
    {
      header: 'Short Name',
      accessorKey: 'shortName',
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

  const { data: opType, isPending } = useQuery({
    queryKey: ['departmentGetAllDeptByOrgIdTypeId', orgId, typeId],
    queryFn: departmentGetAllDeptByOrgIdTypeId,
    placeholderData: [],
  });

  return (
    <>
      {openAdd && (
        <AddOpType
          selectedRow={selectedRow}
          isEditMode={isEditMode}
          opDetail={opType}
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
        data={opType}
        enableStickyHeader
        enableColumnResizing
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
              // size='small'
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
