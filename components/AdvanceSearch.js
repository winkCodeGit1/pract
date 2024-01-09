/* eslint-disable no-unused-vars */
/** @format */

import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
// import VehicleTransportSecond from "../vehicleMaster/VehicleTransport2";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Table from './table';

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
export default function AdvanceSearch({
  title,
  onClose,
  maxWidth,
  formFields,
  queryFn,
  ...others
}) {
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    queryFn({ AbortSignal })
      .then((data) => {
        console.log(data);
        setData(data);
        setColumns(Object.keys(data[0]).map((el) => ({ header: el, accessorKey: el })));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    console.log(e);
  };
  console.log(columns, data);
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
        Advance Search
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
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
          <Grid container spacing={2}>
            {formFields &&
              formFields.map((el, index) => {
                if (el.type === 'text') {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Typography>
                        {el.label} {el.required && <span style={{ color: 'red' }}>*</span>}
                      </Typography>

                      <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        required={el.required}
                        placeholder={`Search by ${el.label}`}
                      />
                    </Grid>
                  );
                }
                if (el.type === 'select') {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Typography>
                        {el.label} {el.required && <span style={{ color: 'red' }}>*</span>}
                      </Typography>
                      <TextField
                        variant='outlined'
                        size='small'
                        select
                        SelectProps={{ native: true }}
                        fullWidth
                        required={el.required}
                      >
                        <option value=''>Select an options</option>
                      </TextField>
                    </Grid>
                  );
                }
                if (el.type === 'dateRange') {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Typography>
                        {el.label} {el.required && <span style={{ color: 'red' }}>*</span>}
                      </Typography>
                      <TextField
                        variant='outlined'
                        size='small'
                        type='date'
                        fullWidth
                        placeholder={`Search by ${el.label}`}
                        required={el.required}
                      />
                    </Grid>
                  );
                }
              })}
            <Grid xs={12} textAlign={'right'} sx={{ mt: 2 }}>
              <Button variant='contained' type='submit'>
                Search
              </Button>
              <Button variant='contained' color='inherit' sx={{ ml: 2 }} onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
        {loading && <LinearProgress />}
        {data.length > 0 && <Table data={data || []} columns={columns} />}
      </DialogContent>
      <Divider />
    </Dialog>
  );
}
