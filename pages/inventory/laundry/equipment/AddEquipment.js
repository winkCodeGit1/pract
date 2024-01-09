import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Grid, ToggleButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//
import { FormProvider, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import { equipmentSaveData } from 'pages/api/laundry';
import FormWrapper from 'components/FormWrapper';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  machineName: '',
  capacity: '',
  quantity: '',
  activeStatus: true,
};

const schema = yup.object().shape({
  machineName: yup.string().required('Required'),
  capacity: yup.string().required('Required'),
  quantity: yup.string().required('Required'),
});

export default function AddEquipment({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => equipmentSaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipmentGetAll'] });
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
      id: row ? data?.id : 0,
      machineName: data?.machineName,
      capacity: data?.capacity,
      quantity: data?.quantity,
      lastUpdatedBy: user.staffId,
      active: data?.activeStatus,
    };

    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset({ ...row, activeStatus: row.active });
    }
  }, [row]);

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Equipment`}
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFTextField label='Machine Name' name='machineName' placeholder='Machine Name' />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              label='Capacity'
              name='capacity'
              placeholder='Capacity'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              label='Quantity'
              name='quantity'
              placeholder='Quantity'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          {row && (
            <Grid item xs={12} align='center'>
              <RHFToggleButtonChipVariant minimumOne name='activeStatus' exclusive>
                <ToggleButton value={true} color='success' size='small'>
                  Active
                </ToggleButton>
                <ToggleButton value={false} color='error' size='small'>
                  In-Active
                </ToggleButton>
              </RHFToggleButtonChipVariant>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
