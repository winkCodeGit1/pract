import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';
import { RHFTextField, RHFToggleButton, RHFTextarea } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ChronicKidneyIntakeForm() {
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
        title='Chronic Kidney Disease - Intake'
      />
      <Grid sx={{ padding: '20px' }}>
        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            paddingBottom: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Diagnosis Details</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Last Visit Date
            </Grid>

            <Grid item xs={5}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
            </Grid>
            <Grid item xs={5} textAlign='right'>
              <IconButton onClick={() => handleShowNote(0)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[0] && (
              <>
                <Grid xs={2}></Grid>
                <Grid item xs={5}>
                  <RHFTextarea name='remark11' multiline minRows={2} placeholder='Notes' />
                </Grid>
                <Grid item xs={5}></Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Previous followup location
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='previous' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Diagnosis Status
            </Grid>

            <Grid item xs={6}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='patient'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Patient S/P Surgical Resection
                </ToggleButton>

                <ToggleButton
                  value='confirmed'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Confirmed Elsewhere
                </ToggleButton>
              </RHFToggleButton>
            </Grid>

            <Grid item xs={4} textAlign='right'>
              <IconButton onClick={() => handleShowNote(3)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[3] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={5}>
                  <RHFTextarea
                    name='remark1'
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  />
                </Grid>
                <Grid item xs={5}></Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Date Confirmed
            </Grid>
            <Grid item xs={5}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
            </Grid>
            <Grid item xs={5} textAlign='right'>
              <IconButton onClick={() => handleShowNote(4)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[4] && (
              <>
                <Grid xs={2}></Grid>

                <Grid item xs={5}>
                  <RHFTextarea name='remark11' multiline minRows={2} placeholder='Notes' />
                </Grid>
                <Grid item xs={5}></Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Diagnosis Location
            </Grid>
            <Grid item xs={8}>
              <RHFTextField size='small' name='diagnosis' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Last known CR
            </Grid>
            <Grid item xs={8}>
              <RHFTextField size='small' name='diagnosis' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Diagnostic Criteria
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Idiopathic'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Idiopathic
              </ToggleButton>

              <ToggleButton
                value='decrease kidney'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Decreased Kidney Function
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(5)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[5] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '2px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Known / Likely cause of CKD
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Glomerular Diseases'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Glomerular Diseases
              </ToggleButton>

              <ToggleButton
                value='Vascular'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Vascular Diseases
              </ToggleButton>

              <ToggleButton
                value=' Tubulointerstitial'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Tubulointerstitial Diseases
              </ToggleButton>
              <ToggleButton
                value='Cystic'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Cystic Disease
              </ToggleButton>
            </RHFToggleButton>
          </Grid>

          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(6)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[6] && (
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
            Other Likely cause of CKD
          </Grid>
          <Grid item xs={8}>
            <RHFTextField size='small' name='ckd' sx={{ maxWidth: '600px' }} />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>
        </Grid>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            paddingBottom: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Past Diagnostic Findings</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Polycystic Kidney
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Hyderonephrosis due to obstruction
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Cortical Scarring
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Renal Masses
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Small and echogenic kidneys
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Family History Of Renal Disease
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='yes'
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
              <IconButton onClick={() => handleShowNote(7)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[7] && (
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
        </fieldset>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            paddingBottom: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Exposures</legend>
          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Smoking History
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
              <IconButton onClick={() => handleShowNote(8)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[8] && (
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
              Packs per day
            </Grid>
            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(9)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[9] && (
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
              Number of years
            </Grid>
            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(10)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[10] && (
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
              Current Smoker
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Indrawing'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='Strider'
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
              <IconButton onClick={() => handleShowNote(11)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[11] && (
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
              Quit Smoking Since
            </Grid>
            <Grid item xs={8}>
              <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Alcohol Abuse
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='yeees'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='no'
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
              <IconButton onClick={() => handleShowNote(12)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[12] && (
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
        </fieldset>

        <Grid container spacing={2}>
          <Grid item xs={2} textAlign='right'>
            Current Home Medications
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='ace'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Ace Inhibitor
              </ToggleButton>

              <ToggleButton
                value='furosemide'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Furosemide
              </ToggleButton>

              <ToggleButton
                value='spironolactone'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Spironolactone
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(13)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[13] && (
            <>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginLeft: '8px', marginTop: '1px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            All Other Medicines
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
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
