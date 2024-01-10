/** @format */

import { Button } from '@mui/material';
import Table from 'components/table';
import FormWrapper from 'components/FormWrapper';
import AddProductType from './AddProduct';
import { useState } from 'react';
import { Add } from '@mui/icons-material';

export default function ProductType({ path }) {
  const [open, setAddOpen] = useState(false);
  const columnsDef = [
    {
      header: 'Category',
      accessorKey: 'id',
    },
    {
      header: 'Product Type',
      accessorKey: 'productName',
      id: 'ProductName',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      id: 'status',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
    },
  ];

  return (
    <>
      {open && (
        <FormWrapper onClose={() => setAddOpen(false)} title='Add Product Type' maxWidth='xs'>
          <AddProductType />
        </FormWrapper>
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={[]}
        enableStickyHeader
        enableColumnResizing
        enableColumnFilters
        enableRowVirtualization
        layoutMode='grid'
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
