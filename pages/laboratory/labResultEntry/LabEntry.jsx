/* eslint-disable no-unused-vars */
// import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FormProvider, RHFCheckbox, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PatientInfo from '../PatientInfo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { labSampleCollectCollectedSample, labTestResultSave } from 'pages/api/lab';
import { groupBy } from 'utils/lodash';
import { restrict } from 'utils/restrict';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import UpdateCollectedSample from '../collectSample/UpdateCollectedSample';
import { LoadingButton } from '@mui/lab';

let gs;
export default function LabEntry({ selectedPatient, onClose, isVerify }) {
  const queryClient = useQueryClient();
  const [isVerifyMode, setIsVerifyMode] = useState(false);
  const [allData, setAllData] = useState(null);
  const { data: collectedSample, isLoading } = useQuery({
    queryKey: ['labSampleCollectCollectedSample', selectedPatient?.consultationId],
    queryFn: labSampleCollectCollectedSample,
    enabled: !!selectedPatient?.consultationId,
  });

  useEffect(() => {
    setAllData(collectedSample);
    gs = groupBy(
      (collectedSample?.toBeCollectedTestResult || [])?.map((el) => ({
        ...el,
        isSelected: true,
      })),
      (obj) => obj.groupTestName
    );
    reset({ testList: gs });
  }, [collectedSample?.toBeCollectedTestResult]);

  const generateSchema = () => {
    const dynamicKeys = Object?.keys(gs || {});
    const dynamicObjectShape = {};
    dynamicKeys.forEach((key) => {
      dynamicObjectShape[key] = yup.array().of(
        yup.object().shape({
          value: yup
            .string()
            .trim()
            .notRequired()
            .when('isSelected', (isSelected) => {
              if (isSelected[0]) {
                return yup.string().trim().required('Required');
              }
            }),
        })
      );
    });
    return dynamicObjectShape;
  };
  const schemaData = generateSchema();

  const Schema = yup.object().shape({
    testList: yup.object().shape({
      ...schemaData,
      // bloodTest: yup.array().of(
      //   yup.object().shape({
      //     qty: yup.string().required('Quantity is required'),
      //   })
      // ),
    }),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
  });

  const { handleSubmit, reset, getValues } = methods;

  const mutation = useMutation({
    mutationFn: (req) => labTestResultSave({ req }),
    onSuccess: () => {
      toast.success(saveMessage);
      queryClient.invalidateQueries(['labSampleCollectCollectedSample']);
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    let resultList = [];

    Object.values(getValues('testList'))
      .flat()
      .forEach((item) => {
        if (item.isSelected) {
          resultList.push({
            testResult: item.value,
            labTestId: item.labTestId,
            remarks: item.Remarks,
            labOrderId: item.labOrderId,
            consultationId: selectedPatient?.consultationId,
          });
        }
      });

    mutation.mutate(resultList);
  };

  return (
    <FormWrapper
      title={isVerify ? 'Lab Test Verification' : 'Lab Result Entry'}
      onClose={onClose}
      maxWidth='xs'
      fullScreen
      // onSubmit={handleSubmit(onSubmit)}
    >
      <PatientInfo row={selectedPatient} />
      {isLoading && <LinearProgress />}
      {allData?.toBeCollectedTestResult?.length !== 0 && (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow
                  sx={{
                    '.MuiTableCell-head': {
                      background: (theme) => theme.palette.grey[600],
                      color: (theme) => theme.palette.common.white,
                    },
                  }}
                >
                  <TableCell sx={{ width: '64px' }}>#</TableCell>
                  <TableCell>Test Name</TableCell>

                  <TableCell>Doctor Remark</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              {Object.entries(getValues('testList') || {})?.map(([key, values]) => (
                <Fragment key={key}>
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    >
                      <Typography align='left' variant='subtitle1'>
                        {key === 'NA' ? 'Single Test' : key}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {(values || [])?.map((item, index) => (
                    <Fragment key={item.id}>
                      <TableRow key={item.id}>
                        <TableCell sx={{ width: '64px' }}>
                          <RHFCheckbox name={`testList.${key}.[${index}].isSelected`} />
                        </TableCell>
                        <TableCell>
                          {item.testName}{' '}
                          {item.isConfidential && (
                            <span style={{ color: 'red' }}>(is Confidential)</span>
                          )}
                        </TableCell>

                        <TableCell>{item.doctorRemarks}</TableCell>
                        <TableCell>
                          {isVerifyMode ? (
                            <Typography variant='subtitle2'>10 Ab-normal</Typography>
                          ) : (
                            <RHFTextField
                              name={`testList.${key}.[${index}].value`}
                              placeholder='Finding Value'
                              InputProps={{
                                endAdornment: (
                                  <Typography variant='caption' color='text.secondary'>
                                    ml
                                  </Typography>
                                ),
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Typography variant='body2' color='text.secondary'>
                                      10-100
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              onInput={restrict.number}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {isVerifyMode ? (
                            'Lab Entry Result Remark'
                          ) : (
                            <RHFTextField
                              name={`testList.${key}.[${index}].Remarks`}
                              multiline
                              maxRows={3}
                              placeholder='Remarks'
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </Table>
          </TableContainer>
          <Grid container spacing={1} justifyContent='flex-end' mt={2}>
            {isVerifyMode ? (
              <Grid item>
                <Button variant='contained' color='primary'>
                  Verify
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <LoadingButton
                  variant='contained'
                  color={isVerify ? 'success' : 'primary'}
                  onClick={handleSubmit(onSubmit)}
                  loading={mutation.isPending}
                >
                  {isVerify ? 'Verify & Submit' : 'Submit'}
                </LoadingButton>
              </Grid>
            )}
            {isVerify && (
              <Grid item>
                <Button
                  variant='contained'
                  color='warning'
                  onClick={() => {
                    setIsVerifyMode((ps) => !ps);
                  }}
                >
                  {isVerifyMode ? 'Edit' : 'Cancel Edit Mode'}
                </Button>
              </Grid>
            )}
          </Grid>
        </FormProvider>
      )}
      <UpdateCollectedSample testData={allData?.collectedTestResult || []} type='labEntry' />
    </FormWrapper>
  );
}
