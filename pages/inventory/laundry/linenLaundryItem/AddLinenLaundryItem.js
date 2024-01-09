import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, ToggleButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
//
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { RHFAutoComplete, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import { laundryItemCategoryGetAll, laundryItemSaveData } from 'pages/api/laundry';
import useAuth from 'hooks/useAuth';
import { restrict } from 'utils/restrict';

const defaultValues = {
  itemName: '',
  activeStatus: 'Active',
  itemCategoryId: null,
  quantity: '',
};

const schema = yup.object().shape({
  itemName: yup.string().required('Required'),
  itemCategoryId: yup.string().required('Required'),
  quantity: yup.string().required('Required'),
});

export default function AddLinenLaundryItem({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const { data: categoryAllData } = useQuery({
    queryKey: ['laundryItemCategoryGetAll'],
    queryFn: laundryItemCategoryGetAll,
  });

  const mutation = useMutation({
    mutationFn: (req) => laundryItemSaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laundryItemGetAll'] });
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
      itemName: data.itemName,
      lastUpdatedBy: user.staffId,
      active: data.activeStatus === 'Active',
      itemCategoryId: data.itemCategoryId?.id,
      isConsumable: true,
      quantity: data.quantity,
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset({
        ...row,
        activeStatus: row.active ? 'Active' : 'In-Active',
        itemCategoryId: categoryAllData?.find((el) => el.id === row.itemCategoryId),
      });
    }
  }, [row, categoryAllData]);

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Linen Laundry Item`}
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='itemCategoryId'
              placeholder='Linen Category'
              label='Linen Category'
              options={categoryAllData || []}
              inputProps={{ maxLength: 11 }}
            />
          </Grid>

          <Grid item xs={12}>
            Item Name
            <RHFTextField name='itemName' placeholder='Item Name' />
          </Grid>

          <Grid item xs={12}>
            Quantity
            <RHFTextField
              name='quantity'
              placeholder='Quantity'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>

          {row && (
            <Grid item xs={12} align='center'>
              {/* <FormLabel>Active</FormLabel> */}
              <RHFToggleButtonChipVariant minimumOne name='activeStatus' exclusive>
                <ToggleButton value='Active' color='success' size='small'>
                  Active
                </ToggleButton>
                <ToggleButton value='In-Active' color='error' size='small'>
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
