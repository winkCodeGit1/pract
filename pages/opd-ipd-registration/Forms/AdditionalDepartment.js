import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getAllDepartmentsByOrgId } from 'pages/api/dashboard';

const defaultValues = {
  department: '',
  doctor: '',
};
export default function AdditionalDepartment() {
  const NewUserSchema = Yup.object().shape({
    department: Yup.string().required('Department Name is required'),
    doctor: Yup.string().required('doctor Name is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  const { data: department = [] } = useQuery({
    queryKey: ['dashboard', 'departments'],
    queryFn: getAllDepartmentsByOrgId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid Grid item xs={12} md={12} mt={2}>
          <Card sx={{ p: 3 }}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 4,
                  rowGap: 3,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  },
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <RHFAutoComplete
                      name='department'
                      options={department}
                      label='Department'
                      placeholder='Department'
                      // defaultValue={{ label: 'India' }}
                      onInputChange={() => {}}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFAutoComplete
                      name='doctor'
                      // options={doctor}
                      label='Doctor'
                      placeholder='Country'
                      // defaultValue={{ label: 'India' }}
                      onInputChange={() => {}}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack alignItems='flex-end' sx={{ mt: 3 }}>
                      <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Create OPD ID
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </FormProvider>
    </>
  );
}
