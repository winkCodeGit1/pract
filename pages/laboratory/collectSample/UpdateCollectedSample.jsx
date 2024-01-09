import { Check, Clear } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from 'assets/EditIcon';
import { useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';
// import { useForm } from 'react-hook-form';

export default function UpdateCollectedSample({ testData, type, isEditMode }) {
  console.log(isEditMode, 'isEditModes');
  const [edit, setEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [qty, setQty] = useState('');
  const [remarks, setRemarks] = useState('');
  const handleEdit = (el) => {
    setEdit(true);
    setSelectedRow(el);
    setQty(el.quantity);
    setRemarks(el.remarks);
  };
  const handleCancel = () => {
    setEdit(false);
    setSelectedRow('');
    setQty('');
    setRemarks('');
  };
  return (
    <Grid container spacing={1} sx={{ mt: 1 }} alignItems='center' justifyContent='center'>
      <Grid item xs={12} md={8}>
        <Stack flexDirection='row' justifyContent='space-between' alignItems='center' mb={2}>
          <Typography variant='subtitle1'>Collected Test</Typography>
        </Stack>
        <TableContainer sx={{ maxHeight: '400px' }}>
          <Table size='small' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Test Name</TableCell>
                <TableCell>
                  {type === 'sampleCollection' ? 'Collected Qty' : 'Result Value'}
                </TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testData?.map((el) => (
                <TableRow key={el.labOrderId}>
                  <TableCell>{el.testName || el.groupTestName}</TableCell>
                  <TableCell>
                    {edit && selectedRow.labOrderId === el.labOrderId ? (
                      <TextField value={qty} size='small' />
                    ) : (
                      el.quantity || el?.testResult
                    )}
                  </TableCell>
                  <TableCell>
                    {edit && selectedRow.labOrderId === el.labOrderId ? (
                      <TextField value={remarks} size='small' />
                    ) : (
                      el.remarks
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditMode && (
                      <>
                        {edit && selectedRow.labOrderId === el.labOrderId ? (
                          <>
                            <IconButton
                              size='small'
                              color='error'
                              onClick={() => {
                                handleCancel();
                              }}
                            >
                              <Clear />
                            </IconButton>
                            <IconButton size='small' color='success'>
                              <Check />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            size='small'
                            onClick={() => {
                              handleEdit(el);
                            }}
                            color='warning'
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </>
                    )}
                    <IconButton size='small'>
                      <QrCode2Icon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
