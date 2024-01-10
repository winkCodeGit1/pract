import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';

//api

import { drainageTypeSaveDrainageType } from 'pages/api/master';

const defaultValues = {
  typeName: '',
  active: true,
};

const Schema = yup.object().shape({
  typeName: yup.string().required('This Field is Required'),
});

export default function AddDrainageType({ onClose, isEditMode, row, drainageTypeDetails }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => drainageTypeSaveDrainageType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drainageTypeFetchDrainageType'] });
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
      id: data?.id ?? 0,
      typeName: data?.typeName,
      active: data['active'],
    };
    console.log(data, '----data');
    let isDrainageTypeExists;
    console.log(isDrainageTypeExists, '---isDrainageTypeExists');
    if (isEditMode) {
      isDrainageTypeExists = row.typeName === data.typeName;
    } else {
      isDrainageTypeExists = drainageTypeDetails?.findIndex((e) => e.typeName === data.typeName);
      if (isDrainageTypeExists !== -1) {
        toast.error('Drainage Type already exists');
        return;
      }
    }
    mutation.mutate(req);
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
      title={`${isEditMode ? 'Edit' : 'Add'} Drainage Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='typeName'
              placeholder='Drainage Type'
              label='Drainage Type'
              required
              onInput={restrict.onlyCharacter}
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
