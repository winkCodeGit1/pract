/** @format */

import { Grid } from '@mui/material';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

export default function AddProductType() {
  const defaultValues = {};
  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const { data: category } = useQuery({
    queryKey: ['dashboard', 'category'],
    staleTime: Infinity,
    gcTime: Infinity,
    placeholderData: [],
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFAutoComplete
            name='categoryType'
            options={category}
            placeholder='Select Category Type'
            label='Category Type'
            required
          ></RHFAutoComplete>
        </Grid>

        <Grid item xs={12}>
          <RHFTextField name='product' placeholder='Product Type' label='Product Type' required />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
