import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`hmis-tabpanel-${index}`}
      aria-labelledby={`hmis-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: { xs: 1 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const styles = {
//   '&.MuiButtonBase-root.MuiTab-root:not(:last-of-type)': {
//     marginRight: 1,
//   },
// };
const tabsStyle = {
  '.MuiTab-root': {
    padding: '0px 12px',
    '&.Mui-selected': {
      color: (theme) => theme.palette.secondary.contrastText,
      zIndex: '1',
    },
    // '& .MuiButtonBase-root': {
    //   marginRight: '8px',
    // },
  },
  '.MuiTabs-indicator': {
    top: 5,
    bottom: 5,
    right: 3,
    height: 'auto',
    backgroundColor: 'secondary.main',
  },
};

const TABLIST = [
  { label: 'One', component: 1 },
  { label: 'Two', component: 2 },
  { label: 'Three', component: 3 },
  { label: 'four', component: 4 },
];

export default function BasicTabs({ tabList = TABLIST, fullWidth, ...other }) {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          border: 1,
          px: 1,
          borderColor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.900'),
          display: fullWidth ? 'block' : 'inline-block',
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'grey.100' : 'grey.800'),
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='hmis tabs'
          sx={tabsStyle}
          {...other}
        >
          {tabList.map(({ label }, index) => (
            <Tab disableRipple key={label} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Paper>
      {tabList.map(({ component }, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {component}
        </CustomTabPanel>
      ))}
    </>
  );
}
