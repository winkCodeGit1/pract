/** @format */

import { Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//
import { failedSaveMessage, saveMessage } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { vitalSignTypeSaveVitalSignType } from 'pages/api/master';

const defaultValues = {
  name: '',
  typeName: '',
  uom: '',
  minVal: '',
  maxVal: '',
  active: true,
};

const Schema = yup.object().shape({
  typeName: yup.string().required('Type Name is required'),
  uom: yup.string().required('uom is required'),
  minVal: yup.number().typeError('should be a number').min(-500, 'should not be less than -500'),
  maxVal: yup
    .number()
    .typeError('should be a number')
    .min(yup.ref('minVal'), 'must be greater the min val')
    .max(1000, 'Maximum age cannot exceed 1000'),
  active: yup.boolean(),
});

export default function AddVital({ onClose, selectedRow, vitalDetail, isEditMode }) {
  const queryClient = useQueryClient();
  const [statusOption] = useState(['true', 'false']);
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => vitalSignTypeSaveVitalSignType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vitalSignTypeGetAllVitalSignTypeInDto'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(error || failedSaveMessage);
    },
  });

  useEffect(() => {
    if (isEditMode) {
      reset({
        ...selectedRow,
        id: selectedRow.id,
      });
    }
  }, [isEditMode, reset, selectedRow]);

  const onSubmit = async (data) => {
    console.log(data, '----data');
    let isVitalExists;
    console.log(isVitalExists, '---isVitalExists');

    if (isEditMode) {
      isVitalExists = selectedRow.typeName === data.typeName && selectedRow.uom === data.uom;
    } else {
      isVitalExists = vitalDetail?.findIndex(
        (e) => e.typeName === data.typeName && e.uom === data.uom
      );
      if (isVitalExists !== -1) {
        toast.error('Vital already exists');
        return;
      }
    }
    const req = data;
    mutation.mutate(req);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title={(isEditMode ? 'Edit' : 'Add') + ' Vital Signs'}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='typeName'
              placeholder='New Vital Sign'
              label='New Vital Sign'
              required
            />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField name='uom' placeholder='UoM' label='UoM' required />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body2'>
              Reference Range <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Stack spacing={2} direction='row'>
              <Stack>
                <RHFTextField
                  name='minVal'
                  placeholder='Min Value'
                  required
                  InputProps={{
                    endAdornment: (
                      <Typography variant='body2' color='text.secondary'>
                        Min
                      </Typography>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <RHFTextField
                  name='maxVal'
                  placeholder='Max Value'
                  InputProps={{
                    endAdornment: (
                      <Typography variant='body2' color='text.secondary'>
                        Max
                      </Typography>
                    ),
                  }}
                />
              </Stack>
            </Stack>
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
