/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, MenuItem } from '@mui/material';
import { RHFRadioGroup, RHFSelect, RHFTextField } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { labSampleTypeSave, labTestUnitAll } from 'pages/api/lab';

const statusOption = [true, false];
const defaultValues = { sampleName: '', active: true };
const Schema = yup.object().shape({
  sampleName: yup.string().trim().required('Required'),
  active: yup.boolean(),
});
export default function AddSampleType({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => labSampleTypeSave({ req, isEditMode }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['labSampleTypeAll'] });
      toast.success(data || saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const { data: TestUnitList } = useQuery({
    queryKey: ['labTestUnitAll'],
    queryFn: labTestUnitAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true,
  });
  const onSubmit = (data) => {
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
      title={`${isEditMode ? 'Edit' : 'Add'} Sample Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='sampleName'
              placeholder='Sample Type'
              label='Sample Type'
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFSelect name='labTestUnitId' required label='Test Unit'>
              <MenuItem value=''>Select Test Unit</MenuItem>
              {TestUnitList?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.unitName}
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
