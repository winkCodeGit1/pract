import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import { restrict } from 'utils/restrict';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';

//api
import { therapyDetailsSaveTherapyDetails } from 'pages/api/master';

const defaultValues = {
  name: '',
  active: true,
};

const Schema = yup.object().shape({
  name: yup.string().required('Therapy Details is Required'),
  active: yup.boolean(),
});

export default function AddTherapyDetails({ onClose, isEditMode, therapyDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => therapyDetailsSaveTherapyDetails({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['therapyDetailsFetchTherapyDetailsByOrgId'] });
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
    let isTherapyExists;
    console.log(isTherapyExists, '---isWoundAreaExists');
    if (isEditMode) {
      isTherapyExists = row.name === data.name;
    } else {
      isTherapyExists = therapyDetails.findIndex((e) => e.name === data.name);
      if (isTherapyExists !== -1) {
        toast.error('Therapy Details already exists');
        return;
      }
    }

    mutation.mutate(req);
    console.log(data);
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
      title={`${isEditMode ? 'Edit' : 'Add'}Therapy Details`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='name'
              placeholder='Therapy Details'
              label='Therapy Details'
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
