import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { lazy } from 'react';
import { Loadable } from 'utils/retry.js';

// const ObservationForm = Loadable(lazy(() => import('./ObservationForm')));
// const VitalForm = Loadable(lazy(() => import('./VitalForm')));
const ObstetricsForm = Loadable(lazy(() => import('./ObstetricsForm')));
const GynaecologyForm = Loadable(lazy(() => import('./GynaecologyForm')));
const HypertensionIntakeForm = Loadable(lazy(() => import('./HypertensionintakeForm')));
const HypertensionProgressForm = Loadable(lazy(() => import('./HypertensionprogressForm')));
const DiabetesIntakeForm = Loadable(lazy(() => import('./DiabetesintakeForm')));
const DiabetesProgressForm = Loadable(lazy(() => import('./DiabetesprogressForm')));
const ChildhoodIllnessForm = Loadable(lazy(() => import('./ChildhoodIllnessForm')));
const NutritionForm = Loadable(lazy(() => import('./NutritionForm')));
const ChronicKidneyIntakeForm = Loadable(lazy(() => import('./ChronickidneyintakeForm')));
const ChronicKidneyProgressForm = Loadable(lazy(() => import('./ChronickidneyprogressForm')));
const EcgNotesForm = Loadable(lazy(() => import('./EcgnotesForm')));
const OperativeNotesForm = Loadable(lazy(() => import('./OperativenotesForm')));

export default function FormTabs({ onClose, tablist, handleAdd }) {
  console.log(onClose, handleAdd, '---onclose');

  console.log(
    tablist.some((el) => el.active === true),
    'tablist'
  );

  const TABLIST = [
    // {
    //   label: 'History and Examination',
    //   component: <ObservationForm />,
    //   active: true,
    // },
    // { label: 'Vitals', component: <VitalForm />, active: true },
    { label: 'Obstetrics', component: <ObstetricsForm />, active: true },
    { label: 'Gynaecology', component: <GynaecologyForm />, active: false },
    {
      label: 'Hypertension-Intake',
      component: <HypertensionIntakeForm />,
      active: false,
    },
    {
      label: 'Hypertension-Progress',
      component: <HypertensionProgressForm />,
      active: false,
    },
    { label: 'Diabetes - Intake', component: <DiabetesIntakeForm />, active: false },
    { label: 'Diabetes - Progress', component: <DiabetesProgressForm />, active: false },
    { label: 'Childhood Illness', component: <ChildhoodIllnessForm />, active: false },
    { label: 'Nutrition', component: <NutritionForm />, active: false },
    {
      label: 'Chronic Kidney Disease - Intake',
      component: <ChronicKidneyIntakeForm />,
      active: false,
    },
    {
      label: 'Chronic Kidney Disease – Progress',
      component: <ChronicKidneyProgressForm />,
      active: false,
    },
    { label: 'ECG Notes', component: <EcgNotesForm />, active: false },
    { label: 'Operative Notes', component: <OperativeNotesForm />, active: false },
  ];
  return (
    <div>
      <Dialog open={true} onClose={onClose} maxWidth='md' fullWidth>
        <DialogTitle id='alert-dialog-title' justifyContent='flex-end' align='right' mb={2}>
          <TextField size='small' placeholder='Search...' />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {TABLIST.map((item) => (
              <Grid key={item.label} item xs={12} sm={6} md={4}>
                <Button
                  variant='contained'
                  key={item.label}
                  disabled={tablist.find((el) => el.label === item?.label)?.active}
                  onClick={() => {
                    handleAdd(item);
                  }}
                  sx={{ width: '100%', textAlign: 'left' }}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='contained' color='info'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
