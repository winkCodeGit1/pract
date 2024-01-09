/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FormProvider, RHFCheckbox, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import PatientInfo from '../PatientInfo';
// import { LoadingButton } from '@mui/lab';
import UpdateCollectedSample from './UpdateCollectedSample';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DialogActions from '@mui/material/DialogActions';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { labOrderGetSampleByConsultationId, labSampleCollect } from 'pages/api/lab';
import { groupBy } from 'utils/lodash';
import DialogBox from 'components/DialogBox';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';

let gs;
export default function CollectSample({ selectedPatient, onClose, isEditMode }) {
  // console.log(selectedPatient);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user);
  const [openAlert, setOpenAlert] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const { data: sampleData, isLoading } = useQuery({
    queryKey: ['labOrderGetSampleByConsultationId', selectedPatient?.consultationId],
    queryFn: labOrderGetSampleByConsultationId,
    enabled: !!selectedPatient?.consultationId,
  });

  useEffect(() => {
    setUploadedData(sampleData);
    gs = groupBy(
      (sampleData?.toBeCollectedSample || []).map((el) => ({
        ...el,
        isSelected: true,
        qty: el.sampleQuantity,
      })),
      (obj) => obj.sampleType
    );
    reset({ testList: gs, sampleCollectedDate: new Date() });
  }, [sampleData]);

  const generateSchema = () => {
    const dynamicKeys = Object.keys(gs || {});
    const dynamicObjectShape = {};
    dynamicKeys.forEach((key) => {
      dynamicObjectShape[key] = yup.array().of(
        yup.object().shape({
          qty: yup
            .string()
            .trim()
            .notRequired()
            .when('isSelected', (isSelected) => {
              console.log(isSelected[0], 'countryId');
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
    }),
    sampleCollectedDate: yup
      .date('Invalid')
      .nullable()
      .required('This field is required')
      .typeError('Invalid Date')
      .max(new Date(), 'Future date not allowed'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
  });

  const { handleSubmit, reset, getValues, watch } = methods;

  const mutation = useMutation({
    mutationFn: (req) => labSampleCollect({ req, isEditMode }),
    onSuccess: (data) => {
      setUploadedData(data.data);
      setOpenAlert(false);
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['labOrderGetSampleByConsultationId'] });
      queryClient.invalidateQueries({ queryKey: ['labOrderGetBacklogLabOrderDetail'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  function handleSampleSubmit(type) {
    let sampleList = [];

    Object.values(getValues('testList'))
      .flat()
      .forEach((item) => {
        if (item.isSelected) {
          sampleList.push({
            quantity: item.qty,
            remarks: item.remarks,
            labOrderId: item.labOrderId,
          });
        }
      });

    let req = {
      received: false,
      createdBy: user.staffId,
      consultationId: selectedPatient.consultationId,
      sampleList,
    };

    if (type === '2') {
      req.received = true;
    }
    mutation.mutate(req);
  }

  return (
    <>
      <DialogBox
        title={isEditMode ? 'Update Collected Sample' : 'Collect Sample'}
        onClose={onClose}
        fullScreen
      >
        <PatientInfo row={selectedPatient} />

        {uploadedData?.toBeCollectedSample?.length != 0 && (
          <>
            <FormProvider methods={methods} onSubmit={handleSubmit(handleSampleSubmit)}>
              {isLoading || mutation.isPending ? (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: '450px' }}>
                  <Table size='small' stickyHeader>
                    <TableHead>
                      <TableRow
                        sx={{
                          '.MuiTableCell-head': {
                            background: (theme) => theme.palette.grey[600],
                            color: (theme) => theme.palette.common.white,
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            width: '64px',
                          }}
                        >
                          #
                        </TableCell>
                        <TableCell>Test Name</TableCell>
                        <TableCell>Test Type</TableCell>
                        <TableCell>Container Type/Quantity</TableCell>
                        <TableCell>Doctor Remark</TableCell>
                        <TableCell
                          sx={{
                            width: 150,
                          }}
                        >
                          Sample Qty
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 150,
                          }}
                        >
                          Collected Qty
                        </TableCell>

                        <TableCell>Remarks</TableCell>
                        {/* <TableCell>Action</TableCell> */}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {getValues('testList') &&
                        Object.entries(getValues('testList'))?.map(([key, values]) => (
                          <Fragment key={key}>
                            <TableRow
                              sx={{
                                background: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                              }}
                            >
                              <TableCell colSpan={8}>
                                <Typography align='left' variant='subtitle1'>
                                  {key}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            {values?.map((item, index) => (
                              <Fragment key={item.id}>
                                <TableRow key={item.id}>
                                  <TableCell sx={{ width: '64px' }}>
                                    <RHFCheckbox
                                      name={`testList.${key}.[${index}].isSelected`}
                                      defaultChecked={item.isSelected}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {item?.testName}{' '}
                                    {item.isConfidential && (
                                      <span style={{ color: 'red' }}>(is Confidential)</span>
                                    )}
                                  </TableCell>
                                  <TableCell>{item.testType}</TableCell>

                                  <TableCell>
                                    {item.containerTypeQuantity.map((el) => (
                                      <>
                                        <Typography variant='body2' key={el}>
                                          {el}
                                        </Typography>
                                      </>
                                    ))}
                                  </TableCell>

                                  <TableCell>{item.doctorRemarks}</TableCell>
                                  <TableCell>{item.sampleQuantity}</TableCell>
                                  <TableCell>
                                    <RHFTextField
                                      name={`testList.${key}.[${index}].qty`}
                                      placeholder='Collected Quantity'
                                      disabled={!watch(`testList.${key}.[${index}].isSelected`)}
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <RHFTextField
                                      name={`testList.${key}.[${index}].remarks`}
                                      placeholder='Remarks'
                                      multiline
                                      maxRows={2}
                                      inputProps={{ maxLength: 200 }}
                                      disabled={!watch(`testList.${key}.[${index}].isSelected`)}
                                    />
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <Grid container spacing={1} sx={{ mt: 1 }} alignItems='center'>
                <Grid item xs={1}>
                  <Typography variant='body2'>Sample Collect Date</Typography>
                </Grid>
                <Grid item xs={2}>
                  <RHFDatePicker name='sampleCollectedDate' disableFuture />
                </Grid>
                {isEditMode && (
                  <Grid item xs={2} textAlign='center'>
                    <RHFCheckbox name='isReceived' label='Is Received' />
                  </Grid>
                )}
                {/* <Grid item textAlign='right' xs={7}>
              <LoadingButton type='submit' variant='contained' size='medium' color='secondary'>
                Submit
              </LoadingButton>
            </Grid> */}
              </Grid>
            </FormProvider>
            <Divider sx={{ mt: 1 }} />
          </>
        )}
        <UpdateCollectedSample
          testData={uploadedData?.collectedSample || []}
          type='sampleCollection'
          isEditMode={isEditMode}
        />
        <DialogActions>
          <>
            {!isEditMode && (
              <LoadingButton
                loading={mutation.isLoading}
                variant='contained'
                onClick={() => setOpenAlert(true)}
                size='small'
                type='submit'
                disabled={!uploadedData}
              >
                Submit
              </LoadingButton>
            )}

            <Button variant='contained' onClick={onClose} color='error' size='small'>
              Close
            </Button>
          </>
        </DialogActions>
      </DialogBox>
      {openAlert && (
        <DialogBox title='Action Required' onClose={() => setOpenAlert(false)} maxWidth='xs'>
          <Typography variant='subtitle1' color='black'>
            Please Choose Sample Collection Type
          </Typography>

          <Box sx={{ justifyContent: 'center', py: 2 }}>
            <Button
              onClick={() => {
                handleSampleSubmit('1');
              }}
              loading={mutation.isLoading}
              variant='contained'
              color='inherit'
              size='small'
            >
              Only Sample Collection
            </Button>
            <Button
              variant='contained'
              color='secondary'
              loading={mutation.isLoading}
              onClick={() => {
                handleSampleSubmit('2');
              }}
              size='small'
            >
              Collect & Receive Sample
            </Button>
          </Box>
        </DialogBox>
      )}
    </>
  );
}
