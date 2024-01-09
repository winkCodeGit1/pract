import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Grid, ToggleButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//
import { FormProvider, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import FormWrapper from 'components/FormWrapper';
import { locationMasterSaveData } from 'pages/api/laundry';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const defaultValues = {
  locationName: '',
  active: true,
};

const schema = yup.object().shape({
  locationName: yup.string().required('Required'),
});

export default function AddLocation({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => locationMasterSaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locationMasterGetAll'] });
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
      id: data.id || 0,
      locationName: data.locationName,
      lastUpdatedBy: user.staffId,
      active: data.active,
    };

    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset(row);
    }
  }, [row]);

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={`${row ? 'Edit' : 'Add'} Linen Process`}
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFTextField name='locationName' placeholder='Location Name' label='Location Name' />
          </Grid>
        </Grid>

        {row && (
          <Grid item xs={12} align='center'>
            {/* <FormLabel>Active</FormLabel> */}
            <RHFToggleButtonChipVariant minimumOne name='active' exclusive>
              <ToggleButton value={true} color='success' size='small'>
                Active
              </ToggleButton>
              <ToggleButton value={false} color='error' size='small'>
                In-Active
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>
        )}
      </FormProvider>
    </FormWrapper>
  );
}
