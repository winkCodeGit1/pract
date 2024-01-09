import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';
import { RHFTextField, RHFTextarea, RHFToggleButton } from 'components/hook-form';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function HypertensionintakeForm() {
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
        title='Childhood Illness( Children aged 2 months to 5 years)'
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
          <legend style={{ marginLeft: '15px' }}>General Danger Signs</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              General Danger Signs present
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
              <IconButton onClick={() => handleShowNote(0)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[0] && (
              <>
                <Grid xs={2}></Grid>
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
              General Danger Signs
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Convulsion'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Convulsion
                </ToggleButton>

                <ToggleButton
                  value='Drink'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Unable to drink
                </ToggleButton>

                <ToggleButton
                  value='Vomit'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Vomiting all
                </ToggleButton>

                <ToggleButton
                  value='Lethargic'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  Lethargic/ Unconscious
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
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Referred out
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='yess'
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
            Follow up result
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Worse'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Worse
              </ToggleButton>

              <ToggleButton
                value='Same'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Same
              </ToggleButton>

              <ToggleButton
                value='Samme'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Improved
              </ToggleButton>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(3)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[3] && (
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
            Remarks
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>
        </Grid>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Acute Respiratory Infection</legend>

          <Grid container spacing={2}>
            <Grid item xs={2} textAlign='right'>
              Acute Respiratory Infection
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

            <Grid item xs={2} textAlign='right'>
              How many days?
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
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
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '15px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right' padding={2}>
              Acute Respiratory Illness, Symptoms
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
                  Chest indrawing
                </ToggleButton>

                <ToggleButton
                  value='Strider'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Strider
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
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '4px', marginLeft: '20px' }}
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
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Diarrhoea</legend>

          <Grid container spacing={2}>
            <Grid item xs={2} textAlign='right'>
              Diarrhoea present
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Ye'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>
                <ToggleButton
                  value='NoO'
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

            <Grid item xs={2} textAlign='right'>
              How many days?
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
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
              Symptoms
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Blood'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Blood
                </ToggleButton>

                <ToggleButton
                  value='Rest'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Restless/ Irritable
                </ToggleButton>

                <ToggleButton
                  value='Sunken'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Sunken eyes
                </ToggleButton>
                <ToggleButton
                  value='Lethargic'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Lethargic/ Unconscious
                </ToggleButton>
                <ToggleButton
                  value='Drink'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Unable to drink
                </ToggleButton>
                <ToggleButton
                  value='Drinks eagerly'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Drinks eagerly
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
              Skin pinch
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
                  Slowly
                </ToggleButton>

                <ToggleButton
                  value='Confirmed'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Very Slowly
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
              Dehydration Status
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='No Dehy'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  No Dehydration
                </ToggleButton>

                <ToggleButton
                  value='Some'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Some Dehydration
                </ToggleButton>

                <ToggleButton
                  value='Severe'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Severe Dehydration
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
          <legend style={{ marginLeft: '15px' }}>Fever</legend>

          <Grid container spacing={1}>
            <Grid item xs={2} textAlign='right'>
              Fever
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='yYes'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='NNo'
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
              How many days?
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
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
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '10px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Malaria risk
            </Grid>

            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='low'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Low
                </ToggleButton>

                <ToggleButton
                  value='media'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Medium
                </ToggleButton>

                <ToggleButton
                  value='high'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  High
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(14)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[14] && (
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
              Microscopic
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Convulsion'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Positive
                </ToggleButton>

                <ToggleButton
                  value='Drink'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Negative
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(15)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[15] && (
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
              Rapid Diagnostic Tests
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Worse'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Positive
                </ToggleButton>

                <ToggleButton
                  value='Same'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Negative
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(16)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[16] && (
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
              Symptoms
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Stiff Neck'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Stiff neck
                </ToggleButton>

                <ToggleButton
                  value='Falciparum'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Falciparum
                </ToggleButton>

                <ToggleButton
                  value='Vivex'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Vivex
                </ToggleButton>

                <ToggleButton
                  value='General'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  General rash
                </ToggleButton>

                <ToggleButton
                  value='Red'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Red eyes
                </ToggleButton>

                <ToggleButton
                  value='Nosal'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Nosal discharge
                </ToggleButton>

                <ToggleButton
                  value='Mouth'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Mouth ulcer
                </ToggleButton>
              </RHFToggleButton>
            </Grid>

            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(17)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[17] && (
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
          </Grid>
        </fieldset>

        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            padding: '12px  0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Ear infection</legend>

          <Grid container spacing={2}>
            <Grid item xs={2} textAlign='right'>
              Ear infection
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
                    wordBreak: 'keepll',
                  }}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  value='Noooo'
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
              <IconButton onClick={() => handleShowNote(18)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[18] && (
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
              How many days?
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(19)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[19] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '18px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}
            <Grid item xs={2} textAlign='right'>
              Ear discharge days
            </Grid>

            <Grid item xs={8}>
              <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(20)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[20] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '18px' }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='remarl899'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Symptoms
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='ear'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Ear pain
                </ToggleButton>

                <ToggleButton
                  value='tender'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Tender swelling behind the ear
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(21)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[21] && (
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
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Nutrition status</legend>

          <Grid container spacing={2}>
            <Grid item xs={2} textAlign='right'>
              Weight condition
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
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
                  Normal weight
                </ToggleButton>

                <ToggleButton
                  value='Low'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Low weight
                </ToggleButton>

                <ToggleButton
                  value='Very Low'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Very low weight
                </ToggleButton>
              </RHFToggleButton>
            </Grid>

            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(22)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[22] && (
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
              Pallor
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='some'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Some
                </ToggleButton>

                <ToggleButton
                  value='severe'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Severe
                </ToggleButton>
              </RHFToggleButton>
            </Grid>

            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(23)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[23] && (
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
            padding: '12px 0px',
            marginBottom: '20px',
          }}
        >
          <legend style={{ marginLeft: '15px' }}>Counseling</legend>

          <Grid container spacing={2}>
            <Grid item xs={2} textAlign='right'>
              Counseling provided
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='YESS'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Yes
                </ToggleButton>
                <ToggleButton
                  value='NOOO'
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
              <IconButton onClick={() => handleShowNote(24)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[24] && (
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
              Counseling purpose
            </Grid>
            <Grid item xs={8}>
              <RHFToggleButton
                name='status'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
                exclusive
              >
                <ToggleButton
                  value='Regular'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Regular follow up
                </ToggleButton>
                <ToggleButton
                  value='Immediate'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Immediate visit
                </ToggleButton>
                <ToggleButton
                  value='Food'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Food
                </ToggleButton>
                <ToggleButton
                  value='Operative'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Operative Fluids
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={2} textAlign='right'>
              <IconButton onClick={() => handleShowNote(25)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[25] && (
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

        <Grid container spacing={2} marginBottom='25px' padding={1}>
          <Grid item xs={2} textAlign='right'>
            Vitamin A Capsules Provided
          </Grid>
          <Grid item xs={8}>
            <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(26)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[26] && (
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
            Albendazole Given
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='yyes'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Yes
              </ToggleButton>

              <ToggleButton
                value='nooo'
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
            <IconButton onClick={() => handleShowNote(27)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[27] && (
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
