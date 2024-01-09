import BasicTabs from 'components/Tabs';
import ComingSoon from 'pages/ComingSoon';
import AllDonorsTab from '../DonarTabs/AllDonorsTab';
import InLabTestingTab from '../DonarTabs/InLabTestingTab';
import AddedtoStockTab from '../DonarTabs/AddedtoStockTab';
import RejectedTab from '../DonarTabs/RejectedTab';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import AddCampForm from '../CampDonors/Forms/AddCampForm';
import { useState } from 'react';
import { Add, ExpandMoreRounded } from '@mui/icons-material';
import { getAllCampList } from 'pages/api/bloodbank';
import { useQuery } from '@tanstack/react-query';



const CampDonors = ({ tabs }) => {
  const [openAdd, setAddOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [campId, setCampId] = useState([]);

  const componentMap = {
    0: <AllDonorsTab campId={campId} />,
    1: <InLabTestingTab campId={campId} />, //if fails to map then fall back to coming soon
    2: <AddedtoStockTab campId={campId} />,
    3: <RejectedTab campId={campId} />
  };

  const handleAccordionChange = (item, index) => {
    setCampId(item);
    setExpandedAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const { data } = useQuery({
    queryKey: ['getAllCampList'],
    queryFn: getAllCampList,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true
  });

  const TABLIST = tabs?.map((t, i) => {
    return {
      label: t,
      component: componentMap[i] || <ComingSoon height={200} />,
    };
  });

  return (
    <div>
      {openAdd && (
        <AddCampForm
          onClose={() => {
            setAddOpen(false);
          }}
        // selectedRow={selectedRow}
        />
      )}
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setAddOpen((ps) => !ps)}
            variant='contained'
          >
            Add Camp/Drive
          </Button>
        </Grid>
        {data?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              expanded={expandedAccordion === index}
              onChange={() => handleAccordionChange(item.campRegistrationNumber, index)}>
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.campName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {<BasicTabs tabList={TABLIST || undefined} />}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
        {/* {data?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <DetailPanel title={item.campName}>
              <BasicTabs tabList={TABLIST || undefined} />
            </DetailPanel>
          </Grid>
        ))} */}
      </Grid>
    </div>
  );
};

export default CampDonors;
