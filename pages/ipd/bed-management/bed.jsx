/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import {
  Paper,
  Card,
  CardHeader,
  Stack,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import Empty from 'assets/Images/empty.svg';
import InUse from 'assets/Images/in-use.svg';
import reserved from 'assets/Images/reserved.svg';
import useBedManagementStore from 'stores/useBedManagementStore';

function MoreOptionMenu({ closeMenu, menuState, open }) {
  const { toggleTransfer, toggleDischarge } = useBedManagementStore();

  return (
    <Menu
      id='bed-option'
      anchorEl={menuState.anchorEl}
      open={open}
      onClose={closeMenu}
      MenuListProps={{
        'aria-labelledby': 'more-bed-option',
      }}
    >
      <MenuItem
        onClick={() => {
          closeMenu();
          alert('Patient Admitted');
        }}
      >
        Admit
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          toggleTransfer();
        }}
      >
        Transfer
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          toggleDischarge();
        }}
      >
        Discharge
      </MenuItem>
    </Menu>
  );
}
const initialMenuState = { anchorEl: null, info: null };

export default function Bed({ info }) {
  const [menuState, setMenuState] = useState(initialMenuState);
  const open = Boolean(menuState.anchorEl);
  const [closeTransfer, setCloseTransfer] = useState(false);

  let icon;
  if (info.bedInfo.status === 'In Use') {
    icon = InUse;
  } else if (info.bedInfo.status === 'Empty') {
    icon = Empty;
  } else {
    icon = reserved;
  }

  const handleClose = () => {
    setMenuState(initialMenuState);
  };

  function handleMoreOptionClick({ currentTarget: anchorEl }, info) {
    setMenuState({ anchorEl, info });
  }

  return (
    <Box component={Paper} p={2} elevation={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack>
          <Typography variant='subtitle1'>{info.bedInfo.bedName}</Typography>
        </Stack>
        <Stack>
          <IconButton
            size='small'
            onClick={(e) => handleMoreOptionClick(e, info)}
            id='more-bed-option'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVert />
          </IconButton>
          <MoreOptionMenu closeMenu={handleClose} menuState={menuState} open={open} />
        </Stack>
      </Stack>

      <Stack direction='column'>
        <Stack py={2}>
          <img src={icon} alt='icon' height={50} />
        </Stack>
        <Stack direction='row'>
          <Stack>
            <Typography>Patient: &nbsp;</Typography>
          </Stack>
          <Stack>
            <Typography variant='subtitle1' color='primary.darker'>
              {info.patientInfo.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row'>
          <Stack>
            <Typography>Admission Date: &nbsp;</Typography>
          </Stack>
          <Stack>
            <Typography>{info.patientInfo.admissionDate}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row'>
          <Stack>
            <Typography>Gender/Age: &nbsp;</Typography>
          </Stack>
          <Stack>
            <Typography>
              {info.patientInfo.age}/{info.patientInfo.gender}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
