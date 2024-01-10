import { Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { AddCircle, Delete } from '@mui/icons-material';

import {
  FormProvider,
  RHFAutoComplete,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { Fragment, useEffect } from 'react';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dietCycleSave, mealTypeGetAll, orderSetGetAll } from 'pages/api/diet-kitchen';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from 'hooks/useAuth';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultValues = {
  dietCycleName: '',
  effectFrom: null,
  diet: daysOfWeek.map((weekDay) => [{ orderSet: '', mealType: '', weekDay }]),
};

const schema = yup.object().shape({
  // dietCycle: yup.string().required('Diet Cycle Name is required'),
  // effectFrom: yup.date().required('Effect From is required'),
  diet: yup.array().of(
    yup.array().of(
      yup.object().shape({
        id: yup.string().required('Meal Type is required'),
        orderSet: yup
          .array()
          .min(1, 'Please Select at least one Order.')
          .typeError('Order Set is required'),
      })
    )
  ),
  // status: yup.string().required('Status is required'),
});

export default function AddCyclicDiet({ onClose, row, isEditMode }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });
  const { handleSubmit, control, reset } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'diet',
  });

  const mutation = useMutation({
    mutationFn: (req) => dietCycleSave({ req, isEditMode }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['dietCycleAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    // console.log(data, '-----data');

    let res = {
      dietCycleName: data.dietCycle,
      status: data.status,
      createdBy: user.staffId,
      orderSetMap: {},
    };

    data.diet.forEach((week, index) => {
      const weekDay = daysOfWeek[index];
      if (week[0].orderSet !== '') {
        res.orderSetMap[weekDay] = week.map((day) => ({
          orderSetIds: day.orderSet.map((order) => order.orderId),
          mealTypeId: day.id,
        }));
      }
    });
    mutation.mutate({ ...res });
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const isSunday = (date) => date.getDay() === 0;

  console.log(row);

  useEffect(() => {
    if (row) {
      reset({ ...row });
    }
  }, [row]);

  return (
    <FormWrapper
      onClose={onClose}
      title='Add Diet Cycle'
      // fullScreen
      // maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
      // onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <RHFTextField
                name='dietCycleName'
                placeholder='Enter Diet Cycle Name'
                label='Diet Cycle Name'
              />
            </Grid>
            <Grid item xs={4}>
              <RHFDatePicker
                name='effectFrom'
                label='Effect From'
                format='dd-MM-yyyy'
                // disableFuture
                shouldDisableDate={(date) => !isSunday(date)}
                maxDate={maxDate}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={4}>
              <RHFRadioGroup
                label='&nbsp;'
                name='status'
                options={statusOption}
                getOptionLabel={['Active', 'Inactive']}
              />
            </Grid>
          </Grid>
        </Stack>

        <Grid container spacing={1} mt={1} sx={{ backgroundColor: 'divider' }}>
          <Grid item xs={2}>
            Week Day
          </Grid>
          <Grid item xs={2}>
            Meal Type
          </Grid>
          <Grid item xs={7}>
            Order Set(Multiselect)
          </Grid>
          <Grid item xs={1}>
            Actions
          </Grid>
        </Grid>

        {fields.map((item, index) => (
          <Stack
            py={1}
            key={item.id}
            borderBottom='1px solid'
            borderColor={(theme) =>
              theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.lighter'
            }
            sx={{ ':last-of-type': { borderBottom: 'none' } }}
          >
            <Grid container spacing={1} alignItems='center' key={item.id}>
              <NestedDiet nestIndex={index} {...{ control }} />
            </Grid>
          </Stack>
        ))}
      </FormProvider>
    </FormWrapper>
  );
}

function NestedDiet({ nestIndex, control }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `diet.${nestIndex}`,
  });

  const { data: mealData } = useQuery({
    queryKey: ['mealTypeAll'],
    queryFn: mealTypeGetAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: orderData } = useQuery({
    queryKey: ['orderSetAll'],
    queryFn: orderSetGetAll,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return fields.map((item, k) => {
    return (
      <Fragment key={item.id}>
        <Grid item xs={2}>
          <Typography variant='body2'>{item.weekDay}</Typography>
        </Grid>
        <Grid item xs={2}>
          <RHFSelect
            name={`diet.${nestIndex}.${k}.id`}
            placeholder='meal Type'
            defaultValue={item.mealtypeid}
          >
            <MenuItem value=''>Select Option</MenuItem>

            {mealData?.map((option) => (
              <MenuItem key={option.mealtypeid} value={option.mealtypeid}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={7}>
          <RHFAutoComplete
            multiple
            name={`diet.${nestIndex}.${k}.orderSet`}
            placeholder='Order Set Multiselect'
            options={orderData}
          />
        </Grid>

        <Grid item xs={1}>
          {k === 0 && (
            <IconButton
              // color='primary'
              size='small'
              onClick={() => append({ mealType: '', orderSet: '' })}
            >
              <AddCircle />
            </IconButton>
          )}
          {k !== 0 && (
            <IconButton color='error' size='small' onClick={() => remove(k)}>
              <Delete />
            </IconButton>
          )}
        </Grid>
      </Fragment>
    );
  });
}
