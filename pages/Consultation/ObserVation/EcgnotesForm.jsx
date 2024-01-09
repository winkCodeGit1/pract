import { useState } from 'react';
import ExposureIcon from '@mui/icons-material/Exposure';
import {
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  ToggleButton,
  // useTheme,
} from '@mui/material';
import { RHFTextField, RHFToggleButton, RHFTextarea } from 'components/hook-form';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { toggleButtonStyle, toggleButtonGroupStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

export default function EcgNotesForm() {
  const defaultValues = {};
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '---data');
  };

  const [showNote, setShowNote] = useState({});
  const handleShowNote = (index) => {
    if (showNote[index]) {
      setShowNote(() => ({ ...ArrowForwardIosSharpIcon, [index]: '' }));
    } else {
      setShowNote((ps) => ({ ...ps, [index]: true }));
    }
  };

  return (
    <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
      <CardHeader
        disableTypography
        sx={{
          padding: '3px 13px',
          background: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: '17px',
        }}
        title='ECG Notes'
      />

      <Grid sx={{ padding: '20px' }}>
        <Grid container spacing={1} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            ECG Details
          </Grid>

          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='ecg' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            ECG Done in
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='OPD'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                OPD
              </ToggleButton>

              <ToggleButton
                value='Emergency'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Emergency
              </ToggleButton>
              <ToggleButton
                value='IPD'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                IPD
              </ToggleButton>
              <ToggleButton
                value='Other'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Other
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(0)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[0] && (
            <>
              <Grid item xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '15px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}
          <Grid item xs={2} textAlign='right'>
            ECG Done by
          </Grid>

          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='ecg' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Remarks
          </Grid>

          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='ecg' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>
        </Grid>
      </Grid>
      <Grid item display='flex' direction='row' spacing={2} justifyContent='flex-end'>
        <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid>
    </Card>
  );
}
