import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Grid, ToggleButton } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
//
import FormWrapper from 'components/FormWrapper';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import { laundryItemCategorySaveData } from 'pages/api/laundry';
import useAuth from 'hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  categoryName: '',
  activeStatus: 'Active',
};

const schema = yup.object().shape({
  categoryName: yup.string().required('Required'),
});

export default function AddLinenItemCategory({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => laundryItemCategorySaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laundryItemCategoryGetAll'] });
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
      categoryName: data.categoryName,
      lastUpdatedBy: user.staffId,
      active: data.activeStatus === 'Active',
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset({ ...row, activeStatus: row?.active === true ? 'Active' : 'In-Active' });
    }
  }, [row]);

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={`${row ? 'Edit' : 'Add'} Linen Item Category`}
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            Category Name
            <RHFTextField name='categoryName' placeholder='category Name' />
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
