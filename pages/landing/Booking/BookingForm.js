import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import KeyboardArrowRightTwoTone from '@mui/icons-material/KeyboardArrowRightTwoTone';
//
import {
  FormProvider,
  RHFAutoComplete,
  RHFDateTimePicker,
  RHFTextField,
} from 'components/hook-form';

const defaultValues = {
  fullName: '',
  doa: '',
  Locality: '',
  Department: '',
  Doctor: '',
};
const schema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  Locality: Yup.string().required('Locality is required'),
});

export default function BookingForm() {
  // const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, 'data');
    // navigate('/scheduleAppointment');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFTextField name='fullName' label='Name' size='small' placeholder='NAME' required />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name='Locality' label='Locality' size='small' required />
        </Grid>

        <Grid item xs={12}>
          <RHFAutoComplete
            name='Department'
            options={[]}
            placeholder='Select Department'
            label='Department'
            size='small'
            onInputChange={(value) => {
              console.log(value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutoComplete
            name='Doctor'
            label='Doctor'
            size='small'
            options={[]}
            onInputChange={(value) => {
              console.log(value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <RHFDateTimePicker
            name='doa'
            label='Date of appointment'
            disablePast
            required
            onInputChange={(date) => {
              console.log(date);
            }}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Button type='submit' variant='contained'>
            BOOK AN APPOINTMENT <KeyboardArrowRightTwoTone />
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
