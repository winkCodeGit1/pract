import { useState } from 'react';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import PersonalHistoryIpd from './PersonalHistoryIpd';
import PastHistoryIpd from './PastHistoryIpd';
import FamilyHistoryIpd from './FamilyHistoryIpd';

export default function PatientHistory() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mb={2}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <PersonalHistoryIpd />
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Past History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <PastHistoryIpd />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12} mb={2}>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3bh-content'
            id='panel3bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Family History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <FamilyHistoryIpd />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
