import {
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ToggleButton,
  Typography,
} from '@mui/material';

import { RHFSelect, RHFTextField, RHFTextarea, RHFToggleButton } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useForm } from 'react-hook-form';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DetailPanel from 'components/Card';
import { Delete } from '@mui/icons-material';
import { viewDateFormat } from 'utils/date';

const schema = yup.object().shape({
  drugName: yup.string().typeError().nullable().required('Required'),
  dose: yup.string().typeError().nullable().required('Required'),
});
const defaultValues = {
  dose: '',
  drugName: '',
  duration: '',
  quantity: '',
  drugUnit: '',
  startDate: null,
  additionalDetail: '',
  instruction: '',
  remark: '',
  route: '',
  medFrequency: '',
};

const unitOptions = [
  { value: '', label: 'Once a day' },
  { value: 'Twice a day', label: 'Twice a day' },
  { value: 'Thrice a day', label: 'Thrice a day' },
  { value: 'Four times a day', label: 'Four times a day' },
  { value: 'Every Hour', label: 'Every Hour' },
  { value: 'Every 2 hours', label: 'Every 2 hours' },
  { value: 'Every 3 hours', label: 'Every 3 hours' },
  { value: 'Every 4 hours', label: 'Every 4 hours' },
  { value: 'Every 6 hours', label: 'Every 6 hours' },
];

const medFrequencyOptions = [
  { value: '', label: 'Once a day' },
  { value: 'Twice a day', label: 'Twice a day' },
  { value: 'Thrice a day', label: 'Thrice a day' },
  { value: 'Four times a day', label: 'Four times a day' },
  { value: 'Every Hour', label: 'Every Hour' },
  { value: 'Every 2 hours', label: 'Every 2 hours' },
  { value: 'Every 3 hours', label: 'Every 3 hours' },
  { value: 'Every 4 hours', label: 'Every 4 hours' },
  { value: 'Every 6 hours', label: 'Every 6 hours' },
];

const routeOptions = [
  { value: '', label: 'Choose Route' },
  { value: 'Intramuscular', label: 'Intramuscular' },
  { value: 'Nasal', label: 'Nasal' },
  { value: 'Topical', label: 'Topical' },
  { value: 'Intraosseous', label: 'Intraosseous' },
  { value: 'Intrathecal', label: 'Intrathecal' },
  { value: 'Intraperitoneal', label: 'Intraperitoneal' },
  { value: 'Intradermal', label: 'Intradermal' },
  { value: 'Nasogastric', label: 'Nasogastric' },
  { value: 'Sub Lingual', label: 'Sub Lingual' },
  { value: 'Per Rectum', label: 'Per Rectum' },
  { value: 'Sub Cutaneous', label: 'Sub Cutaneous' },
  { value: 'Per Vaginal', label: 'Per Vaginal' },
  { value: 'Oral', label: 'Oral' },
  { value: 'Intravenous', label: 'Intravenous' },
  { value: 'Inhalation', label: 'Inhalation' },
];

const instructionOptions = [
  { value: '', label: 'Choose Instruction' },
  { value: 'Before meals', label: 'Before meals' },
  { value: 'Empty stomach', label: 'Empty stomach' },
  { value: 'After meals', label: 'After meals' },
  { value: 'In the morning', label: 'In the morning' },
  { value: 'In the evening', label: 'In the evening' },
  { value: 'At bedtime', label: 'At bedtime' },
  { value: 'Immediately', label: 'Immediately' },
  { value: 'As directed', label: 'As directed' },
];

const unitsOptions = [
  { value: '', label: 'Units', selected: true },
  { value: 'Day(s)', label: 'Day(s)' },
  { value: 'Week(s)', label: 'Week(s)' },
  { value: 'Month(s)', label: 'Month(s)' },
];

