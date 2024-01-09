import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
import { physicalExaminationDetailSave } from 'pages/api/bloodbank';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';
import * as Yup from 'yup';
import Saviour from './Saviour';
import DialogBox from 'components/DialogBox';

export default function PhysicalExaminationForm({ onClose, selectedRow, isEditMode }) {
  const queryClient = useQueryClient();
  const [dialogOpen, setdialogOpen] = useState(false);

  const physicalExaminationSchema = Yup.object().shape({
    id: Yup.string().required('Registaration Number is required'),
    bloodPressure: Yup.string().required('Blood Pressure is required'),
    pulse: Yup.string().required('Pluse is required'),
    haemoglobin: Yup.string().required('Heamoglobin is required'),
    weight: Yup.string().required('Weight is required'),
    height: Yup.string().required('Height is required'),
    temparature: Yup.string().required('Temaprature is required'),
    medicalofficerId: Yup.number().required('Field is required'),
  });

  const defaultValues = {
    id: null,
    donorRegistrationNumber: '',
    bloodPressure: null,
    pulse: null,
    haemoglobin: null,
    weight: null,
    height: null,
    temparature: null,
    deferReason: null,
    medicalOfficerId: null,
  };

  const methods = useForm({
    resolver: yupResolver(physicalExaminationSchema),
    mode: 'onChange',
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEditMode) {
      reset({
        ...selectedRow,
      });
    }
  }, [isEditMode, reset, selectedRow]);

  const mutation = useMutation({
    mutationFn: (req) => physicalExaminationDetailSave({ req }),
    onSuccess: () => {
      handledialog();
      queryClient.invalidateQueries({ queryKey: ['getAllregList'] });
      toast(saveMessage);
      // onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },

  });

  const handledialog = () => {
    setdialogOpen(true);
  };

  const handleDialogClose = () => {
    setdialogOpen(false);
    onClose();
  };

  const onSubmit = async (data) => {
    var saveData = {
      id: +data.id,
      donorRegistrationNumber: data.donorRegistrationNumber,
      bloodPressure: +data.bloodPressure,
      pulse: +data.pulse,
      haemoglobin: +data.haemoglobin,
      weight: +data.weight,
      height: +data.height,
      temparature: +data.temparature,
      deferReason: data.deferReason,
      medicalOfficerId: +data.medicalOfficerId,
    };
    mutation.mutate(saveData);

  };

  const medicalofficerName = [
    {
      id: 1,
      label: 'scriadmin',
    },
    {
      id: 2,
      label: 'admin',
    },
  ];
  return (
    <>
      <FormWrapper
        onClose={onClose}
        title={(isEditMode ? 'Edit' : '') + ' Physical Examination'}
        maxWidth='md'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset(defaultValues)}
        loading={mutation.isLoading}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField
                  label='Registration Number...'
                  name='donorRegistrationNumber'
                  placeholder='Registration Number'
                  required
                  onInput={(e) => {
                    restrict.digits(e);
                  }}
                />
              </Grid>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Blood Pressure'
                    name='bloodPressure'
                    placeholder='Enter Blood Pressure'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Pulse (bpm)'
                    name='pulse'
                    placeholder='Pulse Rate'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Haemoglobin (g/dl)'
                    name='haemoglobin'
                    placeholder='Haemoglobin'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Weight (kg)'
                    name='weight'
                    placeholder='Enter Weight'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Height (cm)'
                    name='height'
                    placeholder='Enter Height'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    label='Temperature (F)'
                    name='temparature'
                    placeholder='Temperature'
                    required
                    onInput={(e) => {
                      restrict.digits(e);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={3}>
                {/* <Grid item xs={4}>
                                <Grid item container m={2}>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <Checkbox />
                                            Accept
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <Checkbox />
                                            Defer Reason
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                <Grid item xs={4}>
                  {/* <Grid item container> */}
                  {/* <Grid item xs={6}>
                                    <Typography>
                                        <Checkbox />
                                        Defer Reason
                                    </Typography>
                                </Grid> */}
                  {/* <Grid item xs={6}> */}
                  <RHFTextField
                    label='Defer Reason'
                    name='deferReason'
                    placeholder='Enter Defer Reason'
                  />
                  {/* </Grid> */}
                  {/* </Grid> */}
                </Grid>
                <Grid item xs={4}>
                  <RHFSelect
                    name='medicalofficerId'
                    label='Medical Officer'
                    placeholder='Medical Officer'
                    required
                  >
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
                      Select Medical Officer
                    </MenuItem>
                    {medicalofficerName?.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
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
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>

      </FormWrapper>
      <DialogBox open={dialogOpen}>
        <Saviour dialogProperty={handleDialogClose} title={selectedRow.donorRegistrationNumber} />
      </DialogBox>
    </>
  );
}
