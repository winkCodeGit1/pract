/* eslint-disable no-unused-vars */

import { alpha, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton } from '@mui/material';

export default function DialogBox({ title, children, onClose, ...other }) {
  return (
    <Dialog open={true} {...other}>
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
    </Dialog>
  );
}
