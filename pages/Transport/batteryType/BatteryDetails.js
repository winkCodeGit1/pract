// import from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveBatteryType } from 'pages/api/transport';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const defaultValues = {
  type: '',
  active: true,
};
const schema = yup.object().shape({
  type: yup.string().trim().required('Required'),
});
function BatteryDetails({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => saveBatteryType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBatteryType'] });
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
      type: data?.type,
      active: data['active'],
    };
    console.log(data);
    mutation.mutate(req);
  };
  // let isBatteryTypeExists;
  // console.log(isBatteryTypeExists, '---isBatteryTypeExists');
  // if (isEditMode) {
  //   isBatteryTypeExists = row.type === data.type;
  // } else {
  //   isBatteryTypeExists = BatteryTypeDetails?.findIndex((e) => e.type === data.type);
  //   if (isBatteryTypeExists !== -1) {
  //     toast.error('BatteryTypeExists Already Exists');
  //     return;
  //   }
  // }

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
      title={`${isEditMode ? 'Edit' : 'Add'} Battery Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={reset}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='type'
              placeholder='Battery Type'
              inputProps={{ maxLength: 100, ['data-testid']: 'Battery-type-input' }}
              label='Battery Type'
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

export default BatteryDetails;
