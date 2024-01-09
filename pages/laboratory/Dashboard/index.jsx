// import React from 'react';

import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import BasicTabs from 'components/Tabs';
import SampleToCollect from './SampleToCollect';
import CollectedSample from './CollectedSample';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
const statics = [
  {
    label: 'Samples to Collect',
    count: 10,
    icon: <BiotechIcon color='primary' />,
    color: 'primary',
  },
  {
    label: 'Samples Collected',
    count: 7,
    icon: <ScienceIcon color='secondary' />,
    color: 'secondary',
  },
  {
    label: 'Awaiting Testing',
    count: 3,
    icon: <PendingActionsIcon color='warning' />,
    color: 'warning',
  },
  { label: 'Received', count: 7, icon: <AddTaskIcon color='info' />, color: 'info' },
];

function CardItem({ item }) {
  return (
    <Stack
      component={Paper}
      elevation={2}
      direction='row'
      spacing={2}
      px={2}
      alignItems='center'
      sx={{ borderRadius: '4px', border: '1px solid', borderColor: 'primary.lighter' }}
    >
      <Stack py={1}>
        <Avatar
          sx={{
            backgroundColor: item.color + '.lighter',
          }}
        >
          {item.icon}
        </Avatar>
      </Stack>
      <Divider orientation='vertical' />
      <Stack py={1}>
        <Stack>
          <Typography variant='h6'>{item.count}</Typography>
        </Stack>
        <Stack>
          <Typography variant='subtitle2' color='text.secondary'>
            {item.label}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function LaboratoryLayout() {
  const TABLIST = [
    { label: 'Samples to Collect', component: <SampleToCollect type='sampleToCollect' /> },
    { label: 'Samples Collected', component: <CollectedSample type='collectedSample' /> },
  ];
  return (
    <div>
      <Box px={2} pt={2}>
        <Typography sx={{ mb: 1 }}>
          Welcome <b>Preethi Suresh</b>, you have <b>24</b> Samples to Collect!
        </Typography>
        <Stack direction='row' container spacing={2} justifyContent='center' py={2}>
          {statics.map((item) => (
            <CardItem item={item} key={item} />
          ))}
        </Stack>
      </Box>
      <BasicTabs tabList={TABLIST} />
    </div>
  );
}
