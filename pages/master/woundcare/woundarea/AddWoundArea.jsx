import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';
import FormWrapper from 'components/FormWrapper';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';

//api
import { woundAreaSaveWoundArea } from 'pages/api/master';

const defaultValues = {
  name: '',
  active: true,
};

const Schema = yup.object().shape({
  name: yup.string().required('This Field is Required'),
  active: yup.boolean(),
});

export default function AddWoundArea({ onClose, isEditMode, woundAreaDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => woundAreaSaveWoundArea({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchWoundArea'] });
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
      name: data?.name,
      active: data['active'],
    };
    console.log(data, '----data');
    let isWoundAreaExists;
    console.log(isWoundAreaExists, '---isWoundAreaExists');
    if (isEditMode) {
      isWoundAreaExists = row.name === data.name;
    } else {
      isWoundAreaExists = woundAreaDetails?.findIndex((e) => e.name === data.name);
      if (isWoundAreaExists !== -1) {
        toast.error('Wound Area already exists');
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
      title={`${isEditMode ? 'Edit' : 'Add'} Wound Area`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='name'
              placeholder='Wound Area'
              label='Wound Area'
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
