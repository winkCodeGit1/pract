import { Grid, IconButton, InputAdornment } from '@mui/material';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import { useState } from 'react';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';

export default function AddUserType({ onClose }) {
  const defaultValues = {
    staffName: '',
    login: '',
    institute: '',
    password: '',
    confirmpassword: '',
  };

  const Schema = yup.object().shape({
    staffName: yup.string().required('This Field is Required'),
    login: yup.string().required('Required'),
    institute: yup.string().required('Required'),
    password: yup.string().required('Password is Required'),
    confirmpassword: yup.string().required('Required'),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const { data: staff } = useQuery(['dashboard', 'staff'], {
    staleTime: Infinity,
    gcTime: Infinity,
    placeholderData: [],
  });

  return (
    <FormWrapper
      onClose={onClose}
      title='Add Users Credentials'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='staffName'
              options={staff}
              placeholder='Select Staff Name'
              label='Staff Name'
              required
            ></RHFAutoComplete>
          </Grid>

          <Grid item xs={6}>
            <RHFTextField name='login' placeholder='Login Id' label='Login ID' required />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name='institute' placeholder='Institute' label='Institute' required />
          </Grid>

          <Grid item xs={6}>
            <RHFTextField
              name='password'
              placeholder='Password'
              label='Password'
              required
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='confirmpassword'
              placeholder='Confirm Password'
              label='Confirm Password'
              required
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setConfirmPassword(!showConfirmPassword)} edge='end'>
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
