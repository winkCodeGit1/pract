import { Add, ExpandMore } from '@mui/icons-material';
import {
  Button,
  Grid,
  MenuItem,
  Table,
  IconButton,
  TableRow,
  TableCell,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
  TableHead,
  TableContainer,
  TableBody,
} from '@mui/material';
import DeleteIcon from 'assets/DeleteIcon';
import EditIcon from 'assets/EditIcon';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  RHFAutoComplete,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from 'components/hook-form';
// import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllActiveDrugIntervals, medicineGetAllopathyMedicines } from 'pages/api/master';
import { toast } from 'react-toastify';
import { restrict } from 'utils/restrict';
const defaultValues = {
  medicineNameId: '',
  dosage: '1',
  drugIntervalId: '',
  uom: '',
  isBf: '',
  noDays: '',
  totalQuantity: '',
  avalQty: '',
  remarks: '',
};
const schema = yup.object().shape({
  medicineNameId: yup.object().nullable().required('Required').typeError('Required'),
  dosage: yup
    .number()
    .typeError('Invalid Number')
    .nullable()
    .required('Required')
    .min(1, 'should be > 0'),
  noDays: yup
    .number()
    .nullable()
    .typeError('Required')
    .required('Required')
    .min(1, 'Minimum value should be 1'),
  drugIntervalId: yup.object().nullable().typeError('Required').required('Required'),
  isBf: yup.string().trim().required('Required'),
});

