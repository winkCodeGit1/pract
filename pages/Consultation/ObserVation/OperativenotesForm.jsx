import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton } from '@mui/material';
import { RHFTextarea, RHFTextField, RHFToggleButton } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function OperativeNotesForm() {
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
        title='Operative Notes'
      />
      <Grid sx={{ padding: '20px' }}>
        <Grid container spacing={1} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Diagnosis
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='diagnosis' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Specific intervention
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='intervention' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Anesthesia
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='anesthesia' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Antibiotics administered
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='antibiotics' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Fluid administered
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='administered' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Fluid Amount and Unit
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Fluid' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Tourniquet Time
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Tourniquet' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Estimated blood loss (in cc)
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
            Blood Transfusion Quantity
          </Grid>

          <Grid item xs={8}>
            <RHFTextField size='small' name='Blood' sx={{ width: '40%' }} />
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
            Findings
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Findings' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Intra-OP investigations ordered
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Findings' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Preoperative Meds
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Findings' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Specimens
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='specimens' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Intraoperative meds
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='intraoperative' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Procedure Note
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='procedure' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Complications
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='complication' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Condition
          </Grid>

          <Grid item xs={8}>
            <RHFToggleButton
              name='status'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              <ToggleButton
                value='Stable'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Stable
              </ToggleButton>

              <ToggleButton
                value='Extubated'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Extubated
              </ToggleButton>

              <ToggleButton
                value='recovery'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Transferred to recovery room
              </ToggleButton>

              <ToggleButton
                value='death'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Death on OT Table
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
            Presented from
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
                value='emergency'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Emergency
              </ToggleButton>

              <ToggleButton
                value='referral'
                size='small'
                sx={{
                  ...toggleButtonStyle,

                  wordBreak: 'keep-all',
                }}
              >
                Direct outside referral
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
            Surgeons
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='surgeons' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Anesthetist
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='anesthetist' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Scrub Nurse
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='scrub' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Circulating Nurse
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='circulating' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

          <Grid item xs={2} textAlign='right'>
            Other Staff
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='Other Staff' />
          </Grid>
          <Grid item xs={2} textAlign='right'></Grid>

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
                value='appendectomy'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Appendectomy
              </ToggleButton>

              <ToggleButton
                value='suturing'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Suturing
              </ToggleButton>

              <ToggleButton
                value='wound'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Wound Care
              </ToggleButton>
              <ToggleButton
                value='caesarean section'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Caesarean Section
              </ToggleButton>
              <ToggleButton
                value='cholecystostomy'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Cholecystostomy
              </ToggleButton>
              <ToggleButton
                value='eversion'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Eversion of Sac
              </ToggleButton>
              <ToggleButton
                value='fracture'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Fracture management
              </ToggleButton>
              <ToggleButton
                value='hernia'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Hernia Repair
              </ToggleButton>
              <ToggleButton
                value='ortho'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Orthopedic surgery upper limb
              </ToggleButton>
              <ToggleButton
                value='orthopedic'
                size='small'
                sx={{
                  ...toggleButtonStyle,
                  wordBreak: 'keep-all',
                }}
              >
                Orthopedic surgery lower limb
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
            <IconButton onClick={() => handleShowNote(4)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[4] && (
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
      </Grid>
      <Grid item display='flex' direction='row' spacing={2} justifyContent='flex-end'>
        <Button size='medium' variant='contained' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Grid>
    </Card>
  );
}
