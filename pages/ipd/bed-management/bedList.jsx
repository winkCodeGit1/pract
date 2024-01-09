import { Grid } from '@mui/material';
import Bed from './bed';

/* eslint-disable no-unused-vars */
const bedListData = [
  {
    bedInfo: {
      bedName: 'bed - 01',
      status: 'In Use',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
  {
    bedInfo: {
      bedName: 'bed - 02',
      status: 'Empty',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
  {
    bedInfo: {
      bedName: 'bed - 01',
      status: 'Reserved',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
  {
    bedInfo: {
      bedName: 'bed - 01',
      status: 'In Use',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
  {
    bedInfo: {
      bedName: 'bed - 01',
      status: 'In Use',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
  {
    bedInfo: {
      bedName: 'bed - 01',
      status: 'In Use',
    },

    patientInfo: {
      name: 'suman kumar',
      age: 25,
      gender: 'M',
      admissionDate: '09/12/2019',
    },
  },
];

export default function BedList() {
  return (
    <Grid container spacing={2}>
      {bedListData.map((bed, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Bed info={bed} />
        </Grid>
      ))}
    </Grid>
  );
}
