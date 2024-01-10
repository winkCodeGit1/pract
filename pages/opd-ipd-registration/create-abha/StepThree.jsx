import { useEffect, useState } from 'react';
import { InputLabel, OutlinedInput, Stack, Box, Button, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import { useMutation } from '@tanstack/react-query';
import { restrict } from 'utils/restrict';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { enrollmentAuthMobileByAbdm, enrollmentRequestMobileOtp } from 'pages/api/abha-creation';
import Footer from './Footer';

export default function StepThreeCommunicationDetails({ onClose }) {
  const { handleIsValidStep, handleNextStep, txnId, setApiMessage } = useAbhaCreationStore();
  const [otp, setOtp] = useState('');
  const [sec, setSec] = useState(30);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpSent, setIsOTPSent] = useState(false);

  const mutationVerify = useMutation({
    mutationFn: enrollmentRequestMobileOtp,
    onSuccess: () => {
      setIsOTPSent(true);
    },
    onError: (error) => {
      toast.error('Failed to send OTP, please try again!');
      console.log(error);
    },
  });

  const mutation = useMutation({
    mutationFn: enrollmentAuthMobileByAbdm,
    onSuccess: ({ data }) => {
      handleNextStep();
      setApiMessage(data.message);
    },
    onError: (error) => {
      toast.error('Failed to send OTP, please try again!');
      console.log(error);
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  function handleResendOTP() {
    setSec(30);
    // TODO:
  }

  function handleNext() {
    const req = {
      txnId,
      otp,
      mobile: mobileNumber,
    };

    mutation.mutate(req);
  }

  function handleEditAndVerify() {
    if (isOtpSent) {
      console.log('editing');
      setIsOTPSent(false);
      setOtp('');
      setSec(30);
      setMobileNumber('');
    } else {
      console.log('verifying');
      const req = {
        txnId,
        mobile: mobileNumber,
      };
      mutationVerify.mutate(req);
    }
  }

  useEffect(() => {
    if (mobileNumber.length === 10 && otp.length === 6) {
      handleIsValidStep(true);
    } else {
      handleIsValidStep(false);
    }
  }, [mobileNumber, otp]);

  return (
    <>
      <Box height={300}>
        <Box my={4}>
          <InputLabel required> Mobile Number </InputLabel>
          <OutlinedInput
            onInput={restrict.digits}
            inputProps={{
              maxLength: 10,
            }}
            disabled={isOtpSent}
            placeholder='Enter Mobile Number'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            sx={{ p: 0, '& .MuiOutlinedInput-input': { fontSize: '1rem', padding: 0 } }}
            startAdornment={
              <Stack
                sx={{
                  backgroundColor: 'lightgrey',
                  px: 2,
                  mr: 2,
                }}
              >
                <Typography variant='subtitle1' height='40px' marginTop='12px'>
                  +91
                </Typography>
              </Stack>
            }
          />
          <LoadingButton
            loading={mutationVerify.isPending}
            variant='outlined'
            sx={{ ml: 2 }}
            size='large'
            onClick={handleEditAndVerify}
          >
            {isOtpSent ? 'Edit' : 'Verify'}
          </LoadingButton>

          <Typography component='div' variant='caption' color='primary'>
            <Info fontSize='14px' /> This Mobile number you have provide will be used for all the
            communication realated to ABHA.
          </Typography>
        </Box>

        {isOtpSent && (
          <>
            <OTPInput
              value={otp}
              onChange={(otp) => setOtp(otp)}
              numInputs={6}
              inputType='number'
              renderSeparator={
                <span>
                  &nbsp; <b>-</b> &nbsp;
                </span>
              }
              renderInput={(props) => (
                <OutlinedInput
                  inputProps={{ ...props }}
                  size='small'
                  style={{ width: '3rem', padding: 4, fontSize: 18, textAlign: 'center' }}
                />
              )}
              shouldAutoFocus
            />
            <Stack display='flex' direction='row' alignItems='center'>
              <Stack>
                <Typography variant='subtitle2'>Didn&rsquo;t Recieve OTP?</Typography>
              </Stack>
              <Stack px={3}>
                <Button disabled={sec} onClick={handleResendOTP} fullWidth={false}>
                  Reset OTP
                </Button>
              </Stack>
              <Stack>
                <Typography variant='subtitle2' component='span'>
                  {sec} Sec remaing
                </Typography>
              </Stack>
            </Stack>
          </>
        )}
      </Box>
      <Footer onClose={onClose} handleNextCb={handleNext} isLoading={mutation.isPending} />
    </>
  );
}
