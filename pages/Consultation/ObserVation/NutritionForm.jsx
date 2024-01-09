import ExposureIcon from '@mui/icons-material/Exposure';
import { useState } from 'react';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton } from '@mui/material';
import { RHFTextarea, RHFTextField, RHFToggleButton } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

export default function NutritionForm() {
  const [showNote, setShowNote] = useState({});
  const defaultValues = {};
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '---data');
  };
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
        title='Nutrition'
      />
      <Grid sx={{ padding: '20px' }}>
        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Birth weight
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
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
            Nutritional Status
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
                Normal
              </ToggleButton>

              <ToggleButton
                value='Moderate'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Moderate
              </ToggleButton>
              <ToggleButton
                value='Severe'
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
            Remarks
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='remarks' sx={{ maxWidth: '600px' }} />
          </Grid>

          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Birth condition
          </Grid>

          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='NORMAL'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Normal
              </ToggleButton>

              <ToggleButton
                value='RISKY'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Risky
              </ToggleButton>

              <ToggleButton
                value='Very risk  '
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Very Risky
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

          <Grid xs={2} textAlign='right'>
            Weight as on date
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='days' sx={{ width: '40%' }} />
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
            Only breast feeding for 6 months
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
                value='Noss'
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
            Only breast feeding till date
          </Grid>

          <Grid item xs={4}>
            <RHFDatePicker format='dd-MM-yyyy' name='date' />
          </Grid>
          <Grid item xs={6} textAlign='right'>
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

          <Grid item xs={2} textAlign='right'>
            Brest feeding and light food after 6 months
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
            Start date of breast feeding along with light food
          </Grid>

          <Grid item xs={4}>
            <RHFDatePicker format='dd-MM-yyyy' name='date' />
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <IconButton onClick={() => handleShowNote(8)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[8] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '1px', marginLeft: '15px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='remarl899'
                />
              </Grid>
            </>
          )}
          <Grid item xs={2} textAlign='right'>
            Bal Vita provided
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
            Bal Vita Provided by FCHV
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='YYES'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Yes
              </ToggleButton>

              <ToggleButton
                value='NOO'
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
