import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';

// import { styled } from '@mui/material/styles';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { RHFTextarea, RHFTextField, RHFToggleButton } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useState } from 'react';
import { restrict } from 'utils/restrict';
import { useForm } from 'react-hook-form';

export default function ObstetricsForm() {
  const theme = useTheme();

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
      setShowNote((ps) => ({ ...ps, [index]: '' }));
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
        title='Obstetrics'
      />

      <Grid sx={{ padding: '10px' }}>
        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}> P/A (PER ABDOMEN)</legend>

          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Fundal Height (Weeks)
            </Grid>
            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='obstetrics' />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(0)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[0] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '8px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              P/A Presenting Part
            </Grid>
            <Grid item xs={9}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Cephalic'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Cephalic
                </ToggleButton>
                <ToggleButton
                  value='Breech'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Breech
                </ToggleButton>
                <ToggleButton
                  value='Transverse'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Transverse
                </ToggleButton>
              </RHFToggleButton>
            </Grid>

            <Grid item xs={2} textAlign='right'>
              FHS
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Present'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Present
                </ToggleButton>
                <ToggleButton
                  value='Absent'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Absent
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
              LMP
            </Grid>
            <Grid item xs={8}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
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
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '10px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}
          </Grid>
        </fieldset>
        <Grid container spacing={2} marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Amount of Liquor
          </Grid>
          <Grid item xs={8}>
            <RHFTextarea
              name='remarks'
              multiline
              sx={{ maxWidth: '800px', width: '100%' }}
              minRows={2}
              onInput={(e) => {
                restrict.decimal(e);
              }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
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
