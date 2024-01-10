import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogTitle,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { RHFCheckbox } from 'components/hook-form';
//
import { useForm, FormProvider } from 'react-hook-form';

export default function StaffPrivilege({ onClose, allPrivileges, privilegesVal, selectedRole }) {
  //fixing input changing from uncontrolled to controlled error
  const [selectedTab, setSelectedTab] = useState(selectedRole.roleName);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };
  //selecting default values from the saved or from  the api data directly
  const defaultValues = Object.assign(
    {},
    ...Object.values(allPrivileges)
      .flat()
      .flatMap(({ items }) =>
        items.flatMap((item) => {
          if (!item.subItems.length) {
            return item;
          } else {
            return item.subItems.map((child) => child);
          }
        })
      )
      .map((feature) => {
        if (!privilegesVal.current) {
          return {
            [feature.featureId]: {
              view: feature.privilege[0] === '1' ? true : false,
              create: feature.privilege[1] === '1' ? true : false,
              edit: feature.privilege[2] === '1' ? true : false,
            },
          };
        } else {
          return {
            [feature.featureId]: {
              view: privilegesVal.current[feature.featureId].view,
              create: privilegesVal.current[feature.featureId].create,
              edit: privilegesVal.current[feature.featureId].edit,
            },
          };
        }
      })
  );

  const methods = useForm({ defaultValues });

  const onSubmit = (formData) => {
    privilegesVal.current = formData;
    onClose();
  };

  return (
    <Dialog open maxWidth='md' fullWidth>
      {/* <DialogTitle>Configure Privilege</DialogTitle> */}
      <DialogContent dividers>
        {/* if data is there then render the form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box
              sx={{
                border: 1,
                padding: 0.5,
                borderColor: 'divider',
                marginBottom: 1,
                display: 'inline-block',
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                TabIndicatorProps={{ hidden: true }}
                aria-label='privilege tabs'
                sx={{ minHeight: 35 }}
              >
                {Object.keys(allPrivileges).map((tab) => (
                  <Tab
                    key={tab}
                    label={tab}
                    value={tab}
                    sx={{
                      fontSize: '1rem',
                      '&.MuiTab-root': {
                        minWidth: 96,
                        paddingInline: 1,
                        paddingBlock: 0,
                        minHeight: 35,
                      },
                      '&.MuiTab-root.Mui-selected': {
                        backgroundColor: 'primary.lighter',
                        color: 'primary.darker',
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            <Options selectedTab={selectedTab} data={allPrivileges} />
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={methods.handleSubmit(onSubmit)}>
          Save
        </Button>
        <Button variant='outlined' color='error' onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CheckBoxUI({ item }) {
  const name = item.featureId;

  return (
    <Stack direction='row' columnGap={4} justifyContent='flex-end'>
      <Stack>
        <RHFCheckbox name={name + '.view'} />
      </Stack>
      <Stack>
        <RHFCheckbox name={name + '.create'} />
      </Stack>
      <Stack>
        <RHFCheckbox name={name + '.edit'} />
      </Stack>
    </Stack>
  );
}

function Options({ data, selectedTab }) {
  return (
    <>
      <Box sx={{ backgroundColor: 'divider' }}>
        <Grid container alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='subtitle1' align='center'>
              Privilege List
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack direction='row' columnGap={5} justifyContent='center' alignItems='center'>
              <Stack>
                <Typography variant='subtitle2'>View</Typography>
              </Stack>
              <Stack>
                <Typography variant='subtitle2'>Create</Typography>
              </Stack>
              <Stack>
                <Typography variant='subtitle2'>Edit</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: '70vh', overflow: 'auto', border: 1, borderColor: 'divider' }}>
        {data[selectedTab]?.map((main) => (
          <Box
            key={main.subheader}
            // pb={1}
          >
            <Typography
              variant='subtitle1'
              pl={1}
              sx={{ backgroundColor: 'primary.lighter', color: 'primary.darker' }}
            >
              {main.subheader}
            </Typography>
            {/* Header - PART - END */}

            {main.items.map((item, i) => (
              <Box
                px={2}
                key={i}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  ':last-child': { border: 'none' },
                }}
              >
                <Grid container alignItems='center'>
                  <Grid item xs={8}>
                    <Typography color={'text.primary'} variant='body1'>
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {!item.subItems.length && <CheckBoxUI item={item} />}
                  </Grid>
                </Grid>

                {/* CHILDREN PART - START */}
                {item.subItems &&
                  item.subItems.map((child, j) => (
                    <Box
                      ml={2}
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        ':last-child': { border: 'none' },
                      }}
                      key={i + j}
                    >
                      <Grid container alignItems='center'>
                        <Grid item xs={8} style={{ position: 'relative' }}>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                              ':after': {
                                content: '""',
                                position: 'absolute',
                                width: '1px',
                                height: '40px',
                                left: -8,
                                top: -12,
                                backgroundColor: 'primary.light',
                              },

                              '::before': {
                                content: '""',
                                position: 'absolute',
                                width: '1px',
                                height: '6px',
                                left: -4,
                                top: 8,
                                rotate: '90deg',
                                backgroundColor: 'primary.light',
                              },
                            }}
                          >
                            {child.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <CheckBoxUI item={child} />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
}
