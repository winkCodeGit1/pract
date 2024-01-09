import { useState } from 'react';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import DischargeNoteIPD from './DischargeNoteIPD';
import PrescriptionForm from 'pages/Consultation/PrescriptionForm';
import DosAndDontIPD from './DosAndDontIPD';

export default function DischargeNote() {
  const [expanded, setExpanded] = useState(false);
  const [addedMedicines, setAddedMedicines] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Grid mb={2}>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Prescription</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <PrescriptionForm
                addedMedicines={addedMedicines}
                setAddedMedicines={setAddedMedicines}
                isIpd={true}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid mb={2}>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Do`s & Dont`s</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <DosAndDontIPD />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid mb={2}>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Discharge Note</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <DischargeNoteIPD />
              {/* <FamilyHistoryIpd stateName={'patientHistory'} /> */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}
