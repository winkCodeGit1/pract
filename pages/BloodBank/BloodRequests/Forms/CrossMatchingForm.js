
//******* new Code Import  *********************/
// import { LoadingButton } from '@mui/lab';
// import { Grid, MenuItem, Typography } from '@mui/material';
import { Grid, MenuItem } from '@mui/material';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { BloodCrossmatchingSave } from 'pages/api/bloodbank';
// import { Close } from '@mui/icons-material';
// import Saviour from './Saviour';
// import DialogBox from 'components/DialogBox';
import FormWrapper from 'components/FormWrapper';

const bloodComponent = [
  { value: 'Whole Blood', label: 'Whole Blood' },
  { value: 'Single Donor Platelet', label: 'Single Donor Platelet' },
  { value: 'Single Donor Plasma', label: 'Single Donor Plasma' },
  { value: 'Sagm Packed Red Blood Cells', label: 'Sagm Packed Red Blood Cells' },
  { value: 'Random Donor Platelets', label: 'Random Donor Platelets' },
  { value: 'platelets additive solutions', label: 'platelets additive solutions' },
  { value: 'Platelet Rich Plasma', label: 'Platelet Rich Plasma' },
  { value: 'Platelet Poor Plasma', label: 'Platelet Poor Plasma' },
  { value: 'Platelet Concentrate(PC)', label: 'Platelet Concentrate(PC)' },
  { value: 'Plasma', label: 'Plasma' },
];

const crossmethod = [
  { value: 'Major', label: 'Major' },
  { value: 'Minor', label: 'Minor' },
  { value: 'Saline', label: 'Saline' }
];

const compatibleResult = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

