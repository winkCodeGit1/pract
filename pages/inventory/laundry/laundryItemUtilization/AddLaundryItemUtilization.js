import { Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFTextField } from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import { equipmentGetAll, laundryItemGetAll, laundryItemUtilizationSave } from 'pages/api/laundry';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const defaultValues = {
  laundryItemId: null,
  equipmentId: null,
  consumptionQty: '',
};

export default function AddLaundryItemUtilization({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const { handleSubmit } = methods;

  const { data: laundryItemList } = useQuery({
    queryKey: ['laundryItemGetAll'],
    queryFn: laundryItemGetAll,
  });

  const { data: equipmentList } = useQuery({
    queryKey: ['equipmentGetAll'],
    queryFn: equipmentGetAll,
  });

  const mutation = useMutation({
    mutationFn: (req) => laundryItemUtilizationSave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laundryItemUtilizationGetAll'] });
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
      laundryItemId: data?.laundryItemId?.id,
      equipmentId: data?.equipmentId?.id,
      consumptionQty: data?.consumptionQty,
      lastUpdatedBy: user.staffId,
    };
    mutation.mutate(req);
  };

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Add Linen Item Utilization'
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='laundryItemId'
              options={laundryItemList || []}
              placeholder='Select Laundry Item'
              label='Select Laundry Item'
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='equipmentId'
              options={equipmentList || []}
              placeholder='Select equipment'
              label='Select equipment'
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              label='Consumption Quantity'
              name='consumptionQty'
              placeholder='Consumption Quantity'
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
