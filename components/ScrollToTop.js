import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fab } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { useIdleTimer } from 'react-idle-timer';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
//
import useOffSetTop from 'hooks/useOffSetTop';
import { HEADER } from 'config';
import useAuth from 'hooks/useAuth';
//
// ----------------------------------------------------------------------
const timeout = 1000 * 60 * 15; //(15 mins);
const throttle = 1000 * 10; //(10 sec)
const promptBeforeIdle = 60_000;

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const { isAuthenticated, logout } = useAuth();

  const [openSessionConfirmation, setOpenSessionConfirmation] = useState(false);
  const [remaining, setRemaining] = useState(timeout / 1000);
  const [interValTime, setInterValTime] = useState(30_000);

  const onPrompt = () => {
    setOpenSessionConfirmation(true);
    setInterValTime(1000);
  };

  const onIdle = () => {
    console.log('Idle');
    setInterValTime(30_000);
    setOpenSessionConfirmation(false);
    logout();
  };

  const { getRemainingTime, reset } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout,
    throttle,
    disabled: !isAuthenticated,
    crossTab: false,
    startOnMount: false,
    stopOnIdle: true,
    promptBeforeIdle,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function handleClick() {
    window.scrollTo(0, 0);
  }

  //Timer
  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, interValTime);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {openSessionConfirmation && (
        <Session
          onClose={() => setOpenSessionConfirmation(false)}
          remaining={remaining}
          reset={reset}
        />
      )}

      <Fab
        size='small'
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 60,
          right: 20,
          opacity: isOffset ? 1 : 0,
          transition: 'all 500ms',
          transform: isOffset ? 'scale(1)' : 'scale(0)',
          backgroundColor: 'white',
          ':hover': {
            backgroundColor: 'primary.lighter',
          },
          '&:hover > *': {
            transform: 'rotate(180deg)',
            transition: 'all 500ms',
          },
        }}
      >
        <ArrowUpward
          color='primary'
          sx={{
            transition: 'all 100ms',
            transform: 'rotate(0deg)',
            // transform: 'translateY(0)',
          }}
        />
      </Fab>
    </>
  );
}

function Session({ onClose, remaining, reset }) {
  const { logout } = useAuth();
  return (
    <Dialog open fullWidth maxWidth='sm'>
      <DialogTitle onClose={onClose}>
        <Typography variant='h6' color='error'>
          Attention
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          Your session will expire in {remaining} seconds. Please save any unsaved changes to
          prevent automatic logout.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            logout();
          }}
          color='error'
          variant='outlined'
        >
          Leave this Page (Log out)
        </Button>
        <Button
          onClick={() => {
            onClose();
            reset();
          }}
          autoFocus
          color='primary'
          variant='contained'
        >
          Stay on this Page
        </Button>
      </DialogActions>
    </Dialog>
  );
}
