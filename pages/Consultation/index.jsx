/** @format */

import { Avatar, Card, Grid, Typography, Button, Paper, Divider, CardContent } from '@mui/material';
import React, { lazy } from 'react';
// import ConsultationMasterTabs from "./ConsultationMasterTabs";
import { ExpandMore } from '@mui/icons-material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import LabTestOrder from "./Orders/LabTestOrder";
import { Loadable } from 'utils/retry';
import { Stack } from '@mui/system';
import PreviousConsultation from './PreviousHistory.jsx';
import Pulse from 'assets/Images/consultationImage/pulse-rate.png';
import HeartRate from 'assets/Images/consultationImage/heart-rate.png';
import Height from 'assets/Images/consultationImage/height.png';
import RsRate from 'assets/Images/consultationImage/rs-rate.png';
import SP from 'assets/Images/consultationImage/spo2.png';
import Temp from 'assets/Images/consultationImage/temp.png';
import Weight from 'assets/Images/consultationImage/weight.png';
import Bp from 'assets/Images/consultationImage/bp.png';

const ObserVationTab = Loadable(lazy(() => import('./ObserVation')));
const LabTestOrder = Loadable(lazy(() => import('./Orders/LabTestOrder')));
const DiagnosisTab = Loadable(lazy(() => import('./Diagnosis/DiagnosisTab')));
const DispositionTab = Loadable(lazy(() => import('./Disposition/DispositionTab')));
const Prescription = Loadable(lazy(() => import('./Prescription/index.js')));

export const defaultArray = {
  ChiefComplaint: '',
  accept: false,
  for: '',
  frequency: '',
  additionalNote: '',
  showHideNote: false,
};

const defaultValues = {
  obserVation: [defaultArray],
  diagnosis: {},
  disposition: {},
  laboratory: {},
  radiology: [],
  prescription: [],
};

// let NewUserSchema = Yup.object().shape({
//   ExaminationNotes: Yup.string().required('Required'),
// });

export default function ConsultationMaster() {
  const [expanded, setExpanded] = React.useState({});
  const [addedMedicines, setAddedMedicines] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  // const handleDynamicSchema = (name) => {
  //   name.forEach((item) => {
  //     for (const [key, value] of Object.entries(item)) {
  //       NewUserSchema.fields[key] = value;
  //       NewUserSchema._nodes.push(key);
  //     }
  //   });
  // };

  const handleChange = (panel) => {
    console.log(panel, 'panel');
    if (expanded[panel]) {
      setExpanded((ps) => ({ ...ps, [panel]: '' }));
    } else {
      setExpanded((ps) => ({ ...ps, [panel]: panel }));
    }
  };

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data, addedMedicines);
  };

  const consultationList = [
    {
      name: 'Observation',
      component: <ObserVationTab stateName='obserVation' />,
    },
    { name: 'Diagnosis', component: <DiagnosisTab stateName='diagnosis' /> },
    {
      name: 'Disposition',
      component: <DispositionTab stateName='disposition' />,
    },
    { name: 'Laboratory', component: <LabTestOrder stateName='laboratory' /> },
    { name: 'Radiology', component: <LabTestOrder stateName='radiology' /> },
    {
      name: 'Prescription',
      component: (
        <Prescription
          stateName='prescription'
          setAddedMedicines={setAddedMedicines}
          addedMedicines={addedMedicines}
        />
      ),
    },
  ];

  return (
    <>
      {open && (
        <PreviousConsultation
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
      <Card
        sx={{
          display: 'flex',
          padding: '10px',
          alignItems: 'center',
          '& .MuiTypography-root': {
            borderRight: (theme) => `1px solid ${theme.palette.grey[400]}`,
            padding: '0px 22px',
          },
          '& .MuiTypography-root:nth-last-of-type(1)': {
            borderRight: '0px solid black',
          },
        }}
      >
        <Grid container spacing={0} alignItems='center'>
          <Grid item xs={1}>
            <Avatar sx={{ width: 100, height: 100 }}>T</Avatar>{' '}
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={0} alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='body1' fontWeight={600}>
                  Test Radiology (GAN203010)
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600}>
                  42 Year Male
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1' fontWeight={600}>
                  Occupation:Engineer
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600}>
                  Health Id IBE2234
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1' fontWeight={600}>
                  Referred Doctor:Dr. Rajendra Prasad
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <Divider />
            <Typography variant='h6' sx={{ marginTop: '4px' }}>
              Vital Sign
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <Stack flexDirection='row' gap={2} justifyContent='space-around' alignItems='center'>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Pulse Rate
                  <img src={Pulse} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  SpO2
                  <img src={SP} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Blood Pressure
                  <img src={Bp} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Respiratory Rate
                  <img src={RsRate} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Heart Rate
                  <img src={HeartRate} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Temperature
                  <img src={Temp} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Height
                  <img src={Height} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '110px', minHeight: '135px' }}>
                <CardContent sx={{ textAlign: 'center', paddingBottom: '0px !important', p: 1 }}>
                  Weight
                  <img src={Weight} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    78
                  </Typography>
                </CardContent>
              </Card>

              <Button variant='contained'>Add Vital Signs</Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <br />
      <Stack direction='row' justifyContent={'flex-end'}>
        <Button
          variant='outlined'
          onClick={() => {
            setOpen((ps) => !ps);
          }}
        >
          Previous History
        </Button>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {consultationList.map(({ name, component }) => (
          <Accordion
            component={Paper}
            elevation={2}
            key={name}
            expanded={expanded[name] === name}
            onChange={() => handleChange(name)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary aria-controls={name} id={name} expandIcon={<ExpandMore />}>
              <Typography variant='body1' fontWeight={500}>
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{component}</AccordionDetails>
          </Accordion>
        ))}
      </FormProvider>
      <Grid container spacing={2} sx={{ mt: '2px' }}>
        <Grid item xs={12} textAlign='right'>
          <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
