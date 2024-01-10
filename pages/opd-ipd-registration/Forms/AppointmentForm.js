import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
// utils
// import { fData } from "utils/formatNumber";

import {
  FormProvider,
  RHFAutoComplete,
  // RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'components/hook-form';
// import { RHFUploadAvatar } from "components/hook-form/RHFUpload"
import RHFDatePicker from 'components/hook-form/RHFDatePicker';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllGender,
  getAllMaritalStatus,
  getAllRelationType,
  getBloodGroup,
  getCities,
  getCountries,
  getPatientByMRNId,
  // getPatientCategory,
  getStates,
} from 'pages/api/dashboard';

// import { fData } from 'utils/formatNumber';
import { Controller, useForm } from 'react-hook-form';
import { restrict } from 'utils/restrict';
import FileCapture from 'components/FileCapture';
import {
  panRegex,
  drivingRegex,
  voterIdRegex,
  aadhaarRegex,
  emailRegex,
  mobileRegex,
  pinCodeRegex,
} from 'utils/regex';
import { viewDateFormat } from 'utils/date';
import { subYears } from 'date-fns';

import DialogBox from 'components/DialogBox';
import CreateAbha from '../create-abha';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { registrationRegister } from 'pages/api/common';
// import CameraComponent from "components/cameraAccess";
// ----------------------------------------------------------------------
// const appointmentOption = ['Yes', 'No'];

// console.log(apppp);

const educationType = [
  { label: 'Uneducated', value: 1 },
  { label: 'Primary', value: 2 },
  { label: 'Secondary', value: 3 },
  { label: 'Higher Secondary', value: 4 },
  { label: 'Undergraduate', value: 5 },
  { label: 'Postgraduate', value: 6 },
];
const idProofType = [
  { label: 'Aadhaar Card', value: 1 },
  { label: 'Pan Card', value: 2 },
  { label: 'Driving License', value: 3 },
  { label: 'Voter Id', value: 4 },
];
const rationCardType = [
  { label: 'APL', value: 1 },
  { label: 'BPL', value: 2 },
];

AppointmentForm.propTypes = {
  isSelf: PropTypes.bool,
};

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: '0px',
  },
}));
const defaultValues = {
  appointmentId: '',
  patientName: '',
  genderId: '',
  dob: '',
  age: '',
  year: '',
  month: '',
  days: '',
  relationType: '',
  nationality: '',
  maritalStatus: '',
  phone: '',
  email: '',
  corrAddress: {
    countryId: '',
    stateId: null,
    cityId: null,
    pincode: '',
    address: '',
    // area: '',
    // street: '',
  },
  permAddress: {
    countryId: null,
    stateId: null,
    cityId: null,
    pincode: '',
    address: '',
    area: '',
    // street: '',
  },
  qualificationId: '',
  occupation: '',
  addressTypeId: '',
  bloodGroupId: '',
  identityTypeId: '',
  identityProofNumber: '',
  isBPL: '',
  rationCardNo: '',
  photoString: '',
};

let addresTypeIdVal = 2;

