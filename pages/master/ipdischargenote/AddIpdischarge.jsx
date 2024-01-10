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
import { dischargeNoteSaveDischargeNote } from 'pages/api/master';

const defaultValues = {
  dischargeReason: '',
  active: true,
  organizationId: 1,
};

const Schema = yup.object().shape({
  dischargeReason: yup.string().required('Discharge Note is Required'),
  active: yup.boolean(),
});

export default function AddIpDischarge({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => dischargeNoteSaveDischargeNote({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dischargeNoteFetchDischargeNote'] });
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
      dischargeReason: data?.dischargeReason,
      active: data['active'],
    };
    console.log(data);
    mutation.mutate(req);
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, reset, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Discharge Note`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              label='Discharge Note'
              name='dischargeReason'
              placeholder='Discharge Note'
              multiline
              minRows={2}
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
