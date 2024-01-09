import LabOrderIpd from './LabOrderIpd';
import OrderLabTests from './OrderLabTests';
import InvestigationSummary from './InvestigationSummary';
import { Box } from '@mui/material';
import BasicTabs from 'components/Tabs';

const TABLIST = [
  { label: 'Lab Order', component: <LabOrderIpd /> },
  { label: 'Investigation Summary', component: <InvestigationSummary /> },
  { label: 'Order Lab Tests', component: <OrderLabTests /> },
];
export default function LabInvestigation() {
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
