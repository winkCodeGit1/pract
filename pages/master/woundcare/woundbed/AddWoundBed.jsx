import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';

//api
import { woundBedSaveWoundBed } from 'pages/api/master';

const defaultValues = {
  woundBed: '',
  active: true,
};

const Schema = yup.object().shape({
  woundBed: yup.string().required('This Field is Required'),
  active: yup.boolean(),
});

export default function AddWoundBed({ onClose, isEditMode, woundBedDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => woundBedSaveWoundBed({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchWoundBed'] });
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
      woundBed: data?.woundBed,
      active: data['active'],
    };
    console.log(data, '----data');
    let isWoundBedExists;
    console.log(isWoundBedExists, '---isWoundBedExists');
    if (isEditMode) {
      isWoundBedExists = row.woundBed === data.woundBed;
    } else {
      isWoundBedExists = woundBedDetails?.findIndex((e) => e.woundBed === data.woundBed);
      if (isWoundBedExists !== -1) {
        toast.error('Wound Bed already exists');
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
      title={`${isEditMode ? 'Edit' : 'Add'} Wound Bed`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='woundBed'
              placeholder='Wound Bed'
              label='Wound Bed'
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
