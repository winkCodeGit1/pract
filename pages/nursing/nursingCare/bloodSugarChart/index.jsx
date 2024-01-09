import { useState } from 'react';
import BloodSugarChartAdd from './BloodSugarChartAdd';
import {
  Paper,
  Button,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
} from '@mui/material';
import { Add, Info } from '@mui/icons-material';

function SugarChartTable({ type }) {
  return (
    <TableContainer component={Paper}>
      <Typography align='center' color='error'>
        {type}
      </Typography>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date Time</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Value&nbsp;(mg/DL)</TableCell>
            <TableCell>Staff Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} align='center'>
              <Info color='action' sx={{ mb: -1 }} />
              &nbsp;
              <Typography variant='caption' align='center'>
                No Records Found!
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function BloodSugarChart() {
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  return (
    <>
      {openAdd && (
        <BloodSugarChartAdd
          selectedRow={selectedRow}
          onClose={() => {
            setOpenAdd(false);
            setSelectedRow();
          }}
        />
      )}
      <Button
        endIcon={<Add />}
        color='primary'
        onClick={() => setOpenAdd((ps) => !ps)}
        variant='contained'
      >
        Add
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SugarChartTable type='FBS' />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SugarChartTable type='PPBS' />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SugarChartTable type='RBS' />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SugarChartTable type='HbA1c' />
        </Grid>
      </Grid>
    </>
  );
}
