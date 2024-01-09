import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton } from '@mui/material';
import { RHFTextarea, RHFTextField, RHFToggleButton } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ChronicKidneyProgressForm() {
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
        title='Chronic Kidney Disease – Progress'
      />

      <Grid sx={{ padding: '20px' }}>
        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Staging KDIGO Kidney Disease Improving Global Outcom
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='G1'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G1
              </ToggleButton>

              <ToggleButton
                value='G2'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G2
              </ToggleButton>
              <ToggleButton
                value='G3'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G3a
              </ToggleButton>
              <ToggleButton
                value='G4'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G3b
              </ToggleButton>
              <ToggleButton
                value='G5'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G4
              </ToggleButton>
              <ToggleButton
                value='G6'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                G5
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
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Comorbidities
          </Grid>

          <Grid item xs={8}>
            <RHFToggleButton
              name='HIV'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Normal'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                HIV
              </ToggleButton>

              <ToggleButton
                value='Diabetes'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Diabetes
              </ToggleButton>

              <ToggleButton
                value='MHypertension'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Hypertension
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(1)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[1] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Does patient have evidence of volume overload today (Edema, Crackles, Dyspnea)
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Yes'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Yes
              </ToggleButton>

              <ToggleButton
                value='No'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                No
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(2)}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          {showNote[2] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            When was last i-stat checked
          </Grid>

          <Grid item xs={4}>
            <RHFDatePicker format='dd-MM-yyyy' name='date' />
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <IconButton onClick={() => handleShowNote(3)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[3] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '15px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Any abnormalities (what is the trend of Cr and K)
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
          </Grid>

          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Is patient on Enalapril
          </Grid>

          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='YES'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Yes
              </ToggleButton>

              <ToggleButton
                value='NO'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                No
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(4)}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          {showNote[4] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}
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
