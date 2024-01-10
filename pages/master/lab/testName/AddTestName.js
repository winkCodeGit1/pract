/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, MenuItem } from '@mui/material';
import { RHFTextField, RHFSelect, RHFRadioGroup } from 'components/hook-form';

import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { labTestSave } from 'pages/api/lab';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const statusOption = [true, false];
const defaultValues = {
  labTestCategoryId: '',
  testName: '',
  shortCode: '',
  comments: '',
  active: true,
};
const Schema = yup.object().shape({
  labTestCategoryId: yup.string().trim().required('Required'),
  testName: yup.string().trim().required('Required').min(2, 'Minimum 2 Character required'),
  active: yup.boolean(),
});
export default function AddTestName({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    // formState: { isDirty },
  } = methods;

  const mutation = useMutation({
    mutationFn: (req) => labTestSave({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labTestAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  console.log(row, 'row');

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Test Name`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFSelect
              name='labTestCategoryId'
              label='Department Type'
              placeholder='Department Type'
              required
            >
              <MenuItem value=''>Select Department Type</MenuItem>
              {[
                { label: 'Pathalogy or Biochemistry', value: 1 },
                { label: 'Radiology', value: 2 },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='testName'
              placeholder='Enter Test Name'
              label='Test Name'
              inputProps={{ maxLength: 100 }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='shortCode'
              placeholder='Sort Name'
              label='Short Name'
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='comments'
              placeholder='Comments'
              label='Comments'
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{ maxLength: 200 }}
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
