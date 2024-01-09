/** @format */

import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { Backdrop, CircularProgress } from '@mui/material';

// import VehicleTransportSecond from "../vehicleMaster/VehicleTransport2";
import { Divider, IconButton, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

function PaperComponent(props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      bounds='body'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function FormWrapper({
  children,
  submitText = 'Submit',
  title,
  onClose,
  maxWidth,
  onSubmit,
  onReset,
  loading,
  loadingText = 'saving...',
  isFetching,
  ...others
}) {
  return (
    <Dialog
      PaperComponent={PaperComponent}
      open={true}
      {...others}
      fullWidth
      maxWidth={maxWidth || 'lg'}
      TransitionComponent={Transition}
      onClose={(e, reason) => {
        e.preventDefault();
        if (reason !== 'backdropClick') {
          onClose();
        }
      }}
      aria-labelledby='draggable-dialog-title'
      aria-describedby='draggable-dialog-description'
    >
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '&.MuiBackdrop-root': {
            top: '32px',
            bottom: '8px',
            left: '16px',
            right: '16px',
            backgroundColor: 'rgb(0 0 0 / 10%)',
          },
        }}
        open={isFetching}
      >
        <CircularProgress color='error' />
      </Backdrop>
      <DialogTitle
        id='draggable-dialog-title'
        sx={{
          cursor: 'move',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.lighter
              : theme.palette.grey[700],
          py: 0.5,
        }}
        variant='body1'
        fontWeight={600}
        justifyContent='space-around'
      >
        {title}
      </DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
        }}
        size='small'
        onClick={onClose}
      >
        <Close />
      </IconButton>
      <DialogContent sx={{ py: 1.5 }} dividers>
        {children}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ pr: 2 }}>
        {onSubmit && (
          <LoadingButton
            loading={loading}
            loadingIndicator={loadingText}
            variant='contained'
            onClick={onSubmit}
            size='small'
            type='submit'
          >
            {submitText}
          </LoadingButton>
        )}
        {onReset && (
          <Button
            disabled={loading}
            variant='contained'
            color='warning'
            onClick={onReset}
            size='small'
          >
            Reset
          </Button>
        )}
        <Button variant='contained' onClick={onClose} color='error' size='small'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
