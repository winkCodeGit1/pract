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
import { externalTherapySaveExternalTherapy } from 'pages/api/master';

const defaultValues = {
  therapy_name: '',
  therapy_details: '',
  active: true,
};

const Schema = yup.object().shape({
  therapy_name: yup.string().required('Therapy Name is Required'),
  active: yup.boolean(),
});

export default function AddExternal({ onClose, isEditMode, externalDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => externalTherapySaveExternalTherapy({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['externalTherapyFetchExternalTherapyByOrgId'] });
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
      therapy_name: data?.therapy_name,
      active: data['active'],
      therapy_details: data?.therapy_details,
    };
    console.log(data, '----data');
    let isExternalTherapyExists;
    console.log(isExternalTherapyExists, '---isExternalTherapyExists');
    if (isEditMode) {
      isExternalTherapyExists = row.therapy_name === data.therapy_name;
    } else {
      isExternalTherapyExists = externalDetails?.findIndex(
        (e) => e.therapy_name === data.therapy_name
      );
      if (isExternalTherapyExists !== -1) {
        toast.error('External Therapy already exists');
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
      title={`${isEditMode ? 'Edit' : 'Add'} External Therapy`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='therapy_name'
              placeholder='External Therapy'
              label='External Therapy'
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
