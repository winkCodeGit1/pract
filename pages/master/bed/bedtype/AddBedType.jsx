import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';

//api
import { bedTypeSaveBedType } from 'pages/api/master';
import { restrict } from 'utils/restrict';

const defaultValues = {
  bedType: '',
  charge: '',
  active: true,
};

const Schema = yup.object().shape({
  bedType: yup.string().required('Bed Type is Required'),
  charge: yup.string().required('Bed Charge is Required'),
  active: yup.boolean(),
});

export default function AddBedType({ onClose, isEditMode, bedTypeDetails, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => bedTypeSaveBedType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bedTypeFetchBedType'] });
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
      bedType: data?.bedType,
      charge: data?.charge,
      active: data['active'],
    };
    console.log(data, '----data');
    let isBedTypeExists;
    console.log(isBedTypeExists, '---isBedTypeExists');
    if (isEditMode) {
      isBedTypeExists = row.bedType === data.bedType;
    } else {
      isBedTypeExists = bedTypeDetails?.findIndex((e) => e.bedType === data.bedType);
      if (isBedTypeExists !== -1) {
        toast.error('Wound Bed already exists');
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
      title={`${isEditMode ? 'Edit' : 'Add'} Bed Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='bedType'
              placeholder='Bed Type'
              label='Bed Type'
              onInput={restrict.alphaNumericWithSpace}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='charge'
              placeholder='Bed Charge'
              label='Bed Charge'
              onInput={restrict.decimal}
              required
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
