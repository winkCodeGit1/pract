/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DialogBox from 'components/DialogBox';

const OTPForm = lazy(() => import('../Booking/OTPForm'));
const buttonStyle = {
  width: { xs: 180, md: 220, lg: 250 },
  height: { xs: 35, md: 45 },
  fontSize: { xs: 12, md: 14 },
};

const HomePageButtons = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        alignItems='center'
        flexDirection='row'
        gap={2}
        pt={{ xs: 1, md: 2 }}
        pr={{ xs: 1, md: 2 }}
      >
        <Button
          variant='contained'
          color='primary'
          sx={buttonStyle}
          LinkComponent={Link}
          to='/selfRegistration'
        >
          Register to get Health Id
        </Button>

        <Button variant='contained' color='primary' sx={buttonStyle} onClick={() => setOpen(true)}>
          Book Appointment
        </Button>
      </Stack>

      <DialogBox
        fullWidth
        maxWidth='xs'
        open={open}
        onClose={() => setOpen(false)}
        title='Book Appointment'
      >
        <Suspense fallback={<h4>Loading...</h4>}>
          <OTPForm />
        </Suspense>
      </DialogBox>
    </>
  );
};

export default HomePageButtons;
