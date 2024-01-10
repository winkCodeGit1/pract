/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//@mui
import { Grid, MenuItem } from '@mui/material';
import { RHFTextField, RHFSelect, RHFRadioGroup } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { labSave } from 'pages/api/lab';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';

const statusOption = [true, false];
const defaultValues = { labName: '', departmentId: '', active: true };
const Schema = yup.object().shape({
  labName: yup.string().trim().required('Required'),
  departmentId: yup.string().trim().required('Required'),
});
export default function AddNewLab({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => labSave({ req, isEditMode }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['labAll'] });
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
      title={`${isEditMode ? 'Edit' : 'Add'} Lab`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField name='labName' placeholder='Lab Name' label='Lab Name' required />
          </Grid>
          <Grid item xs={12}>
            <RHFSelect
              name='departmentId'
              label='Department Type'
              placeholder='Department Type'
              required
            >
              <MenuItem
                value=''
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                Select Department Type
              </MenuItem>
              {[{ label: 'Pathalogy or Biochemistry', value: 1 }].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
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
