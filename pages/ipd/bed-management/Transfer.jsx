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

export default function Transfer({ bedInfo, onClose }) {
  const methods = useForm();

  const { handleSubmit } = methods;

  function onSave(data) {
    console.log(data);
  }

  return (
    <FormWrapper title='Transfer' maxWidth='md' onClose={onClose} onSubmit={handleSubmit(onSave)}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <OutlinedInput disabled value='Mukesh' size='small' />

        <Divider sx={{ mt: 1 }} />

        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row', gap: 16 } }}>
          <Box flex={1}>
            <Typography variant='subtitle2'>From</Typography>
            <FormLabel disabled> Building </FormLabel>
            <OutlinedInput label='Remarks' size='small' fullWidth disabled value='Building-2' />
            <FormLabel disabled> Ward </FormLabel>
            <OutlinedInput label='Remarks' size='small' fullWidth disabled value='ward-8' />
            <FormLabel disabled> Bed </FormLabel>
            <OutlinedInput label='Remarks' size='small' fullWidth disabled value='bed-90' />
          </Box>
          <Divider flexItem orientation='vertical' />

          <Box flex={1}>
            <Typography variant='subtitle2'>To</Typography>
            <RHFSelect name='building' label='Building' required>
              {[].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name='ward' label='Ward' required>
              {[].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name='bed' label='Bed' required>
              {[].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Stack>
        <RHFTextField name='remarks' label='Remarks' />
      </FormProvider>
    </FormWrapper>
  );
}
