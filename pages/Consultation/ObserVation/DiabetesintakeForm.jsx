import { useState } from 'react';
import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';
import { RHFTextField, RHFToggleButton, RHFTextarea } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

export default function DiabetesIntakeForm() {
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

  const [showNote, setShowNote] = useState([]);
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
        title='Diabetes – Intake'
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
          <legend style={{ marginLeft: '15px' }}>Diagnosis details</legend>
          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Date of last Visit
            </Grid>

            <Grid item xs={4}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
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
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '10px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Previous Followup Location
            </Grid>

            <Grid item xs={8} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Diagnosis Confirmed
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
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '18px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}
            <Grid item xs={2} textAlign='right'>
              Diabetes type
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Type1'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Type 1 DM
                </ToggleButton>

                <ToggleButton
                  value='Type2'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Type 2 DM
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
              Last known A1C Date
            </Grid>

            <Grid item xs={8}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
            </Grid>

            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(3)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[3] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '5px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Last known A1C Result
            </Grid>
            <Grid item xs={8} textAlign='center'>
              <RHFTextField size='small' name='A1c' />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Last known Fasting Blood Sugar
            </Grid>

            <Grid item xs={4}>
              <RHFDatePicker format='dd-MM-yyyy' name='date' />
            </Grid>

            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(4)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[4] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '8px' }}
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
          <legend style={{ marginLeft: '15px' }}>Diagnostic clues</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              If new patient / suspicion
            </Grid>

            <Grid item xs={8} textAlign='left'>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Polyuria
                  '
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Polyuria
                </ToggleButton>

                <ToggleButton
                  value='Blurred'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Blurred Vision
                </ToggleButton>

                <ToggleButton
                  value='Polydypsia'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Polydypsia
                </ToggleButton>

                <ToggleButton
                  value='Nocturia'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Nocturia
                </ToggleButton>

                <ToggleButton
                  value='Weight loss'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Weight loss
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
                <Grid xs={2} textAlign='right'></Grid>
                <Grid xs={9}>
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
              Cormorbidities
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Hypertension'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Hypertension
                </ToggleButton>

                <ToggleButton
                  value='Hyperlipidemia'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Hyperlipidemia
                </ToggleButton>

                <ToggleButton
                  value='Coronary DZ'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Coronary DZ
                </ToggleButton>

                <ToggleButton
                  value='Obesity'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Obesity
                </ToggleButton>

                <ToggleButton
                  value='Pain'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Heart failure
                </ToggleButton>
                <ToggleButton
                  value='CKD'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  CKD
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
              Family History of Diabetes
            </Grid>
            <Grid item xs={8} textAlign='left'>
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
              <IconButton onClick={() => handleShowNote(7)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[7] && (
              <>
                <Grid xs={2} textAlign='right'></Grid>
                <Grid xs={9}>
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
              Details Of Family History Of Diabetes
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='Details' />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>
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
          <legend style={{ marginLeft: '15px' }}>Past diagnosis</legend>

          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              A1C
            </Grid>

            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='Ac' />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Fasting Glucose
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='fasting' />
            </Grid>

            <Grid item xs={2} textAlign='right'></Grid>

            <Grid item xs={2} textAlign='right'>
              Lipid Panel
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='lipid' />
            </Grid>

            <Grid item xs={2} textAlign='right'></Grid>
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='25px'>
          <Grid item xs={2} textAlign='right'>
            Exercise
          </Grid>

          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='None / Sedentary'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                None / Sedentary
              </ToggleButton>

              <ToggleButton
                value='sa'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Standing at work
              </ToggleButton>

              <ToggleButton
                value='bc'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Labor for work
              </ToggleButton>

              <ToggleButton
                value='de'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Cardio exercise
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
        </Grid>

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
            <Grid item xs={2} textAlign='right'>
              Smoking history
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
              <IconButton onClick={() => handleShowNote(9)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[9] && (
              <>
                <Grid item xs={2} textAlign='right'></Grid>
                <Grid xs={9}>
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
              Packs Per Day
            </Grid>
            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='smokes' />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(10)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[10] && (
              <>
                <Grid item xs={2}></Grid>
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
              Number of years
            </Grid>
            <Grid item xs={4} textAlign='center'>
              <RHFTextField size='small' name='smokes' />
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <IconButton onClick={() => handleShowNote(11)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[11] && (
              <>
                <Grid item xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '1px', marginLeft: '10px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Alcohol abuse
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='alcohol yes'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='alcohol no'
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

            <Grid item xs={2} textAlign='right'>
              Details of Alcohol abuse
            </Grid>

            <Grid item xs={7} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>
            <Grid item xs={2} textAlign='right'></Grid>
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='25px'>
          <Grid item xs={2} textAlign='right'>
            Current home Medications
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Metformin'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Metformin
              </ToggleButton>

              <ToggleButton
                value='Glipizide'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Glipizide
              </ToggleButton>

              <ToggleButton
                value='Insulin 70/30'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Insulin 70/30
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
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '19px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Other current home medications
          </Grid>

          <Grid item xs={7} textAlign='center'>
            <RHFTextField size='small' name='follow' />
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
