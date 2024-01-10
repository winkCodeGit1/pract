/** @format */

import { Grid } from '@mui/material';
import { FormProvider, RHFAutoComplete, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormWrapper from 'components/FormWrapper';
import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { dietArticleGetUomId, dietArticleSave } from 'pages/api/diet-kitchen';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { omitData } from 'utils/lodash';
export const mockData = () => Promise.resolve([]);

const statusOption = [true, false];
const defaultValues = { dietArticleName: '', dietUomId: null, active: true };

const Schema = yup.object().shape({
  dietArticleName: yup.string().trim().required('Required'),
  dietUomId: yup.object().shape().nullable().required('Required'),
  active: yup.boolean(),
});
export default function AddDietArticle({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user, '---user');

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const mutation = useMutation({
    mutationFn: (req) => dietArticleSave({ req, row }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['DietArticleGetAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  // console.log(mutation);
  const onSubmit = (data) => {
    console.log(data);
    let obj = {};
    let sanitizedData = {};
    if (row) {
      sanitizedData = omitData(data, [
        'createdDatetime',
        'modifiedDatetime',
        'createdBy',
        'label',
        'uomName',
        'quantity',
        'uomId',
      ]);
      obj = { ...sanitizedData, uomId: sanitizedData.dietUomId.uomId };
    } else {
      sanitizedData = omitData(data, ['dietUomId']);
      obj = { ...sanitizedData, uomId: data?.dietUomId?.uomId, createdBy: user.staffId };
    }

    console.log(obj, '--obj-');
    mutation.mutate({ ...obj });
  };

  const { data, isFetched } = useQuery({
    queryKey: ['DietArticleGetUomId'],
    queryFn: dietArticleGetUomId,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (row) {
      reset({ ...row, dietUomId: data?.find((item) => item.uomId === row?.uomId) });
    }
  }, [row, isFetched]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${row ? ' Edit' : 'Add'} Diet Article`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='dietArticleName'
              placeholder='Diet Article'
              label='Diet Article'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='dietUomId'
              options={data}
              placeholder='Select UoM'
              label='UoM'
              required
            ></RHFAutoComplete>
          </Grid>
          {row ? (
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
