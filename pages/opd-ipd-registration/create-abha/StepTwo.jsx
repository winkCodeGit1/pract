import { useEffect, useState } from 'react';
import {
  Alert,
  Dialog,
  DialogContent,
  InputLabel,
  OutlinedInput,
  Stack,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { CheckCircle, Error, Info } from '@mui/icons-material';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import { useMutation } from '@tanstack/react-query';
import { restrict } from 'utils/restrict';
import { failedSaveMessage } from 'utils/constants';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { enrollmentEnrolByAadhaar } from 'pages/api/abha-creation';
import Footer from './Footer';

export default function StepTwoAadharAuthentication({ onClose }) {
  const {
    handleIsValidStep,
    changeStep,
    isSameMobileNo,
    isAbhaExist,
    apiMessage,
    txnId,
    setIsAbhaExist,
    setIsSameMobileNo,
    handleNextStep,
    setXToken,
  } = useAbhaCreationStore();
  const [otp, setOtp] = useState('');
  const [sec, setSec] = useState(30);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  function handleResendOTP() {
    // TODO for resed the request for OTP.
    setSec(30);
  }

  function handleContunueBtnClick() {
    setIsSameMobileNo(false);
    changeStep(3);
  }

  function handlePreviewBtnClick() {
    setIsAbhaExist(false);
    changeStep(4);
  }

  const mutation = useMutation({
    mutationFn: enrollmentEnrolByAadhaar,
    onSuccess: ({ data }) => {
      toast.success('success');
      // !if "isNew" field is false;
      if (!data.abhaprofile?.isNew) {
        setIsAbhaExist(true);
        return;
      }

      // !if "mobile" no. is pressent in the response
      if (data.abhaprofile?.mobile) {
        setIsSameMobileNo(true);
        return;
      }

      setXToken(data.tokens?.idToken);

      //TODO store the token ID
      handleNextStep();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  function handleNext() {
    const req = {
      txnId,
      otp,
      mobile: mobileNumber,
    };

    mutation.mutate(req);
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
      <Box minHeight={300}>
        <Dialog maxWidth='xs' fullWidth open={isSameMobileNo || isAbhaExist}>
          {isSameMobileNo ? (
            <DialogContent>
              <Box textAlign='center'>
                <CheckCircle color='success' sx={{ '&.MuiSvgIcon-root': { fontSize: '3.5rem' } }} />
              </Box>

              <Typography variant='subtitle1' align='center' sx={{ p: 3 }}>
                Mobile Number for communication is the same as Aadhar Number. No additional
                information required.
              </Typography>
              <Button variant='contained' sx={{ px: 2 }} fullWidth onClick={handleContunueBtnClick}>
                Continue
              </Button>
            </DialogContent>
          ) : (
            <DialogContent>
              <Box textAlign='center'>
                <Error color='error' sx={{ '&.MuiSvgIcon-root': { fontSize: '3.5rem' } }} />
              </Box>

              <Typography variant='subtitle1' align='center' sx={{ p: 3 }}>
                We have found an ABHA -xx-xxxxx-xxxx-0032 against the aadhar number provided by you.
              </Typography>
              <Button variant='contained' sx={{ px: 2 }} fullWidth onClick={handlePreviewBtnClick}>
                View Profile
              </Button>
            </DialogContent>
          )}
        </Dialog>
        {/* =============================main========================= */}
        <Typography variant='h6' gutterBottom>
          Confirm OTP
        </Typography>
        <Typography variant='subtitle1' sx={{ paddingBottom: '4px' }}>
          <Alert severity='success'>{apiMessage ?? 'Error'}</Alert>
        </Typography>

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
            <Button disabled={!!sec} onClick={handleResendOTP} fullWidth={false}>
              Reset OTP
            </Button>
          </Stack>
          <Stack>
            <Typography variant='subtitle2' component='span'>
              {sec} Sec remaing
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <InputLabel required> Mobile Number </InputLabel>
          <OutlinedInput
            onInput={restrict.digits}
            inputProps={{
              maxLength: 10,
            }}
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

          <Typography component='div' variant='caption' color='primary'>
            <Info fontSize='14px' /> This mobile will be used for all the communication related to
            ABHA
          </Typography>
        </Box>
      </Box>
      <Footer onClose={onClose} handleNextCb={handleNext} isLoading={mutation.isPending} />
    </>
  );
}
