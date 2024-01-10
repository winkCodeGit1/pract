import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';

import AddRTOFile from './AddRTOFile';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { rtoFileGetAllRtoFile } from 'pages/api/transport';
import { generatePdf } from 'utils/dataExport';

function RTOFile({ path }) {
  const [openRTO, setOpenRTO] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: rtoFile, isPending } = useQuery({
    queryKey: ['rtoFileGetAllRtoFile'],
    queryFn: rtoFileGetAllRtoFile,
  });

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },

    {
      header: 'Passed On',
      accessorKey: 'passedOnDate',
    },
    {
      header: 'Registration Valid Upto',
      accessorKey: 'validUpto',
    },
    {
      header: 'Color',
      accessorKey: 'color',
    },
    {
      header: 'Remark',
      accessorKey: 'remarks',
    },
  ];
  return (
    <>
      {openRTO && (
        <AddRTOFile
          onClose={() => {
            setOpenRTO(false);
            setIsEditMode(false);
            setSelectedRow(null);
          }}
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
        columns={columns}
        loading={isPending}
        data={rtoFile || []}
        enableStickyHeader
        enableColumnResizing
        rowNumberMode='original'
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
                onClick={() => setOpenRTO((ps) => !ps)}
                variant='contained'
              >
                Add
              </Button>
              <Button
                endIcon={<Add />}
                color='primary'
                onClick={() => {
                  generatePdf(rtoFile, columns);
                }}
                variant='contained'
              >
                Export Data
              </Button>
            </div>
          );
        }}
        // renderRowActions={() => (
        //   <>
        //     <IconButton
        //       color='secondary'
        //       sx={{ mr: 1 }}
        //       // size='small'
        //     >
        //       <EditIcon />
        //     </IconButton>
        //     <IconButton color='error' size='small'>
        //       <DeleteIcon />
        //     </IconButton>
        //   </>
        // )}
        renderRowActions={({ row }) => (
          <>
            <IconButton
              color='secondary'
              onClick={() => {
                setSelectedRow(row.original);
                setIsEditMode(true);
                setOpenRTO(true);
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

export default RTOFile;
