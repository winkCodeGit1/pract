import Table from 'components/table';
const path = 'kitchenDietPatientWise';

const columnsDef = [
  {
    header: 'S.No.',
    accessorKey: 'serialNumber',
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
    header: 'Patient Name/ID',
    accessorKey: 'patientNameOrID',
  },
  {
    header: 'Bed No.',
    accessorKey: 'bedNumber',
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
  },
];

//TODO : remove ACTION coumns
const data = [
  {
    serialNumber: 1,
    department: 'Sample Department 1',
    ward: 'Sample Ward 1',
    patientNameOrID: 'Patient 123',
    bedNumber: 'Bed 101',
    orderSet: 'Sample Order Set 1',
    mealType: 'Breakfast',
    status: 'Active',
  },
  {
    serialNumber: 2,
    department: 'Sample Department 2',
    ward: 'Sample Ward 2',
    patientNameOrID: 'Patient 456',
    bedNumber: 'Bed 202',
    orderSet: 'Sample Order Set 2',
    mealType: 'Lunch',
    status: 'Inactive',
  },
  // Add more data as needed
];

export default function PatientWise() {
  return (
    <div>
      <Table title={path} columns={columnsDef} data={data} />
    </div>
  );
}
