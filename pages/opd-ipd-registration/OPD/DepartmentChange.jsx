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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFAutoComplete, RHFSelect, RHFTextField } from 'components/hook-form';
import { getDepartment, getStaffListByDeptId } from 'pages/api/dashboard';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage } from 'utils/constants';
import { registrationUpdateDeptOfOpId } from 'pages/api/common';

const defaultValues = {
  doctor: 1,
  department: 2,
};
const schema = Yup.object().shape({
  department: Yup.object().typeError('Required').nullable().required('Required'),
  doctor: Yup.object().typeError('Required').nullable().required('Required'),
});
export default function DepartmentChange({ onClose, selectedPatient }) {
  const methods = useForm({ resolver: yupResolver(schema), mode: 'onChange', defaultValues });
  const queryClient = useQueryClient();
  const { handleSubmit, watch, setValue } = methods;
  const mutation = useMutation({
    mutationFn: (req) => registrationUpdateDeptOfOpId({ req }),
    onSuccess: () => {
      toast.success('Department Updated');
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  function onSave(data) {
    console.log(data);
    const req = [selectedPatient?.registrationId, data?.department?.id, data.doctor.id];
    mutation.mutate(req);
  }
  const departmentId = watch('department')?.id;
  const { data: department } = useQuery({
    queryKey: ['opdRenewal', 'department', 1],
    queryFn: getDepartment,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: doctorList, isLoading } = useQuery({
    queryKey: ['getStaffListByDeptId', departmentId],
    queryFn: getStaffListByDeptId,

    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!departmentId,
  });
  console.log(selectedPatient, 'selectedPatient');
  return (
    <FormWrapper
      title='Department Change'
      maxWidth='md'
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <OutlinedInput disabled value='Mukesh' size='small' />

        <Divider sx={{ mt: 1 }} />

        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row', gap: 16 } }}>
          <Box flex={1}>
            <Typography variant='subtitle2'>From</Typography>
            <FormLabel disabled> Department </FormLabel>
            <OutlinedInput
              size='small'
              fullWidth
              disabled
              value={selectedPatient?.departmentName}
            />
            <FormLabel disabled> Doctor </FormLabel>
            <OutlinedInput size='small' fullWidth disabled value={selectedPatient?.docterName} />
          </Box>
          <Divider flexItem orientation='vertical' />

          <Box flex={1}>
            <Typography variant='subtitle2'>To</Typography>
            <RHFAutoComplete
              name='department'
              placeholder='Select Department'
              options={department || []}
              getOptionDisabled={(options) => options.id === selectedPatient?.departmentId}
              label='Department'
              onInputChange={() => {
                setValue('doctor', '');
              }}
            />
            <RHFAutoComplete
              name='doctor'
              placeholder='Select Doctor'
              label='Doctor'
              options={doctorList || []}
              loading={isLoading}
            />
          </Box>
        </Stack>
      </FormProvider>
    </FormWrapper>
  );
}
