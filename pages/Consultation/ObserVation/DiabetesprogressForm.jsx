import { useState } from 'react';
import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';
import { RHFTextField, RHFToggleButton, RHFTextarea } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonStyle, toggleButtonGroupStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

export default function DiabetesProgressForm() {
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
        title='Diabetes – Progress'
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
          <legend style={{ marginLeft: '15px' }}>Blood pressure</legend>

          <Grid container spacing={1} alignItems='center' marginBottom='20px'>
            <Grid
              item
              xs={12}
              textAlign='left'
              style={{ fontSize: '13px', paddingTop: '15px', paddingLeft: '18px' }}
            >
              <p>DM patient’s goal 130/80</p>
            </Grid>

            <Grid item xs={2} textAlign='right'>
              Systolic data
            </Grid>

            <Grid item xs={3} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>

            <Grid item xs={3}>
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
                  Abnormal
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={4} textAlign='right'>
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
              Diastolic data
            </Grid>

            <Grid item xs={3} textAlign='center'>
              <RHFTextField size='small' name='follow' />
            </Grid>

            <Grid item xs={3}>
              <RHFToggleButton
                name='statuses'
                sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              >
                <ToggleButton
                  value='ress'
                  size='small'
                  sx={{
                    ...toggleButtonStyle,
                    wordBreak: 'keep-all',
                  }}
                >
                  Abnormal
                </ToggleButton>
              </RHFToggleButton>
            </Grid>
            <Grid item xs={4} textAlign='right'>
              <IconButton onClick={() => handleShowNote(1)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[1] && (
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
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            A1C
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
          </Grid>
          <Grid xs={2}></Grid>

          <Grid item xs={2} textAlign='right'>
            Last A1C Date
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
              <Grid item xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '16px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Is Patient on enalapril
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
            Last LDL
          </Grid>
          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
          </Grid>
          <Grid xs={2}></Grid>

          <Grid item xs={2} textAlign='right'>
            last LDL date
          </Grid>

          <Grid item xs={8}>
            <RHFDatePicker format='dd-MM-yyyy' name='date' />
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
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '8px', marginLeft: '16px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}
          <Grid item xs={2} textAlign='right'>
            Ulcers present on feet
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
            <IconButton onClick={() => handleShowNote(5)}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          {showNote[5] && (
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
            Last eye exam date
          </Grid>

          <Grid
            item
            xs={8}
            textAlign='center'
            sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <RHFDatePicker format='dd-MM-yyyy' name='date' />
          </Grid>

          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(6)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[6] && (
            <>
              <Grid item xs={2}></Grid>
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
