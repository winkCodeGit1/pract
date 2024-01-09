import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useForm } from 'react-hook-form';
import {
  Box,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
//
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import BasicTabs from 'components/Tabs';
import DialogBox from 'components/DialogBox';
import PatientInfo from 'pages/laboratory/PatientInfo';
//
import DoctorNote from './doctorNote';
import NurseQueries from './nurseQueries';
import ComplainDuration from './complainDuration';
import LabInvestigation from './labInvestigation';
import Therapy from './therapy';
import Diet from './diet';
import DischargeNote from './dischargeNote';
import MedicalCertificate from './medicalCertificate';
import PatientHistory from './patientHistory';
import PrescriptionForm from 'pages/Consultation/PrescriptionForm';
import DiagnosisIPD from './diagnosis';

export const optionalMenuOptionStyle = {
  '& .MuiMenuItem-root:first-of-type': {
    fontStyle: 'unset',
    color: 'unset',
  },
  '& .MuiMenuItem-root': {
    marginBottom: '2px !important',
  },
  '& .Mui-selected': {
    backgroundColor: 'skyblue !important',
  },
  '& .Mui-selected:hover': {
    backgroundColor: 'skyblue !important',
  },
};

const initialOptionalTabs = [
  { label: 'Therapy', isNotActive: false },
  { label: 'Diet', isNotActive: false },
  { label: 'Medical Certificate', isNotActive: false },
  { label: 'Discharge Note', isNotActive: false },
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

export default function IpdConsultation({ onClose }) {
  const [addedMedicines, setAddedMedicines] = useState([]);

  const PrescriptionFormIpd = () => {
    return (
      <Box sx={{ border: '1px solid', borderColor: 'divider', padding: '10px' }}>
        <PrescriptionForm
          addedMedicines={addedMedicines}
          setAddedMedicines={setAddedMedicines}
          isIpd={true}
        />
      </Box>
    );
  };

  const TABLIST = [
    { label: 'Doctor Note', component: <DoctorNote /> },
    { label: 'Nurse Queries', component: <NurseQueries /> },
    { label: 'Complain and Duration', component: <ComplainDuration /> },
    { label: 'Patient History', component: <PatientHistory /> },
    { label: 'Diagnosis', component: <DiagnosisIPD /> },
    { label: 'Prescription', component: <PrescriptionFormIpd /> },
    { label: 'Lab & Investigation', component: <LabInvestigation /> },
    { label: 'Therapy', component: <Therapy /> },
    { label: 'Diet', component: <Diet /> },
    { label: 'Discharge Note', component: <DischargeNote /> },
    { label: 'Medical Certificate', component: <MedicalCertificate /> },
  ];

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
    <DialogBox open fullScreen title='IPD Consultation' onClose={onClose}>
      <Stack sx={{ flexDirection: { md: 'column', lg: 'row' }, gap: 2 }}>
        <Stack flex={3}>
          <SideBar />
        </Stack>

        <Stack flex={12} sx={{ overflowX: 'auto' }}>
          <PatientInfo />
          <AddMenuOption tabList={optionalTabs} toggleOptionalTab={toggleOptionalTab} />
          <BasicTabs tabList={filteredTabs} />
        </Stack>
      </Stack>
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
