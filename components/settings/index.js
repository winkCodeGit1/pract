import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Divider, Typography, Stack, FormControlLabel, Radio, Dialog } from '@mui/material';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { NAVBAR } from '../../config';
//
//
import SettingMode from './SettingMode';
import SettingFullscreen from './SettingFullscreen';
import SettingColorPresets from './SettingColorPresets';
import useSettingStore from 'stores/useSettingStore';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

export default function Settings() {
  const { toggleSettingDrawer, isSettingOpen } = useSettingStore();

  return (
    <Dialog
      open={isSettingOpen}
      maxWidth='sm'
      fullWidth
      onClose={toggleSettingDrawer}
    >
      <RootStyle>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ py: 2 }}>
          <Typography variant='subtitle1' sx={{ pl: 12 }}>
            Settings
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant='subtitle2'>Mode</Typography>
            <SettingMode />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant='subtitle2'>Presets</Typography>
            <SettingColorPresets />
          </Stack>
        </Stack>
        <Stack flex={1} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack>
            <SettingFullscreen />
          </Stack>
        </Stack>
      </RootStyle>
    </Dialog>
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
