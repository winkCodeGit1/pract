/** @format */
// form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//@mui
import { Card, Grid, MenuItem, ToggleButton, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FormProvider,
  RHFAutoComplete,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFToggleButton,
} from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import {
  getAllGender,
  getAllRelationType,
  getBloodGroup,
  getCities,
  getCountries,
  getStates,
} from 'pages/api/dashboard';
import { useForm } from 'react-hook-form';
import { restrict } from 'utils/restrict';

import { DonorRegistrationSave } from 'pages/api/bloodbank';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toggleButtonStyle } from 'utils/cssStyles';
import FormWrapper from 'components/FormWrapper';
const defaultValues = {
  donorName: null,
  dob: null,
  occupation: null,
  email: null,
  contactNo: null,
  genderId: null,
  relativeName: null,
  relationType: null,
  address: null,
  streetAddress: null,
  countryId: null,
  stateId: null,
  cityId: null,
  pincode: null,
  bloodGroupId: null,
  masterCardNumber: null,

  test: 'No',
  template: false,

  templateData: {
    previousDonated: false,
    timesCamps: '0',
    timesOutside: '0',
    lastDonationDate: null,
    discomfprtAfterBefore: null,
    advisedNotToDonate: null,
    afterDonatingHeavyWork: null,
    feelWellToday: null,
    eatLastFourHour: null,
    sleepWellLastNight: null,
    venerealDiseases: null,
    lastSixMonthHistory: null,

    UnexplainedWeightLoss_cbox: null,
    repeatedDiarrhoea_cbox: null,
    swollenGlands_cbox: null,
    continuouslowgradeFever_cbox: null,
    virusCausingAIDS: null,
    sufferFromDiesease: null,

    heartDisease_cbox: null,
    lungDisease_cbox: null,
    kidneyDisease_cbox: null,
    endocrineDisease_cbox: null,
    jaundice_cbox: null,
    dengue_cbox: null,
    malaria_cbox: null,
    covid_cbox: null,
    typhoid_cbox: null,
    tuberculosis_cbox: null,
    measles_cbox: null,
    chickenpox_cbox: null,
    zika_cbox: null,
    chikugunya_cbox: null,
    mumps_cbox: null,
    allergicDiseases_cbox: null,
    skinDiseases_cbox: null,
    coldFlu: null,
    fever: null,
    headache: null,
    conjuctivitis: null,
    osteomyelitis: null,
    deficiencyFollowing: null,
    epilepsy_cbox: null,
    cancer_cbox: null,
    sexuallyTransmitted_cbox: null,
    faintingSpells_cbox: null,
    gsixpdDeficiency_cbox: null,
    abnormalBleeding_cbox: null,
    polycyThaemia_cbox: null,
    hepatitis_cbox: null,
    gonorrhoea_cbox: null,
    drugMedication: null,
    antiBodies_cbox: null,
    aspirin_cbox: null,
    alcohol_cbox: null,
    sterodies_cbox: null,
    anyotherMedication: null,
    // -----------------
    pastfewMonths: null,
    receivedbloodComonents: null,
    accidentorOperation: null,
    anyVaccination: null,
    bittenbyAnimal: null,
    acupunctureTreatment: null,
    imprisonedanyReason: null,
    jaundiceHiv: null,
    toothExaction: null,
    everPregnant: null,
    anyAboration: null,
    lessyearChild: null,
    breastFeeding: null,
    periodsToday: null,
    concealmentHealth: null,
    noInducement: null,
    acceptRisk: null,
    needyAlbuminFactor: null,
    testHepatitis: null,
    postPrecautions: null,
    bloodDonation: null,
    plasmaFractionation: null,
    resultBloodtesting: null,
    withinFifteendays: null,
  },
};
const Schema = yup.object().shape({
  donorName: yup.string().trim().required('Required'),
  dob: yup.date('Invalid').nullable().required('Required'),
  occupation: yup.string().trim().required('Required'),
  email: yup.string().trim().required('Required'),
  contactNo: yup.string().trim().required('Required'),
  genderId: yup.string().trim().required('Required'),
  relativeName: yup.string().trim().required('Required'),
  relationType: yup.string().trim().required('Required'),
  address: yup.string().trim().required('Required'),
  streetAddress: yup.string().trim().required('Required'),
  countryId: yup.object().typeError('Required').nullable().required('Required'),
  stateId: yup.object().typeError('Required').nullable().required('Required'),
  cityId: yup.object().typeError('Required').nullable().required('Required'),
  pincode: yup.string().trim().required('Required'),
  bloodGroupId: yup.object().required('Required'),
  // templateData: yup.object().shape({
  //   previousDonated: yup.boolean().nullable().required('Required'),
  //   UnexplainedWeightLoss_cbox: yup.boolean().nullable().required('Required'),
  // }),
});
export default function AddBloodDonorForm({ onClose }) {
  const queryClient = useQueryClient();
  const options = ['true', 'false'];
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { watch, handleSubmit, setValue } = methods;

  const mutation = useMutation({
    mutationFn: (req) => DonorRegistrationSave({ req }),

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['getAllregList'] });
      toast(data || saveMessage);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    var request = {
      ...data,
      countryId: data.countryId.id,
      stateId: data.stateId.id,
      cityId: data.cityId.id,
      pincode: +data.pincode,
      address: data.address,
      genderId: +data.genderId,
      relationType: +data.relationType,
      bloodGroupId: data.bloodGroupId.id,
    };
    console.log(request);
    mutation.mutate(request);
  };

  console.log(watch('templateData'));
  const countryId = watch('countryId')?.id;
  const stateId = watch('stateId')?.id;
  const { data: countries } = useQuery({
    queryKey: ['getCountries'],
    queryFn: getCountries,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: states } = useQuery({
    queryKey: ['getStates', countryId],
    queryFn: getStates,
    enabled: !!countryId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: cities } = useQuery({
    queryKey: ['getCities', stateId],
    queryFn: getCities,
    enabled: !!stateId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: genders } = useQuery({
    queryKey: ['getAllGender'],
    queryFn: getAllGender,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: relationships } = useQuery({
    queryKey: ['getAllRelationType'],
    queryFn: getAllRelationType,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: bloodGroup = [] } = useQuery({
    queryKey: ['getBloodGroup'],
    queryFn: getBloodGroup,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const TemplateComponets = ({ label, name, disableRadio, children }) => {
    return (
      <Grid item container xs={12} justifyContent={'space-between'} pb={1}>
        <Grid md={8} xs={12}>
          <Typography variant='body2'>{label}</Typography>
        </Grid>
        {!disableRadio && (
          <Grid md={3} xs={12}>
            <RHFRadioGroup
              name={name}
              options={options}
              sx={{
                '& .MuiFormControlLabel-root': { mr: 4 },
              }}
            />
          </Grid>
        )}
        {
          <Grid md={3} xs={12}>
            {children}
          </Grid>
        }
        {/* {!disableRadio && (
          <Grid md={3} xs={12}>
            <RHFToggleButtonChipVariant size='small' name={name} exclusive>
              <ToggleButton
                value='Yes'
                size='small'
                sx={{
                  ...toggleButtonStyleChip,
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    background: (theme) => theme.palette.primary.lighter,
                  },
                  '&.Mui-selected': {
                    background: (theme) => theme.palette.primary.lighter,
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'black' : theme.palette.grey[700],
                    // marginLeft: '4px !important',
                  },
                  '&.Mui-selected:hover': {
                    background: (theme) => theme.palette.primary.light,
                  },
                }}
              >
                Yes
              </ToggleButton>
              <ToggleButton
                value='No'
                size='small'
                sx={{
                  ...toggleButtonStyleChip,
                  '&:hover': {
                    background: (theme) => theme.palette.error.lighter,
                  },
                  '&.Mui-selected': {
                    background: (theme) => theme.palette.error.lighter,
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'black' : theme.palette.grey[700],
                    border: (theme) => theme.palette.error.dark,
                    // marginLeft: '4px !important',
                  },
                  '&.Mui-selected:hover': {
                    background: (theme) => theme.palette.error.light,
                  },
                }}
              >
                No
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>
        )} */}
      </Grid>
    );
  };
  const [showTemplate, setShowTemplate] = useState(false);

  const sixA = [
    {
      id: 1,
      name: 'UnexplainedWeightLoss',
      label: 'Unexplained weight loss',
    },
    {
      id: 2,
      name: 'repeatedDiarrhoea',
      label: 'Repeated Diarrhoea',
    },
    {
      id: 3,
      name: 'swollenGlands',
      label: 'Swollen Glands',
    },
    {
      id: 4,
      name: 'continuouslowgradeFever',
      label: 'Continuous low-grade fever',
    },
  ];

  const eight = [
    {
      id: 1,
      name: 'heartDisease',
      label: 'Heart Disease',
    },
    {
      id: 2,
      name: 'lungDisease',
      label: 'Lung Disease',
    },
    {
      id: 3,
      name: 'kidneyDisease',
      label: 'Kidney Disease',
    },
    {
      id: 4,
      name: 'endocrineDisease',
      label: 'Endocrine Disease',
    },
    {
      id: 5,
      name: 'jaundice_cbox',
      label: 'Jaundice',
    },
    {
      id: 6,
      name: 'malaria_cbox',
      label: 'Malaria(3mth)',
    },
    {
      id: 7,
      name: 'dengue_cbox',
      label: 'Dengue(6mth)',
    },
    {
      id: 8,
      name: 'covid_cbox',
      label: 'COVID-19(28 Days)',
    },
    {
      id: 9,
      name: 'typhoid_cbox',
      label: 'Typhoid(Last 1yr)',
    },
    {
      id: 10,
      name: 'tuberculosis_cbox',
      label: 'Tuberculosis(2yr)',
    },
    {
      id: 11,
      name: 'measles_cbox',
      label: 'Measles(2wk)',
    },
    {
      id: 12,
      name: 'chickenPox',
      label: 'Chickenpox(2wk)',
    },
    {
      id: 13,
      name: 'zika',
      label: 'ZIKA(4mth)',
    },
    {
      id: 14,
      name: 'chikuGunya',
      label: 'Chikugunya(6mth)',
    },
    {
      id: 15,
      name: 'mumps',
      label: 'Mumps(2wk)',
    },
    {
      id: 16,
      name: 'allergicDisease',
      label: 'Allergic Diseases',
    },
    {
      id: 17,
      name: 'skinDisease',
      label: 'Skin Diseases',
    },
    {
      id: 18,
      name: 'coldFlu',
      label: 'Cold/Flu',
    },
    {
      id: 19,
      name: 'fever',
      label: 'Fever',
    },
    {
      id: 20,
      name: 'headAche',
      label: 'Headache',
    },
    {
      id: 21,
      name: 'conjuctivitis',
      label: 'Conjuctivitis',
    },
    {
      id: 22,
      name: 'osteomyelitis',
      label: 'Osteomyelitis(2yr)',
    },
  ];
  const nine = [
    {
      id: 1,
      name: 'epilepsy',
      label: 'Epilepsy',
    },
    {
      id: 2,
      name: 'cancer',
      label: 'Cancer',
    },
    {
      id: 3,
      name: 'sexuallyDisease',
      label: 'Sexually Transmitted Diseases',
    },
    {
      id: 4,
      name: 'faintingSpells',
      label: 'Fainting Spells',
    },
    {
      id: 5,
      name: 'g6pdDeficiency',
      label: 'G6PD Deficiency',
    },
    {
      id: 6,
      name: 'abnormalBleeding',
      label: 'Abnormal Bleeding Tendency/Hemophilla',
    },
    {
      id: 7,
      name: 'polyCythaemia',
      label: 'Polycythaemia',
    },
    {
      id: 8,
      name: 'hepatitisBc',
      label: 'Hepatitis B/C',
    },
    {
      id: 9,
      name: 'gonorrhoea',
      label: 'Gonorrhoea',
    },
  ];

  const tenCheckBoxData = [
    {
      id: 1,
      name: 'antiBodies',
      label: 'Antibodies(14 days)',
    },
    {
      id: 2,
      name: 'aspirin',
      label: 'Aspirin',
    },
    {
      id: 3,
      name: 'alcohol',
      label: 'Alcohol',
    },
    {
      id: 4,
      name: 'steroids',
      label: 'Steroids',
    },
    {
      id: 5,
      name: 'otherMedication',
      label: 'Any Other Medication',
    },
  ];
  return (
    <FormWrapper
      onClose={onClose}
      title='Donor Registration'
      maxWidth='lg'
      onSubmit={handleSubmit(onSubmit)}
    //onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ margin: 2 }}>
          <Grid container sx={12}>
            <Grid item container xs={12} md={6} spacing={2} p={2}>
              <Grid item xs={12}>
                <RHFTextField
                  label='Full Name'
                  name='donorName'
                  placeholder='Full Name - Middle Name - Last Name'
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  label='Relative Name'
                  name='relativeName'
                  placeholder='Relative Name'
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name='relationType' label='Relationship Type' required>
                  <MenuItem
                    value=''
                    sx={{
                      mx: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                    }}
                  >
                    Select Option
                  </MenuItem>
                  {relationships?.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <RHFDatePicker
                    name='dob'
                    label='Date of Birth'
                    format='dd-MM-yyyy'
                    required
                    disableFuture
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>Age</Typography>
                  <Grid item container spacing={2}>
                    <Grid item xs={4}>
                      <RHFTextField
                        name='year'
                        placeholder='Year'
                        inputProps={{ maxLength: 3 }}
                        onInput={(e) => {
                          restrict.digits(e);
                        }}
                        toUpperCase
                      // onInputChange={(event) => {
                      //   // getsetDOBHandler(event);
                      //   // setValue('month', 0);
                      //   // setValue('days', 0);
                      // }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField
                        name='month'
                        placeholder='month'
                        inputProps={{ maxLength: 3 }}
                        onInput={(e) => {
                          restrict.digits(e);
                        }}
                        toUpperCase
                      // onInputChange={(event) => {
                      //   // getsetDOBHandler(event);
                      //   // setValue('month', 0);
                      //   // setValue('days', 0);
                      // }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField
                        name='date'
                        placeholder='date'
                        inputProps={{ maxLength: 3 }}
                        onInput={(e) => {
                          restrict.digits(e);
                        }}
                        toUpperCase
                      // onInputChange={(event) => {
                      //   // getsetDOBHandler(event);
                      //   // setValue('month', 0);
                      //   // setValue('days', 0);
                      // }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <RHFTextField
                    label='Occupation'
                    name='occupation'
                    placeholder='Occupation'
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} spacing={3}>
                <RHFTextField label='Email' name='email' placeholder='Email' required />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  label='Contact Number'
                  name='contactNo'
                  placeholder='Contact Number'
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name='genderId' label='Gender' placeholder='Gender' required>
                  <MenuItem
                    value=''
                    sx={{
                      mx: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                    }}
                  >
                    Select Gender
                  </MenuItem>
                  {genders?.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
            </Grid>

            {/* /////right box */}
            <Grid item container xs={12} md={6} spacing={2} p={2}>
              <Grid item xs={12}>
                <RHFTextField label='Address' name='address' placeholder='Address' required />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  label='Street Address Line'
                  name='streetAddress'
                  placeholder='Street Address Line'
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFAutoComplete
                  name='countryId'
                  options={countries}
                  label='Country'
                  autoComplete={false}
                  placeholder='Country'
                  onInputChange={(d) => {
                    console.log(d.id);
                    setValue('countryId', d);
                    setValue('stateId', '');
                    setValue('cityId', '');
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  name='stateId'
                  options={states}
                  label='State'
                  placeholder='State'
                  onInputChange={(d) => {
                    setValue('cityId', '');
                    setValue('stateId', d);
                    setValue('cityId', '');
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  name='cityId'
                  label='City'
                  options={cities}
                  placeholder='City'
                  onInputChange={(d) => {
                    setValue('cityId', d);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name='pincode'
                  label='Pin Code'
                  placeholder='Pin Code'
                  onInput={(e) => {
                    restrict.number(e);
                  }}
                  onInputChange={(d) => {
                    setValue('pincode', d.target.value);
                  }}
                  inputProps={{ maxLength: 6 }}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ margin: 2 }}>
          <Grid container>
            <Grid item container spacing={2} p={2} xs={6} md={12}>
              {/* <Grid item xs={12}>
            <Typography variant='h6'>sjdfgu</Typography>
          </Grid> */}
              <Grid item xs={12} md={4}>
                <RHFAutoComplete
                  required
                  name='bloodGroupId'
                  options={bloodGroup}
                  label='Blood Group'
                  placeholder='Blood Group'
                  onInputChange={(d) => {
                    setValue('bloodGroupId', d);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <RHFTextField label={'Master Card Number'} name={'masterCardNumber'} />
              </Grid>
              <Grid item md={4} xs={12} mt={2.5}>
                <RHFToggleButton name={'template'} sx={{ border: 'unset' }} exclusive>
                  <ToggleButton
                    size='small'
                    onClick={() => setShowTemplate(!showTemplate)}
                    variant='outlined'
                    color='primary'
                    value='true'
                    sx={{
                      ...toggleButtonStyle,
                      maxWidth: 'unset',
                      wordBreak: 'keep-all',
                    }}
                  >
                    Show Template
                  </ToggleButton>
                </RHFToggleButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        {showTemplate && (
          <Card sx={{ margin: 2 }}>
            <Grid container>
              <Grid item container spacing={2} p={2} md={6} xs={12}>
                {/* -----Start template ------- */}
                <TemplateComponets
                  label={'1a. Have you ever donated Blood previously'}
                  name={'templateData.previousDonated'}
                />
                <TemplateComponets
                  label={' 1b. If yes, on how many times PGIMER (BDC/Camps Outside)'}
                  // name={'templateData.timesCamps'}
                  disableRadio
                >
                  <Grid item pb={2}>
                    <RHFTextField name={'templateData.timesCamps'} placeholder={'BDC'} />
                  </Grid>

                  <Grid item>
                    <RHFTextField name={'templateData.timesOutside'} placeholder={'Camps Outside'} />
                  </Grid>
                </TemplateComponets>
                <TemplateComponets
                  label={'1c. Date of last donation.'}
                  name={'templateData.lastDonationDate'}
                />
                <TemplateComponets
                  label={'1d. Did you have any discomfort during or after any previous donation?'}
                  name={'templateData.discomfprtAfterBefore'}
                />
                <TemplateComponets
                  label={'1e. Have you ever been advised not to donate blood?'}
                  name={'templateData.advisedNotToDonate'}
                />
                <TemplateComponets
                  label={
                    '1f. After donating blood do you have to engage in heavy work, drive heavy vehicle or work at heights today?'
                  }
                  name={'templateData.afterDonatingHeavyWork'}
                />
                <TemplateComponets
                  label={'2. Do you feel well today? '}
                  name={'templateData.feelWellToday'}
                />
                <TemplateComponets
                  label={'3. Did you eat in the last 4 hours?'}
                  name={'templateData.eatLastFourHour'}
                />
                <TemplateComponets
                  label={'4. Did you sleep well last night?'}
                  name={'templateData.sleepWellLastNight'}
                />
                <TemplateComponets
                  label={
                    '5. Have you any reason to believe that you may be infected by either Hepatitis , Malaria , HIV/AIDS and or venereal diseases?'
                  }
                  name={'test.venerealDiseases'}
                />
                <TemplateComponets
                  label={'6a. In the last 6 months have you had any history of the following : '}
                  name={'test.lastSixMonthHistory'}
                />
                <Grid item container xs={9}>
                  {sixA.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <RHFCheckbox name={'templateData.' + item.name + '_cbox'} label={item.label} />
                    </Grid>
                  ))}
                </Grid>

                <TemplateComponets
                  label={
                    '6b.  Persons who inject drugs, have multiple sexual partners or partners of same sex are more likely to be infected with virus causing AIDS. Do you practice any of the above?'
                  }
                  name={'test.virusCausingAIDS'}
                />
                <TemplateComponets
                  label={'8. Do you suffer from or have suffered from any of the following?'}
                  name={'test'}
                />
                <Grid item container xs={9}>
                  {eight.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <RHFCheckbox name={'templateData.' + item.name + '_cbox'} label={item.label} />
                    </Grid>
                  ))}
                </Grid>

                <TemplateComponets
                  label={'9. Have you ever had any of the following?'}
                  name={'test'}
                />
                <Grid item container xs={9}>
                  {nine.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <RHFCheckbox name={item.name} label={item.label} />
                    </Grid>
                  ))}
                </Grid>

                <TemplateComponets
                  label={'10. Are you taking or have taken any drug/ Medication?'}
                  name={'test'}
                />
                <Grid item container xs={9}>
                  {tenCheckBoxData.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <RHFCheckbox name={item.name} label={item.label} />
                    </Grid>
                  ))}
                </Grid>

                {/* -----end template ------- */}
              </Grid>
              <Grid item container spacing={2} p={2} md={6} xs={12}>
                <TemplateComponets
                  label={'11.During Past few months have you had any of the following'}
                  name={'test'}
                  disableRadio
                />

                <TemplateComponets
                  label={'a) Received blood or blood components (12 months)'}
                  name={'test'}
                />
                <TemplateComponets
                  label={'b) Any accidentor operation (Major 12 months) /(Minor6 months)'}
                  name={'test'}
                />
                <TemplateComponets
                  label={'c) Received any vaccination (including COVID-19)'}
                  name={'test'}
                />
                <TemplateComponets
                  label={'d) Bitten by any animal (dog or any other)'}
                  name={'test'}
                />
                <TemplateComponets
                  label={'e) Tattooing / ear piercing or acupuncture treatment (12 months)'}
                  name={'test'}
                />
                <TemplateComponets label={'f) Have been imprisoned for any reason'} name={'test'} />
                <TemplateComponets
                  label={
                    'g) Haveyouhad close contactwith anyone (family/others) suffering from Jaundice or HIV/AIDS'
                  }
                  name={'test'}
                />
                <TemplateComponets
                  label={'h) Did you had any tooth extraction (6months)'}
                  name={'test'}
                />

                <TemplateComponets label={'12. ForWomen Donors'} name={'test'} disableRadio />
                <TemplateComponets label={'a) Have you ever been/are pregnant'} name={'test'} />
                <TemplateComponets
                  label={'b) Have you had any abortion in the last6 months?'}
                  name={'test'}
                />
                <TemplateComponets
                  label={'c) Do you have a child less than one year old?'}
                  name={'test'}
                />
                <TemplateComponets label={'d) Is the child still breast-feeding?'} name={'test'} />
                <TemplateComponets label={'e) Are you having your periods today ?'} name={'test'} />
                <TemplateComponets
                  label={
                    '13. Have you read and understood all the information presented and answered all the question truthfully, as any incorrect statement or concealment may affect your health or may harm the recipient'
                  }
                  name={'test'}
                />
                <TemplateComponets label={'14. Understand that'} name={'test'} disableRadio />
                <TemplateComponets
                  label={
                    '(a) Blood donation is a totally voluntary act and no inducement or remuneration has been offered'
                  }
                  name={'test'}
                />
                <TemplateComponets
                  label={
                    '(b) Donation of blood components is a medical procedure and that by donating voluntary, | accept the risk associated with this procedure'
                  }
                  name={'test'}
                />
                <TemplateComponets
                  label={
                    '(c) Blood will be separated into blood components for any needy patient & plasma if unutilized will be given for fractionation into products like Albumin, Factor VIII (etc.)'
                  }
                  name={'test'}
                />
                <TemplateComponets
                  label={
                    '(d) My blood will be tested for Hepatitis B, Hepatitis C, Malarial parasite, HIV AIDS and venereal alseases in addition to an other screening tests required to ensure blood safety.'
                  }
                  name={'test'}
                />
                <TemplateComponets
                  label={'(e) have been explained about Post Donation Precautions.'}
                  name={'test'}
                />
                <TemplateComponets label={'15. I give consent for'} name={'test'} disableRadio />
                <TemplateComponets label={'(a) Blood Donation'} name={'test'} />
                <TemplateComponets label={'(b) Use of plasma for fractionation'} name={'test'} />
                <TemplateComponets label={'(c) To know the results of blood testing'} name={'test'} />
                <TemplateComponets
                  label={
                    '(d) Test results can be know personally from the Department with in 15 days.'
                  }
                  name={'test'}
                  disableRadio
                />
                <TemplateComponets
                  label={
                    '16. prohibit any information provided by me or about my donation to’be disclosed to any individual or government agency without my prior permission.'
                  }
                  name={'test'}
                  disableRadio
                />
              </Grid>
            </Grid>
          </Card>
        )}
        {/* <Button onClick={handleSubmit(onSubmit)}>Submit</Button> */}
        {/* <Grid container justifyContent={'center'} p={5}>
        <Button variant='contained' size='medium' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid> */}
      </FormProvider>
    </FormWrapper>
  );
}
