import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import {
  Divider,
  Button,
  Grid,
  Menu,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
//
import DialogBox from 'components/DialogBox';
import BasicTabs from 'components/Tabs';
import NurseRecord from './nurseRecord';
import BloodSugarChart from './bloodSugarChart';
import ConcomitantMedication from './concomitantMedication';
import VitalSign from './vitalSigns';
import KardexForm from './KardexForm';
import WoundAssessmentCareForm from './WoundAssessmentCareForm';
import DietSheet from './dietsheet';
import DietIndentForm from './DietIndentForm';
import MedicationChart from './medicationCharts';
import PatientInfo from 'pages/laboratory/PatientInfo';
import { optionalMenuOptionStyle } from '../../ipd/ipd-consultation';

const TABLIST = [
  { label: 'Nurse Record', component: <NurseRecord /> },
  { label: 'Blood Sugar Chart', component: <BloodSugarChart /> },
  { label: 'Concomitant Medication', component: <ConcomitantMedication /> },
  { label: 'Vital Sign', component: <VitalSign /> },
  { label: 'Kardex Form', component: <KardexForm /> },
  { label: 'Medication Chart', component: <MedicationChart /> },
  { label: 'Wound Assessment & Care Form', component: <WoundAssessmentCareForm /> },
  { label: 'Diet Sheet', component: <DietSheet /> },
  { label: 'Diet Indent Form', component: <DietIndentForm /> },
];
const initialOptionalTabs = [
  { label: 'Wound Assessment & Care Form', isNotActive: false },
  { label: 'Diet Sheet', isNotActive: true },
  { label: 'Diet Indent Form', isNotActive: true },
];

function AddMenuOption({ tabList, toggleOptionalTab }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        id='tab-button'
        aria-controls={open ? 'tab-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='outlined'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Show/Hide Tabs
      </Button>
      <Menu
        id='demo-menu'
        MenuListProps={{
          'aria-labelledby': 'tab-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={optionalMenuOptionStyle}
      >
        {tabList.map((tab) => (
          <MenuItem
            onClick={() => toggleOptionalTab(tab.label)}
            key={tab.label}
            selected={!tab.isNotActive}
          >
            {tab.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default function NursingCare({ onClose }) {
  const [optionalTabs, setOptionalTabs] = useState(initialOptionalTabs);
  const filteredTabs = TABLIST.filter(
    (tab) => !optionalTabs.some((t) => tab.label === t.label && t.isNotActive)
  );

  function toggleOptionalTab(name) {
    const updatedOptionalTabs = optionalTabs.map((t) => {
      if (name === t.label) {
        return { ...t, isNotActive: !t.isNotActive };
      } else {
        return t;
      }
    });

    setOptionalTabs(updatedOptionalTabs);
  }

  return (
    <DialogBox open fullScreen title='Nursing Care' onClose={onClose}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
          <SideBar />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
          <PatientInfo />
          <AddMenuOption tabList={optionalTabs} toggleOptionalTab={toggleOptionalTab} />
          <BasicTabs tabList={filteredTabs} fullWidth />
        </Grid>
      </Grid>
    </DialogBox>
  );
}

// ==================================== SIDE BAR (START)====================================
const patients = [
  { name: 'John Doe', bedNumber: 'B123', condition: 'Fever' },
  { name: 'Jane Smith', bedNumber: 'A456', condition: 'Cough' },
  { name: 'Alice Johnson', bedNumber: 'C789', condition: 'Headache' },
  // Add more patients as needed
];

const defaultValues = {};

function SideBar() {
  const methods = useForm({
    // resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;
  function onSubmit(params) {
    console.log(params);
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFAutoComplete name='ward' placeholder='Search Ward Name' />
        </FormProvider>
        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
        <Typography variant='subtitle2'> List of patient </Typography>
        <MenuList
          dense
          sx={{
            '.MuiMenuItem-root:first-of-type': {
              fontStyle: 'unset',
              color: 'unset',
            },
            '.MuiMenuItem-root': {
              marginBottom: '2px',
            },
            '.Mui-selected': {
              backgroundColor: 'primary.lighter',
            },
            '.Mui-selected:hover': {
              backgroundColor: 'primary.lighter',
            },
          }}
        >
          {patients.map((patient, index) => (
            <MenuItem key={index} selected={index === 1}>
              <ListItemText>{patient.name}</ListItemText>
              <ListItemText>{patient.bedNumber}</ListItemText>
              <ListItemText>{patient.condition}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Stack>
    </Paper>
  );
}
// ==================================== SIDE BAR (END)====================================
