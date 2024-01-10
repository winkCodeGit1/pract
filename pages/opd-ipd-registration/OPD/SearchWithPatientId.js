import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';

import { Image } from '@mui/icons-material';
import {
  Avatar,
  Grid,
  LinearProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { useMutation } from '@tanstack/react-query';
import { registrationGetExistingPatientDetails } from 'pages/api/common';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SearchWithPatientId({ onClose, setPatientData, reset }) {
  const [values, setValues] = React.useState({});
  const [patientList, setPatientList] = React.useState([]);

  const handleChange = (e) => {
    setValues((ps) => ({ ...ps, [e.target.name]: e.target.value }));
  };
  const mutation = useMutation({
    mutationFn: (req) => registrationGetExistingPatientDetails({ req }),
    onSuccess: ({ data }) => {
      console.log(data, 'PatientList');
      setPatientList(data);
    },
    onError: (error) => {
      toast('Failed to get Patient Data');
      console.log(error);
    },
  });
  const handleSearch = () => {
    mutation.mutate(values);
  };
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
      sx={{ p: 0, borderRadius: '10px !important' }}
      maxWidth='md'
      fullWidth
    >
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={2} sx={{ textAlign: 'right' }}>
              Patient Name<span style={{ color: 'red' }}>*</span>
            </Grid>
            <Grid item xs={4}>
              <TextField
                placeholder='Patient Name'
                size='small'
                fullWidth
                name='patientName'
                value={values['patientName'] || ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'right' }}>
              Phone Number
            </Grid>
            <Grid item xs={4}>
              <TextField
                placeholder='Phone Number'
                size='small'
                fullWidth
                name='phone'
                value={values['phone'] || ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'right' }}>
              DOB
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                placeholder='Patient Name'
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    fullWidth: true,
                  },
                }}
                name='dob'
                // value={values['dob'] || ''}
                // onChange={(e) => {
                //   handleChange(e);
                // }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'right' }}>
              Email Id
            </Grid>
            <Grid item xs={4}>
              <TextField
                placeholder='Email Id'
                size='small'
                fullWidth
                name='email'
                value={values['email'] || ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          {mutation.isPending && <LinearProgress />}
          <Typography color='grey'>Search Result</Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {patientList &&
              patientList?.map((item) => (
                <ListItemButton
                  sx={{
                    background: (theme) => theme.palette.grey[200],
                    mb: 2,
                    borderRadius: '8px !important',
                    '&.MuiListItemButton-root:hover': {
                      background: (theme) => theme.palette.primary.lighter,
                    },
                  }}
                  key={item.id}
                  onClick={() => {
                    setPatientData(item);
                    reset(item);
                    onClose();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Image />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant='subtitle1'>{item.patientName}</Typography>}
                    secondary={
                      <>
                        <b>Dob:</b> {item.dob},<b>&nbsp;&nbsp;&nbsp;Gender:</b> {item.genderName}
                      </>
                    }
                    sx={{ color: 'black' }}
                  />
                </ListItemButton>
              ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleSearch} variant='contained' loading={mutation.isPending}>
          Search Patient
        </LoadingButton>
        <Button onClick={onClose} variant='outlined' color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
