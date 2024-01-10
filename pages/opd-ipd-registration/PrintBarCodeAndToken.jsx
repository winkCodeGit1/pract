import { Grid } from '@mui/material';
import ReportDialog from 'components/ReportDialog';
// import React from 'react';
import Barcode from 'react-barcode';

export default function PrintBarCodeAndToken({ onClose, data, barcodePrint }) {
  console.log(data);
  return (
    <ReportDialog onClose={onClose} fullWidth maxWidth='sm'>
      <Grid container>
        <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>Date & Time : </b>
          </label>
          <label>{data?.createdDatetime ?? new Date()}</label>
        </Grid>

        <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>Patient Name : </b>
          </label>
          <label>{data?.patientName}</label>
        </Grid>
        {/* <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>Age/ Gender : </b>
          </label>
          <label>
            {tokenAge} / {data?.gender}
          </label>
        </Grid> */}
        {!barcodePrint ? (
          <Grid item xs={12} style={{ marginLeft: '10px' }}>
            <label>
              <b>OP ID : </b>
            </label>
            <label>{data?.opId}</label>
          </Grid>
        ) : null}
        <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>Patient CR. No. </b>
          </label>
          <label>{data?.patientMrn ?? 'NA'}</label>
        </Grid>

        <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>ABHA Number : </b>
          </label>
          <label>{data?.uhId ?? 'NA'}</label>
        </Grid>

        <Grid item xs={12} style={{ marginLeft: '10px' }}>
          <label>
            <b>Token No: </b>
          </label>
          <label>{data?.tokenNumber ?? 'NA'}</label>
        </Grid>

        {barcodePrint ? (
          <Grid item xs={12}>
            <Barcode value={data?.patientMrn} displayValue='false' height='30' />
          </Grid>
        ) : null}
      </Grid>
    </ReportDialog>
  );
}