const schema = yup.object().shape({
  patientName: yup.string().required('Patient Name is required'),
  email: yup
    .string()
    .trim()
    .notRequired()
    .when((d) => {
      if (d[0]?.length > 0) {
        return yup
          .string()
          .trim()
          .email()
          .required('Required')
          .matches(emailRegex, 'Invalid email address');
      }
    }),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(mobileRegex, 'Invalid Mobile No.'),

  corrAddress: yup.object().shape({
    countryId: yup.object().typeError('Required').nullable().required('Required'),
    stateId: yup.object().typeError('Required').nullable().required('Required'),
    cityId: yup.object().typeError('Required').nullable().required('Required'),
    address: yup.string().trim().required('Required'),
    pincode: yup
      .string()
      .trim()
      .nullable()
      .notRequired()
      .when((d) => {
        if (d[0]?.length > 0) {
          return yup
            .string()
            .trim()
            .nullable()
            .required('Required')
            .matches(pinCodeRegex, 'Invalid Pincode No.');
        } else {
          return yup.string().trim().nullable().notRequired();
        }
      }),
  }),
  permAddress: yup.object().shape({
    countryId: yup
      .object()
      .notRequired()
      .nullable()
      .when(['area'], (area, city, schema) => {
        if (schema?.parent?.pincode || schema?.parent?.address) {
          return yup.object().typeError('Required').nullable().required('Required');
        }
      }),

    stateId: yup
      .object()
      .nullable()
      .notRequired()
      .when(['countryId', 'address'], (countryId, address, schema) => {
        if (countryId[0] || schema.parent?.address || schema.parent?.pincode) {
          return yup.object().typeError('Required').nullable().required('Required');
        }
      }),
    cityId: yup
      .object()
      .nullable()
      .notRequired()
      .when(['countryId', 'address'], (countryId, address, schema) => {
        if (countryId[0] || schema.parent?.address || schema.parent?.pincode) {
          return yup.object().typeError('Required').nullable().required('Required');
        }
      }),
    address: yup
      .string()
      .trim()
      .notRequired()
      .when(['countryId'], (countryId, cityId, schema) => {
        if (countryId[0] || schema?.parent?.pincode) {
          return yup.string().required('Required');
        }
      }),
    pincode: yup
      .string()
      .trim()
      .nullable()
      .notRequired()
      .when((d) => {
        if (d[0]?.length > 0) {
          return yup
            .string()
            .trim()
            .nullable()
            .required('Required')
            .matches(pinCodeRegex, 'Invalid Pincode No.');
        } else {
          return yup.string().trim().nullable().notRequired();
        }
      }),
  }),

  maritalStatus: yup.string().required('Marital Status is required'),
  // photoString: Yup.mixed().test(
  //   "required",
  //   "Avatar is required",
  //   (value) => value !== ""
  // ),
  genderId: yup.string().required('This field is required'),
  nationality: yup.string().required('This field is required'),
  relationshipName: yup.string().when('relationType', (relationType) => {
    if (!(relationType[0] === '5')) {
      return yup.string().trim().nullable().required('Required');
    }
  }),
  relationType: yup.string().required('This field is required'),
  dob: yup
    .date('Invalid')
    .nullable()
    .required('This field is required')
    .typeError('Invalid Date')
    .max(new Date(), 'Future date not allowed')
    .min(subYears(new Date(), 100), 'should not be less than 100'),
  identityTypeId: yup.string().trim(),
  identityProofNumber: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .when('identityTypeId', (identityTypeId) => {
      if (identityTypeId[0] === '1') {
        return yup
          .string()
          .trim()
          .nullable()
          .required('Required')
          .matches(aadhaarRegex, 'Invalid Aadhaar number');
      }
      if (identityTypeId[0] === '2') {
        return yup
          .string()
          .trim()
          .nullable()
          .required('Required')
          .matches(panRegex, 'Invalid Pan No.');
      }
      if (identityTypeId[0] === '3') {
        return yup
          .string()
          .trim()
          .nullable()
          .required('Required')
          .matches(drivingRegex, 'Invalid No.');
      }
      if (identityTypeId[0] === '4') {
        return yup
          .string()
          .trim()
          .nullable()
          .required('Required')
          .matches(voterIdRegex, 'Invalid Voter Id');
      } else {
        return yup.string().trim().nullable().notRequired();
      }
    }),
  isBPL: yup.string(),
  rationCardNo: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .when('isBPL', (isBPL) => {
      if (isBPL[0]?.length > 0) {
        return yup.string().trim().required('Required');
      }
    }),
});

