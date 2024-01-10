// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { surgicalProceduresSave } from 'pages/api/master';
const statusOption = [true, false];
const defaultValues = {
  id: 0,
  name: '',
  comments: '',
  organizationId: '',
  organizationName: null,
  isParaSurgical: '',
  active: true,
  activeStatus: 'active',
};
const Schema = yup.object().shape({
  isParaSurgical: yup.string().trim().required('Required'),
  name: yup.string().trim().required('Required'),
  comments: yup.string().trim().required('Required'),
  active: yup.boolean(),
});

function AddProcedure({ onClose, selectedRow, isEditMode }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const [procedureOption] = useState(['Surgical', 'ParaSurgical']);

  const mutation = useMutation({
    mutationFn: (req) => surgicalProceduresSave({ req }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['surgicalProceduresGetAll'] });
      toast(saveMessage);
      console.log('data', data);
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
        comments: selectedRow.comments,
      });
    }
  }, [isEditMode, reset, selectedRow]);
  const onSubmit = async (data) => {
    const req = {
      ...data,
      organizationId: 1,
      isParaSurgical: data.isParaSurgical === 'ParaSurgical' ? true : false,
    };
    mutation.mutate(req);
  };
  return (
    <FormWrapper
      onClose={onClose}
      title={(isEditMode ? 'Edit' : 'Add') + '  Procedures'}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFRadioGroup
              label='Procedures'
              name='isParaSurgical'
              options={procedureOption}
              sx={{
                '& .MuiFormControlLabel-root': { mr: 4 },
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='name' placeholder='Name' label='Name' required />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name='comments' placeholder='Comments' label='Comments' required />
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

export default AddProcedure;
