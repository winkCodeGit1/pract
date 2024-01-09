import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
//
import { Stack } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFDateTimePicker } from 'components/hook-form';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const Schema = yup.object().shape({
  dateTime: yup.date().typeError('Invalid date format').required('required').nullable(),
});

const defaultValues = {
  dateTime: new Date(),
};

export default function Receive({ onClose }) {
  // const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      // queryClient.invalidateQueries(['vitalSignTypeGetAllVitalSignTypeInDto']);
      toast(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    const req = data;
    mutation.mutate(req);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title='Receiving Date Time'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <RHFDateTimePicker name='dateTime' label='Date Time' required size='small' />
        </Stack>
      </FormProvider>
    </FormWrapper>
  );
}
