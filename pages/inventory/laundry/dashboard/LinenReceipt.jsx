/* eslint-disable no-unused-vars */
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ReportLinenDialog from 'components/ReportLinenOrder';
import { laundryItemGetAll, linenOrderById, linenProcessGetAll } from 'pages/api/laundry';
import { useEffect, useState } from 'react';

function LinenReceipt({ onClose, row }) {
  const [linenData, setLinenData] = useState([]);

  const { data: getLinenOrderData } = useQuery({
    queryKey: ['linenOrderById', row?.id],
    queryFn: linenOrderById,
    enabled: !!row?.id,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: linenItemCodeList } = useQuery({
    queryKey: ['laundryItemGetAll'],
    queryFn: laundryItemGetAll,
  });

  const { data: linenProcessList } = useQuery({
    queryKey: ['linenProcessGetAll'],
    queryFn: linenProcessGetAll,
  });

  useEffect(() => {
    setLinenData(
      getLinenOrderData?.map((el) => ({
        ...el,
        LinenItemCode: linenItemCodeList?.find((e) => e.id === el.LinenItemCode),
        Processed: linenProcessList?.find((e) => e.id === el.Processed),
      }))
    );
  }, [getLinenOrderData, linenItemCodeList, linenProcessList]);

  return (
    <ReportLinenDialog onClose={onClose} fullWidth row={row} maxWidth='lg'>
      <TableContainer sx={{ position: 'relative', mt: 2 }}>
        <Table
          size='small'
          sx={{
            border: 0,
            zIndex: 2,
            position: 'relative',
          }}
          id='my-table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Location: <span style={{ fontWeight: 400 }}>{row?.collectionLocationName}</span>
              </TableCell>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Department: <span style={{ fontWeight: 400 }}>{row?.deptCollectedFromName}</span>
              </TableCell>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Staff: <span style={{ fontWeight: 400 }}>{row?.staffIdCollectedFromName}</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableHead>
            <TableCell
              sx={{
                background: 'white',
                borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                color: 'black',
                fontWeight: 700,
              }}
            >
              Linen Item Code
            </TableCell>
            <TableCell
              sx={{
                background: 'white',
                borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                color: 'black',
                fontWeight: 700,
              }}
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{
                background: 'white',
                borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                color: 'black',
                fontWeight: 700,
              }}
            >
              Process
            </TableCell>
          </TableHead>
          <TableBody>
            {linenData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.LinenItemCode?.label}</TableCell>
                <TableCell>{item?.Qty}</TableCell>
                <TableCell>{item?.Processed?.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ReportLinenDialog>
  );
}

export default LinenReceipt;
