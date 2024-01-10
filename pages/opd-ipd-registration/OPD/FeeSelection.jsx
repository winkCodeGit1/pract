/* eslint-disable no-unused-vars */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import { LinearProgress, useTheme } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  billDetailsCancelBill,
  billGetBillDetailsByBillId,
  feesGetAllFeesCodeByOrgGrouped,
} from 'pages/api/dashboard';
import Scrollbar from 'components/Scrollbar';
import {
  Autocomplete,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import { toast } from 'react-toastify';
import { billDetailsSaveBill, getPaymentModeGetallPaymentModes } from 'api';
import { failedSaveMessage } from 'utils/constants';
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';

function not(a, b) {
  return a.filter((value) => b?.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b?.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
const orgId = 1;
export default function FeeSelection({ onClose, patientDetail, isEditMode, isCancel }) {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState({});
  const [right, setRight] = React.useState({});
  const [paymentMode, setPaymentMode] = React.useState('');
  const [selectedFee, setSelectedFee] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [currentFeeList, setCurrentFeeList] = React.useState([]);
  const leftChecked = intersection(checked, left[selectedFee?.id]);
  const rightChecked = intersection(checked, right[selectedFee?.id] || []);
  const [selectedCancel, setSelectedCancel] = React.useState([]);
  const { data: feeList } = useQuery({
    queryKey: ['feesGetAllFeesCodeByOrgGrouped'],
    queryFn: feesGetAllFeesCodeByOrgGrouped,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: paymentList } = useQuery({
    queryKey: ['getPaymentModeGetallPaymentModes', orgId],
    queryFn: getPaymentModeGetallPaymentModes,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight((ps) => {
      if (selectedFee.id in ps) {
        return {
          ...ps,
          [selectedFee.id]: [...ps[selectedFee.id], ...leftChecked],
        };
      }

      return {
        ...ps,
        [selectedFee?.id]: leftChecked,
      };
    });

    setLeft({ [selectedFee?.id]: not(left[selectedFee?.id], leftChecked) });
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft((ps) => {
      if (selectedFee.id in ps) {
        return {
          ...ps,
          [selectedFee.id]: [...ps[selectedFee.id], ...rightChecked],
        };
      }

      return {
        ...ps,
        [selectedFee?.id]: rightChecked,
      };
    });
    // setLeft({ [selectedFee?.id]: left[selectedFee?.id].concat(rightChecked) });
    setRight((ps) => ({ ...ps, [selectedFee?.id]: not(right[selectedFee?.id], rightChecked) }));
    setChecked(not(checked, rightChecked));
  };

  const mutation = useMutation({
    mutationFn: (req) => billDetailsSaveBill({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUnbilledPatients'] });
      queryClient.invalidateQueries({ queryKey: ['billGetTodayBillByOrgId'] });
      toast.success('Bill Data Saved Successfully');
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });
  const mutationBillData = useMutation({
    mutationFn: (req) => billDetailsCancelBill({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billGetTodayBillByOrgId'] });
      toast.success('Bill Data Updated Successfully');
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  // const handleSearch = (value) => {
  //   const term = value.trim().toLowerCase();
  //   if (term) {
  //     const filterData = left.filter(
  //       (item) =>
  //         item.feeName.toLowerCase().includes(term) || item.feeCode.toLowerCase().includes(term)
  //     );
  //     setLeft(filterData);
  //   } else {
  //     setLeft(feeList?.filter((el) => right.indexOf(el) === -1));
  //   }
  // };

  const customList = (title, items = []) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <Scrollbar
        sx={{
          maxHeight: '500px',
          minHeight: '200px',
          // height: '500px',
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <List
          sx={{
            // width: 200,
            // height: 230,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component='div'
          role='list'
        >
          {items?.map((value) => {
            const labelId = `transfer-list-all-item-${value.id}-label`;

            return (
              <ListItem
                key={value.id}
                role='listitem'
                button
                onClick={handleToggle(value)}
                alignItems='center'
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.feeCode}/${value.feeName}`} />
                <Typography display='flex' alignItems='center'>
                  <CurrencyRupeeIcon fontSize='12px' />
                  {value.amount}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Scrollbar>
    </Card>
  );

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const getBillDetailsByBillId = async () => {
    setLoading(true);
    try {
      const data = await billGetBillDetailsByBillId(patientDetail?.billNo);
      setCurrentFeeList(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (isEditMode) {
      getBillDetailsByBillId();
    }
  }, [isEditMode]);

  const handleBillSubmit = () => {
    if (Object.values(right).flat().length === 0) {
      toast.info('Select atleast one test');
    } else {
      if (!paymentMode) {
        toast.error('Select Payment Mode');
      } else {
        const selectedData = Object.values(right).flat();
        const req = selectedData.map((item) => ({
          ...item,
          registrationId: patientDetail?.registrationId,
          organizationId: 1,
          paymentModeId: paymentMode,
          createdBy: user.staffId,
          id: 0,
          feeId: item.id,
          billNo: isEditMode ? patientDetail.billNo : undefined,
        }));
        mutation.mutate(req);
      }
    }
  };
  console.log(mutation);
  const handleChangeSelection = (v) => {
    setLeft({ [v?.id]: not(v?.feesList, right[v?.id] || []) });
  };
  const handleChangeFeeTest = (e, v) => {
    if (e.target.checked) {
      setSelectedCancel((ps) => [...ps, v]);
    } else {
      const filterData = selectedCancel.filter((el) => el.id !== v.id);
      setSelectedCancel(filterData);
    }
  };
  const handleCancellabTest = async () => {
    if (selectedCancel.length > 0) {
      const req = selectedCancel.map((el) => ({
        ...el,
        checked: true,
        cancelled: true,
        patientMrn: patientDetail.patientMrn,
        isCancelled: true,
      }));
      console.log(req, 'handleCancellabTest');
      mutationBillData.mutate(req);
    } else {
      toast.info('Select atleast one test');
    }
  };
  return (
    <FormWrapper
      onClose={onClose}
      maxWidth='xl'
      title={isCancel ? 'Cancel Bill' : 'Add Bill'}
      fullWidth
      onSubmit={isCancel ? handleCancellabTest : handleBillSubmit}
      loading={mutation.isPending || mutationBillData.isPending}
    >
      <Grid container spacing={3} sx={{ mb: isEditMode ? 3 : 4 }}>
        <Grid item display='flex' xs={3}>
          <Typography variant='subtitle1'>OP ID : &nbsp;</Typography>
          <Typography>{patientDetail?.patientMrn ?? 'N/A'} </Typography>
        </Grid>
        <Grid item display='flex'>
          <Typography variant='subtitle1'>Patient Name : &nbsp;</Typography>
          <Typography> {patientDetail?.patientName ?? 'N/A'} </Typography>
        </Grid>
      </Grid>
      {isEditMode && (
        <Grid container spacing={0} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Current Fees List
            </Typography>
            {loading && <LinearProgress sx={{ width: '100%' }} />}
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {isCancel && <TableCell></TableCell>}
                  <TableCell>Fee Name </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentFeeList &&
                  currentFeeList?.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        background: (theme) =>
                          selectedCancel.indexOf(item) !== -1
                            ? theme.palette.primary.lighter
                            : 'inherit',
                      }}
                    >
                      {isCancel && (
                        <TableCell sx={{ width: '100px' }}>
                          <Checkbox
                            size='small'
                            sx={{ margin: 0 }}
                            checked={selectedCancel.indexOf(item) !== -1}
                            onChange={(e) => {
                              handleChangeFeeTest(e, item);
                            }}
                            disabled={item.isCancelled}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </TableCell>
                      )}
                      <TableCell>{item.feeName}</TableCell>
                      <TableCell>
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={(item.isCancelled && 'error') || 'success'}
                        >
                          {item.isCancelled ? 'Cancelled' : 'Approved'}
                        </Label>
                      </TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} align='right'>
                    <Typography variant='subtitle1'>Total: {patientDetail?.billAmount}</Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
        </Grid>
      )}
      {!isCancel && (
        <>
          <Grid container spacing={2} sx={{ mb: 1 }} justifyContent='space-between'>
            <Grid item xs={12} sm={12} md={3}>
              <Autocomplete
                id='grouped-demo'
                options={feeList || []}
                getOptionLabel={(option) => option.feeTypeName}
                value={selectedFee}
                size='small'
                onChange={(e, v) => {
                  setSelectedFee(v);
                  if (v) {
                    // setLeft({ [v.id]: v?.feesList });
                    handleChangeSelection(v);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} size='small' placeholder='Select Fee Category' />
                )}
              />
            </Grid>
            {/* <TextField
        size='small'
        value={term}
        onChange={(e) => {
          handleSearch(e.target.value);
          setTerm(e.target.value);
        }}
        fullWidth
        placeholder='Search by fee types and fee code'
        sx={{ maxWidth: '350px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search sx={{ color: (theme) => theme.palette.grey[500] }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                size='small'
                onClick={() => {
                  setTerm('');
                  handleSearch('');
                }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> */}
          </Grid>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={5}>
              {customList('Fee Types', left[selectedFee?.id])}
            </Grid>

            <Grid item xs={1}>
              <Grid container direction='column' alignItems='center'>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label='move selected right'
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant='outlined'
                  size='small'
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label='move selected left'
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              {customList('Selected Fee Type', right[selectedFee?.id])}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{ mt: 2 }}
            justifyContent='flex-end'
            alignItems='center'
            gap={4}
          >
            <Typography>
              Select Payment Mode <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Select
              label='select Payment Mode'
              value={paymentMode}
              onChange={handlePaymentMode}
              sx={{ minWidth: '250px' }}
              size='small'
            >
              <MenuItem value=''>Choose Payment Mode</MenuItem>
              {paymentList?.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </>
      )}
    </FormWrapper>
  );
}
