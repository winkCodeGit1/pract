/** @format */

import { Grid } from '@mui/material';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import useAuth from 'hooks/useAuth';
import FormWrapper from 'components/FormWrapper';
import { RHFTimePicker } from 'components/hook-form/RHFDatePicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mealTypeSave } from 'pages/api/diet-kitchen';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { toast } from 'react-toastify';
import { parseFrom24HourFormat } from 'utils/date';

const defaultValues = {
  mealName: '',
  startTime: '',
  endTime: '',
  active: true,
};
const Schema = yup.object().shape({
  mealname: yup.string().trim().required('Required'),
  starttime: yup.date().required('Start time is required'),
  endtime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('starttime'), 'End time must be greater than start time'),
  active: yup.boolean(),
});

export default function AddDietType({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const mutation = useMutation({
    mutationFn: (req) => mealTypeSave({ req, row }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['mealTypeAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  // console.log(mutation);
  const onSubmit = (data) => {
    const startHours = data.starttime.getHours().toString().padStart(2, '0');
    const startMin = data.starttime.getMinutes().toString().padStart(2, '0');

    const endTimeHours = data.endtime.getHours().toString().padStart(2, '0');
    const endTimeMin = data.endtime.getMinutes().toString().padStart(2, '0');
    let req = {
      mealname: data.mealname,
      starttime: `${startHours}:${startMin}`,
      endtime: `${endTimeHours}:${endTimeMin}`,
      status: data.active,
      createdBy: user.staffId,
    };
    if (row) {
      delete req.createdBy;
      req.mealtypeid = data.mealtypeid;
      req.modifiedBy = user.staffId;
    }
    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset({
        ...row,
        starttime: parseFrom24HourFormat(row.starttime),
        endtime: parseFrom24HourFormat(row.endtime),
        active: row.status,
      });
    }
  }, [row]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${row ? ' Edit' : 'Add'} Meal Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='mealname'
              placeholder='Enter Meal Type'
              label='Meal Type'
              required
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTimePicker name='starttime' label='Start Time' required />
          </Grid>
          <Grid item xs={6}>
            <RHFTimePicker name='endtime' label='End Time' required />
          </Grid>
          {row ? (
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
      </FormProvider>
    </FormWrapper>
  );
}