export default function Prescription({ addedMedicines, setAddedMedicines }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  console.log(errors, 'errors');

  function onAdd(formData) {
    console.log(formData, 'data');
    const medicines = [...addedMedicines, formData];
    setAddedMedicines(medicines);
    reset();
  }

  console.log(addedMedicines, 'addedMedicines');

  return (

    <Grid container spacing={2}>
      <Grid item xs={3} sm={6} md={4} lg={3}>
        <form onSubmit={handleSubmit(onAdd)}>
          <Paper
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[400]}`,
              // padding: "0px 8px 0px 8px",
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.grey[700],
                padding: '6px 8px',
                color: (theme) => theme.palette.primary.contrastText,
              }}
            >
              Order Drug...
            </Typography>
            <Grid container spacing={1} alignItems='center' sx={{ padding: '8px 8px' }}>
              <Grid item xs={4} textAlign='right'>
                Drug Name
              </Grid>
              <Grid item xs={8}>
                <RHFTextField formControl={control} name='drugName' />
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Dose
              </Grid>
              <Grid item xs={8}>
                <RHFTextField formControl={control} name='dose' />
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Units
              </Grid>
              <Grid item xs={8}>
                <RHFSelect name='unit' formControl={control}>
                  {unitOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Frequency
              </Grid>
              <Grid item xs={8}>
                <RHFSelect name='medFrequency' formControl={control}>
                  {medFrequencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Route
              </Grid>
              <Grid item xs={8}>
                <RHFSelect name='route' formControl={control}>
                  {routeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Start Date
              </Grid>
              <Grid item xs={8}>
                <RHFDatePicker name='startDate' formControl={control} />
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Duration
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name='duration' formControl={control} />
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Units
              </Grid>
              <Grid item xs={8}>
                <RHFSelect name='drugUnit' formControl={control}>
                  {unitsOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Total Quantity
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name='quantity' formControl={control} />
              </Grid>
            </Grid>
            <Typography variant='subtitle1' sx={{ paddingLeft: '8px' }}>
              Additional Information
            </Typography>
            <Divider />
            <Grid
              container
              spacing={1}
              alignItems='center'
              sx={{ marginTop: '8px', padding: '0px 8px', marginBottom: '12px' }}
            >
              <Grid item xs={4} textAlign='right'>
                As Needed
              </Grid>
              <Grid item xs={8}>
                <RHFToggleButton
                  name='additionalDetail'
                  exclusive
                  sx={toggleButtonGroupStyle}
                  formControl={control}
                >
                  <ToggleButton
                    value='sos'
                    size='small'
                    sx={{
                      ...toggleButtonStyle,
                      maxWidth: 'unset',
                      minWidth: 'unset !important',
                      wordBreak: 'keep-all',
                    }}
                  >
                    SOS
                  </ToggleButton>
                </RHFToggleButton>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Instructions
              </Grid>
              <Grid item xs={8}>
                <RHFSelect name='instruction' formControl={control}>
                  {instructionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={4} textAlign='right'>
                Additional Instructions
              </Grid>
              <Grid item xs={8}>
                <RHFTextarea
                  name='remark'
                  formControl={control}
                  placeholder='additional remark'
                  minRows={2}
                />
              </Grid>
              <Grid item xs={12} textAlign='right'>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleSubmit(onAdd)}
                  sx={{ margin: '0px 8px' }}
                >
                  Add
                </Button>
                <Button color='error' variant='contained' onClick={reset}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
      <Grid item xs={9} sm={6} md={8} lg={9}>
        <DetailPanel title='New Prescription'>
          <TableContainer>
            <Table>
              <TableBody>
                {addedMedicines.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        <b>{item.drugName}</b>,{item.dose} {item.unit}, {item.medFrequency} ,
                        {item.instruction} sos ,{item.route}, {item.duration} {item.drugUnit}(
                        {item.quantity})
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {viewDateFormat(item.startDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size='small'>
                        <Delete color='error' fontSize='22px' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DetailPanel>
      </Grid>
    </Grid>
  );
}
