import ExposureIcon from '@mui/icons-material/Exposure';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ToggleButton,
  Typography,
} from '@mui/material';
import { RHFTextField } from 'components/hook-form';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function VitalForm() {
  const handleShowNote = () => {};
  return (
    <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
      <CardHeader
        // action={
        //   <IconButton
        //     sx={{ color: (theme) => theme.palette.primary.contrastText }}
        //     onClick={() => append(defaultArray)}>
        //     <Add />
        //   </IconButton>
        // }
        disableTypography
        sx={{
          padding: '3px 13px',
          background: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: '17px',
        }}
        title='Vitals'
      />

      <CardContent sx={{ padding: 2 }}>
        <Grid container spacing={1} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right'>
            Pulse
          </Grid>
          <Grid
            item
            xs={4}
            textAlign='center'
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
          >
            <RHFTextField size='small' name='pulse' />
            <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
          </Grid>
          <Grid item xs={3} textAlign='center'>
            <ToggleButton value='check' size='small'>
              Abnormal
            </ToggleButton>
          </Grid>
          <Grid item xs={3} textAlign='right'>
            <IconButton onClick={() => handleShowNote()}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            SPO2 (%)
          </Grid>
          <Grid
            item
            xs={4}
            textAlign='center'
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
          >
            <RHFTextField size='small' name='pulse' />
            <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
          </Grid>
          <Grid item xs={3} textAlign='center'>
            <ToggleButton value='check' size='small'>
              Abnormal
            </ToggleButton>
          </Grid>
          <Grid item xs={3} textAlign='right'>
            <IconButton onClick={() => handleShowNote()}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            RR (/min)
          </Grid>
          <Grid
            item
            xs={4}
            textAlign='center'
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
          >
            <RHFTextField size='small' name='pulse' />
            <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
          </Grid>
          <Grid item xs={3} textAlign='center'>
            <ToggleButton value='check' size='small'>
              Abnormal
            </ToggleButton>
          </Grid>
          <Grid item xs={3} textAlign='right'>
            <IconButton onClick={() => handleShowNote()}>
              <ExposureIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            Temperature (F)
          </Grid>
          <Grid
            item
            xs={4}
            textAlign='center'
            sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
          >
            <RHFTextField size='small' name='pulse' />
            <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
          </Grid>
          <Grid item xs={3} textAlign='center'>
            <ToggleButton value='check' size='small'>
              Abnormal
            </ToggleButton>
          </Grid>
          <Grid item xs={3} textAlign='right'>
            <IconButton onClick={() => handleShowNote()}>
              <ExposureIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Accordion defaultExpanded>
          <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
            <Typography>Blood Pressure</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={2} textAlign='right'>
                Diastolic (mm Hg)
              </Grid>
              <Grid
                item
                xs={4}
                textAlign='center'
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
              >
                <RHFTextField size='small' name='pulse' />
                <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
              </Grid>
              <Grid item xs={3} textAlign='center'>
                <ToggleButton value='check' size='small'>
                  Abnormal
                </ToggleButton>
              </Grid>
              <Grid item xs={3} textAlign='right'>
                <IconButton onClick={() => handleShowNote()}>
                  <ExposureIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2} textAlign='right'>
                Systolic (mm Hg)
              </Grid>
              <Grid
                item
                xs={4}
                textAlign='center'
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
              >
                <RHFTextField size='small' name='pulse' />
                <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
              </Grid>
              <Grid item xs={3} textAlign='center'>
                <ToggleButton value='check' size='small'>
                  Abnormal
                </ToggleButton>
              </Grid>
              <Grid item xs={3} textAlign='right'>
                <IconButton onClick={() => handleShowNote()}>
                  <ExposureIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2} textAlign='right'>
                Posture
              </Grid>
              <Grid
                item
                xs={4}
                textAlign='center'
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
              >
                <RHFTextField size='small' name='pulse' />
                <span style={{ whiteSpace: 'nowrap', marginLeft: '3px' }}>(72 - 72)</span>
              </Grid>
              <Grid item xs={3} textAlign='center'>
                <ToggleButton value='check' size='small'>
                  Abnormal
                </ToggleButton>
              </Grid>
              <Grid item xs={3} textAlign='right'>
                <IconButton onClick={() => handleShowNote()}>
                  <ExposureIcon />
                </IconButton>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
