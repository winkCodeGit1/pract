import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, ToggleButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
//
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFToggleButtonChipVariant } from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import {
  LocationDeptGetAll,
  LocationDeptMappingSaveData,
  locationMasterGetAll,
} from 'pages/api/laundry';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const defaultValues = {
  location: null,
  department: null,
  active: true,
};
const schema = yup.object().shape({
  location: yup.object().typeError('required').required(),
  department: yup.object().typeError('required').required(),
});

export default function AddLocationDepartmentMapping({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user);

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const { data: department } = useQuery({
    queryKey: ['LocationDeptGetAll'],
    queryFn: LocationDeptGetAll,
  });

  const { data: locationName } = useQuery({
    queryKey: ['locationMasterGetAll'],
    queryFn: locationMasterGetAll,
  });

  const mutation = useMutation({
    mutationFn: (req) => LocationDeptMappingSaveData({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LocationDeptMappingGetAll'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  // console.log(mutation);

  const onSubmit = (data) => {
    console.log(data);
    const req = {
      id: row ? data?.id : 0,
      locationId: data?.location?.id,
      departmentId: data?.department?.id,
      lastUpdatedBy: user.staffId,
      active: data?.active,
    };
    console.log(req);
    mutation.mutate(req);
  };

  useEffect(() => {
    console.log(row, '-----row');
    if (row) {
      reset({
        ...row,
        department: department?.find((el) => el.id === row?.departmentId),
        location: locationName?.find((el) => el.id === row?.locationId),
      });
    }
  }, [row, department, locationName]);

  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Location Department Mapping`}
      maxWidth='xs'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFAutoComplete
              label='Location'
              name='location'
              options={locationName || []}
              placeholder='Select Location'
            />
          </Grid>

          <Grid item xs={12}>
            <RHFAutoComplete
              label='Department'
              name='department'
              options={department || []}
              placeholder='Select Department'
            />
          </Grid>

          {row && (
            <Grid item xs={12} align='center'>
              <RHFToggleButtonChipVariant minimumOne name='active' exclusive>
                <ToggleButton value={true} color='success' size='small'>
                  Active
                </ToggleButton>
                <ToggleButton value={false} color='error' size='small'>
                  In-Active
                </ToggleButton>
              </RHFToggleButtonChipVariant>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
