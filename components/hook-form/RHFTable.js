/** @format */

import { MaterialReactTable } from 'material-react-table';

export default function RHFTable({ columns, columnData, ...other }) {
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={columnData}
        {...other}
        enableDensityToggle
        initialState={{
          density: 'compact',
          columnVisibility: { id: false },
        }}
        muiTableHeadRowProps={{
          sx: {
            background: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            color: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[200],
            fontWeight: '500',
            fontSize: '1rem',
            boxShadow: 'unset !important',
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
          },
        }}
      />
    </>
  );
}
