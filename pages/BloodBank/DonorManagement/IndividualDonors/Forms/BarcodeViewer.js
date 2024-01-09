import { Grid } from '@mui/material';
import ReportDialog from 'components/ReportDialog';
import Barcode from 'react-barcode';

export default function BarcodeViewer({ data, onClose }) {

    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = date.toLocaleString('en-US', options);

    return (
        <ReportDialog onClose={onClose} fullWidth maxWidth='sm'>
            <Grid container direction="column">
                <Grid item xs={12} style={{ marginLeft: '10px' }}>
                    <label>
                        <b>Date & Time : </b>
                    </label>
                    <label>{formattedDateTime}</label>
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
                    <label>{data?.donorID ?? 'NA'}</label>
                </Grid>
                <Grid item xs={12}>
                    {data?.donorID &&
                        <Barcode value={JSON.stringify(data.donorID)} displayValue='false' width={1} height={40} />
                    }

                </Grid>
            </Grid>
        </ReportDialog>
    );
}

