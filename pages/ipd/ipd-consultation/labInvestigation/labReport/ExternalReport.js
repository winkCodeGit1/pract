// import React from 'react';
import { Box } from '@mui/material';
import BasicTabs from 'components/Tabs';
import LaboratoryInvestigate from '../externalReportInvestigation/LaboratoryInvestigate';
import RadiologyInvestigate from '../externalReportInvestigation/RadiologyInvestigate';

const TABLIST = [
  { label: 'Laboratory', component: <LaboratoryInvestigate /> },
  { label: 'Radiology', component: <RadiologyInvestigate /> },
];
export default function ExternalReport() {
  return (
    <Box
      sx={{
        // '& .MuiTabs-scroller': { margin: '0 16px' },
        border: '1px solid',
        borderColor: 'divider',
        padding: 1,
      }}
    >
      <BasicTabs tabList={TABLIST} centered fullWidth />
    </Box>
  );
}
