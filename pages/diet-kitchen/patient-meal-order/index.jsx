import { useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'components/table';
import Label from 'components/Label';
import OrderBulkMeal from './PatientMealOrder';

const data = [
  {
    department: 'Cardiology',
    ward: 'Ward A',
    patientId: 'P001',
    bedNumber: '101',
    orderSet: 'Standard',
    mealType: 'Lunch',
    status: 'pending',
  },
  {
    department: 'Orthopedics',
    ward: 'Ward B',
    patientId: 'P002',
    bedNumber: '102',
    orderSet: 'Special',
    mealType: 'Dinner',
    status: 'dispatched',
  },
  // Add more sample data as needed
];

export default function PatientMealOrder({ path }) {
  const [openAdd, setOpenAdd] = useState(false);
  const columnsDef = [
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Ward',
      accessorKey: 'ward',
    },

    {
      header: 'Patient Name/Id',
      accessorKey: 'patientId',
    },
    {
      header: 'Bed No.',
      accessorKey: 'bedNo',
    },
    {
      header: 'Order Set',
      accessorKey: 'orderSet',
    },
    {
      header: 'Meal Type',
      accessorKey: 'mealType',
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
    <>
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
    </>
  );
}
