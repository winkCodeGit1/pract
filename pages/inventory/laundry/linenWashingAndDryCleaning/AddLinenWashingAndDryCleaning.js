import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//
import FormWrapper from 'components/FormWrapper';
import { FormProvider, RHFAutoComplete, RHFTextField } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import useAuth from 'hooks/useAuth';
import {
  equipmentGetAll,
  laundryItemGetAll,
  linenProcessGetAll,
  washingDryCleaningLinenSave,
} from 'pages/api/laundry';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { restrict } from 'utils/restrict';

const defaultValues = {
  linenCodeItem: null,
  linenProcessName: null,
  equipmentName: '',
  quantityLoaded: '',
  loadingTime: null,
  unloadingTime: null,
  remarks: '',
};

const schema = yup.object().shape({
  linenCodeItem: yup.object().typeError('required').required(),
  linenProcessName: yup.object().typeError('required').required(),
  equipmentName: yup.object().typeError('required').required(),
  loadingTime: yup.date().required(),
  unloadingTime: yup.object().typeError('required').required(),
  remarks: yup.string().required('Required'),
  quantityLoaded: yup.string().required('Required'),
});

export default function AddLinenWashingAndDryCleaning({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  console.log(user);

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const { data: LinenItemCodeList } = useQuery({
    queryKey: ['laundryItemGetAll'],
    queryFn: laundryItemGetAll,
  });

  const { data: linenProcessList } = useQuery({
    queryKey: ['linenProcessGetAll'],
    queryFn: linenProcessGetAll,
  });

  const { data: equipmentList } = useQuery({
    queryKey: ['equipmentGetAll'],
    queryFn: equipmentGetAll,
  });

  const mutation = useMutation({
    mutationFn: (req) => washingDryCleaningLinenSave({ req, row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['washingDryCleaningLinenGetAll'] });
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
      id: data.id || 0,
      quantityLoaded: data.quantityLoaded,
      equipmentId: data.equipmentName.id,
      linenItemId: data.linenCodeItem.id,
      linenProcessId: data.linenProcessName.id,
      operatorEmployeeId: user.staffId,
      remarks: data.remarks,
      loadingDatetime: data.loadingTime,
      unloadingDatetime: data.unloadingTime,
    };

    mutation.mutate(req);
  };

  return (
    <FormWrapper
      loading={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      title={`${row ? 'Edit' : 'Add'} Linen Washing And Dry Cleaning`}
      maxWidth='sm'
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RHFAutoComplete
              name='linenCodeItem'
              options={LinenItemCodeList || []}
              placeholder='Select Linen Item Code'
              label='Linen Item Code'
            />
          </Grid>
          <Grid item xs={6}>
            <RHFAutoComplete
              name='linenProcessName'
              options={linenProcessList || []}
              placeholder='Select Linen Process Name'
              label='Linen Process Name'
            />
          </Grid>
          <Grid item xs={6}>
            <RHFAutoComplete
              name='equipmentName'
              options={equipmentList || []}
              placeholder='Select Equipment Name'
              label='Equipment Name'
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='quantityLoaded'
              label='Quantity Loaded'
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker label='Loading Time' name='loadingTime' format='dd-MM-yyyy' />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker label='Unloading Time' name='unloadingTime' format='dd-MM-yyyy' />
          </Grid>
          <Grid item xs={12}>
            Remarks
            <RHFTextField
              name='remarks'
              placeholder='Remarks'
              multiline
              minRows={3}
              maxRows={5}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
