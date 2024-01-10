// import from 'react';
import { Grid } from '@mui/material';

import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
// local
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { FormProvider } from 'components/hook-form';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';

//api
import { fuelTypeSaveFuelType } from 'pages/api/transport';

const Schema = yup.object().shape({
  type: yup.string().trim().required('Fuel Type is Required'),
});

const defaultValues = {
  type: '',
  active: true,
};

export default function FuelDetails({ onClose, isEditMode, fuelDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => fuelTypeSaveFuelType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelTypeGetAllFuelType'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    if (isEditMode) {
      const isTypeChanged = data.type !== row.type;

      if (isTypeChanged) {
        const isFuelExists = fuelDetails.some((e) => e.type === data.type);

        if (isFuelExists) {
          toast.error('Fuel Details already exists');
          return;
        }
      }
    } else {
      const isFuelExists = fuelDetails.some((e) => e.type === data.type);

      if (isFuelExists) {
        toast.error('Fuel Details already exists');
        return;
      }
    }

    const req = {
      ...data,
      id: data?.id ?? 0,
      // type: data?.type,
      // active: data['active'],
    };
    console.log(data);
    mutation.mutate(req);
  };
  console.log(row, 'row');

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, reset, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'}Fuel Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='type'
              placeholder='Fuel Type'
              label='Fuel Type'
              required
              inputProps={{ ['data-testid']: 'Fuel-type-input' }}
            />
          </Grid>
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
      </FormProvider>
    </FormWrapper>
  );
}