export default function CrossMatchingForm({ onClose, selectedRow, isEditMode }) {

  // const queryClient = useQueryClient();
  // const [dialogOpen, setdialogOpen] = useState(false);

  // ***** New Code Import start ****************//
  const NewUserSchema = yup.object().shape({
    unitnosegmentno: yup.string().required('Unit No./Segment No. is required'),
    expirydate: yup.date('Invalid').required('Expiry Date is required'),
    bloodgroupofunit: yup.string().required('Blood group of unit is required'),
    typeofcomponent: yup.string().required('Type of Component is required'),
    methodofcrossmatchdetails: yup.string().required('Method of cross match details is required'),
    compatible: yup.string().required('Compatible is required'),
    testperformedbyname: yup.string().required('Test performed by name is required'),
    dateofissue: yup.date('Invalid').required('Date of issue is required'),
    timeofissue: yup.string().required('Time of issue is required'),
    issuedbyname: yup.string().required('Issued by name is required'),

  });

  const defaultValues = {
    bookingId: selectedRow?.bookingId,
    id: null,
    unitnosegmentno: null,
    expirydate: null,
    bloodgroupofunit: null,
    typeofcomponent: null,
    methodofcrossmatchdetails: null,
    compatible: null,
    testperformedbyname: null,
    dateofissue: null,
    timeofissue: null,
    issuedbyname: null,
    // bookingid: data?.bookingId,

  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (req) => BloodCrossmatchingSave({ req }),
    onSuccess: () => {
      // handledialog();
      // queryClient.invalidateQueries({ queryKey: ['getOTAllbloodregList'] });
      toast(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const {
    reset,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    var request = {
      ...data,
      id: +data.id,
      unitnosegmentno: data.unitnosegmentno,
      expirydate: data.expirydate,
      bloodgroupofunit: data.bloodgroupofunit,
      typeofcomponent: data.typeofcomponent,
      methodofcrossmatchdetails: data.methodofcrossmatchdetails,
      compatible: data.compatible,
      testperformedbyname: data.testperformedbyname,
      dateofissue: data.dateofissue,
      timeofissue: data.timeofissue,
      issuedbyname: data.issuedbyname,
      bookingid: data.bookingId,
    };
    console.log(request);
    reset();
    mutation.mutate(request);

  };


  useEffect(() => {
    if (isEditMode) {
      reset({
        ...selectedRow,
      });
    }
  }, [isEditMode, reset, selectedRow]);

  // console.log(selectedRow);

  // const handledialog = () => {
  //   setdialogOpen(true);
  // };

  // const handleDialogClose = () => {
  //   setdialogOpen(false);
  //   onClose();
  // };


  return (
    <>
      <FormWrapper
        onClose={onClose}
        title={(isEditMode ? 'Edit' : '') + ' Cross Matching '}
        maxWidth='md'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset(defaultValues)}
        loading={mutation.isLoading}
      >
        <FormProvider methods={methods} >
          <Grid container spacing={2} >

            <Grid item container xs={12} md={12} spacing={2} >
              <Grid item xs={12} md={12} >
                {/* <Typography variant='subtitle1'  >
                  Booking ID: {selectedRow?.bookingId}
                </Typography> */}
                <RHFTextField
                  label='Booking Id'
                  name='bookingId'
                  placeholder='Booking Id'
                  required
                  onInput={(e) => {
                    restrict.digits(e);
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6} >
                <Typography variant='subtitle1' >
                  Procedure Name: {selectedRow?.procedureName}
                </Typography>
                <RHFTextField
                  label='Blood Pressure'
                  name='bloodPressure'
                  placeholder='Enter Blood Pressure'
                  required
                  onInput={(e) => {
                    restrict.digits(e);
                  }}
                />
              </Grid> */}

            </Grid>

            <Grid item container xs={12} spacing={2} >
              <Grid item xs={12} sm={4}>
                <RHFTextField
                  label='Unit No./Segment No.'
                  name='unitnosegmentno'
                  placeholder='Unit No./Segment No.'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <RHFTextField
                                        label='Expiry Date'
                                        name='expirydate'
                                        placeholder='Expiry Date'
                                        type='date'
                                    /> */}
                <RHFDatePicker
                  name='expirydate'
                  label='Expiry Date'
                  inputFormat='dd-MM-yyyy'
                  sx={{ width: '100%' }}
                >
                </RHFDatePicker>
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField
                  label='Blood Group of Unit'
                  name='bloodgroupofunit'
                  placeholder='Blood Group of Unit'
                  onInput={(e) => {
                    restrict.number(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFSelect name='typeofcomponent' label='Type of Component' >
                  <MenuItem
                    value=''
                    sx={{
                      mx: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                    }}
                  >
                    Select Option
                  </MenuItem>
                  {bloodComponent.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFSelect name='methodofcrossmatchdetails' label='Method of Cross Match Details'>
                  <MenuItem
                    value=''
                    sx={{
                      mx: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                    }}
                  >
                    Select Option
                  </MenuItem>
                  {crossmethod.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <RHFTextField
                                        label='Compatible'
                                        name='compatible'
                                        placeholder='Compatible'
                                    /> */}
                <RHFSelect name='compatible' label='Compatible' >
                  <MenuItem
                    value=''
                    sx={{
                      mx: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                    }}
                  >
                    Select Option
                  </MenuItem>
                  {compatibleResult.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField
                  label='Test Performed by Name'
                  name='testperformedbyname'
                  placeholder='Test Performed by Name'
                  toUpperCase
                  inputProps={{ maxLength: 100 }}
                  onInput={(e) => {
                    restrict.name(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFDatePicker
                  name='dateofissue'
                  label='Date of Issue'
                  inputFormat='dd-MM-yyyy'
                  sx={{ width: '100%' }}
                >
                </RHFDatePicker>
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField
                  label='Time of Issue'
                  name='timeofissue'
                  placeholder='Time of Issue'
                  type='time'

                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RHFTextField
                  label='Issued by Name'
                  name='issuedbyname'
                  placeholder='Issued by Name'
                  toUpperCase
                  inputProps={{ maxLength: 100 }}
                  onInput={(e) => {
                    restrict.name(e);
                  }}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <Stack alignItems='center' sx={{ mt: 3 }}>
                  <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                    Save
                  </LoadingButton>
                </Stack>
              </Grid> */}
            </Grid>
          </Grid>
        </FormProvider>

      </FormWrapper>
      {/* <DialogBox open={dialogOpen}>
        <Saviour dialogProperty={handleDialogClose} title={selectedRow.donorRegistrationNumber} />
      </DialogBox> */}
    </>
  );
}
