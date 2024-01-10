import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';
import { FormProvider } from 'components/hook-form';

//api
import { drainageIntensitySaveDrainageIntensity } from 'pages/api/master';

const defaultValues = {
  name: '',
  active: true,
};

const Schema = yup.object().shape({
  name: yup
    .string()
    .typeError('Please enter more than 5 character')
    .required('This Field is Required'),
  active: yup.boolean(),
});

export default function AddDrainageIntensity({
  onClose,
  isEditMode,
  row,
  drainageIntensityDetails,
}) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => drainageIntensitySaveDrainageIntensity({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drainageIntensityFetchDrainageIntensity'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const req = {
      id: data?.id ?? 0,
      name: data?.name,
      active: data['active'],
    };
    console.log(data, '----data');
    let isDrainageIntensityExists;
    console.log(isDrainageIntensityExists, '---isDrainageIntensityExists');
    if (isEditMode) {
      isDrainageIntensityExists = row.name === data.name;
    } else {
      isDrainageIntensityExists = drainageIntensityDetails?.findIndex((e) => e.name === data.name);
      if (isDrainageIntensityExists !== -1) {
        toast.error('Drainage Intensity already exists');
        return;
      }
    }
    mutation.mutate(req);
  };
  console.log(row, 'row');

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Drainage Intensity`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='name'
              placeholder='Drainage Intensity'
              label='Drainage Intensity'
              required
              onInput={restrict.onlyCharacter}
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
