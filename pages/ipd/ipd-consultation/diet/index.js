import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import Label from 'components/Label';
import Table from 'components/table';
import OrderBulkMeal from 'pages/diet-kitchen/bulk-meal-order/OrderBulkMeal';
import { useState } from 'react';
const path = 'diet-record';

const data = [
  {
    trackingId: 'wwd23',
    department: 'NMC',
    ward: 'General ward',
    orderSet: 'roti',
    status: '5',
  },
  {
    trackingId: 'ss4543',
    department: 'TNC',
    ward: 'General ward',
    orderSet: 'roti',
    status: '5',
  },
];

export default function Diet() {
  const [openAdd, setOpenAdd] = useState(false);
  const columnsDef = [
    {
      header: 'Tracking Id',
      accessorKey: 'trackingId',
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },

    {
      header: 'Ward',
      accessorKey: 'ward',
    },
    {
      header: 'Order Set',
      accessorKey: 'orderSet',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      Cell: () => (
        <Label
          sx={{ minWidth: 120 }}
          variant={'ghost'}
          // color={statusMap[row.original.status].color}
        >
          {/* {statusMap[row.original.status].label} */}
        </Label>
      ),
    },
  ];
  return (
    <div>
      {openAdd && (
        <OrderBulkMeal
          onClose={() => {
            setOpenAdd(false);
          }}
        />
      )}

      <Table
        title={path}
        columns={columnsDef}
        data={data}
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setOpenAdd((ps) => !ps)}
            variant='contained'
          >
            Order Meal
          </Button>
        )}
      />
    </div>
  );
}
