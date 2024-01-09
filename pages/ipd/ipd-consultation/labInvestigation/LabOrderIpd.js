// import React from 'react'
import { LoadingButton } from '@mui/lab';
import { Accordion, Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import LabOrderTestNew from 'pages/Consultation/Orders/LabOrderTestNew';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LabOrderIpd() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const methods = useForm({});
  const [loading] = useState(false);

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data, '----LabOrderIpd');
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={2}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={{ border: '1px solid', borderColor: 'divider' }}
            mt={2}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Laboratory</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <LabOrderTestNew stateName={'laboratoryTest'} />
                </Grid>

                <Grid container alignItems='center' justifyContent={'flex-end'}>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    loading={loading}
                    sx={{ margin: '12px' }}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} mb={2}>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2bh-content'
              id='panel2bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Radiology</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>To be Continued</Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
