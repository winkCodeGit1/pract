/* eslint-disable no-unused-vars */
import {
  Box,
  Divider,
  FormLabel,
  Input,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';

export default function Discharge({ bedInfo, onClose }) {
  const methods = useForm();

  const { handleSubmit } = methods;

  function onSave(data) {
    console.log(data);
  }

  return (
    <FormWrapper title='Discharge' maxWidth='xs' onClose={onClose} onSubmit={handleSubmit(onSave)}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <OutlinedInput disabled value='Mukesh' size='small' />

        <Divider sx={{ mt: 1 }} />

        <FormLabel disabled> Building </FormLabel>
        <OutlinedInput label='Remarks' size='small' fullWidth disabled value='Building-2' />
        <FormLabel disabled> Ward </FormLabel>
        <OutlinedInput label='Remarks' size='small' fullWidth disabled value='ward-8' />
        <FormLabel disabled> Bed </FormLabel>
        <OutlinedInput label='Remarks' size='small' fullWidth disabled value='bed-90' />
        <br />
        <br />
        <RHFTextField name='remarks' label='Remarks' placeholder='Enter discharge note' />
      </FormProvider>
    </FormWrapper>
  );
}
