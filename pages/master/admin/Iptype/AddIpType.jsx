import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//
import { restrict } from 'utils/restrict';
import FormWrapper from 'components/FormWrapper';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage } from 'utils/constants';
import { departmentTypeSaveDeptType } from 'pages/api/master';

const defaultValues = {
  shortName: '',
  deptName: '',
  activeStatus: 'active',
  organizationId: 1,
  departmentTypeId: 2,
};

const Schema = yup.object().shape({
  deptName: yup
    .string()
    .typeError('Please enter more than 5 character')
    .required('This Field is required'),
  shortName: yup.string().required('This Field is required'),
});
export default function AddIpType({ onClose, selectedRow, ipDetail, isEditMode }) {
  const queryClient = useQueryClient();
  const [statusOption] = useState(['Active', 'Inactive']);

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => departmentTypeSaveDeptType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departmentGetAllDeptByOrgIdTypeId'] });
      toast(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  useEffect(() => {
    if (isEditMode) {
      reset({
        ...selectedRow,
      });
    }
  }, [isEditMode, reset, selectedRow]);

  const onSubmit = async (data) => {
    console.log(data, '----data');
    let isIpExists;
    console.log(isIpExists, '---isIpExists');
    if (isEditMode) {
      isIpExists = selectedRow.deptName === data.deptName;
    } else {
      isIpExists = ipDetail?.findIndex((e) => e.deptName === data.deptName);
      if (isIpExists !== -1) {
        toast.error('Ip Already Exists');
        return;
      }
    }

    const req = data;
    mutation.mutate(req);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title={(isEditMode ? 'Edit' : 'Add') + ' IP Type'}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='deptName'
              placeholder='IP Type'
              label='IP Type'
              required
              toUpperCase
              inputProps={{ maxLength: 100, ['data-testid']: 'ip-type-input' }}
              onInput={restrict.onlyCharacter}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='shortName'
              label='Short Name'
              placeholder='IP Short Name'
              required
              toUpperCase
              inputProps={{ maxLength: 100, ['data-testid']: 'short-name-input' }}
              onInput={restrict.onlyCharacter}
            />
          </Grid>
          {isEditMode ? (
            <Grid item xs={12}>
              <RHFRadioGroup label='' name='activeStatus' options={statusOption} />
            </Grid>
          ) : null}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
