/* eslint-disable quotes */
/** @format */

import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { ZoomOutMap, KeyboardArrowDown } from '@mui/icons-material';

import { FormProvider, RHFRadioGroup, RHFTextField, RHFTextarea } from 'components/hook-form';
import { useForm } from 'react-hook-form';

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
import FormWrapper from 'components/FormWrapper.js';
import PrescriptionForm from './PrescriptionForm.jsx';

import DiagnosisTab from './Diagnosis/DiagnosisTab.js';
import PastHistory from './history/PastHistory.jsx';
import LabOrderTestNew from './Orders/LabOrderTestNew.jsx';
import PersonalHistory from './history/PersonalHistory.jsx';
import FamilyHistory from './history/FamilyHistory.jsx';
import VitalSign from './VitalSign.jsx';
import PreviewConsultation from './PreviewConsultation';
import { consultationSaveConsultation } from 'pages/api/consultation/index.js';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { vitalSignGetByRegistrationId } from 'pages/api/common/index.js';
import BasicTabs from 'components/Tabs.jsx';
import DosAndDont from './DosAndDont.js';
import { optionalMenuOptionStyle } from 'pages/ipd/ipd-consultation/index.jsx';
import { calculateAge } from 'utils/date.js';
import SearchPatient from './SearchPatient.jsx';
import ObserVationTab from './ObserVation/index.jsx';
import useAuth from 'hooks/useAuth.js';
import useConsultationStore from 'stores/useConsulatationStore.js';

const followUpVisit = ['1 days', '3 days', '7 days', '14 days', '28 days', 'Others'];
export const defaultArray = {
  ChiefComplaint: '',
  accept: false,
  for: '',
  frequency: '',
  additionalNote: '',
  showHideNote: false,
};
export const defaultArrayPastHistory = {
  disease: 'Name ',
  status: '',
  month: null,
  year: null,
  remarks: '',
};
const initialTabList = [{ label: "Do's & Dont's", component: <DosAndDont /> }];

const selectedTabList = [];

const defaultValues = {
  obserVation: [defaultArray],
  diagnosis: { additionalDiagnosis: [{ name: null, certainty: '', remarks: '' }] },
  disposition: {},
  laboratory: {},
  radiology: [],
  prescription: [],
  pastHistory: [],
  personalHistory: [],
  patientHistory: { pastHistory: [], personalHistory: [], familyHistory: [] },
  laboratoryTest: [],
};

