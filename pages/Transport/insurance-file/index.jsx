import { useState } from 'react';

import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';
import { useQuery } from '@tanstack/react-query';

import AddRInsuranceFile from './AddInsuranceFile';
import EditIcon from 'assets/EditIcon';
import DeleteIcon from 'assets/DeleteIcon';
import DeleteDialog from 'pages/master/DeleteUI';

//api
import { insuranceFileGetAllInsuranceFile } from 'pages/api/transport';

function InsuranceFile({ path }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openInsurance, setOpenInsurance] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const { data: insuranceData, isPending } = useQuery({
    queryKey: ['insuranceFileGetAllInsuranceFile'],
    queryFn: insuranceFileGetAllInsuranceFile,
  });

  console.log(insuranceData, '---insuranceData');

  const columns = [
    {
      header: 'Registration Number',
      accessorKey: 'registrationNumber',
    },

    {
      header: 'Company Code/Name',
      accessorKey: 'companyName',
    },
    {
      header: 'Company Number',
      accessorKey: 'companyPhoneFaxNum',
    },
    {
      header: 'Type of Insurance',
      accessorKey: 'typesOfInsurance',
    },
    {
      header: 'Date of Insurance',
      accessorKey: 'dateOfInsurance',
    },
    {
      header: 'Amount Insured',
      accessorKey: 'amountInsured',
    },
    {
      header: 'Amount Paid',
      accessorKey: 'amountToBePaid',
    },
  ];
  return (
    <>
      {openInsurance && (
        <AddRInsuranceFile
          onClose={() => {
            setOpenInsurance(false);
            setSelectedRow(null);
          }}
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
        data={insuranceData || []}
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
                onClick={() => setOpenInsurance((ps) => !ps)}
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
                setOpenInsurance(true);
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

export default InsuranceFile;
