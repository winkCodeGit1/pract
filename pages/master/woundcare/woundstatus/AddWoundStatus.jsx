import { Grid } from '@mui/material';
import { FormProvider, RHFRadioGroup } from 'components/hook-form';
import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
//
import { RHFTextField } from 'components/hook-form';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { woundStatusSaveWoundStatus } from 'pages/api/master';
const Schema = yup.object().shape({
  name: yup.string().required('This Field is Required'),
});
const defaultValues = {
  name: '',
  active: true,
};
export default function AddWoundStatus({ onClose, isEditMode, row, WoundStatusDetails }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => woundStatusSaveWoundStatus({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchWoundStatus'] });
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
    let isWoundStatusExists;
    console.log(isWoundStatusExists, '---isWoundStatusExists');
    if (isEditMode) {
      isWoundStatusExists = row.name === data.name;
    } else {
      isWoundStatusExists = WoundStatusDetails.findIndex((e) => e.name === data.name);
      if (isWoundStatusExists !== -1) {
        toast.error('Wound Status Already Exists');
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
  }, [isEditMode, reset, row]);
  console.log(isEditMode);
  return (
    <FormWrapper
      onClose={onClose}
      title='Add Wound Status'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField name='name' placeholder='Wound Status' label='Wound Status' required />
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
