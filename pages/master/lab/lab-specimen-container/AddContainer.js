/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { RHFRadioGroup, RHFTextField } from 'components/hook-form';

import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { labSpecimenContainerSave } from 'pages/api/lab';

const statusOption = [true, false];
const defaultValues = { specimenContainerName: '', status: true };
const Schema = yup.object().shape({
  specimenContainerName: yup.string().trim().required('Required'),
  status: yup.boolean(),
});
export default function AddSpecimenContainer({ onClose, row, isEditMode }) {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const queryClient = useQueryClient();
  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => labSpecimenContainerSave({ req, isEditMode }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['labSpecimenContainerAll'] });
      toast.success(data || saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Lab Specimen Container`}
      maxWidth='xs'
      fullWidth
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='specimenContainerName'
              placeholder='Container Name'
              label='Container Name'
              required
            />
          </Grid>
          {isEditMode ? (
            <Grid item xs={12}>
              <RHFRadioGroup
                label=''
                name='status'
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
