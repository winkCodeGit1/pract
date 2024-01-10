/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table as MUiTable,
  Checkbox,
  LinearProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import { RHFTextField, RHFSelect, RHFRadioGroup } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  labGroupTestById,
  labGroupTestSave,
  labSampleTypeAll,
  labSpecimenContainerAll,
  labTestGetBySampleId,
} from 'pages/api/lab';
// import Table from 'components/table';
import { Add, Clear, Delete, Search } from '@mui/icons-material';
import { restrict } from 'utils/restrict';
import { useEffect, useState } from 'react';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
// import { useState } from 'react';
const statusOption = [true, false];
const defaultInvItemsArray = {
  labSpecimenContainerId: '',
  qty: '',
  remarks: '',
};
const defaultValues = {
  testContainerDtos: [defaultInvItemsArray],
  groupName: '',
  sampleTypeId: '',
  sampleQty: '',
  departmentId: '',
  labTestTypeId: '',
  active: true,
};
const Schema = yup.object().shape({
  groupName: yup.string().trim().required('Required'),
  sampleTypeId: yup.string().trim().required('Required'),
  labTestTypeId: yup.string().trim().required('Required'),
  sampleQty: yup.string().trim().required('Required'),
  active: yup.boolean(),
});

export default function AddGroupTestNormalValue({ onClose, row, isEditMode }) {
  const queryClient = useQueryClient();
  const [selectedTest, setSelectedTest] = useState([]);
  const [allLabTestBySampleId, setAllLabTestBySampleId] = useState([]);
  const [selectedSampleUnit, setSelectedSampleUnit] = useState('N/A');
  const [term, setTerm] = useState('');
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit, watch, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testContainerDtos',
  });

  const mutation = useMutation({
    mutationFn: (req) => labGroupTestSave({ req, isEditMode }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['labGroupTestAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    console.log(data);

    if (selectedTest.length > 0) {
      const req = {
        ...data,
        singleTestVals: selectedTest.map((el) => el.id),
        testContainerDtos: data.testContainerDtos.filter((el) => el.labSpecimenContainerId),
      };
      mutation.mutate(req);
    } else {
      toast.info('Select atleast on test');
    }
  };

  const { data: SampleData } = useQuery({
    queryKey: ['labSampleTypeAll'],
    queryFn: labSampleTypeAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const sampleId = watch('sampleTypeId');
  const { data: labTestBySampleId, isFetching } = useQuery({
    queryKey: ['labTestGetBySampleId', sampleId],
    queryFn: labTestGetBySampleId,
    enabled: !!sampleId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: ContainerList } = useQuery({
    queryKey: ['labSpecimenContainerAll'],
    queryFn: labSpecimenContainerAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });
  const handleSingleCheck = (e, v) => {
    if (e.target.checked) {
      setSelectedTest((ps) => [...ps, v]);
    } else {
      const filterData = selectedTest.filter((el) => el.id !== v.id);
      setSelectedTest(filterData);
    }
  };
  useEffect(() => {
    if (Array.isArray(labTestBySampleId)) {
      setAllLabTestBySampleId(labTestBySampleId);
    }
  }, [labTestBySampleId]);

  useEffect(() => {
    const resetField = async () => {
      try {
        const testDto = await labGroupTestById(row.id);

        reset(testDto);
        setSelectedTest(row.labTests);

        setSelectedSampleUnit(
          SampleData?.find((el) => el.id === +row.sampleTypeId).labTestUnitName
        );
      } catch (error) {
        toast.error('failde to set value');
      }
    };
    if (isEditMode) {
      resetField();
    }
  }, []);
  const handleSearch = (value) => {
    const searchTerm = value.trim();
    if (searchTerm) {
      const filterData = labTestBySampleId?.filter(
        (el) =>
          el.labTestCategoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          el.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAllLabTestBySampleId(filterData);
    } else {
      setAllLabTestBySampleId(labTestBySampleId || []);
    }
  };
  console.log(row, 'row');
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Update' : 'Add'} Group Test`}
      maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
      onReset={!isEditMode ? () => reset() : undefined}
      fullWidth
      loading={mutation.isPending}
      hiddenReset
      // disabled={selectedTest.length > 0}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <RHFTextField
              name='groupName'
              placeholder='Group Test Name'
              label='Group Test Name'
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect
              name='labTestTypeId'
              label='Department Type'
              placeholder='Department Type'
              required
              disabled={isEditMode}
              size='small'
            >
              <MenuItem value=''>Select Department Type</MenuItem>
              {[
                { label: 'Pathalogy or Biochemistry', value: 1 },
                { label: 'Radiology', value: 2 },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant='body2'>
              Select Sample Name<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Stack
              flexDirection='row'
              alignContent={'center'}
              gap={1}
              flexWrap={'wrap'}
              flexGrow={1}
            >
              <span style={{ flex: 1 }}>
                <RHFSelect
                  name='sampleTypeId'
                  required
                  onInputChange={(e) => {
                    setSelectedTest([]);
                    setTerm('');
                    if (e.target.value) {
                      setSelectedSampleUnit(
                        SampleData?.find((el) => el.id === +e.target.value).labTestUnitName
                      );
                    }
                  }}
                  disabled={isEditMode}
                  size='small'
                >
                  <MenuItem value=''>Select Sample Name</MenuItem>
                  {SampleData?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.sampleName}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </span>
              <RHFTextField
                name='sampleQty'
                sx={{ maxWidth: '200px' }}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' color='text.secondary'>
                      {selectedSampleUnit ?? 'N/A'}
                    </Typography>
                  ),
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <TextField
              size='small'
              placeholder='Search by test name'
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              sx={{ maxWidth: 300, float: 'right', mb: 1, mt: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      size='small'
                      disabled={!term}
                      onClick={() => {
                        setTerm('');
                        handleSearch('');
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <MUiTable size='small'>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Short Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allLabTestBySampleId?.length > 0 ? (
                  allLabTestBySampleId?.map((el, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        background: (theme) =>
                          selectedTest?.findIndex((item) => item.id === el.id) !== -1
                            ? theme.palette.mode === 'light'
                              ? theme.palette.grey[300]
                              : theme.palette.grey[600]
                            : 'inherit',
                      }}
                    >
                      <TableCell sx={{ width: '100px' }}>
                        <Checkbox
                          size='small'
                          sx={{ margin: 0, fontSize: '13px' }}
                          checked={selectedTest?.findIndex((item) => item.id === el.id) !== -1}
                          onChange={(e) => {
                            handleSingleCheck(e, el);
                          }}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell>{el.labTestCategoryName}</TableCell>
                      <TableCell>{el.testName}</TableCell>
                      <TableCell>{el.shortCode}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align='center'>
                      No Record to display {isFetching && <LinearProgress />}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </MUiTable>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1' sx={{ mb: 0.3 }}>
              Required Inventory Item
            </Typography>
            <TableContainer>
              <MUiTable size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Container Type</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>
                      <IconButton
                        size='small'
                        color='secondary'
                        sx={{
                          background: (theme) => theme.palette.primary.lighter,
                          color: (theme) => theme.palette.primary.dark,
                        }}
                        onClick={() => {
                          append(defaultInvItemsArray);
                        }}
                      >
                        <Add fontSize='13px' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <RHFSelect
                          name={`testContainerDtos[${index}].labSpecimenContainerId`}
                          required
                          sx={{ minWidth: '150px' }}
                        >
                          <MenuItem value=''>Container Type</MenuItem>
                          {ContainerList?.map((option) => (
                            <MenuItem key={option.containerId} value={option.containerId}>
                              {option.specimenContainerName}
                            </MenuItem>
                          ))}
                        </RHFSelect>
                      </TableCell>

                      <TableCell>
                        <RHFTextField
                          name={`testContainerDtos[${index}].qty`}
                          placeholder='Quantity'
                          disabled={!watch(`testContainerDtos[${index}].labSpecimenContainerId`)}
                          onInput={restrict.number}
                        />
                      </TableCell>
                      <TableCell>
                        <RHFTextField
                          name={`testContainerDtos[${index}].remarks`}
                          placeholder='Enter Remarks'
                          disabled={!watch(`testContainerDtos[${index}].labSpecimenContainerId`)}
                          onInput={restrict.remarks}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color='error'
                          size='small'
                          onClick={() => {
                            remove(index);
                          }}
                          disabled={index === 0}
                        >
                          <Delete fontSize='13px' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MUiTable>
            </TableContainer>
            {isEditMode ? (
              <Grid item xs={12}>
                <RHFRadioGroup
                  label=''
                  name='active'
                  options={statusOption}
                  getOptionLabel={['Active', 'Inactive']}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
