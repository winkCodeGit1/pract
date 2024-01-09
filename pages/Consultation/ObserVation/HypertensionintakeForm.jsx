import ExposureIcon from '@mui/icons-material/Exposure';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  useTheme,
} from '@mui/material';
import { RHFTextarea, RHFTextField, RHFToggleButton } from 'components/hook-form';
import { useState } from 'react';
// import { useFormContext } from 'react-hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

export default function HypertensionIntakeForm() {
  // const { control, setValue, watch } = useFormContext();
  // const [showTextareaIndex, setShowTextareaIndex] = useState(-1);
  // const [selectedDate, handleDateChange] = useState(new Date());
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
        title='Hypertension – Intake'
      />
      <CardContent sx={{ padding: 2 }}>
        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            paddingBottom: '12px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Diagnosis Details</legend>

          <Grid container spacing={2} alignItems={'center'}>
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
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <RHFTextarea name='remark223' multiline minRows={2} placeholder='Notes' />
                </Grid>
                <Grid item xs={5}></Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Previous Followup Location
            </Grid>

            <Grid item xs={5} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>
            <Grid item xs={5} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Diagnosis Status
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Previous'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  No Previous Diagnosis
                </ToggleButton>

                <ToggleButton
                  value='Confirmed'
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
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(1)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[1] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <RHFTextarea name='remark1' />
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
              <IconButton onClick={() => handleShowNote(2)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[2] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <RHFTextarea name='remark11' multiline minRows={2} placeholder='Notes' />
                </Grid>
                <Grid item xs={5}></Grid>
              </>
            )}
          </Grid>
        </fieldset>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            padding: '12px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Hypertensive Emergency</legend>

          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Hypertensive Emergency or Cardiac Hospitalization in 12 Months
            </Grid>
            <Grid item xs={6}>
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

            <Grid item xs={4} textAlign='right'>
              <IconButton onClick={() => handleShowNote(3)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[3] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '1px', marginLeft: '10px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
                {/* <Grid item xs={2}></Grid> */}
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Hypertensive Emergency or Cardiac Hospitalization For
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Hyper'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Hypertension
                </ToggleButton>

                <ToggleButton
                  value='Congestive'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Congestive Heart Failure
                </ToggleButton>

                <ToggleButton
                  value='Myocardic'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Myocardiac infarction
                </ToggleButton>

                <ToggleButton
                  value='Chest'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Chest Pain
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
                <Grid item xs={2}></Grid>
                <Grid xs={10}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '15px', marginLeft: '8px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
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
            paddingBottom: '12px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Past Diagnostics</legend>

          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              EKG
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>

            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Echocardiogram
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>

            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Lipids
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>

            <Grid item xs={2} textAlign='right'></Grid>
          </Grid>
        </fieldset>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            paddingBottom: '12px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Etiology</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Primary / Essential Hypertension
            </Grid>

            <Grid item xs={4}>
              <RHFTextField size='small' name='follow' sx={{ maxWidth: '600px' }} />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(5)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[5] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <RHFTextarea name='remark34545' multiline minRows={2} placeholder='Notes' />
                </Grid>
                <Grid item xs={2}></Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Secondary Hypertension
            </Grid>
            <Grid item xs={8} textAlign='left'>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Primary reneal'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Primary Renal Disease
                </ToggleButton>

                <ToggleButton
                  value='Obstructive sleep'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Obstructive Sleep Apnea
                </ToggleButton>

                <ToggleButton
                  value='Ocp'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  OCP
                </ToggleButton>

                <ToggleButton
                  value='Drug'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Drug Induced
                </ToggleButton>

                <ToggleButton
                  value='Pain'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Pain Due To Other Illness
                </ToggleButton>
                <ToggleButton
                  value='Endocrine'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Endocrine Hypothyroidism
                </ToggleButton>

                <ToggleButton
                  value='Hyperthyroidism'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Hyperthyroidism
                </ToggleButton>

                <ToggleButton
                  value='Hyperparathyroidism'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Hyperparathyroidism
                </ToggleButton>

                <ToggleButton
                  value='Coarctation'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Coarctation Of Aorta
                </ToggleButton>

                <ToggleButton
                  value='Renovascular'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Renovascular Disease
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
                <Grid xs={2} textAlign='right'></Grid>
                <Grid xs={9}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginLeft: '15px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
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
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Exposures</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid
              item
              xs={2}
              textAlign='right'
              // style={{
              //   // margin: "20px",
              //   paddingLeft: "20px",
              //   alignItems: "left",
              // }}
            >
              Smoking History
            </Grid>

            <Grid item xs={8} textAlign='left'>
              <RHFToggleButton name='status' sx={{ ...toggleButtonGroupStyle }} exclusive>
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
                  value='Noo'
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
                <Grid item xs={2} textAlign='right'></Grid>
                <Grid xs={9}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '18px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Smokes Packs Per Day
            </Grid>

            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='smokes' />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(8)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[8] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid xs={10}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginLeft: '15px', marginTop: '5px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Number of years since smoking
            </Grid>

            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='smokes' />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(9)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[9] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid xs={10}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '15px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                  />
                </Grid>
              </>
            )}

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
                  value='yesss'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='Nooo'
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
              <IconButton onClick={() => handleShowNote(10)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[10] && (
              <>
                <Grid xs={2}></Grid>

                <Grid xs={9}>
                  <TextField
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '15px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Alcohol Abuse Details
            </Grid>
            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='follow' sx={{ maxWidth: '600px' }} />
            </Grid>

            <Grid item xs={6} textAlign='right'></Grid>
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='25px'>
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
                value='HCTZ'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                HCTZ
              </ToggleButton>

              <ToggleButton
                value='Ace'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Ace Inhibitor
              </ToggleButton>

              <ToggleButton
                value='Beta'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Beta Blocker
              </ToggleButton>

              <ToggleButton
                value='Calcium'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Calcium CH Blocker
              </ToggleButton>

              <ToggleButton
                value='Nitroglycerin'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Nitroglycerin
              </ToggleButton>
              <ToggleButton
                value='Digoxin'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Digoxin
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
                <TextField
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '22px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
      <Grid item display='flex' direction='row' spacing={2} justifyContent='flex-end'>
        <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid>
    </Card>
  );
}
