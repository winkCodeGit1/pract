// import from 'react';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// local
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { RHFRadioGroup, RHFTextField } from 'components/hook-form';

//api
import { vehClassSaveVehClass } from 'pages/api/transport';

const defaultValues = {
  className: '',
  active: true,
};

const Schema = yup.object().shape({
  className: yup.string().trim().required('Vehicle Class is Required'),
  active: yup.boolean(),
});

export default function AddVehicleClass({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => vehClassSaveVehClass({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehClassGetAllVehClass'] });
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
      className: data?.className,
      active: data['active'],
    };
    console.log(data, '----data');
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, reset, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Vehicle Class`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='className'
              placeholder='Vehicle Class'
              label='Vehicle Class'
              required
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
