import { Grid, Box, Checkbox, MenuItem, Typography, Button } from '@mui/material';
import * as yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { RHFTextField, RHFSelect, FormProvider, RHFAutoComplete } from 'components/hook-form';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllGender,
  getAllQualifications,
  getAllRelationType,
  getCities,
  getCountries,
  getStates,
} from 'pages/api/dashboard';
import { restrict } from 'utils/restrict';
import FileCapture from 'components/FileCapture';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import FormWrapper from 'components/FormWrapper';
import {
  getAllRoles,
  getAllStaffTypes,
  saveStaff,
  specializationGetAll,
  useGetAllFeatureSetForRoleId,
  userCheckAvailability,
} from 'pages/api/master';
import { toast } from 'react-toastify';
import { emailRegex, mobileRegex, pinCodeRegex } from 'utils/regex.js';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { generateDateFormat } from 'utils/date';
import { subYears } from 'date-fns';
import StaffPrivilege from './StaffPrivilege';
import RHFAutoCompleteMultiple from 'components/hook-form/RHFAutoComplete';
import { encryptFn } from 'contexts/JWTContext';
import { IS_DEVELOPMENT } from 'config';
import { LightTooltip } from 'pages/opd-ipd-registration/Forms/AppointmentForm';

const defaultValues = {
  role: null,
  staffName: '',
  staffType: '',
  dob: null,
  staffId: '',
  qualification: null,
  genderId: '',
  relationTypeId: '',
  relationshipName: '',
  phone: '',
  mobile: '',
  email1: '',
  email2: '',
  corrAddress: {
    countryId: null,
    stateId: null,
    cityId: null,
    pincode: '',
  },
  permAddress: {
    countryId: null,
    stateId: null,
    cityId: null,
    pincode: '',
  },
  addressTypeId: '',
  photoString: '',
  privilege: [],
  password: 'Admin@123',
  username: '',
  active: true,
};

