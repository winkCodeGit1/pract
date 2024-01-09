import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import { Close, Image } from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { billGetTodayBillByOrgId } from 'pages/api/dashboard';
const patientCategory = 1; //OPD

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SearchPatient({ onClose }) {
  const { data: todaysBill, isLoading } = useQuery({
    queryKey: ['billGetTodayBillByOrgId', patientCategory],
    queryFn: billGetTodayBillByOrgId,
  });
  console.log(todaysBill, isLoading);
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
      sx={{ p: 0, borderRadius: '10px !important' }}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle sx={{ p: 0 }}>
        <Paper component='form' sx={{ p: '8px 4px', display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ p: '10px' }} aria-label='menu' color='primary'>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search patient...'
            inputProps={{ 'aria-label': 'Search patient...' }}
            autoFocus
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          <IconButton color='primary' sx={{ p: '10px' }} aria-label='directions'>
            <Close />
          </IconButton>
        </Paper>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <Typography color='grey'>Todays Patient</Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton
              sx={{
                background: (theme) => theme.palette.grey[200],
                mb: 2,
                borderRadius: '8px !important',
                '&.MuiListItemButton-root:hover': {
                  background: (theme) => theme.palette.primary.lighter,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Patient Name'
                secondary='21 year, Male'
                sx={{ color: 'black' }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                background: (theme) => theme.palette.grey[200],
                mb: 1.3,
                borderRadius: '8px !important',
                '&.MuiListItemButton-root:hover': {
                  background: (theme) => theme.palette.primary.lighter,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Patient Name'
                secondary='21 year, Male'
                sx={{ color: 'black' }}
              />
            </ListItemButton>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          Start Consultation
        </Button>
        <Button onClick={onClose} variant='outlined' color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
