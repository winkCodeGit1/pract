import { EmptyIcon } from 'assets';
import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useState } from 'react';
import { scrollStyle } from 'components/Scrollbar';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { generateCsv, generatePdf } from 'utils/dataExport';
import ExportExcel from 'assets/Images/export-excel.png';
import ExportPdf from 'assets/Images/export-pdf.png';

export const tableOption = {
  enableDensityToggle: false,
  enableStickyHeader: true,
  // enableColumnResizing: true,
  enableColumnFilters: true,
  // enableRowVirtualization: true,

  localization: {
    noRecordsToDisplay: (
      <>
        <EmptyIcon />
        No Record To Display!
      </>
    ),
  },
  initialState: {
    density: 'compact',
    globalFilterFn: 'fuzzy',
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
  },
  selectAllMode: 'all',
  muiPaginationProps: {
    rowsPerPageOptions: [10, 20, 40, 100, 500],
  },
  // layoutMode: 'grid',
  positionActionsColumn: 'last',
  muiTablePaperProps: ({ table }) => ({
    style: {
      zIndex: table.getState().isFullScreen ? 1200 : undefined,
    },
  }),
  muiTableBodyProps: ({ table }) => ({
    style: {
      minHeight: table.getState().isFullScreen ? 500 : 300,
    },
  }),
};

export default function Table({
  columns,
  data = [],
  title,
  loading,
  pageSize = 10,
  tableRef,
  exportData,
  ...other
}) {
  const initialState = title ? JSON.parse(window.localStorage.getItem(title)) || {} : {};
  const [columnVisibility, setColumnVisibility] = useState(initialState);
  // const [counter, setCounter] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (type, table) => {
    if (type === 2) {
      generatePdf(
        Object.values(table.getRowModel().rowsById).map((el) => el.original),
        table
          .getLeafHeaders()
          .map((e) => ({
            header: e.column.columnDef.header,
            accessorKey: e.column.columnDef.accessorKey,
          }))
          .filter((el) => el.accessorKey !== undefined)
      );
    } else if (type === 1) {
      // console.log(table.getRowModel().rowsById);
      generateCsv(
        Object.values(table.getRowModel().rowsById).map((el) => el.original),
        table
          .getLeafHeaders()
          .map((e) => ({
            header: e.column.columnDef.header,
            accessorKey: e.column.columnDef.accessorKey,
          }))
          .filter((el) => el.accessorKey !== undefined)
      );
    }

    setAnchorEl(null);
  };

  useEffect(() => {
    if (title) {
      window.localStorage.setItem(title, JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const commonTableObj = {
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableColumnResizing: true,
    enableColumnFilters: true,
    enableRowVirtualization: true,

    localization: {
      noRecordsToDisplay: (
        <>
          <EmptyIcon />
          <span style={{ display: 'block' }}>No Record To Display!</span>
        </>
      ),
    },
    initialState: {
      density: 'compact',
      globalFilterFn: 'fuzzy',
      pagination: {
        pageSize: pageSize,
        pageIndex: 0,
      },
    },
    selectAllMode: 'all',
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 40, 100, 500],
    },
    layoutMode: 'grid',
    positionActionsColumn: 'last',
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1200 : undefined,
      },
    }),
    muiTableBodyProps: ({ table }) => ({
      style: {
        minHeight: table.getState().isFullScreen ? 500 : 300,
        maxHeight: table.getState().isFullScreen ? '100%' : 650,
      },
    }),

    muiTableContainerProps: {
      sx: {
        ...scrollStyle,
      },
    },
    columns: columns,
    data: data,
    state: {
      showSkeletons: loading,
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: (r) => {
      if (typeof r === 'function') {
        setColumnVisibility((ps) => ({ ...ps, ...r() }));
      } else {
        setColumnVisibility(r);
      }
    },

    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />

        {exportData && (
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVert />
          </IconButton>
        )}
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleClose(1, table)}>
            <img src={ExportExcel} width='28' style={{ marginRight: '8px' }} />
            Export to Excel
          </MenuItem>
          <MenuItem onClick={() => handleClose(2, table)}>
            <img src={ExportPdf} width='28' style={{ marginRight: '8px' }} />
            Export to PDF
          </MenuItem>
        </Menu>
      </>
    ),
    ...other,
  };

  const table = columns ? useMaterialReactTable(commonTableObj) : tableRef;

  // useEffect(() => {
  //   setCounter(counter + 1);
  // }, [table.getState().isFullScreen]);

  // console.log(table.getState(), 'table-state', counter);

  return <MaterialReactTable table={table} />;
}
