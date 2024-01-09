import { useState } from 'react';
import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton, useTheme } from '@mui/material';
import { RHFTextField, RHFTextarea } from 'components/hook-form';
import { hypertensionProgressSaveHypertensionProgress } from 'pages/api/consultation/observations.js';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { failedSaveMessage, saveMessage } from 'utils/constants';

import { restrict } from 'utils/restrict';

const defaultValues = {
  systolicData: '',
  systolicDataNotes: '',
  diastolicData: '',
  diastolicDataNotes: '',
  lastSystolicData: '',
  lastSystolicDataNotes: '',
  lastDiastolicData: '',
  lastDiastolicDataNotes: '',
  lastCr: '',
  lastCrDate: '',
  lastCrNotes: '',
  lastLdl: '',
  lastLdlDate: '',
  lastLdlNotes: '',
  consultationId: '',
};

export default function HypertensionprogressForm({ row, onClose }) {
  console.log(onClose, '---hyperform');
  // const { control, setValue, watch } = useFormContext();
  // const [showTextareaIndex, setShowTextareaIndex] = useState(-1);
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [showNote, setShowNote] = useState({});
  // const [isOpen, setIsOpen] = useState(true);
  const handleShowNote = (index) => {
    if (showNote[index]) {
      setShowNote((ps) => ({ ...ps, [index]: '' }));
    } else {
      setShowNote((ps) => ({ ...ps, [index]: true }));
    }
  };
  const theme = useTheme();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => hypertensionProgressSaveHypertensionProgress({ req, row }),
    onSuccess: () => {
      // queryClient.invalidateQueries(['vitalSignTypeGetAllVitalSignTypeInDto']);
      toast(saveMessage);
      // setIsOpen(false);
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    console.log(data, '---data');
    const req = {
      ...data,
      consultationId: data?.consultationId?.consultationId,
    };
    console.log(req, '---req');
    mutation.mutate(req);
  };

  // const handleFormClose = () => {
  //   setIsOpen(false);
  // };

  // if (!isOpen) {
  //   return null; // Do not render the form if it's closed
  // }

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
        title='Hypertension – Progress'
      />

      <Grid sx={{ padding: '20px' }}>
        <fieldset
          style={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[400]}`,
            marginBottom: '20px',
            padding: '20px',
          }}
        >
          <legend>Blood Pressure</legend>

          <Grid container spacing={2} alignItems='center'>
            <Grid
              item
              xs={12}
              textAlign='left'
              style={{ fontSize: '13px', paddingTop: '2px', paddingLeft: '3PX' }}
            >
              <p>
                Goal: most patients goal BP Greater than 140/90;
                <br />
                Age Greater than 60 goal Greater than 150/90;
                <br />
                Diabetics goal Greater than 130/80
                <br />
              </p>
            </Grid>
            <br />
            <Grid item xs={2} textAlign='right'>
              Systolic data
            </Grid>
            <Grid item xs={3}>
              <RHFTextField size='small' name='systolicData' onInput={restrict.decimal} />
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <ToggleButton value='check' size='small'>
                Abnormal
              </ToggleButton>
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
                    sx={{
                      maxWidth: '600px',
                      width: '100%',
                      marginTop: '8px',
                      marginLeft: '16px',
                    }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='systolicDataNotes'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Diastolic data
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <RHFTextField size='small' name='diastolicData' onInput={restrict.decimal} />
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <ToggleButton value='check' size='small'>
                Abnormal
              </ToggleButton>
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
                    sx={{
                      maxWidth: '600px',
                      width: '100%',
                      marginTop: '8px',
                      marginLeft: '16px',
                    }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='diastolicDataNotes'
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
            padding: '20px',
          }}
        >
          <legend>What was BP at last visit</legend>

          <Grid container spacing={2} alignItems='center' marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Systolic data
            </Grid>

            <Grid item xs={3} textAlign='center'>
              <RHFTextField size='small' name='lastSystolicData' onInput={restrict.decimal} />
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <ToggleButton value='check' size='small'>
                Abnormal
              </ToggleButton>
            </Grid>
            <Grid item xs={4} textAlign='right'>
              <IconButton onClick={() => handleShowNote(2)}>
                <ExposureIcon />
              </IconButton>
            </Grid>

            {showNote[2] && (
              <>
                <Grid xs={2}></Grid>
                <Grid xs={10}>
                  <RHFTextarea
                    sx={{
                      maxWidth: '600px',
                      width: '100%',
                      marginTop: '8px',
                      marginLeft: '16px',
                    }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='lastSystolicDataNotes'
                  />
                </Grid>
              </>
            )}

            <Grid item xs={2} textAlign='right'>
              Diastolic data
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <RHFTextField size='small' name='lastDiastolicData' onInput={restrict.decimal} />
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <ToggleButton value='check' size='small'>
                Abnormal
              </ToggleButton>
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
                    sx={{
                      maxWidth: '600px',
                      width: '100%',
                      marginTop: '8px',
                      marginLeft: '16px',
                    }}
                    multiline
                    minRows={2}
                    placeholder='Notes'
                    name='lastDiastolicDataNotes'
                  />
                </Grid>
              </>
            )}
          </Grid>
        </fieldset>

        <Grid container spacing={2} alignItems='center' padding={2}>
          <Grid item xs={2} textAlign='right'>
            Last CR
          </Grid>
          <Grid item xs={8} textAlign='center'>
            <RHFTextField size='small' name='lastCr' />
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={2} textAlign='right'>
            Last CR date
          </Grid>
          <Grid item xs={8}>
            <RHFDatePicker format='dd-MM-yyyy' name='lastCrDate' />
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
                  sx={{
                    maxWidth: '600px',
                    width: '100%',
                    marginTop: '8px',
                    marginLeft: '16px',
                  }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='lastCrNotes'
                />
              </Grid>
            </>
          )}

          <Grid item xs={2} textAlign='right'>
            Last LDL
            {/* <IconButton>
              <HelpIcon />
            </IconButton> */}
          </Grid>
          <Grid item xs={8}>
            <RHFTextField size='small' name='lastLdl' />
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={2} textAlign='right'>
            Last LDL date
          </Grid>
          <Grid item xs={8}>
            <RHFDatePicker format='dd-MM-yyyy' name='lastLdlDate' />
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
                  sx={{
                    maxWidth: '600px',
                    width: '100%',
                    marginTop: '8px',
                    marginLeft: '16px',
                  }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='lastLdlNotes'
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
