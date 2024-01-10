/** @format */

import { Grid } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';

//api
import { specializationSave } from 'pages/api/master';

const defaultValues = {
  specName: '',
  organizationId: '',
  active: true,
};
const Schema = yup.object().shape({
  specName: yup
    .string()
    .typeError('Please enter more than 5 character')
    .required('This Field is required'),
  active: yup.boolean(),
});
export default function AddSpecializationType({ onClose, isEditMode, specializationDetail, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => specializationSave({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specializationGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    console.log(data, '----data');
    let isSpecializationExists;
    console.log(isSpecializationExists, '---isEducationExists');
    if (isEditMode) {
      isSpecializationExists = row.specName === data.specName;
    } else {
      isSpecializationExists = specializationDetail?.findIndex((e) => e.specName === data.specName);
      if (isSpecializationExists !== -1) {
        toast.error('Specialization already exists');
        return;
      }
    }
    mutation.mutate(data);
  };
  console.log(row, 'row');

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Specialization`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='specName'
              placeholder='Specialization'
              label='Specialization'
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
