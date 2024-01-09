/** @format */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import { useQuery } from '@tanstack/react-query';
import Scrollbar from 'components/Scrollbar';
import { ArrowDropDown, Clear, Delete, Search } from '@mui/icons-material';
import LoadingScreen from 'components/LoadingScreen';
import { RHFToggleButton } from 'components/hook-form';
import { useFormContext } from 'react-hook-form';
import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import useProgressBar from 'hooks/useProgressBar';
import { getAllInvSampleTypesLabTestsAndGroupTestsNew } from 'api';

export default function LabTestOrder({ stateName }) {
  const theme = useTheme();
  const [sampleId, setSampleId] = React.useState('');
  const [expand, setExpand] = React.useState(true);
  const { watch, setValue, getValues } = useFormContext();
  const [, progressBar] = useProgressBar();
  const [labData, setLabData] = useState(null);
  const [selectedLabTest, setSelectedLabTest] = useState([]);

  const getLabTest = watch(stateName + '.labTest') || [];
  const labTestGroupName = watch(stateName + '.labTestGroupName') || [];

  const { data: country = [], isPending: CountryLoading } = useQuery({
    queryKey: ['consultation', 'lab'],
    queryFn: getAllInvSampleTypesLabTestsAndGroupTestsNew,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
  console.log(progressBar, 'ppp');
  const handleListItemClick = (e, item) => {
    setSampleId(item.sampleTypeId);
    const filterLab = country.find((el) => el.sampleTypeId === item.sampleTypeId);
    console.log(filterLab, 'filterLab');
    setLabData(filterLab);
    //  const filterLab=country.filter((el)=>el.sampleTypeId===item.id)
  };
  const handleExpand = () => {
    setExpand((ps) => !ps);
  };

  const handleRemoveTest = (item) => {
    setValue(
      stateName + '.labTest',
      getLabTest.filter((el) => el !== item.id)
    );
  };

  function removeDuplicatesByProperty(arr, prop) {
    const uniqueMap = new Map();
    const result = [];

    for (const item of arr) {
      if (!uniqueMap.has(item[prop])) {
        uniqueMap.set(item[prop], true);
        result.push(item);
      }
    }

    return result;
  }

  const handleLabGroupChange = (id) => {
    console.log(id, 'id', getValues(), labTestGroupName);

    const findIndex = labTestGroupName?.findIndex((el) => el === sampleId + '-' + id);
    const labTestIds = labData.labTests
      .filter((el) => el.labGroupId?.includes(id))
      .map((el) => sampleId + '-' + el.id);

    // console.log([...getLabTest, ...labTestIds], "data-handleLabGroupChange");

    if (findIndex === -1) {
      setValue(stateName + '.labTest', [...getLabTest, ...labTestIds]);
    } else {
      const filterLabIds = labData.labTests
        ?.filter((el) => el.labGroupId?.includes(id))
        .map((item) => sampleId + '-' + item.id);

      const filterFinalLab = getLabTest.filter((el) => !filterLabIds?.includes(el));
      console.log(getLabTest, 'getLabTest', filterLabIds);

      setValue(stateName + '.labTest', filterFinalLab);
    }
  };

  const getSelectedLabTest = () => {
    const selectedTest = [];
    console.log(getLabTest, 'getLabTest');

    const NewSampleId = [];
    getLabTest.forEach((el) => {
      if (NewSampleId.indexOf(el.split('-')[0]) === -1) {
        NewSampleId.push(el.split('-')[0]);
      }
    });

    country.forEach((el) => {
      el.labTests.forEach((item) => {
        NewSampleId.forEach((id) => {
          if (getLabTest.includes(id + '-' + item?.id)) {
            selectedTest.push(item);
          }
        });
      });
    });

    const getfilterData = removeDuplicatesByProperty(selectedTest, 'id');
    setSelectedLabTest(getfilterData);
  };
  useEffect(() => {
    getSelectedLabTest();
  }, [getValues(stateName + '.labTest'), getValues(stateName + '.labTestGroupName')]);
  // React.useEffect(()=>{
  //   setValueFetchData("https://ehr.ayush.gov.in/ahmis-master-services/icdCode/getAllIcdCodesForPres")
  // },[])

  console.log('getValues', getValues(stateName + '.labTest'));

  return (
    <>
      <div
        style={{
          width: 300,
          background: '#dbd5d5',
          borderRadius: '10px',
          height: '30px',
        }}
      >
        <span
          style={{
            width: `${progressBar ? progressBar : 0}%`,
            background: 'red',
            borderRadius: '10px',
            overflow: 'hidden',
            height: '100%',
            display: 'block',
          }}
        ></span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
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
                  '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }}
              >
                {CountryLoading && <p>No Record to display</p>}
                <React.Suspense fallback={<LoadingScreen />}>
                  {country &&
                    country.map((item, index) => (
                      <>
                        <ListItem disablePadding key={index}>
                          <ListItemButton
                            onClick={(event) => handleListItemClick(event, item)}
                            selected={sampleId === item.sampleTypeId}
                          >
                            <ListItemText
                              sx={{ fontSize: '0.875rem' }}
                              primary={item?.sampleName}
                              disableTypography
                            />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                </React.Suspense>
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
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
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
                  {selectedLabTest &&
                    selectedLabTest?.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          margin: '5px 0px',
                          borderBottom: `1px solid ${theme.palette.grey[200]}`,
                        }}
                      >
                        <Typography variant='body2'>{item?.name}</Typography>
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
        </Grid>
        <Grid item xs={9} style={{ position: 'relative' }}>
          <React.Suspense fallback={<LoadingScreen />}>
            <Box justifyContent={'flex-end'} display={'flex'}>
              <TextField
                size='small'
                variant='outlined'
                placeholder='Search Group test..'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search style={{ color: theme.palette.grey[500] }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' size='small'>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <fieldset
              style={{
                width: '100%',
                border: `1px solid ${theme.palette.grey[400]}`,
                padding: '5px',
              }}
            >
              <legend style={{ marginLeft: '15px', fontSize: '0.875rem' }}>Group Test</legend>

              <RHFToggleButton
                name={stateName + '.labTestGroupName'}
                sx={toggleButtonGroupStyle}
                aria-label='text formatting'
                prefix={sampleId}
              >
                {labData &&
                  labData?.labGroups?.map((item) => (
                    <ToggleButton
                      value={sampleId + '-' + item.id}
                      aria-label='bold'
                      size='small'
                      onClick={() => {
                        console.log(item);
                        handleLabGroupChange(item.id);
                        // getSelectedLabTest();
                      }}
                      key={item.id}
                      sx={toggleButtonStyle}
                    >
                      {item.name}
                    </ToggleButton>
                  ))}
              </RHFToggleButton>
            </fieldset>
            <br />
            <fieldset
              style={{
                width: '100%',
                border: `1px solid ${theme.palette.grey[400]}`,
                padding: '5px',
              }}
            >
              <legend style={{ marginLeft: '15px', fontSize: '0.875rem' }}>Lab Test</legend>

              <RHFToggleButton
                name={stateName + '.labTest'}
                sx={toggleButtonGroupStyle}
                aria-label='text formatting'
              >
                {labData &&
                  labData?.labTests?.map((item, index) => (
                    <ToggleButton
                      value={sampleId + '-' + item.id}
                      aria-label='bold'
                      size='small'
                      key={index}
                      onClick={(e) => {
                        console.log(e.target);
                        // getSelectedLabTest();
                      }}
                      sx={toggleButtonStyle}
                    >
                      {item.name}
                    </ToggleButton>
                  ))}
              </RHFToggleButton>
            </fieldset>
          </React.Suspense>
        </Grid>
      </Grid>
    </>
  );
}
