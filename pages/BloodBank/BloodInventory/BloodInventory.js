import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

import BasicTabs from 'components/Tabs';
import ComingSoon from 'pages/ComingSoon';
import WholeBlood from './BloodInventoryTabs/WholeBloodTab';
import PlateletsTab from './BloodInventoryTabs/PlateletsTab';
import PlasmaTab from './BloodInventoryTabs/PlasmaTab';
import RedCellsTab from './BloodInventoryTabs/RedCellsTab';
import APos from 'assets/Images/bloodbank/APos.png';
import ANeg from 'assets/Images/bloodbank/ANeg.png';
import BPos from 'assets/Images/bloodbank/BPos.png';
import BNeg from 'assets/Images/bloodbank/BNeg.png';
import ABPos from 'assets/Images/bloodbank/ABPos.png';
import ABNeg from 'assets/Images/bloodbank/ABNeg.png';
import OPos from 'assets/Images/bloodbank/OPos.png';
import ONeg from 'assets/Images/bloodbank/ONeg.png';


const BloodInventory = ({ tabs }) => {
  const [openBlood, setOpenBlood] = useState({
    APos: true,
    ANeg: false,
    BPos: false,
    BNeg: false,
    OPos: false,
    ONeg: false,
    ABPos: false,
    ABNeg: false
  });
  const handleBloodGroupOpen = (type) => {
    setOpenBlood(prevState => {
      const updatedState = {};
      Object.keys(prevState).forEach(key => {
        updatedState[key] = key === type;
      });
      return updatedState;
    });
  };
  const title = openBlood['APos'] ? '(A+)'
    : openBlood['ANeg'] ? '(A-)'
      : openBlood['BPos'] ? '(B+)'
        : openBlood['BNeg'] ? '(B-)'
          : openBlood['ABPos'] ? '(AB+)'
            : openBlood['ABNeg'] ? '(AB-)'
              : openBlood['OPos'] ? '(O+)'
                : openBlood['ONeg'] ? '(O-)' : null;

  const componentMap = {
    0: <WholeBlood title={title} />,
    1: <PlateletsTab title={title} />,
    2: <PlasmaTab title={title} />,
    3: <RedCellsTab title={title} />
  };


  const TABLIST = tabs?.map((t, i) => {
    return {
      label: t,
      component: componentMap[i] || <ComingSoon height={200} />,
    };
  });

  const BloogGroupSelection = (icon, units, bloodType) => {
    return (
      <div style={{ width: '150px' }} >
        <Grid container justifyContent='center' alignItems='center' direction='column'
          style={{
            cursor: 'pointer',
            transform: openBlood[bloodType] ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out'
          }}
          onClick={() => handleBloodGroupOpen(bloodType)}
        >
          <img alt='Blood-Group' src={icon} style={{ height: '60%', width: '60%' }} />

          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography align='center' color={openBlood[bloodType] ? 'primary' : 'action'} >{units}<br />Units</Typography>
            {openBlood[bloodType] && <br />}
          </Grid>
          <Grid item  >
            <KeyboardArrowDownRounded color={openBlood[bloodType] ? 'primary' : 'action'} />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <Grid container spacing={1} >
        <Grid item container spacing={1} justifyContent='center' alignItems='center' style={{ paddingTop: 25 }}  >
          <Grid item >
            {BloogGroupSelection(APos, '48', 'APos')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(ANeg, '67', 'ANeg')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(BPos, '99', 'BPos')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(BNeg, '24', 'BNeg')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(ABPos, '45', 'ABPos')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(ABNeg, '75', 'ABNeg')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(OPos, '34', 'OPos')}
          </Grid>
          <Grid item >
            {BloogGroupSelection(ONeg, '78', 'ONeg')}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            <BasicTabs tabList={TABLIST || undefined} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BloodInventory;
