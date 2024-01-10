/** @format */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import VehicleTransport from './VehicleTransport';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide({ onClose }) {
  return (
    <Dialog
      open={true}
      maxWidth='xl'
      TransitionComponent={Transition}
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      {/* <DialogTitle
          sx={{
            background: (theme) => theme.palette.primary.lighter,
            pt: 1,
            pb: 0.8,
          }}
          variant='h6'
          fontWeight={600}>
          Vehicle Transport
        </DialogTitle> */}
      {/* <DialogContent sx={{ pb: 0 }}> */}
      {/* <br /> */}
      {/* <VehicleTransportSecond /> */}
      <VehicleTransport />
      {/* </DialogContent> */}
      <DialogActions>
        <Button variant='contained'>Submit</Button>
        <Button variant='contained' color='info'>
          Reset
        </Button>
        <Button variant='contained' onClick={onClose} color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
