import { Grid } from '@mui/material';
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//@mui
import { useForm } from 'react-hook-form';
//
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { paymentModeSavePaymentMode } from 'api';
import { useEffect, useState } from 'react';

const defaultValues = {
  id: 0,
  name: '',
  organizationId: '',
  activeStatus: 'active',
};

const Schema = yup.object().shape({
  name: yup.string().trim().required('Required'),
});

function AddPaymentMode({ onClose, selectedRow, paymentDetail, isEditMode }) {
  const queryClient = useQueryClient();
  const [statusOption] = useState(['Active', 'Inactive']);
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  //============================API===================================================================//

  const mutation = useMutation({
    mutationFn: (req) => paymentModeSavePaymentMode({ req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPaymentModeGetallPaymentModes'] });
      toast(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });
  useEffect(() => {
    if (isEditMode) {
      reset({
        ...selectedRow,
        id: selectedRow.id,
        name: selectedRow.name,
      });
    }
  }, [isEditMode, reset, selectedRow]);

  const onSubmit = async (data) => {
    console.log(data, '----data');
    let isPaymentExists;
    console.log(isPaymentExists, '----isPaymentExists');

    if (isEditMode) {
      isPaymentExists = selectedRow.name;
    } else {
      isPaymentExists = paymentDetail?.findIndex((e) => e.name === data.name);
      if (isPaymentExists !== -1) {
        toast.error('PaymentMode name already exists');
        return;
      }
    }
    const req = {
      ...data,
      organizationId: 1,
    };
    mutation.mutate(req);
  };
  return (
    <FormWrapper
      onClose={onClose}
      title={(isEditMode ? 'Edit' : 'Add') + '  Payment Mode'}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset(defaultValues);
      }}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField name='name' placeholder='Payment Mode' label='Payment Mode' required />
          </Grid>
          {isEditMode ? (
            <Grid item xs={12}>
              <RHFRadioGroup label='' name='activeStatus' options={statusOption} />
            </Grid>
          ) : null}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}

export default AddPaymentMode;
