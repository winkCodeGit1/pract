import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
  Backdrop,
  Box,
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// utils
import cssStyles from 'utils/cssStyles';
// config
import { NAVBAR } from 'config';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import ToggleButton from 'components/settings/ToggleButton';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({
    color: theme.palette.background.paper,
    opacity: 0.92,
  }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflowY: 'scroll',
  width: NAVBAR.BASE_WIDTH + 700,
  flexDirection: 'column',
  //   margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

const consultDate = ['23-04-2023', '24-04-2023', '25-04-2023'];

export default function PreviousConsultation({ open, onClose }) {
  const [selectedDate, setSelectedDate] = useState(consultDate[0]);
  const [, setDisableButton] = useState({ leftSide: false, rightSide: false });
  const theme = useTheme();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleToggle = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleRight = () => {
    const findIndex = consultDate?.findIndex((item) => item === selectedDate);
    if (findIndex === consultDate.length - 1) {
      setSelectedDate(consultDate[0]);
      setDisableButton((ps) => ({ ...ps, rightSide: true }));
    } else if (findIndex !== -1) {
      setSelectedDate(consultDate[findIndex + 1]);
      setDisableButton((ps) => ({ ...ps, rightSide: false }));
    } else {
      setSelectedDate(consultDate[0]);
      setDisableButton((ps) => ({ ...ps, rightSide: false }));
    }
  };
  const handleLeft = () => {
    const findIndex = consultDate?.findIndex((item) => item === selectedDate);
    if (findIndex === 0) {
      setSelectedDate(consultDate[consultDate?.length - 1]);
      setDisableButton((ps) => ({ ...ps, leftSide: true }));
    } else if (findIndex !== -1) {
      setSelectedDate(consultDate[findIndex - 1]);
      setDisableButton((ps) => ({ ...ps, leftSide: false }));
    } else {
      setSelectedDate(consultDate[0]);
      setDisableButton((ps) => ({ ...ps, leftSide: true }));
    }
  };

  console.log(consultDate?.length === 1);
  return (
    <>
      <Backdrop
        open={true}
        onClick={handleClose}
        sx={{
          background: 'transparent',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      {!open && <ToggleButton open={open} onToggle={handleToggle} />}

      {open && (
        <>
          <RootStyle>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ py: 2, pr: 1, pl: 2.5 }}
            >
              <Typography variant='subtitle1' color={theme.palette.grey[700]}>
                Pervious Consultation Summary
              </Typography>
              <Box>
                <Button
                  variant='contained'
                  onClick={() => handleLeft()}
                  color='warning'
                  sx={{ marginRight: '5px' }}
                  size='small'
                  disabled={consultDate?.length === 1}
                >
                  <ArrowLeft />
                </Button>
                <Select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  sx={{ width: '250px' }}
                >
                  {consultDate &&
                    consultDate.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
                <Button
                  onClick={() => handleRight()}
                  color='warning'
                  variant='contained'
                  sx={{ marginLeft: '5px' }}
                  size='small'
                  disabled={consultDate?.length === 1}
                >
                  <ArrowRight />
                </Button>
              </Box>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={3} sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <fieldset
                  style={{
                    width: '100%',
                    border: `1px solid ${theme.palette.grey[400]}`,
                    padding: '5px',
                  }}
                >
                  <legend style={{ marginLeft: '15px' }}>Observation</legend>
                </fieldset>
              </Stack>

              <Stack spacing={1.5}>
                <fieldset
                  style={{
                    width: '100%',
                    border: `1px solid ${theme.palette.grey[400]}`,
                    padding: '5px',
                  }}
                >
                  <legend style={{ marginLeft: '15px' }}>Diagnosis</legend>
                </fieldset>
              </Stack>
            </Stack>
          </RootStyle>
        </>
      )}
      <ul></ul>
    </>
  );
}

// ----------------------------------------------------------------------

BoxMask.propTypes = {
  value: PropTypes.string,
};

export function BoxMask({ value }) {
  return (
    <FormControlLabel
      label=''
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}
