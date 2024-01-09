import {
  Grid,
  Table,
  IconButton,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
// import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import EyeOpenIcon from 'assets/eye_open';

const defaultValues = {
  InternalStartDate: null,
  InternalEndDate: null,
  InternalCategory: null,
};

// const defaultValues = {
//     IPDInternalReport: [defaultarray],
// };

const schema = {};

export default function InternalReport() {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data, '----internal reports');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Preview</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell align='center'>
                    <RHFDatePicker name={'InternalStartDate'} format='dd-MM-yyyy' disableFuture />
                  </TableCell>

                  <TableCell>
                    <RHFDatePicker name={'InternalEndDate'} format='dd-MM-yyyy' disableFuture />
                  </TableCell>

                  <TableCell>
                    <RHFAutoComplete
                      name={'InternalCategory'}
                      placeholder='Select Category'
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                    // onClick={() => {
                    //     remove(index);
                    // }}
                    >
                      <EyeOpenIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
