/** @format */
// form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//@mui
import { Card, Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FormProvider,
  RHFAutoComplete,
  RHFTextField,
} from 'components/hook-form';
import {
  getCities,
  getCountries,
  getStates,
} from 'pages/api/dashboard';
import { useForm } from 'react-hook-form';
import { restrict } from 'utils/restrict';

import { CampRegistrationSave } from 'pages/api/bloodbank';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';

const defaultValues = {
  campName: null,
  orgName: null,
  email: null,
  contactNo: null,
  donorsCount: null,
  address: null,
  streetAddress: null,
  countryId: null,
  stateId: null,
  cityId: null,
  pincode: null,

};
const Schema = yup.object().shape({
  campName: yup.string().trim().required('Required'),
  orgName: yup.string().trim().required('Required'),
  email: yup.string().trim().required('Required'),
  contactNo: yup.string().trim().required('Required'),
  donorsCount: yup.string().trim().required('Required'),
  address: yup.string().trim().required('Required'),
  streetAddress: yup.string().trim().required('Required'),
  countryId: yup.object().typeError('Required').nullable().required('Required'),
  stateId: yup.object().typeError('Required').nullable().required('Required'),
  cityId: yup.object().typeError('Required').nullable().required('Required'),
  pincode: yup.string().trim().required('Required'),
});

export default function AddCampForm({ onClose }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { watch, handleSubmit, setValue } = methods;

  const mutation = useMutation({
    mutationFn: (req) => CampRegistrationSave({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCampList'] });
      toast(saveMessage);
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
      donorsCount: +data.donorsCount,
      countryId: data.countryId.id,
      stateId: data.stateId.id,
      cityId: data.cityId.id,
      pincode: +data.pincode,
      address: data.address,
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

  return (
    <FormWrapper
      onClose={onClose}
      title='Camp Registration'
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
                  label='Camp Name'
                  name='campName'
                  placeholder='Camp Name'
                  required
                />
              </Grid>
              <Grid item xs={12} >
                <RHFTextField
                  label='Organization Name'
                  name='orgName'
                  placeholder='Organization Name'
                  required
                />
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
                <RHFTextField
                  label='Donors Count'
                  name='donorsCount'
                  placeholder='Donors Count'
                  onInput={(e) => {
                    restrict.number(e);
                  }}
                  required
                />
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
        </Card>
      </FormProvider>
    </FormWrapper>
  );
}
