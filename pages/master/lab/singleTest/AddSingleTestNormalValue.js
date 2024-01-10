/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  // Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { RHFTextField, RHFSelect, RHFRadioGroup, RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useFieldArray } from 'react-hook-form';
import { Add, Delete } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  labSampleTypeAll,
  labSpecimenContainerAll,
  labTestById,
  labTestMethodAll,
  labTestSave,
  labTestUnitAll,
} from 'pages/api/lab';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
const statusOption = [true, false];
// const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
// const checkedIcon = <CheckBoxIcon fontSize='small' />;
import { restrict } from 'utils/restrict';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const defaultInvItemsArray = {
  labSpecimenContainerId: '',
  qty: '',
  remarks: '',
};
const defaultValueRange = {
  patientCategory: '',
  minValue: null,
  maxValue: null,
  remarks: '',
};
const defaultValues = {
  testContainerDtos: [defaultInvItemsArray],
  testNormalValueDtos: [defaultValueRange],
  findingsUnitId: '',
  testMethod: [],
  sampleTypeId: '',
  labTestCategoryId: '',
  sampleQty: '',
  status: true,
};
const testValueSchema = yup.object().shape({
  patientCategory: yup.string().trim().required('Required'),
  minValue: yup
    .number()
    .nullable()
    .notRequired()
    .min(0, 'Minimum value should be 1')
    .typeError('Enter a valid No.')
    .transform((_, val) => (val ? +val : null)),
  maxValue: yup
    .number()
    .nullable()
    .notRequired()
    .transform((_, val) => (val === Number(val) ? val : null))
    .when('minValue', (minValue) => {
      if (minValue[0] !== null) {
        return yup
          .number()
          .nullable()
          .notRequired()
          .min(minValue, `Value Should Be more than ${minValue}`)
          .transform((_, val) => (val ? +val : null));
      }
    }),
});
const Schema = yup.object().shape({
  testName: yup.string().trim().required('Required'),
  // testMethod: yup.array().min(1, 'select min 1'),
  sampleTypeId: yup.string().trim().required('Required'),
  sampleQty: yup.string().trim().required('Required'),
  findingsUnitId: yup.string().trim().required('Required'),
  labTestCategoryId: yup.string().trim().required('Required'),
  testNormalValueDtos: yup.array().of(testValueSchema),
  status: yup.boolean(),
});
export default function AddSingleTestNormalValue({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const [selectedSampleUnit, setSelectedSampleUnit] = useState('N/A');
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit, control, watch } = methods;

  const mutation = useMutation({
    mutationFn: (req) => labTestSave({ req, isEditMode }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['labTestAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    const req = {
      ...data,
      testMethodIds: data.testMethod.map((el) => el.id),
      testContainerDtos: data.testContainerDtos.filter((el) => el.labSpecimenContainerId !== ''),
    };

    mutation.mutate(req);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testContainerDtos',
  });
  const {
    fields: NormanValue,
    append: appendNewTest,
    remove: removeSelectedTest,
  } = useFieldArray({
    control,
    name: 'testNormalValueDtos',
  });
  const { data: SampleData } = useQuery({
    queryKey: ['labSampleTypeAll'],
    queryFn: labSampleTypeAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: TestUnitList } = useQuery({
    queryKey: ['labTestUnitAll'],
    queryFn: labTestUnitAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });
  const { data: ContainerList } = useQuery({
    queryKey: ['labSpecimenContainerAll'],
    queryFn: labSpecimenContainerAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });
  const { data: testMethods } = useQuery({
    queryKey: ['labTestMethodAll'],
    queryFn: labTestMethodAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  useEffect(() => {
    const resetField = async () => {
      const data = await labTestById(row.id);

      reset({
        ...data,
        testMethod: testMethods?.filter((el) => data?.testMethodIds?.includes(el?.id)) || [],
      });
      setSelectedSampleUnit(SampleData?.find((el) => el.id === +row.sampleTypeId).labTestUnitName);
    };
    if (isEditMode) {
      resetField();
    }
  }, [isEditMode]);

  // console.log(watch('testNormalValueDtos'), errors, 'SampleData');
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Single Test`}
      maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      loading={mutation.isPending}
      fullWidth
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <RHFTextField name='testName' placeholder='Test Name' label='Test Name' required />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name='shortCode' placeholder='Short Name' label='Short Name' />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFSelect
              name='labTestCategoryId'
              label='Department Type'
              placeholder='Department Type'
              required
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
          <Grid item xs={12} md={5}>
            <Typography variant='body2'>
              Select Sample Name <span style={{ color: 'red' }}>*</span>
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
                    if (e.target.value) {
                      setSelectedSampleUnit(
                        SampleData?.find((el) => el.id === +e.target.value).labTestUnitName
                      );
                    }
                  }}
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
                sx={{ maxWidth: '100px' }}
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

          <Grid item xs={12} md={3}>
            <RHFSelect name='findingsUnitId' required label='Finding Units'>
              <MenuItem value=''>Select Finding Unit</MenuItem>
              {TestUnitList?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.unitName}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFAutoComplete
              name='testMethod'
              placeholder='Test Method'
              label='Test Method'
              options={testMethods || []}
              disableCloseOnSelect
              multiple
              // renderOption={(props, option, { selected }) => (
              //   <li {...props}>
              //     <Checkbox
              //       icon={icon}
              //       checkedIcon={checkedIcon}
              //       style={{ marginRight: 8 }}
              //       checked={selected}
              //     />
              //     {option?.label}
              //   </li>
              // )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle1' sx={{ mb: 0.3 }}>
              Required Inventory Item
            </Typography>
            <TableContainer>
              <Table size='small'>
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
                  {fields.map((item, index) => (
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
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1' sx={{ mb: 0.3 }}>
              Value Range
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Min </TableCell>
                    <TableCell>Max </TableCell>
                    <TableCell>Remarks </TableCell>
                    <TableCell>
                      <IconButton
                        size='small'
                        color='secondary'
                        sx={{
                          background: (theme) => theme.palette.primary.lighter,
                          color: (theme) => theme.palette.primary.dark,
                        }}
                        onClick={() => {
                          appendNewTest(defaultValueRange);
                        }}
                      >
                        <Add fontSize='13px' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {NormanValue?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <RHFSelect
                          name={`testNormalValueDtos[${index}].patientCategory`}
                          required
                          sx={{ minWidth: '150px' }}
                        >
                          <MenuItem value=''>Select Category</MenuItem>
                          {[
                            { label: 'Male', value: 'M' },
                            { label: 'Female', value: 'F' },
                            { label: 'Child', value: 'K' },
                            { label: 'Common', value: 'C' },
                          ].map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              disabled={watch('testNormalValueDtos')?.find(
                                (el) => el.patientCategory === option.value
                              )}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </RHFSelect>
                      </TableCell>

                      <TableCell>
                        <RHFTextField
                          name={`testNormalValueDtos[${index}].minValue`}
                          placeholder='Min Value'
                          onInput={restrict.number}
                          disabled={!watch(`testNormalValueDtos[${index}].patientCategory`)}
                        />
                      </TableCell>
                      <TableCell>
                        <RHFTextField
                          name={`testNormalValueDtos[${index}].maxValue`}
                          placeholder='Max Value'
                          onInput={restrict.number}
                          disabled={!watch(`testNormalValueDtos[${index}].minValue`)}
                        />
                      </TableCell>
                      <TableCell>
                        <RHFTextField
                          name={`testNormalValueDtos[${index}].remarks`}
                          placeholder='Remarks'
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color='error'
                          size='small'
                          onClick={() => {
                            removeSelectedTest(index);
                          }}
                          disabled={index === 0}
                        >
                          <Delete fontSize='13px' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {isEditMode ? (
              <Grid item xs={12}>
                <RHFRadioGroup
                  label=''
                  name='status'
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