const Schema = yup.object().shape({
  role: yup.object().typeError('required').required(),
  staffName: yup.string().required('This field is required'),
  relationshipName: yup.string().required('This field is required'),
  username: yup.string().min(5).required('This field is required'),
  staffType: yup.string().required('Required'),
  staffId: yup.string().required('This field is required'),
  qualification: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required('Required'),
      })
    )
    .min(1),
  specialization: yup.array().of(
    yup.object().shape({
      id: yup.string().required('Required'),
    })
  ),
  dob: yup
    .date('Invalid')
    .nullable()
    .required('This field is required')
    .typeError('Invalid Date')
    .max(new Date(), 'Future date not allowed')
    .min(subYears(new Date(), 100), 'should not be less than 100'),
  avatarUrl: yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  email1: yup.string().required('Email is required').matches(emailRegex, 'Invalid email address'),
  email2: yup.string().when((d) => {
    if (d[0].length > 0) {
      return yup.string().matches(emailRegex, 'Invalid email address');
    }
    return yup.string().nullable().notRequired();
  }),
  mobile: yup
    .string()
    .required('Phone number is required')
    .matches(mobileRegex, 'Invalid Mobile No.'),
  phone: yup.string().nullable(),
  genderId: yup.string().required('This field is required'),
  relationTypeId: yup.string().required('This field is required'),
  corrAddress: yup.object().shape({
    countryId: yup.object().typeError('Required').nullable().required('Required'),
    stateId: yup.object().typeError('Required').nullable().required('Required'),
    cityId: yup.object().typeError('Required').nullable().required('Required'),
    pincode: yup
      .string()
      .trim()
      .nullable()
      .notRequired()
      .when((d) => {
        if (d[0].length > 0) {
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
    countryId: yup.object().typeError('Required').nullable().required('Required'),
    stateId: yup.object().typeError('Required').nullable().required('Required'),
    cityId: yup.object().typeError('Required').nullable().required('Required'),
    pincode: yup.string().trim().nullable(),
  }),
});

let addressTypeIdVal = 2;
let staff = 1;

export default function AddStaffType({ onClose }) {
  const privilegesVal = useRef(null);
  const [addressChange, setValueAddress] = useState(false);
  const [openPrivilege, setOpenPrivilege] = useState(false);
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    watch,
    control,
    getValues,
    setValue,
    reset,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: (req) => saveStaff({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStaffsByOrgId'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      IS_DEVELOPMENT && toast(JSON.stringify(error));
      console.log(error);
    },
  });

  useEffect(() => {
    if (addressChange) {
      setValue('permAddress.area', getValues('corrAddress.area'));
      setValue('permAddress.street', getValues('corrAddress.street'));
      setValue('permAddress.address', getValues('corrAddress.address'));
      setValue('permAddress.cityId', getValues('corrAddress.cityId'));
      setValue('permAddress.stateId', getValues('corrAddress.stateId'));
      setValue('permAddress.countryId', getValues('corrAddress.countryId'));
      setValue('permAddress.pincode', getValues('corrAddress.pincode'));
    }
  }, [addressChange, getValues, setValue]);

  const countryId = watch('corrAddress.countryId')?.id;
  const stateId = watch('corrAddress.stateId')?.id;

  const PermanentCountryId = watch('permAddress.countryId')?.id;
  const PermanentStateId = watch('permAddress.stateId')?.id;
  const roleObjWatch = watch('role');
  //=========================APIS=========================================
  const { data: roles } = useQuery({
    queryKey: ['getAllRoles'],
    queryFn: getAllRoles,
    staleTime: Infinity,
    gcTime: Infinity,
    placeholderData: [],
  });
  const { data: allPrivileges, isPending: isLoadingPrivileges } = useQuery({
    queryKey: ['useGetAllFeatureSetForRoleId', roleObjWatch?.id],
    queryFn: useGetAllFeatureSetForRoleId,
    enabled: !!roleObjWatch,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: staffTypes } = useQuery({
    queryKey: ['dashboard', 'staffType'],
    queryFn: getAllStaffTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: qualifications } = useQuery({
    queryKey: ['getAllQualification'],
    queryFn: getAllQualifications,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: specializations } = useQuery({
    queryKey: ['specializationGetAll'],
    queryFn: specializationGetAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });

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
  const { data: permanentStates } = useQuery({
    queryKey: ['getStates', PermanentCountryId],
    queryFn: getStates,
    enabled: !!PermanentCountryId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: permanentCities } = useQuery({
    queryKey: ['getCities', PermanentStateId],
    queryFn: getCities,
    enabled: !!PermanentStateId,
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
  //============================APIS===========================================

  // console.log(errors, errors)
  const onSubmit = async (data) => {
    console.log(errors);
    let privilege = [];
    let defaultVal;
    if (!privilegesVal.current) {
      defaultVal = Object.assign(
        {},
        ...Object.values(allPrivileges)
          .flat()
          .flatMap(({ items }) =>
            items.flatMap((item) => {
              if (!item.subItems.length) {
                return item;
              } else {
                return item.subItems.map((child) => child);
              }
            })
          )
          .map((feature) => {
            return {
              [feature.featureId]: {
                view: feature.privilege[0] === '1' ? true : false,
                create: feature.privilege[1] === '1' ? true : false,
                edit: feature.privilege[2] === '1' ? true : false,
              },
            };
          })
      );
    }
    Object.entries(privilegesVal.current || defaultVal).forEach(
      ([appFeatureId, checkboxValues]) => {
        const viewVal = checkboxValues.view ? '1' : '0';
        const createVal = checkboxValues.create ? '1' : '0';
        const editVal = checkboxValues.edit ? '1' : '0';
        const privilegeString = viewVal + createVal + editVal;
        if (privilegeString !== '000') {
          privilege.push({
            appFeatureId,
            privilegeString,
          });
        }
      }
    );
    const username = encryptFn(data.username);
    const password = encryptFn(data.password);

    const req = {
      photoString: data.avatarUrl,
      userTypeId: staff,
      privilege,
      email1: data.email1,
      email2: data.email2,
      staffName: data.staffName,
      mobile: data.mobile,
      roleId: data.role.id,
      staffId: data.staffId,
      staffTypeId: data.staffType,
      phone: data.phone,
      dob: generateDateFormat(data.dob),
      genderId: data.genderId,
      relationTypeId: data.relationTypeId,
      qualificationsList: data.qualification?.map((q) => q.id),
      relationshipName: data.relationshipName,
      specializationsList: data.specialization?.map((s) => s.id),
      corrAddress: {
        countryId: data.corrAddress.countryId.id,
        stateId: data.corrAddress.stateId.id,
        cityId: data.corrAddress.cityId.id,
        pincode: data.corrAddress.pincode,
        address: data.permAddress.address,
        addressTypeId: addressTypeIdVal,
      },
      permAddress: {
        countryId: data.permAddress.countryId.id,
        stateId: data.permAddress.stateId.id,
        cityId: data.permAddress.cityId.id,
        pincode: data.permAddress.pincode,
        address: data.permAddress.address,
        addressTypeId: addressTypeIdVal,
      },
      username,
      password,
    };
    console.log(req);
    mutation.mutate(req);
  };

  return (
    <>
      {openPrivilege && (
        <StaffPrivilege
          onClose={() => setOpenPrivilege(false)}
          allPrivileges={allPrivileges}
          privilegesVal={privilegesVal}
          selectedRole={roleObjWatch}
        />
      )}

      <FormWrapper
        onClose={onClose}
        title='Add Staff Creation'
        maxWidth='lg'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        loading={mutation.isPending}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    options={roles}
                    disabled={privilegesVal.current}
                    name='role'
                    label='Roles'
                    required
                    placeholder='Select Roles'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    sx={{ marginTop: 2.3 }}
                    variant='contained'
                    disabled={!roleObjWatch || isLoadingPrivileges}
                    onClick={() => setOpenPrivilege(true)}
                  >
                    Configure privileges
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='staffName'
                    label='Staff Name'
                    required
                    inputProps={{ maxLength: 100 }}
                    onInput={(e) => {
                      restrict.name(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFSelect
                    name='staffType'
                    label='Staff Type'
                    placeholder='Select Staff Type'
                    required
                  >
                    <MenuItem value=''>Select Gender</MenuItem>
                    {staffTypes?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>

                <Grid item xs={12} md={6}>
                  <RHFDatePicker
                    name='dob'
                    label='Date of Birth'
                    format='dd-MM-yyyy'
                    required
                    disableFuture
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='staffId'
                    label='Staff ID'
                    required
                    inputProps={{ maxLength: 100 }}
                    onInput={(e) => {
                      restrict.name(e);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFAutoCompleteMultiple
                    multiple
                    options={qualifications}
                    name='qualification'
                    label='Qualification'
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFAutoCompleteMultiple
                    multiple
                    name='specialization'
                    label='Specialization'
                    options={specializations}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFSelect name='genderId' label='Gender' placeholder='Gender' required>
                    <MenuItem value=''>Select Gender</MenuItem>
                    {genders?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>

                <Grid item xs={12} md={6}>
                  <RHFSelect name='relationTypeId' label='Relationship Type' required>
                    <MenuItem value=''>Select Option</MenuItem>
                    {relationships?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='relationshipName'
                    label='Relationship Name'
                    required
                    onInput={(e) => {
                      restrict.name(e);
                    }}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='username'
                    label='User Name'
                    required
                    placeholder='Enter Unique User Name'
                    inputProps={{ maxLength: 100 }}
                    onBlur={(e) => {
                      const uname = e.target.value;
                      if (uname >= 5) {
                        userCheckAvailability({ username: uname }).catch((error) => {
                          console.log(error);
                          setError('username', {
                            message: 'username already exist',
                            type: 'duplicate',
                          });
                        });
                      }
                    }}
                    onInput={(e) => {
                      restrict.alphaNumericWithNoSpace(e);
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography variant='subtitle2'>Contact Details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='mobile'
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
                    name='phone'
                    label='Phone Number'
                    placeholder='Phone Number'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='email1'
                    label='Email 1'
                    placeholder='Enter first email id'
                    required
                    onInput={(e) => {
                      restrict.email(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name='email2'
                    label='Email 2'
                    placeholder='Enter second email id'
                    onInput={(e) => {
                      restrict.email(e);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                  <LightTooltip title={'Allowed *.jpeg, *.jpg, *.png, *.gif max size of '}>
                    <Box sx={{ mb: 1 }}>
                      <Controller
                        control={control}
                        name='avatarUrl'
                        render={({ field: { onChange, value } }) => (
                          <FileCapture value={value} onChange={onChange} />
                        )}
                      />
                    </Box>
                  </LightTooltip>
                </Grid>
              </Grid>

              <Typography variant='subtitle2' sx={{ pt: '-5px' }}>
                Correspondence Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <RHFAutoComplete
                    name='corrAddress.countryId'
                    options={countries}
                    label='Country'
                    autoComplete={false}
                    placeholder='Country'
                    onInputChange={(d) => {
                      setValue('corrAddress.stateId', '');
                      setValue('corrAddress.cityId', '');
                      if (addressChange) {
                        setValue('permAddress.countryId', d);
                        setValue('permAddress.stateId', '');
                        setValue('permAddress.cityId', '');
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='corrAddress.stateId'
                    options={states}
                    label='State'
                    placeholder='State'
                    onInputChange={(d) => {
                      setValue('corrAddress.cityId', '');
                      if (addressChange) {
                        setValue('permAddress.stateId', d);
                        setValue('permAddress.cityId', '');
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='corrAddress.cityId'
                    label='City'
                    options={cities}
                    placeholder='City'
                    onInputChange={(d) => {
                      if (addressChange) {
                        setValue('permAddress.cityId', d);
                      }
                    }}
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
                  margin: '12px 0px',
                }}
              >
                <Typography variant='subtitle2'>Permanent address</Typography>
                <Typography variant='body2'>
                  <Checkbox
                    size='small'
                    value={addressChange}
                    onChange={(e) => {
                      setValueAddress(e.target.checked);
                      addressTypeIdVal = e.target.checked ? 1 : 2;
                      if (!e.target.checked) {
                        setValue('permAddress.area', '');
                        setValue('permAddress.street', '');
                        setValue('permAddress.address', '');
                        setValue('permAddress.cityId', '');
                        setValue('permAddress.stateId', '');
                        setValue('permAddress.countryId', '');
                        setValue('permAddress.pincode', '');
                      } else {
                        clearErrors([
                          'permAddress.area',
                          'permAddress.street',
                          'permAddress.address',
                          'permAddress.cityId',
                          'permAddress.stateId',
                          'permAddress.countryId',
                          'permAddress.pincode',
                        ]);
                      }
                    }}
                  />
                  Same as Correspondence Address
                </Typography>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <RHFAutoComplete
                    name='permAddress.countryId'
                    options={countries}
                    label='Country'
                    placeholder='Country'
                    disabled={addressChange}
                    onInputChange={() => {
                      setValue('permAddress.stateId', '');
                      setValue('permAddress.cityId', '');
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='permAddress.stateId'
                    label='State'
                    options={addressChange ? states : permanentStates}
                    placeholder='State'
                    disabled={addressChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFAutoComplete
                    name='permAddress.cityId'
                    label='City'
                    options={addressChange ? cities : permanentCities}
                    placeholder='City'
                    disabled={addressChange}
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
            </Grid>
          </Grid>
        </FormProvider>
      </FormWrapper>
    </>
  );
}
