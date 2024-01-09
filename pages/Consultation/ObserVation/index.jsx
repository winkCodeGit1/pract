import React, { lazy } from 'react';
import { Grid, Box, Tabs, Tab, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import FormTabs from './FormTabs.jsx';
import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';
import DeleteForm from './DeleteForm.jsx';

import { Loadable } from 'utils/retry.js';

const ObservationForm = Loadable(lazy(() => import('./ObservationForm')));
const VitalForm = Loadable(lazy(() => import('./VitalForm')));

const TABLIST = [
  {
    label: 'History and Examination',
    component: <ObservationForm />,
    active: true,
  },
  { label: 'Vitals', component: <VitalForm />, active: true },
];

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
      {value === index && <Box sx={{ pt: { xs: 1, sm: 2, md: 0 } }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = {
  '&.MuiButtonBase-root.MuiTab-root:not(:last-of-type)': {
    marginRight: 1,
  },
  // textAlign:"left",
  alignItems: 'start',
};
const tabsStyle = {
  '.MuiTab-root': {
    padding: '0px 12px',
    '&.Mui-selected': {
      color: (theme) => theme.palette.primary.contrastText,
    },
    alignItems: 'start',
    '&.MuiButtonBase-root': {
      marginRight: '8px',
      zIndex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 500,
    },
  },
  '& .MuiTabs-scroller .MuiTabs-indicator': {
    width: '100%',
    zIndex: 0,
  },
  '.Mui-selected .MuiTab-iconWrapper': {
    color: (theme) => theme.palette.primary.contrastText,
  },
};

export default function ObserVationTab() {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedDelete, setSelectedDelete] = React.useState('');

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleFormAdd = (item) => {
    console.log(item);

    TABLIST.push({ ...item, active: true });
    setOpen(false);
  };
  const handleFormRemove = () => {
    const findIndex = TABLIST?.findIndex((el) => el.label === selectedDelete);
    if (findIndex !== -1) {
      TABLIST.splice(findIndex, 1);
    }
    setOpenDelete(false);
  };

  const handleDelete = (item) => {
    setOpenDelete(true);
    setSelectedDelete(item);
  };

  return (
    <>
      {open && (
        <FormTabs onClose={() => setOpen(false)} tablist={TABLIST} handleAdd={handleFormAdd} />
      )}
      {openDelete && (
        <DeleteForm onClose={() => setOpenDelete(false)} handleSuccess={handleFormRemove} />
      )}

      <Grid container spacing={0}>
        <Grid item xs={12} textAlign='right'>
          <Button
            variant='contained'
            sx={{ mb: 1 }}
            onClick={(item) => {
              handleClick(item);
            }}
          >
            Add New Form
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              width: '100%',
              maxWidth: 360,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label='hmis tabs'
              sx={tabsStyle}
              orientation='vertical'
            >
              {TABLIST.filter((item) => item.active).map(({ label }, index) => (
                <Tab
                  label={label}
                  {...a11yProps(index)}
                  sx={styles}
                  icon={
                    <IconButton
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(label);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                  iconPosition='end'
                  key={index}
                />
              ))}
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {TABLIST.filter((item) => item.active).map(({ component }, index) => (
            <CustomTabPanel value={tabValue} index={index} key={index}>
              {component}
            </CustomTabPanel>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
