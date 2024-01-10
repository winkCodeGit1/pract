/** @format */

import { Grid, MenuItem } from '@mui/material';
import { RHFSelect, RHFTextField, RHFTextarea } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useFormContext } from 'react-hook-form';

export default function VehicleTransportSecond() {
  const { watch } = useFormContext();

  const paymentMode = watch('paymentMode');
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <RHFTextField
          name='registration'
          placeholder='Registration Number'
          label='Registration Number'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <RHFDatePicker name='registrationDate' label='Registration Date' disableFuture required />
      </Grid>
      <Grid item xs={3}>
        <RHFDatePicker
          placeholder='Registration Valid'
          name='registrationValidity'
          label='Registration Valid Upto'
        />
      </Grid>
      <Grid item xs={3}>
        <RHFTextField placeholder='Tax paid' label='Tax paid' name='tax' />
      </Grid>
      <Grid item xs={3}>
        <RHFSelect name='paymentMode' label='Payment Mode'>
          <MenuItem value='Cash'>Cash</MenuItem>
          <MenuItem value='Cheque'>Cheque</MenuItem>
        </RHFSelect>
      </Grid>
      <Grid item xs={3}>
        <RHFTextField
          placeholder=' Amount of Cheque/Cash'
          label=' Amount of Cheque/Cash'
          name='amount'
        />
      </Grid>
      {paymentMode === 'Cheque' && (
        <>
          <Grid item xs={3}>
            <RHFTextField placeholder='Cheque Number' label='Cheque Number' name='chequeNo' />
          </Grid>

          <Grid item xs={3}>
            <RHFDatePicker placeholder='Cheque date' label='Cheque date' name='chequeDate' />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField placeholder='Bank name' label='Bank name' name='bank' />
          </Grid>
          <Grid item xs={3}>
            <RHFTextField placeholder='Issued By' label='Issued By' name='issuedBy' />
          </Grid>
        </>
      )}
      <Grid item xs={3}>
        <RHFTextField
          name='taxValidity'
          placeholder='Road tax valid upto'
          label='Road tax valid upto'
        />
      </Grid>
      <Grid item xs={3}>
        <RHFTextField
          placeholder='Reserved Tank Capacity'
          name='reservedCapacity'
          label='Reserved Tank Capacity'
        />
      </Grid>
      <Grid item xs={12}>
        Remarks
        <RHFTextarea name='remark' placeholder='Remarks' multiline minRows={3} />
      </Grid>
    </Grid>
  );
}