export default function PrescriptionForm({ addedMedicines, setAddedMedicines, isIpd }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState('');
  console.log(selectedRow, 'selectedRow');
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    // mode: 'onChange',
  });

  const { handleSubmit, control, reset, watch, setValue } = methods;

  function onAdd(formData) {
    if (isEditMode) {
      const findIndex = addedMedicines?.findIndex(
        (el) => el.medicineNameId.id === selectedRow.medicineNameId.id
      );

      const checkDuplicate = addedMedicines?.findIndex(
        (el) => el.medicineNameId.id === formData.medicineNameId.id
      );

      if (checkDuplicate !== -1 && selectedRowIndex !== +checkDuplicate) {
        toast.error('Medicine already exist in Present Prescription');
        return;
      }
      addedMedicines.splice(findIndex, 1, formData);
      reset(defaultValues);
      setIsEditMode(false);
      setSelectedRow(null);
    } else {
      const findIndex = addedMedicines?.findIndex(
        (el) => el.medicineNameId.id === formData.medicineNameId.id
      );
      if (findIndex !== -1) {
        toast.error('Medicine already exist in Present Prescription');
        return;
      }
      const medicines = [...addedMedicines, formData];
      setAddedMedicines(medicines);
      reset(defaultValues);
    }
  }
  console.log(addedMedicines, 'addedMedicines');

  const handleEdit = (item) => {
    reset(item);
    setSelectedRow(item);
  };
  const handleDelete = (item) => {
    const medicines = addedMedicines.filter((el) => el.medicineNameId !== item.medicineNameId);
    setAddedMedicines(medicines);
  };
  const { data: drugInterVal } = useQuery({
    queryKey: ['getAllActiveDrugIntervals'],
    queryFn: getAllActiveDrugIntervals,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: medicineName = [] } = useQuery({
    queryKey: ['medicineGetAllopathyMedicines'],
    queryFn: medicineGetAllopathyMedicines,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const totalQty = watch('noDays');
  const interVal = watch('drugIntervalId');
  const dosage = watch('dosage');

  useEffect(() => {
    if (totalQty && interVal && dosage > 0)
      setValue(
        'totalQuantity',
        Number((+totalQty * interVal?.drugIntervalValue * dosage).toFixed(1))
      );
    else {
      setValue('totalQuantity', '');
    }
  }, [totalQty, interVal, dosage]);
  console.log(addedMedicines);
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onAdd)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3}>
            <RHFAutoComplete
              name='medicineNameId'
              formControl={control}
              label='Medicine Name'
              options={medicineName || []}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <RHFTextField name='UOM' label='UOM' formControl={control} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <RHFTextField
              name='noDays'
              label='No Of Days'
              formControl={control}
              inputProps={{ maxLength: 4 }}
              required
              onInput={restrict.number}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <RHFAutoComplete
              name='drugIntervalId'
              formControl={control}
              label='Interval'
              options={drugInterVal || []}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <RHFTextField
              formControl={control}
              name='dosage'
              label='Dosage'
              required
              inputProps={{ maxLength: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2}>
            <RHFSelect name='isBf' label='AF/BF' formControl={control}>
              {[
                { label: 'AF', value: 1 },
                { label: 'Bf', value: 2 },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <RHFTextField
              formControl={control}
              name='totalQuantity'
              label='Total Quantity'
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <RHFTextField name='avalQty' label='Avl Qty' formControl={control} disabled />
          </Grid>

          <Grid item xs={12} sm={12} md={isIpd ? 10 : 12}>
            <RHFTextField
              name='remarks'
              label='Remarks'
              multiline
              minRows={1}
              maxRows={5}
              formControl={control}
            />
          </Grid>
          {isIpd && (
            <Grid item xs={12} sm={12} md={2} textAlign='center'>
              <RHFCheckbox name='isStop' label='Is Stop' sx={{ mt: 2 }} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Stack flexDirection='row' justifyContent='flex-end' gap='10px' sx={{ mt: 1 }}>
              <Button
                variant='contained'
                onClick={handleSubmit(onAdd)}
                color='primary'
                startIcon={<Add />}
              >
                {isEditMode ? 'Update Drug' : 'Add Drug'}
              </Button>
              <Button
                variant='contained'
                color='warning'
                onClick={() => {
                  reset(defaultValues);
                }}
              >
                Clear Form
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Present Prescription</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Drug name</TableCell>
                    <TableCell>UoM</TableCell>
                    <TableCell>Number of Days</TableCell>
                    <TableCell>Interval</TableCell>
                    <TableCell>Dosage</TableCell>
                    <TableCell>AF/BF</TableCell>
                    <TableCell>Total Quantity</TableCell>
                    {isIpd && <TableCell>Is Stop</TableCell>}
                    <TableCell>Remark</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedMedicines && addedMedicines.length > 0 ? (
                    addedMedicines?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.medicineNameId?.MedicineName}</TableCell>
                        <TableCell>{item.dosage}</TableCell>
                        <TableCell>{item.noDays}</TableCell>
                        <TableCell>{item.drugIntervalId?.drugIntervalName}</TableCell>
                        <TableCell>{item.dosage}</TableCell>
                        <TableCell>{item.isBf === '1' ? 'AF' : 'BF'}</TableCell>
                        <TableCell>{item.totalQuantity}</TableCell>
                        {isIpd && <TableCell>{item.isStop ?? false ? 'True' : 'False'}</TableCell>}
                        <TableCell>{item.remarks}</TableCell>
                        <TableCell>
                          <IconButton
                            size='small'
                            onClick={() => {
                              setIsEditMode(true);
                              handleEdit(item);
                              setSelectedRowIndex(index);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => {
                              handleDelete(item);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align='center'>
                        No Medecines
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Previous Prescriptions</Typography>
            <Accordion
              component={Paper}
              elevation={2}
              expanded
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                aria-controls={'sadas'}
                id={'asdas'}
                expandIcon={<ExpandMore />}
                sx={{ '.MuiAccordionSummary-content': { justifyContent: 'space-between' } }}
              >
                <Typography variant='body1' fontWeight={500}>
                  26 Aug, 2023
                </Typography>
                <Typography variant='body1' fontWeight={500}>
                  MSR Memorial
                </Typography>
                <Typography variant='body1' fontWeight={500}>
                  Urology
                </Typography>
                <Typography variant='body1' fontWeight={500} sx={{ mr: 3 }}>
                  Dr. Shakthi Dasan
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                  <Table size='small'>
                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>Drug name</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>UoM</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>Dosage</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>
                        Number of Times
                      </TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>Number of Days</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>AF/BF</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>Interval</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 600 }}>Total Quantity</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell>Cobadex Forte</TableCell>
                      <TableCell>mg</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell>Cobadex Forte</TableCell>
                      <TableCell>mg</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
                <Stack justifyContent='end' flexDirection='row' gap='10px' margin='10px'>
                  <Button variant='contained'>Repeate Medicine</Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion component={Paper} elevation={2} TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                aria-controls={'sadas'}
                id={'asdas'}
                expandIcon={<ExpandMore />}
                sx={{ '.MuiAccordionSummary-content': { justifyContent: 'space-between' } }}
              >
                <Typography variant='body1' fontWeight={500}>
                  26 Aug, 2023
                </Typography>
                <Typography variant='body1' fontWeight={500}>
                  MSR Memorial
                </Typography>
                <Typography variant='body1' fontWeight={500}>
                  Urology
                </Typography>
                <Typography variant='body1' fontWeight={500} sx={{ mr: 3 }}>
                  Dr. Shakthi Dasan
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                  <Table size='small'>
                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell>Drug name</TableCell>
                      <TableCell>UoM</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>Number of Times</TableCell>
                      <TableCell>Number of Days</TableCell>
                      <TableCell>AF/BF</TableCell>
                      <TableCell>Interval</TableCell>
                      <TableCell>Total Quantity</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell>Cobadex Forte</TableCell>
                      <TableCell>mg</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <RHFCheckbox name='select' sx={{ m: 0 }} />
                      </TableCell>
                      <TableCell>Cobadex Forte</TableCell>
                      <TableCell>mg</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>AF</TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
                <Stack justifyContent='end' flexDirection='row' gap='10px' margin='10px'>
                  <Button variant='contained'>Repeate Medicine</Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
