import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, ToggleButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
//
import useAuth from 'hooks/useAuth';
import { LinenProcessSaveData } from 'pages/api/laundry';
import { FormProvider, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';

const defaultValues = {
  processName: '',
  activeStatus: 'Active',
};

const schema = yup.object().shape({
  processName: yup.string().required('Required'),
});

export default function AddLinenProcess({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user, 'user');

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => LinenProcessSaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['linenProcessGetAll'] });
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
      processName: data.processName,
      lastUpdatedBy: user.staffId,
      active: data.activeStatus === 'Active',
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    if (row) {
      reset({ ...row, activeStatus: row?.active ? 'Active' : 'In-Active' });
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
            Process Name
            <RHFTextField name='processName' placeholder='Process Name' />
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