export default function NewConsultationMaster() {
  const { user } = useAuth();

  const selectedPatient = useConsultationStore((store) => store.selectedPatient);
  const [addedMedicines, setAddedMedicines] = useState([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [openPrescription, setOpenPrescription] = useState(false);
  const [openLab, setOpenLab] = useState(false);
  const [openPastHistory, setOpenPastHistory] = useState(false);
  const [openVitalSign, setOpenVitalSign] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState('');
  const [openAdditionalMenu, setOpenAdditionalMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, watch, getValues } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let req = {
        consultationDto: {
          staffId: 1,
          registrationId: selectedPatient?.registrationId,
          consultationStatusId: 2,
          followUpVisitDate: '2023-10-18',
        },
      };

      if (addedMedicines.length > 0) {
        req.prescriptionDtos = addedMedicines.map((item) => ({
          ...item,
          isBf: item.isBf === '2' ? true : false,
          medicineNameId: item?.medicineNameId?.id,
          drugIntervalId: item?.drugIntervalId?.id,
        }));
      }

      if (data.diagnosis.additionalDiagnosis.filter((item) => item.name !== null).length > 0) {
        req.diagnosisDtos = data.diagnosis.additionalDiagnosis.map((item) => ({
          ...item,
          isFinal: false,
          icdCodeId: item.name?.id,
          isConfirmed: item?.certainty === 'Confirmed' ? true : false,
          icdCodeName: item.name.chapNm,
        }));
      }
      if (data.diagnosis.finalDiagnosis.name) {
        if (Array.isArray(req.diagnosisDtos) && req.diagnosisDtos.length > 0) {
          req.diagnosisDtos.push({
            ...data.diagnosis.finalDiagnosis.name,
            isFinal: true,
            icdCodeId: data.diagnosis.finalDiagnosis.name?.id,
            isConfirmed: false,
            icdCodeName: data.diagnosis.finalDiagnosis.name.chapNm,
          });
        } else {
          req.diagnosisDtos = [
            {
              ...data.diagnosis.finalDiagnosis.name,
              isFinal: true,
              icdCodeId: data.diagnosis.finalDiagnosis.name?.id,
              isConfirmed: false,
              icdCodeName: data.diagnosis.finalDiagnosis.name.chapNm,
            },
          ];
        }
      }
      if (data.laboratoryTest.length > 0) {
        req.labOrderReq = {};
        req.labOrderReq['createdBy'] = user?.staffId;
        req.labOrderReq['labSingleTests'] = data?.laboratoryTest
          ?.filter((el) => !el.groupTest)
          .map((item) => ({ ...item, labTestId: item.testId, isGroupTest: false }));
        req.labOrderReq['labGroupTests'] = data.laboratoryTest
          ?.filter((el) => el.groupTest)
          .map((item) => ({ ...item, labTestId: item.testId, isGroupTest: true }));
      }

      console.log(req, 'req');
      const result = await consultationSaveConsultation(req);
      console.log(result);
      toast.success('Consultation Successfully Completed');
      setLoading(false);
    } catch (error) {
      console.log(error, 'error');
      toast.error('Something Went Wrong');
      setLoading(false);
    }
  };

  const { data: currentVitalSign } = useQuery({
    queryKey: ['vitalSignGetByRegistrationId', selectedPatient?.registrationId],
    queryFn: vitalSignGetByRegistrationId,
    enabled: !!selectedPatient?.registrationId,
  });
  const handleTabChange = (item) => {
    const findElement = selectedTabList?.findIndex((el) => el.label === item.label);
    if (findElement === -1) {
      selectedTabList.push(item);
    } else {
      selectedTabList.splice(findElement, 1);
    }
    setAnchorEl(null);
    setOpenAdditionalMenu(false);
  };

  const filterLatestVital = (type) => {
    const sortedData = currentVitalSign?.data?.sort((a, b) => b.id - a.id);
    const findValue = sortedData?.find((el) => el.typeName === type);
    return findValue;
  };
  console.log(getValues(), selectedPatient, 'getValues');
  return (
    <>
      {openSearch && (
        <SearchPatient
          onClose={() => {
            setOpenSearch(false);
          }}
        />
      )}
      {openVitalSign && (
        <VitalSign
          onClose={() => {
            setOpenVitalSign(false);
          }}
          selectedPatient={selectedPatient}
        />
      )}
      {openPrescription && (
        <FormWrapper
          onClose={() => {
            setOpenPrescription(false);
          }}
          title='Prescription'
          maxWidth='xl'
        >
          <PrescriptionForm
            addedMedicines={addedMedicines}
            setAddedMedicines={setAddedMedicines}
            isIpd={false}
          />
        </FormWrapper>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {openPreview && (
          <PreviewConsultation
            onClose={() => setOpenPreview(false)}
            addedMedicines={addedMedicines}
            onSubmit={handleSubmit(onSubmit)}
            loading={loading}
          />
        )}

        {open && (
          <PreviousConsultation
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}

        {openLab && (
          <FormWrapper
            onClose={() => {
              setOpenLab(false);
            }}
            title='Laboratory'
            maxWidth='md'
            fullWidth
          >
            <LabOrderTestNew stateName={'laboratoryTest'} />
          </FormWrapper>
        )}
        {openPastHistory && (
          <FormWrapper
            onClose={() => {
              setOpenPastHistory(false);
              setSelectedHistory('');
            }}
            title={selectedHistory}
            maxWidth='lg'
            fullWidth
          >
            {selectedHistory === 'Past History' ? (
              <PastHistory stateName={'patientHistory'} />
            ) : selectedHistory === 'Personal History' ? (
              <PersonalHistory stateName={'patientHistory'} />
            ) : selectedHistory === 'Family History' ? (
              <FamilyHistory stateName={'patientHistory'} />
            ) : null}
          </FormWrapper>
        )}

        <Card
          sx={{
            display: 'flex',
            padding: '10px',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={0} alignItems='center'>
            <Grid item xs={12} sm={12} md={1}>
              <Avatar sx={{ width: 100, height: 100 }}>T</Avatar>{' '}
            </Grid>
            <Grid item xs={12} sm={12} md={11}>
              <Grid container spacing={0} alignItems='center'>
                <Grid item xs={12}>
                  <Typography variant='body1' fontWeight={600}>
                    {selectedPatient
                      ? selectedPatient?.patientName + '' + `(${selectedPatient?.patientMrn})`
                      : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }} sm={12} md={3}>
                  <Typography variant='body1' fontWeight={400}>
                    {selectedPatient &&
                      calculateAge(selectedPatient.dob) + ' Year ' + selectedPatient.gender}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} sx={{ mb: 1 }}>
                  <Typography variant='body1' fontWeight={400}>
                    Blood Group: {selectedPatient?.bloodGroup || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography variant='body1' fontWeight={400}>
                    Contact: {selectedPatient?.phone || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant='body1' fontWeight={400}>
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
              <Stack
                flexDirection='row'
                gap={2}
                justifyContent='space-around'
                alignItems='center'
                flexWrap='wrap'
              >
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#E8F0F3',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',

                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      Pulse Rate
                    </Typography>
                    <img src={Pulse} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Pulse Rate')?.vitalSignValue || '-'}

                      {filterLatestVital('Pulse Rate')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#F2E1B5',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      SpO2
                    </Typography>
                    <img src={SP} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('SpO2')?.vitalSignValue || '-'}
                      {filterLatestVital('SpO2')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#FBCACA',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      BP
                    </Typography>
                    <img src={Bp} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Blood Pressure')?.vitalSignValue || '-'}
                      {filterLatestVital('Blood Pressure')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#E9F4DD',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      RS Rate
                    </Typography>
                    <img src={RsRate} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Respiratory Rate')?.vitalSignValue || '-'}
                      {filterLatestVital('Respiratory Rate')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#DDEAF3',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      Heart Rate
                    </Typography>
                    <img src={HeartRate} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Heart Rate')?.vitalSignValue || '-'}
                      {filterLatestVital('Heart Rate')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#D9D9D9',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      Temperature
                    </Typography>
                    <img src={Temp} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Temperature')?.vitalSignValue || '-'}
                      {filterLatestVital('Temperature')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#FCFBFB',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      Height
                    </Typography>
                    <img src={Height} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Height')?.vitalSignValue || '-'}
                      {filterLatestVital('Height')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: '110px',
                    minHeight: '105px',
                    border: '1px solid #AAAAAA',
                    background: '#F1F1F6',
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      paddingBottom: '0px !important',
                      p: 1,
                    }}
                  >
                    <Typography variant='body2' color={'black'}>
                      Weight
                    </Typography>
                    <img src={Weight} alt='pulse' style={{ margin: 'auto', marginTop: 5 }} />
                    <Typography variant='body1' sx={{ mt: 1 }} color='black'>
                      {filterLatestVital('Weight')?.vitalSignValue || '-'}
                      {filterLatestVital('Weight')?.uom || ''}
                    </Typography>
                  </CardContent>
                </Card>

                <Button
                  variant='contained'
                  onClick={() => {
                    if (!selectedPatient) {
                      toast.error('Please Select a Patient');
                      return;
                    }
                    setOpenVitalSign(true);
                  }}
                >
                  Add Vital Signs
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title='Complaints & observation' sx={{ p: 1 }} />
              <Divider />
              <CardContent>
                <RHFTextarea name='complain' label='Chief Complaints' sx={{ mb: 2 }} />

                <RHFTextarea name='complainNote' label='Chief Complaints Notes' sx={{ mb: 2 }} />

                <RHFTextarea name='ExaminationNotes' label='Examination Notes' sx={{ mb: 2 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader
                title='Prescription'
                sx={{ p: 1 }}
                action={
                  <IconButton
                    aria-label='settings'
                    onClick={() => {
                      setOpenPrescription(true);
                    }}
                    size='small'
                  >
                    <ZoomOutMap />
                  </IconButton>
                }
              />
              <Divider />
              <CardContent>
                {addedMedicines?.length > 3 && (
                  <Typography
                    variant='body2'
                    sx={{
                      cursor: 'pointer',
                      color: 'blue',
                      textDecoration: 'underline',
                      float: 'right',
                    }}
                    onClick={() => {
                      setOpenPrescription(true);
                    }}
                  >
                    View All
                  </Typography>
                )}
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Drug Name</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>No. of Days</TableCell>
                        <TableCell>Interval</TableCell>
                        <TableCell>Dose</TableCell>
                        <TableCell>AF/BF</TableCell>
                        <TableCell>Total Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {addedMedicines && addedMedicines.slice(0, 3).length > 0 ? (
                        addedMedicines?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.medicineNameId?.MedicineName}</TableCell>
                            <TableCell>{item.dosage}</TableCell>
                            <TableCell>{item.noDays}</TableCell>
                            <TableCell>{item.drugIntervalId?.drugIntervalName}</TableCell>
                            <TableCell>{item.dosage}</TableCell>
                            <TableCell>{item.isBf === '1' ? 'AF' : 'BF'}</TableCell>
                            <TableCell>{item.totalQuantity}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align='center'>
                            No Medecines{' '}
                            <Button
                              onClick={() => {
                                setOpenPrescription(true);
                              }}
                            >
                              add New
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
                <RHFTextField
                  name='prescriptionNote'
                  label='Note'
                  multiline
                  minRows={addedMedicines.length > 3 ? 2 : 3}
                  maxRows={addedMedicines.length > 3 ? 2 : 3}
                  placeholder='Prescription Note...'
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title='Lab Investigation' sx={{ p: 1 }} />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setOpenLab(true);
                        }}
                      >
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Laboratory' />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton edge='end' aria-label='delete'>
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Radiology' />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton edge='end' aria-label='delete'>
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Procedures' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {/* <Card>
              <CardContent sx={{ pt: 1.3 }}>
                <BasicTabs tabList={TABLIST} />
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader title='Clinical History' sx={{ p: 1 }} />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setOpenPastHistory(true);
                          setSelectedHistory('Past History');
                        }}
                      >
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Past History' />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setOpenPastHistory(true);
                          setSelectedHistory('Personal History');
                        }}
                      >
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Personal History' />
                  </ListItem>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setOpenPastHistory(true);
                          setSelectedHistory('Family History');
                        }}
                      >
                        <ZoomOutMap />
                      </IconButton>
                    }
                  >
                    <ListItemText primary='Family History' />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <DiagnosisTab stateName={'diagnosis'} />
                <Button
                  onClick={(e) => {
                    setOpenAdditionalMenu(true);
                    setAnchorEl(e.currentTarget);
                  }}
                  endIcon={<KeyboardArrowDown />}
                  variant='contained'
                  color='inherit'
                  sx={{ mt: 2 }}
                >
                  Add Additional Details
                </Button>
                <Menu
                  id='open-additional-menu'
                  MenuListProps={{
                    'aria-labelledby': 'open-additional-menu',
                  }}
                  sx={{ ...optionalMenuOptionStyle, '& .MuiPaper-root': { minWidth: 180 } }}
                  anchorEl={anchorEl}
                  open={openAdditionalMenu}
                  onClose={() => {
                    setOpenAdditionalMenu(false);
                    setAnchorEl(null);
                  }}
                >
                  {initialTabList.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => {
                        handleTabChange(item);
                      }}
                      selected={selectedTabList.some((el) => el?.label === item?.label)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
                <br />

                {selectedTabList.length > 0 && (
                  <>
                    <br /> <BasicTabs tabList={selectedTabList} />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <ObserVationTab />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack flexDirection='row' alignItems='center'>
                  <Typography variant='h6' sx={{ marginRight: 3 }}>
                    Follow up visit
                  </Typography>
                  <RHFRadioGroup
                    name='followUpVisit'
                    options={followUpVisit}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                  <RHFTextField
                    name='otherVisit'
                    placeholder='Duration'
                    disabled={watch('followUpVisit') !== 'Others'}
                    sx={{ maxWidth: '250px' }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '2px' }} justifyContent='end'>
          <Grid item>
            <Button
              size='medium'
              variant='contained'
              onClick={() => {
                if (!selectedPatient) {
                  toast.error('Please Select a Patient');
                  return;
                }
                setOpenPreview(true);
              }}
            >
              Preview
            </Button>
          </Grid>
          <Grid item>
            <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
              Transfer
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
