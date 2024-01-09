import { useState } from 'react';
import { Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
//
import { restrict } from 'utils/restrict';
import BookingForm from './BookingForm';
import OTPInput from 'react-otp-input';
// ----------------------------------------------------------------------

export default function OTPForm() {
  const [openAppointment, setOpenAppointment] = useState(false);
  const [isMobileNoSubmitted, setIsMobileNoSubmitted] = useState(false);
  const [OTP, setOTP] = useState('');

  if (openAppointment) {
    return <BookingForm />;
  } else {
    if (isMobileNoSubmitted) {
      return (
        <Stack spacing={4}>
          <Stack alignSelf='center'>
            <FormLabel required>OTP</FormLabel>
            <OTPInput
              value={OTP}
              onChange={(otp) => setOTP(otp)}
              numInputs={6}
              inputType='number'
              renderSeparator={<span>&nbsp; - &nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  size='small'
                  style={{ width: '2rem', padding: 4, fontSize: 18, textAlign: 'center' }}
                />
              )}
              shouldAutoFocus
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <Button
              sx={{ flexGrow: 1 }}
              variant='outlined'
              onClick={() => setIsMobileNoSubmitted(false)}
            >
              Back
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              variant='contained'
              color='secondary'
              onClick={() => setOpenAppointment(true)}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      );
    } else {
      return (
        <Stack spacing={4}>
          <Stack>
            <Typography variant='body2'>Phone Number</Typography>
            <TextField
              sx={{ '.MuiOutlinedInput-input': { fontSize: '1rem' } }}
              fullWidth
              onInput={restrict.digits}
              inputProps={{ maxLength: 10 }}
              placeholder='Enter 10 digit mobile No.'
              size='small'
              required
            />
          </Stack>

          <Button
            variant='contained'
            color='secondary'
            onClick={() => setIsMobileNoSubmitted(true)}
          >
            Submit
          </Button>
        </Stack>
      );
    }
  }
}
