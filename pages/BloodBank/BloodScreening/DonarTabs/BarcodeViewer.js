import { Grid } from '@mui/material';
import ReportDialog from 'components/ReportDialog';
import Barcode from 'react-barcode';

export default function BarcodeViewer({ data, onClose }) {

    return (
        <ReportDialog onClose={onClose} fullWidth maxWidth='sm'>
            <Grid container direction="column">
                <Grid item xs={12} style={{ marginLeft: '10px' }}>
                    <label>
                        <b>Date & Time : </b>
                    </label>
                    <label>{data?.createdDatetime ?? new Date()}</label>
                </Grid>
                <Grid item xs={12} style={{ marginLeft: '10px' }} >
                    <label>
                        <b>Donor Name : </b>
                    </label>
                    <label>{data?.donorName ?? 'NA'}</label>
                </Grid>
                <Grid item xs={12} style={{ marginLeft: '10px' }} >
                    <label>
                        <b>Donor RegistrationNumber No : </b>
                    </label>
                    <label>{data?.donorRegistrationNumber ?? 'NA'}</label>
                </Grid>
                <Grid item xs={12}>
                    <Barcode value={JSON.stringify(data.donorRegistrationNumber)} displayValue='false' width={1} height={40} />
                </Grid>
            </Grid>
        </ReportDialog>
    );
}

