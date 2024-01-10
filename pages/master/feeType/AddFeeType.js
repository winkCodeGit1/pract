/** @format */
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { FormProvider, RHFAutoComplete } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { restrict } from 'utils/restrict';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//
import FormWrapper from 'components/FormWrapper';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { RHFTextField, RHFRadioGroup } from 'components/hook-form';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';

//api
import { feesSaveFeeV2, feeTypeFetchActiveFeeType } from 'pages/api/master';

const defaultValues = {
  feeCode: '',
  feeName: '',
  feesTypeName: '',
  amount: '',
  feesTypeId: '',
  organizationId: '1',
  effect_from: '',
  active: true,
};

const Schema = yup.object().shape({
  feeCode: yup.string().required('Fee Code is required'),
  feeName: yup.string().required('Fee Name is required'),
  feesTypeId: yup.object().typeError('Fee Type is required').required('Fee Type is required'),
  amount: yup.string().required('Amount is required'),
  effect_from: yup.date().typeError('Invalid Date').required('Effect From is required'),
  active: yup.boolean(),
});

export default function AddFeeType({ onClose, isEditMode, feeDetail, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit, getValues } = methods;

  const mutation = useMutation({
    mutationFn: (req) => feesSaveFeeV2({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feesGetFeesByOrg'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  const { data: feeTypes } = useQuery({
    queryKey: ['feeTypeFetchActiveFeeType'],
    queryFn: feeTypeFetchActiveFeeType,
    gcTime: Infinity,
    placeholderData: [],
  });

  console.log(getValues());

  const onSubmit = async (data) => {
    let isFeeExists;

    if (isEditMode) {
      isFeeExists = row.feeCode === data.feeCode && row.feeName === data.feeName;
    } else {
      isFeeExists = feeDetail?.findIndex(
        (e) => e.feeCode === data.feeCode && e.feeName === data.feeName
      );
      if (isFeeExists !== -1) {
        toast.error('Fee Code is already exists for the organization selected!');
        return;
      }
    }
    const req = { ...data, feesTypeId: data?.feesTypeId?.id, activeStatus: data.active };
    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode && feeTypes) {
      let obj = {
        ...row,
        effect_from: new Date(row.effect_from),
        feesTypeId: feeTypes?.find((el) => el.id === +row.feesTypeId),
      };
      reset({ ...obj });
    }
  }, [isEditMode, row, feeTypes]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Fee Type`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name='feeCode'
              placeholder='Fee Code'
              label=' Fee Code '
              required
              onInput={restrict.alphaNumericWithNoSpace}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='feeName'
              placeholder='Fee Name'
              label=' Fee Name'
              required
              onInput={restrict.onlyCharacter}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='feesTypeId'
              options={feeTypes}
              label='Fee Type'
              placeholder='Select FeeType'
              // onInputChange={(event) => {
              //   setValue('feesTypeId', event.target.value?.id);
              // }}
              required
            />
            {/* <RHFTextField
              name='feeType'
              placeholder='Fee Type'
              label=' Fee Type'
              required
              onInput={restrict.onlyCharacter}
              inputProps={{ maxLength: 100 }}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='amount'
              placeholder='Amount'
              label=' Amount'
              required
              onInput={restrict.digits}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFDatePicker
              name='effect_from'
              label='Effect From'
              format='dd-MM-yyyy'
              minDate={new Date()}
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
//export default AddFeeType;
