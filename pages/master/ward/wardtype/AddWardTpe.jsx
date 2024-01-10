import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { restrict } from 'utils/restrict';
import { useEffect } from 'react';

//local
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';
import FormWrapper from 'components/FormWrapper';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'components/hook-form';

//api
import { wardTypeSaveWardType } from 'pages/api/master';

const defaultValues = {
  typeName: '',
  active: true,
};

const Schema = yup.object().shape({
  typeName: yup
    .string()
    .typeError('Please enter more than 5 character')
    .required('This Field is Required'),
  active: yup.boolean(),
});

export default function AddWardType({ onClose, isEditMode, wardDetail, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: (req) => wardTypeSaveWardType({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wardTypeFetchAllWardType'] });
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
      typeName: data?.typeName,
      active: data['active'],
    };
    console.log(data, '----data');
    let isWardTypeExists;
    console.log(isWardTypeExists, '---isWardTypeExists');
    if (isEditMode) {
      isWardTypeExists = row.typeName === data.typeName;
    } else {
      isWardTypeExists = wardDetail?.findIndex((e) => e.typeName === data.typeName);
      if (isWardTypeExists !== -1) {
        toast.error('Ward Type Already Exists');
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
  }, [isEditMode, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Ward Type`}
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
              placeholder='Ward Type'
              label='Ward Type'
              toUpperCase
              onInput={(e) => {
                restrict.cplName(e);
              }}
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
