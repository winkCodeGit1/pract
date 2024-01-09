import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import FormWrapper from 'components/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//Local
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';
import { FormProvider } from 'components/hook-form';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';

//api
import { buildingSaveBuilding } from 'pages/api/master';

const defaultValues = {
  id: 0,
  buildingName: '',
  noOfFloors: '',
  active: true,
  organizationId: '',
};

const Schema = yup.object().shape({
  buildingName: yup.string().required('Required'),
  active: yup.boolean(),
});

export default function AddBuildingType({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const mutation = useMutation({
    mutationFn: (req) => buildingSaveBuilding({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildingGetAllBuildingsByOrgId'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    const req = data;
    mutation.mutate(req);
    console.log(row, 'row');
  };

  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [isEditMode, row]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Building Name`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='buildingName'
              placeholder='Building Name'
              label='Building Name'
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
