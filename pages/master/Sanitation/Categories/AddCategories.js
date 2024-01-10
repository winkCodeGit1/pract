/** @format */
// form
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//@mui
import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { sanitationCategorySave } from '../../../api/master';

const statusOption = [true, false];
const defaultValues = { id: 0, categoryName: '', active: true };
const Schema = yup.object().shape({
  categoryName: yup.string().trim().required('Required'),
  active: yup.boolean().required('Required'),
});
export default function AddCategories({ onClose, isEditMode, row, categoriesDetail }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => sanitationCategorySave({ req, isEditMode }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['allSanitationCategories'] });
      toast.success(data || saveMessage);
      onClose();
    },
    onError: (error) => {
      // console.log(error.data);
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    let categoryExists;
    if (isEditMode) {
      categoryExists = row.categoryName === data.categoryName;
    } else {
      categoryExists = categoriesDetail?.findIndex((e) => e.categoryName === data.categoryName);
      if (categoryExists !== -1) {
        toast.error('Category Name Already Exists');
        return;
      }
    }
    const req = data;
    mutation.mutate(req);
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Category`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='categoryName'
              placeholder='Category Name'
              label='Category Name'
              required
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
