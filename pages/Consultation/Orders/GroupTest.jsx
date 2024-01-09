import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import { ArrowDropDown, Delete } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getCountries, getStates } from 'pages/api/dashboard';
import { useState } from 'react';

export default function GroupTest() {
  const theme = useTheme();
  const [countryId, setCountryId] = useState('');
  const [expand, setExpand] = useState(true);

  const { watch, setValue } = useFormContext();

  const getLabTest = watch('labTest');
  const {
    data: country = [],

  } = useQuery({
    queryKey: ['getCountries'], queryFn: getCountries, retry: 1,
  });

  const {
    data: state = [],

  } = useQuery({
    queryKey: ['getStates', countryId],
    queryFn: getStates,
    // suspense: true
  });

  const handleListItemClick = (e, item) => {
    setCountryId(item.id);
  };

  const handleExpand = () => {
    setExpand((ps) => !ps);
  };
  // useEffect(() => {
  //   setValue("labTest", getLabTest);
  // }, []);

  const handleRemoveTest = (item) => {
    setValue(
      'labTest',
      getLabTest.filter((el) => el !== item.id)
    );
  };

  return (
    <>
      <Box sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
        <List
          disablePadding
          sx={{
            '& .Mui-selected:hover': {
              color: (theme) => theme.palette.grey[900],
            },
            '& .Mui-selected': {
              background: (theme) => `${theme.palette.primary.main} !important`,
              color: (theme) => theme.palette.primary.contrastText,
            },
          }}
        >
          <Scrollbar
            sx={{
              maxHeight: '500px',
            }}
          >
            {country &&
              country.map((item) => (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={(event) => handleListItemClick(event, item)}
                      selected={countryId === item.id}
                    >
                      <ListItemText
                        sx={{ fontSize: '0.875rem' }}
                        primary={item?.countryName}
                        disableTypography
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </Scrollbar>
        </List>
      </Box>
      <br /> <br />
      <Card sx={{ border: `1px solid ${theme.palette.grey[400]}` }}>
        <CardHeader
          action={
            <IconButton aria-label='settings' size='small' onClick={handleExpand}>
              <ArrowDropDown />
            </IconButton>
          }
          sx={{
            background:
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
            p: 1,
          }}
          title={
            <Typography variant='body1' fontWeight={600}>
              Selected Lab Order
            </Typography>
          }
        />
        <Collapse in={expand} timeout='auto'>
          <CardContent sx={{ p: 1 }}>
            <Scrollbar
              sx={{
                maxHeight: '300px',
                '& .simplebar-content': {
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                },
              }}
            >
              {state
                .filter((item) => getLabTest.includes(item.id))
                .map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '5px 0px',
                      borderBottom: `1px solid ${theme.palette.grey[200]}`,
                    }}
                  >
                    <Typography variant='body2'>{item.stateName}</Typography>
                    <span>
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => {
                          handleRemoveTest(item);
                        }}
                      >
                        <Delete fontSize='20px' />
                      </IconButton>
                    </span>
                  </div>
                ))}
            </Scrollbar>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
