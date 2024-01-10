/** @format */
// form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//@mui
import { Grid, MenuItem } from '@mui/material';
import { RHFTextField, RHFSelect } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import FormWrapper from 'components/FormWrapper';

const defaultValues = {};
const Schema = yup.object().shape({
  departmentType: yup.string().trim().required('Required'),
  groupTestName: yup.string().trim().required('Required'),
});
export default function AddGroupTestName({ onClose }) {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper
      onClose={onClose}
      title='Add Group Test Name'
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFSelect
              name='departmentType'
              label='Department Type'
              placeholder='Department Type'
              required
            >
              <MenuItem value=''>Select Department Type</MenuItem>
              {[{ label: 'Pathalogy or Biochemistry', value: 1 }].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='groupTestName'
              placeholder='Group Test Name'
              label='Group Test Name'
              required
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name='comments' placeholder='Comments' label='Comments' />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
