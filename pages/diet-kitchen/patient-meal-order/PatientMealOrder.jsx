/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import {
  MenuItem,
  IconButton,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Box,
  Stack,
  Select,
  InputLabel,
  Divider,
  TextField,
} from '@mui/material';
import { RHFTextField, RHFSelect } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Table, { tableOption } from 'components/table';
import { useMaterialReactTable } from 'material-react-table';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { AddCircle, Delete } from '@mui/icons-material';
import DialogBox from 'components/DialogBox';
import { LoadingButton } from '@mui/lab';
const path = 'patient-meal-order';

const data = [
  {
    trackingId: '123456',
    patientName: 'John Doe',
    department: '30/Male',
    dateReceived: 'B001',
    remarks: 'Regular checkup',
    type: 'Referred',
    status: 'Admitted',
  },
  {
    trackingId: '789012',
    patientName: 'Jane Smith',
    department: '25/Female',
    dateReceived: 'B002',
    remarks: 'Emergency admission',
    type: 'Emergency',
    status: 'To Be Admitted',
  },
  {
    trackingId: '789012',
    patientName: 'Jane Smith',
    department: '25/Female',
    dateReceived: 'B002',
    remarks: 'Emergency admission',
    type: 'OPD to IPD',
    status: 'To Be Discharge',
  },
];
const columns = [
  {
    header: 'Reg. No.',
    accessorKey: 'trackingId',
  },
  {
    header: 'Patient Name',
    accessorKey: 'patientName',
  },
  {
    header: 'Age/Gender',
    accessorKey: 'department',
  },

  {
    header: 'Bed No.',
    accessorKey: 'dateReceived',
  },
  {
    header: 'Remarks',
    accessorKey: 'remarks',
  },
];

function StepOne({ setSelectedPatient }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const tableRef = useMaterialReactTable({
    ...tableOption,
    columns,
    data: data,
    enableRowSelection: true,
  });

  useEffect(() => {
    const selectedRows = tableRef.getSelectedRowModel()?.rows || [];
    console.log(selectedRows);
    setSelectedPatient(selectedRows);
  });

  return (
    <>
      <Stack direction='row' spacing={2} mb={2} width={1}>
        <Stack width={1}>
          <InputLabel>Select Building</InputLabel>
          <Select value={selectedBuilding} size='small' label='Select Building'>
            <MenuItem value=''> Select Option </MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack width={1}>
          <InputLabel>Select ward</InputLabel>
          <Select value={selectedWard} size='small' label='Select Ward'>
            <MenuItem value=''> Select Option </MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <Table tableRef={tableRef} title={path} />
    </>
  );
}
//
//
//
//
//
// ================================= END STEP ONE ========================================

const defaultArrayObj = {
  mealType: '',
  orderSet: '',
  qty: '',
};

const defaultValues = {
  remarks: '',
  orders: [defaultArrayObj],
};
const orderSchema = yup.object().shape({
  mealType: yup.string().required(),
  orderSet: yup.string().required(),
  qty: yup.string().required(),
});

const schema = yup.object().shape({
  remarks: yup.string().trim(),
  orders: yup.array().of(orderSchema),
});

function StepTwo({ onClose, selectedPatient }) {
  const loading = false;
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, control, reset, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orders',
  });

  const mutation = useMutation({
    mutationFn: (req) => {
      console.log(req);
    },
    onSuccess: () => {
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['FoodItemAll'] });
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Typography variant='subtitle1' color='error'>
        Total patient selected: &nbsp; {selectedPatient.length}
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <MuiTable size='small'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 1 / 3, p: 0.5, '&.MuiTableCell-root:first-of-type': { p: 1 } }}
              >
                Meal Type
              </TableCell>
              <TableCell sx={{ width: 1 / 3, p: 0.5 }}>Order Set</TableCell>
              <TableCell sx={{ p: 0.5 }}>Qty</TableCell>
              <TableCell sx={{ p: 0.5 }}>Total Qty</TableCell>
              <TableCell sx={{ p: 0.5 }}>
                <IconButton
                  title='Add Row'
                  color='secondary'
                  size='small'
                  onClick={() => append({ defaultArrayObj })}
                >
                  <AddCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell sx={{ p: 0.5, '&.MuiTableCell-root:first-of-type': { p: 0.5 } }}>
                  <RHFSelect name={`orders[${index}].mealType`}>
                    <MenuItem value=''> Select Option </MenuItem>
                    {[].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <RHFSelect name={`orders[${index}].orderSet`}>
                    <MenuItem value=''> Select Option </MenuItem>
                    {[].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <RHFTextField name={`orders[${index}].qty`} placeholder='Enter Qty' />
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <TextField
                    size='small'
                    InputProps={{ readOnly: true }}
                    // disabled
                    value={watch(`orders[${index}].qty`) * selectedPatient.length}
                  />
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <IconButton
                    tabIndex={-1}
                    size='small'
                    disabled={index === 0}
                    onClick={() => remove(index)}
                  >
                    <Delete fontSize='small' color={index === 0 ? 'disabled' : 'error'} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <RHFTextField name='remarks' placeholder='Enter Remarks here...' sx={{ p: 0.5 }} />
      </FormProvider>
      <Stack display='flex' direction='row' spacing={2} justifyContent='flex-end'>
        <LoadingButton
          loading={loading}
          variant='contained'
          onClick={onSubmit}
          size='small'
          type='submit'
        >
          Submit
        </LoadingButton>

        <Button disabled={loading} variant='contained' color='inherit' onClick={reset} size='small'>
          Reset
        </Button>
      </Stack>
    </>
  );
}
//
//
//
//
// ================================= END TWO ONE ========================================

function ActiveStepComponent({ activeStep, onClose, setSelectedPatient, selectedPatient }) {
  if (activeStep === 0) {
    return <StepOne setSelectedPatient={setSelectedPatient} />;
  } else if (activeStep === 1) {
    return <StepTwo onClose={onClose} selectedPatient={selectedPatient} />;
  }
}
//
//
//
// ================================= MAIN ========================================
const steps = ['Select Patient', 'Make Order List'];
export default function OrderBulkMeal({ onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState([]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <DialogBox title='Order Meal (Patient wise)' onClose={onClose} fullWidth maxWidth='lg'>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color='inherit' onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box py={3}>
          <ActiveStepComponent
            activeStep={activeStep}
            onClose={onClose}
            setSelectedPatient={setSelectedPatient}
            selectedPatient={selectedPatient}
          />
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            color='inherit'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button
            variant='contained'
            disabled={activeStep === steps.length - 1}
            onClick={handleNext}
            sx={{ mr: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </DialogBox>
  );
}
