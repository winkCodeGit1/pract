/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import DetailsOrIngredient from './DetailsOrIngredient';
import BasicTabs from 'components/Tabs';
import DepartmentWise from './DepartmentWise';
import PatientWise from './PatientWise';

const orders = [
  {
    itemName: 'Order set/Meal 1',
    totalNo: '23',
  },
  {
    itemName: 'Order set/Meal 2',
    totalNo: '3',
  },
];

const TABLIST = [
  { label: 'Department Wise', component: <DepartmentWise /> },
  { label: 'Patient Wise', component: <PatientWise /> },
];

const KitchenDashboard = () => {
  const [selectedMealType, setSelectedMealType] = useState('0');
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      {openDetail && (
        <DetailsOrIngredient mealType={selectedMealType} onClose={() => setOpenDetail(false)} />
      )}
      <Box
        component={Paper}
        elevation={2}
        sx={{ borderRadius: '4px', border: '1px solid', borderColor: 'primary.lighter', p: 2 }}
      >
        <Box>
          <InputLabel>Select Meal Type</InputLabel>
          <Select value={selectedMealType} size='small' sx={{ width: 1 / 3 }}>
            <MenuItem value='0'> All Day </MenuItem>
            {[].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' py={1}>
          {orders.map((order, i) => (
            <Stack key={i} py={1} component={Card} p={2}>
              <Typography color='text.primary' variant='subtitle1'>
                {order.itemName}
              </Typography>

              <Typography variant='subtitle2' color='text.secondary'>
                {order.totalNo}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Button variant='outlined' color='secondary' onClick={() => setOpenDetail(true)}>
          Show Ingredients(View Details)
        </Button>
      </Box>
      <Box pt={2}>
        <BasicTabs tabList={TABLIST} />
      </Box>
    </>
  );
};

export default KitchenDashboard;
