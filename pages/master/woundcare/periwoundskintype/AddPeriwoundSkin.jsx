import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
import { restrict } from 'utils/restrict';
import { useEffect } from 'react';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';

//api
import { periwoundSkinTypeSavePeriwoundSkinType } from 'pages/api/master';

const defaultValues = {
  typeName: '',
  active: true,
};

const Schema = yup.object().shape({
  typeName: yup.string().required('This Field is Required'),
  active: yup.boolean(),
});

export default function AddPeriwoundSkinType({ onClose, isEditMode, periWoundDetails, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => periwoundSkinTypeSavePeriwoundSkinType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchPeriWoundSkinType'] });
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
    console.log(data);
    let isPeriWoundExists;
    console.log(isPeriWoundExists, '---isWoundBedExists');
    if (isEditMode) {
      isPeriWoundExists = row.typeName === data.typeName;
    } else {
      isPeriWoundExists = periWoundDetails?.findIndex((e) => e.typeName === data.typeName);
      if (isPeriWoundExists !== -1) {
        toast.error('Periwound already exists');
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
  }, [isEditMode, reset, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Periwound Skin Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='typeName'
              placeholder='Periwound Skin Type'
              label='Periwound Skin Type'
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
