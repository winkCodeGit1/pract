import Table from 'components/table';
const path = 'kitchenDietDepartmentWise';

const data = [
  {
    department: 'Sample Department 1',
    ward: 'Sample Ward 1',
    orderSetOrDietQty: 'Sample Order Set/Diet Qty 1',
    status: 'Sample Status 1',
    action: 'Sample Action 1',
  },
  {
    department: 'Sample Department 2',
    ward: 'Sample Ward 2',
    orderSetOrDietQty: 'Sample Order Set/Diet Qty 2',
    status: 'Sample Status 2',
    action: 'Sample Action 2',
  },
];
//TODO : remove ACTION coumns

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
    header: 'Order Set/Diet Qty',
    accessorKey: 'orderSetOrDietQty',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Action',
    accessorKey: 'action',
  },
];

export default function DepartmentWise() {
  return (
    <div>
      <Table title={path} columns={columnsDef} data={data} />
    </div>
  );
}
