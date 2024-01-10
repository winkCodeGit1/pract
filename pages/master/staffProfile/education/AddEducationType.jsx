import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider } from 'components/hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// local imports
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

//api
import { qualificationsave } from 'pages/api/master';

const statusOption = [true, false];
const defaultValues = {
  qualificationName: '',
  active: true,
};

const Schema = yup.object().shape({
  qualificationName: yup.string().typeError('Required').required('Required'),
  active: yup.boolean(),
});

export default function AddEducationType({ onClose, row, educationDetail, isEditMode }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => qualificationsave({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualificationgetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    // const req = data;
    console.log(data, '----data');
    let isEducationExists;
    console.log(isEducationExists, '---isEducationExists');
    if (isEditMode) {
      isEducationExists = row.qualificationName === data.qualificationName;
    } else {
      isEducationExists = educationDetail?.findIndex(
        (e) => e.qualificationName === data.qualificationName
      );
      if (isEducationExists !== -1) {
        toast.error('Educational Qualification already exists');
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
      title={`${isEditMode ? 'Edit' : 'Add'} Education Qualification`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='qualificationName'
              placeholder='Educational Qualification'
              label='Educational Qualification'
              required
              toUpperCase
              inputProps={{ maxLength: 100 }}
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
