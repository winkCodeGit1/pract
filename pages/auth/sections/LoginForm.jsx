import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useAuth from 'hooks/useAuth';
import { Lock, Person } from '@mui/icons-material';
import EyeCloseIcon from 'assets/eye_close';
import EyeOpenIcon from 'assets/eye_open';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: 'scriadmin',
    password: 'Admin@123',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    try {
      const user = await login(formData);
      if (user) {
        //======== get first route element ===========
        console.log(user);
        const firstRoute = user.menuOption[0].items[0]?.children
          ? user.menuOption[0].items[0]?.children[0]?.path
          : user.menuOption[0].items[0].path;
        navigate(firstRoute);
      } else {
        setError('afterSubmit', { message: 'Authentication failed!' });
      }
    } catch (error) {
      reset();
      setError('afterSubmit', { ...error, message: error.message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          p: 4,
          minWidth: { xs: 380, sm: 550, md: 350 },
          borderRadius: '28px',
          background: (theme) => (theme.palette.mode === 'light' ? '#eff8ffd1' : '#2d495fd1'),
          backdropFilter: 'blur(3px)',
        }}
        elevation={2}
      >
        <Typography align='center' variant='h4' gutterBottom>
          Sign in to HMIS
        </Typography>
        <Stack spacing={1}>
          {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

          <RHFTextField
            name='username'
            label='Username'
            placeholder='Enter Username'
            size='medium'
            login
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? '#f6f3f3' : '#2d495fd1',
                borderRadius: '4px',
                pl: '2px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Box
                    sx={{
                      backgroundColor: 'secondary.lighter',
                      width: '50px',
                      height: '52px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 1,
                    }}
                  >
                    <Person color='success' />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <RHFTextField
            name='password'
            size='medium'
            label='Password'
            placeholder='********'
            login
            type={showPassword ? 'text' : 'password'}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? '#f6f3f3' : '#2d495fd1',
                borderRadius: '4px',
                pl: '2px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Box
                    sx={{
                      backgroundColor: 'warning.lighter',
                      width: '50px',
                      height: '52px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 1,
                    }}
                  >
                    <Lock color='warning' />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ my: 2 }}>
          {/* <RHFCheckbox name="remember" label="Remember me" /> */}
          <Link
            component={RouterLink}
            color='primary.main'
            variant='subtitle2'
            to={'/reset-password'}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          sx={{ marginTop: 4 }}
        >
          Login
        </LoadingButton>
      </Paper>
    </FormProvider>
  );
}