export default function AppointmentForm({ isSelf }) {
  const queryClient = useQueryClient();
  const [checked, setChecked] = useState(false);

  const [openAbhaCreation, setOpenAbhaCreation] = useState(false);
  const changeStep = useAbhaCreationStore((state) => state.changeStep);
  const resetState = useAbhaCreationStore((state) => state.resetState);

  const [addressChange, setValueAddress] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientCrn, setPatientCrn] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    watch,
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    // formState: { errors },
  } = methods;
  const mutation = useMutation({
    mutationFn: (req) => registrationRegister({ req, isUpdate }),
    onSuccess: ({ data }) => {
      toast.success(
        isUpdate
          ? 'Patient Detail Updated'
          : `Registered Successfully. your Patient id is. ${data.patientID}`,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );

      reset({
        ...defaultValues,
        corrAddress: {
          ...defaultValues.corrAddress,
          countryId: getValues('corrAddress.countryId'),
        },
        permAddress: {
          ...defaultValues.permAddress,
          countryId: getValues('permAddress.countryId'),
        },
      });
      setValueAddress(false);
      setIsUpdate(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Something Went Wrong');
      console.log(error);
    },
  });
  const onSubmit = async (data) => {
    const req = {
      ...data,
      age: data.year,
      genderId: +data.genderId,
      maritalStatus: +data.maritalStatus,
      relationType: +data.relationType,
      corrAddress: {
        countryId: data.corrAddress.countryId.id,
        stateId: data.corrAddress.stateId.id,
        cityId: data.corrAddress.cityId.id,
        pincode: data.corrAddress.pincode,
        address: data.corrAddress.address,
        // area: data.corrAddress.area,
        // street: data.corrAddress.street,
        addressTypeId: addresTypeIdVal,
      },
      permAddress: {
        countryId: data.permAddress.countryId?.id,
        stateId: data.permAddress.stateId?.id,
        cityId: data.permAddress.cityId?.id,
        pincode: data.permAddress.pincode,
        address: data.permAddress.address,
        // area: data.permAddress.area,
        // street: data.permAddress.street,
        addressTypeId: addresTypeIdVal,
      },
    };
    mutation.mutate(req);
  };

  const countryId = watch('corrAddress.countryId')?.id;
  const stateId = watch('corrAddress.stateId')?.id;

  const PermanentCountryId = watch('permAddress.countryId')?.id;
  const PermanentStateId = watch('permAddress.stateId')?.id;

  const { data: country, isFetched } = useQuery({
    queryKey: ['getCountries'],
    queryFn: getCountries,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: state = [] } = useQuery({
    queryKey: ['getStates', countryId],
    queryFn: getStates,
    enabled: !!countryId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: city = [] } = useQuery({
    queryKey: ['getCities', stateId],
    queryFn: getCities,
    enabled: !!stateId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: PermanentState = [] } = useQuery({
    queryKey: ['getStates', PermanentCountryId],
    queryFn: getStates,
    enabled: !!PermanentCountryId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: PermanentCity = [] } = useQuery({
    queryKey: ['getCities', PermanentStateId],
    queryFn: getCities,
    enabled: !!PermanentStateId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: gender = [] } = useQuery({
    queryKey: ['getAllGender'],
    queryFn: getAllGender,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: maritalList = [] } = useQuery({
    queryKey: ['getAllMaritalStatus'],
    queryFn: getAllMaritalStatus,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: relationShipList = [] } = useQuery({
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

  React.useEffect(() => {
    if (addressChange) {
      // setValue('permAddress.area', getValues('corrAddress.area'));
      // setValue('permAddress.street', getValues('corrAddress.street'));
      setValue(
        'permAddress.address',
        getValues('corrAddress.address') !== '' ? getValues('corrAddress.address') : null
      );
      setValue(
        'permAddress.cityId',
        getValues('corrAddress.cityId') !== '' ? getValues('corrAddress.cityId') : null
      );
      setValue(
        'permAddress.stateId',
        getValues('corrAddress.stateId') !== '' ? getValues('corrAddress.stateId') : null
      );
      setValue(
        'permAddress.countryId',
        getValues('corrAddress.countryId') !== '' ? getValues('corrAddress.countryId') : null
      );
      setValue(
        'permAddress.pincode',
        getValues('corrAddress.pincode') !== '' ? getValues('corrAddress.pincode') : null
      );
    }
  }, [addressChange]);

  const generateDateOfBirth = (year, month, day) => {
    let yearAge, monthAge, dayAge;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if (year && month && day) {
      yearAge = currentYear - year || 0;
      monthAge = currentMonth - month || 0;
      dayAge = currentDay - day || 0;

      if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
        yearAge--;
        monthAge += 12;
      }

      if (dayAge < 0) {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        monthAge--;
        dayAge = lastMonthDate - day + currentDay;
      }
    }
    setValue('year', yearAge);
    setValue('month', monthAge);
    setValue('days', dayAge);
  };

  const getsetDOBHandler = () => {
    let yearAge = getValues('year');
    let monthAge = getValues('month') || 0;
    let dayAge = getValues('days') || 0;
    if (checked) {
      if (yearAge) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        yearAge = currentYear - yearAge;
        monthAge = currentMonth - monthAge;
        dayAge = currentDay - dayAge;
        console.log(yearAge, monthAge, dayAge, 'age');
        const formattedDate = new Date(`${yearAge}-'${monthAge}-${dayAge}`);
        setValue('dob', formattedDate);
      } else {
        setValue('dob', null);
      }
    } else {
      if (yearAge) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        yearAge = currentYear - yearAge;
        monthAge = currentMonth - monthAge;
        dayAge = currentDay - dayAge;
        const formattedDate = new Date(`${yearAge}-${monthAge}-${dayAge}`);
        setValue('dob', formattedDate);
      } else {
        setValue('dob', null);
      }
    }
  };

  const handleDateOfBirthChange = (date) => {
    if (date) {
      const DateSplit = viewDateFormat(date).split('-');
      generateDateOfBirth(+DateSplit[2], +DateSplit[1], +DateSplit[0]);
    } else {
      setValue('year', '');
      setValue('month', '');
      setValue('days', '');
    }
  };

  const handleChangeYear = (date) => {
    if (date) {
      const DateSplit = viewDateFormat(date).split('-');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      let yearAge = currentYear - DateSplit[2] || 0;
      let monthAge = currentMonth - 0;
      let dayAge = currentDay - 0;

      if (monthAge < 0 || (monthAge === 0 && dayAge < 0)) {
        yearAge--;
        monthAge += 12;
      }

      if (dayAge < 0) {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        monthAge--;
        dayAge = lastMonthDate - DateSplit[0] + currentDay;
      }
      setValue('year', yearAge);
      setValue('month', 0);
      setValue('days', 0);
    } else {
      setValue('year', '');
      setValue('month', '');
      setValue('days', '');
    }
  };

  // const { data } = useQuery({ queryKey: ['dashboard', 'patientCategory', '1'], queryFn: getPatientCategory, staleTime: Infinity, gcTime: Infinity, });

  React.useEffect(() => {
    const filterCountry = country?.find((el) => el.id === 101);
    setValue('corrAddress.countryId', filterCountry);
    setValue('permAddress.countryId', filterCountry);
  }, [isFetched]);

  const handlePatientSearch = async () => {
    try {
      if (patientCrn?.trim()) {
        setPatientLoading(true);
        const data = await getPatientByMRNId(patientCrn);
        console.log(data, stateId, 'data');
        const cityData = await queryClient.fetchQuery({
          queryKey: ['getCities', data?.corrAddress?.stateId],
          queryFn: getCities,
        });
        const cityDataPermanent = await queryClient.fetchQuery({
          queryKey: ['getCities', data?.permAddress?.stateId],
          queryFn: getCities,
        });
        reset({
          ...data,
          isBPL: data.isBPL ?? '',
          photoString: data.photo ? `data:image/png;base64,${data.photo}` : '',
          corrAddress: {
            ...data.corrAddress,
            countryId: getValues('corrAddress.countryId'),
            stateId: state.find((el) => el.id === data?.corrAddress?.stateId),
            cityId: cityData.find((el) => el.id === data?.corrAddress?.cityId),
          },
          permAddress: {
            ...data.permAddress,
            countryId: getValues('permAddress.countryId'),
            stateId: state.find((el) => el.id === data?.permAddress?.stateId),
            cityId: cityDataPermanent.find((el) => el.id === data?.permAddress?.cityId),
          },
          dob: new Date(data.dob),
        });
        handleDateOfBirthChange(new Date(data.dob));
        setIsUpdate(true);
      } else {
        toast.error('Please Enter CR No.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to get Patient Data');
    }
    setPatientLoading(false);
  };
  return (
    <>
      {openAbhaCreation && (
        <DialogBox
          title='Create ABHA Number using Aadhar'
          onClose={() => setOpenAbhaCreation(false)}
          maxWidth='lg'
          fullWidth
        >
          <CreateAbha onClose={() => setOpenAbhaCreation(false)} />
        </DialogBox>
      )}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* Abha number creation */}
        <Card sx={{ p: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <TextField
                sx={{ width: 300 }}
                placeholder='Search by Patient CRN No.'
                value={patientCrn}
                onChange={(e) => {
                  setPatientCrn(e.target.value);
                }}
                size='small'
              />
              <LoadingButton
                loading={patientLoading}
                variant='contained'
                // onClick={onReset}
                onClick={handlePatientSearch}
                size='medium'
                sx={{ pt: '5px' }}
              >
                Search
              </LoadingButton>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
              <Button
                onClick={() => {
                  setOpenAbhaCreation(true);
                  changeStep(0);
                  resetState();
                }}
                variant='contained'
                size='small'
                color='success'
              >
                create ABHA Number
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={3} justifyContent={'flex-end'}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                General Information
              </Typography>
              {/* <Grid container spacing={3}> */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid item sx={{ mb: 2 }}>
                    <RHFTextField
                      name='patientName'
                      label='Patient Name'
                      placeholder='Patient Name'
                      required
                      toUpperCase
                      inputProps={{ maxLength: 100 }}
                      onInput={(e) => {
                        restrict.name(e);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} justifyContent='center' textAlign='center'>
                  <Grid item xs={12} align='center'>
                    <LightTooltip title={'Allowed *.jpeg, *.jpg, *.png, *.gif max size of '}>
                      <Box sx={{ mb: 1 }}>
                        <Controller
                          control={control}
                          name='photoString'
                          render={({ field: { onChange, value } }) => (
                            <FileCapture value={value} onChange={onChange} />
                          )}
                        />
                      </Box>
                    </LightTooltip>
                  </Grid>
                </Grid>
              </Grid>
              {/* </Grid> */}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {checked ? (
                    <RHFDatePicker
                      name='dob'
                      label='Date of Birth'
                      views={['year']}
                      required
                      disableFuture
                      onInputChange={(event) => {
                        handleChangeYear(event);
                      }}
                      sx={{ width: '100%' }}
                    />
                  ) : (
                    <RHFDatePicker
                      name='dob'
                      label='Date of Birth'
                      format='dd-MM-yyyy'
                      required
                      disableFuture
                      onInputChange={(date) => {
                        handleDateOfBirthChange(date);
                      }}
                      sx={{ width: '100%' }}
                    />
                  )}

                  <Typography variant='caption' style={{ marginTop: '8px', marginBottom: '4px' }}>
                    <Checkbox
                      size='small'
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                        setValue('dob', null);
                        setValue('year', '');
                        setValue('month', '');
                        setValue('days', '');
                      }}
                    />
                    Only year of birth
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle2' fontWeight={400}>
                    Age
                  </Typography>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <RHFTextField
                      name='year'
                      placeholder='Year'
                      inputProps={{ maxLength: 3 }}
                      onInput={(e) => {
                        restrict.digits(e);
                      }}
                      toUpperCase
                      onInputChange={(event) => {
                        getsetDOBHandler(event);
                        setValue('month', 0);
                        setValue('days', 0);
                      }}
                    />
                    <RHFTextField
                      name='month'
                      placeholder='Month'
                      type='number'
                      disabled
                      inputProps={{ maxLength: 2, min: 1, max: 12 }}
                      onInput={restrict.digits}
                      onInputChange={(event) => {
                        getsetDOBHandler(event);
                      }}
                    />
                    <RHFTextField
                      name='days'
                      placeholder='days'
                      type='number'
                      disabled
                      inputProps={{ maxLength: 2, min: 1, max: 31 }}
                      onInput={(e) => {
                        restrict.digits(e);
                      }}
                      onInputChange={(event) => {
                        getsetDOBHandler(event);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFSelect name='genderId' label='Gender' placeholder='Gender' required>
                    <MenuItem value=''>Select Gender</MenuItem>
                    {gender.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFSelect name='maritalStatus' label='Marital Status' required>
                    <MenuItem value=''>None</MenuItem>
                    {maritalList.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12}>
                  <RHFSelect
                    name='nationality'
                    label='Nationality'
                    required
                    placeholder='Nationality'
                    disabled={isUpdate}
                  >
                    <MenuItem value=''>Select Option</MenuItem>
                    {[
                      { label: 'Indian', value: 'Indian' },
                      { label: 'Others', value: 'Others' },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>

                <Grid item xs={12} md={6}>
                  <RHFSelect name='relationType' label='Relationship Type' required>
                    <MenuItem value=''>Select Option</MenuItem>
                    {relationShipList.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='relationshipName'
                    label='Name'
                    size='small'
                    toUpperCase
                    // required
                    inputProps={{ maxLength: 100 }}
                    onInput={(e) => {
                      restrict.name(e);
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ pt: 0 }}>
                  <Typography variant='subtitle1'>Contact Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='phone'
                    label='Mobile No.'
                    placeholder='10 digit mobile No'
                    required
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='email'
                    label='Email Id'
                    placeholder='email Id'
                    onInput={(e) => {
                      restrict.email(e);
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant='subtitle1' style={{ marginBottom: 14 }}>
                Correspondence Address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RHFAutoComplete
                    name='corrAddress.countryId'
                    options={country || []}
                    label='Country'
                    placeholder='Country'
                    required
                    // defaultValue={{ label: 'India' }}
                    onInputChange={(d) => {
                      setValue('corrAddress.stateId', '');
                      setValue('corrAddress.cityId', '');
                      if (addressChange) {
                        setValue('permAddress.countryId', d);
                        setValue('permAddress.stateId', null);
                        setValue('permAddress.cityId', null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='corrAddress.stateId'
                    options={state}
                    required
                    label='State'
                    placeholder='State'
                    onInputChange={(d) => {
                      setValue('corrAddress.cityId', '');
                      if (addressChange) {
                        setValue('permAddress.stateId', d);
                        setValue('permAddress.cityId', null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='corrAddress.cityId'
                    label='City'
                    options={city}
                    required
                    placeholder='City'
                    onInputChange={(d) => {
                      if (addressChange) {
                        setValue('permAddress.cityId', d);
                      }
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='corrAddress.area'
                    label='Area'
                    placeholder='Area'
                    toUpperCase
                    required
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='corrAddress.street'
                    label='Street'
                    placeholder='Street'
                    toUpperCase
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='corrAddress.address'
                    label='Address'
                    placeholder='Enter full address'
                    toUpperCase
                    required
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    onInputChange={(d) => {
                      if (addressChange) {
                        setValue('permAddress.address', d.target.value);
                      }
                    }}
                    multiline
                    maxRows={3}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='corrAddress.pincode'
                    label='Pin Code'
                    placeholder='Pin Code'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    onInputChange={(d) => {
                      if (addressChange) {
                        setValue('permAddress.pincode', d.target.value);
                      }
                    }}
                    inputProps={{ maxLength: 6 }}
                  />
                </Grid>
              </Grid>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px 0px',
                }}
              >
                <Typography variant='subtitle1' style={{ marginTop: '8px', marginBottom: '4px' }}>
                  Permanent address
                </Typography>
                <Typography variant='subtitle1' style={{ marginTop: '8px', marginBottom: '4px' }}>
                  <Checkbox
                    size='small'
                    value={addressChange}
                    onChange={(e) => {
                      setValueAddress(e.target.checked);
                      addresTypeIdVal = e.target.checked ? 1 : 2;
                      if (!e.target.checked) {
                        // setValue('permAddress.area', '');
                        // setValue('permAddress.street', '');
                        setValue('permAddress.address', '');
                        setValue('permAddress.cityId', null);
                        setValue('permAddress.stateId', null);
                        setValue('permAddress.countryId', null);
                        setValue('permAddress.pincode', '');
                      }
                    }}
                  />
                  same as correspondence address
                </Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RHFAutoComplete
                    name='permAddress.countryId'
                    options={country}
                    // required
                    label='Country'
                    placeholder='Country'
                    disabled={addressChange}
                    onInputChange={() => {
                      setValue('permAddress.stateId', null);
                      setValue('permAddress.cityId', null);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='permAddress.stateId'
                    // required
                    label='State'
                    options={addressChange ? state : PermanentState}
                    placeholder='State'
                    disabled={addressChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='permAddress.cityId'
                    label='City'
                    // required
                    options={addressChange ? city : PermanentCity}
                    placeholder='City'
                    disabled={addressChange}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='permAddress.area'
                    label='Area'
                    placeholder='Area'
                    disabled={addressChange}
                    toUpperCase
                    required
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='permAddress.street'
                    label='Street'
                    placeholder='Street'
                    disabled={addressChange}
                    toUpperCase
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='permAddress.address'
                    label='Address'
                    placeholder='Enter full address'
                    toUpperCase
                    // required
                    disabled={addressChange}
                    onInput={(e) => {
                      restrict.address(e);
                    }}
                    multiline
                    maxRows={3}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='permAddress.pincode'
                    label='Pin Code'
                    placeholder='Pin Code'
                    disabled={addressChange}
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 6 }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {isSelf && (
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant='subtitle1' style={{ marginBottom: 8 }}>
                  Additional details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='qualificationId' label='Qualification'>
                      <MenuItem value=''>Select Option</MenuItem>
                      {educationType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='identityTypeId' label='Id Type'>
                      <MenuItem value=''>Choose Id Type</MenuItem>

                      {idProofType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField
                      name='identityProofNumber'
                      placeholder='Id Proof number'
                      label='Id No.'
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField
                      name='occupation'
                      placeholder='Occupation'
                      label='Occupation'
                      toUpperCase
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='isBPL' label='Ration Card Type'>
                      <MenuItem value=''>Select Option</MenuItem>
                      {rationCardType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField name='rationCardNo' placeholder='Card No' label='Card No.' />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='bloodGroupId' label='Blood Group'>
                      <MenuItem value=''>Select Blood Group</MenuItem>
                      {bloodGroup.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='patientCategoryId' label='Patient Category'>
                      <option value=''>Patient Category</option>
                      {[].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name='opdType' label='Government Scehemes' required>
                      <option value=''>Government Schemes</option>
                      {[].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
          <div style={{ margin: '10px' }}>
            <LoadingButton type='submit' variant='contained' loading={mutation.isPending}>
              {isUpdate ? 'Update Profile' : 'Register'}
            </LoadingButton>
            <Button
              variant='contained'
              color='inherit'
              sx={{ ml: 2 }}
              onClick={() => {
                setIsUpdate(false);
                reset(defaultValues);
              }}
            >
              Reset
            </Button>
          </div>

          {/* <Grid item >
            <Card
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <RHFSelect name="opdType" label="OP type" required >
                  <option value="">Select Department</option>
                  {[].map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>
              </div>
              <Button color="primary" variant="contained" size="large" style={{ marginTop: 20 }}>
                Get OP ID
              </Button>
            </Card>
          </Grid> */}
        </Grid>
      </FormProvider>
    </>
  );
}
