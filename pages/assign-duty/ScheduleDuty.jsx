import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//
import { failedSaveMessage, saveMessage } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';
import { RHFSelect } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import Calendar from 'components/calendar';
import { useState } from 'react';

const defaultArrayObj = {
  linenCode: 'Bed-4543',
  receivedQty: '43',
  washed: '190',
  dispatch: '20',
  adjusted: '',
  remarks: 'some text',
};

const defaultValues = {
  linen: [defaultArrayObj, defaultArrayObj, defaultArrayObj],
};

const Schema = yup.object().shape({
  linen: yup.array().of(
    yup.object().shape({
      linenCode: yup.string().required('Type Name is required'),
      receivedQty: yup.string().required('uom is required'),
      dispatch: yup.string().required('uom is required'),
      dryCleaned: yup.number().typeError('should be a number'),
      remarks: yup.string(),
    })
  ),
});

export default function ScheduleDuty({ onClose }) {
  const [selectedDates, setSelectedDates] = useState([]);

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      toast(saveMessage);
      // onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    console.log(selectedDates);
    const req = data;
    mutation.mutate(req);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title='Schedule Duty Roaster'
      maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <RHFSelect name='role' label='Role' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name='staffName' label='Staff Name' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name='department' label='Department' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name='building' label='Building' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFSelect name='floor' label='Floor' required />
          </Grid>
        </Grid>
        <Calendar selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
      </FormProvider>
    </FormWrapper>
  );
}
