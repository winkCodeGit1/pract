import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from '@mui/material';

import ahmis1 from '../assets/Images/ahmis1.png';
import leaf from '../assets/Images/leaf.png';
import useAuth from 'hooks/useAuth';

export default function ReportDialog({ onClose, children, type, maxWidth = 'xs', ...others }) {
  //   let tokenComponentRef = useRef();
  const { user } = useAuth();
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<div>' + document.getElementById('print').innerHTML + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      maxWidth={maxWidth}
      {...others}
    >
      <div id='print'>
        <DialogTitle>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <img src={ahmis1} alt='AHMIS' />
            </Grid>
            <Grid item xs={8} align='center'>
              {user?.orgName && <label>{user?.orgName}</label>}
              <br />
              {user?.orgAddress && <label>{user?.orgAddress}</label>}
              {type && <label>{type}</label>}
            </Grid>
            <Grid item xs={2} align='center'>
              <img src={leaf} alt='logo' />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </div>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} variant='contained' color='error'>
          Close
        </Button>
        <Button onClick={handlePrint} variant='contained' color='primary'>
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}
