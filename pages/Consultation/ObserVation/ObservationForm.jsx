import { Add } from '@mui/icons-material';
import ExposureIcon from '@mui/icons-material/Exposure';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { RHFSelect, RHFTextField } from 'components/hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { defaultArray } from '../index';
import { useState } from 'react';

export default function ObservationForm() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'obserVation',
  });
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
        action={
          <IconButton
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
            onClick={() => append(defaultArray)}
          >
            <Add />
          </IconButton>
        }
        disableTypography
        sx={{
          padding: '3px 13px',
          background: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: '17px',
        }}
        title='History and Examination'
      />
      <CardContent sx={{ padding: 2 }}>
        {fields.map((item, index) => (
          <Grid container spacing={1} alignItems='center' key={item.id} marginBottom='20px'>
            <Grid item xs={2} textAlign='right'>
              Chief Complaint
            </Grid>
            <Grid item xs={3} textAlign='left'>
              <RHFTextField
                size='small'
                name={`obserVation[${index}].ChiefComplaint`}
                sx={{ marginLeft: '13px', width: 'auto' }}
              />
            </Grid>
            <Grid item xs={1} textAlign='center'>
              <RHFTextField size='small' name={`obserVation[${index}].for`} />
            </Grid>
            <Grid
              item
              xs={2}
              textAlign='center'
              alignItems='center'
              display='flex'
              justifyContent='center'
            >
              for
              <RHFTextField
                size='small'
                sx={{ maxWidth: 100, marginLeft: '4px' }}
                name={`obserVation[${index}].accept`}
              />
            </Grid>
            <Grid item xs={3} textAlign='center' display='flex' alignItems='center'>
              <RHFSelect name={`obserVation[${index}].frequency`} native>
                <option value=''>Select Frequency</option>
                <option label='Minutes' value='number:1'>
                  Minutes
                </option>
                <option label='Hours' value='number:60'>
                  Hours
                </option>
                <option label='Days' value='number:1440'>
                  Days
                </option>
                <option label='Weeks' value='number:10080'>
                  Weeks
                </option>
                <option label='Months' value='number:43200'>
                  Months
                </option>
                <option label='Years' value='number:525600'>
                  Years
                </option>
              </RHFSelect>
              <IconButton
                onClick={() => remove(index)}
                sx={{ opacity: index === 0 ? 0 : 1 }}
                disabled={index === 0}
              >
                <HighlightOffIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} textAlign='center'>
              <IconButton onClick={() => handleShowNote(index)}>
                <ExposureIcon />
              </IconButton>
            </Grid>
            {showNote[index] && (
              <Grid item xs={12} justifyContent='center' textAlign='center'>
                <TextField
                  sx={{ maxWidth: '500px', width: '100%' }}
                  name={`obserVation[${index}].additionalNote`}
                  multiline
                  minRows={2}
                  placeholder='Note...'
                />
              </Grid>
            )}
          </Grid>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={2} textAlign='right'>
            Chief Complaint Notes
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={10} textAlign='left'>
            <RHFTextField
              size='small'
              name='ComplaintNotes'
              sx={{ marginLeft: '13px', maxWidth: '600px' }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2} lg={2} textAlign='right'>
            History Notes
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={10} textAlign='left'>
            <RHFTextField
              size='small'
              name='ComplaintNotes'
              sx={{ marginLeft: '13px', maxWidth: '600px' }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2} lg={2} textAlign='right'>
            Examination Notes
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={10} textAlign='left'>
            <RHFTextField
              size='small'
              name='ComplaintNotes'
              sx={{ marginLeft: '13px', maxWidth: '600px' }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2} lg={2} textAlign='right'>
            Smoking History
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={10} textAlign='left'>
            <ToggleButtonGroup
              color='primary'
              size='small'
              sx={{ marginLeft: '13px' }}
              aria-label='Platform'
            >
              <ToggleButton value='web'>Yes</ToggleButton>
              <ToggleButton value='android'>No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12} sm={4} md={2} lg={2} textAlign='right'></Grid>
          <Grid item xs={12} sm={8} md={7} lg={10} textAlign='left'>
            <TextField
              size='small'
              name='ComplaintNotes'
              sx={{ marginLeft: '13px' }}
              fullWidth
              multiline
              minRows={3}
              placeholder='Remark'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
